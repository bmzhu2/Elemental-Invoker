class SpellList {
  
}

SpellList.threeCost = {
  1: {
    name: 'Inferno',
    anchor: { type: 'fire', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'fire', dx: -1, dy: 0 },
      { type: 'fire', dx: 1, dy: 0 }
    ]
  },
  2: {
    name: 'Molten Bath',
    anchor: { type: 'water', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'fire', dx: -1, dy: 0 },
      { type: 'fire', dx: 0, dy: 1 }
    ]
  },
  3: {
    name: 'Planetary',
    anchor: { type: 'fire', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: 0, dy: -1 },
      { type: 'earth', dx: 0, dy: 1 }
    ]
  },
  4: {
    name: 'Thunderclap',
    anchor: { type: 'wind', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'fire', dx: -1, dy: 0 },
      { type: 'fire', dx: 1, dy: 0 }
    ]
  },
  5: {
    name: 'Briar',
    anchor: { type: 'water', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'earth', dx: -1, dy: 0 },
      { type: 'earth', dx: 1, dy: 0 }
    ]
  },
  6: {
    name: 'Cold Snap',
    anchor: { type: 'water', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'fire', dx: -1, dy: 0 },
      { type: 'water', dx: 1, dy: 0 }
    ]
  },
  7: {
    name: 'Whirlwind',
    anchor: { type: 'wind', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: 0, dy: -1 },
      { type: 'wind', dx: 0, dy: 1 }
    ]
  },
  8: {
    name: 'Typhoon',
    anchor: { type: 'wind', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: 0, dy: -1 },
      { type: 'water', dx: 0, dy: 1 }
    ]
  },
  9: {
    name: 'Hail Prism',
    anchor: { type: 'water', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: 0, dy: -1 },
      { type: 'water', dx: 0, dy: 1 }
    ]
  },
  10: {
    name: 'Spire',
    anchor: { type: 'earth', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'earth', dx: 0, dy: -1 },
      { type: 'water', dx: 0, dy: 1 }
    ]
  },
  11: {
    name: 'Ply',
    anchor: { type: 'earth', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'water', dx: -1, dy: 0 },
      { type: 'water', dx: 0, dy: 1 }
    ]
  },
  12: {
    name: 'Cure',
    anchor: { type: 'wind', dx: 1, dy: 2 },
    otherPieces: [
      { type: 'earth', dx: 0, dy: -1 },
      { type: 'earth', dx: 1, dy: 0 }
    ]
  },
  13: {
    name: 'Arid Heat',
    anchor: { type: 'fire', dx: 1, dy: 2 },
    otherPieces: [
      { type: 'earth', dx: 0, dy: -1 },
      { type: 'earth', dx: 1, dy: 0 }
    ]
  },
  14: {
    name: 'Heat Wave',
    anchor: { type: 'fire', dx: 1, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: 1, dy: 0 },
      { type: 'wind', dx: 0, dy: 1 }
    ]
  },
  15: {
    name: 'Froth Spiral',
    anchor: { type: 'water', dx: 2, dy: 2 },
    otherPieces: [
      { type: 'water', dx: -1, dy: 0 },
      { type: 'wind', dx: 0, dy: -1 }
    ]
  },
  16: {
    name: 'Wish',
    anchor: { type: 'water', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: -1, dy: 0 },
      { type: 'earth', dx: 1, dy: 0 }
    ]
  }
}

SpellList.fourCost = {
  1: {
    name: 'Tempest',
    anchor: { type: 'water', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: 0, dy: -1 },
      { type: 'wind', dx: 0, dy: 1 },
      { type: 'water', dx: 0, dy: 2 }
    ]
  },
  2: {
    name: 'Mother Gaia',
    anchor: { type: 'earth', dx: 1, dy: 1 },
    otherPieces: [
      { type: 'earth', dx: 1, dy: 0 },
      { type: 'earth', dx: 0, dy: 1 },
      { type: 'earth', dx: 1, dy: 1 },
    ]
  },
  3: {
    name: 'Flash Bolt',
    anchor: { type: 'wind', dx: 1, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: 1, dy: 0 },
      { type: 'fire', dx: 0, dy: 1 },
      { type: 'fire', dx: 0, dy: 2 },
    ]
  },
  4: {
    name: 'Vital Boon',
    anchor: { type: 'earth', dx: 1, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: 1, dy: 0 },
      { type: 'wind', dx: 0, dy: 1 },
      { type: 'earth', dx: 1, dy: 1 },
    ]
  },
  5: {
    name: 'Coldforge',
    anchor: { type: 'earth', dx: 1, dy: 1 },
    otherPieces: [
      { type: 'earth', dx: 1, dy: 0 },
      { type: 'water', dx: 0, dy: 1 },
      { type: 'water', dx: 1, dy: 1 },
    ]
  },
  6: {
    name: 'Liquifier',
    anchor: { type: 'water', dx: 1, dy: 1 },
    otherPieces: [
      { type: 'fire', dx: 1, dy: 0 },
      { type: 'fire', dx: 0, dy: 1 },
      { type: 'water', dx: 1, dy: 1 },
    ]
  },
  7: {
    name: 'Mad Blast',
    anchor: { type: 'fire', dx: 1, dy: 1 },
    otherPieces: [
      { type: 'fire', dx: 1, dy: 0 },
      { type: 'fire', dx: 0, dy: 1 },
      { type: 'fire', dx: 1, dy: 1 },
    ]
  },
  8: {
    name: 'Tornado',
    anchor: { type: 'wind', dx: 1, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: 1, dy: 0 },
      { type: 'wind', dx: 0, dy: 1 },
      { type: 'wind', dx: 1, dy: 1 },
    ]
  },
  9: {
    name: 'Deluge',
    anchor: { type: 'water', dx: 1, dy: 1 },
    otherPieces: [
      { type: 'water', dx: 1, dy: 0 },
      { type: 'water', dx: 0, dy: 1 },
      { type: 'water', dx: 1, dy: 1 },
    ]
  },
  10: {
    name: 'Epicenter',
    anchor: { type: 'earth', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'earth', dx: -1, dy: 0 },
      { type: 'fire', dx: 1, dy: 0 },
      { type: 'fire', dx: 1, dy: 1 },
    ]
  }
}

SpellList.fiveCost = {
  1: {
    name: 'Meteor',
    anchor: { type: 'fire', dx: 2, dy: 2 },
    otherPieces: [
      { type: 'fire', dx: -1, dy: 0 },
      { type: 'wind', dx: 0, dy: -1 },
      { type: 'earth', dx: 0, dy: 1 },
      { type: 'earth', dx: -1, dy: 1 }
    ]
  },
  2: {
    name: 'Avalanche',
    anchor: { type: 'earth', dx: 2, dy: 2 },
    otherPieces: [
      { type: 'earth', dx: -2, dy: 0 },
      { type: 'earth', dx: -1, dy: 0 },
      { type: 'water', dx: 1, dy: 0 },
      { type: 'water', dx: 1, dy: -1 }
    ]
  },
  3: {
    name: 'Pyroclasm',
    anchor: { type: 'fire', dx: 2, dy: 2 },
    otherPieces: [
      { type: 'fire', dx: 0, dy: -1 },
      { type: 'water', dx: -1, dy: 1 },
      { type: 'water', dx: 0, dy: 1 },
      { type: 'water', dx: 1, dy: 1 }
    ]
  },
  4: {
    name: 'Supernova',
    anchor: { type: 'earth', dx: 2, dy: 2 },
    otherPieces: [
      { type: 'fire', dx: 0, dy: -1 },
      { type: 'fire', dx: 0, dy: 1 },
      { type: 'fire', dx: -1, dy: 0 },
      { type: 'fire', dx: 1, dy: 0 }
    ]
  },
  5: {
    name: 'Thunderhead',
    anchor: { type: 'wind', dx: 1, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: 1, dy: 0 },
      { type: 'wind', dx: 2, dy: 0 },
      { type: 'fire', dx: 0, dy: 1 },
      { type: 'fire', dx: 0, dy: 2 }
    ]
  },
  6: {
    name: 'Hurricane',
    anchor: { type: 'water', dx: 2, dy: 2 },
    otherPieces: [
      { type: 'wind', dx: 0, dy: -1 },
      { type: 'wind', dx: 0, dy: 1 },
      { type: 'wind', dx: -1, dy: 0 },
      { type: 'water', dx: -1, dy: -1 }
    ]
  },
  7: {
    name: 'Diamond Berg',
    anchor: { type: 'earth', dx: 2, dy: 2 },
    otherPieces: [
      { type: 'earth', dx: 0, dy: -1 },
      { type: 'earth', dx: 1, dy: 0 },
      { type: 'water', dx: -1, dy: 0 },
      { type: 'water', dx: -1, dy: -1 }
    ]
  },
  8: {
    name: 'Judgment',
    anchor: { type: 'wind', dx: 2, dy: 2 },
    otherPieces: [
      { type: 'earth', dx: 0, dy: 1 },
      { type: 'wind', dx: 0, dy: -1 },
      { type: 'water', dx: -1, dy: -1 },
      { type: 'water', dx: 1, dy: -1 }
    ]
  },
  9: {
    name: 'Dire Inferno',
    anchor: { type: 'fire', dx: 2, dy: 2 },
    otherPieces: [
      { type: 'fire', dx: 1, dy: 0 },
      { type: 'wind', dx: -1, dy: 0 },
      { type: 'wind', dx: -1, dy: -1 },
      { type: 'earth', dx: -1, dy: 1 }
    ]
  },
  10: {
    name: 'Spark Plasma',
    anchor: { type: 'water', dx: 2, dy: 2 },
    otherPieces: [
      { type: 'fire', dx: -1, dy: 0 },
      { type: 'fire', dx: 1, dy: 0 },
      { type: 'wind', dx: -1, dy: -1 },
      { type: 'wind', dx: 1, dy: -1 }
    ]
  }
}

module.exports = SpellList;