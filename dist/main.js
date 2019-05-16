/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board-view.js":
/*!***************************!*\
  !*** ./src/board-view.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\")\n\nclass BoardView {\n  constructor(ctx, interactBoard) {\n    this.ctx = ctx;\n    this.interactBoard = interactBoard;\n    this.board = new Board(this.ctx, interactBoard);\n  }\n\n  start() {\n    const refresh = setInterval(() => {\n      this.board.draw(this.ctx);\n    }, 5);\n  }\n}\n\nmodule.exports = BoardView;\n\n//# sourceURL=webpack:///./src/board-view.js?");

/***/ }),

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Piece = __webpack_require__(/*! ./piece.js */ \"./src/piece.js\")\n\nclass Board {\n  constructor(ctx, interactBoard) {\n    this.ctx = ctx;\n    this.interactBoard = interactBoard;\n    this.pieces = {};\n    this.populatePieces();\n    this.setupInteract(interactBoard);\n\n    this.selecting = false;\n    this.selectedPiece = null;\n  }\n  \n  populatePieces() {\n    for (let i = 0; i < 25; i++) {\n      this.pieces[i] = (new Piece(i));\n    }\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, 450, 450);\n    for (let i = 0; i < 25; i++) {\n      this.pieces[i].draw(ctx);\n    }\n  }\n\n  selectPiece(e){\n    this.selecting = true;\n    this.selectedPiece = this.pieces[e.target.dataset.position];\n    this.selectedPiece.selected = true;\n  }\n\n  trySwap(e) {\n    if (this.selecting) {\n      let targetPiece = this.pieces[e.target.dataset.position];\n      if (this.selectedPiece.swap(targetPiece)) {\n        this.pieces[this.selectedPiece.position] = this.selectedPiece;\n        this.pieces[targetPiece.position] = targetPiece;\n      }\n    }\n  }\n\n  deselectPiece() {\n    this.selecting = false;\n    this.selectedPiece.selected = false;\n    this.selectedPiece = null;\n  }\n\n  setupInteract(interactBoard) {\n    document.addEventListener(\"mouseup\", this.deselectPiece.bind(this));\n    for (let i = 0; i < 25; i++) {\n      const piece = document.createElement('div');\n      piece.classList.add('piece');\n      piece.dataset.position = i;\n      piece.addEventListener(\"mousedown\", this.selectPiece.bind(this))\n      piece.addEventListener(\"mouseenter\", this.trySwap.bind(this))\n      interactBoard.appendChild(piece);\n    }\n  }\n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const BoardView = __webpack_require__(/*! ./board-view.js */ \"./src/board-view.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"board-canvas\");\n  const interactBoard = document.getElementById(\"interact-board\");\n  const ctx = canvas.getContext('2d');\n  const boardView = new BoardView(ctx, interactBoard)\n  boardView.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Piece {\n  constructor(position) {\n    this.piece = Piece.randomPiece();\n    this.position = position;\n    this.posX = (position % 5) * 90 + 45;\n    this.posY = Math.floor(position / 5) * 90 + 45\n    this.renderX = this.posX;\n    this.renderY = this.posY;\n    this.selected = false;\n\n    this.swap = this.swap.bind(this);\n  }\n\n  swap(otherPiece) {\n    if(this.canSwap(otherPiece)) {\n      let tempPos = this.position;\n      let tempPosX = this.posX;\n      let tempPosY = this.posY;\n\n      this.position = otherPiece.position;\n      otherPiece.position = tempPos;\n\n      this.posX = otherPiece.posX;\n      otherPiece.posX = tempPosX;\n\n      this.posY = otherPiece.posY\n      otherPiece.posY = tempPosY;\n\n      return true;\n    }\n\n    return false;\n  }\n\n  canSwap(otherPiece) {\n    switch (this.piece) {\n      case \"earth\":\n        break;\n      case \"water\":\n        if (Math.abs(otherPiece.position - this.position) === 5) {\n          return true\n        }\n        break;\n      case \"wind\":\n        if (Math.abs(otherPiece.position - this.position) === 6 || \n          Math.abs(otherPiece.position - this.position) === 4 ) {\n          return true\n        }\n        break;\n      case \"fire\":\n        if (Math.abs(otherPiece.position - this.position) === 1) {\n          return true\n        }\n        break;\n      default:\n        break;\n    }\n\n    switch (otherPiece.piece) {\n      case \"earth\":\n        break;\n      case \"water\":\n        if (Math.abs(otherPiece.position - this.position) === 5) {\n          return true\n        }\n        break;\n      case \"wind\":\n        if (Math.abs(otherPiece.position - this.position) === 6 ||\n          Math.abs(otherPiece.position - this.position) === 4) {\n          return true\n        }\n        break;\n      case \"fire\":\n        if (Math.abs(otherPiece.position - this.position) === 1) {\n          return true\n        }\n        break;\n      default:\n        break;\n    }\n\n    return false;\n  }\n\n  draw(ctx) {\n    if(this.posX !== this.renderX || this.posY !== this.renderY) {\n      this.move();\n    }\n    ctx.beginPath();\n    ctx.arc(this.renderX, this.renderY, 40, 0, 2 * Math.PI)\n\n    switch (this.piece) {\n      case \"earth\":\n        ctx.fillStyle = '#fdde33'\n        break;\n      case \"water\":\n        ctx.fillStyle = '#60d8fb'\n        break;\n      case \"wind\":\n        ctx.fillStyle = '#8146da'\n        break;\n      case \"fire\":\n        ctx.fillStyle = '#c33329'\n        break;\n      default:\n        break;\n    }\n\n    ctx.fill();\n    if(this.selected) {\n      ctx.lineWidth = 2;\n      ctx.stroke();\n    }\n\n    ctx.drawImage(document.getElementById(this.piece), this.renderX - 45, this.renderY - 45)\n  }\n\n  move() {\n    if(this.renderPosition !== this.position) {\n      if(this.renderX - this.posX < -5) {\n        this.renderX += 5;\n      } else if (this.renderX - this.posX > 5) {\n        this.renderX -= 5;\n      } else {\n        this.renderX = this.posX;\n      }\n\n      if (this.renderY - this.posY < -5) {\n        this.renderY += 5;\n      } else if (this.renderY - this.posY > 5) {\n        this.renderY -= 5;\n      } else {\n        this.renderY = this.posY;\n      }\n    }\n\n  }\n\n  static randomPiece() {\n    const randomNumber = Math.floor(Math.random() * 4) + 1\n\n    switch (randomNumber) {\n      case 1:\n        return \"earth\"\n      case 2:\n        return \"water\"\n      case 3:\n        return \"wind\"\n      case 4:\n        return \"fire\"\n      default:\n        break;\n    }\n  }\n}\n\nmodule.exports = Piece;\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ })

/******/ });