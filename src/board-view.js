const Board = require('./board')

class BoardView {
  constructor(ctx, interactBoard) {
    this.ctx = ctx;
    this.interactBoard = interactBoard;
    this.board = new Board(this.ctx, interactBoard);
  }

  start() {
    const refresh = setInterval(() => {
      this.board.draw(this.ctx);
    }, 5);
  }
}

module.exports = BoardView;