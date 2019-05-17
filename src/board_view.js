const Board = require('./board')

class BoardView {
  constructor(boardCtx, screenCtx, interactBoard, grimoire) {
    this.boardCtx = boardCtx;
    this.screenCtx = screenCtx;
    this.interactBoard = interactBoard;
    this.grimoire = grimoire;
    this.board = new Board(boardCtx, screenCtx, interactBoard, grimoire);
  }

  start() {
    const refresh = setInterval(() => {
      this.board.draw();
    }, 5);
  }
}

module.exports = BoardView;