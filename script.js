/**
 * THE COCKTAIL CABINET — MEMORY MATCH
 * Production Gameplay, Web Audio Synthesizer, & Cocktail Knowledge Engine
 */

'use strict';

/* ==========================================================================
   1. COCKTAIL KNOWLEDGE DATABASE (24 Classic & Modern Standard Cocktails)
   ========================================================================== */
const COCKTAILS_DB = [
  {
    id: 'negroni',
    name: 'Negroni',
    family: 'Aperitivo / Equal Parts',
    spirit: 'Gin',
    formula: '1 oz Gin, 1 oz Campari, 1 oz Sweet Vermouth',
    sensory: 'Bitter-sweet, herbal, botanical, and spirit-forward.',
    method: 'Stir over ice',
    glass: 'Rocks / Old Fashioned',
    ice: 'Large clear cube',
    garnish: 'Orange peel expression',
    history: 'Conceived in Florence, Italy circa 1919 when Count Camillo Negroni requested gin in his Americano.',
    mistake: 'Shaking the cocktail: causes over-aeration and dulls the ruby crystal appearance.'
  },
  {
    id: 'old-fashioned',
    name: 'Old Fashioned',
    family: 'Ancestral',
    spirit: 'Whiskey',
    formula: '2 oz Bourbon or Rye, 1 sugar cube, 2 dashes Angostura',
    sensory: 'Rich, warming, aromatic, and spirit-centric.',
    method: 'Stir & dilute slowly',
    glass: 'Double Rocks',
    ice: 'Single large rock',
    garnish: 'Expressed orange twist',
    history: 'The archetypal cocktail definition from 1806: spirits, sugar, water, and bitters.',
    mistake: 'Muddling neon maraschino cherries and orange slices into a fruit paste soup.'
  },
  {
    id: 'daiquiri',
    name: 'Daiquiri',
    family: 'Sour',
    spirit: 'Rum',
    formula: '2 oz White Rum, 3/4 oz Fresh Lime Juice, 3/4 oz Demerara Syrup',
    sensory: 'Crisp, zesty, clean, and perfectly sweet-tart.',
    method: 'Hard shake with ice',
    glass: 'Coupe',
    ice: 'None (Served up)',
    garnish: 'Lime wheel float',
    history: 'Engineered in Cuba around 1898 near the Daiquirí iron mines, championed by Hemingway.',
    mistake: 'Using bottled sour mix or failing to shake hard enough for chilling and dilution.'
  },
  {
    id: 'manhattan',
    name: 'Manhattan',
    family: 'Spirit-Forward',
    spirit: 'Whiskey',
    formula: '2 oz Rye Whiskey, 1 oz Sweet Vermouth, 2 dashes Angostura',
    sensory: 'Spicy, rich, lush, and velvety.',
    method: 'Stir with ice',
    glass: 'Nick & Nora / Coupe',
    ice: 'None (Served up)',
    garnish: 'Brandied Luxardo cherry',
    history: 'Invented at The Manhattan Club in New York City during the early 1870s.',
    mistake: 'Storing sweet vermouth on an unrefrigerated back bar where it oxidizes.'
  },
  {
    id: 'margarita',
    name: 'Margarita',
    family: 'Daisy',
    spirit: 'Tequila',
    formula: '2 oz Blanco Tequila, 1 oz Cointreau, 3/4 oz Fresh Lime Juice',
    sensory: 'Earthy, bright citrus, punchy, and saline.',
    method: 'Shake vigorously',
    glass: 'Rocks or Coupe',
    ice: 'Fresh cubes or Up',
    garnish: 'Sea salt half-rim & lime wheel',
    history: 'Evolved from the Daisy cocktail tradition (Daisy is Spanish for Margarita) in Mexico.',
    mistake: 'Salting the entire rim inside and out, dropping salt directly into the drink.'
  },
  {
    id: 'martini',
    name: 'Dry Martini',
    family: 'Spirit-Forward',
    spirit: 'Gin',
    formula: '2.5 oz London Dry Gin, 1/2 oz Dry Vermouth, 1 dash Orange Bitters',
    sensory: 'Crisp, bone-dry, aromatic, and bracingly cold.',
    method: 'Stir patiently',
    glass: 'Martini / Nick & Nora',
    ice: 'None (Sub-zero chilled glass)',
    garnish: 'Lemon twist or Castelvetrano olive',
    history: 'Descended from the Martinez during the late 19th century American cocktail explosion.',
    mistake: 'Serving in a warm glass or shaking, which clouds the drink and bruises the texture.'
  },
  {
    id: 'whiskey-sour',
    name: 'Whiskey Sour',
    family: 'Sour',
    spirit: 'Whiskey',
    formula: '2 oz Bourbon, 3/4 oz Lemon Juice, 1/2 oz Simple, 1/2 oz Egg White',
    sensory: 'Silky, creamy foam, tart, and rounded bourbon caramel.',
    method: 'Dry shake, then wet shake',
    glass: 'Rocks or Coupe',
    ice: 'Rocks or served Up',
    garnish: 'Angostura bitters art drops',
    history: 'First recorded in Jerry Thomas’s 1862 Bartenders Guide; egg white adds velvety mouthfeel.',
    mistake: 'Skipping the reverse dry shake, resulting in thin, sad, watery foam.'
  },
  {
    id: 'mai-tai',
    name: '1944 Mai Tai',
    family: 'Tiki / Tropical',
    spirit: 'Rum',
    formula: '2 oz Aged Jamaican Rum, 3/4 oz Lime, 1/2 oz Orgeat, 1/2 oz Orange Curaçao',
    sensory: 'Nutty almond, pungent funk, bright acidity, and complex spice.',
    method: 'Quick shake with crushed ice',
    glass: 'Double Rocks',
    ice: 'Packed crushed ice',
    garnish: 'Spent lime shell & fresh mint bouquet (island & palm tree motif)',
    history: 'Created by Victor "Trader Vic" Bergeron in Oakland, 1944, for Tahitian guests.',
    mistake: 'Adding pineapple juice and grenadine, turning a sacred sour into artificial punch.'
  },
  {
    id: 'espresso-martini',
    name: 'Espresso Martini',
    family: 'Modern Classic',
    spirit: 'Vodka',
    formula: '1.5 oz Vodka, 1 oz Fresh Hot Espresso, 3/4 oz Coffee Liqueur',
    sensory: 'Deep roasted coffee, bitter-sweet crema, and smooth alcohol warmth.',
    method: 'Hard shake with solid cubes',
    glass: 'Coupe',
    ice: 'None (Served up)',
    garnish: 'Three coffee beans (health, wealth, happiness)',
    history: 'Created by Dick Bradsell at Fred’s Club London in 1983 for a supermodel.',
    mistake: 'Using stale, cold brewed dregs rather than fresh espresso, killing the thick crema head.'
  },
  {
    id: 'boulevardier',
    name: 'Boulevardier',
    family: 'Aperitivo / Twist',
    spirit: 'Whiskey',
    formula: '1.5 oz Bourbon or Rye, 1 oz Campari, 1 oz Sweet Vermouth',
    sensory: 'Bitter-sweet, oaky spice, vanilla, and dark cherry undertones.',
    method: 'Stir with ice',
    glass: 'Rocks or Nick & Nora',
    ice: 'Large ice block',
    garnish: 'Expressed orange or cherry',
    history: 'Created by Erskine Gwynne in 1920s Paris, editor of the expat magazine The Boulevardier.',
    mistake: 'Confusing it with a Negroni: the bourbon adds heavier sweetness and higher proof presence.'
  },
  {
    id: 'sidecar',
    name: 'Sidecar',
    family: 'Daisy / Sour',
    spirit: 'Brandy',
    formula: '1.5 oz Cognac, 3/4 oz Cointreau, 3/4 oz Fresh Lemon Juice',
    sensory: 'Warm grape spirit, rich orange perfume, and brisk tartness.',
    method: 'Shake with ice',
    glass: 'Coupe',
    ice: 'None (Served up)',
    garnish: 'Delicate sugar rim & lemon peel',
    history: 'Popularized at Harry’s New York Bar in Paris after WWI, named after a military motorcycle.',
    mistake: 'Caking the entire lip in thick sugar, which overpowers the dry cognac complexity.'
  },
  {
    id: 'sazerac',
    name: 'Sazerac',
    family: 'Ancestral',
    spirit: 'Whiskey',
    formula: '2 oz Rye Whiskey, 1 barspoon Demerara, 3 dashes Peychaud’s, Absinthe rinse',
    sensory: 'Anise aroma, medicinal floral bitters, and dry fiery grain.',
    method: 'Stir in ice glass, strain into rinsed glass',
    glass: 'Chilled Rocks (neat)',
    ice: 'No ice in final glass',
    garnish: 'Lemon peel twist (discarded)',
    history: 'The official cocktail of New Orleans, originally crafted with French Cognac pre-phylloxera.',
    mistake: 'Dropping ice cubes into the final service glass or leaving excess unswirled absinthe.'
  },
  {
    id: 'french-75',
    name: 'French 75',
    family: 'Sparkling / Sour',
    spirit: 'Gin',
    formula: '1 oz Gin, 1/2 oz Lemon Juice, 1/2 oz Simple, topped with Champagne',
    sensory: 'Effervescent, snappy, uplifting, and floral citrus.',
    method: 'Shake base, strain, top with bubbles',
    glass: 'Champagne Flute or Coupe',
    ice: 'None (Served up)',
    garnish: 'Long spiral lemon twist',
    history: 'Named after the fast-firing French 75mm field gun of WWI for its remarkable kick.',
    mistake: 'Shaking the Champagne inside the cocktail shaker (explodes the shaker seal).'
  },
  {
    id: 'aviation',
    name: 'Aviation',
    family: 'Sour / Modified',
    spirit: 'Gin',
    formula: '2 oz Gin, 1/2 oz Maraschino Liqueur, 1/4 oz Crème de Violette, 3/4 oz Lemon',
    sensory: 'Floral violet, dry cherry, botanical juniper, and sky-blue tint.',
    method: 'Shake with ice',
    glass: 'Coupe',
    ice: 'None (Served up)',
    garnish: 'Brandied cherry',
    history: 'Published by Hugo Ensslin in 1916 at the Hotel Wallick in New York during early flight era.',
    mistake: 'Over-measuring Crème de Violette, turning the drink into soap-scented mouthwash.'
  },
  {
    id: 'last-word',
    name: 'The Last Word',
    family: 'Equal Parts',
    spirit: 'Gin',
    formula: '3/4 oz Gin, 3/4 oz Green Chartreuse, 3/4 oz Maraschino, 3/4 oz Lime',
    sensory: 'Pungent alpine herbs, medicinal sweetness, and sharp lime acidity.',
    method: 'Shake with ice',
    glass: 'Coupe',
    ice: 'None (Served up)',
    garnish: 'Brandied cherry',
    history: 'Created at the Detroit Athletic Club in 1916, resurrected by Murray Stenson in 2004.',
    mistake: 'Failing to shake vigorously enough to temper the fiery 110-proof Chartreuse botanicals.'
  },
  {
    id: 'penicillin',
    name: 'Penicillin',
    family: 'Modern Sour',
    spirit: 'Whiskey',
    formula: '2 oz Blended Scotch, 3/4 oz Lemon, 3/8 oz Honey-Ginger Syrup, Islay Float',
    sensory: 'Peaty smoke aroma, fiery spicy ginger warmth, and balancing honeyed malt.',
    method: 'Shake base, float peated Scotch',
    glass: 'Rocks',
    ice: 'Large ice block',
    garnish: 'Candied ginger on a pick',
    history: 'Crafted in 2005 by Australian bartender Sam Ross at Milk & Honey, New York.',
    mistake: 'Shaking the Islay Scotch into the mix rather than floating it for direct aromatic impact.'
  },
  {
    id: 'clover-club',
    name: 'Clover Club',
    family: 'Sour',
    spirit: 'Gin',
    formula: '1.5 oz Gin, 1/2 oz Raspberry Syrup, 1/2 oz Dry Vermouth, 1/2 oz Lemon, Egg White',
    sensory: 'Bright berry fruit, herbaceous dryness, and pillowy creamy head.',
    method: 'Dry shake, then wet shake',
    glass: 'Coupe',
    ice: 'None (Served up)',
    garnish: 'Fresh raspberries on pick',
    history: 'Named after the Bellevue-Stratford Philadelphia gentlemen’s club in the 1890s.',
    mistake: 'Omitting the dry vermouth; modern specs require vermouth to cut cloying berry sweetness.'
  },
  {
    id: 'paloma',
    name: 'Paloma',
    family: 'Highball',
    spirit: 'Tequila',
    formula: '2 oz Blanco Tequila, 1/2 oz Lime Juice, topped with 4 oz Grapefruit Soda',
    sensory: 'Fizzy, bitter-grapefruit zest, agave earth, and quenching thirst relief.',
    method: 'Build in glass with ice',
    glass: 'Highball / Collins',
    ice: 'Tall column or cubes',
    garnish: 'Salt rim & pink grapefruit wedge',
    history: 'The most popular tequila cocktail consumed in Mexico, credited to Don Javier Delgado Corona.',
    mistake: 'Using flat grapefruit juice without bubbles; effervescence is essential to highball dynamics.'
  },
  {
    id: 'moscow-mule',
    name: 'Moscow Mule',
    family: 'Buck / Highball',
    spirit: 'Vodka',
    formula: '1.5 oz Vodka, 1/2 oz Fresh Lime Juice, 4 oz Spicy Ginger Beer',
    sensory: 'Fiery ginger spice, tingling cold metal, and zesty lime snap.',
    method: 'Build over crushed ice',
    glass: 'Copper Mug',
    ice: 'Crushed ice',
    garnish: 'Lime wheel and slapped fresh mint sprig',
    history: 'Devised in 1941 at the Cock ’n Bull bar to sell surplus Smirnoff vodka and ginger beer.',
    mistake: 'Substituting cheap sweet ginger ale for genuine spicy fermented ginger beer.'
  },
  {
    id: 'corpse-reviver-2',
    name: 'Corpse Reviver No. 2',
    family: 'Equal Parts / Hangover Cure',
    spirit: 'Gin',
    formula: '3/4 oz Gin, 3/4 oz Cointreau, 3/4 oz Lillet Blanc, 3/4 oz Lemon, Absinthe rinse',
    sensory: 'Refreshing, bright citrus, subtle botanical wine, and faint licorice snap.',
    method: 'Shake with ice into rinsed glass',
    glass: 'Coupe',
    ice: 'None (Served up)',
    garnish: 'Lemon peel twist',
    history: 'Immortalized by Harry Craddock in the 1930 Savoy Cocktail Book: "Four taken in swift succession will unrevive the corpse again."',
    mistake: 'Forgetting the absinthe rinse, stripping the critical aromatic punch of the drink.'
  },
  {
    id: 'gimlet',
    name: 'Gimlet',
    family: 'Sour',
    spirit: 'Gin',
    formula: '2 oz London Dry Gin, 3/4 oz Fresh Lime Juice, 3/4 oz Simple Syrup',
    sensory: 'Crisp, razor-sharp citrus, juniper-heavy, and thirst-quenching.',
    method: 'Shake with ice',
    glass: 'Coupe or Rocks',
    ice: 'Up or on the rocks',
    garnish: 'Lime wheel',
    history: 'Associated with British Royal Navy Surgeon Rear-Admiral Sir Thomas Gimlette to combat scurvy.',
    mistake: 'Using overly processed artificial bottled cordials rather than vibrant fresh citrus.'
  },
  {
    id: 'dark-n-stormy',
    name: 'Dark ’n Stormy',
    family: 'Highball',
    spirit: 'Rum',
    formula: '2 oz Goslings Black Seal Rum, 1/2 oz Lime Juice, 4 oz Ginger Beer',
    sensory: 'Molasses sweetness, fiery ginger bite, and contrasting layered aesthetic.',
    method: 'Build ginger beer over ice, float dark rum',
    glass: 'Highball',
    ice: 'Cubes',
    garnish: 'Lime wedge',
    history: 'A trademarked cocktail created in Bermuda by naval officers following WWI.',
    mistake: 'Shaking the dark rum into the soda, ruining the stormy dark cloud visual layer.'
  },
  {
    id: 'aperol-spritz',
    name: 'Aperol Spritz',
    family: 'Spritz',
    spirit: 'Aperitivo',
    formula: '3 oz Prosecco, 2 oz Aperol, 1 oz Sparkling Soda Water (3:2:1 Rule)',
    sensory: 'Low alcohol, bittersweet gentian, bubbly effervescence, and bright orange.',
    method: 'Build in glass over ice in order',
    glass: 'Large Wine Glass',
    ice: 'Plenty of cubes',
    garnish: 'Juicy half orange slice & green olive',
    history: 'Originated in Venice, Italy; codified the Austrian splash (spritzen) tradition into an aperitivo.',
    mistake: 'Pouring the soda first and Prosecco last, preventing proper carbonation integration.'
  },
  {
    id: 'bramble',
    name: 'Bramble',
    family: 'Modern Sour',
    spirit: 'Gin',
    formula: '1.5 oz Dry Gin, 3/4 oz Lemon Juice, 1/2 oz Simple, 1/2 oz Crème de Mûre float',
    sensory: 'Tart lemon brightness bleeding into luscious dark blackberry liqueur.',
    method: 'Shake base, pour over crushed ice, drizzle Mûre',
    glass: 'Old Fashioned / Rocks',
    ice: 'Packed crushed ice',
    garnish: 'Fresh blackberry & lemon wheel',
    history: 'Invented in 1984 by legendary bartender Dick Bradsell at Fred’s Club, Soho, London.',
    mistake: 'Shaking the blackberry liqueur inside the shaker instead of bleeding it over crushed ice.'
  }
];

/* ==========================================================================
   2. PROCEDURAL SYNTHESIZER (Web Audio API - Zero External Asset Lag)
   ========================================================================== */
class AudioSynthesizer {
  constructor() {
    this.ctx = null;
    this.muted = false;
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

    // Gentle tactile parchment/card snap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.08);

    filter.type = 'lowpass';
    filter.frequency.value = 400;

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  playMatch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Crystalline cocktail glass chime (Harmonic major chord: G5, B5, D6)
    const freqs = [783.99, 987.77, 1174.66];
    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + (idx * 0.04));

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime + (idx * 0.04));
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(this.ctx.currentTime + (idx * 0.04));
      osc.stop(this.ctx.currentTime + 0.5);
    });
  }

  playMismatch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Soft non-punitive dual-wood tap
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(75, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.13);
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // Upward cocktail harp flourish
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.value = freq;

      const startTime = this.ctx.currentTime + (i * 0.07);
      gain.gain.setValueAtTime(0.14, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.65);
    });
  }
}

/* ==========================================================================
   3. GAME ENGINE & STATE MANAGEMENT
   ========================================================================== */
class CocktailMemoryGame {
  constructor() {
    this.synth = new AudioSynthesizer();
    
    // Config
    this.difficultyConfig = {
      easy: { pairs: 4, gridClass: 'grid-easy' },
      medium: { pairs: 6, gridClass: 'grid-medium' },
      hard: { pairs: 8, gridClass: 'grid-hard' }
    };
    this.currentDifficulty = 'easy';

    // State
    this.cards = [];
    this.firstCard = null;
    this.secondCard = null;
    this.isBoardLocked = false;

    this.matchedPairsCount = 0;
    this.totalPairs = 4;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.totalMoves = 0;
    this.mistakesCount = 0;
    this.elapsedSeconds = 0;
    this.timerInterval = null;
    this.isGameActive = false;

    // Session Memory (Discovered in this run)
    this.sessionDrinks = new Set();

    // DOM Elements
    this.dom = {
      grid: document.getElementById('card-grid'),
      hudScore: document.getElementById('hud-score'),
      hudStreak: document.getElementById('hud-streak'),
      hudMultiplier: document.getElementById('hud-multiplier'),
      hudPairs: document.getElementById('hud-pairs'),
      hudTimer: document.getElementById('hud-timer'),
      feedbackBanner: document.getElementById('live-feedback'),
      tierPills: document.querySelectorAll('.tier-pill'),
      btnNewShift: document.getElementById('btn-new-shift'),
      btnPeek: document.getElementById('btn-peek'),
      btnHowTo: document.getElementById('btn-how-to'),
      btnSound: document.getElementById('btn-sound'),
      soundIconOn: document.getElementById('sound-icon-on'),
      soundIconOff: document.getElementById('sound-icon-off'),
      // Modals
      modalVictory: document.getElementById('modal-victory'),
      btnVicRestart: document.getElementById('btn-vic-restart'),
      btnVicCodex: document.getElementById('btn-vic-codex'),
      vicScore: document.getElementById('vic-score'),
      vicTime: document.getElementById('vic-time'),
      vicAccuracy: document.getElementById('vic-accuracy'),
      vicStreak: document.getElementById('vic-streak'),
      vicCocktailsList: document.getElementById('vic-cocktails-list'),
      // Codex
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

    this.bindEvents();
    this.renderCodex();
    this.startNewShift();
  }

  /* ------------------------------------------------------------------------
     EVENT BINDINGS
     ------------------------------------------------------------------------ */
  bindEvents() {
    // Sound Toggle
    this.dom.btnSound.addEventListener('click', () => this.toggleSound());

    // Difficulty Tabs
    this.dom.tierPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        const diff = e.currentTarget.dataset.difficulty;
        if (this.currentDifficulty === diff) return;
        this.dom.tierPills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        e.currentTarget.classList.add('active');
        e.currentTarget.setAttribute('aria-selected', 'true');
        this.currentDifficulty = diff;
        this.startNewShift();
      });
    });

    // Control Buttons
    this.dom.btnNewShift.addEventListener('click', () => this.startNewShift());
    this.dom.btnPeek.addEventListener('click', () => this.executePeek());
    this.dom.btnHowTo.addEventListener('click', () => this.openModal(this.dom.modalHandbook));

    // Victory Dialog Actions
    this.dom.btnVicRestart.addEventListener('click', () => {
      this.closeModal(this.dom.modalVictory);
      this.startNewShift();
    });
    this.dom.btnVicCodex.addEventListener('click', () => {
      this.closeModal(this.dom.modalVictory);
      this.openModal(this.dom.modalCodex);
    });

    // Codex Handlers
    this.dom.btnOpenCodex.addEventListener('click', () => this.openModal(this.dom.modalCodex));
    this.dom.btnCloseCodex.addEventListener('click', () => this.closeModal(this.dom.modalCodex));
    this.dom.codexSearch.addEventListener('input', (e) => this.filterCodex(e.target.value));
    this.dom.spiritFilters.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-pill')) {
        this.dom.spiritFilters.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        this.filterCodex(this.dom.codexSearch.value, e.target.dataset.filter);
      }
    });

    // Handbook close
    this.dom.btnCloseHandbook.addEventListener('click', () => this.closeModal(this.dom.modalHandbook));
    this.dom.btnCloseHandbookCta.addEventListener('click', () => this.closeModal(this.dom.modalHandbook));

    // Close on backdrop tap
    [this.dom.modalVictory, this.dom.modalCodex, this.dom.modalHandbook].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });
    });

    // Keyboard Access
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal(this.dom.modalVictory);
        this.closeModal(this.dom.modalCodex);
        this.closeModal(this.dom.modalHandbook);
      }
    });
  }

  /* ------------------------------------------------------------------------
     GAME SETUP & LOOP
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
    this.mistakesCount = 0;
    this.sessionDrinks.clear();

    const config = this.difficultyConfig[this.currentDifficulty];
    this.totalPairs = config.pairs;

    // Pick random cocktails from database
    const shuffledPool = [...COCKTAILS_DB].sort(() => 0.5 - Math.random());
    const selectedCocktails = shuffledPool.slice(0, this.totalPairs);

    // Build pair cards: One Cocktail Identity Card, One Spec Card
    const deck = [];
    selectedCocktails.forEach(cocktail => {
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

    // Shuffle cards with Fisher-Yates
    this.cards = this.shuffleArray(deck);

    // Apply grid class & render
    this.dom.grid.className = `card-grid ${config.gridClass}`;
    this.renderGrid();
    this.updateHUD();

    this.setFeedback('idle', 'Bar Station Active', 'Select any card to uncover cocktail title or recipe specification.');
    this.startTimer();
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
     RENDER CARDS
     ------------------------------------------------------------------------ */
  renderGrid() {
    this.dom.grid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    this.cards.forEach((cardData, idx) => {
      const cardEl = document.createElement('button');
      cardEl.className = 'memory-card';
      cardEl.dataset.index = idx;
      cardEl.setAttribute('aria-label', `Card ${idx + 1}: Face down`);
      cardEl.setAttribute('tabindex', '0');

      // Card Back
      const backFace = document.createElement('div');
      backFace.className = 'card-face card-face-back';
      backFace.innerHTML = `
        <div class="back-pattern-frame">
          <div class="back-crest">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M8 22h8M12 15v7M19 3l-7 8-7-8h14zM5 3l7 7 7-7"/>
            </svg>
            <span class="back-crest-text">SPEC</span>
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
            <span>🍸</span>
          </div>
          <h4 class="cocktail-name">${cardData.cocktail.name}</h4>
          <div class="cocktail-meta-group">
            <span class="mini-pill">${cardData.cocktail.spirit}</span>
            <span class="mini-pill">${cardData.cocktail.family}</span>
            <span class="mini-pill">${cardData.cocktail.glass}</span>
          </div>
        `;
      } else {
        frontFace.innerHTML = `
          <div class="card-top-tag">
            <span>Formula &amp; Method</span>
            <span>📖</span>
          </div>
          <div class="spec-formula">${cardData.cocktail.formula}</div>
          <div class="spec-sensory">"${cardData.cocktail.sensory}"</div>
          <span class="spec-method-badge">${cardData.cocktail.method}</span>
        `;
      }

      cardEl.appendChild(backFace);
      cardEl.appendChild(frontFace);

      // Event Listeners
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
     INTERACTION & MATCH RESOLUTION
     ------------------------------------------------------------------------ */
  handleCardSelection(cardEl, cardData) {
    if (this.synth) this.synth.init();

    // Guard conditions
    if (this.isBoardLocked) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    // Flip Card
    this.flipCard(cardEl, cardData);
    this.synth.playFlip();

    if (!this.firstCard) {
      this.firstCard = { el: cardEl, data: cardData };
      this.setFeedback('idle', 'Card Inspected', `Uncovered: ${cardData.cocktail.name} (${cardData.type === 'identity' ? 'Identity' : 'Formula'}). Select a partner.`);
      return;
    }

    // Second Card Selected
    this.secondCard = { el: cardEl, data: cardData };
    this.totalMoves++;
    this.isBoardLocked = true;

    // Evaluate pair
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
    cardEl.setAttribute('aria-label', `${cardData.type === 'identity' ? cardData.cocktail.name : cardData.cocktail.formula}`);
  }

  unflipCard(cardEl) {
    cardEl.classList.remove('flipped');
    cardEl.setAttribute('aria-label', 'Card: Face down');
  }

  handleMatchSuccess() {
    this.synth.playMatch();
    const cocktail = this.firstCard.data.cocktail;
    this.sessionDrinks.add(cocktail);

    // Visual State
    this.firstCard.el.classList.add('matched');
    this.secondCard.el.classList.add('matched');

    // Score & Multiplier Calculations
    this.streak++;
    if (this.streak > this.maxStreak) this.maxStreak = this.streak;
    const multiplier = Math.min(3.0, 1 + (this.streak - 1) * 0.5);

    const basePoints = 250;
    const earnedPoints = Math.round(basePoints * multiplier);
    this.score += earnedPoints;
    this.matchedPairsCount++;

    this.updateHUD();

    // Contextual Educational Feedback
    this.setFeedback('correct', `Matched: ${cocktail.name}`, `Technique: ${cocktail.method} • Serve: ${cocktail.glass} with ${cocktail.garnish}.`);

    this.resetSelection();

    // Check Victory
    if (this.matchedPairsCount === this.totalPairs) {
      setTimeout(() => this.concludeShift(), 650);
    }
  }

  handleMatchFailure() {
    this.synth.playMismatch();
    this.streak = 0;
    this.mistakesCount++;
    this.updateHUD();

    const c1 = this.firstCard.data.cocktail;
    const c2 = this.secondCard.data.cocktail;

    // Smart Bartender Near-Miss Diagnostics
    let clue = '';
    if (c1.spirit === c2.spirit) {
      clue = `Both feature ${c1.spirit}, but differ in method (${c1.method} vs ${c2.method}).`;
    } else if (c1.family === c2.family) {
      clue = `Both belong to the ${c1.family} style, but utilize different base spirits.`;
    } else {
      clue = `Distinct spirits (${c1.spirit} vs ${c2.spirit}) and different glassware (${c1.glass} vs ${c2.glass}).`;
    }

    this.setFeedback('mismatch', 'Recipe Mismatch', clue);

    // Card Shake
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
    }, 1150);
  }

  resetSelection() {
    this.firstCard = null;
    this.secondCard = null;
    this.isBoardLocked = false;
  }

  /* ------------------------------------------------------------------------
     STATION PEEK (Tactical Assist)
     ------------------------------------------------------------------------ */
  executePeek() {
    if (this.isBoardLocked || this.matchedPairsCount === this.totalPairs) return;
    this.isBoardLocked = true;
    this.score = Math.max(0, this.score - 150);
    this.updateHUD();

    const unmatchedCards = Array.from(this.dom.grid.querySelectorAll('.memory-card:not(.matched)'));
    unmatchedCards.forEach(c => c.classList.add('flipped'));

    this.setFeedback('idle', 'Station Glanced', 'The bar rail is momentarily revealed (-150 pts).');

    setTimeout(() => {
      unmatchedCards.forEach(c => c.classList.remove('flipped'));
      this.isBoardLocked = false;
    }, 1200);
  }

  /* ------------------------------------------------------------------------
     TIMER & HUD
     ------------------------------------------------------------------------ */
  startTimer() {
    this.isGameActive = true;
    this.elapsedSeconds = 0;
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      this.renderTime();
    }, 1000);
  }

  resetTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
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
    this.dom.feedbackBanner.querySelector('.feedback-icon').textContent = icon;
    this.dom.feedbackBanner.querySelector('.feedback-heading').textContent = heading;
    this.dom.feedbackBanner.querySelector('.feedback-text').textContent = text;
  }

  /* ------------------------------------------------------------------------
     SHIFT CONCLUSION & VICTORY MODAL
     ------------------------------------------------------------------------ */
  concludeShift() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.synth.playVictory();

    // Time & Accuracy calculation
    const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
    const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
    const formattedTime = `${mins}:${secs}`;
    
    const accuracy = this.totalMoves > 0 
      ? Math.round((this.totalPairs / this.totalMoves) * 100) 
      : 100;

    // Populate modal stats
    this.dom.vicScore.textContent = this.score.toLocaleString();
    this.dom.vicTime.textContent = formattedTime;
    this.dom.vicAccuracy.textContent = `${accuracy}%`;
    this.dom.vicStreak.textContent = `${this.maxStreak}x`;

    // Render recap drink badges
    this.dom.vicCocktailsList.innerHTML = '';
    this.sessionDrinks.forEach(drink => {
      const badge = document.createElement('span');
      badge.className = 'recap-badge';
      badge.innerHTML = `<span>🍸</span> <strong>${drink.name}</strong> (${drink.spirit})`;
      this.dom.vicCocktailsList.appendChild(badge);
    });

    this.openModal(this.dom.modalVictory);
  }

  /* ------------------------------------------------------------------------
     CABINET CODEX SYSTEM
     ------------------------------------------------------------------------ */
  renderCodex(filteredList = COCKTAILS_DB) {
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
          <div><strong>Method:</strong> ${item.method}</div>
          <div><strong>Glass:</strong> ${item.glass}</div>
          <div><strong>Ice:</strong> ${item.ice}</div>
          <div><strong>Garnish:</strong> ${item.garnish}</div>
        </div>
        <div class="codex-detail-row">
          <strong>Historical Note:</strong> ${item.history}
        </div>
        <div class="codex-detail-row" style="color: #d19a86;">
          <strong>Pitfall Avoidance:</strong> ${item.mistake}
        </div>
      `;
      fragment.appendChild(card);
    });

    this.dom.codexList.appendChild(fragment);
  }

  filterCodex(query = '', spiritFilter = 'all') {
    const q = query.toLowerCase().trim();
    let currentFilter = spiritFilter;
    if (currentFilter === 'all') {
      const activePill = this.dom.spiritFilters.querySelector('.filter-pill.active');
      currentFilter = activePill ? activePill.dataset.filter : 'all';
    }

    const filtered = COCKTAILS_DB.filter(drink => {
      const matchesSearch = !q || 
        drink.name.toLowerCase().includes(q) ||
        drink.spirit.toLowerCase().includes(q) ||
        drink.formula.toLowerCase().includes(q) ||
        drink.family.toLowerCase().includes(q);

      const matchesSpirit = currentFilter === 'all' || 
        drink.spirit.toLowerCase() === currentFilter.toLowerCase();

      return matchesSearch && matchesSpirit;
    });

    this.renderCodex(filtered);
  }

  /* ------------------------------------------------------------------------
     MODAL CONTROLS & UTILITIES
     ------------------------------------------------------------------------ */
  openModal(modalEl) {
    modalEl.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  closeModal(modalEl) {
    modalEl.classList.add('hidden');
    document.body.style.overflow = '';
  }

  toggleSound() {
    this.synth.muted = !this.synth.muted;
    if (this.synth.muted) {
      this.dom.soundIconOn.classList.add('hidden');
      this.dom.soundIconOff.classList.remove('hidden');
    } else {
      this.dom.soundIconOn.classList.remove('hidden');
      this.dom.soundIconOff.classList.add('hidden');
      this.synth.playFlip();
    }
  }
}

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  window.cocktailGame = new CocktailMemoryGame();
});