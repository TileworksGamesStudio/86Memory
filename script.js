/**
 * ============================================================================
 * COCKTAIL MEMORY — STATIC PRODUCTION ENGINE
 * ============================================================================
 */

(function () {
  'use strict';

  const CONFIG = {
    puzzleCsvPath: './puzzles.csv',
    releaseTimeZone: 'Europe/London'
  };

  const STORAGE_KEY = 'cocktail_memory_v2';

  const state = {
    todayDate: null,
    currentRelease: null,
    vaultReleases: [],
    activeRelease: null, // The puzzle currently being viewed/played
    activeScreen: 'init', // init, menu, game
    boardCards: [],
    flippedIndices: [],
    matchedIds: new Set(),
    turns: 0,
    mismatches: 0,
    isLocked: false,
    soundEnabled: true,
    userStats: {
      played: 0,
      completed: 0,
      currentStreak: 0,
      bestStreak: 0,
      bestTurns: null,
      turnHistory: [],
      completedPuzzles: {} // date -> { turns, accuracy }
    }
  };

  // --- AUDIO ---
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AC = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  }
  function playTone(freq, type, duration, gainValue) {
    if (!state.soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainValue, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }
  const Sound = {
    flip: () => playTone(580, 'sine', 0.08, 0.14),
    match: () => {
      setTimeout(() => playTone(659.25, 'triangle', 0.2, 0.2), 0);
      setTimeout(() => playTone(987.77, 'sine', 0.35, 0.22), 100);
    },
    mismatch: () => {
      playTone(180, 'sine', 0.12, 0.16);
      setTimeout(() => playTone(140, 'sine', 0.14, 0.14), 110);
    },
    win: () => [440, 554.37, 659.25, 880].forEach((n, i) => setTimeout(() => playTone(n, 'triangle', 0.4, 0.22), i * 110)),
    click: () => playTone(800, 'sine', 0.04, 0.08)
  };

  // --- DATA PIPELINE ---
  async function fetchAuthoritativeDate() {
    // Same-origin GET request to determine authoritative timestamp
    const url = window.location.href.split('#')[0].split('?')[0];
    const res = await fetch(url + '?_cb=' + Date.now(), { method: 'GET', cache: 'no-store' });
    const dateHeader = res.headers.get('Date');
    if (!dateHeader) throw new Error("TIME_UNAVAILABLE");

    const d = new Date(dateHeader);
    if (isNaN(d.getTime())) throw new Error("TIME_UNAVAILABLE");

    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: CONFIG.releaseTimeZone, year: 'numeric', month: '2-digit', day: '2-digit'
    });
    const parts = formatter.formatToParts(d);
    let y, m, day;
    for (const p of parts) {
      if (p.type === 'year') y = p.value;
      if (p.type === 'month') m = p.value;
      if (p.type === 'day') day = p.value;
    }
    return `${y}-${m}-${day}`;
  }

  function parseCSV(text) {
    const rows = [];
    let curRow = [], curCell = '', inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i], next = text[i + 1];
      if (inQuotes) {
        if (c === '"' && next === '"') { curCell += '"'; i++; }
        else if (c === '"') inQuotes = false;
        else curCell += c;
      } else {
        if (c === '"') inQuotes = true;
        else if (c === ',') { curRow.push(curCell); curCell = ''; }
        else if (c === '\n' || c === '\r') {
          curRow.push(curCell); rows.push(curRow); curRow = []; curCell = '';
          if (c === '\r' && next === '\n') i++;
        } else curCell += c;
      }
    }
    if (curCell || curRow.length) { curRow.push(curCell); rows.push(curRow); }
    return rows.filter(r => r.length > 1 || (r.length === 1 && r[0].trim() !== ''));
  }

  function mapCsvToObjects(headers, rows) {
    return rows.map(r => {
      const obj = {};
      headers.forEach((h, i) => obj[h.trim()] = r[i] || '');
      const pairs = [];
      for(let i = 1; i <= 8; i++) {
        pairs.push({
          id: obj[`pair_${i}_id`], name: obj[`pair_${i}_name`],
          glass: obj[`pair_${i}_glass`], spec: obj[`pair_${i}_spec`],
          lore: obj[`pair_${i}_lore`], iconSvg: obj[`pair_${i}_svg`]
        });
      }
      return {
        release_date: obj.release_date, id: obj.puzzle_id,
        title: obj.title, difficulty: obj.difficulty,
        category: obj.category, description: obj.description, pairs
      };
    });
  }

  async function loadApplicationData() {
    const [csvRes, ukDate] = await Promise.all([
      fetch(CONFIG.puzzleCsvPath, { cache: 'no-store' }).then(r => {
        if (!r.ok) throw new Error("DATA_UNAVAILABLE");
        return r.text();
      }),
      fetchAuthoritativeDate()
    ]);

    const rows = parseCSV(csvRes);
    if (rows.length < 2 || rows[0][0] !== 'release_date') throw new Error("DATA_INVALID");

    const records = mapCsvToObjects(rows[0], rows.slice(1));
    let currentMatches = [];
    const vault = [];

    records.forEach(rec => {
      if (!rec.release_date || !/^\d{4}-\d{2}-\d{2}$/.test(rec.release_date)) return;
      if (rec.release_date < ukDate) vault.push(rec);
      else if (rec.release_date === ukDate) currentMatches.push(rec);
    });

    if (currentMatches.length > 1) throw new Error("DUPLICATE_RELEASE");
    if (currentMatches.length === 0) throw new Error("MISSING_RELEASE");

    state.todayDate = ukDate;
    state.currentRelease = currentMatches[0];
    state.vaultReleases = vault.sort((a, b) => b.release_date.localeCompare(a.release_date));
  }

  // --- STORAGE ---
  function loadStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.userStats) state.userStats = { ...state.userStats, ...parsed.userStats };
        if (typeof parsed.soundEnabled === 'boolean') state.soundEnabled = parsed.soundEnabled;
      }
    } catch (e) {}
  }
  function saveStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        soundEnabled: state.soundEnabled, userStats: state.userStats
      }));
    } catch (e) {}
  }

  // --- ENGINE ---
  function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }
  function shuffleDeterministic(array, seedVal) {
    const shuf = [...array];
    let s = seedVal;
    for (let i = shuf.length - 1; i > 0; i--) {
      s++;
      const j = Math.floor(seededRandom(s) * (i + 1));
      [shuf[i], shuf[j]] = [shuf[j], shuf[i]];
    }
    return shuf;
  }

  // --- UI RENDERERS ---
  function showScreen(id) {
    state.activeScreen = id;
    document.querySelectorAll('.screen-view').forEach(el => el.classList.remove('active'));
    document.getElementById(`screen-${id}`).classList.add('active');
  }

  function showErrorUI(code) {
    const msgs = {
      DATA_UNAVAILABLE: "Puzzle data could not be loaded.",
      DATA_INVALID: "Puzzle data could not be loaded.",
      TIME_UNAVAILABLE: "Today's puzzle could not be verified.",
      MISSING_RELEASE: "Today's puzzle is not available.",
      DUPLICATE_RELEASE: "Today's puzzle is not available."
    };
    document.getElementById('init-title').textContent = "UNAVAILABLE";
    document.getElementById('init-message').textContent = msgs[code] || "A system error occurred.";
    const retryBtn = document.getElementById('btn-init-retry');
    retryBtn.classList.remove('hidden');
    retryBtn.onclick = () => {
      document.getElementById('init-title').textContent = "LOADING";
      document.getElementById('init-message').textContent = "Verifying today's release...";
      retryBtn.classList.add('hidden');
      initApp();
    };
    showScreen('init');
  }

  function renderMenu() {
    document.getElementById('menu-today-date').textContent = state.todayDate;
    document.getElementById('menu-today-title').textContent = state.currentRelease.title;
    document.getElementById('menu-today-diff').textContent = state.currentRelease.difficulty;
    document.getElementById('menu-today-cat').textContent = state.currentRelease.category;

    const isDone = state.userStats.completedPuzzles[state.todayDate];
    const statusText = document.getElementById('menu-today-status-text');
    const playBtn = document.getElementById('btn-play-today');

    if (isDone) {
      statusText.textContent = `Completed: ${isDone.turns} Turns (${isDone.accuracy})`;
      playBtn.textContent = 'REPLAY';
    } else {
      statusText.textContent = "Ready for service";
      playBtn.textContent = 'PLAY';
    }
    syncSoundUI();
  }

  function loadGame(releaseObj) {
    state.activeRelease = releaseObj;
    state.turns = 0;
    state.mismatches = 0;
    state.flippedIndices = [];
    state.matchedIds = new Set();
    state.isLocked = false;

    document.getElementById('puzzle-date-label').textContent = releaseObj.release_date;
    document.getElementById('puzzle-diff-badge').textContent = releaseObj.difficulty;
    document.getElementById('puzzle-category-badge').textContent = releaseObj.category;
    updateStatsUI();

    const rawCards = [];
    releaseObj.pairs.forEach(p => {
      rawCards.push({ ...p, side: 1 });
      rawCards.push({ ...p, side: 2 });
    });
    
    // Seed based on date string
    const seed = releaseObj.release_date.split('-').join('') * 1;
    state.boardCards = shuffleDeterministic(rawCards, seed);

    const board = document.getElementById('game-board');
    board.innerHTML = '';
    state.boardCards.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.className = 'memory-card';
      btn.dataset.index = i;
      btn.innerHTML = `
        <div class="card-inner">
          <div class="card-face card-face-back">
            <svg class="card-back-pattern" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"></circle><path d="M12 3v18"></path><path d="M3 12h18"></path><circle cx="12" cy="12" r="3"></circle></svg>
          </div>
          <div class="card-face card-face-front">
            <div class="card-cocktail-icon">${c.iconSvg}</div>
            <div class="card-cocktail-name">${c.name}</div>
            <div class="card-cocktail-glass">${c.glass}</div>
          </div>
        </div>`;
      btn.onclick = () => handleCardClick(i);
      board.appendChild(btn);
    });
  }

  function updateStatsUI() {
    document.getElementById('stat-turns').textContent = state.turns;
    document.getElementById('stat-pairs').textContent = `${state.matchedIds.size} / 8`;
    const acc = state.turns === 0 ? 100 : Math.max(0, Math.round((state.matchedIds.size / state.turns) * 100));
    document.getElementById('stat-accuracy').textContent = `${acc}%`;
  }

  function showToast(msg) {
    const t = document.getElementById('toast-banner');
    t.textContent = msg;
    t.classList.add('visible');
    clearTimeout(t._tmr);
    t._tmr = setTimeout(() => t.classList.remove('visible'), 2000);
  }

  function handleCardClick(idx) {
    if (state.isLocked || state.flippedIndices.includes(idx)) return;
    const card = state.boardCards[idx];
    if (state.matchedIds.has(card.id)) return;

    Sound.flip();
    state.flippedIndices.push(idx);
    const cardEl = document.getElementById('game-board').children[idx];
    cardEl.classList.add('is-flipped');

    if (state.flippedIndices.length === 2) {
      state.turns++;
      updateStatsUI();
      evaluateTurn();
    }
  }

  function evaluateTurn() {
    state.isLocked = true;
    const [i1, i2] = state.flippedIndices;
    const c1 = state.boardCards[i1], c2 = state.boardCards[i2];
    const isMatch = c1.id === c2.id;
    const domBoard = document.getElementById('game-board');

    if (isMatch) {
      setTimeout(() => {
        Sound.match();
        state.matchedIds.add(c1.id);
        domBoard.children[i1].classList.add('is-matched');
        domBoard.children[i2].classList.add('is-matched');
        showToast(`Matched: ${c1.name}`);
        state.flippedIndices = [];
        state.isLocked = false;
        updateStatsUI();
        if (state.matchedIds.size === 8) completeGame();
      }, 350);
    } else {
      state.mismatches++;
      setTimeout(() => {
        Sound.mismatch();
        domBoard.children[i1].classList.add('is-mismatch');
        domBoard.children[i2].classList.add('is-mismatch');
        setTimeout(() => {
          domBoard.children[i1].classList.remove('is-flipped', 'is-mismatch');
          domBoard.children[i2].classList.remove('is-flipped', 'is-mismatch');
          state.flippedIndices = [];
          state.isLocked = false;
        }, 450);
      }, 500);
    }
  }

  function completeGame() {
    Sound.win();
    const acc = `${Math.max(0, Math.round((8 / state.turns) * 100))}%`;
    const stats = state.userStats;

    if (!stats.completedPuzzles[state.activeRelease.release_date]) {
      stats.played++;
      stats.completed++;
      stats.turnHistory.push(state.turns);
      stats.currentStreak++;
      if (stats.currentStreak > stats.bestStreak) stats.bestStreak = stats.currentStreak;
      if (!stats.bestTurns || state.turns < stats.bestTurns) stats.bestTurns = state.turns;
      
      stats.completedPuzzles[state.activeRelease.release_date] = {
        turns: state.turns, accuracy: acc
      };
      saveStorage();
    }

    let rank = "APPRENTICE";
    if(state.turns <= 12) rank = "MASTER MIXOLOGIST";
    else if(state.turns <= 16) rank = "HEAD BARTENDER";
    else if(state.turns <= 22) rank = "BAR BACK";

    document.getElementById('victory-rank-pill').textContent = rank;
    document.getElementById('v-turns').textContent = state.turns;
    document.getElementById('v-acc').textContent = acc;

    const list = document.getElementById('victory-cocktails-list');
    list.innerHTML = '';
    state.activeRelease.pairs.forEach(p => {
      const d = document.createElement('div');
      d.className = 'spec-item';
      d.innerHTML = `<strong>${p.name}</strong>${p.spec} <br><em>${p.glass}</em>`;
      list.appendChild(d);
    });

    setTimeout(() => openModal('modal-victory'), 600);
  }

  // --- MODALS ---
  function openModal(id) {
    document.querySelectorAll('.modal-dialog').forEach(m => m.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    document.getElementById('modal-overlay').classList.remove('hidden');
  }
  function closeModals() {
    document.querySelectorAll('.modal-dialog, .modal-overlay').forEach(m => m.classList.add('hidden'));
  }

  function renderVault() {
    const list = document.getElementById('vault-list');
    const empty = document.getElementById('vault-empty-state');
    list.innerHTML = '';
    
    if (state.vaultReleases.length === 0) {
      empty.classList.remove('hidden');
      return;
    }
    empty.classList.add('hidden');
    
    state.vaultReleases.forEach(rec => {
      const row = document.createElement('div');
      row.className = 'vault-row';
      const isDone = state.userStats.completedPuzzles[rec.release_date];
      row.innerHTML = `
        <div class="vault-row-info">
          <span class="vault-date">${rec.release_date}</span>
          <span class="vault-title">${rec.title}</span>
        </div>
        <button class="glass-btn">${isDone ? 'REPLAY' : 'PLAY'}</button>
      `;
      row.querySelector('button').onclick = () => {
        Sound.click();
        loadGame(rec);
        closeModals();
        showScreen('game');
      };
      list.appendChild(row);
    });
  }

  function renderStats() {
    const s = state.userStats;
    document.getElementById('stat-quad-played').textContent = s.played;
    document.getElementById('stat-quad-winrate').textContent = s.played ? `${Math.round((s.completed/s.played)*100)}%` : '0%';
    document.getElementById('stat-quad-streak').textContent = s.currentStreak;
    document.getElementById('stat-quad-best-streak').textContent = s.bestStreak;
    document.getElementById('stat-best-turns').textContent = s.bestTurns || '—';
    const avg = s.turnHistory.length ? (s.turnHistory.reduce((a,b)=>a+b,0)/s.turnHistory.length).toFixed(1) : '—';
    document.getElementById('stat-avg-turns').textContent = avg;
  }

  function syncSoundUI() {
    const str = state.soundEnabled ? 'ON' : 'OFF';
    document.querySelectorAll('.sound-icon-on').forEach(e => e.classList.toggle('hidden', !state.soundEnabled));
    document.querySelectorAll('.sound-icon-off').forEach(e => e.classList.toggle('hidden', state.soundEnabled));
    document.querySelectorAll('.sound-pill-text').forEach(e => e.textContent = `SOUND: ${str}`);
  }

  // --- SAME SESSION MIDNIGHT ---
  function startMidnightWatcher() {
    setInterval(async () => {
      try {
        const newDate = await fetchAuthoritativeDate();
        if (newDate !== state.todayDate) window.location.reload();
      } catch (e) {}
    }, 60000); // Check every minute
  }

  // --- INITIALIZE ---
  async function initApp() {
    try {
      loadStorage();
      await loadApplicationData();
      renderMenu();
      showScreen('menu');
      startMidnightWatcher();
    } catch (err) {
      showErrorUI(err.message);
    }
  }

  function setupEvents() {
    document.getElementById('btn-play-today').onclick = () => {
      Sound.click();
      loadGame(state.currentRelease);
      showScreen('game');
    };
    
    document.getElementById('btn-back-menu').onclick = () => { Sound.click(); showScreen('menu'); renderMenu(); };
    document.getElementById('btn-restart-board').onclick = () => { Sound.click(); loadGame(state.activeRelease); };
    
    document.getElementById('btn-menu-open-vault').onclick = () => { Sound.click(); renderVault(); openModal('modal-vault'); };
    document.getElementById('btn-game-vault').onclick = () => { Sound.click(); renderVault(); openModal('modal-vault'); };
    
    document.getElementById('btn-menu-stats').onclick = () => { Sound.click(); renderStats(); openModal('modal-stats'); };
    document.getElementById('btn-menu-how').onclick = () => { Sound.click(); openModal('modal-how'); };
    
    document.querySelectorAll('.sound-toggle-btn').forEach(b => b.onclick = () => {
      state.soundEnabled = !state.soundEnabled;
      syncSoundUI();
      saveStorage();
      Sound.click();
    });

    document.getElementById('btn-share-result').onclick = () => {
      Sound.click();
      const txt = `Cocktail Memory\n${state.activeRelease.release_date} - ${state.turns} Turns\nhttps://tileworksgamesstudio.github.io/86/`;
      if(navigator.clipboard) navigator.clipboard.writeText(txt);
      showToast("Score copied!");
    };
    
    document.getElementById('btn-victory-menu').onclick = () => { Sound.click(); closeModals(); showScreen('menu'); renderMenu(); };
    document.getElementById('btn-victory-vault').onclick = () => { Sound.click(); renderVault(); openModal('modal-vault'); };

    document.getElementById('modal-overlay').onclick = closeModals;
    document.querySelectorAll('.btn-close-modal').forEach(b => b.onclick = () => { Sound.click(); closeModals(); });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupEvents();
    initApp();
  });
})();