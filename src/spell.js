const SpellList = require('./spell_list.js')

class Spell {
  constructor(slot, spellInfo) {
    this.slot = slot;
    this.name = spellInfo.name;
    this.anchor = spellInfo.anchor;
    this.otherPieces = spellInfo.otherPieces;
    this.selected = false;
    this.radius = 0;
    this.maxRadius = 11;
  }

  newSpell(spells) {
    let randomNum;
    let newSpell;
    switch (this.slot % 3) {
      case 0:
        randomNum = Math.floor(Math.random() * 16) + 1;
        while (SpellList.threeCost[randomNum].name === spells[0].name || 
                SpellList.threeCost[randomNum].name === spells[3].name) {
          randomNum = Math.floor(Math.random() * 16) + 1;
        }
        newSpell = SpellList.threeCost[randomNum];
        break;
      case 1:
        randomNum = Math.floor(Math.random() * 10) + 1;
        while (SpellList.fourCost[randomNum].name === spells[1].name ||
          SpellList.fourCost[randomNum].name === spells[4].name) {
          randomNum = Math.floor(Math.random() * 10) + 1;
        }
        newSpell = SpellList.fourCost[randomNum];
        break;
      case 2:
        randomNum = Math.floor(Math.random() * 10) + 1;
        while (SpellList.fiveCost[randomNum].name === spells[2].name ||
          SpellList.fiveCost[randomNum].name === spells[5].name) {
          randomNum = Math.floor(Math.random() * 10) + 1;
        }
        newSpell = SpellList.fiveCost[randomNum];
        break;
    }
    
    this.name = newSpell.name;
    this.anchor = newSpell.anchor;
    this.otherPieces = newSpell.otherPieces;
    this.radius = 0;
  }

  cast(anchorPos, pieces) {
    if(pieces[anchorPos].piece !== this.anchor.type) {
      return false;
    }

    const anchorX = anchorPos % 5;
    const anchorY = Math.floor(anchorPos / 5);

    let positions = [anchorPos];

    this.otherPieces.forEach(piece => {
      if(anchorX + piece.dx > 4 || anchorX + piece.dx < 0 ||
        anchorY + piece.dy > 4 || anchorY + piece.dy < 0) {
          return false;
      }
      const position = anchorX + piece.dx + (anchorY + piece.dy) * 5;
      if (pieces[position].piece != piece.type) {
        return false;
      }
      positions.push(position)
    });

    return positions
  }

  static random(cost, otherSpell) {
    let randomNum;
    switch (cost) {
      case 3:
        randomNum = Math.floor(Math.random() * 16) + 1; 
        while ((otherSpell && (SpellList.threeCost[randomNum].name === otherSpell.name))) {
                  randomNum = Math.floor(Math.random() * 16) + 1;
                }
        return SpellList.threeCost[randomNum]
      case 4:
        randomNum = Math.floor(Math.random() * 10) + 1;
        while (otherSpell && (SpellList.fourCost[randomNum].name === otherSpell.name)) {
          randomNum = Math.floor(Math.random() * 10) + 1;
        }
        return SpellList.fourCost[randomNum]
      case 5:
        randomNum = Math.floor(Math.random() * 10) + 1;
        while (otherSpell && (SpellList.fiveCost[randomNum].name === otherSpell.name)) {
          randomNum = Math.floor(Math.random() * 10) + 1;
        }
        return SpellList.fiveCost[randomNum]
    }
  }

  draw() {
    this.spellCtx.clearRect(0, 0, 112, 112);
    if(this.radius < this.maxRadius) {
      this.radius += .25;
    }

    if(!this.selected) {
      this.spellCtx.beginPath();

      this.spellCtx.arc(this.anchor.dx * 27 + 13, this.anchor.dy * 27 + 13, this.radius, 0, 2 * Math.PI);
      this.spellCtx.fillStyle = this.colorByType(this.anchor.type);
      this.spellCtx.fill();
      this.spellCtx.lineWidth = 1;
      this.spellCtx.stroke();
      this.spellCtx.closePath();
      if(this.radius >= this.maxRadius) {
        this.spellCtx.drawImage(document.getElementById(this.anchor.type + "-small"), this.anchor.dx * 27, this.anchor.dy * 27)
      }

      this.otherPieces.forEach(piece => {
        let posX = this.anchor.dx + piece.dx;
        let posY = this.anchor.dy + piece.dy;
        this.spellCtx.beginPath();
        this.spellCtx.arc(posX * 27 + 13, posY * 27 + 13, this.radius, 0, 2* Math.PI);
        this.spellCtx.fillStyle = this.colorByType(piece.type);
        this.spellCtx.fill();
        this.spellCtx.lineWidth = 1;
        this.spellCtx.stroke();
        this.spellCtx.closePath();
        if(this.radius >= this.maxRadius) {
          this.spellCtx.drawImage(document.getElementById(piece.type + "-small"), posX * 27, posY * 27)
        }
      });
    }
  }

  cursorDraw(e, screenCtx) {
    screenCtx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
    screenCtx.beginPath();

    screenCtx.arc(e.clientX - 8, e.clientY - 28, 40, 0, 2 * Math.PI);
    screenCtx.fillStyle = this.colorByType(this.anchor.type);
    screenCtx.fill();
    screenCtx.closePath();
    screenCtx.drawImage(document.getElementById(this.anchor.type), e.clientX-53, e.clientY-73)

    this.otherPieces.forEach(piece => {
      let posX = e.clientX + 90 * piece.dx;
      let posY = e.clientY + 90 * piece.dy;
      screenCtx.beginPath();
      screenCtx.arc(posX - 8, posY - 28, 40, 0, 2 * Math.PI);
      screenCtx.fillStyle =this.colorByType(piece.type);
      screenCtx.fill();
      screenCtx.closePath();
      screenCtx.drawImage(document.getElementById(piece.type), posX - 53, posY - 73)
    });
  }

  colorByType(type) {
    switch (type) {
      case "earth":
        return 'rgba(253,222,51,.75)'
      case "water":
        return'rgba(100,149,237,.75)'
      case "wind":
        return 'rgba(40,160,40,.75)'
      case "fire":
        return 'rgba(219,65,54,.75)'
    }
  }
}

module.exports = Spell;