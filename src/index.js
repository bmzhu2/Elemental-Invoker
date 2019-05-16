const BoardView = require('./board-view.js')

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("board-canvas");
  const interactBoard = document.getElementById("interact-board");
  const ctx = canvas.getContext('2d');
  const boardView = new BoardView(ctx, interactBoard)
  boardView.start();
});