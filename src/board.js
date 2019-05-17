const Piece = require('./piece.js')
const Grimoire = require('./grimoire.js')

class Board {
  constructor(boardCtx, screenCtx, interactBoard, grimoire) {
    this.boardCtx = boardCtx;
    this.screen = document.getElementById("screen");
    this.screen.addEventListener("mousemove", this.cursorDraw.bind(this))
    this.screenCtx = screenCtx;
    this.interactBoard = interactBoard;
    this.grimoire = grimoire;
    this.pieces = {};
    this.populatePieces();
    this.spells = {};
    this.spells = Grimoire.initialize(this.spells);
    this.setupInteract(interactBoard);
    this.displaySpells();

    this.selecting = false;
    this.selectedPiece = null;
    this.selectingSpell = false;
    this.selectedSpell = null;
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
    this.selecting = true;
    this.selectedPiece = this.pieces[e.target.dataset.position];
    this.selectedPiece.selected = true;
  }

  trySwap(e) {
    if (this.selecting) {
      let targetPiece = this.pieces[e.target.dataset.position];
      if (this.selectedPiece.swap(targetPiece)) {
        this.pieces[this.selectedPiece.position] = this.selectedPiece;
        this.pieces[targetPiece.position] = targetPiece;
      }
    }
  }

  deselect(e) {
    this.selecting = false;
    if(this.selectedPiece) {
      this.selectedPiece.selected = false;
    }
    this.selectedPiece = null;
    this.selectingSpell = false;
    if(this.selectedSpell) {
      this.selectedSpell.selected = false;
      this.screen.classList.remove("show");
    }
    this.selectedSpell = null;
    this.screenCtx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);
  }

  dropOffSpell(e) {
    debugger;
  }

  selectSpell(e) {
    this.selectingSpell = true;
    this.selectedSpell = this.spells[e.target.dataset.slot];
    this.selectedSpell.selected = true;
    this.screen.classList.add("show");
  }

  setupInteract(interactBoard) {
    document.addEventListener("mouseup", this.deselect.bind(this));
    for (let i = 0; i < 25; i++) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.dataset.position = i;
      piece.addEventListener("mousedown", this.selectPiece.bind(this))
      piece.addEventListener("mouseenter", this.trySwap.bind(this))
      piece.addEventListener("mouseup", this.dropOffSpell.bind(this))
      interactBoard.appendChild(piece);
    }
  }

  displaySpells() {
    let page1 = document.getElementById("page-one");
    let page2 = document.getElementById("page-two");

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