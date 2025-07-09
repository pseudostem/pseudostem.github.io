// ⬇️ Troops & Monsters
const troopData = [
  { lvl: 9, type: 'flying', leadership: 20, health: 330600, name: 'Corax II' },
  { lvl: 9, type: 'mount', leadership: 2, health: 33060, name: 'Smiter II' },
  { lvl: 9, type: 'ranged', leadership: 1, health: 16530, name: 'Purifier II' },
  { lvl: 9, type: 'melee', leadership: 1, health: 16530, name: 'Punisher II' },

  { lvl: 8, type: 'flying', leadership: 20, health: 183600, name: 'Corax I' },
  { lvl: 8, type: 'mount', leadership: 2, health: 18360, name: 'Smiter I' },
  { lvl: 8, type: 'ranged', leadership: 1, health: 9180, name: 'Purifier I' },
  { lvl: 8, type: 'melee', leadership: 1, health: 9180, name: 'Punisher I' },

  { lvl: 7, type: 'flying', leadership: 20, health: 102000, name: 'Battle Griffin VII' },
  { lvl: 7, type: 'mount', leadership: 2, health: 10200, name: 'Mounted Knight VII' },
  { lvl: 7, type: 'ranged', leadership: 1, health: 5100, name: 'Heavy Arbalester VII' },
  { lvl: 7, type: 'melee', leadership: 1, health: 5100, name: 'Heavy Halberdier VII' },

  { lvl: 6, type: 'flying', leadership: 20, health: 57000, name: 'Battle Griffin VI' },
  { lvl: 6, type: 'mount', leadership: 2, health: 5700, name: 'Mounted Knight VI' },
  { lvl: 6, type: 'ranged', leadership: 1, health: 2820, name: 'Heavy Arbalester VI' },
  { lvl: 6, type: 'melee', leadership: 1, health: 2820, name: 'Heavy Halberdier VI' },

  { lvl: 5, type: 'flying', leadership: 20, health: 30000, name: 'Battle Griffin V' },
  { lvl: 5, type: 'mount', leadership: 2, health: 3150, name: 'Rider V' },
  { lvl: 5, type: 'ranged', leadership: 1, health: 1560, name: 'Archer V' },
  { lvl: 5, type: 'melee', leadership: 1, health: 1560, name: 'Spearman V' },

  { lvl: 4, type: 'mount', leadership: 2, health: 1740, name: 'Rider IV' },
  { lvl: 4, type: 'ranged', leadership: 1, health: 870, name: 'Archer IV' },
  { lvl: 4, type: 'melee', leadership: 1, health: 870, name: 'Spearman IV' },

  { lvl: 3, type: 'mount', leadership: 2, health: 960, name: 'Rider III' },
  { lvl: 3, type: 'ranged', leadership: 1, health: 480, name: 'Archer III' },
  { lvl: 3, type: 'melee', leadership: 1, health: 480, name: 'Spearman III' },

  { lvl: 2, type: 'mount', leadership: 2, health: 540, name: 'Rider II' },
  { lvl: 2, type: 'ranged', leadership: 1, health: 270, name: 'Archer II' },
  { lvl: 2, type: 'melee', leadership: 1, health: 270, name: 'Spearman II' },

  { lvl: 1, type: 'mount', leadership: 2, health: 300, name: 'Rider I' },
  { lvl: 1, type: 'ranged', leadership: 1, health: 150, name: 'Archer I' },
  { lvl: 1, type: 'melee', leadership: 1, health: 150, name: 'Spearman I' }
];


const specialistData = [
  // 🔹 Level 9
  { lvl: 9, type: 'flying', name: 'Royal Lion II', leadership: 20, health: 330600 },
  { lvl: 9, type: 'mount', name: 'Whitemane II', leadership: 2, health: 33060 },
  { lvl: 9, type: 'ranged', name: 'Legitimist II', leadership: 1, health: 16530 },
  { lvl: 9, type: 'melee', name: 'Duelist II', leadership: 1, health: 16530 },
  { lvl: 9, type: 'scout', name: 'Panoptic II', leadership: 5, health: 8280 },

  // 🔹 Level 8
  { lvl: 8, type: 'flying', name: 'Royal Lion I', leadership: 20, health: 183600 },
  { lvl: 8, type: 'mount', name: 'Whitemane I', leadership: 2, health: 18360 },
  { lvl: 8, type: 'ranged', name: 'Legitimist I', leadership: 1, health: 9180 },
  { lvl: 8, type: 'melee', name: 'Duelist I', leadership: 1, health: 9180 },
  { lvl: 8, type: 'scout', name: 'Panoptic I', leadership: 5, health: 4590 },

  // 🔹 Level 7
  { lvl: 7, type: 'mount', name: 'Lion Rider VII', leadership: 2, health: 10200 },
  { lvl: 7, type: 'ranged', name: 'Deadshot VII', leadership: 1, health: 5100 },
  { lvl: 7, type: 'melee', name: 'Heavy Knight VI', leadership: 1, health: 5100 },
  { lvl: 7, type: 'flying', name: 'Vulture VII', leadership: 1, health: 5100 },
  { lvl: 7, type: 'scout', name: 'Swift Jaeger VII', leadership: 5, health: 2550 },

  // 🔹 Level 6
  { lvl: 6, type: 'mount', name: 'Lion Rider VI', leadership: 2, health: 5700 },
  { lvl: 6, type: 'ranged', name: 'Deadshot VI', leadership: 1, health: 2820 },
  { lvl: 6, type: 'melee', name: 'Heavy Knight VI', leadership: 1, health: 2820 },
  { lvl: 6, type: 'flying', name: 'Vulture VI', leadership: 1, health: 2820 },
  { lvl: 6, type: 'scout', name: 'Swift Jaeger VI', leadership: 5, health: 1410 },

  // 🔹 Level 5
  { lvl: 5, type: 'mount', name: 'Lion Rider V', leadership: 2, health: 3150 },
  { lvl: 5, type: 'ranged', name: 'Deadshot V', leadership: 1, health: 1560 },
  { lvl: 5, type: 'melee', name: 'Swordsman V', leadership: 1, health: 1560 },
  { lvl: 5, type: 'flying', name: 'Vulture V', leadership: 1, health: 1560 },
  { lvl: 5, type: 'scout', name: 'Spy V', leadership: 5, health: 780 },

  // 🔹 Level 4
  { lvl: 4, type: 'melee', name: 'Swordsman IV', leadership: 1, health: 870 },
  { lvl: 4, type: 'scout', name: 'Spy IV', leadership: 5, health: 450 },

  // 🔹 Level 3
  { lvl: 3, type: 'melee', name: 'Swordsman III', leadership: 1, health: 480 },
  { lvl: 3, type: 'scout', name: 'Spy III', leadership: 5, health: 240 },

  // 🔹 Level 2
  { lvl: 2, type: 'melee', name: 'Swordsman II', leadership: 1, health: 270 },
  { lvl: 2, type: 'scout', name: 'Spy II', leadership: 5, health: 135 },

  // 🔹 Level 1
  { lvl: 1, type: 'melee', name: 'Swordsman I', leadership: 1, health: 150 },
  { lvl: 1, type: 'scout', name: 'Spy I', leadership: 5, health: 75 }
];


const monsterData = [
  // 🔹 Level 9
  { lvl: 9, attack: 'melee', type: 'giant', name: 'Kraken II', dominance: 55, health: 3630000 },
  { lvl: 9, attack: 'flying', type: 'elemental', name: 'Fire Phoenix II', dominance: 54, health: 3570000 },
  { lvl: 9, attack: 'mount', type: 'dragon', name: 'Devastator II', dominance: 53, health: 3510000 },
  { lvl: 9, attack: 'ranged', type: 'beast', name: 'Trickster II', dominance: 52, health: 3450000 },

  // 🔹 Level 8
  { lvl: 8, attack: 'melee', type: 'giant', name: 'Kraken I', dominance: 55, health: 2010000 },
  { lvl: 8, attack: 'flying', type: 'elemental', name: 'Fire Phoenix I', dominance: 54, health: 1980000 },
  { lvl: 8, attack: 'mount', type: 'dragon', name: 'Devastator I', dominance: 53, health: 1950000 },
  { lvl: 8, attack: 'ranged', type: 'beast', name: 'Trickster I', dominance: 52, health: 1920000 },

  // 🔹 Level 7
  { lvl: 7, attack: 'melee', type: 'elemental', name: 'Wind Lord', dominance: 45, health: 930000 },
  { lvl: 7, attack: 'flying', type: 'dragon', name: 'Black Dragon', dominance: 44, health: 900000 },
  { lvl: 7, attack: 'ranged', type: 'giant', name: 'Destructive Colossus', dominance: 43, health: 870000 },
  { lvl: 7, attack: 'mount', type: 'beast', name: 'Ancient Terror', dominance: 41, health: 840000 },

  // 🔹 Level 6
  { lvl: 6, attack: 'melee', type: 'elemental', name: 'Ruby Golem', dominance: 35, health: 390000 },
  { lvl: 6, attack: 'melee', type: 'beast', name: 'Jungle Destroyer', dominance: 34, health: 390000 },
  { lvl: 6, attack: 'melee', type: 'dragon', name: 'Crystal Dragon', dominance: 33, health: 360000 },
  { lvl: 6, attack: 'mount', type: 'giant', name: 'Troll Rider', dominance: 30, health: 330000 },

  // 🔹 Level 5
  { lvl: 5, attack: 'melee', type: 'giant', name: 'Ettin', dominance: 23, health: 144000 },
  { lvl: 5, attack: 'flying', type: 'beast', name: 'Fearsome Manticore', dominance: 22, health: 138000 },
  { lvl: 5, attack: 'mount', type: 'elemental', name: 'Flaming Centaur', dominance: 21, health: 132000 },
  { lvl: 5, attack: 'mount', type: 'dragon', name: 'Desert Vanquisher', dominance: 20, health: 126000 },

  // 🔹 Level 4
  { lvl: 4, attack: 'flying', type: 'elemental', name: 'Ice Phoenix', dominance: 15, health: 51000 },
  { lvl: 4, attack: 'ranged', type: 'dragon', name: 'Magic Dragon', dominance: 13, health: 45000 },
  { lvl: 4, attack: 'melee', type: 'giant', name: 'Many-Armed Guardian', dominance: 11, health: 39000 },
  { lvl: 4, attack: 'ranged', type: 'beast', name: 'Gorgon Medusa', dominance: 10, health: 36000 },

  // 🔹 Level 3
  { lvl: 3, attack: 'flying', type: 'giant', name: 'Stone Gargoyle', dominance: 8, health: 15600 },
  { lvl: 3, attack: 'flying', type: 'dragon', name: 'Emerald Dragon', dominance: 7, health: 13500 },
  { lvl: 3, attack: 'mount', type: 'beast', name: 'Battle Boar', dominance: 6, health: 11700 },
  { lvl: 3, attack: 'ranged', type: 'elemental', name: 'Water Elemental', dominance: 3, health: 5700 }
];


const mercenaryData = [
  // 🔹 Level 9
  { lvl: 9, type: 'flying', type2: 'cursed', name: 'Wyvern', authority: 63, health: 2070000 },
  { lvl: 9, type: 'mount', type2: 'elves', name: 'Warden', authority: 43, health: 1410000 },
  { lvl: 9, type: 'ranged', type2: 'undead', name: 'Ethernal Cannoneer', authority: 40, health: 1320000 },
  { lvl: 9, type: 'melee', type2: 'demon', name: 'Demonic Salamander', authority: 38, health: 123000 },
  { lvl: 9, type: 'flying', type2: 'spec', name: 'Jago', authority: 20, health: 660000 },
  { lvl: 9, type: 'flying', type2: 'guard', name: 'Warregal', authority: 20, health: 660000 },
  { lvl: 9, type: 'were', type2: 'guard', name: 'Elder Hunter II', authority: 1, health: 75000 },
  { lvl: 9, type: 'epic', type2: 'guard', name: 'Superior Epic Monster Hunter', authority: 1, health: 75000 },
  { lvl: 9, type: 'mount', type2: 'spec', name: 'Galloper', authority: 2, health: 66000 },
  { lvl: 9, type: 'mount', type2: 'guard', name: 'Quicksand', authority: 2, health: 66000 },
  { lvl: 9, type: 'melee', type2: 'guard', type3: 'swarm', name: 'Chitinous Defender Leader', authority: 1, health: 33600 },
  { lvl: 9, type: 'mount', type2: 'guard', type3: 'swarm', name: 'Combat Anteater Leader', authority: 1, health: 34200 },
  { lvl: 9, type: 'melee', type2: 'guard', name: 'Slavic Warrior', authority: 1, health: 33000 },
  { lvl: 9, type: 'ranged', type2: 'guard', name: 'Highlander', authority: 1, health: 33000 },
  { lvl: 9, type: 'melee', type2: 'spec', name: 'Scarface', authority: 1, health: 33000 },
  { lvl: 9, type: 'ranged', type2: 'spec', name: 'Pounder', authority: 1, health: 33000 },
  { lvl: 9, type: 'flying', type2: 'guard', type3: 'swarm', name: 'Wasp-Man Leader', authority: 1, health: 32400 },
  { lvl: 9, type: 'ranged', type2: 'guard', type3: 'swarm', name: 'Grim Stalker Leader', authority: 1, health: 31800 },
  { lvl: 9, type: 'hunt', type2: 'guard', name: 'Elder Bounty Hunter', authority: 1, health: 75000 },


  // 🔹 Level 7
  { lvl: 7, type: 'ranged', type2: 'demon', name: 'Fire Lord', authority: 164, health: 1680000 },
  { lvl: 7, type: 'melee', type2: 'barbarian', name: 'Sand Word', authority: 128, health: 1290000 },
  { lvl: 7, type: 'flying', type2: 'cursed', name: 'Cursed Dragon', authority: 93, health: 960000 },
  { lvl: 7, type: 'flying', type2: 'elves', name: 'Life Dragon', authority: 70, health: 720000 },
  { lvl: 7, type: 'ranged', type2: 'undead', name: 'Overlord', authority: 60, health: 600000 },
  { lvl: 7, type: 'flying', type2: 'dragon', name: 'Golden Dragon', authority: 50, health: 510000 },
  { lvl: 7, type: 'ranged', type2: 'giant', name: 'Lightning Lord', authority: 45, health: 460000 },
  { lvl: 7, type: 'mount', type2: 'elemental', name: 'Sea Lord', authority: 40, health: 420000 },
  { lvl: 7, type: 'flying', type2: 'guard', name: 'Sphynx VII', authority: 40, health: 408000 },
  { lvl: 7, type: 'melee', type2: 'beast', name: 'Jungle King', authority: 33, health: 310000 },
  { lvl: 7, type: 'epic', type2: 'guard', name: 'Epic Monster Hunter VII', authority: 1, health: 11220 },
  { lvl: 7, type: 'were', type2: 'guard', name: 'Werebeast Hunter VII', authority: 1, health: 11220 },
  { lvl: 7, type: 'mount', type2: 'guard', name: 'Chariot VII', authority: 2, health: 20400 },
  { lvl: 7, type: 'ranged', type2: 'guard', name: 'Arbalester VII', authority: 1, health: 10200 },
  { lvl: 7, type: 'melee', type2: 'guard', name: 'Legionary VII', authority: 1, health: 10200 },

  // 🔹 Level 6
  { lvl: 6, type: 'melee', type2: 'demon', name: 'Archdemon', authority: 95, health: 540000 },
  { lvl: 6, type: 'melee', type2: 'barbarian', name: 'Abomination', authority: 68, health: 390000 },
  { lvl: 6, type: 'melee', type2: 'cursed', name: 'Cursed Dendroid', authority: 57, health: 330000 },
  { lvl: 6, type: 'melee', type2: 'elves', name: 'Ent', authority: 39, health: 219000 },
  { lvl: 6, type: 'melee', type2: 'undead', name: 'Bone Golem', authority: 37, health: 210000 },
  { lvl: 6, type: 'mount', type2: 'undead', name: 'Death Chariot', authority: 30, health: 171000 },
  { lvl: 6, type: 'flying', type2: 'spec', name: 'Shedu', authority: 10, health: 56700 },
  { lvl: 6, type: 'flying', type2: 'guard', name: 'Sphynx VI', authority: 10, health: 56700 },
  { lvl: 6, type: 'epic', type2: 'guard', name: 'Epic Monster Hunter VI', authority: 1, health: 6090 },
  { lvl: 6, type: 'were', type2: 'guard', name: 'Werebeast Hunter VI', authority: 1, health: 6090 },
  { lvl: 6, type: 'mount', type2: 'guard', name: 'Chariot VI', authority: 2, health: 11400 },
  { lvl: 6, type: 'mount', type2: 'spec', name: 'Rhino Rider', authority: 2, health: 11340 },
  { lvl: 6, type: 'melee', type2: 'guard', name: 'Legionary VI', authority: 1, health: 5700 },
  { lvl: 6, type: 'ranged', type2: 'guard', name: 'Arbalester VI', authority: 1, health: 5700 },
  { lvl: 6, type: 'melee', type2: 'spec', name: 'Knight', authority: 1, health: 5700 },
  { lvl: 6, type: 'ranged', type2: 'spec', name: 'Trailseeker', authority: 1, health: 5670 },

  // 🔹 Level 5
  { lvl: 5, type: 'mount', type2: 'demon', name: 'Fireworm Rider', authority: 48, health: 150000 },
  { lvl: 5, type: 'ranged', type2: 'barbarian', name: 'Cyclops', authority: 43, health: 135000 },
  { lvl: 5, type: 'flying', type2: 'demon', name: 'Ifrit', authority: 42, health: 132000 },
  { lvl: 5, type: 'mount', type2: 'barbarian', name: 'Scorpion Rider', authority: 36, health: 111000 },
  { lvl: 5, type: 'melee', type2: 'cursed', name: 'Giant Zombie', authority: 32, health: 99000 },
  { lvl: 5, type: 'mount', type2: 'cursed', name: 'Bull Rider', authority: 28, health: 87000 },
  { lvl: 5, type: 'mount', type2: 'elves', name: 'Unicorn Rider', authority: 26, health: 81000 },
  { lvl: 5, type: 'melee', type2: 'elves', name: 'Bear', authority: 21, health: 66000 },
  { lvl: 5, type: 'flying', type2: 'undead', name: 'Gargoyle', authority: 19, health: 57000 },
  { lvl: 5, type: 'ranged', type2: 'guard', name: 'Swift Marksman', authority: 1, health: 3150 }
];