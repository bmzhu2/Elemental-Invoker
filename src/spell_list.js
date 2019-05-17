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
    name: 'Magma Storm',
    anchor: { type: 'water', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'fire', dx: -1, dy: 0 },
      { type: 'fire', dx: 0, dy: 1 }
    ]
  },
  3: {
    name: 'Mad Growth',
    anchor: { type: 'water', dx: 2, dy: 1 },
    otherPieces: [
      { type: 'wind', dx: 0, dy: -1 },
      { type: 'earth', dx: 0, dy: 1 }
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