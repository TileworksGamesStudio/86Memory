/**
 * ============================================================================
 * COCKTAIL MEMORY — CONTENT DATABASE (puzzles.js)
 * Master Curriculum & Daily Puzzle Collection
 *
 * ARCHITECTURAL CONTRACT:
 * - Adding new puzzles: Append a new puzzle object to the end of the array.
 * - No changes to index.html, style.css, or script.js are needed.
 * - Every puzzle contains exactly 8 distinct cocktail pairs (16 cards total).
 * - Each card object has: id, name, glass, spec, lore, category, iconSvg.
 * ============================================================================
 */

window.COCKTAIL_MEMORY_PUZZLES = [
  /* ==========================================================================
     PUZZLE 1 (DAY 1) — LEVEL 1: ACCESSIBLE FOUNDATIONS
     Curriculum: Classic Cocktails, Sours & Aperitivos
     Difficulty: BEGINNER
     ========================================================================== */
  {
    id: "cm-001",
    title: "Aperitivo & Classic Sours",
    difficulty: "EASY",
    category: "Classic Cocktails",
    description: "Foundational classics known by every cocktail enthusiast and lounge bartender worldwide.",
    pairs: [
      {
        id: "negroni",
        name: "Negroni",
        glass: "Rocks Glass",
        spec: "1 oz Gin, 1 oz Campari, 1 oz Sweet Vermouth",
        lore: "Invented at Caffè Casoni in Florence in 1919 when Count Camillo Negroni requested gin instead of soda.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="5" width="12" height="15" rx="1.5"></rect><line x1="6" y1="10" x2="18" y2="10"></line><path d="M10 13l4 4"></path></svg>`
      },
      {
        id: "daiquiri",
        name: "Daiquiri",
        glass: "Coupe",
        spec: "2 oz White Rum, 3/4 oz Fresh Lime Juice, 3/4 oz Simple Syrup",
        lore: "A Cuban mining town classic that serves as the ultimate test of balance between rum, lime, and sugar.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h14l-4 8H9L5 4z"></path><line x1="12" y1="12" x2="12" y2="20"></line><line x1="8" y1="20" x2="16" y2="20"></line></svg>`
      },
      {
        id: "margarita",
        name: "Margarita",
        glass: "Coupe / Rocks",
        spec: "2 oz Blanco Tequila, 1 oz Cointreau, 3/4 oz Lime Juice",
        lore: "The queen of the Daisy cocktail family, balanced with fresh lime and an optional half-salted rim.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5h16l-3 6a5 5 0 0 1-5 4 5 5 0 0 1-5-4L4 5z"></path><line x1="12" y1="15" x2="12" y2="20"></line><line x1="8" y1="20" x2="16" y2="20"></line></svg>`
      },
      {
        id: "manhattan",
        name: "Manhattan",
        glass: "Nick & Nora",
        spec: "2 oz Rye Whiskey, 1 oz Sweet Vermouth, 2 dashes Angostura",
        lore: "Conceived at New York's Manhattan Club circa the 1870s; traditionally stirred and garnished with a cherry.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 4h10l-2 7a3 3 0 0 1-3 3 3 3 0 0 1-3-3L7 4z"></path><line x1="12" y1="14" x2="12" y2="20"></line><line x1="9" y1="20" x2="15" y2="20"></line></svg>`
      },
      {
        id: "aperol_spritz",
        name: "Aperol Spritz",
        glass: "Wine Glass",
        spec: "3 oz Prosecco, 2 oz Aperol, 1 oz Soda Water",
        lore: "The ubiquitous Venetian aperitivo built over ice with an orange slice according to the 3-2-1 rule.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 4h10a5 5 0 0 1-5 9 5 5 0 0 1-5-9z"></path><line x1="12" y1="13" x2="12" y2="20"></line><line x1="8" y1="20" x2="16" y2="20"></line></svg>`
      },
      {
        id: "whiskey_sour",
        name: "Whiskey Sour",
        glass: "Rocks Glass",
        spec: "2 oz Bourbon, 3/4 oz Lemon Juice, 1/2 oz Simple Syrup, Egg White",
        lore: "First codified in Jerry Thomas' 1862 guide; the egg white gives a silky foam head and velvety texture.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="6" width="12" height="14" rx="2"></rect><line x1="6" y1="11" x2="18" y2="11"></line><circle cx="12" cy="15" r="1.5"></circle></svg>`
      },
      {
        id: "espresso_martini",
        name: "Espresso Martini",
        glass: "Coupe",
        spec: "1.5 oz Vodka, 1 oz Fresh Espresso, 2/3 oz Kahlúa, 1/4 oz Simple",
        lore: "Created by Dick Bradsell at Fred's Club in London (1983) for a model requesting a drink that would 'wake me up'.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 5h12l-6 8-6-8z"></path><line x1="12" y1="13" x2="12" y2="20"></line><line x1="8" y1="20" x2="16" y2="20"></line><circle cx="12" cy="8" r="1"></circle></svg>`
      },
      {
        id: "gimlet",
        name: "Gimlet",
        glass: "Coupe",
        spec: "2 oz London Dry Gin, 3/4 oz Lime Cordial / Fresh Lime",
        lore: "Popularized in the Royal Navy by Rear Admiral Sir Thomas Gimlette to combat scurvy among officers.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4h12l-3 7H9L6 4z"></path><line x1="12" y1="11" x2="12" y2="19"></line><line x1="9" y1="19" x2="15" y2="19"></line></svg>`
      }
    ]
  },

  /* ==========================================================================
     PUZZLE 2 (DAY 2) — LEVEL 2: HIGHBALLS, FIZZES & COLLINSES
     Curriculum: Cocktail Families & Dilution
     Difficulty: EASY
     ========================================================================== */
  {
    id: "cm-002",
    title: "Highballs, Fizzes & Long Drinks",
    difficulty: "EASY",
    category: "Cocktail Families",
    description: "Refreshing, effervescent highballs that celebrate lengthened spirits, citrus, and premium carbonation.",
    pairs: [
      {
        id: "tom_collins",
        name: "Tom Collins",
        glass: "Collins Glass",
        spec: "2 oz Old Tom Gin, 1 oz Lemon, 1/2 oz Simple, Club Soda",
        lore: "Born from the Great Tom Collins Hoax of 1874 that sent New Yorkers racing to bars looking for a slanderer.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="3" width="8" height="18" rx="1"></rect><line x1="8" y1="8" x2="16" y2="8"></line><circle cx="12" cy="13" r="1.5"></circle></svg>`
      },
      {
        id: "paloma",
        name: "Paloma",
        glass: "Highball",
        spec: "2 oz Tequila, 1/2 oz Lime Juice, Grapefruit Soda, Pinch of Salt",
        lore: "Mexico's most beloved everyday highball, traditionally paired with Squirt or Jarritos grapefruit soda.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="4" width="10" height="16" rx="1"></rect><line x1="7" y1="9" x2="17" y2="9"></line><line x1="10" y1="14" x2="14" y2="14"></line></svg>`
      },
      {
        id: "moscow_mule",
        name: "Moscow Mule",
        glass: "Copper Mug",
        spec: "2 oz Vodka, 1/2 oz Fresh Lime Juice, 4 oz Spicy Ginger Beer",
        lore: "Devised in 1941 to popularize Smirnoff vodka and Cock 'n Bull ginger beer; served in distinctive copper mugs.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="5" width="12" height="15" rx="2"></rect><path d="M17 8h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3"></path></svg>`
      },
      {
        id: "dark_n_stormy",
        name: "Dark 'n Stormy",
        glass: "Highball",
        spec: "2 oz Goslings Black Seal Rum, 1/2 oz Lime, Ginger Beer",
        lore: "Bermuda's national drink; trademarked by Goslings, noted for its storm-cloud-like dark rum float.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="4" width="10" height="16" rx="1"></rect><path d="M7 8c2-1 4 1 6 0s2-1 4 0"></path></svg>`
      },
      {
        id: "french_75",
        name: "French 75",
        glass: "Champagne Flute",
        spec: "1 oz Gin, 1/2 oz Lemon Juice, 1/2 oz Simple Syrup, Champagne",
        lore: "Named after the French 75mm field artillery gun for its remarkably punchy, celebratory kick.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 4h8l-2 9H10L8 4z"></path><line x1="12" y1="13" x2="12" y2="20"></line><line x1="9" y1="20" x2="15" y2="20"></line></svg>`
      },
      {
        id: "americano",
        name: "Americano",
        glass: "Highball",
        spec: "1.5 oz Campari, 1.5 oz Sweet Vermouth, Splash of Soda",
        lore: "Originally known as the Milano-Torino; renamed due to its immense popularity with American tourists during Prohibition.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="5" width="10" height="15" rx="1"></rect><line x1="7" y1="10" x2="17" y2="10"></line></svg>`
      },
      {
        id: "gin_fizz",
        name: "Gin Fizz",
        glass: "Fizz Glass",
        spec: "2 oz Gin, 1 oz Lemon Juice, 3/4 oz Simple Syrup, Club Soda",
        lore: "A vigorously shaken classic sour topped with soda water, celebrated for its tight, pillowy carbonation.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="4" width="8" height="16" rx="1"></rect><circle cx="12" cy="8" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="16" r="1"></circle></svg>`
      },
      {
        id: "horses_neck",
        name: "Horse's Neck",
        glass: "Highball",
        spec: "2 oz Brandy or Bourbon, Ginger Ale, 2 dashes Bitters, Long Lemon Peel",
        lore: "Defined by its signature uncut spiral of lemon peel draped over the rim resembling a horse's neck.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="5" width="10" height="15" rx="1"></rect><path d="M17 5c-2 3-5 5-7 8"></path></svg>`
      }
    ]
  },

  /* ==========================================================================
     PUZZLE 3 (DAY 3) — LEVEL 3: BOTANICALS, BITTERS & FORTIFIED WINE
     Curriculum: Bitters, Vermouth & Aromatized Wines
     Difficulty: MEDIUM
     ========================================================================== */
  {
    id: "cm-003",
    title: "Botanicals, Bitters & Fortified Wine",
    difficulty: "MED",
    category: "Bitters & Vermouth",
    description: "Complex, spirit-forward stirred masterpieces emphasizing botanical balance and aromatic fortification.",
    pairs: [
      {
        id: "martinez",
        name: "Martinez",
        glass: "Coupe",
        spec: "1.5 oz Old Tom Gin, 1.5 oz Sweet Vermouth, 1/4 oz Maraschino, Angostura",
        lore: "The 19th-century grandfather of the modern Martini, bridges heavy botanical gin and rich vermouth.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h14l-4 7H9L5 4z"></path><line x1="12" y1="11" x2="12" y2="19"></line><line x1="8" y1="19" x2="16" y2="19"></line></svg>`
      },
      {
        id: "sazerac",
        name: "Sazerac",
        glass: "Rocks (Neat)",
        spec: "2 oz Rye Whiskey, 1 Sugar Cube, 3 dashes Peychaud's, Herbsaint/Absinthe Rinse",
        lore: "Official cocktail of New Orleans, served chilled without ice in an aromatic absinthe-rinsed glass.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="6" width="12" height="13" rx="1.5"></rect><line x1="9" y1="15" x2="15" y2="15"></line></svg>`
      },
      {
        id: "vieux_carre",
        name: "Vieux Carré",
        glass: "Rocks Glass",
        spec: "3/4 oz Rye, 3/4 oz Cognac, 3/4 oz Sweet Vermouth, Barspoon Bénédictine, Bitters",
        lore: "Crafted in 1938 by Walter Bergeron at the legendary Carousel Piano Bar in the French Quarter.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="5" width="12" height="14" rx="2"></rect><circle cx="12" cy="12" r="2.5"></circle></svg>`
      },
      {
        id: "boulevardier",
        name: "Boulevardier",
        glass: "Coupe / Rocks",
        spec: "1.25 oz Bourbon or Rye, 1 oz Campari, 1 oz Sweet Vermouth",
        lore: "Created by Erskine Gwynne for expatriates in 1920s Paris, swapping gin for American whiskey.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 5h12l-3 7H9L6 5z"></path><line x1="12" y1="12" x2="12" y2="19"></line><line x1="8" y1="19" x2="16" y2="19"></line></svg>`
      },
      {
        id: "hanky_panky",
        name: "Hanky Panky",
        glass: "Coupe",
        spec: "1.5 oz London Dry Gin, 1.5 oz Sweet Vermouth, 2 dashes Fernet-Branca",
        lore: "Invented by Ada Coleman at London's Savoy Hotel American Bar for theatrical actor Sir Charles Hawtrey.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h14l-4 8H9L5 4z"></path><line x1="12" y1="12" x2="12" y2="20"></line><line x1="8" y1="20" x2="16" y2="20"></line></svg>`
      },
      {
        id: "bijou",
        name: "Bijou",
        glass: "Coupe",
        spec: "1 oz Gin, 1 oz Green Chartreuse, 1 oz Sweet Vermouth, Dash Orange Bitters",
        lore: "Named after jewels: diamond (gin), emerald (Chartreuse), and ruby (sweet vermouth).",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 3 19 8 16 15 8 15 5 8 12 3"></polygon></svg>`
      },
      {
        id: "bamboo",
        name: "Bamboo",
        glass: "Nick & Nora",
        spec: "1.5 oz Fino Sherry, 1.5 oz Dry Vermouth, 2 dashes Angostura & Orange Bitters",
        lore: "Created in the 1890s by German bartender Louis Eppinger at the Grand Hotel in Yokohama, Japan.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 5h10l-2 7a3 3 0 0 1-6 0L7 5z"></path><line x1="12" y1="12" x2="12" y2="19"></line><line x1="9" y1="19" x2="15" y2="19"></line></svg>`
      },
      {
        id: "clover_club",
        name: "Clover Club",
        glass: "Coupe",
        spec: "1.5 oz Gin, 1/2 oz Dry Vermouth, 1/2 oz Lemon, 1/2 oz Raspberry Syrup, Egg White",
        lore: "Originated at Philadelphia's Bellevue-Stratford Hotel in the 1880s for prominent literary club members.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 5h14l-4 7H9L5 5z"></path><line x1="12" y1="12" x2="12" y2="20"></line><line x1="8" y1="20" x2="16" y2="20"></line><circle cx="12" cy="8" r="1"></circle></svg>`
      }
    ]
  },

  /* ==========================================================================
     PUZZLE 4 (DAY 4) — LEVEL 4: TIKI, TROPICAL & COMPLEX SWEETENERS
     Curriculum: Tiki & Tropical Cocktails, Ratios & Balance
     Difficulty: HARD
     ========================================================================== */
  {
    id: "cm-004",
    title: "Tiki, Tropical & Polynesiana",
    difficulty: "HARD",
    category: "Tiki & Tropical",
    description: "Multi-rum harmonies, exotic spice syrups, orgeat, and mid-century tropical escapism.",
    pairs: [
      {
        id: "mai_tai",
        name: "1944 Mai Tai",
        glass: "Double Rocks",
        spec: "2 oz Aged Jamaican Rum, 3/4 oz Lime, 1/2 oz Curaçao, 1/4 oz Orgeat, 1/4 oz Rich Simple",
        lore: "Conceived by Victor 'Trader Vic' Bergeron; when served to Tahitian friends Carrie and Eastham Guild, they cried 'Mai Tai-Roa Aé!'.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="5" width="12" height="15" rx="1"></rect><path d="M6 10h12"></path><circle cx="12" cy="14" r="2"></circle></svg>`
      },
      {
        id: "zombie",
        name: "Zombie",
        glass: "Zombie Glass / Chimney",
        spec: "1.5 oz Jamaican Rum, 1.5 oz Gold Puerto Rican, 1 oz 151 Demerara, Don's Mix, Falernum",
        lore: "Crafted in 1934 by Donn Beach; strictly limited to 'two to a customer' due to its legendary potency.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="2" width="8" height="20" rx="1"></rect><line x1="8" y1="6" x2="16" y2="6"></line><line x1="8" y1="16" x2="16" y2="16"></line></svg>`
      },
      {
        id: "jungle_bird",
        name: "Jungle Bird",
        glass: "Double Rocks / Tiki Mug",
        spec: "1.5 oz Blackstrap Rum, 3/4 oz Campari, 1.5 oz Pineapple Juice, 1/2 oz Lime, 1/2 oz Demerara",
        lore: "Created in 1973 at the Aviary Bar inside the Kuala Lumpur Hilton, a rare and brilliant bridge of tiki and Italian bitter.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="5" width="12" height="15" rx="1.5"></rect><path d="M12 5v15"></path></svg>`
      },
      {
        id: "painkiller",
        name: "Painkiller",
        glass: "Hurricane / Mug",
        spec: "2 oz Pusser's Rum, 4 oz Pineapple Juice, 1 oz Orange Juice, 1 oz Cream of Coconut, Grated Nutmeg",
        lore: "Originated in the 1970s at the Soggy Dollar Bar on Jost Van Dyke in the British Virgin Islands.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 4h10c0 4-3 6-3 8 0 3 3 5 3 8H7c0-3 3-5 3-8 0-2-3-4-3-8z"></path></svg>`
      },
      {
        id: "ti_punch",
        name: "Ti' Punch",
        glass: "Small Rocks",
        spec: "2 oz Rhum Agricole, 1 Barspoon Sirop de Canne, Lime Disc / Swatch",
        lore: "Martinique & Guadeloupe's national emblem, served according to 'chacun prépare sa propre mort' (each prepares their own death).",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="7" width="10" height="12" rx="1"></rect><circle cx="12" cy="13" r="2"></circle></svg>`
      },
      {
        id: "saturn",
        name: "Saturn",
        glass: "Coupe",
        spec: "1.25 oz London Dry Gin, 1/2 oz Lemon, 1/2 oz Passionfruit, 1/4 oz Orgeat, 1/4 oz Falernum",
        lore: "A rare gin-based tiki masterpiece invented in 1967 by J. 'Popo' Galsini that won the IBA World Cocktail Championship.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="12" rx="8" ry="3"></ellipse><circle cx="12" cy="12" r="5"></circle></svg>`
      },
      {
        id: "fog_cutter",
        name: "Fog Cutter",
        glass: "Tiki Mug / Highball",
        spec: "2 oz White Rum, 1 oz Cognac, 1/2 oz Gin, 2 oz Orange, 1 oz Lemon, 1/2 oz Orgeat, Sherry Float",
        lore: "Trader Vic famously warned: 'After drinking two of these, the fog begins to roll in rapidly.'",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="7" y="4" width="10" height="17" rx="1"></rect><path d="M7 11h10"></path></svg>`
      },
      {
        id: "queens_park_swizzle",
        name: "Queen's Park Swizzle",
        glass: "Collins / Swizzle Glass",
        spec: "2 oz Demerara Rum, 1/2 oz Lime, 1/2 oz Simple, 8 Mint Leaves, Angostura Float",
        lore: "Born at the Queen's Park Hotel in Port of Spain, Trinidad; swizzled over crushed ice with a real bois lélé stick.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="3" width="8" height="18" rx="1"></rect><path d="M12 3v18"></path><path d="M9 18l6-4"></path></svg>`
      }
    ]
  },

  /* ==========================================================================
     PUZZLE 5 (DAY 5) — LEVEL 5: PROHIBITION & DEEP COCKTAIL ALCHEMY
     Curriculum: Prohibition Era, Speakeasies & Advanced Lore
     Difficulty: EXPERT
     ========================================================================== */
  {
    id: "cm-005",
    title: "Speakeasy Era & Forgotten Alchemy",
    difficulty: "EXPERT",
    category: "Prohibition & Speakeasies",
    description: "Equal-parts puzzles, obscure revivers, and historical concoctions of the Golden and Speakeasy Eras.",
    pairs: [
      {
        id: "corpse_reviver_2",
        name: "Corpse Reviver No. 2",
        glass: "Coupe",
        spec: "3/4 oz Gin, 3/4 oz Cointreau, 3/4 oz Lillet Blanc, 3/4 oz Lemon, Dash Absinthe",
        lore: "Featured in Harry Craddock's 1930 Savoy Cocktail Book with the warning: 'Four taken in swift succession will unrevive the corpse again.'",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h14l-4 7H9L5 4z"></path><line x1="12" y1="11" x2="12" y2="19"></line><line x1="8" y1="19" x2="16" y2="19"></line></svg>`
      },
      {
        id: "last_word",
        name: "The Last Word",
        glass: "Coupe",
        spec: "3/4 oz Gin, 3/4 oz Green Chartreuse, 3/4 oz Maraschino, 3/4 oz Lime",
        lore: "Created during Prohibition at the Detroit Athletic Club; famously rediscovered by Murray Stenson at Seattle's Zig Zag Café in 2004.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 5h12l-3 7H9L6 5z"></path><line x1="12" y1="12" x2="12" y2="20"></line><line x1="8" y1="20" x2="16" y2="20"></line></svg>`
      },
      {
        id: "aviation",
        name: "Aviation",
        glass: "Coupe",
        spec: "2 oz Gin, 1/2 oz Maraschino Liqueur, 1/4 oz Crème de Violette, 3/4 oz Lemon",
        lore: "Published in 1916 by Hugo Ensslin; the Crème de Violette imparts a sky-blue hue reminiscent of early aviation flights.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 5h14l-4 8H9L5 5z"></path><line x1="12" y1="13" x2="12" y2="20"></line><line x1="8" y1="20" x2="16" y2="20"></line></svg>`
      },
      {
        id: "ramos_gin_fizz",
        name: "Ramos Gin Fizz",
        glass: "Collins (No Ice)",
        spec: "2 oz Gin, 1/2 oz Lemon, 1/2 oz Lime, 3/4 oz Simple, 1 oz Cream, Egg White, Orange Blossom Water, Soda",
        lore: "Invented in 1888 by Henry C. Ramos in New Orleans; shaken continuously for 12 minutes by a line of 'shaker boys'.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="4" width="8" height="17" rx="1"></rect><line x1="8" y1="9" x2="16" y2="9"></line><circle cx="12" cy="6" r="1.5"></circle></svg>`
      },
      {
        id: "remember_the_maine",
        name: "Remember the Maine",
        glass: "Coupe",
        spec: "2 oz Rye Whiskey, 3/4 oz Sweet Vermouth, 2 tsp Cherry Heering, 1/2 tsp Absinthe",
        lore: "Named after the 1898 battleship sinking in Havana Harbor; immortalized by Charles H. Baker Jr. in The Gentleman's Companion (1939).",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4h12l-3 8H9L6 4z"></path><line x1="12" y1="12" x2="12" y2="20"></line><line x1="8" y1="20" x2="16" y2="20"></line></svg>`
      },
      {
        id: "blood_and_sand",
        name: "Blood & Sand",
        glass: "Coupe",
        spec: "3/4 oz Blended Scotch, 3/4 oz Cherry Heering, 3/4 oz Sweet Vermouth, 3/4 oz Fresh Orange Juice",
        lore: "Named after Rudolph Valentino's 1922 bullfighter movie; a rare, storied classic incorporating both Scotch whisky and fresh orange.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 4h14l-4 7H9L5 4z"></path><line x1="12" y1="11" x2="12" y2="19"></line><line x1="8" y1="19" x2="16" y2="19"></line></svg>`
      },
      {
        id: "penicillin",
        name: "Penicillin",
        glass: "Rocks Glass",
        spec: "2 oz Blended Scotch, 3/4 oz Lemon Juice, 3/8 oz Honey Syrup, 3/8 oz Ginger Syrup, Islay Float",
        lore: "Created in 2005 by Sam Ross at Milk & Honey in NYC; the smoky Islay Scotch float acts as an aromatic cure-all.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="6" y="6" width="12" height="14" rx="2"></rect><line x1="6" y1="10" x2="18" y2="10"></line><circle cx="12" cy="15" r="2"></circle></svg>`
      },
      {
        id: "el_presidente",
        name: "El Presidente",
        glass: "Coupe",
        spec: "1.5 oz White Rum, 1.5 oz Blanc/Dry Vermouth, 1 barspoon Orange Curaçao, 1/2 barspoon Grenadine",
        lore: "Cuban Prohibition-era icon crafted at the Sevilla Biltmore Hotel in Havana for President Mario García Menocal.",
        iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 5h14l-4 7H9L5 5z"></path><line x1="12" y1="12" x2="12" y2="20"></line><line x1="8" y1="20" x2="16" y2="20"></line></svg>`
      }
    ]
  }
];