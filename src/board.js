const Piece = require('./piece.js')
const Grimoire = require('./grimoire.js')
const Score = require('./score.js')
const Timer = require('./timer.js')

class Board {
  constructor(boardCtx, screenCtx, interactBoard, grimoire, sounds) {
    this.boardCtx = boardCtx;
    this.screen = document.getElementById("screen");
    this.cursorDraw = this.cursorDraw.bind(this);
    this.deselect = this.deselect.bind(this);
    this.screen.addEventListener("mousemove", this.cursorDraw);
    this.screenCtx = screenCtx;
    this.interactBoard = interactBoard;
    this.grimoire = grimoire;
    this.pieces = {};
    this.neighbors = [];
    this.populatePieces();
    this.spells = {};
    this.spells = Grimoire.initialize(this.spells);
    this.setupInteract(interactBoard);
    this.displaySpells();

    this.score = new Score;
    this.gameState = "normal";
    this.timer = new Timer;
    this.sounds = sounds;

    this.selecting = false;
    this.selectedPiece = null;
    this.selectingSpell = false;
    this.selectedSpell = null;
  }

  start() {
    this.render = setInterval(() => {
      this.draw();
    }, 5);
  }

  stop() {
    clearInterval(this.render);
    this.screen.removeEventListener("mousemove", this.cursorDraw, false)
    document.removeEventListener("mouseup", this.deselect, false);
    document.removeEventListener("click", this.deselect, false);
  }

  end() {
    this.gameState = 'over';
    this.score.gameOver();
    clearInterval(this.render);
    this.sounds.gameState = 'over'
    if(!this.sounds.muted) {
      this.sounds.song.pause();
      this.sounds.victory.play();
    }
  }
  
  populatePieces() {
    for (let i = 0; i < 25; i++) {
      this.pieces[i] = (new Piece(i));
    }
  }

  draw() {
    this.boardCtx.clearRect(0, 0, 450, 450);
    for (let i = 0; i < 25; i++) {
      this.pieces[i].draw(this.boardCtx);
    }
    for (let i = 0; i < 6; i++) {
      this.spells[i].draw(this.screenCtx);
    }
  }

  cursorDraw(e) {
    if(this.selectingSpell) {
      this.selectedSpell.cursorDraw(e, this.screenCtx)
    }
  }

  selectPiece(e){
    if(this.gameState === "normal") {
      this.selecting = true;
      this.selectedPiece = this.pieces[e.target.dataset.position];
      this.selectedPiece.selected = true;

      this.neighbors = this.selectedPiece.getValidNeighbors(this.pieces);
      this.neighbors.forEach(position => {
        this.pieces[position].neighbor = true;
      })
    }
  }

  trySwap(e) {
    if (this.selecting) {
      let targetPiece = this.pieces[e.target.dataset.position];
      if (this.selectedPiece.swap(targetPiece)) {
        this.pieces[this.selectedPiece.position] = this.selectedPiece;
        this.pieces[targetPiece.position] = targetPiece;
        this.score.resetCombo();
        this.neighbors.forEach(position => {
          this.pieces[position].neighbor = false;
        })
        this.neighbors = this.selectedPiece.getValidNeighbors(this.pieces);
        this.neighbors.forEach(position => {
          this.pieces[position].neighbor = true;
        })
      }
    }
  }

  deselect(e) {
    this.selecting = false;
    if(this.selectedPiece) {
      this.selectedPiece.selected = false;
      this.neighbors.forEach(position => {
        this.pieces[position].neighbor = false;
      })
      this.neighbors = []
    }
    this.selectedPiece = null;
    this.screenCtx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
    if(this.selectingSpell) {
      if(e.type === "click" && e.target.tagName !== "BODY") {
        this.selectingSpell = false;
        this.selectedSpell.selected = false;
        this.selectedSpell = null;
      }

      this.screen.classList.remove("show");
      setTimeout(() => document.elementFromPoint(e.clientX, e.clientY).click(), 0);
    }
    if(e.target.tagName === "BUTTON") {
      setTimeout(() => document.elementFromPoint(e.clientX, e.clientY).click(), 0);
    }
  }

  dropOffSpell(e) {
    if(this.selectingSpell) {
      let result = this.selectedSpell.cast(+e.target.dataset.position, this.pieces)

      if(result) {
        this.selectedSpell.newSpell(this.spells);
        if(Math.floor(this.selectedSpell.slot / 3) === 0) {
          Array.from(document.getElementById("page-one").children)[this.selectedSpell.slot * 2 + 1]
            .innerHTML = this.selectedSpell.name
        } else {
          Array.from(document.getElementById("page-two").children)[(this.selectedSpell.slot - 3) * 2 + 1]
            .innerHTML = this.selectedSpell.name
        }
        result.forEach(position => {
          this.pieces[position].newPiece();
        });

        this.score.incrementCombo();
        this.score.addScore(this.selectedSpell.slot % 3 + 3);
        if (this.score.total === this.score.maxSpells) {
          this.gameState = 'bonus';
          this.timer.setTimer(this.end.bind(this), 15000);
        }
        
        if(!this.sounds.muted) {
          this.sounds.sfx.play()
        }
      }

      this.selectingSpell = false;
      this.selectedSpell.selected = false;
      this.selectedSpell = null;
    }
  }

  selectSpell(e) {
    if(this.gameState != 'over') {
      this.selectingSpell = true;
      this.selectedSpell = this.spells[e.target.dataset.slot];
      this.selectedSpell.selected = true;
      this.screen.classList.add("show");
      this.cursorDraw(e);
    }
  }

  setupInteract(interactBoard) {
    document.addEventListener("mouseup", this.deselect);
    document.addEventListener("click", this.deselect);
    while (interactBoard.firstChild) {
      interactBoard.removeChild(interactBoard.firstChild)
    }
    for (let i = 0; i < 25; i++) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.dataset.position = i;
      piece.addEventListener("mousedown", this.selectPiece.bind(this))
      piece.addEventListener("mouseenter", this.trySwap.bind(this))
      piece.addEventListener("click", this.dropOffSpell.bind(this))
      interactBoard.appendChild(piece);
    }
  }

  displaySpells() {
    let page1 = document.getElementById("page-one");
    let page2 = document.getElementById("page-two");
    while (page1.firstChild) {
      page1.removeChild(page1.firstChild)
    }
    while (page2.firstChild) {
      page2.removeChild(page2.firstChild)
    }

    for (let i = 0; i < 6; i++) {
      const spellCanvas = document.createElement('canvas');
      spellCanvas.width = "112";
      spellCanvas.height = "112";
      spellCanvas.classList.add('spell');
      spellCanvas.dataset.slot = i;
      spellCanvas.addEventListener("mousedown", this.selectSpell.bind(this))
      const spellCtx = spellCanvas.getContext('2d');
      this.spells[i].spellCtx = spellCtx;

      const spellName = document.createElement('div');
      spellName.classList.add("spell-name");
      spellName.innerHTML = this.spells[i].name;

      if(i < 3) {
        page1.appendChild(spellCanvas);
        page1.appendChild(spellName);
      } else {
        page2.appendChild(spellCanvas);
        page2.appendChild(spellName);
      }
    }
  }
}

module.exports = Board;