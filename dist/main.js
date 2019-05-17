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

eval("const Board = __webpack_require__(/*! ./board */ \"./src/board.js\")\n\nclass BoardView {\n  constructor(boardCtx, screenCtx, interactBoard, grimoire) {\n    this.boardCtx = boardCtx;\n    this.screenCtx = screenCtx;\n    this.interactBoard = interactBoard;\n    this.grimoire = grimoire;\n    this.board = new Board(boardCtx, screenCtx, interactBoard, grimoire);\n  }\n\n  start() {\n    const refresh = setInterval(() => {\n      this.board.draw();\n    }, 5);\n  }\n}\n\nmodule.exports = BoardView;\n\n//# sourceURL=webpack:///./src/board-view.js?");

/***/ }),

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Piece = __webpack_require__(/*! ./piece.js */ \"./src/piece.js\")\nconst Grimoire = __webpack_require__(/*! ./grimoire.js */ \"./src/grimoire.js\")\n\nclass Board {\n  constructor(boardCtx, screenCtx, interactBoard, grimoire) {\n    this.boardCtx = boardCtx;\n    this.screen = document.getElementById(\"screen\");\n    this.screen.addEventListener(\"mousemove\", this.cursorDraw.bind(this))\n    this.screenCtx = screenCtx;\n    this.interactBoard = interactBoard;\n    this.grimoire = grimoire;\n    this.pieces = {};\n    this.populatePieces();\n    this.spells = {};\n    this.spells = Grimoire.initialize(this.spells);\n    this.setupInteract(interactBoard);\n    this.displaySpells();\n\n    this.selecting = false;\n    this.selectedPiece = null;\n    this.selectingSpell = false;\n    this.selectedSpell = null;\n  }\n  \n  populatePieces() {\n    for (let i = 0; i < 25; i++) {\n      this.pieces[i] = (new Piece(i));\n    }\n  }\n\n  draw() {\n    this.boardCtx.clearRect(0, 0, 450, 450);\n    for (let i = 0; i < 25; i++) {\n      this.pieces[i].draw(this.boardCtx);\n    }\n    for (let i = 0; i < 6; i++) {\n      this.spells[i].draw(this.screenCtx);\n    }\n  }\n\n  cursorDraw(e) {\n    if(this.selectingSpell) {\n      this.selectedSpell.cursorDraw(e, this.screenCtx)\n    }\n  }\n\n  selectPiece(e){\n    this.selecting = true;\n    this.selectedPiece = this.pieces[e.target.dataset.position];\n    this.selectedPiece.selected = true;\n  }\n\n  trySwap(e) {\n    if (this.selecting) {\n      let targetPiece = this.pieces[e.target.dataset.position];\n      if (this.selectedPiece.swap(targetPiece)) {\n        this.pieces[this.selectedPiece.position] = this.selectedPiece;\n        this.pieces[targetPiece.position] = targetPiece;\n      }\n    }\n  }\n\n  deselect(e) {\n    this.selecting = false;\n    if(this.selectedPiece) {\n      this.selectedPiece.selected = false;\n    }\n    this.selectedPiece = null;\n    this.selectingSpell = false;\n    if(this.selectedSpell) {\n      this.selectedSpell.selected = false;\n      this.screen.classList.remove(\"show\");\n    }\n    this.selectedSpell = null;\n    this.screenCtx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);\n  }\n\n  dropOffSpell(e) {\n    debugger;\n  }\n\n  selectSpell(e) {\n    this.selectingSpell = true;\n    this.selectedSpell = this.spells[e.target.dataset.slot];\n    this.selectedSpell.selected = true;\n    this.screen.classList.add(\"show\");\n  }\n\n  setupInteract(interactBoard) {\n    document.addEventListener(\"mouseup\", this.deselect.bind(this));\n    for (let i = 0; i < 25; i++) {\n      const piece = document.createElement('div');\n      piece.classList.add('piece');\n      piece.dataset.position = i;\n      piece.addEventListener(\"mousedown\", this.selectPiece.bind(this))\n      piece.addEventListener(\"mouseenter\", this.trySwap.bind(this))\n      piece.addEventListener(\"mouseup\", this.dropOffSpell.bind(this))\n      interactBoard.appendChild(piece);\n    }\n  }\n\n  displaySpells() {\n    let page1 = document.getElementById(\"page-one\");\n    let page2 = document.getElementById(\"page-two\");\n\n    for (let i = 0; i < 6; i++) {\n      const spellCanvas = document.createElement('canvas');\n      spellCanvas.width = \"112\";\n      spellCanvas.height = \"112\";\n      spellCanvas.classList.add('spell');\n      spellCanvas.dataset.slot = i;\n      spellCanvas.addEventListener(\"mousedown\", this.selectSpell.bind(this))\n      const spellCtx = spellCanvas.getContext('2d');\n      this.spells[i].spellCtx = spellCtx;\n\n      const spellName = document.createElement('div');\n      spellName.classList.add(\"spell-name\");\n      spellName.innerHTML = this.spells[i].name;\n\n      if(i < 3) {\n        page1.appendChild(spellCanvas);\n        page1.appendChild(spellName);\n      } else {\n        page2.appendChild(spellCanvas);\n        page2.appendChild(spellName);\n      }\n    }\n  }\n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/grimoire.js":
/*!*************************!*\
  !*** ./src/grimoire.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Spell = __webpack_require__(/*! ./spell.js */ \"./src/spell.js\");\n\nclass Grimoire {\n\n  static initialize(spells) {\n    let newSpells = spells;\n    for (let i = 0; i < 6; i++) {\n      if(!spells[i]) {\n        switch (i) {\n          case 0:\n            newSpells[0] = new Spell(0, Spell.random(3))\n            break;\n          case 1:\n            newSpells[1] = new Spell(1, Spell.random(3, newSpells[0]))\n            break;\n          case 2:\n            newSpells[2] = new Spell(2, Spell.random(3, newSpells[0], newSpells[1]))\n            break;\n          case 3:\n            newSpells[3] = new Spell(3, Spell.random(4))\n            break;\n          case 4:\n            newSpells[4] = new Spell(4, Spell.random(4, newSpells[3]))\n            break;\n          case 5:\n            newSpells[5] = new Spell(5, Spell.random(5))\n        }\n      }\n      \n    }\n\n    return newSpells;\n  }\n\n}\n\nmodule.exports = Grimoire;\n\n//# sourceURL=webpack:///./src/grimoire.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const BoardView = __webpack_require__(/*! ./board-view.js */ \"./src/board-view.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  document.addEventListener(\"mouseover\", e => {\n    e.preventDefault();\n  })\n  const screen = document.getElementById(\"screen\");\n  screen.width = document.body.clientWidth;\n  screen.height = document.body.clientHeight;\n  const screenCtx = screen.getContext('2d');\n\n  const canvas = document.getElementById(\"board-canvas\");\n  const interactBoard = document.getElementById(\"interact-board\");\n  const grimoire = document.getElementById(\"grimoire\");\n  const boardCtx = canvas.getContext('2d');\n  const boardView = new BoardView(boardCtx, screenCtx, interactBoard, grimoire)\n  boardView.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Piece {\n  constructor(position) {\n    this.piece = Piece.randomPiece();\n    this.position = position;\n    this.posX = (position % 5) * 90 + 45;\n    this.posY = Math.floor(position / 5) * 90 + 45\n    this.renderX = this.posX;\n    this.renderY = this.posY;\n    this.selected = false;\n    this.radius = 0;\n    this.fullRadius = 40;\n\n    this.swap = this.swap.bind(this);\n  }\n\n  swap(otherPiece) {\n    if(this.canSwap(otherPiece)) {\n      let tempPos = this.position;\n      let tempPosX = this.posX;\n      let tempPosY = this.posY;\n\n      this.position = otherPiece.position;\n      otherPiece.position = tempPos;\n\n      this.posX = otherPiece.posX;\n      otherPiece.posX = tempPosX;\n\n      this.posY = otherPiece.posY\n      otherPiece.posY = tempPosY;\n\n      return true;\n    }\n\n    return false;\n  }\n\n  canSwap(otherPiece) {\n    switch (this.piece) {\n      case \"earth\":\n        break;\n      case \"water\":\n        if (Math.abs(otherPiece.position - this.position) === 5) {\n          return true\n        }\n        break;\n      case \"wind\":\n        if (Math.abs(otherPiece.position - this.position) === 6 || \n          Math.abs(otherPiece.position - this.position) === 4 ) {\n          if (!(this.position % 5 === 4 && otherPiece.position % 5 === 0)\n            && !(this.position % 5 === 0 && otherPiece.position % 5 === 4)) {\n            return true\n          }\n        }\n        break;\n      case \"fire\":\n        if (Math.abs(otherPiece.position - this.position) === 1) {\n          if(!(this.position % 5 === 4 && otherPiece.position % 5 === 0)\n            && !(this.position % 5 === 0 && otherPiece.position % 5 === 4)) {\n              return true\n            }\n        }\n        break;\n      default:\n        break;\n    }\n\n    switch (otherPiece.piece) {\n      case \"earth\":\n        break;\n      case \"water\":\n        if (Math.abs(otherPiece.position - this.position) === 5) {\n          return true\n        }\n        break;\n      case \"wind\":\n        if (Math.abs(otherPiece.position - this.position) === 6 ||\n          Math.abs(otherPiece.position - this.position) === 4) {\n          if (!(otherPiece.position % 5 === 4 && this.position % 5 === 0)\n            && !(otherPiece.position % 5 === 0 && this.position % 5 === 4)) {\n            return true\n          }\n        }\n        break;\n      case \"fire\":\n        if (Math.abs(otherPiece.position - this.position) === 1) {\n          if (!(otherPiece.position % 5 === 4 && this.position % 5 === 0)\n            && !(otherPiece.position % 5 === 0 && this.position % 5 === 4)) {\n            return true\n          }\n        }\n        break;\n      default:\n        break;\n    }\n\n    return false;\n  }\n\n  draw(ctx) {\n    if(this.posX !== this.renderX || this.posY !== this.renderY) {\n      this.move();\n    }\n    if(this.radius < this.fullRadius) {\n      this.radius += 1;\n    }\n\n    ctx.beginPath();\n    \n    ctx.arc(this.renderX, this.renderY, this.radius, 0, 2 * Math.PI)\n\n    switch (this.piece) {\n      case \"earth\":\n        ctx.fillStyle = '#fdde33'\n        break;\n      case \"water\":\n        // ctx.fillStyle = '#60d8fb'\n        ctx.fillStyle= 'cornflowerblue'\n        break;\n      case \"wind\":\n        // ctx.fillStyle = '#8146da'\n        ctx.fillStyle = '#28a028'\n        break;\n      case \"fire\":\n        ctx.fillStyle = '#db4136'\n        break;\n    }\n\n    ctx.fill();\n    if(this.selected) {\n      ctx.lineWidth = 2;\n      ctx.stroke();\n    }\n\n    if(this.radius === this.fullRadius) {\n      ctx.drawImage(document.getElementById(this.piece), this.renderX - 45, this.renderY - 45)\n    }\n  }\n\n  move() {\n    if(this.renderPosition !== this.position) {\n      if(this.renderX - this.posX < -5) {\n        this.renderX += 5;\n      } else if (this.renderX - this.posX > 5) {\n        this.renderX -= 5;\n      } else {\n        this.renderX = this.posX;\n      }\n\n      if (this.renderY - this.posY < -5) {\n        this.renderY += 5;\n      } else if (this.renderY - this.posY > 5) {\n        this.renderY -= 5;\n      } else {\n        this.renderY = this.posY;\n      }\n    }\n\n  }\n\n  static randomPiece() {\n    const randomNumber = Math.floor(Math.random() * 4) + 1\n\n    switch (randomNumber) {\n      case 1:\n        return \"earth\"\n      case 2:\n        return \"water\"\n      case 3:\n        return \"wind\"\n      case 4:\n        return \"fire\"\n      default:\n        break;\n    }\n  }\n}\n\nmodule.exports = Piece;\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ }),

/***/ "./src/spell.js":
/*!**********************!*\
  !*** ./src/spell.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Spell {\n  constructor(slot, spellInfo) {\n    this.slot = slot;\n    this.name = spellInfo.name;\n    this.anchor = spellInfo.anchor;\n    this.otherPieces = spellInfo.otherPieces;\n    this.selected = false;\n    this.radius = 0;\n    this.maxRadius = 11;\n  }\n\n  static random(cost, otherSpell1, otherSpell2) {\n    let randomNum;\n    switch (cost) {\n      case 3:\n        randomNum = Math.floor(Math.random() * 3) + 1; \n        while ((otherSpell1 && (threeCost[randomNum].name === otherSpell1.name)) || \n                (otherSpell2 && (threeCost[randomNum].name === otherSpell2.name ))) {\n                  randomNum = Math.floor(Math.random() * 3) + 1;\n                }\n        return threeCost[randomNum]\n      case 4:\n        randomNum = Math.floor(Math.random() * 2) + 1;\n        while (otherSpell1 && (fourCost[randomNum].name === otherSpell1.name)) {\n          randomNum = Math.floor(Math.random() * 2) + 1;\n        }\n        return fourCost[randomNum]\n      case 5:\n        return fiveCost[Math.floor(Math.random() * 1) + 1]\n    }\n  }\n\n  draw() {\n    this.spellCtx.clearRect(0, 0, 112, 112);\n    if(this.radius < this.maxRadius) {\n      this.radius += .25;\n    }\n\n    if(!this.selected) {\n      this.spellCtx.beginPath();\n\n      this.spellCtx.arc(this.anchor.dx * 27 + 13, this.anchor.dy * 27 + 13, this.radius, 0, 2 * Math.PI);\n      switch (this.anchor.type) {\n        case \"earth\":\n          this.spellCtx.fillStyle = '#fdde33'\n          break;\n        case \"water\":\n          this.spellCtx.fillStyle = 'cornflowerblue'\n          break;\n        case \"wind\":\n          this.spellCtx.fillStyle = '#28a028'\n          break;\n        case \"fire\":\n          this.spellCtx.fillStyle = '#db4136'\n          break;\n      }\n      this.spellCtx.fill();\n      this.spellCtx.lineWidth = 1;\n      this.spellCtx.stroke();\n      this.spellCtx.closePath();\n      if(this.radius >= this.maxRadius) {\n        this.spellCtx.drawImage(document.getElementById(this.anchor.type + \"-small\"), this.anchor.dx * 27, this.anchor.dy * 27)\n      }\n\n      this.otherPieces.forEach(piece => {\n        let posX = this.anchor.dx + piece.dx;\n        let posY = this.anchor.dy + piece.dy;\n        this.spellCtx.beginPath();\n        this.spellCtx.arc(posX * 27 + 13, posY * 27 + 13, this.radius, 0, 2* Math.PI);\n        switch (piece.type) {\n          case \"earth\":\n            this.spellCtx.fillStyle = '#fdde33'\n            break;\n          case \"water\":\n            this.spellCtx.fillStyle = 'cornflowerblue'\n            break;\n          case \"wind\":\n            this.spellCtx.fillStyle = '#28a028'\n            break;\n          case \"fire\":\n            this.spellCtx.fillStyle = '#db4136'\n            break;\n        }\n        this.spellCtx.fill();\n        this.spellCtx.lineWidth = 1;\n        this.spellCtx.stroke();\n        this.spellCtx.closePath();\n        if(this.radius >= this.maxRadius) {\n          this.spellCtx.drawImage(document.getElementById(piece.type + \"-small\"), posX * 27, posY * 27)\n        }\n      });\n    }\n  }\n\n  cursorDraw(e, screenCtx) {\n    screenCtx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);\n    screenCtx.beginPath();\n\n    screenCtx.arc(e.clientX - 8, e.clientY - 28, 40, 0, 2 * Math.PI);\n    switch (this.anchor.type) {\n      case \"earth\":\n        screenCtx.fillStyle = 'rgba(253,222,51,.75)'\n        break;\n      case \"water\":\n        screenCtx.fillStyle = 'rgba(100,149,237,.75)'\n        break;\n      case \"wind\":\n        screenCtx.fillStyle = 'rgba(40,160,40,.75)'\n        break;\n      case \"fire\":\n        screenCtx.fillStyle = 'rgba(219,65,54,.75)'\n        break;\n    }\n    screenCtx.fill();\n    screenCtx.closePath();\n    screenCtx.drawImage(document.getElementById(this.anchor.type), e.clientX-53, e.clientY-73)\n\n    this.otherPieces.forEach(piece => {\n      let posX = e.clientX + 90 * piece.dx;\n      let posY = e.clientY + 90 * piece.dy;\n      screenCtx.beginPath();\n      screenCtx.arc(posX - 8, posY - 28, 40, 0, 2 * Math.PI);\n      switch (piece.type) {\n        case \"earth\":\n          screenCtx.fillStyle = 'rgba(253,222,51,.75)'\n          break;\n        case \"water\":\n          screenCtx.fillStyle = 'rgba(100,149,237,.75)'\n          break;\n        case \"wind\":\n          screenCtx.fillStyle = 'rgba(40,160,40,.75)'\n          break;\n        case \"fire\":\n          screenCtx.fillStyle = 'rgba(219,65,54,.75)'\n          break;\n      }\n      screenCtx.fill();\n      screenCtx.closePath();\n      screenCtx.drawImage(document.getElementById(piece.type), posX - 53, posY - 73)\n    });\n  }\n}\n\nconst threeCost = {\n  1: {\n    name: 'Inferno',\n    anchor: {type: 'fire', dx: 2, dy: 1},\n    otherPieces: [\n      {type: 'fire', dx: -1, dy: 0},\n      {type: 'fire', dx: 1, dy: 0}\n    ]\n  },\n  2: {\n    name: 'Magma Storm',\n    anchor: {type: 'water', dx: 2, dy: 1},\n    otherPieces: [\n      {type: 'fire', dx: -1, dy: 0},\n      {type: 'fire', dx: 0, dy: 1}\n    ]\n  },\n  3: {\n    name: 'Mad Growth',\n    anchor: {type: 'water', dx: 2, dy: 1},\n    otherPieces: [\n      {type: 'wind', dx: 0, dy: -1},\n      {type: 'earth', dx: 0, dy: 1}\n    ]\n\n  }\n}\n\nconst fourCost = {\n  1: {\n    name: 'Tempest',\n    anchor: {type: 'water', dx: 2, dy: 1},\n    otherPieces: [\n      {type: 'wind', dx: 0, dy: -1},\n      {type: 'wind', dx: 0, dy: 1},\n      {type: 'water', dx: 0, dy: 2}\n    ]\n  },\n  2: {\n    name: 'Mother Gaia',\n    anchor: {type: 'earth', dx: 1, dy: 1},\n    otherPieces: [\n      {type: 'earth', dx: 1, dy: 0},\n      {type: 'earth', dx: 0, dy: 1},\n      {type: 'earth', dx: 1, dy: 1},\n    ]\n  }\n}\n\nconst fiveCost = {\n  1: {\n    name: 'Planetary',\n    anchor: {type: 'fire', dx: 2, dy: 3},\n    otherPieces: [\n      {type: 'fire', dx: -1, dy: 0},\n      {type: 'fire', dx: 1, dy: 0},\n      {type: 'wind', dx: 0, dy: -1},\n      {type: 'wind', dx: 0, dy: -2}\n    ]\n  }\n}\n\nmodule.exports = Spell;\n\n//# sourceURL=webpack:///./src/spell.js?");

/***/ })

/******/ });