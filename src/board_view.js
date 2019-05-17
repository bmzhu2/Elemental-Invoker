const Board = require('./board')

class BoardView {
  constructor(boardCtx, screenCtx, interactBoard, grimoire) {
    this.boardCtx = boardCtx;
    this.screenCtx = screenCtx;
    this.interactBoard = interactBoard;
    this.grimoire = grimoire;
    this.board = new Board(boardCtx, screenCtx, interactBoard, grimoire);
  }

  
}

module.exports = BoardView;