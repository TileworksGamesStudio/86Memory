/**
 * THE COCKTAIL CABINET — MASTER BARTENDER MEMORY & CODEX
 * Production Game Engine, Synthesizer, Storage Persistence & Screen Navigation Engine
 */

'use strict';

/* ==========================================================================
   1. COCKTAIL DATASET (EXACTLY 5 PLAYABLE CLASSIC EXAMPLES)
   ========================================================================== */
const COCKTAILS_DB = [
  /* ==========================================================================
     1. GIN CANON (12 DRINKS)
     ========================================================================== */
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
    id: 'dry-martini',
    name: 'Dry Martini',
    difficulty: 'Bartender',
    spirit: 'Gin',
    family: 'Spirit-Forward / Aromatic',
    formula: '2.5 oz London Dry Gin, 0.5 oz Dry Vermouth, 1 dash Orange Bitters',
    technique: 'Stir vigorously with dense ice until frost forms on mixing glass',
    glassware: 'Chilled Nick & Nora or Martini',
    ice: 'None (Served Up)',
    garnish: 'Expressed lemon twist or skewered Castelvetrano olive',
    sensoryProfile: 'Laser-sharp juniper botanicals, bone-dry chamomile floral notes, and crisp citrus oil.',
    origin: 'United States (late 19th century); evolved from the sweeter Martinez cocktail.',
    pitfall: 'Using warm or oxidized dry vermouth; vermouth must be refrigerated once uncorked.'
  },
  {
    id: 'gimlet',
    name: 'Gimlet',
    difficulty: 'Apprentice',
    spirit: 'Gin',
    family: 'Classic Sour',
    formula: '2 oz London Dry Gin, 0.75 oz Fresh Lime Juice, 0.75 oz Simple Syrup (1:1)',
    technique: 'Hard vigorous shake with solid ice cubes and fine strain',
    glassware: 'Coupe',
    ice: 'None (Served Up)',
    garnish: 'Thin dehydrated lime wheel',
    sensoryProfile: 'Bright, zesty, clean acidity cutting through high-proof botanical warmth.',
    origin: 'British Royal Navy (c. late 19th century) popularized by Surgeon Rear-Admiral Thomas Gimlette.',
    pitfall: 'Substituting high-fructose bottled cordial for fresh lime and pure cane syrup.'
  },
  {
    id: 'aviation',
    name: 'Aviation',
    difficulty: 'Bartender',
    spirit: 'Gin',
    family: 'Floral Sour',
    formula: '2 oz Gin, 0.5 oz Maraschino Liqueur, 0.25 oz Crème de Violette, 0.75 oz Lemon Juice',
    technique: 'Shake hard with ice and double strain into a frosty glass',
    glassware: 'Chilled Coupe',
    ice: 'None (Served Up)',
    garnish: 'Brandied Luxardo cherry submerged at bottom',
    sensoryProfile: 'Airy lavender flora, dry stone-fruit cherry, and sharp tart citrus bite.',
    origin: 'Hotel Wallick, New York (c. 1916) published by head bartender Hugo Ensslin.',
    pitfall: 'Heavy-handed Crème de Violette; excess violette makes the drink taste like soap and turns gray.'
  },
  {
    id: 'last-word',
    name: 'The Last Word',
    difficulty: 'Head Bartender',
    spirit: 'Gin',
    family: 'Equal Parts Sour',
    formula: '0.75 oz Gin, 0.75 oz Green Chartreuse, 0.75 oz Maraschino Liqueur, 0.75 oz Lime Juice',
    technique: 'Violent aeration shake with dense cold ice, double strain',
    glassware: 'Coupe or Nick & Nora',
    ice: 'None (Served Up)',
    garnish: 'Brandied cherry drop (optional)',
    sensoryProfile: 'Alpine herbal punch, medicinal anise, cherry wood dryness, and vivid lime acidity.',
    origin: 'Detroit Athletic Club (c. 1915); rediscovered by Murray Stenson at Zig Zag Café in 2004.',
    pitfall: 'Eyeballing measurements; equal-parts cocktails collapse if 130-proof Chartreuse overpowers.'
  },
  {
    id: 'french-75',
    name: 'French 75',
    difficulty: 'Apprentice',
    spirit: 'Gin',
    family: 'Sparkling / French',
    formula: '1 oz Gin, 0.5 oz Fresh Lemon Juice, 0.5 oz Simple Syrup, 3 oz Dry Champagne',
    technique: 'Shake gin, lemon, and syrup with ice; strain into flute and top with Champagne',
    glassware: 'Champagne Flute',
    ice: 'None',
    garnish: 'Long spiral lemon twist ribbon',
    sensoryProfile: 'Effervescent, dry brioche toast, bright lemony zing, and brisk botanical punch.',
    origin: 'Paris, France (c. World War I) named after the rapid-firing French 75mm artillery cannon.',
    pitfall: 'Shaking the sparkling wine in the tin; always add Champagne directly to the glass after straining.'
  },
  {
    id: 'clover-club',
    name: 'Clover Club',
    difficulty: 'Bartender',
    spirit: 'Gin',
    family: 'Egg White Sour',
    formula: '1.5 oz Gin, 0.5 oz Dry Vermouth, 0.5 oz Fresh Lemon Juice, 0.5 oz Raspberry Syrup, 1 Egg White',
    technique: 'Dry shake without ice for 10s, then wet shake hard with ice; double strain',
    glassware: 'Chilled Coupe',
    ice: 'None (Served Up)',
    garnish: 'Three fresh raspberries on a bamboo pick',
    sensoryProfile: 'Velvety silken meringue texture, vibrant berry sweetness, dry herbal complexity.',
    origin: 'Bellevue-Stratford Hotel, Philadelphia (c. 1880s) for a gentleman’s literary club.',
    pitfall: 'Skipping the dry shake; without warm emulsification, egg whites fail to build a dense head.'
  },
  {
    id: 'ramos-gin-fizz',
    name: 'Ramos Gin Fizz',
    difficulty: 'Head Bartender',
    spirit: 'Gin',
    family: 'Fizz / Dairy',
    formula: '2 oz Gin, 0.5 oz Lemon, 0.5 oz Lime, 0.75 oz Simple, 1 oz Heavy Cream, 1 Egg White, 3 drops Orange Flower Water, 1 oz Soda Water',
    technique: 'Long dry shake (3-5 min), hard wet shake, strain into Collins, chill 1 min, punch soda from bottom',
    glassware: 'Delmonico or Tall Collins (un-iced)',
    ice: 'None',
    garnish: 'Stiff architectural foam soufflé rising 1 inch above rim',
    sensoryProfile: 'Key lime pie, ethereal botanical blossom perfume, luxurious creamy cloud texture.',
    origin: 'Imperial Cabinet Saloon, New Orleans (1888) created by Henry C. Ramos.',
    pitfall: 'Pouring soda on top of the foam; soda must be gently introduced to lift the soufflé column intact.'
  },
  {
    id: 'corpse-reviver-2',
    name: 'Corpse Reviver No. 2',
    difficulty: 'Bartender',
    spirit: 'Gin',
    family: 'Equal Parts Sour',
    formula: '0.75 oz London Dry Gin, 0.75 oz Lillet Blanc, 0.75 oz Cointreau, 0.75 oz Lemon Juice, 1 dash Absinthe rinse',
    technique: 'Rinse chilled coupe with absinthe; shake remaining ingredients hard with ice and double strain',
    glassware: 'Chilled Coupe',
    ice: 'None (Served Up)',
    garnish: 'Stemless brandied cherry or expressed lemon coin',
    sensoryProfile: 'Vibrant, bright orange blossom, botanical juniper, mild anise perfume, and mouth-watering citrus snap.',
    origin: 'The Savoy, London (c. 1930) popularized in Harry Craddock’s Savoy Cocktail Book.',
    pitfall: 'Over-rinsing with absinthe; an excess pool of absinthe numbs the palate and masks Lillet’s floral notes.'
  },
  {
    id: 'martinez',
    name: 'Martinez',
    difficulty: 'Head Bartender',
    spirit: 'Gin',
    family: 'Spirit-Forward / Ancestral',
    formula: '1.5 oz Old Tom Gin, 1.5 oz Sweet Vermouth, 1 barspoon Maraschino Liqueur, 2 dashes Angostura Bitters',
    technique: 'Stir with dense ice for 30s; strain into chilled stemware',
    glassware: 'Nick & Nora',
    ice: 'None (Served Up)',
    garnish: 'Expressed orange peel twist',
    sensoryProfile: 'Malty botanical sweetness, rich spiced wine, dry nut cherry undertones, and warm herbal depth.',
    origin: 'United States (c. 1884) published by O.H. Byron; the direct evolutionary missing link between Manhattan and Martini.',
    pitfall: 'Using dry London dry gin instead of botanical, maltier Old Tom gin; the balance requires rounder gin sweetness.'
  },
  {
    id: 'tom-collins',
    name: 'Tom Collins',
    difficulty: 'Apprentice',
    spirit: 'Gin',
    family: 'Collins / Long Drink',
    formula: '2 oz Old Tom Gin, 0.75 oz Fresh Lemon Juice, 0.75 oz Simple Syrup, 3 oz Club Soda',
    technique: 'Shake gin, lemon, and syrup with ice; strain into ice-filled Collins glass and top with sparkling soda',
    glassware: 'Collins Glass',
    ice: 'Clear ice column or dense cubes',
    garnish: 'Lemon wheel & maraschino cherry flag',
    sensoryProfile: 'Effervescent sparkling lemonade, zesty citrus peel, and gentle juniper herbal warmth.',
    origin: 'Limmer’s Old House, London (c. 1860s) codified during the Great Tom Collins Hoax of 1874.',
    pitfall: 'Over-stirring after adding club soda; brief, gentle lift preserves carbonation.'
  },
  {
    id: 'bees-knees',
    name: 'Bee’s Knees',
    difficulty: 'Apprentice',
    spirit: 'Gin',
    family: 'Classic Sour',
    formula: '2 oz Gin, 0.75 oz Fresh Lemon Juice, 0.75 oz Honey Syrup (3 parts honey to 1 part warm water)',
    technique: 'Shake vigorously with ice and double strain into chilled coupe',
    glassware: 'Coupe',
    ice: 'None (Served Up)',
    garnish: 'Expressed lemon peel twist',
    sensoryProfile: 'Rich wildflower floral sweetness balanced sharply by bright, zesty lemon acid.',
    origin: 'Prohibition Era, United States (c. 1920s); created to mask the harshness of bathtub gin.',
    pitfall: 'Using raw undiluted honey; cold shaker tins cause raw honey to seize onto the metal walls.'
  },

  /* ==========================================================================
     2. WHISKEY, BOURBON, RYE & SCOTCH (14 DRINKS)
     ========================================================================== */
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
    id: 'manhattan',
    name: 'Manhattan',
    difficulty: 'Bartender',
    spirit: 'Whiskey',
    family: 'Spirit-Forward / Aromatic',
    formula: '2 oz Straight Rye Whiskey, 1 oz Sweet Vermouth, 2 dashes Angostura Bitters',
    technique: 'Stir smoothly with solid ice for 30s; fine strain into chilled stemware',
    glassware: 'Coupe or Nick & Nora',
    ice: 'None (Served Up)',
    garnish: 'Brandied Luxardo maraschino cherry',
    sensoryProfile: 'Spiced black pepper grain, rich dark raisin, dried fig, and layered woody warmth.',
    origin: 'Manhattan Club, New York City (c. 1870s) for a banquet honoring Samuel J. Tilden.',
    pitfall: 'Using sweet bourbon instead of high-rye whiskey; the rye’s sharp spice balances rich vermouth.'
  },
  {
    id: 'whiskey-sour',
    name: 'Whiskey Sour',
    difficulty: 'Apprentice',
    spirit: 'Whiskey',
    family: 'Classic Sour',
    formula: '2 oz Bourbon, 0.75 oz Fresh Lemon Juice, 0.75 oz Simple Syrup, 1 Egg White (optional)',
    technique: 'Dry shake all ingredients, add ice, shake hard, double strain',
    glassware: 'Rocks or Coupe',
    ice: 'Single clear cube (if served on rocks)',
    garnish: 'Angostura bitters drop-art on foam and lemon crescent',
    sensoryProfile: 'Sweet charred corn bourbon roundness sliced clean by crisp citric snap.',
    origin: 'First published by Jerry Thomas in 1862; long a mainstay of maritime sailors.',
    pitfall: 'Using sour mix from a gun; synthetic citric acid destroys the bourbon’s barrel notes.'
  },
  {
    id: 'boulevardier',
    name: 'Boulevardier',
    difficulty: 'Apprentice',
    spirit: 'Whiskey',
    family: 'Aperitivo / Negroni Variation',
    formula: '1.25 oz Bourbon or Rye, 1 oz Campari, 1 oz Sweet Vermouth',
    technique: 'Stir with ice for 35s until velvety cold; strain over fresh ice',
    glassware: 'Rocks or Coupe',
    ice: 'Single large square ice block',
    garnish: 'Wide expressed orange swath',
    sensoryProfile: 'Bitter gentian balanced against rich vanilla corn, toasted oak, and spiced plum.',
    origin: 'Harry’s New York Bar, Paris (c. 1927) by Erskine Gwynne, editor of The Boulevardier magazine.',
    pitfall: 'Under-measuring the whiskey; 1:1:1 can drown the whiskey in bitter Campari, hence 1.25 oz.'
  },
  {
    id: 'sazerac',
    name: 'Sazerac',
    difficulty: 'Head Bartender',
    spirit: 'Whiskey',
    family: 'Ancestral / New Orleans',
    formula: '2 oz Rye Whiskey, 1 sugar cube, 3 dashes Peychaud’s Bitters, 1 dash Angostura, Absinthe rinse',
    technique: 'Muddle sugar & bitters; stir rye with ice. Rinse chilled glass with absinthe, discard excess, strain',
    glassware: 'Chilled Old Fashioned (No Ice)',
    ice: 'None (Served neat and frosty)',
    garnish: 'Expressed lemon peel over surface, then discarded',
    sensoryProfile: 'Bold anise aroma, floral cherry-bark bitters, cracked rye grain, and dry finish.',
    origin: 'New Orleans, Louisiana (c. 1850s); America’s first codified cocktail at the Sazerac Coffeehouse.',
    pitfall: 'Dropping the lemon twist into the drink; the heavy citrus oils will mask the delicate absinthe rinse.'
  },
  {
    id: 'penicillin',
    name: 'Penicillin',
    difficulty: 'Bartender',
    spirit: 'Whiskey',
    family: 'Modern Classic',
    formula: '2 oz Blended Scotch, 0.75 oz Lemon Juice, 0.75 oz Honey-Ginger Syrup, 0.25 oz Peated Islay Scotch float',
    technique: 'Shake blended scotch, lemon, and syrup; strain over ice. Gently float Islay scotch on top using barspoon',
    glassware: 'Double Rocks',
    ice: 'Large dense ice cube',
    garnish: 'Candied crystallized ginger coin on bamboo skewer',
    sensoryProfile: 'Nose of campfire peat smoke giving way to warming spicy honey and tart lemon nectar.',
    origin: 'Milk & Honey, New York (2005) crafted by modern cocktail pioneer Sam Ross.',
    pitfall: 'Shaking the peated scotch inside the tin; it must remain an aromatic float on the drink surface.'
  },
  {
    id: 'mint-julep',
    name: 'Mint Julep',
    difficulty: 'Bartender',
    spirit: 'Whiskey',
    family: 'Smash / Ancestral',
    formula: '2.5 oz High-Proof Bourbon, 0.5 oz Rich Demerara Syrup (2:1), 8-10 Fresh Mint Leaves',
    technique: 'Gently press mint with syrup in bottom of cup; pack with crushed ice, pour bourbon, churn until frosted',
    glassware: 'Silver or Pewter Julep Cup',
    ice: 'Packed dome of pebbled crushed ice',
    garnish: 'Slapped lavish fresh mint bouquet dusted with powdered sugar',
    sensoryProfile: 'Intense cooling spearmint aroma, caramel wood sweetness, and lingering crisp spirit kick.',
    origin: 'American South (c. late 18th century); the legendary anthem of the Kentucky Derby.',
    pitfall: 'Over-muddling mint into pulp; crushing the chlorophyll veins releases bitter grassy vegetal tannins.'
  },
  {
    id: 'paper-plane',
    name: 'Paper Plane',
    difficulty: 'Head Bartender',
    spirit: 'Whiskey',
    family: 'Equal Parts / Modern Classic',
    formula: '0.75 oz Bourbon, 0.75 oz Aperol, 0.75 oz Amaro Nonino Quintessentia, 0.75 oz Fresh Lemon Juice',
    technique: 'Vigorous aeration shake with clean cold ice cubes; fine double strain',
    glassware: 'Coupe or Nick & Nora',
    ice: 'None (Served Up)',
    garnish: 'Miniature folded paper airplane pegged to rim',
    sensoryProfile: 'Grapefruit zest, botanical gentian, alpine herbs, warm caramel grain, and dry citrus.',
    origin: 'The Violet Hour, Chicago (2008) created by Sam Ross, named after M.I.A.’s hit track.',
    pitfall: 'Substituting Amaro Nonino with common dark amaros like Averna; Nonino’s grappa base is essential.'
  },
  {
    id: 'toronto',
    name: 'Toronto',
    difficulty: 'Bartender',
    spirit: 'Whiskey',
    family: 'Spirit-Forward / Bitter',
    formula: '2 oz Rye Whiskey, 0.25 oz Fernet-Branca, 0.25 oz Rich Demerara Syrup, 2 dashes Angostura Bitters',
    technique: 'Stir methodically with solid ice cubes for 30 seconds; strain into chilled glass',
    glassware: 'Nick & Nora or Coupe',
    ice: 'None (Served Up)',
    garnish: 'Expressed orange peel twist',
    sensoryProfile: 'Spiced rye wood balanced by minty menthol bitterness, saffron, and dark cane caramel.',
    origin: 'Canada / UK (c. 1922) published in Robert Vermeire’s Cocktails: How to Mix Them.',
    pitfall: 'Pouring too much Fernet; even an extra 0.25 oz will obliterate the delicate rye whiskey balance.'
  },
  {
    id: 'blood-and-sand',
    name: 'Blood and Sand',
    difficulty: 'Bartender',
    spirit: 'Whiskey',
    family: 'Equal Parts / Scotch',
    formula: '0.75 oz Blended Scotch, 0.75 oz Cherry Heering, 0.75 oz Sweet Vermouth, 0.75 oz Fresh Orange Juice',
    technique: 'Hard shake with ice and fine double strain into chilled coupe',
    glassware: 'Chilled Coupe',
    ice: 'None (Served Up)',
    garnish: 'Flamed orange peel twist',
    sensoryProfile: 'Peaty malt smoke, sweet cherry and dried plum fruit, earthy herbal spice, and citrus brightness.',
    origin: 'London (c. 1922) named after the silent bullfighting film starring Rudolph Valentino.',
    pitfall: 'Using stale pasteurized orange juice; fresh-squeezed, fine-strained orange juice is non-negotiable.'
  },
  {
    id: 'rob-roy',
    name: 'Rob Roy',
    difficulty: 'Apprentice',
    spirit: 'Whiskey',
    family: 'Spirit-Forward / Manhattan Variation',
    formula: '2 oz Blended Scotch Whisky, 1 oz Sweet Vermouth, 2 dashes Angostura Bitters',
    technique: 'Stir with ice for 30s until deeply chilled; strain into stemware',
    glassware: 'Coupe or Nick & Nora',
    ice: 'None (Served Up)',
    garnish: 'Two skewered brandied cherries',
    sensoryProfile: 'Smoky heather honey malt, rich dried raisin sweetness, and herbal wood spice.',
    origin: 'Waldorf Astoria, New York (1894) created to celebrate the premiere of an operetta of the same name.',
    pitfall: 'Shaking the drink; scotch and sweet vermouth must be stirred to preserve velvet clarity.'
  },
  {
    id: 'rusty-nail',
    name: 'Rusty Nail',
    difficulty: 'Apprentice',
    spirit: 'Whiskey',
    family: 'Duo / Scotch',
    formula: '1.5 oz Blended Scotch Whisky, 0.75 oz Drambuie (Spiced Honey Scotch Liqueur)',
    technique: 'Build directly in rocks glass over ice and stir gently to integrate',
    glassware: 'Old Fashioned / Rocks',
    ice: 'Single large clear ice block',
    garnish: 'Expressed lemon peel twist',
    sensoryProfile: 'Peat malt warmth coated in heather honey, clove spice, and sweet herbal warmth.',
    origin: '21 Club, New York City (c. 1950s); signature drink of the Rat Pack in 1960s Hollywood.',
    pitfall: 'Over-measuring Drambuie; excess Drambuie turns the cocktail cloying and syrupy.'
  },
  {
    id: 'tipperary',
    name: 'Tipperary',
    difficulty: 'Head Bartender',
    spirit: 'Whiskey',
    family: 'Spirit-Forward / Irish',
    formula: '1.5 oz Irish Whiskey, 1 oz Sweet Vermouth, 0.5 oz Green Chartreuse, 2 dashes Angostura Bitters',
    technique: 'Stir thoroughly with dense ice for 35s; strain into chilled stemware',
    glassware: 'Coupe or Nick & Nora',
    ice: 'None (Served Up)',
    garnish: 'Expressed orange peel swath',
    sensoryProfile: 'Crisp green orchard apple, alpine botanical herbs, sweet spiced wine, and clean pot-still grain.',
    origin: 'United Kingdom (c. 1917) published by Hugo Ensslin; named after the WWI soldier marching song.',
    pitfall: 'Using peated whiskey; traditional triple-distilled Irish whiskey provides the requisite floral lightness.'
  },
  {
    id: 'irish-coffee',
    name: 'Irish Coffee',
    difficulty: 'Bartender',
    spirit: 'Whiskey',
    family: 'Hot Drink / Dairy',
    formula: '1.5 oz Irish Whiskey, 4 oz Hot Fresh Drip Coffee, 0.5 oz Rich Demerara Syrup (2:1), Heavy Cream float',
    technique: 'Preheat mug with hot water; discard. Add syrup, whiskey, coffee; stir. Float softly whipped cold cream',
    glassware: 'Clear Footed Irish Coffee Glass',
    ice: 'None (Hot)',
    garnish: 'Freshly grated nutmeg dusting on cream collar',
    sensoryProfile: 'Piping hot rich roast coffee and whiskey warmth sipped through an icy collar of sweet heavy cream.',
    origin: 'Foynes Flying Boat Terminal, Ireland (1943) by Chef Joe Sheridan for stranded winter travelers.',
    pitfall: 'Stirring the cream into the coffee; the whole sensory point is drinking hot coffee through cold cream.'
  },

  /* ==========================================================================
     3. RUM & CACHAÇA CLASSICS (10 DRINKS)
     ========================================================================== */
  {
    id: 'daiquiri',
    name: 'Daiquiri',
    difficulty: 'Bartender',
    spirit: 'Rum',
    family: 'Classic Sour',
    formula: '2 oz White Rum, 0.75 oz Fresh Lime Juice, 0.75 oz Rich Simple Syrup (2:1)',
    technique: 'Hard vigorous shake with solid ice cubes',
    glassware: 'Coupe',
    ice: 'None (Double strained into frosty glass)',
    garnish: 'Dehydrated lime wheel float',
    sensoryProfile: 'Crisp vibrant citrus, sugarcane roundness, and dry refreshing finish.',
    origin: 'Daiquirí, Cuba (1898) by mining engineer Jennings Cox; popularized by Hemingway.',
    pitfall: 'Never use pasteurized bottled citrus; fresh cold-pressed lime is mandatory.'
  },
  {
    id: 'mai-tai',
    name: 'Mai Tai',
    difficulty: 'Head Bartender',
    spirit: 'Rum',
    family: 'Tiki / Tropical',
    formula: '1 oz Aged Jamaican Pot Still Rum, 1 oz Rhum Agricole, 0.5 oz Orange Curaçao, 0.5 oz Orgeat, 0.75 oz Lime Juice',
    technique: 'Whip shake with 1 cup crushed ice for 5 seconds; dump unstrained into glass, cap with crushed ice',
    glassware: 'Double Old Fashioned / Tiki Mai Tai Glass',
    ice: 'Crushed pebble ice',
    garnish: 'Spent lime shell half (island) with fresh mint sprig (palm tree)',
    sensoryProfile: 'Funky tropical hogo esters, toasted almond marzipan, zesty curaçao orange, tart lime.',
    origin: 'Trader Vic’s, Oakland, CA (1944) created for Tahitian friends who declared it "Maita’i roa a’e!"',
    pitfall: 'Adding pineapple or orange juice; genuine 1944 Mai Tai contains zero fruit juices besides lime.'
  },
  {
    id: 'mojito',
    name: 'Mojito',
    difficulty: 'Bartender',
    spirit: 'Rum',
    family: 'Collins / Smash',
    formula: '2 oz White Cuban-Style Rum, 0.75 oz Fresh Lime Juice, 0.5 oz Simple Syrup, 6-8 Mint Leaves, 2 oz Club Soda',
    technique: 'Gently clap mint; build with lime, syrup, and rum. Add cracked ice, churn, top with bubbly soda',
    glassware: 'Highball / Collins',
    ice: 'Cracked or columnar ice',
    garnish: 'Sprig of fresh slapped mint & lime wedge',
    sensoryProfile: 'Cooling garden mint, bright sweet cane sugar, sparkling carbonic bite, and clean lime.',
    origin: 'Havana, Cuba; evolved from the 16th-century medicinal pirate tonic "El Draque".',
    pitfall: 'Shredding mint with a wooden muddler; shredded mint clogs the straw and releases bitter vegetal notes.'
  },
  {
    id: 'dark-n-stormy',
    name: 'Dark and Stormy',
    difficulty: 'Apprentice',
    spirit: 'Rum',
    family: 'Highball / Mule',
    formula: '2 oz Gosling’s Black Seal Rum, 0.5 oz Fresh Lime Juice, 4 oz Spicy Ginger Beer',
    technique: 'Fill glass with ice; add lime juice and ginger beer. Carefully float black rum across top',
    glassware: 'Highball',
    ice: 'Dense solid ice spears or cubes',
    garnish: 'Fresh lime wedge on glass rim',
    sensoryProfile: 'Spicy ginger snap heat beneath a dense storm cloud of molasses, treacle, and tobacco rum.',
    origin: 'Bermuda (post-WWI); trademarked by Gosling Brothers Rum.',
    pitfall: 'Using mild commercial ginger ale instead of fiery brewed craft ginger beer.'
  },
  {
    id: 'pina-colada',
    name: 'Piña Colada',
    difficulty: 'Apprentice',
    spirit: 'Rum',
    family: 'Blended / Tropical',
    formula: '2 oz Puerto Rican White Rum, 1.5 oz Cream of Coconut (Coco López), 1.5 oz Fresh Pineapple Juice, 0.5 oz Lime',
    technique: 'Shake vigorously with 1 cup crushed ice until thick and frosty; pour unstrained',
    glassware: 'Hurricane or Poco Grande',
    ice: 'Pebble crushed ice',
    garnish: 'Pineapple fronds wedge and maraschino cherry',
    sensoryProfile: 'Lush velvety coconut milk fat, sweet tropical golden pineapple, and clean sugar-cane rum.',
    origin: 'Caribe Hilton, San Juan, Puerto Rico (1954) created by bartender Ramón "Monchito" Marrero.',
    pitfall: 'Using unsweetened coconut milk instead of rich sweetened cream of coconut.'
  },
  {
    id: 'zombie',
    name: 'Zombie',
    difficulty: 'Head Bartender',
    spirit: 'Rum',
    family: 'Tiki / Exotic',
    formula: '1.5 oz Gold Puerto Rican Rum, 1.5 oz Jamaican Dark Rum, 1 oz 151-Proof Demerara Rum, 0.75 oz Lime, 0.5 oz Donn’s Mix, 0.5 oz Falernum, 1 tsp Grenadine, 1 dash Pernod',
    technique: 'Blend with 6 oz crushed ice for 5 seconds on high; pour into tall glass, cap with crushed ice',
    glassware: 'Zombie Glass or Tall Chimney',
    ice: 'Crushed ice',
    garnish: 'Lavish mint sprig bouquet and grated nutmeg',
    sensoryProfile: 'Intoxicating high-octane rum funk, baking cinnamon spice, sweet pomegranate, grapefruit, anise.',
    origin: 'Don the Beachcomber, Hollywood (1934); limited to two per customer due to extreme potency.',
    pitfall: 'Leaving out Don’s Mix (cinnamon syrup + grapefruit juice); it forms the signature backbone.'
  },
  {
    id: 'jungle-bird',
    name: 'Jungle Bird',
    difficulty: 'Bartender',
    spirit: 'Rum',
    family: 'Tropical / Bitter Sour',
    formula: '1.5 oz Blackstrap or Dark Jamaican Rum, 0.75 oz Campari, 1.5 oz Fresh Pineapple Juice, 0.5 oz Fresh Lime Juice, 0.5 oz Demerara Syrup',
    technique: 'Shake hard with solid ice cubes for 12 seconds to froth pineapple enzymes; double strain over ice',
    glassware: 'Rocks Glass or Highball',
    ice: 'Dense clear ice cubes',
    garnish: 'Fanned pineapple fronds (bird feathers) and an orchid flower',
    sensoryProfile: 'Rich bitter gentian herbs colliding with sweet frothy tropical pineapple and molasses funk.',
    origin: 'Aviary Bar at the Kuala Lumpur Hilton, Malaysia (1973) created by Beverage Manager Jeffrey Ong.',
    pitfall: 'Using light white rum; blackstrap or high-ester dark rum is critical to hold up against bitter Campari.'
  },
  {
    id: 'caipirinha',
    name: 'Caipirinha',
    difficulty: 'Apprentice',
    spirit: 'Cachaça',
    family: 'Muddled Sour / Rustic',
    formula: '2 oz Cachaça, 1 whole Fresh Lime (cut into 8 wedges), 2 tsp Fine White Granulated Sugar',
    technique: 'Muddle lime wedges with sugar directly in glass to release essential oils; add cachaça, pack with crushed ice, and churn',
    glassware: 'Double Rocks Glass',
    ice: 'Crushed or cracked ice',
    garnish: 'Lime wedge resting on ice surface',
    sensoryProfile: 'Raw grassy fresh-cut cane juice, sharp acidic lime juice, and sweet citrus oil crunch.',
    origin: 'São Paulo, Brazil (c. 1918); national cocktail of Brazil, evolved from a Spanish flu remedy.',
    pitfall: 'Substituting simple syrup for granulated sugar; raw sugar granules are required to abrade lime skin oils.'
  },
  {
    id: 'el-presidente',
    name: 'El Presidente',
    difficulty: 'Head Bartender',
    spirit: 'Rum',
    family: 'Spirit-Forward / Cuban',
    formula: '1.5 oz Aged Cuban White Rum, 0.75 oz Blanc (Bianco) Vermouth, 0.25 oz Orange Curaçao, 1 barspoon Real Pomegranate Grenadine',
    technique: 'Stir with dense ice cubes for 30 seconds; fine strain into chilled stemware',
    glassware: 'Nick & Nora or Coupe',
    ice: 'None (Served Up)',
    garnish: 'Expressed orange peel twist & brandied cherry',
    sensoryProfile: 'Delicate floral vanilla sweetness, dry sugarcane oak, subtle orange oil, and tart berry whisper.',
    origin: 'Havana, Cuba (c. 1915) created by Eddie Woelke at the Jockey Club for President Mario García Menocal.',
    pitfall: 'Using dry French vermouth instead of sweet Blanc/Bianco vermouth; dry vermouth leaves the cocktail hollow.'
  },
  {
    id: 'painkiller',
    name: 'Painkiller',
    difficulty: 'Bartender',
    spirit: 'Rum',
    family: 'Tropical / Tiki',
    formula: '2 oz Pusser’s Navy Rum, 4 oz Fresh Pineapple Juice, 1 oz Fresh Orange Juice, 1 oz Cream of Coconut',
    technique: 'Shake vigorously with ice cubes until heavily frothy; strain over crushed ice',
    glassware: 'Tiki Mug or Hurricane',
    ice: 'Crushed pebble ice',
    garnish: 'Freshly grated whole nutmeg & pineapple wedge',
    sensoryProfile: 'Lush creamy coconut, sweet citrus froth, robust molasses navy rum, and pungent nutmeg.',
    origin: 'Soggy Dollar Bar, Jost Van Dyke, British Virgin Islands (c. 1970s) by Daphne Henderson.',
    pitfall: 'Omitting freshly grated nutmeg; the pungent spice aroma cuts through the dense coconut and pineapple sugars.'
  },

  /* ==========================================================================
     4. TEQUILA & MEZCAL (9 DRINKS)
     ========================================================================== */
  {
    id: 'margarita',
    name: 'Margarita',
    difficulty: 'Bartender',
    spirit: 'Tequila',
    family: 'Daisy',
    formula: '2 oz Blanco Tequila, 1 oz Cointreau, 0.75 oz Fresh Lime Juice',
    technique: 'Shake vigorously with ice and double strain',
    glassware: 'Coupe or Rocks',
    ice: 'Fresh rocks or served Up',
    garnish: 'Sea salt half-rim & fresh lime wheel',
    sensoryProfile: 'Earthy roasted agave, brisk orange perfume, and zesty saline snap.',
    origin: 'Mexico (c. 1930s-1940s); direct evolution of the Daisy cocktail family.',
    pitfall: 'Never salt the inside rim; falling salt granules over-salinate the balanced cocktail.'
  },
  {
    id: 'paloma',
    name: 'Paloma',
    difficulty: 'Apprentice',
    spirit: 'Tequila',
    family: 'Highball / Long Drink',
    formula: '2 oz Blanco Tequila, 0.5 oz Fresh Lime Juice, pinch of salt, 4 oz Sparkling Pink Grapefruit Soda',
    technique: 'Build tequila, lime, and salt in ice-filled glass; top with cold grapefruit soda and stir gently',
    glassware: 'Highball / Collins',
    ice: 'High-clarity ice spears',
    garnish: 'Salted rim half-moon and fresh ruby grapefruit slice',
    sensoryProfile: 'Fizzy bitter-sweet citrus oil, mineral agave backbone, and refreshing saline finish.',
    origin: 'Tequila, Jalisco, Mexico; attributed to legendary cantinero Don Javier Delgado Corona of La Capilla.',
    pitfall: 'Over-stirring after adding soda; destroys the effervescence and dulls grapefruit aroma.'
  },
  {
    id: 'tommys-margarita',
    name: 'Tommy’s Margarita',
    difficulty: 'Apprentice',
    spirit: 'Tequila',
    family: 'Modern Sour',
    formula: '2 oz 100% Agave Reposado Tequila, 1 oz Fresh Lime Juice, 0.5 oz Organic Agave Nectar (diluted 1:1)',
    technique: 'Shake aggressively with solid ice and fine strain over fresh ice',
    glassware: 'Rocks Glass',
    ice: 'Single large clear cube',
    garnish: 'Fresh lime wedge (no salt rim)',
    sensoryProfile: 'Pure unadulterated agave expression, rich honeyed sweetness, and sharp lime acidity.',
    origin: 'Tommy’s Mexican Restaurant, San Francisco (c. 1990) created by Julio Bermejo.',
    pitfall: 'Using undiluted raw agave nectar; viscous cold agave will freeze and stick to the tin walls.'
  },
  {
    id: 'oaxaca-old-fashioned',
    name: 'Oaxaca Old Fashioned',
    difficulty: 'Head Bartender',
    spirit: 'Mezcal',
    family: 'Ancestral / Modern Classic',
    formula: '1.5 oz Reposado Tequila, 0.5 oz Mezcal (Espadín), 1 barspoon Agave Nectar, 2 dashes Angostura',
    technique: 'Stir with dense ice in mixing glass for 30s; strain over single block',
    glassware: 'Double Old Fashioned',
    ice: 'Single artisanal ice cube',
    garnish: 'Flamed orange peel disk',
    sensoryProfile: 'Campfire desert smoke, charred cedar, mellow oak agave, and warm clove bitters.',
    origin: 'Death & Co, New York City (2007) invented by master mixologist Phil Ward.',
    pitfall: 'Using too much mezcal; the mezcal is a smoky accent meant to season the reposado base.'
  },
  {
    id: 'naked-and-famous',
    name: 'Naked and Famous',
    difficulty: 'Head Bartender',
    spirit: 'Mezcal',
    family: 'Equal Parts Sour',
    formula: '0.75 oz Mezcal, 0.75 oz Aperol, 0.75 oz Yellow Chartreuse, 0.75 oz Fresh Lime Juice',
    technique: 'Shake hard with solid ice cubes and double strain',
    glassware: 'Chilled Coupe',
    ice: 'None (Served Up)',
    garnish: 'None or tiny lime wheel',
    sensoryProfile: 'Earthy wood smoke, honeyed saffron gentian, bittersweet rhubarb, and mouthwatering lime.',
    origin: 'Death & Co, New York (2011) created by Joaquín Simó as an homage to The Last Word.',
    pitfall: 'Substituting Green Chartreuse for Yellow; Green Chartreuse is too high-proof and herb-heavy.'
  },
  {
    id: 'el-diablo',
    name: 'El Diablo',
    difficulty: 'Bartender',
    spirit: 'Tequila',
    family: 'Highball / Buck',
    formula: '1.5 oz Reposado Tequila, 0.5 oz Crème de Cassis, 0.5 oz Fresh Lime Juice, 3 oz Fiery Ginger Beer',
    technique: 'Shake tequila and lime with ice; strain into highball with ice. Top with ginger beer; float Cassis on top',
    glassware: 'Highball Glass',
    ice: 'Columnar or cracked ice',
    garnish: 'Lime wedge and fresh blackberry skewer',
    sensoryProfile: 'Dark blackcurrant tartness floating over prickly ginger spice and mellow agave oak.',
    origin: 'Trader Vic’s Book of Food and Drink (1946) created by Victor Bergeron.',
    pitfall: 'Shaking the ginger beer; always top and stir gently to preserve carbonation.'
  },
  {
    id: 'batanga',
    name: 'Batanga',
    difficulty: 'Apprentice',
    spirit: 'Tequila',
    family: 'Highball / Cantina Classic',
    formula: '2 oz 100% Agave Blanco Tequila, 0.5 oz Fresh Lime Juice, pinch of Coarse Salt, 4 oz Mexican Coca-Cola',
    technique: 'Salt the rim. Fill with ice; add tequila and lime. Top with Coca-Cola. Stir using a large wooden-handled knife',
    glassware: 'Collins Glass',
    ice: 'Dense ice cubes',
    garnish: 'Salt rim and lime wheel',
    sensoryProfile: 'Crisp herbal agave, earthy caramel sweetness, fizzy cola carbonation, and salty lime punch.',
    origin: 'La Capilla, Tequila, Mexico (1961) created by legendary cantinero Don Javier Delgado Corona.',
    pitfall: 'Stirring with a normal barspoon; legendary tradition insists it must be stirred with the knife used to cut the limes.'
  },
  {
    id: 'division-bell',
    name: 'Division Bell',
    difficulty: 'Head Bartender',
    spirit: 'Mezcal',
    family: 'Modern Classic / Sour',
    formula: '1 oz Mezcal, 0.75 oz Aperol, 0.5 oz Maraschino Liqueur, 0.75 oz Fresh Lime Juice',
    technique: 'Shake hard with solid ice cubes and double strain into chilled glass',
    glassware: 'Chilled Coupe',
    ice: 'None (Served Up)',
    garnish: 'Expressed grapefruit peel twist',
    sensoryProfile: 'Pungent agave smoke, bitter rhubarb zest, dry cherry wood sweetness, and electric lime acidity.',
    origin: 'Mayahuel, New York City (2009) crafted by Phil Ward, named after Pink Floyd’s album.',
    pitfall: 'Over-pouring Maraschino; its pungent stone-fruit sweetness will overpower Aperol’s subtle gentian.'
  },
  {
    id: 'rosita',
    name: 'Rosita',
    difficulty: 'Head Bartender',
    spirit: 'Tequila',
    family: 'Aperitivo / Negroni Variation',
    formula: '1.5 oz Reposado Tequila, 0.5 oz Campari, 0.5 oz Sweet Vermouth, 0.5 oz Dry Vermouth, 1 dash Angostura Bitters',
    technique: 'Stir with ice cubes for 30s until thoroughly chilled; strain over fresh ice',
    glassware: 'Rocks Glass',
    ice: 'Single large ice block',
    garnish: 'Expressed lemon peel swath',
    sensoryProfile: 'Complex split-vermouth botanicals, bitter gentian, oaky vanilla agave, and dry herbal tannins.',
    origin: 'Codified by cocktail historian Gary Regan in The Bartender’s Bible (1991).',
    pitfall: 'Omitting the dry vermouth; the equal split between sweet and dry vermouth makes the agave sing without excess syrup.'
  },

  /* ==========================================================================
     5. VODKA CLASSICS (6 DRINKS)
     ========================================================================== */
  {
    id: 'espresso-martini',
    name: 'Espresso Martini',
    difficulty: 'Head Bartender',
    spirit: 'Vodka',
    family: 'Modern Classic',
    formula: '1.5 oz Vodka, 1 oz Fresh Hot Espresso, 0.75 oz Coffee Liqueur, 0.25 oz Simple',
    technique: 'Aerated high-velocity shake for thick crema foam',
    glassware: 'Chilled Coupe',
    ice: 'None (Double strained into chilled glass)',
    garnish: 'Three coffee beans (Health, Wealth, Happiness)',
    sensoryProfile: 'Deep roasted espresso crema, bittersweet cacao, and smooth alcohol warmth.',
    origin: 'Fred’s Club, Soho, London (1983) created by legendary bartender Dick Bradsell.',
    pitfall: 'Using stale cold drip dregs instead of fresh hot espresso kills the dense crema head.'
  },
  {
    id: 'moscow-mule',
    name: 'Moscow Mule',
    difficulty: 'Apprentice',
    spirit: 'Vodka',
    family: 'Buck / Mule',
    formula: '2 oz Vodka, 0.5 oz Fresh Lime Juice, 4 oz Quality Spicy Ginger Beer',
    technique: 'Build vodka and fresh lime juice directly over crushed ice; top with cold ginger beer and stir',
    glassware: 'Solid Copper Mug',
    ice: 'Crushed or pebble ice',
    garnish: 'Expressed lime wheel & fresh mint sprig bouquet',
    sensoryProfile: 'Freezing, prickly ginger carbonation, snappy citrus acid, neutral clean grain spirit finish.',
    origin: 'Chatham Hotel, New York (1941) created by Smirnoff’s John Martin and Jack Morgan.',
    pitfall: 'Serving in glass rather than copper; unlined copper conducts thermal cold to frost the lips.'
  },
  {
    id: 'cosmopolitan',
    name: 'Cosmopolitan',
    difficulty: 'Bartender',
    spirit: 'Vodka',
    family: 'Modern Daisy',
    formula: '1.5 oz Citron Vodka, 0.75 oz Cointreau, 0.5 oz Fresh Lime Juice, 0.5 oz Cranberry Juice Cocktail',
    technique: 'Shake hard with ice for 12 seconds; double strain into frozen cocktail glass',
    glassware: 'Chilled Martini or Coupe',
    ice: 'None (Served Up)',
    garnish: 'Flamed orange disc twist',
    sensoryProfile: 'Crisp tart cranberry snap, aromatic orange blossom oil, sweet lemon zest, bone-dry finish.',
    origin: 'The Odeon, Tribeca, NYC (1988) codified by Toby Cecchini; global icon of the 1990s.',
    pitfall: 'Pouring cheap sweetened cranberry syrup until the drink is dark red; it should be pale blush pink.'
  },
  {
    id: 'bloody-mary',
    name: 'Bloody Mary',
    difficulty: 'Bartender',
    spirit: 'Vodka',
    family: 'Savory / Snapper',
    formula: '1.5 oz Vodka, 3 oz Tomato Juice, 0.5 oz Lemon Juice, 2 dashes Worcestershire, 2 drops Tabasco, pinch celery salt, pinch black pepper, barspoon horseradish',
    technique: 'Roll gently between two shaker tins with ice 4-5 times; do not hard shake',
    glassware: 'Tall Collins',
    ice: 'Dense clear ice cubes',
    garnish: 'Celery rib stalk, green queen olive, and lemon wedge',
    sensoryProfile: 'Savory umami tomato, spicy horseradish heat, black pepper zest, and bright lemon acid.',
    origin: 'Harry’s New York Bar, Paris (1921) created by bartender Fernand Petiot.',
    pitfall: 'Vigorously shaking in a tin; hard shaking aerates tomato juice into an unpleasant thin pink watery foam.'
  },
  {
    id: 'white-russian',
    name: 'White Russian',
    difficulty: 'Apprentice',
    spirit: 'Vodka',
    family: 'Duo / Cream',
    formula: '2 oz Vodka, 1 oz Kahlúa Coffee Liqueur, 1 oz Heavy Whipping Cream float',
    technique: 'Build vodka and coffee liqueur in ice-filled rocks glass; stir. Gently layer heavy cream over spoon',
    glassware: 'Old Fashioned / Rocks Glass',
    ice: 'Large dense ice cubes',
    garnish: 'None (or two whole coffee beans on cream float)',
    sensoryProfile: 'Rich decadent cream, bittersweet coffee bean liqueur, and clean alcohol clarity.',
    origin: 'Oakland, California (c. 1949); immortalized by The Dude in The Big Lebowski (1998).',
    pitfall: 'Using skim milk or half-and-half; only heavy cream has the fat viscosity to float cleanly atop Kahlúa.'
  },
  {
    id: 'vesper',
    name: 'Vesper',
    difficulty: 'Head Bartender',
    spirit: 'Vodka',
    family: 'Spirit-Forward / High Proof',
    formula: '3 oz London Dry Gin, 1 oz 100-Proof Vodka, 0.5 oz Lillet Blanc or Cocchi Americano',
    technique: 'Shake violently with ice until ice shards form on surface; fine strain into frosty goblet',
    glassware: 'Chilled Deep Champagne Goblet or Coupe',
    ice: 'None (Served Up)',
    garnish: 'Large thin spiral of lemon peel',
    sensoryProfile: 'Massive alpine botanical punch, bitter cinchona bark spice, icy grain clean finish.',
    origin: 'Invented by author Ian Fleming in the 1953 James Bond novel Casino Royale.',
    pitfall: 'Using modern reformulated Lillet Blanc without adding quinine; Cocchi Americano restores the authentic bitter bite.'
  },

  /* ==========================================================================
     6. BRANDY, COGNAC & PISCO (6 DRINKS)
     ========================================================================== */
  {
    id: 'sidecar',
    name: 'Sidecar',
    difficulty: 'Bartender',
    spirit: 'Cognac',
    family: 'Classic Daisy',
    formula: '1.5 oz VSOP Cognac, 0.75 oz Cointreau, 0.75 oz Fresh Lemon Juice',
    technique: 'Shake hard with ice until shaker is intensely frosted; double strain',
    glassware: 'Coupe with half-sugared rim',
    ice: 'None (Served Up)',
    garnish: 'Fine superfine sugar half-rim & orange peel twist',
    sensoryProfile: 'Warm toasted French oak, rich baked grape tannins, sharp orange oil, and crisp citrus.',
    origin: 'The Ritz Hotel, Paris (c. World War I) named after the motorcycle attachment.',
    pitfall: 'Fully rimming the glass with sugar; half-rim allows the guest to choose their sweetness level.'
  },
  {
    id: 'vieux-carre',
    name: 'Vieux Carré',
    difficulty: 'Head Bartender',
    spirit: 'Cognac',
    family: 'Spirit-Forward / New Orleans',
    formula: '0.75 oz Rye Whiskey, 0.75 oz VSOP Cognac, 0.75 oz Sweet Vermouth, 1 barspoon Bénédictine, 1 dash Peychaud’s, 1 dash Angostura',
    technique: 'Stir methodically with dense ice for 35s until silkily chilled; strain into rocks glass',
    glassware: 'Rocks / Old Fashioned',
    ice: 'Single large clear block',
    garnish: 'Expressed lemon peel twist & brandied cherry',
    sensoryProfile: 'Rich herbal honeyed botanicals, spicy rye grain, smooth grape velvet cognac, and dark wine spice.',
    origin: 'Hotel Monteleone Carousel Bar, New Orleans (1938) created by Walter Bergeron.',
    pitfall: 'Over-pouring Bénédictine; its potent herbal honey sweetness can easily swallow the cognac.'
  },
  {
    id: 'pisco-sour',
    name: 'Pisco Sour',
    difficulty: 'Bartender',
    spirit: 'Pisco',
    family: 'Egg White Sour',
    formula: '2 oz Quebranta Pisco, 1 oz Fresh Lime Juice, 0.75 oz Simple Syrup, 1 Fresh Egg White',
    technique: 'Dry shake vigorously for 15s to emulsify egg white; add solid ice cubes, shake hard, double strain',
    glassware: 'Chilled Coupe',
    ice: 'None (Served Up)',
    garnish: 'Three drops Amargo Chuncho (or Angostura) dropped onto foam head',
    sensoryProfile: 'Earthy unaged grape musk, bright lime acid, velvety thick meringue head, and spicy aroma.',
    origin: 'Morris’ Bar, Lima, Peru (c. 1920s) created by American expatriate Victor Morris.',
    pitfall: 'Swirling the bitters into the cocktail; bitters belong solely on top of the foam to mask the raw egg smell.'
  },
  {
    id: 'brandy-crusta',
    name: 'Brandy Crusta',
    difficulty: 'Head Bartender',
    spirit: 'Cognac',
    family: 'Ancestral / Crusta',
    formula: '2 oz Cognac, 1 barspoon Maraschino Liqueur, 1 barspoon Orange Curaçao, 0.5 oz Lemon Juice, 1 barspoon Simple, 2 dashes Boker’s Bitters',
    technique: 'Shake hard with ice and strain into small wine glass lined with a full crust of superfine sugar',
    glassware: 'Small Wine Glass or Sour Glass',
    ice: 'None (or 1 small lump)',
    garnish: 'Entire peeled lemon rind coiled inside glass rim with full sugar crust',
    sensoryProfile: 'Warm toasted grape oak, bright zesty lemon, sweet maraschino stone fruit, and sugar crystal crunch.',
    origin: 'New Orleans (1852) created by Joseph Santini; the direct ancestor of the Sidecar and Margarita.',
    pitfall: 'Improperly trimming the lemon peel; it must be cut wide and thin enough to line the entire inner rim.'
  },
  {
    id: 'japanese-cocktail',
    name: 'Japanese Cocktail',
    difficulty: 'Bartender',
    spirit: 'Cognac',
    family: 'Ancestral / Orgeat',
    formula: '2 oz VSOP Cognac, 0.5 oz House Orgeat (Almond Syrup), 2 dashes Angostura Bitters',
    technique: 'Stir with ice for 30 seconds until cold and silky; strain into chilled stemware',
    glassware: 'Nick & Nora or Coupe',
    ice: 'None (Served Up)',
    garnish: 'Expressed lemon peel twist',
    sensoryProfile: 'Creamy toasted almond marzipan, rich oaky grape vanilla, warm clove, and lemon essence.',
    origin: 'New York (1862) published by Jerry Thomas in honor of the first Japanese diplomatic mission to the US.',
    pitfall: 'Shaking the drink; despite containing orgeat, this is an ancestral cocktail meant to be stirred crystal-clear.'
  },
  {
    id: 'metropolitan',
    name: 'Metropolitan',
    difficulty: 'Apprentice',
    spirit: 'Cognac',
    family: 'Spirit-Forward / Manhattan Variation',
    formula: '2 oz VSOP Cognac, 1 oz Sweet Vermouth, 0.25 oz Simple Syrup, 2 dashes Peychaud’s Bitters',
    technique: 'Stir with dense ice in mixing glass for 30s; strain into chilled cocktail glass',
    glassware: 'Coupe or Martini',
    ice: 'None (Served Up)',
    garnish: 'Brandied cherry on pick',
    sensoryProfile: 'Toasted dried grape fruitiness, spiced herbal wine, anise hints, and rich velvet warmth.',
    origin: 'Metropolitan Hotel, New York (c. late 19th century); the brandy lover’s answer to the Manhattan.',
    pitfall: 'Using cheap commercial grape brandy; an authentic Metropolitan requires Cognac with French oak barrel age.'
  },

  /* ==========================================================================
     7. APERITIF, SHERRY & SPECIAL CLASSICS (9 DRINKS)
     ========================================================================== */
  {
    id: 'americano',
    name: 'Americano',
    difficulty: 'Apprentice',
    spirit: 'Aperitif',
    family: 'Highball / Low-ABV',
    formula: '1.5 oz Campari, 1.5 oz Sweet Vermouth, 3 oz Soda Water',
    technique: 'Build Campari and vermouth in ice-filled Collins glass; top with sparkling soda and stir gently',
    glassware: 'Highball Glass',
    ice: 'Solid clear ice cubes',
    garnish: 'Half-wheel fresh orange slice & expressed lemon peel',
    sensoryProfile: 'Bittersweet gentian root, sparkling effervescence, rich spiced wine, and bright orange citrus.',
    origin: 'Caffè Campari, Milan, Italy (c. 1860s) created by Gaspare Campari; originally called the Milano-Torino.',
    pitfall: 'Pouring flat soda; aggressive effervescence is mandatory to lift the heavy botanical syrups.'
  },
  {
    id: 'bamboo',
    name: 'Bamboo',
    difficulty: 'Bartender',
    spirit: 'Sherry',
    family: 'Spirit-Forward / Low-ABV',
    formula: '1.5 oz Fino or Manzanilla Sherry, 1.5 oz Dry Vermouth, 2 dashes Orange Bitters, 1 dash Angostura',
    technique: 'Stir with solid ice cubes for 30 seconds; fine strain into chilled stemware',
    glassware: 'Nick & Nora',
    ice: 'None (Served Up)',
    garnish: 'Expressed lemon peel twist',
    sensoryProfile: 'Saline dry yeast notes, crisp green apple, floral chamomile, and delicate orange spice.',
    origin: 'Grand Hotel, Yokohama, Japan (c. 1890s) created by legendary German bartender Louis Eppinger.',
    pitfall: 'Using oxidized sherry; sherry is a fragile fortified wine that oxidizes quickly once unsealed.'
  },
  {
    id: 'hanky-panky',
    name: 'Hanky Panky',
    difficulty: 'Head Bartender',
    spirit: 'Gin',
    family: 'Spirit-Forward / Bitter',
    formula: '1.5 oz London Dry Gin, 1.5 oz Sweet Vermouth, 2 barspoons Fernet-Branca',
    technique: 'Stir with ice cubes for 30 seconds; strain into chilled cocktail glass',
    glassware: 'Coupe or Nick & Nora',
    ice: 'None (Served Up)',
    garnish: 'Expressed orange peel twist',
    sensoryProfile: 'Herbal menthol bitterness, rich dark fruit, botanical juniper spine, and sweet citrus oil.',
    origin: 'American Bar at The Savoy, London (c. 1903) created by Ada "Coley" Coleman for actor Charles Hawtrey.',
    pitfall: 'Adding too much Fernet-Branca; two precise barspoons provide balance; half an ounce destroys it.'
  },
  {
    id: 'aperol-spritz',
    name: 'Aperol Spritz',
    difficulty: 'Apprentice',
    spirit: 'Aperitif',
    family: 'Spritz / Low-ABV',
    formula: '3 oz Dry Prosecco, 2 oz Aperol, 1 oz Club Soda',
    technique: 'Fill large wine glass with ice; add Prosecco first, then Aperol in a circular motion, finish with soda',
    glassware: 'Large Stemmed Wine Glass',
    ice: 'Solid ice cubes',
    garnish: 'Fresh orange wheel half-submerged and Castelvetrano olive',
    sensoryProfile: 'Lightly bitter gentian, bright candied orange peel, crisp dry prosecco sparkle.',
    origin: 'Padua/Venice, Italy (c. 1950s); evolution of the 19th-century Austrian soldier wine spritz.',
    pitfall: 'Pouring Aperol before Prosecco; pouring wine first ensures natural integration without settling at bottom.'
  },
  {
    id: 'chrysanthemum',
    name: 'Chrysanthemum',
    difficulty: 'Head Bartender',
    spirit: 'Aperitif',
    family: 'Aromatic / Low-ABV',
    formula: '2 oz Dry Vermouth, 0.75 oz Bénédictine, 3 dashes Absinthe',
    technique: 'Stir with dense ice in mixing glass for 35s; fine strain into chilled stemware',
    glassware: 'Nick & Nora',
    ice: 'None (Served Up)',
    garnish: 'Expressed orange peel twist',
    sensoryProfile: 'Silky honeyed saffron herbs, bone-dry chamomile, delicate anise perfume, and citrus essence.',
    origin: 'First recorded in Hugo Ensslin’s Recipes for Mixed Drinks (1916); favorite of transatlantic liners.',
    pitfall: 'Using sweet vermouth; dry vermouth provides the crispness necessary to balance sweet honey Bénédictine.'
  },
  {
    id: 'coronation',
    name: 'Coronation',
    difficulty: 'Bartender',
    spirit: 'Sherry',
    family: 'Aromatic / Low-ABV',
    formula: '1.5 oz Fino Sherry, 1.5 oz Dry Vermouth, 1 barspoon Maraschino Liqueur, 2 dashes Orange Bitters',
    technique: 'Stir with dense ice cubes for 30s until frosty cold; strain into chilled stemware',
    glassware: 'Nick & Nora',
    ice: 'None (Served Up)',
    garnish: 'Expressed lemon peel coin',
    sensoryProfile: 'Nutty yeast, saline flor, bone-dry floral vermouth, and a faint cherry stone whisper.',
    origin: 'New York (1902) created to celebrate the coronation of King Edward VII of the United Kingdom.',
    pitfall: 'Using sweet Oloroso sherry; light, dry Fino is required to maintain crisp, aperitif-style balance.'
  },
  {
    id: 'porto-flip',
    name: 'Porto Flip',
    difficulty: 'Head Bartender',
    spirit: 'Brandy',
    family: 'Flip / Dessert',
    formula: '1.5 oz Tawny Port, 0.5 oz Cognac, 1 barspoon Simple Syrup, 1 Whole Fresh Egg',
    technique: 'Dry shake whole egg, port, cognac, and syrup; add ice, shake vigorously for 20s, double strain',
    glassware: 'Small Coupe or Sour Glass',
    ice: 'None (Served Up)',
    garnish: 'Generously grated whole nutmeg over velvety surface',
    sensoryProfile: 'Rich spiced eggnog custard, dried plum and raisin port fruit, warm oak cognac warmth.',
    origin: 'Published by Jerry Thomas in 1862; long beloved in British and European salon dining.',
    pitfall: 'Using only the egg white; a Flip requires the whole egg (yolk included) to produce rich custard body.'
  },
  {
    id: 'champagne-cocktail',
    name: 'Champagne Cocktail',
    difficulty: 'Apprentice',
    spirit: 'Aperitif',
    family: 'Sparkling / Ancestral',
    formula: '1 White Sugar Cube, 3 dashes Angostura Bitters, 4 oz Chilled Brut Champagne, 0.25 oz Cognac (optional)',
    technique: 'Saturate sugar cube with bitters in bottom of flute; add cognac if using; gently top with cold Champagne',
    glassware: 'Champagne Flute',
    ice: 'None',
    garnish: 'Lemon peel twist over rim',
    sensoryProfile: 'Perpetual stream of spicy aromatic bubbles, dry brioche biscuit, and rich caramel sweetness.',
    origin: 'First recorded by Jerry Thomas in 1862; enduring archetype of Victorian luxury.',
    pitfall: 'Using simple syrup instead of a sugar cube; the rough cube provides the nucleation points for continuous bubbles.'
  },
  {
    id: 'bijou',
    name: 'Bijou',
    difficulty: 'Head Bartender',
    spirit: 'Gin',
    family: 'Equal Parts / Jewel Trio',
    formula: '1 oz London Dry Gin (Diamond), 1 oz Green Chartreuse (Emerald), 1 oz Sweet Vermouth (Ruby), 1 dash Orange Bitters',
    technique: 'Stir methodically with dense ice for 35s until deeply chilled; fine strain into glass',
    glassware: 'Nick & Nora or Coupe',
    ice: 'None (Served Up)',
    garnish: 'Expressed lemon peel twist & brandied cherry',
    sensoryProfile: 'High-octane alpine botanicals, pine juniper, rich dried-fig wine spice, and orange perfume.',
    origin: 'Created by Harry Johnson in 1895; named "Bijou" (jewel) for the colors of its three key ingredients.',
    pitfall: 'Shaking the drink; Green Chartreuse and gin become cloudy and bitter when violently shaken.'
  }
],

/* ==========================================================================
   2. DATA VALIDATION
   ========================================================================== */
function validateCocktailDataset(dataset) {
  if (!Array.isArray(dataset) || dataset.length !== 5) return false;
  const reqKeys = ['id', 'name', 'spirit', 'family', 'formula', 'technique', 'glassware', 'garnish', 'sensoryProfile', 'origin', 'pitfall'];
  const seenIds = new Set();

  for (const item of dataset) {
    if (!item || typeof item !== 'object') return false;
    for (const k of reqKeys) {
      if (typeof item[k] !== 'string' || item[k].trim() === '') return false;
    }
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
  }
  return true;
}

/* ==========================================================================
   3. PERSISTENCE MANAGER (LOCALSTORAGE)
   ========================================================================== */
class PersistenceManager {
  constructor() {
    this.STORAGE_KEY = 'cocktail_cabinet_v2';
    this.state = this.loadDefaults();
    this.init();
  }

  loadDefaults() {
    return {
      version: 2,
      settings: {
        soundMuted: false,
        selectedTier: 'apprentice'
      },
      stats: {
        highScore: 0,
        bestStreak: 0,
        bestTimeSeconds: 0,
        shiftsCompleted: 0,
        masteredDrinkIds: []
      }
    };
  }

  init() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          this.state = {
            version: 2,
            settings: { ...this.loadDefaults().settings, ...parsed.settings },
            stats: { ...this.loadDefaults().stats, ...parsed.stats }
          };
        }
      }
    } catch (err) {
      console.warn('Failed to parse saved state; reverting to defaults.', err);
      this.state = this.loadDefaults();
    }
    this.save();
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (err) {
      console.warn('Could not write to localStorage:', err);
    }
  }

  get settings() { return this.state.settings; }
  get stats() { return this.state.stats; }

  updateSettings(patch) {
    this.state.settings = { ...this.state.settings, ...patch };
    this.save();
  }

  recordShiftResult(score, maxStreak, timeSec, drinkIds) {
    const s = this.state.stats;
    s.shiftsCompleted++;
    if (score > s.highScore) s.highScore = score;
    if (maxStreak > s.bestStreak) s.bestStreak = maxStreak;
    if (s.bestTimeSeconds === 0 || (timeSec > 0 && timeSec < s.bestTimeSeconds)) {
      s.bestTimeSeconds = timeSec;
    }

    const set = new Set(s.masteredDrinkIds);
    drinkIds.forEach(id => set.add(id));
    s.masteredDrinkIds = Array.from(set);

    this.save();
  }

  resetAllData() {
    this.state = this.loadDefaults();
    this.save();
  }
}

/* ==========================================================================
   4. PROCEDURAL WEB AUDIO SYNTHESIZER
   ========================================================================== */
class AudioSynthesizer {
  constructor(persistence) {
    this.persistence = persistence;
    this.ctx = null;
  }

  get muted() { return this.persistence.settings.soundMuted; }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playFlip() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.07);

      gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      // Audio context error recovery
    }
  }

  playMatch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      [783.99, 987.77, 1174.66].forEach((freq, idx) => {
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
    } catch (e) {}
  }

  playMismatch() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(115, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(70, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch (e) {}
  }

  playTimeout() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      [146.83, 130.81, 116.54, 98.00].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        const startTime = this.ctx.currentTime + (idx * 0.08);
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.10, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.30);
      });
    } catch (e) {}
  }

  playVictory() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((freq, idx) => {
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
    } catch (e) {}
  }

  toggle() {
    const nextMuted = !this.muted;
    this.persistence.updateSettings({ soundMuted: nextMuted });
    if (!nextMuted) this.playFlip();
    return !nextMuted;
  }
}

/* ==========================================================================
   5. CORE GAME ENGINE & SCREEN CONTROLLER
   ========================================================================== */
class CocktailCabinetGame {
  constructor(dataset) {
    this.dataset = dataset;
    this.storage = new PersistenceManager();
    this.synth = new AudioSynthesizer(this.storage);

    this.totalPairs = 5;
    this.cards = [];
    this.firstCard = null;
    this.secondCard = null;
    this.isBoardLocked = false;

    // Shift Metrics
    this.currentTier = this.storage.settings.selectedTier || 'apprentice';
    this.matchedPairsCount = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.totalMoves = 0;

    // Timer & Rush Hour properties
    this.elapsedSeconds = 0;
    this.rushSecondsRemaining = 75;
    this.RUSH_TIME_LIMIT = 75;
    this.timerInterval = null;
    this.isTimerRunning = false;

    this.sessionDrinks = new Set();
    this.lastTriggerElement = null;

    // Cache DOM Elements
    this.dom = {
      viewMenu: document.getElementById('view-menu'),
      viewGame: document.getElementById('view-game'),

      // Menu
      menuHighScore: document.getElementById('menu-high-score'),
      menuBestStreak: document.getElementById('menu-best-streak'),
      menuBestTime: document.getElementById('menu-best-time'),
      menuShiftsCount: document.getElementById('menu-shifts-count'),
      menuMasteredCount: document.getElementById('menu-mastered-count'),
      tierStatusHint: document.getElementById('tier-status-hint'),
      menuTabApprentice: document.getElementById('menu-tab-apprentice'),
      menuTabBartender: document.getElementById('menu-tab-bartender'),
      menuTabHead: document.getElementById('menu-tab-head'),
      badgeBartenderTier: document.getElementById('badge-bartender-tier'),
      badgeHeadTier: document.getElementById('badge-head-tier'),
      btnStartShift: document.getElementById('btn-start-shift'),
      btnStartLabel: document.getElementById('btn-start-label'),
      btnMenuCodex: document.getElementById('btn-menu-codex'),
      btnMenuHandbook: document.getElementById('btn-menu-handbook'),
      btnMenuSound: document.getElementById('btn-menu-sound'),
      menuSoundLabel: document.getElementById('menu-sound-label'),
      menuSoundIconOn: document.getElementById('menu-sound-icon-on'),
      menuSoundIconOff: document.getElementById('menu-sound-icon-off'),
      btnHomePortal: document.getElementById('btn-home-portal'),

      // Game Station View
      gameTierIndicator: document.getElementById('game-tier-indicator'),
      grid: document.getElementById('card-grid'),
      hudScore: document.getElementById('hud-score'),
      hudStreak: document.getElementById('hud-streak'),
      hudMultiplier: document.getElementById('hud-multiplier'),
      hudPairs: document.getElementById('hud-pairs'),
      hudTimerLabel: document.getElementById('hud-timer-label'),
      hudTimer: document.getElementById('hud-timer'),
      feedbackBanner: document.getElementById('live-feedback'),
      feedbackIcon: document.getElementById('feedback-icon'),
      feedbackHeading: document.getElementById('feedback-heading'),
      feedbackText: document.getElementById('feedback-text'),
      btnGameToMenu: document.getElementById('btn-game-to-menu'),
      btnNewShift: document.getElementById('btn-new-shift'),
      btnPeek: document.getElementById('btn-peek'),
      btnHowTo: document.getElementById('btn-how-to'),
      btnSound: document.getElementById('btn-sound'),
      soundIconOn: document.getElementById('sound-icon-on'),
      soundIconOff: document.getElementById('sound-icon-off'),

      // Victory Modal
      modalVictory: document.getElementById('modal-victory'),
      victoryTierTag: document.getElementById('victory-tier-tag'),
      btnVicMenu: document.getElementById('btn-vic-menu'),
      btnVicRestart: document.getElementById('btn-vic-restart'),
      btnVicCodex: document.getElementById('btn-vic-codex'),
      vicScore: document.getElementById('vic-score'),
      vicTime: document.getElementById('vic-time'),
      vicAccuracy: document.getElementById('vic-accuracy'),
      vicStreak: document.getElementById('vic-streak'),
      vicCocktailsList: document.getElementById('vic-cocktails-list'),

      // Timeout Modal (Rush Hour)
      modalTimeout: document.getElementById('modal-timeout'),
      timeoutScore: document.getElementById('timeout-score'),
      timeoutPairs: document.getElementById('timeout-pairs'),
      timeoutStreak: document.getElementById('timeout-streak'),
      timeoutAccuracy: document.getElementById('timeout-accuracy'),
      btnTimeoutMenu: document.getElementById('btn-timeout-menu'),
      btnTimeoutCodex: document.getElementById('btn-timeout-codex'),
      btnTimeoutRetry: document.getElementById('btn-timeout-retry'),

      // Codex Drawer
      btnOpenCodex: document.getElementById('btn-open-codex'),
      modalCodex: document.getElementById('modal-codex'),
      btnCloseCodex: document.getElementById('btn-close-codex'),
      codexSearch: document.getElementById('codex-search'),
      spiritFilters: document.getElementById('spirit-filters'),
      codexList: document.getElementById('codex-entries-list'),

      // Handbook Modal
      modalHandbook: document.getElementById('modal-handbook'),
      btnCloseHandbook: document.getElementById('btn-close-handbook'),
      btnCloseHandbookCta: document.getElementById('btn-close-handbook-cta'),
      btnResetData: document.getElementById('btn-reset-data')
    };

    this.initUI();
    this.bindEvents();
    this.renderCodex();
    this.showView('menu');
  }

  /* ------------------------------------------------------------------------
     INITIALIZATION & NAVIGATION
     ------------------------------------------------------------------------ */
  initUI() {
    this.updateSoundUI();
    this.updateMenuStatsUI();
    this.verifyAndApplyTierAvailability();
  }

  showView(viewName) {
    if (viewName === 'menu') {
      this.resetTimer();
      this.updateMenuStatsUI();
      this.verifyAndApplyTierAvailability();
      this.dom.viewGame.classList.remove('view-active');
      this.dom.viewMenu.classList.add('view-active');
    } else if (viewName === 'game') {
      this.dom.viewMenu.classList.remove('view-active');
      this.dom.viewGame.classList.add('view-active');
      this.startNewShift();
    }
  }

  updateSoundUI() {
    const isMuted = this.synth.muted;
    if (isMuted) {
      this.dom.soundIconOn.classList.add('hidden');
      this.dom.soundIconOff.classList.remove('hidden');
      this.dom.btnSound.setAttribute('aria-pressed', 'false');

      this.dom.menuSoundIconOn.classList.add('hidden');
      this.dom.menuSoundIconOff.classList.remove('hidden');
      this.dom.menuSoundLabel.textContent = 'Audio: Off';
    } else {
      this.dom.soundIconOn.classList.remove('hidden');
      this.dom.soundIconOff.classList.add('hidden');
      this.dom.btnSound.setAttribute('aria-pressed', 'true');

      this.dom.menuSoundIconOn.classList.remove('hidden');
      this.dom.menuSoundIconOff.classList.add('hidden');
      this.dom.menuSoundLabel.textContent = 'Audio: On';
    }
  }

  updateMenuStatsUI() {
    const stats = this.storage.stats;
    this.dom.menuHighScore.textContent = stats.highScore.toLocaleString();
    this.dom.menuBestStreak.textContent = `${stats.bestStreak}x`;

    if (stats.bestTimeSeconds > 0) {
      const m = Math.floor(stats.bestTimeSeconds / 60).toString().padStart(2, '0');
      const s = (stats.bestTimeSeconds % 60).toString().padStart(2, '0');
      this.dom.menuBestTime.textContent = `${m}:${s}`;
    } else {
      this.dom.menuBestTime.textContent = '--:--';
    }

    this.dom.menuShiftsCount.textContent = stats.shiftsCompleted;
    this.dom.menuMasteredCount.textContent = `${stats.masteredDrinkIds.length} / ${this.dataset.length} Mastered`;
  }

  /* ------------------------------------------------------------------------
     TIER UNLOCKS & SELECTION RULES
     ------------------------------------------------------------------------ */
  isTierUnlocked(tier) {
    if (tier === 'apprentice') return true;
    const stats = this.storage.stats;
    if (tier === 'bartender') {
      return stats.shiftsCompleted >= 1 || stats.masteredDrinkIds.length >= 2;
    }
    if (tier === 'head') {
      return stats.masteredDrinkIds.length >= 4 || stats.shiftsCompleted >= 3;
    }
    return false;
  }

  verifyAndApplyTierAvailability() {
    const isBartenderUnlocked = this.isTierUnlocked('bartender');
    const isHeadUnlocked = this.isTierUnlocked('head');

    // Bartender badge update
    if (isBartenderUnlocked) {
      this.dom.badgeBartenderTier.textContent = 'Unlocked';
      this.dom.badgeBartenderTier.className = 'pill-badge status-unlocked';
      this.dom.menuTabBartender.classList.remove('locked');
      this.dom.menuTabBartender.removeAttribute('aria-disabled');
    } else {
      this.dom.badgeBartenderTier.textContent = 'Complete 1 Shift';
      this.dom.badgeBartenderTier.className = 'pill-badge status-locked';
      this.dom.menuTabBartender.classList.add('locked');
      this.dom.menuTabBartender.setAttribute('aria-disabled', 'true');
    }

    // Head Bartender badge update
    if (isHeadUnlocked) {
      this.dom.badgeHeadTier.textContent = 'Unlocked';
      this.dom.badgeHeadTier.className = 'pill-badge status-unlocked';
      this.dom.menuTabHead.classList.remove('locked');
      this.dom.menuTabHead.removeAttribute('aria-disabled');
    } else {
      this.dom.badgeHeadTier.textContent = 'Master 4 Classics';
      this.dom.badgeHeadTier.className = 'pill-badge status-locked';
      this.dom.menuTabHead.classList.add('locked');
      this.dom.menuTabHead.setAttribute('aria-disabled', 'true');
    }

    // Fallback if current selected tier got relocked
    if (!this.isTierUnlocked(this.currentTier)) {
      this.currentTier = 'apprentice';
    }

    this.updateTierSelectionUI(this.currentTier);
  }

  updateTierSelectionUI(tier) {
    this.currentTier = tier;
    this.storage.updateSettings({ selectedTier: tier });

    const tabs = [
      { el: this.dom.menuTabApprentice, tier: 'apprentice' },
      { el: this.dom.menuTabBartender, tier: 'bartender' },
      { el: this.dom.menuTabHead, tier: 'head' }
    ];

    tabs.forEach(({ el, tier: t }) => {
      const isMatch = t === tier;
      el.classList.toggle('active', isMatch);
      el.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });

    const tierTitle = tier === 'head' ? 'Head Bartender' : (tier.charAt(0).toUpperCase() + tier.slice(1));
    this.dom.btnStartLabel.textContent = `Start ${tierTitle} Shift`;
    this.dom.tierStatusHint.textContent = `${tierTitle} Rail Selected`;
    this.dom.gameTierIndicator.textContent = `${tierTitle} Rail`;
  }

  bindEvents() {
    // Audio toggles
    const toggleAudio = () => {
      this.synth.toggle();
      this.updateSoundUI();
    };
    this.dom.btnSound.addEventListener('click', toggleAudio);
    this.dom.btnMenuSound.addEventListener('click', toggleAudio);

    // Tier Selection handlers
    const handleTierClick = (targetTier) => {
      if (!this.isTierUnlocked(targetTier)) {
        this.synth.playMismatch();
        const msg = targetTier === 'bartender'
          ? 'Bartender Rail locked: Complete at least 1 shift to unlock.'
          : 'Head Bartender Rail locked: Master at least 4 classic recipes in the Codex.';
        this.dom.tierStatusHint.textContent = msg;
        return;
      }
      this.synth.playFlip();
      this.updateTierSelectionUI(targetTier);
    };

    this.dom.menuTabApprentice.addEventListener('click', () => handleTierClick('apprentice'));
    this.dom.menuTabBartender.addEventListener('click', () => handleTierClick('bartender'));
    this.dom.menuTabHead.addEventListener('click', () => handleTierClick('head'));

    // Navigation Buttons
    this.dom.btnStartShift.addEventListener('click', () => this.showView('game'));
    this.dom.btnGameToMenu.addEventListener('click', () => this.showView('menu'));
    this.dom.btnMenuCodex.addEventListener('click', () => this.openModal(this.dom.modalCodex, this.dom.btnMenuCodex));
    this.dom.btnMenuHandbook.addEventListener('click', () => this.openModal(this.dom.modalHandbook, this.dom.btnMenuHandbook));

    // Gameplay Action Buttons
    this.dom.btnNewShift.addEventListener('click', () => this.startNewShift());
    this.dom.btnPeek.addEventListener('click', () => this.executePeek());
    this.dom.btnHowTo.addEventListener('click', () => this.openModal(this.dom.modalHandbook, this.dom.btnHowTo));

    // Victory Actions
    this.dom.btnVicMenu.addEventListener('click', () => {
      this.closeModal(this.dom.modalVictory);
      this.showView('menu');
    });
    this.dom.btnVicRestart.addEventListener('click', () => {
      this.closeModal(this.dom.modalVictory);
      this.startNewShift();
    });
    this.dom.btnVicCodex.addEventListener('click', () => {
      this.closeModal(this.dom.modalVictory);
      this.openModal(this.dom.modalCodex, this.dom.btnOpenCodex);
    });

    // Timeout (Rush Hour Failure) Actions
    this.dom.btnTimeoutMenu.addEventListener('click', () => {
      this.closeModal(this.dom.modalTimeout);
      this.showView('menu');
    });
    this.dom.btnTimeoutRetry.addEventListener('click', () => {
      this.closeModal(this.dom.modalTimeout);
      this.startNewShift();
    });
    this.dom.btnTimeoutCodex.addEventListener('click', () => {
      this.closeModal(this.dom.modalTimeout);
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

    // Handbook
    this.dom.btnCloseHandbook.addEventListener('click', () => this.closeModal(this.dom.modalHandbook));
    this.dom.btnCloseHandbookCta.addEventListener('click', () => this.closeModal(this.dom.modalHandbook));
    this.dom.btnResetData.addEventListener('click', () => {
      if (confirm('Are you sure you want to reset all bar records and progress?')) {
        this.storage.resetAllData();
        this.initUI();
        this.renderCodex();
        this.closeModal(this.dom.modalHandbook);
        this.setFeedback('idle', 'Records Reset', 'All shift records and mastery achievements cleared.');
      }
    });

    // Backdrop clicks
    [this.dom.modalVictory, this.dom.modalTimeout, this.dom.modalCodex, this.dom.modalHandbook].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal(modal);
      });
    });

    // Keydown ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal(this.dom.modalVictory);
        this.closeModal(this.dom.modalTimeout);
        this.closeModal(this.dom.modalCodex);
        this.closeModal(this.dom.modalHandbook);
      }
    });

    // Audio unlock on user touch/click
    const unlockAudio = () => {
      this.synth.init();
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('click', unlockAudio);
    };
    document.addEventListener('touchstart', unlockAudio, { passive: true });
    document.addEventListener('click', unlockAudio, { passive: true });
  }

  /* ------------------------------------------------------------------------
     SHIFT ENGINE
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
    this.rushSecondsRemaining = this.RUSH_TIME_LIMIT;

    // Build 10-card paired deck
    const deck = [];
    this.dataset.forEach(cocktail => {
      deck.push({ id: `${cocktail.id}-name`, cocktailId: cocktail.id, type: 'identity', cocktail });
      deck.push({ id: `${cocktail.id}-spec`, cocktailId: cocktail.id, type: 'spec', cocktail });
    });

    this.cards = this.shuffleArray(deck);
    this.renderGrid();
    this.updateHUD();

    if (this.currentTier === 'head') {
      this.dom.hudTimerLabel.textContent = 'Rush Limit';
      this.renderRushCountdown();
      this.setFeedback('idle', 'Rush Hour Rail Active', 'Match all 5 classics within 75s! Tap to reveal.');
    } else {
      this.dom.hudTimerLabel.textContent = 'Timer';
      this.renderElapsedTimer();
      const tierTitle = this.currentTier === 'bartender' ? 'Bartender Rail' : 'Apprentice Rail';
      this.setFeedback('idle', `${tierTitle} Ready`, 'Tap cards to pair classic cocktails with their exact specs.');
    }
  }

  shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  renderGrid() {
    this.dom.grid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    this.cards.forEach((cardData, idx) => {
      const cardEl = document.createElement('button');
      cardEl.className = 'memory-card';
      cardEl.dataset.index = idx;
      cardEl.dataset.cocktailId = cardData.cocktailId;
      cardEl.dataset.type = cardData.type;
      cardEl.setAttribute('role', 'button');
      cardEl.setAttribute('aria-label', `Card ${idx + 1}: Face down`);

      const backFace = document.createElement('div');
      backFace.className = 'card-face card-face-back';
      backFace.innerHTML = `
        <div class="back-pattern-frame">
          <div class="back-crest">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M8 22h8M12 15v7M19 3l-7 8-7-8h14zM5 3l7 7 7-7"/>
            </svg>
            <span class="back-crest-text">SPEC</span>
          </div>
        </div>
      `;

      const frontFace = document.createElement('div');
      frontFace.className = `card-face card-face-front type-${cardData.type}`;

      if (cardData.type === 'identity') {
        frontFace.innerHTML = `
          <div class="card-top-tag">
            <span>Classic</span>
            <span aria-hidden="true">🍸</span>
          </div>
          <h3 class="cocktail-name">${cardData.cocktail.name}</h3>
          <div class="cocktail-meta-group">
            <span class="mini-pill">${cardData.cocktail.spirit}</span>
            <span class="mini-pill">${cardData.cocktail.glassware}</span>
          </div>
        `;
      } else {
        frontFace.innerHTML = `
          <div class="card-top-tag">
            <span>Formula</span>
            <span aria-hidden="true">📖</span>
          </div>
          <div class="spec-formula">${cardData.cocktail.formula}</div>
          <div class="spec-sensory">"${cardData.cocktail.sensoryProfile}"</div>
          <span class="spec-method-badge">${cardData.cocktail.technique}</span>
        `;
      }

      cardEl.appendChild(backFace);
      cardEl.appendChild(frontFace);

      // Card touch and click listeners
      cardEl.addEventListener('click', (e) => {
        // Allow inner scrolling without re-triggering card event if already flipped
        if (cardEl.classList.contains('flipped')) return;
        this.handleCardSelection(cardEl, cardData);
      });

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

  handleCardSelection(cardEl, cardData) {
    if (this.isBoardLocked) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

    if (!this.isTimerRunning) this.startTimer();

    this.flipCard(cardEl, cardData);
    this.synth.playFlip();

    if (!this.firstCard) {
      this.firstCard = { el: cardEl, data: cardData };
      const cardTypeLabel = cardData.type === 'identity' ? 'Drink Identity' : 'Formula Spec';
      this.setFeedback('idle', 'Card Inspected', `${cardData.cocktail.name} (${cardTypeLabel}). Select matching card.`);
      return;
    }

    this.secondCard = { el: cardEl, data: cardData };
    this.totalMoves++;
    this.isBoardLocked = true;

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
      ? `${cardData.cocktail.name}, base ${cardData.cocktail.spirit}, serve in ${cardData.cocktail.glassware}`
      : `Recipe Formula for ${cardData.cocktail.name}: ${cardData.cocktail.formula}`;
    cardEl.setAttribute('aria-label', label);
  }

  unflipCard(cardEl) {
    cardEl.classList.remove('flipped');
    cardEl.setAttribute('aria-label', 'Card: Face down');
  }

  handleMatchSuccess() {
    this.synth.playMatch();
    const cocktail = this.firstCard.data.cocktail;
    this.sessionDrinks.add(cocktail.id);

    this.firstCard.el.classList.add('matched');
    this.secondCard.el.classList.add('matched');

    this.streak++;
    if (this.streak > this.maxStreak) this.maxStreak = this.streak;
    const multiplier = Math.min(3.0, 1 + (this.streak - 1) * 0.5);

    const basePoints = this.currentTier === 'head' ? 350 : (this.currentTier === 'bartender' ? 300 : 250);
    const earnedPoints = Math.round(basePoints * multiplier);
    this.score += earnedPoints;
    this.matchedPairsCount++;

    this.updateHUD();
    this.setFeedback('correct', `Matched: ${cocktail.name}`, `${cocktail.technique} • Glass: ${cocktail.glassware}.`);
    this.resetSelection();

    if (this.matchedPairsCount === this.totalPairs) {
      setTimeout(() => this.concludeShift(), 500);
    }
  }

  handleMatchFailure() {
    this.synth.playMismatch();
    this.streak = 0;

    // Head Bartender Rush Hour miss penalty
    if (this.currentTier === 'head') {
      this.score = Math.max(0, this.score - 50);
    }
    this.updateHUD();

    const c1 = this.firstCard.data.cocktail;
    const c2 = this.secondCard.data.cocktail;

    let clue = '';
    if (this.firstCard.data.type === this.secondCard.data.type) {
      clue = 'Match one Drink Identity card with one Formula Spec card.';
    } else if (c1.spirit === c2.spirit) {
      clue = `Both use ${c1.spirit}, but differ in method (${c1.technique} vs ${c2.technique}).`;
    } else {
      clue = `${c1.name} uses ${c1.spirit}, while ${c2.name} uses ${c2.spirit}.`;
    }

    this.setFeedback('mismatch', 'Recipe Mismatch', clue);

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
    }, 1000);
  }

  resetSelection() {
    this.firstCard = null;
    this.secondCard = null;
    this.isBoardLocked = false;
  }

  /* ------------------------------------------------------------------------
     GLANCE / PEEK ACTION
     ------------------------------------------------------------------------ */
  executePeek() {
    // Prevent peek if board locked, or mid-selection, or shift concluded
    if (this.isBoardLocked || this.firstCard !== null || this.matchedPairsCount === this.totalPairs) {
      return;
    }

    this.isBoardLocked = true;
    this.score = Math.max(0, this.score - 150);
    this.updateHUD();

    const unmatchedCards = Array.from(this.dom.grid.querySelectorAll('.memory-card:not(.matched)'));
    unmatchedCards.forEach(c => c.classList.add('flipped'));

    this.setFeedback('idle', 'Station Glance', 'Card rail revealed (-150 pts penalty).');

    setTimeout(() => {
      unmatchedCards.forEach(c => c.classList.remove('flipped'));
      this.isBoardLocked = false;
    }, 1100);
  }

  /* ------------------------------------------------------------------------
     TIMERS & METRICS
     ------------------------------------------------------------------------ */
  startTimer() {
    this.isTimerRunning = true;
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      if (this.currentTier === 'head') {
        this.rushSecondsRemaining--;
        this.elapsedSeconds++;
        this.renderRushCountdown();

        if (this.rushSecondsRemaining <= 0 && this.matchedPairsCount < this.totalPairs) {
          this.handleRushHourTimeout();
        }
      } else {
        this.elapsedSeconds++;
        this.renderElapsedTimer();
      }
    }, 1000);
  }

  resetTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.isTimerRunning = false;
    this.elapsedSeconds = 0;
    this.rushSecondsRemaining = this.RUSH_TIME_LIMIT;
    if (this.currentTier === 'head') {
      this.renderRushCountdown();
    } else {
      this.renderElapsedTimer();
    }
  }

  renderElapsedTimer() {
    const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
    const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
    this.dom.hudTimer.textContent = `${mins}:${secs}`;
    this.dom.hudTimer.style.color = '';
  }

  renderRushCountdown() {
    const remaining = Math.max(0, this.rushSecondsRemaining);
    const mins = Math.floor(remaining / 60).toString().padStart(2, '0');
    const secs = (remaining % 60).toString().padStart(2, '0');
    this.dom.hudTimer.textContent = `${mins}:${secs}`;
    if (remaining <= 15) {
      this.dom.hudTimer.style.color = 'var(--color-orange)';
    } else {
      this.dom.hudTimer.style.color = '';
    }
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
     SHIFT CONCLUSION & OUTCOMES
     ------------------------------------------------------------------------ */
  concludeShift() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.synth.playVictory();

    // Determine newly mastered drinks for celebration tags
    const prevMastered = new Set(this.storage.stats.masteredDrinkIds);

    // Record shift stats in persistence manager
    this.storage.recordShiftResult(
      this.score,
      this.maxStreak,
      this.elapsedSeconds,
      Array.from(this.sessionDrinks)
    );

    // Refresh unlocks & codex
    this.verifyAndApplyTierAvailability();
    this.renderCodex();

    const mins = Math.floor(this.elapsedSeconds / 60).toString().padStart(2, '0');
    const secs = (this.elapsedSeconds % 60).toString().padStart(2, '0');
    const formattedTime = `${mins}:${secs}`;

    const accuracy = this.totalMoves > 0
      ? Math.min(100, Math.round((this.totalPairs / this.totalMoves) * 100))
      : 100;

    const tierTitle = this.currentTier === 'head' ? 'Head Bartender' : (this.currentTier.charAt(0).toUpperCase() + this.currentTier.slice(1));
    this.dom.victoryTierTag.textContent = `${tierTitle} Service Concluded`;
    this.dom.vicScore.textContent = this.score.toLocaleString();
    this.dom.vicTime.textContent = formattedTime;
    this.dom.vicAccuracy.textContent = `${accuracy}%`;
    this.dom.vicStreak.textContent = `${this.maxStreak}x`;

    this.dom.vicCocktailsList.innerHTML = '';
    this.dataset.forEach(drink => {
      const isNew = !prevMastered.has(drink.id) && this.sessionDrinks.has(drink.id);
      const badge = document.createElement('span');
      badge.className = 'recap-badge';
      badge.innerHTML = `<span aria-hidden="true">🍸</span> <strong>${drink.name}</strong> (${drink.spirit})${isNew ? '<span class="badge-new-master">NEW!</span>' : ''}`;
      this.dom.vicCocktailsList.appendChild(badge);
    });

    this.openModal(this.dom.modalVictory);
  }

  handleRushHourTimeout() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.isBoardLocked = true;
    this.synth.playTimeout();

    const accuracy = this.totalMoves > 0
      ? Math.min(100, Math.round((this.matchedPairsCount / this.totalMoves) * 100))
      : 0;

    this.dom.timeoutScore.textContent = this.score.toLocaleString();
    this.dom.timeoutPairs.textContent = `${this.matchedPairsCount} / ${this.totalPairs}`;
    this.dom.timeoutStreak.textContent = `${this.maxStreak}x`;
    this.dom.timeoutAccuracy.textContent = `${accuracy}%`;

    this.openModal(this.dom.modalTimeout);
  }

  /* ------------------------------------------------------------------------
     CODEX VIEWER
     ------------------------------------------------------------------------ */
  renderCodex(filteredList = this.dataset) {
    this.dom.codexList.innerHTML = '';
    if (filteredList.length === 0) {
      this.dom.codexList.innerHTML = `<div style="text-align: center; padding: 24px; color: var(--text-muted);">No entries found matching query.</div>`;
      return;
    }

    const masteredIds = new Set(this.storage.stats.masteredDrinkIds);
    const fragment = document.createDocumentFragment();

    filteredList.forEach(item => {
      const isMastered = masteredIds.has(item.id);
      const card = document.createElement('article');
      card.className = 'codex-card';
      card.innerHTML = `
        <div class="codex-card-header">
          <h3 class="codex-drink-title">${item.name}</h3>
          <div style="display: flex; gap: 4px; align-items: center;">
            ${isMastered ? '<span class="mastered-stamp">Mastered</span>' : ''}
            <span class="mini-pill text-gold">${item.family}</span>
          </div>
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
     MODAL CONTROLLER WITH ACCESSIBILITY TRAPPING
     ------------------------------------------------------------------------ */
  openModal(modalEl, triggerBtn = null) {
    if (triggerBtn) {
      this.lastTriggerElement = triggerBtn;
      triggerBtn.setAttribute('aria-expanded', 'true');
    }
    modalEl.classList.remove('hidden');
    const focusable = modalEl.querySelector('button, input, [tabindex="0"]');
    if (focusable) focusable.focus();
  }

  closeModal(modalEl) {
    modalEl.classList.add('hidden');
    if (this.lastTriggerElement) {
      this.lastTriggerElement.setAttribute('aria-expanded', 'false');
      this.lastTriggerElement.focus();
      this.lastTriggerElement = null;
    }
  }
}

/* ==========================================================================
   6. APP BOOTSTRAP
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  if (validateCocktailDataset(COCKTAILS_DB)) {
    window.cocktailCabinetApp = new CocktailCabinetGame(COCKTAILS_DB);
  } else {
    console.error('App initialization aborted: Cocktail dataset validation failed.');
  }
});
