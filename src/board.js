const Piece = require('./piece.js')

class Board {
  constructor(ctx, interactBoard) {
    this.ctx = ctx;
    this.interactBoard = interactBoard;
    this.pieces = {};
    this.populatePieces();
    this.setupInteract(interactBoard);

    this.selecting = false;
    this.selectedPiece = null;
  }
  
  populatePieces() {
    for (let i = 0; i < 25; i++) {
      this.pieces[i] = (new Piece(i));
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 450, 450);
    for (let i = 0; i < 25; i++) {
      this.pieces[i].draw(ctx);
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

  deselectPiece() {
    this.selecting = false;
    this.selectedPiece.selected = false;
    this.selectedPiece = null;
  }

  setupInteract(interactBoard) {
    document.addEventListener("mouseup", this.deselectPiece.bind(this));
    for (let i = 0; i < 25; i++) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.dataset.position = i;
      piece.addEventListener("mousedown", this.selectPiece.bind(this))
      piece.addEventListener("mouseenter", this.trySwap.bind(this))
      interactBoard.appendChild(piece);
    }
  }
}

module.exports = Board;