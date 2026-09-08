/**
 * ============================================================================
 * COCKTAIL MEMORY — GAME ENGINE
 * Architecture: Platform Shell + Deterministic Scheduler + Audio Synthesis
 * Release Standard: 8 September 2026 = Day 0
 * Contract: Reads COCKTAIL_MEMORY_PUZZLES from puzzles.js without modifying data
 * ============================================================================
 */

(function () {
  'use strict';

  // 1. CONFIGURATION & TIME ENGINE
  // Baseline publication epoch: 8 September 2026 (Day 0)
  const EPOCH_YEAR = 2026;
  const EPOCH_MONTH = 8; // September (0-indexed)
  const EPOCH_DAY = 8;
  const EPOCH_DATE = new Date(EPOCH_YEAR, EPOCH_MONTH, EPOCH_DAY, 0, 0, 0);

  const STORAGE_KEY = 'cocktail_memory_v2';
  const OLD_STORAGE_KEY = 'cocktail_memory_v1';

  // 2. STATE REPOSITORY
  const state = {
    todayDayIndex: 0,
    activeDayIndex: 0,
    activeScreen: 'menu', // 'menu' | 'game'
    puzzle: null,
    boardCards: [],
    flippedCardIndices: [],
    matchedPairIds: new Set(),
    turns: 0,
    mismatches: 0,
    startTime: null,
    endTime: null,
    isLocked: false,
    isCompleted: false,
    soundEnabled: true,
    userStats: {
      storageVersion: 2,
      played: 0,
      completed: 0,
      currentStreak: 0,
      bestStreak: 0,
      bestTurns: null,
      turnHistory: [],
      completedPuzzles: {} // dayIndex -> { puzzleId, turns, accuracy, time, date }
    }
  };

  // 3. SOUND SYNTHESIS ENGINE (Web Audio API)
  let audioCtx = null;

  function initAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, type, duration, gainValue, decay = true) {
    if (!state.soundEnabled) return;
    try {
      initAudioContext();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(gainValue, audioCtx.currentTime);
      if (decay) {
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      } else {
        gain.gain.setValueAtTime(0, audioCtx.currentTime + duration);
      }

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Gracefully ignore autoplay browser restrictions
    }
  }

  const BarSound = {
    flip() {
      playTone(580, 'sine', 0.08, 0.14);
    },
    match() {
      setTimeout(() => playTone(659.25, 'triangle', 0.2, 0.2), 0);
      setTimeout(() => playTone(987.77, 'sine', 0.35, 0.22), 100);
    },
    mismatch() {
      playTone(180, 'sine', 0.12, 0.16);
      setTimeout(() => playTone(140, 'sine', 0.14, 0.14), 110);
    },
    victory() {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((note, i) => {
        setTimeout(() => playTone(note, 'triangle', 0.4, 0.22), i * 110);
      });
    },
    click() {
      playTone(800, 'sine', 0.04, 0.08);
    }
  };

  // 4. DETERMINISTIC DAILY SCHEDULING ARCHITECTURE
  /**
   * Day 0 = 8 September 2026.
   * Vault contains 0 historical items on Day 0.
   * Day 1 (9 September 2026) moves Day 0 to Vault.
   * For testing, supports non-intrusive URL parameter: ?day=X
   */
  function getCurrentDayIndex() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('day')) {
        const testDay = parseInt(urlParams.get('day'), 10);
        if (!isNaN(testDay) && testDay >= 0) {
          return testDay;
        }
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    const now = new Date();
    const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const diffMs = todayMidnight.getTime() - EPOCH_DATE.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }

  /**
   * Safe Historical Continuity Resolver:
   * 1. If player completed this dayIndex, preserves that exact puzzle ID forever.
   * 2. When new puzzles are appended to puzzles.js, historical indices remain stable.
   */
  function getPuzzleForDayIndex(dayIndex) {
    const catalog = window.COCKTAIL_MEMORY_PUZZLES || [];
    if (!catalog.length) {
      throw new Error('No puzzles found in COCKTAIL_MEMORY_PUZZLES.');
    }

    // Historical completion lock
    const record = state.userStats.completedPuzzles[dayIndex];
    if (record && record.puzzleId) {
      const found = catalog.find((p) => p.id === record.puzzleId);
      if (found) return found;
    }

    // Deterministic release sequence with seamless cycle
    const index = dayIndex % catalog.length;
    return catalog[index];
  }

  // 5. LOCAL STORAGE & DATA MIGRATION
  function loadStoredData() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const rawV1 = localStorage.getItem(OLD_STORAGE_KEY);
        if (rawV1) raw = rawV1;
      }
      if (!raw) return;

      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        if (parsed.userStats) {
          state.userStats = { ...state.userStats, ...parsed.userStats };
        }
        if (typeof parsed.soundEnabled === 'boolean') {
          state.soundEnabled = parsed.soundEnabled;
        }
      }
    } catch (err) {
      console.warn('Storage corrupted or unavailable; starting fresh.');
    }
  }

  function saveStoredData() {
    try {
      const payload = {
        soundEnabled: state.soundEnabled,
        userStats: state.userStats
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      // Storage quota or private mode
    }
  }

  // 6. PSEUDO-RANDOM DETERMINISTIC SHUFFLE
  function seededRandom(seed) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  function shuffleArrayDeterministic(array, seedVal) {
    const shuffled = [...array];
    let s = seedVal;
    for (let i = shuffled.length - 1; i > 0; i--) {
      s++;
      const j = Math.floor(seededRandom(s) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // 7. BOARD GENERATION
  function buildBoardForPuzzle(puzzle, dayIndex) {
    const rawCards = [];
    puzzle.pairs.forEach((cocktail) => {
      for (let side = 1; side <= 2; side++) {
        rawCards.push({
          uid: `${cocktail.id}_${side}`,
          pairId: cocktail.id,
          name: cocktail.name,
          glass: cocktail.glass,
          spec: cocktail.spec,
          lore: cocktail.lore,
          iconSvg: cocktail.iconSvg || getDefaultGlassSvg()
        });
      }
    });

    const seed = (dayIndex + 1) * 31337;
    return shuffleArrayDeterministic(rawCards, seed);
  }

  function getDefaultGlassSvg() {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M5 4h14l-4 8H9L5 4z"></path>
      <line x1="12" y1="12" x2="12" y2="19"></line>
      <line x1="8" y1="19" x2="16" y2="19"></line>
    </svg>`;
  }

  // 8. GARNISH BACKGROUND SYSTEM
  const GARNISH_SVGS = [
    // 1. Mint Sprig
    `<svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 32V10"></path><path d="M18 24c-5-2-9-7-7-12 5 2 9 7 7 12z"></path><path d="M18 18c5-2 9-7 7-12-5 2-9 7-7 12z"></path><path d="M18 12c-4-2-6-5-5-8 4 1 6 5 5 8z"></path></svg>`,
    // 2. Lemon / Orange Twist Spiral
    `<svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 30c8-4 12-14 8-22s-2-2 4 1 8 10 5 17"></path><path d="M10 26c6-4 10-12 6-18"></path></svg>`,
    // 3. Dehydrated Citrus Wheel
    `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="18" cy="18" r="15"></circle><circle cx="18" cy="18" r="12" stroke-dasharray="2 2"></circle><circle cx="18" cy="18" r="3"></circle><line x1="18" y1="3" x2="18" y2="15"></line><line x1="18" y1="21" x2="18" y2="33"></line><line x1="3" y1="18" x2="15" y2="18"></line><line x1="21" y1="18" x2="33" y2="18"></line><line x1="7.4" y1="7.4" x2="15.9" y2="15.9"></line><line x1="20.1" y1="20.1" x2="28.6" y2="28.6"></line><line x1="7.4" y1="28.6" x2="15.9" y2="20.1"></line><line x1="20.1" y1="15.9" x2="28.6" y2="7.4"></line></svg>`,
    // 4. Stemmed Cocktail Cherries
    `<svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 6c0 6-7 10-7 17a5 5 0 1 0 10 0"></path><path d="M18 6c4 5 7 10 7 16a5 5 0 1 1-10 0"></path><path d="M18 6c-3-3-2-5 1-4"></path></svg>`,
    // 5. Olive on Cocktail Skewer
    `<svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.6"><line x1="6" y1="30" x2="30" y2="6"></line><ellipse cx="18" cy="18" rx="6" ry="9" transform="rotate(-45 18 18)"></ellipse><circle cx="18" cy="18" r="2"></circle></svg>`,
    // 6. Rosemary Sprig
    `<svg width="34" height="34" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="6" y1="30" x2="28" y2="8"></line><path d="M12 24l-3-4m5 2l4-3m-6 9l-4-3m9-2l-3-4m5 2l4-3m-6 9l-4-3"></path></svg>`
  ];

  let garnishInterval = null;

  function initGarnishSystem() {
    const container = document.getElementById('garnish-container');
    if (!container) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (garnishInterval) clearInterval(garnishInterval);

    garnishInterval = setInterval(() => {
      const maxCount = state.activeScreen === 'menu' ? 4 : 2;
      const currentCount = container.children.length;

      if (currentCount < maxCount && Math.random() > 0.3) {
        spawnGarnish(container);
      }
    }, 2400);
  }

  function spawnGarnish(container) {
    const el = document.createElement('div');
    el.className = 'garnish-particle';

    const svgIndex = Math.floor(Math.random() * GARNISH_SVGS.length);
    el.innerHTML = GARNISH_SVGS[svgIndex];

    const left = 5 + Math.random() * 85;
    const duration = state.activeScreen === 'menu' ? 16 + Math.random() * 10 : 20 + Math.random() * 8;
    const rotStart = -25 + Math.random() * 50;
    const rotEnd = rotStart + (-40 + Math.random() * 80);

    el.style.left = `${left}%`;
    el.style.animationDuration = `${duration}s`;
    el.style.setProperty('--rot-end', `${rotEnd}deg`);
    el.style.transform = `rotate(${rotStart}deg)`;

    container.appendChild(el);

    el.addEventListener('animationend', () => {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
  }

  // 9. DOM ELEMENTS
  const DOM = {
    // Screens
    screenMenu: document.getElementById('screen-menu'),
    screenGame: document.getElementById('screen-game'),
    // Main Menu
    menuTodayDay: document.getElementById('menu-today-day-label'),
    menuTodayTitle: document.getElementById('menu-today-title'),
    menuTodayDiff: document.getElementById('menu-today-diff'),
    menuTodayCat: document.getElementById('menu-today-cat'),
    menuTodayStatusText: document.getElementById('menu-today-status-text'),
    menuTodayCard: document.getElementById('menu-today-card'),
    btnPlayToday: document.getElementById('btn-play-today'),
    btnPlayTodayText: document.getElementById('btn-play-today-text'),
    btnMenuOpenVault: document.getElementById('btn-menu-open-vault'),
    btnMenuStats: document.getElementById('btn-menu-stats'),
    btnMenuHow: document.getElementById('btn-menu-how'),
    btnMenuSound: document.getElementById('btn-menu-sound'),
    menuSoundText: document.querySelector('.sound-pill-text'),
    menuVaultSummary: document.getElementById('menu-vault-summary'),
    // Game Screen
    btnBackMenu: document.getElementById('btn-back-menu'),
    btnGameSound: document.getElementById('btn-game-sound'),
    btnGameStats: document.getElementById('btn-game-stats'),
    btnGameHow: document.getElementById('btn-game-how'),
    btnRestartBoard: document.getElementById('btn-restart-board'),
    btnGameVault: document.getElementById('btn-game-vault'),
    dayLabel: document.getElementById('puzzle-day-label'),
    diffBadge: document.getElementById('puzzle-diff-badge'),
    catBadge: document.getElementById('puzzle-category-badge'),
    turnsLabel: document.getElementById('stat-turns'),
    pairsLabel: document.getElementById('stat-pairs'),
    accLabel: document.getElementById('stat-accuracy'),
    toast: document.getElementById('toast-banner'),
    board: document.getElementById('game-board'),
    // Modals
    modalOverlay: document.getElementById('modal-overlay'),
    modalHow: document.getElementById('modal-how'),
    modalStats: document.getElementById('modal-stats'),
    modalVault: document.getElementById('modal-vault'),
    modalVictory: document.getElementById('modal-victory'),
    vaultList: document.getElementById('vault-list'),
    vaultEmptyState: document.getElementById('vault-empty-state'),
    // Victory elements
    vTurns: document.getElementById('v-turns'),
    vAcc: document.getElementById('v-acc'),
    vTime: document.getElementById('v-time'),
    vRankPill: document.getElementById('victory-rank-pill'),
    vCocktailsList: document.getElementById('victory-cocktails-list'),
    btnShare: document.getElementById('btn-share-result'),
    btnVictoryMenu: document.getElementById('btn-victory-menu'),
    btnVictoryVault: document.getElementById('btn-victory-vault'),
    timerNext: document.getElementById('next-puzzle-timer')
  };

  // 10. SCREEN SWITCHER
  function showScreen(screenId) {
    state.activeScreen = screenId;
    closeAllModals();

    if (screenId === 'menu') {
      DOM.screenMenu.classList.add('active');
      DOM.screenGame.classList.remove('active');
      renderMainMenu();
    } else {
      DOM.screenMenu.classList.remove('active');
      DOM.screenGame.classList.add('active');
    }
  }

  function renderMainMenu() {
    const todayPuzzle = getPuzzleForDayIndex(state.todayDayIndex);
    DOM.menuTodayDay.textContent = `DAY ${state.todayDayIndex}`;
    DOM.menuTodayTitle.textContent = todayPuzzle.title;
    DOM.menuTodayDiff.textContent = todayPuzzle.difficulty || 'EASY';
    DOM.menuTodayDiff.className = `badge-pill badge-${(todayPuzzle.difficulty || 'easy').toLowerCase()}`;
    DOM.menuTodayCat.textContent = todayPuzzle.category || 'Classic Cocktails';

    const isTodayCompleted = state.userStats.completedPuzzles[state.todayDayIndex];
    if (isTodayCompleted) {
      DOM.menuTodayCard.classList.add('is-completed');
      DOM.menuTodayStatusText.textContent = `Completed in ${isTodayCompleted.turns} turns (${isTodayCompleted.accuracy || '100%'} acc)`;
      DOM.btnPlayTodayText.textContent = 'REPLAY TODAY';
    } else if (state.activeDayIndex === state.todayDayIndex && state.turns > 0 && !state.isCompleted) {
      DOM.menuTodayCard.classList.remove('is-completed');
      DOM.menuTodayStatusText.textContent = `In Progress (${state.turns} turns taken)`;
      DOM.btnPlayTodayText.textContent = 'RESUME PUZZLE';
    } else {
      DOM.menuTodayCard.classList.remove('is-completed');
      DOM.menuTodayStatusText.textContent = 'Ready for service';
      DOM.btnPlayTodayText.textContent = "PLAY TODAY'S PUZZLE";
    }

    const releasedVaultCount = state.todayDayIndex;
    if (releasedVaultCount === 0) {
      DOM.menuVaultSummary.textContent = '0 archived days (Cellar opens tomorrow)';
    } else {
      DOM.menuVaultSummary.textContent = `${releasedVaultCount} past vintage${releasedVaultCount > 1 ? 's' : ''} available`;
    }

    syncSoundUI();
  }

  // 11. BOARD RENDERING
  function updateHeaderStats() {
    DOM.turnsLabel.textContent = state.turns;
    DOM.pairsLabel.textContent = `${state.matchedPairIds.size} / 8`;

    if (state.turns === 0) {
      DOM.accLabel.textContent = '100%';
    } else {
      const correctTurns = state.matchedPairIds.size;
      const pct = Math.max(0, Math.round((correctTurns / state.turns) * 100));
      DOM.accLabel.textContent = `${pct}%`;
    }
  }

  function showToast(message, duration = 2500) {
    DOM.toast.textContent = message;
    DOM.toast.classList.add('visible');
    clearTimeout(DOM.toast._timer);
    DOM.toast._timer = setTimeout(() => {
      DOM.toast.classList.remove('visible');
    }, duration);
  }

  function renderGrid() {
    DOM.board.innerHTML = '';

    state.boardCards.forEach((card, index) => {
      const cardBtn = document.createElement('button');
      cardBtn.type = 'button';
      cardBtn.className = 'memory-card';
      cardBtn.dataset.index = index;
      cardBtn.setAttribute('role', 'gridcell');
      cardBtn.setAttribute('aria-label', `Cocktail card at position ${index + 1}, facedown`);

      const isFlipped = state.flippedCardIndices.includes(index);
      const isMatched = state.matchedPairIds.has(card.pairId);

      if (isFlipped) cardBtn.classList.add('is-flipped');
      if (isMatched) {
        cardBtn.classList.add('is-matched');
        cardBtn.setAttribute('aria-label', `${card.name}, matched`);
        cardBtn.setAttribute('aria-disabled', 'true');
      }

      cardBtn.innerHTML = `
        <div class="card-inner">
          <!-- CARD BACK -->
          <div class="card-face card-face-back" aria-hidden="true">
            <svg class="card-back-pattern" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M12 3v18"></path>
              <path d="M3 12h18"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
          <!-- CARD FRONT -->
          <div class="card-face card-face-front" aria-hidden="true">
            <div class="card-cocktail-icon">${card.iconSvg}</div>
            <div class="card-cocktail-name">${card.name}</div>
            <div class="card-cocktail-glass">${card.glass}</div>
          </div>
        </div>
      `;

      cardBtn.addEventListener('click', () => handleCardSelection(index));
      DOM.board.appendChild(cardBtn);
    });

    updateHeaderStats();
  }

  // 12. GAMEPLAY RULES & EVALUATION
  function handleCardSelection(index) {
    if (state.isLocked) return;
    if (state.flippedCardIndices.includes(index)) return;

    const selectedCard = state.boardCards[index];
    if (state.matchedPairIds.has(selectedCard.pairId)) return;

    if (!state.startTime) {
      state.startTime = Date.now();
    }

    BarSound.flip();
    state.flippedCardIndices.push(index);

    const cardEl = DOM.board.children[index];
    if (cardEl) {
      cardEl.classList.add('is-flipped');
      cardEl.setAttribute('aria-label', `${selectedCard.name}, face up`);
    }

    if (state.flippedCardIndices.length === 2) {
      state.turns++;
      updateHeaderStats();
      evaluateTurn();
    }
  }

  function evaluateTurn() {
    state.isLocked = true;
    const [firstIdx, secondIdx] = state.flippedCardIndices;
    const firstCard = state.boardCards[firstIdx];
    const secondCard = state.boardCards[secondIdx];

    const isMatch = firstCard.pairId === secondCard.pairId;

    if (isMatch) {
      setTimeout(() => {
        BarSound.match();
        state.matchedPairIds.add(firstCard.pairId);

        const card1 = DOM.board.children[firstIdx];
        const card2 = DOM.board.children[secondIdx];
        if (card1) {
          card1.classList.add('is-matched');
          card1.setAttribute('aria-disabled', 'true');
          card1.setAttribute('aria-label', `${firstCard.name}, matched`);
        }
        if (card2) {
          card2.classList.add('is-matched');
          card2.setAttribute('aria-disabled', 'true');
          card2.setAttribute('aria-label', `${secondCard.name}, matched`);
        }

        showToast(`Matched: ${firstCard.name}!`);
        state.flippedCardIndices = [];
        state.isLocked = false;
        updateHeaderStats();

        if (state.matchedPairIds.size === 8) {
          handlePuzzleComplete();
        }
      }, 350);
    } else {
      state.mismatches++;
      setTimeout(() => {
        BarSound.mismatch();
        const card1 = DOM.board.children[firstIdx];
        const card2 = DOM.board.children[secondIdx];

        if (card1) card1.classList.add('is-mismatch');
        if (card2) card2.classList.add('is-mismatch');

        setTimeout(() => {
          if (card1) {
            card1.classList.remove('is-flipped', 'is-mismatch');
            card1.setAttribute('aria-label', `Cocktail card at position ${firstIdx + 1}, facedown`);
          }
          if (card2) {
            card2.classList.remove('is-flipped', 'is-mismatch');
            card2.setAttribute('aria-label', `Cocktail card at position ${secondIdx + 1}, facedown`);
          }
          state.flippedCardIndices = [];
          state.isLocked = false;
        }, 480);
      }, 500);
    }
  }

  // 13. COMPLETION & STATS TRACKING
  function calculateRank(turns) {
    if (turns <= 12) return { title: 'MASTER MIXOLOGIST', class: 'badge-hard' };
    if (turns <= 16) return { title: 'HEAD BARTENDER', class: 'badge-med' };
    if (turns <= 22) return { title: 'BAR BACK', class: 'badge-easy' };
    return { title: 'APPRENTICE', class: 'badge-expert' };
  }

  function handlePuzzleComplete() {
    state.endTime = Date.now();
    state.isCompleted = true;
    BarSound.victory();

    const elapsedSeconds = Math.round((state.endTime - state.startTime) / 1000);
    const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
    const secs = String(elapsedSeconds % 60).padStart(2, '0');
    const timeFormatted = `${mins}:${secs}`;
    const accFormatted = `${Math.max(0, Math.round((8 / state.turns) * 100))}%`;

    const stats = state.userStats;
    stats.played++;
    stats.completed++;
    stats.turnHistory.push(state.turns);

    if (stats.bestTurns === null || state.turns < stats.bestTurns) {
      stats.bestTurns = state.turns;
    }

    if (!stats.completedPuzzles[state.activeDayIndex]) {
      const prevDayRecord = stats.completedPuzzles[state.activeDayIndex - 1];
      if (prevDayRecord || stats.currentStreak === 0) {
        stats.currentStreak++;
      } else {
        stats.currentStreak = 1;
      }
      if (stats.currentStreak > stats.bestStreak) {
        stats.bestStreak = stats.currentStreak;
      }
    }

    stats.completedPuzzles[state.activeDayIndex] = {
      puzzleId: state.puzzle.id,
      turns: state.turns,
      accuracy: accFormatted,
      time: timeFormatted,
      date: new Date().toISOString()
    };

    saveStoredData();

    // Populate Victory Dialog
    const rank = calculateRank(state.turns);
    DOM.vRankPill.textContent = rank.title;
    DOM.vRankPill.className = `badge-pill ${rank.class}`;
    DOM.vTurns.textContent = state.turns;
    DOM.vAcc.textContent = accFormatted;
    DOM.vTime.textContent = timeFormatted;

    // Specs Showcase
    DOM.vCocktailsList.innerHTML = '';
    state.puzzle.pairs.forEach((cocktail) => {
      const item = document.createElement('div');
      item.className = 'victory-spec-item';
      item.innerHTML = `
        <div class="v-spec-name">
          <span>${cocktail.name}</span>
          <span class="v-spec-glass">${cocktail.glass}</span>
        </div>
        <div class="v-spec-desc"><strong>Spec:</strong> ${cocktail.spec}</div>
        <div class="v-spec-desc"><em>${cocktail.lore}</em></div>
      `;
      DOM.vCocktailsList.appendChild(item);
    });

    setTimeout(() => {
      openModal(DOM.modalVictory);
    }, 600);
  }

  // 14. SCORECARD SHARING
  function shareScore() {
    const rank = calculateRank(state.turns);
    const day = state.activeDayIndex;
    const acc = DOM.vAcc.textContent;
    const shareText = `Cocktail Memory — Day ${day}\n${rank.title} ★ ${state.turns} Turns (${acc})\n🍸🍸🍸🍸🍸🍸🍸🍸\nhttps://tileworksgamesstudio.github.io/86/`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText).then(() => {
        showToast('Score card copied to clipboard!');
      }).catch(() => {
        showToast('Score ready: ' + shareText);
      });
    } else {
      showToast('Score: ' + state.turns + ' turns (' + rank.title + ')');
    }
  }

  // 15. PUZZLE LOADER
  function loadPuzzleByDay(dayIndex) {
    state.activeDayIndex = dayIndex;
    state.puzzle = getPuzzleForDayIndex(dayIndex);
    state.turns = 0;
    state.mismatches = 0;
    state.flippedCardIndices = [];
    state.matchedPairIds = new Set();
    state.isLocked = false;
    state.isCompleted = false;
    state.startTime = null;
    state.endTime = null;

    DOM.dayLabel.textContent = `DAY ${dayIndex}`;
    DOM.diffBadge.textContent = state.puzzle.difficulty || 'EASY';
    DOM.diffBadge.className = `badge-pill badge-${(state.puzzle.difficulty || 'easy').toLowerCase()}`;
    DOM.catBadge.textContent = state.puzzle.category || 'COCKTAIL LORE';

    state.boardCards = buildBoardForPuzzle(state.puzzle, dayIndex);
    renderGrid();
  }

  // 16. THE VAULT (Archive of Released Puzzles)
  function renderVault() {
    DOM.vaultList.innerHTML = '';
    const releasedHistoricalDays = state.todayDayIndex;

    if (releasedHistoricalDays === 0) {
      const isTodayDone = state.userStats.completedPuzzles[0];
      if (!isTodayDone) {
        DOM.vaultEmptyState.classList.remove('hidden');
        return;
      }
    }
    DOM.vaultEmptyState.classList.add('hidden');

    for (let day = releasedHistoricalDays - 1; day >= 0; day--) {
      const p = getPuzzleForDayIndex(day);
      const isComplete = state.userStats.completedPuzzles[day];

      const row = document.createElement('div');
      row.className = 'vault-row-card';
      row.innerHTML = `
        <div class="vault-row-left">
          <span class="vault-row-day">DAY ${day} • ${p.title}</span>
          <span class="vault-row-sub">${p.category} (${p.difficulty})</span>
        </div>
        <div class="vault-row-right">
          ${
            isComplete
              ? `<button class="neo-btn secondary-btn" style="padding:0.35rem 0.7rem; font-size:0.7rem;" data-vault-day="${day}">REPLAY (${isComplete.turns}T)</button>`
              : `<button class="neo-btn gold-btn" style="padding:0.35rem 0.7rem; font-size:0.7rem;" data-vault-day="${day}">PLAY</button>`
          }
        </div>
      `;

      const playBtn = row.querySelector('[data-vault-day]');
      if (playBtn) {
        playBtn.addEventListener('click', (e) => {
          const targetDay = parseInt(e.currentTarget.dataset.vaultDay, 10);
          loadPuzzleByDay(targetDay);
          closeAllModals();
          showScreen('game');
          showToast(`Loaded Day ${targetDay} from Cellar`);
        });
      }

      DOM.vaultList.appendChild(row);
    }
  }

  // 17. STATS MODAL
  function renderStatsModal() {
    const s = state.userStats;
    document.getElementById('stat-quad-played').textContent = s.played;

    const rate = s.played > 0 ? Math.round((s.completed / s.played) * 100) : 0;
    document.getElementById('stat-quad-winrate').textContent = `${rate}%`;
    document.getElementById('stat-quad-streak').textContent = s.currentStreak;
    document.getElementById('stat-quad-best-streak').textContent = s.bestStreak;

    document.getElementById('stat-best-turns').textContent = s.bestTurns !== null ? `${s.bestTurns} turns` : '—';

    if (s.turnHistory.length > 0) {
      const sum = s.turnHistory.reduce((a, b) => a + b, 0);
      const avg = (sum / s.turnHistory.length).toFixed(1);
      document.getElementById('stat-avg-turns').textContent = `${avg} turns`;
    } else {
      document.getElementById('stat-avg-turns').textContent = '—';
    }
  }

  // 18. MIDNIGHT WATCHER
  function startMidnightWatcher() {
    setInterval(() => {
      const currentDay = getCurrentDayIndex();
      if (currentDay !== state.todayDayIndex) {
        state.todayDayIndex = currentDay;
        renderMainMenu();
        if (state.activeScreen === 'game' && (!state.startTime || state.isCompleted)) {
          loadPuzzleByDay(currentDay);
          showToast("New Day's cocktail challenge is now available!");
        }
      }
      updateCountdown();
    }, 1000);
  }

  function updateCountdown() {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();

    if (diff <= 0) {
      DOM.timerNext.textContent = '00:00:00';
      return;
    }
    const h = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
    const m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
    DOM.timerNext.textContent = `${h}:${m}:${s}`;
  }

  // 19. MODALS SYSTEM
  function openModal(modalEl) {
    closeAllModals();
    modalEl.classList.remove('hidden');
    DOM.modalOverlay.classList.remove('hidden');
  }

  function closeAllModals() {
    [DOM.modalHow, DOM.modalStats, DOM.modalVault, DOM.modalVictory].forEach((m) => {
      m.classList.add('hidden');
    });
    DOM.modalOverlay.classList.add('hidden');
  }

  // 20. SOUND PREFERENCE
  function syncSoundUI() {
    const stateStr = state.soundEnabled ? 'ON' : 'OFF';

    document.querySelectorAll('.sound-icon-on').forEach((el) => {
      el.classList.toggle('hidden', !state.soundEnabled);
    });
    document.querySelectorAll('.sound-icon-off').forEach((el) => {
      el.classList.toggle('hidden', state.soundEnabled);
    });

    if (DOM.menuSoundText) {
      DOM.menuSoundText.textContent = `SOUND: ${stateStr}`;
    }
    DOM.btnMenuSound.setAttribute('aria-pressed', String(state.soundEnabled));
    DOM.btnMenuSound.setAttribute('aria-label', `Sound: ${stateStr}`);
    DOM.btnGameSound.setAttribute('aria-pressed', String(state.soundEnabled));
    DOM.btnGameSound.setAttribute('aria-label', `Sound: ${stateStr}`);
  }

  function toggleSound() {
    state.soundEnabled = !state.soundEnabled;
    syncSoundUI();
    saveStoredData();
    if (state.soundEnabled) BarSound.click();
  }

  // 21. KEYBOARD ACCESSIBILITY (4x4 Grid Navigation via Arrow Keys)
  function handleGridKeydown(e) {
    const focused = document.activeElement;
    if (!focused || !focused.classList.contains('memory-card')) return;

    const currentIdx = parseInt(focused.dataset.index, 10);
    let nextIdx = null;

    if (e.key === 'ArrowRight') nextIdx = (currentIdx + 1) % 16;
    else if (e.key === 'ArrowLeft') nextIdx = (currentIdx - 1 + 16) % 16;
    else if (e.key === 'ArrowDown') nextIdx = (currentIdx + 4) % 16;
    else if (e.key === 'ArrowUp') nextIdx = (currentIdx - 4 + 16) % 16;

    if (nextIdx !== null) {
      e.preventDefault();
      const nextCard = DOM.board.children[nextIdx];
      if (nextCard) nextCard.focus();
    }
  }

  // 22. EVENT BINDINGS
  function setupEventListeners() {
    // Menu Actions
    DOM.btnPlayToday.addEventListener('click', () => {
      BarSound.click();
      if (state.activeDayIndex !== state.todayDayIndex || state.isCompleted) {
        loadPuzzleByDay(state.todayDayIndex);
      }
      showScreen('game');
    });

    DOM.btnMenuOpenVault.addEventListener('click', () => {
      BarSound.click();
      renderVault();
      openModal(DOM.modalVault);
    });

    DOM.btnMenuStats.addEventListener('click', () => {
      BarSound.click();
      renderStatsModal();
      openModal(DOM.modalStats);
    });

    DOM.btnMenuHow.addEventListener('click', () => {
      BarSound.click();
      openModal(DOM.modalHow);
    });

    DOM.btnMenuSound.addEventListener('click', toggleSound);

    // In-Game Screen Actions
    DOM.btnBackMenu.addEventListener('click', () => {
      BarSound.click();
      showScreen('menu');
    });

    DOM.btnGameSound.addEventListener('click', toggleSound);

    DOM.btnGameStats.addEventListener('click', () => {
      BarSound.click();
      renderStatsModal();
      openModal(DOM.modalStats);
    });

    DOM.btnGameHow.addEventListener('click', () => {
      BarSound.click();
      openModal(DOM.modalHow);
    });

    DOM.btnRestartBoard.addEventListener('click', () => {
      loadPuzzleByDay(state.activeDayIndex);
      BarSound.click();
      showToast('Board reset.');
    });

    DOM.btnGameVault.addEventListener('click', () => {
      BarSound.click();
      renderVault();
      openModal(DOM.modalVault);
    });

    // Modals Close
    DOM.modalOverlay.addEventListener('click', closeAllModals);
    document.querySelectorAll('.btn-close-modal').forEach((btn) => {
      btn.addEventListener('click', closeAllModals);
    });

    // Dismiss modal on dialog backdrop click
    [DOM.modalHow, DOM.modalStats, DOM.modalVault, DOM.modalVictory].forEach((dialog) => {
      dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
          closeAllModals();
        }
      });
    });

    // Victory Actions
    DOM.btnShare.addEventListener('click', shareScore);
    DOM.btnVictoryMenu.addEventListener('click', () => {
      closeAllModals();
      showScreen('menu');
    });
    DOM.btnVictoryVault.addEventListener('click', () => {
      closeAllModals();
      renderVault();
      openModal(DOM.modalVault);
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });

    DOM.board.addEventListener('keydown', handleGridKeydown);
  }

  // 23. INITIALIZATION
  function init() {
    loadStoredData();
    state.todayDayIndex = getCurrentDayIndex();
    state.activeDayIndex = state.todayDayIndex;

    syncSoundUI();
    setupEventListeners();
    initGarnishSystem();

    // Preload Today's board deal
    loadPuzzleByDay(state.todayDayIndex);

    // Present Main Menu initially
    showScreen('menu');
    startMidnightWatcher();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();