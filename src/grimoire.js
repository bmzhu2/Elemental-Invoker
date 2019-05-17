const Spell = require('./spell.js');

class Grimoire {

  static initialize(spells) {
    let newSpells = spells;
    for (let i = 0; i < 6; i++) {
      if(!spells[i]) {
        switch (i) {
          case 0:
            newSpells[0] = new Spell(0, Spell.random(3))
            break;
          case 1:
            newSpells[1] = new Spell(1, Spell.random(4))
            break;
          case 2:
            newSpells[2] = new Spell(2, Spell.random(5))
            break;
          case 3:
            newSpells[3] = new Spell(3, Spell.random(3, newSpells[0]))
            break;
          case 4:
            newSpells[4] = new Spell(4, Spell.random(4, newSpells[1]))
            break;
          case 5:
            newSpells[5] = new Spell(5, Spell.random(5, newSpells[2]))
        }
      }
      
    }

    return newSpells;
  }

}

module.exports = Grimoire;