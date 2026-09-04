/**
 * THE COCKTAIL CABINET — MASTER BARTENDER MEMORY & CODEX
 * Production Game Engine, Synthesizer & Curated 5-Playthrough Challenge Dataset
 */

'use strict';

/* ==========================================================================
   1. IN-SCRIPT COCKTAIL CONTENT DATASET (EXACTLY 5 PLAYABLE EXAMPLES)
   ========================================================================== */
const COCKTAILS_DB = [
  {
    id: 'negroni',
    name: 'Negroni',
    difficulty: 'Apprentice',
    spirit: 'Gin',
    family: 'Equal Parts / Aperitivo',
    formula: '1 oz London Dry Gin, 1 oz Campari, 1 oz Sweet Vermouth',
    technique: 'Stir with ice for 30s until chilled & diluted',
    glassware: 'Rocks / Old Fashioned',
    ice: 'Single large clear cube',
    garnish: 'Expressed orange peel twist',
    sensoryProfile: 'Bittersweet gentian, pine juniper botanicals, and warm herbal wine spice.',
    origin: 'Florence, Italy (c. 1919) at Caffè Casoni for Count Camillo Negroni.',
    pitfall: 'Never shake: shaking over-dilutes and destroys the ruby crystal clarity.'
  },
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    difficulty: 'Apprentice',
    spirit: 'Whiskey',
    family: 'Ancestral',
    formula: '2 oz Bourbon or Rye, 1 Demerara cube, 3 dashes Angostura, splash water',
    technique: 'Gently dissolve sugar with bitters, then slowly stir with ice',
    glassware: 'Double Rocks',
    ice: 'Dense hand-carved ice sphere',
    garnish: 'Expressed orange twist & brandied cherry',
    sensoryProfile: 'Warming grain oak, vanilla caramel, and aromatic herbal bitters.',
    origin: 'Codified in 1806 as spirit, sugar, water, and bitters; champion of the Pendennis Club.',
    pitfall: 'Do not muddle fruit salad into paste; respect the pure spirit-forward architecture.'
  },
  {
    id: 'daiquiri',
    name: 'Daiquiri',
    difficulty: 'Bartender',
    spirit: 'Rum',
    family: 'Classic Sour',
    formula: '2 oz White Rum, 3/4 oz Fresh Lime Juice, 3/4 oz Rich Simple Syrup',
    technique: 'Hard vigorous shake with solid ice cubes',
    glassware: 'Coupe',
    ice: 'None (Double strained into frosty glass)',
    garnish: 'Dehydrated lime wheel float',
    sensoryProfile: 'Crisp vibrant citrus, sugarcane roundness, and dry refreshing finish.',
    origin: 'Daiquirí, Cuba (1898) by mining engineer Jennings Cox; popularized by Hemingway.',
    pitfall: 'Never use pasteurized bottled citrus; fresh cold-pressed lime is mandatory.'
  },
  {
    id: 'margarita',
    name: 'Margarita',
    difficulty: 'Bartender',
    spirit: 'Tequila',
    family: 'Daisy',
    formula: '2 oz Blanco Tequila, 1 oz Cointreau, 3/4 oz Fresh Lime Juice',
    technique: 'Shake vigorously with ice and double strain',
    glassware: 'Coupe or Rocks',
    ice: 'Fresh rocks or served Up',
    garnish: 'Sea salt half-rim & fresh lime wheel',
    sensoryProfile: 'Earthy roasted agave, brisk orange perfume, and zesty saline snap.',
    origin: 'Mexico (c. 1930s-1940s); direct evolution of the Daisy cocktail family.',
    pitfall: 'Never salt the inside rim; falling salt granules over-salinate the balanced cocktail.'
  },
  {
    id: 'espresso-martini',
    name: 'Espresso Martini',
    difficulty: 'Head Bartender',
    spirit: 'Vodka',
    family: 'Modern Classic',
    formula: '1.5 oz Vodka, 1 oz Fresh Hot Espresso, 3/4 oz Coffee Liqueur, 1/4 oz Simple',
    technique: 'Aerated high-velocity shake for thick crema foam',
    glassware: 'Chilled Coupe',
    ice: 'None (Double strained into chilled glass)',
    garnish: 'Three coffee beans (Health, Wealth, Happiness)',
    sensoryProfile: 'Deep roasted espresso crema, bittersweet cacao, and smooth alcohol warmth.',
    origin: 'Fred’s Club, Soho, London (1983) created by legendary bartender Dick Bradsell.',
    pitfall: 'Using stale cold drip dregs instead of fresh hot espresso kills the dense crema head.'
  }
];

/* ==========================================================================
   2. DATA VALIDATION & INTEGRITY CHECKS
   ========================================================================== */
function validateCocktailDataset(dataset) {
  if (!Array.isArray(dataset) || dataset.length !== 5) {
    console.error('Data validation failed: Dataset must contain exactly 5 challenge records.');
    return false;
  }

  const requiredKeys = ['id', 'name', 'spirit', 'family', 'formula', 'technique', 'glassware', 'garnish', 'sensoryProfile', 'origin', 'pitfall'];
  const seenIds = new Set();

  for (let i = 0; i < dataset.length; i++) {
    const item = dataset[i];
    if (!item || typeof item !== 'object') return false;

    for (const key of requiredKeys) {
      if (typeof item[key] !== 'string' || item[key].trim() === '') {
        console.error(`Record ${i} missing required string field: ${key}`);
        return false;
      }
    }

    if (seenIds.has(item.id)) {
      console.error(`Duplicate cocktail ID detected: ${item.id}`);
      return false;
    }
    seenIds.add(item.id);
  }
  return true;
}

/* ==========================================================================
   3. PROCEDURAL WEB AUDIO SYNTHESIZER (ZERO EXTERNAL ASSET DEPENDENCY)
   ========================================================================== */
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.muted = (localStorage.getItem('cocktail_sound_muted') === 'true');
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playFlip() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Tactile card flip sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.07);

    filter.type = 'lowpass';
    filter.frequency.value = 450;

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playMatch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Crystalline cocktail glass chime (G5, B5, D6)
    const freqs = [783.99, 987.77, 1174.66];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const startTime = this.ctx.currentTime + (idx * 0.04);
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.42);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  }

  playMismatch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Gentle barwood tap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(115, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(70, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.11);
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Harmonious upward harp flourish
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      const startTime = this.ctx.currentTime + (idx * 0.06);
      gain.gain.setValueAtTime(0.14, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.55);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.6);
    });
  }

  toggle() {
    this.muted = !this.muted;
    localStorage.setItem('cocktail_sound_muted', this.muted);
    if (!this.muted) {
      this.playFlip();
    }
    return !this.muted;
  }
}

/* ==========================================================================
   4. CORE GAME ENGINE & STATE MANAGEMENT
   ========================================================================== */
class CocktailCabinetGame {
  constructor(dataset) {
    this.dataset = dataset;
    this.synth = new AudioSynthesizer();

    // 5-Challenge playthrough definition: 5 pairs = 10 cards total
    this.totalPairs = 5;
    this.cards = [];
    this.firstCard = null;
    this.secondCard = null;
    this.isBoardLocked = false;

    // Shift Metrics
    this.currentTier = 'apprentice'; // apprentice | bartender | head
    this.matchedPairsCount = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.totalMoves = 0;
    this.elapsedSeconds = 0;
    this.timerInterval = null;
    this.isTimerRunning = false;
    this.sessionDrinks = new Set();
    this.lastTriggerElement = null;

    // Cache DOM Elements
    this.dom = {
      grid: document.getElementById('card-grid'),
      hudScore: document.getElementById('hud-score'),
      hudStreak: document.getElementById('hud-streak'),
      hudMultiplier: document.getElementById('hud-multiplier'),
      hudPairs: document.getElementById('hud-pairs'),
      hudTimer: document.getElementById('hud-timer'),
      feedbackBanner: document.getElementById('live-feedback'),
      feedbackIcon: document.getElementById('feedback-icon'),
      feedbackHeading: document.getElementById('feedback-heading'),
      feedbackText: document.getElementById('feedback-text'),
      tierPills: document.querySelectorAll('.tier-pill'),
      btnNewShift: document.getElementById('btn-new-shift'),
      btnPeek: document.getElementById('btn-peek'),
      btnHowTo: document.getElementById('btn-how-to'),
      btnSound: document.getElementById('btn-sound'),
      soundIconOn: document.getElementById('sound-icon-on'),
      soundIconOff: document.getElementById('sound-icon-off'),
      // Victory Modal
      modalVictory: document.getElementById('modal-victory'),
      btnVicRestart: document.getElementById('btn-vic-restart'),
      btnVicCodex: document.getElementById('btn-vic-codex'),
      vicScore: document.getElementById('vic-score'),
      vicTime: document.getElementById('vic-time'),
      vicAccuracy: document.getElementById('vic-accuracy'),
      vicStreak: document.getElementById('vic-streak'),
      vicCocktailsList: document.getElementById('vic-cocktails-list'),
      // Codex Drawer
      btnOpenCodex: document.getElementById('btn-open-codex'),
      modalCodex: document.getElementById('modal-codex'),
      btnCloseCodex: document.getElementById('btn-close-codex'),
      codexSearch: document.getElementById('codex-search'),
      spiritFilters: document.getElementById('spirit-filters'),
      codexList: document.getElementById('codex-entries-list'),
      // Handbook
      modalHandbook: document.getElementById('modal-handbook'),
      btnCloseHandbook: document.getElementById('btn-close-handbook'),
      btnCloseHandbookCta: document.getElementById('btn-close-handbook-cta')
    };

    this.initSoundUI();
    this.bindEvents();
    this.renderCodex();
    this.startNewShift();
  }

  /* ------------------------------------------------------------------------
     INITIALIZATION & EVENT BINDINGS
     ------------------------------------------------------------------------ */
  initSoundUI() {
    if (this.synth.muted) {
      this.dom.soundIconOn.classList.add('hidden');
      this.dom.soundIconOff.classList.remove('hidden');
      this.dom.btnSound.setAttribute('aria-pressed', 'false');
    } else {
      this.dom.soundIconOn.classList.remove('hidden');
      this.dom.soundIconOff.classList.add('hidden');
      this.dom.btnSound.setAttribute('aria-pressed', 'true');
    }
  }

  bindEvents() {
    // Sound Button
    this.dom.btnSound.addEventListener('click', () => {
      const isEnabled = this.synth.toggle();
      this.dom.btnSound.setAttribute('aria-pressed', isEnabled ? 'true' : 'false');
      if (isEnabled) {
        this.dom.soundIconOn.classList.remove('hidden');
        this.dom.soundIconOff.classList.add('hidden');
      } else {
        this.dom.soundIconOn.classList.add('hidden');
        this.dom.soundIconOff.classList.remove('hidden');
      }
    });

    // Tier Tabs
    this.dom.tierPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        const tier = e.currentTarget.dataset.tier;
        if (this.currentTier === tier) return;
        this.dom.tierPills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        e.currentTarget.classList.add('active');
        e.currentTarget.setAttribute('aria-selected', 'true');
        this.currentTier = tier;
        this.startNewShift();
      });
    });

    // Main Control Buttons
    this.dom.btnNewShift.addEventListener('click', () => this.startNewShift());
    this.dom.btnPeek.addEventListener('click', () => this.executePeek());
    this.dom.btnHowTo.addEventListener('click', () => this.openModal(this.dom.modalHandbook, this.dom.btnHowTo));

    // Victory Dialog Actions
    this.dom.btnVicRestart.addEventListener('click', () => {
      this.closeModal(this.dom.modalVictory);
      this.startNewShift();
    });
    this.dom.btnVicCodex.addEventListener('click', () => {
      this.closeModal(this.dom.modalVictory);
      this.openModal(this.dom.modalCodex, this.dom.btnOpenCodex);
    });

    // Codex Handlers
    this.dom.btnOpenCodex.addEventListener('click', () => this.openModal(this.dom.modalCodex, this.dom.btnOpenCodex));
    this.dom.btnCloseCodex.addEventListener('click', () => this.closeModal(this.dom.modalCodex));
    this.dom.codexSearch.addEventListener('input', (e) => this.filterCodex(e.target.value));
    this.dom.spiritFilters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-pill');
      if (!btn) return;
      this.dom.spiritFilters.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      this.filterCodex(this.dom.codexSearch.value, btn.dataset.filter);
    });

    // Handbook close
    this.dom.btnCloseHandbook.addEventListener('click', () => this.closeModal(this.dom.modalHandbook));
    this.dom.btnCloseHandbookCta.addEventListener('click', () => this.closeModal(this.dom.modalHandbook));

    // Backdrop click dismiss
    [this.dom.modalVictory, this.dom.modalCodex, this.dom.modalHandbook].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });
    });

    // Escape Key Dismiss
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal(this.dom.modalVictory);
        this.closeModal(this.dom.modalCodex);
        this.closeModal(this.dom.modalHandbook);
      }
    });

    // Touch audio unlock primer
    const unlockAudio = () => {
      this.synth.init();
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('click', unlockAudio);
    };
    document.addEventListener('touchstart', unlockAudio, { passive: true });
    document.addEventListener('click', unlockAudio, { passive: true });
  }

  /* ------------------------------------------------------------------------
     GAME LIFECYCLE & 5-PLAYTHROUGH SHUFFLE
     ------------------------------------------------------------------------ */
  startNewShift() {
    this.resetTimer();
    this.firstCard = null;
    this.secondCard = null;
    this.isBoardLocked = false;
    this.matchedPairsCount = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.totalMoves = 0;
    this.sessionDrinks.clear();

    // Assemble exactly 10 cards (5 Identity cards, 5 Spec cards)
    const deck = [];
    this.dataset.forEach(cocktail => {
      deck.push({
        id: `${cocktail.id}-name`,
        cocktailId: cocktail.id,
        type: 'identity',
        cocktail: cocktail
      });
      deck.push({
        id: `${cocktail.id}-spec`,
        cocktailId: cocktail.id,
        type: 'spec',
        cocktail: cocktail
      });
    });

    // Shuffle cards with Fisher-Yates algorithm
    this.cards = this.shuffleArray(deck);
    this.renderGrid();
    this.updateHUD();

    const tierName = this.currentTier.charAt(0).toUpperCase() + this.currentTier.slice(1);
    this.setFeedback('idle', `${tierName} Station Ready`, 'Tap any card to reveal classic cocktail title or structural spec.');
  }

  shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /* ------------------------------------------------------------------------
     GRID RENDERING (10 CARDS)
     ------------------------------------------------------------------------ */
  renderGrid() {
    this.dom.grid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    this.cards.forEach((cardData, idx) => {
      const cardEl = document.createElement('button');
      cardEl.className = 'memory-card';
      cardEl.dataset.index = idx;
      cardEl.dataset.cocktailId = cardData.cocktailId;
      cardEl.dataset.type = cardData.type;
      cardEl.setAttribute('aria-label', `Card ${idx + 1}: Face down`);
      cardEl.setAttribute('tabindex', '0');

      // Card Back
      const backFace = document.createElement('div');
      backFace.className = 'card-face card-face-back';
      backFace.innerHTML = `
        <div class="back-pattern-frame">
          <div class="back-crest">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M8 22h8M12 15v7M19 3l-7 8-7-8h14zM5 3l7 7 7-7"/>
            </svg>
            <span class="back-crest-text">BAR SPEC</span>
          </div>
        </div>
      `;

      // Card Front
      const frontFace = document.createElement('div');
      frontFace.className = `card-face card-face-front type-${cardData.type}`;

      if (cardData.type === 'identity') {
        frontFace.innerHTML = `
          <div class="card-top-tag">
            <span>Classic Drink</span>
            <span aria-hidden="true">🍸</span>
          </div>
          <h3 class="cocktail-name">${cardData.cocktail.name}</h3>
          <div class="cocktail-meta-group">
            <span class="mini-pill">${cardData.cocktail.spirit}</span>
            <span class="mini-pill">${cardData.cocktail.family}</span>
            <span class="mini-pill">${cardData.cocktail.glassware}</span>
          </div>
        `;
      } else {
        frontFace.innerHTML = `
          <div class="card-top-tag">
            <span>Formula &amp; Method</span>
            <span aria-hidden="true">📖</span>
          </div>
          <div class="spec-formula">${cardData.cocktail.formula}</div>
          <div class="spec-sensory">"${cardData.cocktail.sensoryProfile}"</div>
          <span class="spec-method-badge">${cardData.cocktail.technique}</span>
        `;
      }

      cardEl.appendChild(backFace);
      cardEl.appendChild(frontFace);

      // Card Event Listeners
      cardEl.addEventListener('click', () => this.handleCardSelection(cardEl, cardData));
      cardEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleCardSelection(cardEl, cardData);
        }
      });

      fragment.appendChild(cardEl);
    });

    this.dom.grid.appendChild(fragment);
  }

  /* ------------------------------------------------------------------------
     INTERACTION & MATCH EVALUATION
     ------------------------------------------------------------------------ */
  handleCardSelection(cardEl, cardData) {
    if (this.isBoardLocked) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    // Start timer on initial card touch
    if (!this.isTimerRunning) {
      this.startTimer();
    }

    // Flip chosen card
    this.flipCard(cardEl, cardData);
    this.synth.playFlip();

    if (!this.firstCard) {
      this.firstCard = { el: cardEl, data: cardData };
      const cardTypeLabel = cardData.type === 'identity' ? 'Identity Card' : 'Formula Spec';
      this.setFeedback('idle', 'Card Inspected', `Uncovered: ${cardData.cocktail.name} (${cardTypeLabel}). Select a partner card.`);
      return;
    }

    // Second Card Selected
    this.secondCard = { el: cardEl, data: cardData };
    this.totalMoves++;
    this.isBoardLocked = true;

    // Evaluate matching rules
    const isMatch = (this.firstCard.data.cocktailId === this.secondCard.data.cocktailId) &&
                    (this.firstCard.data.type !== this.secondCard.data.type);

    if (isMatch) {
      this.handleMatchSuccess();
    } else {
      this.handleMatchFailure();
    }
  }

  flipCard(cardEl, cardData) {
    cardEl.classList.add('flipped');
    const label = cardData.type === 'identity'
      ? `${cardData.cocktail.name}, ${cardData.cocktail.spirit} based ${cardData.cocktail.family}`
      : `Spec for ${cardData.cocktail.name}: ${cardData.cocktail.formula}`;
    cardEl.setAttribute('aria-label', label);
  }

  unflipCard(cardEl) {
    cardEl.classList.remove('flipped');
    cardEl.setAttribute('aria-label', 'Card: Face down');
  }

  handleMatchSuccess() {
    this.synth.playMatch();
    const cocktail = this.firstCard.data.cocktail;
    this.sessionDrinks.add(cocktail);

    // Apply matched state
    this.firstCard.el.classList.add('matched');
    this.secondCard.el.classList.add('matched');
    this.firstCard.el.setAttribute('aria-disabled', 'true');
    this.secondCard.el.setAttribute('aria-disabled', 'true');

    // Score & Multiplier Calculation
    this.streak++;
    if (this.streak > this.maxStreak) this.maxStreak = this.streak;
    const multiplier = Math.min(3.0, 1 + (this.streak - 1) * 0.5);

    const basePoints = this.currentTier === 'head' ? 350 : 250;
    const earnedPoints = Math.round(basePoints * multiplier);
    this.score += earnedPoints;
    this.matchedPairsCount++;

    this.updateHUD();

    // Educational technique announcement
    this.setFeedback(
      'correct',
      `Matched: ${cocktail.name}`,
      `${cocktail.technique} • Serve in ${cocktail.glassware} with ${cocktail.garnish}.`
    );

    this.resetSelection();

    // Check complete shift condition (all 5 pairs matched)
    if (this.matchedPairsCount === this.totalPairs) {
      setTimeout(() => this.concludeShift(), 600);
    }
  }

  handleMatchFailure() {
    this.synth.playMismatch();
    this.streak = 0;
    this.updateHUD();

    const c1 = this.firstCard.data.cocktail;
    const c2 = this.secondCard.data.cocktail;

    // Intelligent Bartender Diagnostic Feedback
    let clue = '';
    if (this.firstCard.data.type === this.secondCard.data.type) {
      clue = this.firstCard.data.type === 'identity'
        ? 'Both are Drink Titles! Remember to pair a Drink Title with its Recipe Spec card.'
        : 'Both are Formula Specs! Pair one Recipe Spec to its corresponding Cocktail Name.';
    } else if (c1.spirit === c2.spirit) {
      clue = `Both drinks highlight ${c1.spirit}, but differ in method (${c1.technique} vs ${c2.technique}).`;
    } else if (c1.family === c2.family) {
      clue = `Both belong to the ${c1.family} style, but contrast in base spirits (${c1.spirit} vs ${c2.spirit}).`;
    } else {
      clue = `${c1.name} uses ${c1.spirit} in a ${c1.glassware}, while ${c2.name} uses ${c2.spirit}.`;
    }

    this.setFeedback('mismatch', 'Recipe Mismatch', clue);

    // Card shake animation
    this.firstCard.el.classList.add('shake');
    this.secondCard.el.classList.add('shake');

    setTimeout(() => {
      if (this.firstCard) {
        this.firstCard.el.classList.remove('shake');
        this.unflipCard(this.firstCard.el);
      }
      if (this.secondCard) {
        this.secondCard.el.classList.remove('shake');
        this.unflipCard(this.secondCard.el);
      }
      this.resetSelection();
    }, 1100);
  }

  resetSelection() {
    this.firstCard = null;
    this.secondCard = null;
    this.isBoardLocked = false;
  }

  /* ------------------------------------------------------------------------
     STATION GLANCE (TACTICAL ASSIST)
     ------------------------------------------------------------------------ */
  executePeek() {
    if (this.isBoardLocked || this.matchedPairsCount === this.totalPairs) return;
    this.isBoardLocked = true;
    this.score = Math.max(0, this.score - 150);
    this.updateHUD();

    const unmatchedCards = Array.from(this.dom.grid.querySelectorAll('.memory-card:not(.matched)'));
    unmatchedCards.forEach(c => c.classList.add('flipped'));

    this.setFeedback('idle', 'Station Glanced', 'The bar rail is momentarily uncovered (-150 pts penalty).');

    setTimeout(() => {
      unmatchedCards.forEach(c => c.classList.remove('flipped'));
      this.isBoardLocked = false;
    }, 1150);
  }

  /* ------------------------------------------------------------------------
     TIMER & HUD MANAGEMENT
     ------------------------------------------------------------------------ */
  startTimer() {
    this.isTimerRunning = true;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      this.renderTime();

      // Head Bartender Rush Hour feedback
      if (this.currentTier === 'head' && this.elapsedSeconds >= 90 && this.matchedPairsCount < this.totalPairs) {
        this.setFeedback('mismatch', 'Rush Hour Expired', 'Time exceeded 90s! Finish the rail to complete the shift.');
      }
    }, 1000);
  }

  resetTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.isTimerRunning = false;
    this.elapsedSeconds = 0;
    this.renderTime();
  }

  renderTime() {
    const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
    const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
    this.dom.hudTimer.textContent = `${mins}:${secs}`;
  }

  updateHUD() {
    this.dom.hudScore.textContent = this.score.toLocaleString();
    this.dom.hudStreak.textContent = this.streak;
    const mult = Math.min(3.0, 1 + Math.max(0, this.streak - 1) * 0.5);
    this.dom.hudMultiplier.textContent = `${mult.toFixed(1)}x`;
    this.dom.hudPairs.textContent = `${this.matchedPairsCount} / ${this.totalPairs}`;
  }

  setFeedback(type, heading, text) {
    this.dom.feedbackBanner.className = `feedback-banner ${type}`;
    const icon = type === 'correct' ? '✨' : (type === 'mismatch' ? '⚠️' : '💡');
    this.dom.feedbackIcon.textContent = icon;
    this.dom.feedbackHeading.textContent = heading;
    this.dom.feedbackText.textContent = text;
  }

  /* ------------------------------------------------------------------------
     SHIFT CONCLUSION & VICTORY MODAL
     ------------------------------------------------------------------------ */
  concludeShift() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.synth.playVictory();

    const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
    const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
    const formattedTime = `${mins}:${secs}`;

    const accuracy = this.totalMoves > 0 
      ? Math.min(100, Math.round((this.totalPairs / this.totalMoves) * 100)) 
      : 100;

    // Populate modal statistics
    this.dom.vicScore.textContent = this.score.toLocaleString();
    this.dom.vicTime.textContent = formattedTime;
    this.dom.vicAccuracy.textContent = `${accuracy}%`;
    this.dom.vicStreak.textContent = `${this.maxStreak}x`;

    // Render 5 Mastered Cocktail badges
    this.dom.vicCocktailsList.innerHTML = '';
    this.dataset.forEach(drink => {
      const badge = document.createElement('span');
      badge.className = 'recap-badge';
      badge.innerHTML = `<span aria-hidden="true">🍸</span> <strong>${drink.name}</strong> (${drink.spirit})`;
      this.dom.vicCocktailsList.appendChild(badge);
    });

    this.openModal(this.dom.modalVictory);
  }

  /* ------------------------------------------------------------------------
     CABINET CODEX VIEWER
     ------------------------------------------------------------------------ */
  renderCodex(filteredList = this.dataset) {
    this.dom.codexList.innerHTML = '';
    if (filteredList.length === 0) {
      this.dom.codexList.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted);">
          <p>No matching cocktail entries found in the Cabinet.</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();
    filteredList.forEach(item => {
      const card = document.createElement('article');
      card.className = 'codex-card';
      card.innerHTML = `
        <div class="codex-card-header">
          <h3 class="codex-drink-title">${item.name}</h3>
          <span class="mini-pill text-gold">${item.family}</span>
        </div>
        <div class="codex-drink-spec">${item.formula}</div>
        <div class="codex-grid-meta">
          <div><strong>Spirit:</strong> ${item.spirit}</div>
          <div><strong>Glassware:</strong> ${item.glassware}</div>
          <div><strong>Ice:</strong> ${item.ice}</div>
          <div><strong>Garnish:</strong> ${item.garnish}</div>
          <div><strong>Technique:</strong> ${item.technique}</div>
        </div>
        <div class="codex-detail-row">
          <strong>Historical Note:</strong> ${item.origin}
        </div>
        <div class="codex-detail-row" style="color: #df9782;">
          <strong>Pitfall Avoidance:</strong> ${item.pitfall}
        </div>
      `;
      fragment.appendChild(card);
    });

    this.dom.codexList.appendChild(fragment);
  }

  filterCodex(query = '', spiritFilter = 'all') {
    const q = query.toLowerCase().trim();
    let currentSpirit = spiritFilter;
    if (currentSpirit === 'all') {
      const activePill = this.dom.spiritFilters.querySelector('.filter-pill.active');
      currentSpirit = activePill ? activePill.dataset.filter : 'all';
    }

    const filtered = this.dataset.filter(drink => {
      const matchesSearch = !q ||
        drink.name.toLowerCase().includes(q) ||
        drink.spirit.toLowerCase().includes(q) ||
        drink.formula.toLowerCase().includes(q) ||
        drink.family.toLowerCase().includes(q);

      const matchesSpirit = currentSpirit === 'all' ||
        drink.spirit.toLowerCase() === currentSpirit.toLowerCase();

      return matchesSearch && matchesSpirit;
    });

    this.renderCodex(filtered);
  }

  /* ------------------------------------------------------------------------
     MODAL & DIALOG ACCESSIBILITY CONTROLS
     ------------------------------------------------------------------------ */
  openModal(modalEl, triggerBtn = null) {
    if (triggerBtn) {
      this.lastTriggerElement = triggerBtn;
      triggerBtn.setAttribute('aria-expanded', 'true');
    }
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Focus first interactive control in modal
    const focusable = modalEl.querySelector('button, [href], input, [tabindex="0"]');
    if (focusable) focusable.focus();
  }

  closeModal(modalEl) {
    modalEl.classList.add('hidden');
    document.body.style.overflow = '';
    if (this.lastTriggerElement) {
      this.lastTriggerElement.setAttribute('aria-expanded', 'false');
      this.lastTriggerElement.focus();
      this.lastTriggerElement = null;
    }
  }
}

/* ==========================================================================
   5. APPLICATION INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  const isValid = validateCocktailDataset(COCKTAILS_DB);
  if (isValid) {
    window.cocktailCabinetApp = new CocktailCabinetGame(COCKTAILS_DB);
  } else {
    console.error('Application aborted: cocktail dataset did not pass integrity validation.');
  }
});