/**
 * Memory Match — Luxury Cocktail Lounge Edition
 * Engineering Skeleton Preserved; Handcrafted Atmospheric & Sound Presentation Added.
 */

(function () {
  'use strict';

  // Application-level configuration
  const CONFIG = {
    csvPath: './puzzles.csv',
    storageKey: 'cocktail_memory_match_vault_v1',
    homeUrl: 'https://tileworksgamesstudio.github.io/86/'
  };

  const state = {
    puzzles: [],
    todayDate: '',
    todayPuzzle: null,
    activePuzzle: null,
    boardCards: [],
    flippedIndices: [],
    matchedCardCount: 0,
    turns: 0,
    isLocked: false,
    activeSession: null, // For in-progress recovery
    stats: {
      played: 0,
      completed: 0,
      currentStreak: 0,
      bestStreak: 0,
      bestTurns: null,
      turnHistory: [],
      history: {} // date -> { turns, accuracy }
    }
  };

  // --- LUXURY COCKTAIL SOUND SYNTHESIZER (Web Audio API) ---
  const LoungeAudio = (function () {
    let ctx = null;
    let initialized = false;

    function init() {
      if (initialized) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          ctx = new AudioCtx();
          initialized = true;
        }
      } catch (e) {
        // Fail silently if Web Audio is unsupported or restricted
      }
    }

    function resume() {
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    }

    // High-frequency crystal tap (card flip / touch)
    function playCrystalTap() {
      if (!ctx) return;
      resume();
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1480, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(820, ctx.currentTime + 0.08);

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } catch (err) {}
    }

    // Soft brass click (menu buttons)
    function playBrassClick() {
      if (!ctx) return;
      resume();
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.06);

        gain.gain.setValueAtTime(0.035, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.06);
      } catch (err) {}
    }

    // Two-tone crystalline harmony on pair match
    function playMatchChime() {
      if (!ctx) return;
      resume();
      try {
        const now = ctx.currentTime;
        [1046.5, 1318.51].forEach((freq, i) => { // C6, E6
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.045, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.45);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.45);
        });
      } catch (err) {}
    }

    // Muted low resonant tone on mismatch
    function playMismatchTone() {
      if (!ctx) return;
      resume();
      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(160, ctx.currentTime + 0.18);

        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      } catch (err) {}
    }

    // Velvet 3-chord completion fanfare
    function playVictoryFanfare() {
      if (!ctx) return;
      resume();
      try {
        const now = ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.11);
          gain.gain.setValueAtTime(0.05, now + idx * 0.11);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.11 + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.11);
          osc.stop(now + idx * 0.11 + 0.8);
        });
      } catch (err) {}
    }

    return {
      init,
      playCrystalTap,
      playBrassClick,
      playMatchChime,
      playMismatchTone,
      playVictoryFanfare
    };
  })();

  // --- EXACTLY TWELVE COCKTAIL GARNISH SVG SILHOUETTES ---
  const GARNISH_ICONS = [
    // 1. Orange twist
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 36C8 28 14 16 26 14C38 12 42 22 36 30C30 38 18 36 16 26C14 16 26 10 34 8"/></svg>`,
    // 2. Lemon twist
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10 38C6 30 12 20 22 18C34 16 38 24 32 32C26 40 18 36 16 28C14 18 24 12 38 10"/></svg>`,
    // 3. Lime wheel
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="20"/><circle cx="24" cy="24" r="15" stroke-dasharray="3 3"/><path d="M24 9V39M9 24H39M13 13L35 35M13 35L35 13"/></svg>`,
    // 4. Lemon wheel
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="21"/><circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="2.5" fill="currentColor"/><path d="M24 8V21M24 27V40M8 24H21M27 24H40M13 13L22 22M26 26L35 35M13 35L22 26M26 22L35 13"/></svg>`,
    // 5. Dehydrated orange wheel
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="20" stroke-width="3"/><circle cx="24" cy="24" r="14" stroke-dasharray="2 4"/><path d="M24 10L24 38M10 24L38 24M14 14L34 34M14 34L34 14"/></svg>`,
    // 6. Dehydrated lemon wheel
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="24" cy="24" r="19" stroke-width="2.5"/><polygon points="24,10 28,20 38,24 28,28 24,38 20,28 10,24 20,20"/></svg>`,
    // 7. Cocktail cherry
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="20" cy="32" r="11" fill="currentColor" fill-opacity="0.15"/><path d="M22 21C26 12 34 8 42 6"/></svg>`,
    // 8. Maraschino cherry pair
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="16" cy="34" r="9" fill="currentColor" fill-opacity="0.15"/><circle cx="33" cy="35" r="8" fill="currentColor" fill-opacity="0.15"/><path d="M16 25C20 16 28 9 38 6M33 27C30 18 36 10 38 6"/></svg>`,
    // 9. Mint sprig
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M24 42V12M24 26C18 24 14 16 16 10C22 10 24 18 24 26ZM24 20C30 18 34 10 32 4C26 4 24 12 24 20ZM24 34C16 34 12 28 14 22C20 22 24 28 24 34Z"/></svg>`,
    // 10. Rosemary sprig
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M24 44V6M24 36L14 30M24 32L34 26M24 26L14 20M24 22L34 16M24 16L16 10M24 12L32 6"/></svg>`,
    // 11. Green olive
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 40L38 8" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="24" cy="24" rx="14" ry="10" transform="rotate(-45 24 24)" fill="currentColor" fill-opacity="0.2"/><circle cx="24" cy="24" r="3.5" fill="currentColor"/></svg>`,
    // 12. Cucumber ribbon
    `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M8 38C16 40 20 28 28 30C36 32 38 18 42 10M11 32C17 34 22 24 29 25C35 26 38 14 41 8"/></svg>`
  ];

  // Atmospheric Garnish Spawner
  function initGarnishAtmosphere() {
    const stage = document.getElementById('garnish-stage');
    if (!stage) return;

    // Check prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const depthClasses = ['depth-distant', 'depth-middle', 'depth-near'];
    const maxParticles = window.innerWidth < 600 ? 9 : 15;
    let activeParticles = 0;

    function spawnGarnish() {
      if (activeParticles >= maxParticles) return;

      const el = document.createElement('div');
      const depthIndex = Math.floor(Math.random() * depthClasses.length);
      const iconIndex = Math.floor(Math.random() * GARNISH_ICONS.length);

      el.className = `floating-garnish ${depthClasses[depthIndex]}`;
      el.innerHTML = GARNISH_ICONS[iconIndex];

      const size = depthIndex === 0 ? (26 + Math.random() * 8) :
                   depthIndex === 1 ? (34 + Math.random() * 12) :
                                      (46 + Math.random() * 14);

      el.style.width = `${size}px`;
      el.style.height = `${size}px`;

      const startX = Math.random() * 94 + 3; // 3% to 97% width
      el.style.left = `${startX}%`;

      const duration = depthIndex === 0 ? (26 + Math.random() * 14) :
                       depthIndex === 1 ? (20 + Math.random() * 10) :
                                          (15 + Math.random() * 8);

      const drift = (Math.random() - 0.5) * 140; // horizontal drift px
      const initialRotation = Math.random() * 360;
      const rotationSpin = (Math.random() - 0.5) * 240;

      activeParticles++;
      stage.appendChild(el);

      const anim = el.animate([
        {
          transform: `translate3d(0, 0, 0) rotate(${initialRotation}deg)`,
          opacity: 0
        },
        {
          opacity: el.classList.contains('depth-near') ? 0.48 : (el.classList.contains('depth-middle') ? 0.32 : 0.18),
          offset: 0.18
        },
        {
          opacity: el.classList.contains('depth-near') ? 0.4 : (el.classList.contains('depth-middle') ? 0.26 : 0.14),
          offset: 0.8
        },
        {
          transform: `translate3d(${drift}px, -${window.innerHeight + 120}px, 0) rotate(${initialRotation + rotationSpin}deg)`,
          opacity: 0
        }
      ], {
        duration: duration * 1000,
        easing: 'linear'
      });

      anim.onfinish = () => {
        el.remove();
        activeParticles--;
      };
    }

    // Seed an initial few garnishes across varied vertical offsets
    for (let i = 0; i < Math.floor(maxParticles / 2); i++) {
      setTimeout(spawnGarnish, i * 1600);
    }

    // Continuous randomized atmospheric pulse
    setInterval(() => {
      if (Math.random() > 0.3) {
        spawnGarnish();
      }
    }, 2800);
  }

  // --- SAFE LOCAL STORAGE (DEFENSIVE PERSISTENCE) ---
  function loadPersistence() {
    try {
      const raw = localStorage.getItem(CONFIG.storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          if (parsed.stats) state.stats = { ...state.stats, ...parsed.stats };
          if (parsed.activeSession) state.activeSession = parsed.activeSession;
        }
      }
    } catch (err) {
      console.warn('Unable to read local storage safely, using defaults.', err);
    }
  }

  function savePersistence() {
    try {
      const payload = {
        stats: state.stats,
        activeSession: state.activeSession
      };
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(payload));
    } catch (err) {
      console.warn('Unable to persist game progress.', err);
    }
  }

  // --- DETERMINISTIC SEED SHUFFLE ---
  function createRng(seed) {
    let s = (seed % 2147483647) || 1;
    return function () {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
  }

  function shuffle(array, seedVal) {
    const copy = [...array];
    const rng = createRng(seedVal);
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  }

  function getTodayDateString() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  // --- CSV PARSING & DATA VALIDATION ---
  function parseCSV(text) {
    const rows = [];
    let curRow = [];
    let curCell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (inQuotes) {
        if (char === '"' && nextChar === '"') {
          curCell += '"';
          i++;
        } else if (char === '"') {
          inQuotes = false;
        } else {
          curCell += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === ',') {
          curRow.push(curCell.trim());
          curCell = '';
        } else if (char === '\n' || char === '\r') {
          curRow.push(curCell.trim());
          if (curRow.length > 1 || (curRow.length === 1 && curRow[0] !== '')) {
            rows.push(curRow);
          }
          curRow = [];
          curCell = '';
          if (char === '\r' && nextChar === '\n') i++;
        } else {
          curCell += char;
        }
      }
    }
    if (curCell.length || curRow.length) {
      curRow.push(curCell.trim());
      rows.push(curRow);
    }
    return rows;
  }

  function mapAndValidateRecords(rows) {
    if (rows.length < 2) return [];
    const headers = rows[0].map(h => h.trim().toLowerCase());
    return rows.slice(1).map(row => {
      const record = {};
      headers.forEach((h, i) => {
        record[h] = row[i] ? row[i].trim() : '';
      });
      const items = [];
      for (let i = 1; i <= 8; i++) {
        const itemVal = record[`item_${i}`] || record[`item${i}`] || `Item ${i}`;
        items.push(itemVal);
      }
      return {
        date: record.date || '',
        title: record.title || 'Untitled Memory Puzzle',
        items
      };
    }).filter(p => p.date && /^\d{4}-\d{2}-\d{2}$/.test(p.date));
  }

  async function loadPuzzles() {
    state.todayDate = getTodayDateString();
    const res = await fetch(CONFIG.csvPath, { cache: 'no-store' });
    if (!res.ok) throw new Error('Data file unreachable');
    const text = await res.text();
    const rows = parseCSV(text);
    const parsed = mapAndValidateRecords(rows);

    if (!parsed.length) throw new Error('No valid puzzle records found');

    // Chronological sort
    parsed.sort((a, b) => a.date.localeCompare(b.date));
    state.puzzles = parsed;

    // Daily puzzle: exact date match, fallback to latest past date, or first available
    const exact = parsed.find(p => p.date === state.todayDate);
    if (exact) {
      state.todayPuzzle = exact;
    } else {
      const pastOrToday = parsed.filter(p => p.date <= state.todayDate);
      state.todayPuzzle = pastOrToday.length
        ? pastOrToday[pastOrToday.length - 1]
        : parsed[0];
    }
  }

  // --- NAVIGATION & VIEW HIERARCHY ---
  function showMainView(viewName) {
    LoungeAudio.playBrassClick();

    document.getElementById('main-header').classList.remove('hidden');
    document.getElementById('gameplay-header').classList.add('hidden');

    const navDaily = document.getElementById('nav-daily');
    const navVault = document.getElementById('nav-vault');

    navDaily.classList.toggle('active', viewName === 'daily');
    navVault.classList.toggle('active', viewName === 'vault');

    document.querySelectorAll('.app-main .view').forEach(v => v.classList.add('hidden'));

    if (viewName === 'daily') {
      renderDailyView();
      document.getElementById('view-daily').classList.remove('hidden');
    } else if (viewName === 'vault') {
      renderVaultView();
      document.getElementById('view-vault').classList.remove('hidden');
    }
  }

  function showGameplayView() {
    document.getElementById('main-header').classList.add('hidden');
    document.getElementById('gameplay-header').classList.remove('hidden');

    document.querySelectorAll('.app-main .view').forEach(v => v.classList.add('hidden'));
    document.getElementById('view-game').classList.remove('hidden');
  }

  function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(el._timer);
    el._timer = setTimeout(() => el.classList.add('hidden'), 2400);
  }

  // --- DAILY VIEW RENDER ---
  function renderDailyView() {
    const p = state.todayPuzzle;
    if (!p) return;

    document.getElementById('daily-date').textContent = p.date;
    document.getElementById('daily-title').textContent = p.title;

    const completed = state.stats.history[p.date];
    const statusDesc = document.getElementById('daily-status');
    const playBtn = document.getElementById('btn-play-daily');

    if (completed) {
      statusDesc.textContent = `Completed in ${completed.turns} turns (${completed.accuracy} accuracy)`;
      playBtn.textContent = 'Replay Daily Puzzle';
    } else if (state.activeSession && state.activeSession.date === p.date) {
      statusDesc.textContent = `In Progress (${state.activeSession.matchedCardCount / 2} / 8 pairs found)`;
      playBtn.textContent = 'Resume Daily Puzzle';
    } else {
      statusDesc.textContent = 'Ready to play';
      playBtn.textContent = 'Play Daily Puzzle';
    }

    const s = state.stats;
    document.getElementById('quick-streak').textContent = s.currentStreak;
    document.getElementById('quick-completed').textContent = s.completed;
    document.getElementById('quick-best-turns').textContent = s.bestTurns !== null ? s.bestTurns : '—';
  }

  // --- VAULT VIEW RENDER (Historical Archive Only) ---
  function renderVaultView() {
    const container = document.getElementById('vault-list');
    container.innerHTML = '';

    const archivePuzzles = state.puzzles.filter(
      p => p.date <= state.todayDate && p.date !== state.todayPuzzle.date
    );

    archivePuzzles.sort((a, b) => b.date.localeCompare(a.date));

    if (!archivePuzzles.length) {
      container.innerHTML = '<div class="card status-card glass-panel"><p class="status-text">No previous pairings in the cellar archive yet.</p></div>';
      return;
    }

    archivePuzzles.forEach(p => {
      const item = document.createElement('div');
      item.className = 'vault-item';

      const done = state.stats.history[p.date];
      const badgeText = done
        ? `Solved: ${done.turns} turns`
        : 'Unplayed';

      item.innerHTML = `
        <div class="vault-info">
          <span class="meta-date">${p.date}</span>
          <span class="vault-title">${p.title}</span>
          <span class="vault-badge">${badgeText}</span>
        </div>
        <button class="btn btn-sm ${done ? '' : 'btn-primary'}" type="button">
          ${done ? 'Replay' : 'Play'}
        </button>
      `;

      item.querySelector('button').onclick = () => {
        LoungeAudio.playBrassClick();
        loadPuzzle(p);
      };

      container.appendChild(item);
    });
  }

  // --- GAMEPLAY ENGINE ---
  function loadPuzzle(puzzle) {
    state.activePuzzle = puzzle;
    state.flippedIndices = [];
    state.isLocked = false;

    document.getElementById('gameplay-title').textContent = puzzle.title;

    const raw = [];
    puzzle.items.forEach((label, id) => {
      raw.push({ id, name: label });
      raw.push({ id, name: label });
    });

    const seedVal = parseInt(puzzle.date.replace(/-/g, ''), 10) || 4242;
    state.boardCards = shuffle(raw, seedVal);

    const isResuming = state.activeSession && state.activeSession.date === puzzle.date;
    if (isResuming) {
      state.turns = state.activeSession.turns || 0;
      state.matchedCardCount = state.activeSession.matchedCardCount || 0;
    } else {
      state.turns = 0;
      state.matchedCardCount = 0;
      state.activeSession = {
        date: puzzle.date,
        turns: 0,
        matchedCardCount: 0,
        matchedIds: []
      };
      savePersistence();
    }

    document.getElementById('stat-turns').textContent = state.turns;
    document.getElementById('stat-pairs').textContent = `${state.matchedCardCount / 2} / 8`;
    document.getElementById('game-feedback').textContent = 'Flip cards to match all 8 pairs.';

    const board = document.getElementById('game-board');
    board.innerHTML = '';

    state.boardCards.forEach((card, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'card-tile face-down';
      btn.dataset.index = index;
      btn.textContent = '';
      btn.setAttribute('aria-label', `Card ${index + 1}`);

      if (isResuming && state.activeSession.matchedIds.includes(card.id)) {
        btn.classList.remove('face-down');
        btn.classList.add('matched');
        btn.textContent = card.name;
        btn.setAttribute('aria-disabled', 'true');
      }

      btn.onclick = () => handleCardInteraction(index);
      board.appendChild(btn);
    });

    showGameplayView();
  }

  function handleCardInteraction(index) {
    if (state.isLocked) return;
    if (state.flippedIndices.includes(index)) return;

    const board = document.getElementById('game-board');
    const btn = board.children[index];
    if (btn.classList.contains('matched')) return;

    LoungeAudio.playCrystalTap();

    // Flip card up
    state.flippedIndices.push(index);
    btn.classList.remove('face-down');
    btn.classList.add('flipped');
    btn.textContent = state.boardCards[index].name;

    if (state.flippedIndices.length === 2) {
      state.turns++;
      document.getElementById('stat-turns').textContent = state.turns;
      evaluateCardPair();
    }
  }

  function evaluateCardPair() {
    const [idx1, idx2] = state.flippedIndices;
    const card1 = state.boardCards[idx1];
    const card2 = state.boardCards[idx2];
    const board = document.getElementById('game-board');
    const btn1 = board.children[idx1];
    const btn2 = board.children[idx2];

    if (card1.id === card2.id) {
      // Correct match
      setTimeout(() => LoungeAudio.playMatchChime(), 120);

      btn1.classList.remove('flipped');
      btn2.classList.remove('flipped');
      btn1.classList.add('matched');
      btn2.classList.add('matched');
      btn1.setAttribute('aria-disabled', 'true');
      btn2.setAttribute('aria-disabled', 'true');

      state.matchedCardCount += 2;
      state.flippedIndices = [];
      const pairsFound = state.matchedCardCount / 2;
      document.getElementById('stat-pairs').textContent = `${pairsFound} / 8`;
      document.getElementById('game-feedback').textContent = `Match found: ${card1.name}!`;

      if (state.activeSession && state.activeSession.date === state.activePuzzle.date) {
        state.activeSession.turns = state.turns;
        state.activeSession.matchedCardCount = state.matchedCardCount;
        if (!state.activeSession.matchedIds.includes(card1.id)) {
          state.activeSession.matchedIds.push(card1.id);
        }
        savePersistence();
      }

      if (state.matchedCardCount === 16) {
        setTimeout(handlePuzzleCompletion, 360);
      }
    } else {
      // Mismatch
      state.isLocked = true;
      setTimeout(() => LoungeAudio.playMismatchTone(), 140);
      document.getElementById('game-feedback').textContent = 'Not a match. Try again.';
      setTimeout(() => {
        btn1.classList.remove('flipped');
        btn2.classList.remove('flipped');
        btn1.classList.add('face-down');
        btn2.classList.add('face-down');
        btn1.textContent = '';
        btn2.textContent = '';
        state.flippedIndices = [];
        state.isLocked = false;
      }, 780);
    }
  }

  function handlePuzzleCompletion() {
    LoungeAudio.playVictoryFanfare();

    const turns = state.turns;
    const accuracy = `${Math.max(0, Math.round((8 / turns) * 100))}%`;
    const dateKey = state.activePuzzle.date;
    const s = state.stats;

    state.activeSession = null;

    if (!s.history[dateKey]) {
      s.played++;
      s.completed++;
      s.currentStreak++;
      if (s.currentStreak > s.bestStreak) s.bestStreak = s.currentStreak;
      if (s.bestTurns === null || turns < s.bestTurns) s.bestTurns = turns;
      s.turnHistory.push(turns);
      s.history[dateKey] = { turns, accuracy };
    }
    savePersistence();

    document.getElementById('complete-turns').textContent = turns;
    document.getElementById('complete-accuracy').textContent = accuracy;

    const list = document.getElementById('complete-items-list');
    list.innerHTML = '';
    state.activePuzzle.items.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    });

    openModal('modal-complete');
  }

  // --- MODALS & DIALOGS ---
  function openModal(modalId) {
    LoungeAudio.playBrassClick();
    document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    const target = document.getElementById(modalId);
    if (target) {
      target.classList.remove('hidden');
      document.getElementById('modal-overlay').classList.remove('hidden');
    }
  }

  function closeAllModals() {
    LoungeAudio.playBrassClick();
    document.querySelectorAll('.modal, .modal-overlay').forEach(el => el.classList.add('hidden'));
  }

  function renderStatsModal() {
    const s = state.stats;
    document.getElementById('stat-modal-played').textContent = s.played;
    document.getElementById('stat-modal-completed').textContent = s.completed;
    document.getElementById('stat-modal-streak').textContent = s.currentStreak;
    document.getElementById('stat-modal-best-streak').textContent = s.bestStreak;
    document.getElementById('stat-modal-best-turns').textContent = s.bestTurns !== null ? s.bestTurns : '—';

    const avg = s.turnHistory.length
      ? (s.turnHistory.reduce((a, b) => a + b, 0) / s.turnHistory.length).toFixed(1)
      : '—';
    document.getElementById('stat-modal-avg-turns').textContent = avg;
  }

  function shareResult() {
    LoungeAudio.playBrassClick();
    const turns = state.turns;
    const acc = Math.max(0, Math.round((8 / turns) * 100));
    const text = `Memory Match (Velvet Lounge) — ${state.activePuzzle.title}\nDate: ${state.activePuzzle.date}\nCompleted in ${turns} turns (${acc}% accuracy)`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Result copied to clipboard');
      }).catch(() => {
        showToast('Unable to copy result');
      });
    } else {
      showToast('Sharing not supported on this browser');
    }
  }

  // --- EVENT ATTACHMENTS ---
  function setupEvents() {
    // Lazy Audio Activation on first user gesture
    const handleFirstGesture = () => {
      LoungeAudio.init();
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
    window.addEventListener('pointerdown', handleFirstGesture);
    window.addEventListener('keydown', handleFirstGesture);

    // Navigation Order: Daily Puzzle -> Vault -> Home
    document.getElementById('nav-daily').onclick = () => showMainView('daily');
    document.getElementById('nav-vault').onclick = () => showMainView('vault');

    const homeLink = document.getElementById('nav-home');
    homeLink.href = CONFIG.homeUrl;

    // Daily Play
    document.getElementById('btn-play-daily').onclick = () => {
      LoungeAudio.playBrassClick();
      loadPuzzle(state.todayPuzzle);
    };

    // Gameplay Back Button
    document.getElementById('btn-game-back').onclick = () => {
      showMainView('daily');
    };

    // Reset button on gameplay screen
    document.getElementById('btn-reset-board').onclick = () => {
      LoungeAudio.playBrassClick();
      if (confirm('Reset current puzzle progress?')) {
        state.activeSession = null;
        savePersistence();
        loadPuzzle(state.activePuzzle);
      }
    };

    // Stats and Rules modal triggers
    document.getElementById('btn-help-toggle').onclick = () => openModal('modal-rules');
    document.getElementById('btn-open-stats-modal').onclick = () => {
      renderStatsModal();
      openModal('modal-stats');
    };

    // Completion modal actions
    document.getElementById('btn-complete-share').onclick = shareResult;
    document.getElementById('btn-complete-vault').onclick = () => {
      closeAllModals();
      showMainView('vault');
    };
    document.getElementById('btn-complete-menu').onclick = () => {
      closeAllModals();
      showMainView('daily');
    };

    // Modal dismissals
    document.getElementById('modal-overlay').onclick = closeAllModals;
    document.querySelectorAll('.btn-close').forEach(b => {
      b.onclick = closeAllModals;
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAllModals();
    });
  }

  // --- INITIALIZATION PASS ---
  async function init() {
    loadPersistence();
    setupEvents();
    initGarnishAtmosphere();

    try {
      await loadPuzzles();
      showMainView('daily');
    } catch (err) {
      console.error('Initialization error:', err);
      const msgEl = document.getElementById('status-message');
      msgEl.textContent = 'Unable to load puzzle records. Please verify connection.';
      const retryBtn = document.getElementById('btn-retry');
      retryBtn.classList.remove('hidden');
      retryBtn.onclick = () => {
        retryBtn.classList.add('hidden');
        msgEl.textContent = 'Loading puzzles...';
        init();
      };
      document.querySelectorAll('.app-main .view').forEach(v => v.classList.add('hidden'));
      document.getElementById('view-status').classList.remove('hidden');
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();