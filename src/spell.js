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

  static random(cost, otherSpell) {
    let randomNum;
    switch (cost) {
      case 3:
        randomNum = Math.floor(Math.random() * 3) + 1; 
        while ((otherSpell && (SpellList.threeCost[randomNum].name === otherSpell.name))) {
                  randomNum = Math.floor(Math.random() * 3) + 1;
                }
        return SpellList.threeCost[randomNum]
      case 4:
        randomNum = Math.floor(Math.random() * 2) + 1;
        while (otherSpell && (SpellList.fourCost[randomNum].name === otherSpell.name)) {
          randomNum = Math.floor(Math.random() * 2) + 1;
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
      switch (this.anchor.type) {
        case "earth":
          this.spellCtx.fillStyle = '#fdde33'
          break;
        case "water":
          this.spellCtx.fillStyle = 'cornflowerblue'
          break;
        case "wind":
          this.spellCtx.fillStyle = '#28a028'
          break;
        case "fire":
          this.spellCtx.fillStyle = '#db4136'
          break;
      }
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
        switch (piece.type) {
          case "earth":
            this.spellCtx.fillStyle = '#fdde33'
            break;
          case "water":
            this.spellCtx.fillStyle = 'cornflowerblue'
            break;
          case "wind":
            this.spellCtx.fillStyle = '#28a028'
            break;
          case "fire":
            this.spellCtx.fillStyle = '#db4136'
            break;
        }
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
    switch (this.anchor.type) {
      case "earth":
        screenCtx.fillStyle = 'rgba(253,222,51,.75)'
        break;
      case "water":
        screenCtx.fillStyle = 'rgba(100,149,237,.75)'
        break;
      case "wind":
        screenCtx.fillStyle = 'rgba(40,160,40,.75)'
        break;
      case "fire":
        screenCtx.fillStyle = 'rgba(219,65,54,.75)'
        break;
    }
    screenCtx.fill();
    screenCtx.closePath();
    screenCtx.drawImage(document.getElementById(this.anchor.type), e.clientX-53, e.clientY-73)

    this.otherPieces.forEach(piece => {
      let posX = e.clientX + 90 * piece.dx;
      let posY = e.clientY + 90 * piece.dy;
      screenCtx.beginPath();
      screenCtx.arc(posX - 8, posY - 28, 40, 0, 2 * Math.PI);
      switch (piece.type) {
        case "earth":
          screenCtx.fillStyle = 'rgba(253,222,51,.75)'
          break;
        case "water":
          screenCtx.fillStyle = 'rgba(100,149,237,.75)'
          break;
        case "wind":
          screenCtx.fillStyle = 'rgba(40,160,40,.75)'
          break;
        case "fire":
          screenCtx.fillStyle = 'rgba(219,65,54,.75)'
          break;
      }
      screenCtx.fill();
      screenCtx.closePath();
      screenCtx.drawImage(document.getElementById(piece.type), posX - 53, posY - 73)
    });
  }
}

module.exports = Spell;