const Board = require('./board.js')
const Sounds = require('./sounds.js')

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("mouseover", e => {
    e.preventDefault();
  })
  const screen = document.getElementById("screen");
  screen.width = document.body.clientWidth;
  screen.height = document.body.clientHeight;
  const screenCtx = screen.getContext('2d');

  const canvas = document.getElementById("board-canvas");
  const interactBoard = document.getElementById("interact-board");
  const grimoire = document.getElementById("grimoire");
  const boardCtx = canvas.getContext('2d');
  const sounds = new Sounds();
  let board = new Board(boardCtx, screenCtx, interactBoard, grimoire, sounds);
  board.start();

  document.getElementById("restart").addEventListener('click', () => {
    board.stop();
    board = new Board(boardCtx, screenCtx, interactBoard, grimoire, sounds);
    board.start();
    sounds.gameState = 'normal'
    if (!sounds.muted) {
      sounds.victory.pause();
      sounds.song.load();
      sounds.song.play();
    }
  })
});