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

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Piece = __webpack_require__(/*! ./piece.js */ \"./src/piece.js\")\nconst Grimoire = __webpack_require__(/*! ./grimoire.js */ \"./src/grimoire.js\")\nconst Score = __webpack_require__(/*! ./score.js */ \"./src/score.js\")\n\nclass Board {\n  constructor(boardCtx, screenCtx, interactBoard, grimoire) {\n    this.boardCtx = boardCtx;\n    this.screen = document.getElementById(\"screen\");\n    this.screen.addEventListener(\"mousemove\", this.cursorDraw.bind(this))\n    this.screenCtx = screenCtx;\n    this.interactBoard = interactBoard;\n    this.grimoire = grimoire;\n    this.pieces = {};\n    this.populatePieces();\n    this.spells = {};\n    this.spells = Grimoire.initialize(this.spells);\n    this.setupInteract(interactBoard);\n    this.displaySpells();\n\n    this.score = new Score;\n    this.gameState = \"normal\";\n\n    this.selecting = false;\n    this.selectedPiece = null;\n    this.selectingSpell = false;\n    this.selectedSpell = null;\n  }\n\n  start() {\n    this.render = setInterval(() => {\n      this.draw();\n    }, 5);\n  }\n\n  end() {\n    this.gameState = 'over';\n    this.score.gameOver();\n    clearInterval(this.render);\n  }\n  \n  populatePieces() {\n    for (let i = 0; i < 25; i++) {\n      this.pieces[i] = (new Piece(i));\n    }\n  }\n\n  draw() {\n    this.boardCtx.clearRect(0, 0, 450, 450);\n    for (let i = 0; i < 25; i++) {\n      this.pieces[i].draw(this.boardCtx);\n    }\n    for (let i = 0; i < 6; i++) {\n      this.spells[i].draw(this.screenCtx);\n    }\n  }\n\n  cursorDraw(e) {\n    if(this.selectingSpell) {\n      this.selectedSpell.cursorDraw(e, this.screenCtx)\n    }\n  }\n\n  selectPiece(e){\n    if(this.gameState === \"normal\") {\n      this.selecting = true;\n      this.selectedPiece = this.pieces[e.target.dataset.position];\n      this.selectedPiece.selected = true;\n    }\n  }\n\n  trySwap(e) {\n    if (this.selecting) {\n      let targetPiece = this.pieces[e.target.dataset.position];\n      if (this.selectedPiece.swap(targetPiece)) {\n        this.pieces[this.selectedPiece.position] = this.selectedPiece;\n        this.pieces[targetPiece.position] = targetPiece;\n        this.score.resetCombo();\n      }\n    }\n  }\n\n  deselect(e) {\n    this.selecting = false;\n    if(this.selectedPiece) {\n      this.selectedPiece.selected = false;\n    }\n    this.selectedPiece = null;\n    this.screenCtx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);\n    if(this.selectingSpell) {\n      if(e.type === \"click\" && e.target.tagName !== \"BODY\") {\n        this.selectingSpell = false;\n        this.selectedSpell.selected = false;\n        this.selectedSpell = null;\n      }\n\n      this.screen.classList.remove(\"show\");\n      setTimeout(() => document.elementFromPoint(e.clientX, e.clientY).click(), 0);\n    }\n  }\n\n  dropOffSpell(e) {\n    if(this.selectingSpell) {\n      let result = this.selectedSpell.cast(+e.target.dataset.position, this.pieces)\n\n      if(result) {\n        this.selectedSpell.newSpell(this.spells);\n        if(Math.floor(this.selectedSpell.slot / 3) === 0) {\n          Array.from(document.getElementById(\"page-one\").children)[this.selectedSpell.slot * 2 + 1]\n            .innerHTML = this.selectedSpell.name\n        } else {\n          Array.from(document.getElementById(\"page-two\").children)[(this.selectedSpell.slot - 3) * 2 + 1]\n            .innerHTML = this.selectedSpell.name\n        }\n        result.forEach(position => {\n          this.pieces[position].newPiece();\n        });\n\n        this.score.incrementCombo();\n        this.score.addScore(this.selectedSpell.slot % 3 + 3);\n        if (this.score.total === this.score.maxSpells) {\n          this.gameState = 'bonus';\n          setTimeout(this.end.bind(this), 15000);\n        }\n      }\n\n      this.selectingSpell = false;\n      this.selectedSpell.selected = false;\n      this.selectedSpell = null;\n    }\n  }\n\n  selectSpell(e) {\n    if(this.gameState != 'over') {\n      this.selectingSpell = true;\n      this.selectedSpell = this.spells[e.target.dataset.slot];\n      this.selectedSpell.selected = true;\n      this.screen.classList.add(\"show\");\n      this.cursorDraw(e);\n    }\n  }\n\n  setupInteract(interactBoard) {\n    document.addEventListener(\"mouseup\", this.deselect.bind(this));\n    document.addEventListener(\"click\", this.deselect.bind(this));\n    while (interactBoard.firstChild) {\n      interactBoard.removeChild(interactBoard.firstChild)\n    }\n    for (let i = 0; i < 25; i++) {\n      const piece = document.createElement('div');\n      piece.classList.add('piece');\n      piece.dataset.position = i;\n      piece.addEventListener(\"mousedown\", this.selectPiece.bind(this))\n      piece.addEventListener(\"mouseenter\", this.trySwap.bind(this))\n      piece.addEventListener(\"click\", this.dropOffSpell.bind(this))\n      interactBoard.appendChild(piece);\n    }\n  }\n\n  displaySpells() {\n    let page1 = document.getElementById(\"page-one\");\n    let page2 = document.getElementById(\"page-two\");\n    while (page1.firstChild) {\n      page1.removeChild(page1.firstChild)\n    }\n    while (page2.firstChild) {\n      page2.removeChild(page2.firstChild)\n    }\n\n    for (let i = 0; i < 6; i++) {\n      const spellCanvas = document.createElement('canvas');\n      spellCanvas.width = \"112\";\n      spellCanvas.height = \"112\";\n      spellCanvas.classList.add('spell');\n      spellCanvas.dataset.slot = i;\n      spellCanvas.addEventListener(\"mousedown\", this.selectSpell.bind(this))\n      const spellCtx = spellCanvas.getContext('2d');\n      this.spells[i].spellCtx = spellCtx;\n\n      const spellName = document.createElement('div');\n      spellName.classList.add(\"spell-name\");\n      spellName.innerHTML = this.spells[i].name;\n\n      if(i < 3) {\n        page1.appendChild(spellCanvas);\n        page1.appendChild(spellName);\n      } else {\n        page2.appendChild(spellCanvas);\n        page2.appendChild(spellName);\n      }\n    }\n  }\n}\n\nmodule.exports = Board;\n\n//# sourceURL=webpack:///./src/board.js?");

/***/ }),

/***/ "./src/grimoire.js":
/*!*************************!*\
  !*** ./src/grimoire.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Spell = __webpack_require__(/*! ./spell.js */ \"./src/spell.js\");\n\nclass Grimoire {\n\n  static initialize(spells) {\n    let newSpells = spells;\n    for (let i = 0; i < 6; i++) {\n      if(!spells[i]) {\n        switch (i) {\n          case 0:\n            newSpells[0] = new Spell(0, Spell.random(3))\n            break;\n          case 1:\n            newSpells[1] = new Spell(1, Spell.random(4))\n            break;\n          case 2:\n            newSpells[2] = new Spell(2, Spell.random(5))\n            break;\n          case 3:\n            newSpells[3] = new Spell(3, Spell.random(3, newSpells[0]))\n            break;\n          case 4:\n            newSpells[4] = new Spell(4, Spell.random(4, newSpells[1]))\n            break;\n          case 5:\n            newSpells[5] = new Spell(5, Spell.random(5, newSpells[2]))\n        }\n      }\n      \n    }\n\n    return newSpells;\n  }\n\n}\n\nmodule.exports = Grimoire;\n\n//# sourceURL=webpack:///./src/grimoire.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Board = __webpack_require__(/*! ./board.js */ \"./src/board.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  document.addEventListener(\"mouseover\", e => {\n    e.preventDefault();\n  })\n  const screen = document.getElementById(\"screen\");\n  screen.width = document.body.clientWidth;\n  screen.height = document.body.clientHeight;\n  const screenCtx = screen.getContext('2d');\n\n  const canvas = document.getElementById(\"board-canvas\");\n  const interactBoard = document.getElementById(\"interact-board\");\n  const grimoire = document.getElementById(\"grimoire\");\n  const boardCtx = canvas.getContext('2d');\n  const board = new Board(boardCtx, screenCtx, interactBoard, grimoire)\n  board.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/piece.js":
/*!**********************!*\
  !*** ./src/piece.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Piece {\n  constructor(position) {\n    this.piece = Piece.randomPiece();\n    this.position = position;\n    this.posX = (position % 5) * 90 + 45;\n    this.posY = Math.floor(position / 5) * 90 + 45\n    this.renderX = this.posX;\n    this.renderY = this.posY;\n    this.selected = false;\n    this.radius = 0;\n    this.fullRadius = 40;\n\n    this.swap = this.swap.bind(this);\n  }\n\n  newPiece() {\n    this.piece = Piece.randomPiece();\n    this.radius = 0;\n  }\n\n  swap(otherPiece) {\n    if(this.canSwap(otherPiece)) {\n      let tempPos = this.position;\n      let tempPosX = this.posX;\n      let tempPosY = this.posY;\n\n      this.position = otherPiece.position;\n      otherPiece.position = tempPos;\n\n      this.posX = otherPiece.posX;\n      otherPiece.posX = tempPosX;\n\n      this.posY = otherPiece.posY\n      otherPiece.posY = tempPosY;\n\n      return true;\n    }\n\n    return false;\n  }\n\n  canSwap(otherPiece) {\n    switch (this.piece) {\n      case \"earth\":\n        break;\n      case \"water\":\n        if (Math.abs(otherPiece.position - this.position) === 5) {\n          return true\n        }\n        break;\n      case \"wind\":\n        if (Math.abs(otherPiece.position - this.position) === 6 || \n          Math.abs(otherPiece.position - this.position) === 4 ) {\n          if (!(this.position % 5 === 4 && otherPiece.position % 5 === 0)\n            && !(this.position % 5 === 0 && otherPiece.position % 5 === 4)) {\n            return true\n          }\n        }\n        break;\n      case \"fire\":\n        if (Math.abs(otherPiece.position - this.position) === 1) {\n          if(!(this.position % 5 === 4 && otherPiece.position % 5 === 0)\n            && !(this.position % 5 === 0 && otherPiece.position % 5 === 4)) {\n              return true\n            }\n        }\n        break;\n      default:\n        break;\n    }\n\n    switch (otherPiece.piece) {\n      case \"earth\":\n        break;\n      case \"water\":\n        if (Math.abs(otherPiece.position - this.position) === 5) {\n          return true\n        }\n        break;\n      case \"wind\":\n        if (Math.abs(otherPiece.position - this.position) === 6 ||\n          Math.abs(otherPiece.position - this.position) === 4) {\n          if (!(otherPiece.position % 5 === 4 && this.position % 5 === 0)\n            && !(otherPiece.position % 5 === 0 && this.position % 5 === 4)) {\n            return true\n          }\n        }\n        break;\n      case \"fire\":\n        if (Math.abs(otherPiece.position - this.position) === 1) {\n          if (!(otherPiece.position % 5 === 4 && this.position % 5 === 0)\n            && !(otherPiece.position % 5 === 0 && this.position % 5 === 4)) {\n            return true\n          }\n        }\n        break;\n      default:\n        break;\n    }\n\n    return false;\n  }\n\n  draw(ctx) {\n    if(this.posX !== this.renderX || this.posY !== this.renderY) {\n      this.move();\n    }\n    if(this.radius < this.fullRadius) {\n      this.radius += 1;\n    }\n\n    ctx.beginPath();\n    \n    ctx.arc(this.renderX, this.renderY, this.radius, 0, 2 * Math.PI)\n\n    switch (this.piece) {\n      case \"earth\":\n        ctx.fillStyle = '#fdde33'\n        break;\n      case \"water\":\n        ctx.fillStyle= 'cornflowerblue'\n        break;\n      case \"wind\":\n        ctx.fillStyle = '#28a028'\n        break;\n      case \"fire\":\n        ctx.fillStyle = '#db4136'\n        break;\n    }\n\n    ctx.fill();\n    if(this.selected) {\n      ctx.lineWidth = 2;\n      ctx.stroke();\n    }\n\n    if(this.radius === this.fullRadius) {\n      ctx.drawImage(document.getElementById(this.piece), this.renderX - 45, this.renderY - 45)\n    }\n  }\n\n  move() {\n    if(this.renderPosition !== this.position) {\n      if(this.renderX - this.posX < -5) {\n        this.renderX += 5;\n      } else if (this.renderX - this.posX > 5) {\n        this.renderX -= 5;\n      } else {\n        this.renderX = this.posX;\n      }\n\n      if (this.renderY - this.posY < -5) {\n        this.renderY += 5;\n      } else if (this.renderY - this.posY > 5) {\n        this.renderY -= 5;\n      } else {\n        this.renderY = this.posY;\n      }\n    }\n  }\n\n  static randomPiece() {\n    const randomNumber = Math.floor(Math.random() * 4) + 1\n\n    switch (randomNumber) {\n      case 1:\n        return \"earth\"\n      case 2:\n        return \"water\"\n      case 3:\n        return \"wind\"\n      case 4:\n        return \"fire\"\n      default:\n        break;\n    }\n  }\n}\n\nmodule.exports = Piece;\n\n//# sourceURL=webpack:///./src/piece.js?");

/***/ }),

/***/ "./src/score.js":
/*!**********************!*\
  !*** ./src/score.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Score {\n  constructor(){\n    this.score = 0;\n    this.scoreDisplay = document.getElementById(\"score\");\n    this.combo = 0;\n    this.comboDisplay = document.getElementById(\"combo\");\n    this.total = 0;\n    this.totalDisplay = document.getElementById(\"total\");\n    this.maxSpells = 5;\n  }\n\n  addScore(cost) {\n    let baseScore;\n    switch (cost) {\n      case 3:\n        baseScore = 10;\n        break;\n      case 4:\n        baseScore = 20;\n        break;\n      case 5:\n        baseScore = 40;\n        break;\n    }\n    this.score += baseScore * this.combo;\n    this.scoreDisplay.innerHTML = \"Score: \" + this.score;\n  }\n\n  incrementCombo() {\n    this.combo += 1;\n    this.comboDisplay.innerHTML = \"Combo: \" + this.combo;\n    this.total += 1;\n    if (this.total < this.maxSpells) {\n      this.totalDisplay.innerHTML = \"Spells Cast: \" + this.total + \"/\" + this.maxSpells;\n    } else {\n      this.totalDisplay.innerHTML = \"BONUS TIME\";\n    }\n  }\n\n  resetCombo() {\n    this.combo = 0;\n    this.comboDisplay.innerHTML = \"Combo: \" + this.combo;\n  }\n\n  gameOver() {\n    this.totalDisplay.innerHTML = \"YOU WIN!\";\n  }\n}\n\nmodule.exports = Score;\n\n//# sourceURL=webpack:///./src/score.js?");

/***/ }),

/***/ "./src/spell.js":
/*!**********************!*\
  !*** ./src/spell.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const SpellList = __webpack_require__(/*! ./spell_list.js */ \"./src/spell_list.js\")\n\nclass Spell {\n  constructor(slot, spellInfo) {\n    this.slot = slot;\n    this.name = spellInfo.name;\n    this.anchor = spellInfo.anchor;\n    this.otherPieces = spellInfo.otherPieces;\n    this.selected = false;\n    this.radius = 0;\n    this.maxRadius = 11;\n  }\n\n  newSpell(spells) {\n    let randomNum;\n    let newSpell;\n    switch (this.slot % 3) {\n      case 0:\n        randomNum = Math.floor(Math.random() * 16) + 1;\n        while (SpellList.threeCost[randomNum].name === spells[0].name || \n                SpellList.threeCost[randomNum].name === spells[3].name) {\n          randomNum = Math.floor(Math.random() * 16) + 1;\n        }\n        newSpell = SpellList.threeCost[randomNum];\n        break;\n      case 1:\n        randomNum = Math.floor(Math.random() * 10) + 1;\n        while (SpellList.fourCost[randomNum].name === spells[1].name ||\n          SpellList.fourCost[randomNum].name === spells[4].name) {\n          randomNum = Math.floor(Math.random() * 10) + 1;\n        }\n        newSpell = SpellList.fourCost[randomNum];\n        break;\n      case 2:\n        randomNum = Math.floor(Math.random() * 10) + 1;\n        while (SpellList.fiveCost[randomNum].name === spells[2].name ||\n          SpellList.fiveCost[randomNum].name === spells[5].name) {\n          randomNum = Math.floor(Math.random() * 10) + 1;\n        }\n        newSpell = SpellList.fiveCost[randomNum];\n        break;\n    }\n    \n    this.name = newSpell.name;\n    this.anchor = newSpell.anchor;\n    this.otherPieces = newSpell.otherPieces;\n    this.radius = 0;\n  }\n\n  cast(anchorPos, pieces) {\n    if(pieces[anchorPos].piece !== this.anchor.type) {\n      return false;\n    }\n\n    const anchorX = anchorPos % 5;\n    const anchorY = Math.floor(anchorPos / 5);\n\n    let positions = [anchorPos];\n\n    this.otherPieces.forEach(piece => {\n      if(anchorX + piece.dx > 4 || anchorX + piece.dx < 0 ||\n        anchorY + piece.dy > 4 || anchorY + piece.dy < 0) {\n          return false;\n      }\n      const position = anchorX + piece.dx + (anchorY + piece.dy) * 5;\n      if (pieces[position].piece != piece.type) {\n        return false;\n      }\n      positions.push(position)\n    });\n\n    return positions\n  }\n\n  static random(cost, otherSpell) {\n    let randomNum;\n    switch (cost) {\n      case 3:\n        randomNum = Math.floor(Math.random() * 16) + 1; \n        while ((otherSpell && (SpellList.threeCost[randomNum].name === otherSpell.name))) {\n                  randomNum = Math.floor(Math.random() * 16) + 1;\n                }\n        return SpellList.threeCost[randomNum]\n      case 4:\n        randomNum = Math.floor(Math.random() * 10) + 1;\n        while (otherSpell && (SpellList.fourCost[randomNum].name === otherSpell.name)) {\n          randomNum = Math.floor(Math.random() * 10) + 1;\n        }\n        return SpellList.fourCost[randomNum]\n      case 5:\n        randomNum = Math.floor(Math.random() * 10) + 1;\n        while (otherSpell && (SpellList.fiveCost[randomNum].name === otherSpell.name)) {\n          randomNum = Math.floor(Math.random() * 10) + 1;\n        }\n        return SpellList.fiveCost[randomNum]\n    }\n  }\n\n  draw() {\n    this.spellCtx.clearRect(0, 0, 112, 112);\n    if(this.radius < this.maxRadius) {\n      this.radius += .25;\n    }\n\n    if(!this.selected) {\n      this.spellCtx.beginPath();\n\n      this.spellCtx.arc(this.anchor.dx * 27 + 13, this.anchor.dy * 27 + 13, this.radius, 0, 2 * Math.PI);\n      this.spellCtx.fillStyle = this.colorByType(this.anchor.type);\n      this.spellCtx.fill();\n      this.spellCtx.lineWidth = 1;\n      this.spellCtx.stroke();\n      this.spellCtx.closePath();\n      if(this.radius >= this.maxRadius) {\n        this.spellCtx.drawImage(document.getElementById(this.anchor.type + \"-small\"), this.anchor.dx * 27, this.anchor.dy * 27)\n      }\n\n      this.otherPieces.forEach(piece => {\n        let posX = this.anchor.dx + piece.dx;\n        let posY = this.anchor.dy + piece.dy;\n        this.spellCtx.beginPath();\n        this.spellCtx.arc(posX * 27 + 13, posY * 27 + 13, this.radius, 0, 2* Math.PI);\n        this.spellCtx.fillStyle = this.colorByType(piece.type);\n        this.spellCtx.fill();\n        this.spellCtx.lineWidth = 1;\n        this.spellCtx.stroke();\n        this.spellCtx.closePath();\n        if(this.radius >= this.maxRadius) {\n          this.spellCtx.drawImage(document.getElementById(piece.type + \"-small\"), posX * 27, posY * 27)\n        }\n      });\n    }\n  }\n\n  cursorDraw(e, screenCtx) {\n    screenCtx.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);\n    screenCtx.beginPath();\n\n    screenCtx.arc(e.clientX - 8, e.clientY - 28, 40, 0, 2 * Math.PI);\n    screenCtx.fillStyle = this.colorByType(this.anchor.type);\n    screenCtx.fill();\n    screenCtx.closePath();\n    screenCtx.drawImage(document.getElementById(this.anchor.type), e.clientX-53, e.clientY-73)\n\n    this.otherPieces.forEach(piece => {\n      let posX = e.clientX + 90 * piece.dx;\n      let posY = e.clientY + 90 * piece.dy;\n      screenCtx.beginPath();\n      screenCtx.arc(posX - 8, posY - 28, 40, 0, 2 * Math.PI);\n      screenCtx.fillStyle =this.colorByType(piece.type);\n      screenCtx.fill();\n      screenCtx.closePath();\n      screenCtx.drawImage(document.getElementById(piece.type), posX - 53, posY - 73)\n    });\n  }\n\n  colorByType(type) {\n    switch (type) {\n      case \"earth\":\n        return 'rgba(253,222,51,.75)'\n      case \"water\":\n        return'rgba(100,149,237,.75)'\n      case \"wind\":\n        return 'rgba(40,160,40,.75)'\n      case \"fire\":\n        return 'rgba(219,65,54,.75)'\n    }\n  }\n}\n\nmodule.exports = Spell;\n\n//# sourceURL=webpack:///./src/spell.js?");

/***/ }),

/***/ "./src/spell_list.js":
/*!***************************!*\
  !*** ./src/spell_list.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class SpellList {\n  \n}\n\nSpellList.threeCost = {\n  1: {\n    name: 'Inferno',\n    anchor: { type: 'fire', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'fire', dx: -1, dy: 0 },\n      { type: 'fire', dx: 1, dy: 0 }\n    ]\n  },\n  2: {\n    name: 'Magma Storm',\n    anchor: { type: 'water', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'fire', dx: -1, dy: 0 },\n      { type: 'fire', dx: 0, dy: 1 }\n    ]\n  },\n  3: {\n    name: 'Planetary',\n    anchor: { type: 'fire', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'wind', dx: 0, dy: -1 },\n      { type: 'earth', dx: 0, dy: 1 }\n    ]\n  },\n  4: {\n    name: 'Thunderclap',\n    anchor: { type: 'wind', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'fire', dx: -1, dy: 0 },\n      { type: 'fire', dx: 1, dy: 0 }\n    ]\n  },\n  5: {\n    name: 'Briar',\n    anchor: { type: 'water', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'earth', dx: -1, dy: 0 },\n      { type: 'earth', dx: 1, dy: 0 }\n    ]\n  },\n  6: {\n    name: 'Cold Snap',\n    anchor: { type: 'water', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'fire', dx: -1, dy: 0 },\n      { type: 'water', dx: 1, dy: 0 }\n    ]\n  },\n  7: {\n    name: 'Whirlwind',\n    anchor: { type: 'wind', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'wind', dx: 0, dy: -1 },\n      { type: 'wind', dx: 0, dy: 1 }\n    ]\n  },\n  8: {\n    name: 'Typhoon',\n    anchor: { type: 'wind', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'wind', dx: 0, dy: -1 },\n      { type: 'water', dx: 0, dy: 1 }\n    ]\n  },\n  9: {\n    name: 'Hail Prism',\n    anchor: { type: 'water', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'wind', dx: 0, dy: -1 },\n      { type: 'water', dx: 0, dy: 1 }\n    ]\n  },\n  10: {\n    name: 'Spire',\n    anchor: { type: 'earth', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'earth', dx: 0, dy: -1 },\n      { type: 'water', dx: 0, dy: 1 }\n    ]\n  },\n  11: {\n    name: 'Ply',\n    anchor: { type: 'earth', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'water', dx: -1, dy: 0 },\n      { type: 'water', dx: 0, dy: 1 }\n    ]\n  },\n  12: {\n    name: 'Cure',\n    anchor: { type: 'wind', dx: 1, dy: 2 },\n    otherPieces: [\n      { type: 'earth', dx: 0, dy: -1 },\n      { type: 'earth', dx: 1, dy: 0 }\n    ]\n  },\n  13: {\n    name: 'Arid Heat',\n    anchor: { type: 'fire', dx: 1, dy: 2 },\n    otherPieces: [\n      { type: 'earth', dx: 0, dy: -1 },\n      { type: 'earth', dx: 1, dy: 0 }\n    ]\n  },\n  14: {\n    name: 'Heat Wave',\n    anchor: { type: 'fire', dx: 1, dy: 1 },\n    otherPieces: [\n      { type: 'wind', dx: 1, dy: 0 },\n      { type: 'wind', dx: 0, dy: 1 }\n    ]\n  },\n  15: {\n    name: 'Froth Spiral',\n    anchor: { type: 'water', dx: 2, dy: 2 },\n    otherPieces: [\n      { type: 'water', dx: -1, dy: 0 },\n      { type: 'wind', dx: 0, dy: -1 }\n    ]\n  },\n  16: {\n    name: 'Wish',\n    anchor: { type: 'water', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'wind', dx: -1, dy: 0 },\n      { type: 'earth', dx: 1, dy: 0 }\n    ]\n  }\n}\n\nSpellList.fourCost = {\n  1: {\n    name: 'Tempest',\n    anchor: { type: 'water', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'wind', dx: 0, dy: -1 },\n      { type: 'wind', dx: 0, dy: 1 },\n      { type: 'water', dx: 0, dy: 2 }\n    ]\n  },\n  2: {\n    name: 'Mother Gaia',\n    anchor: { type: 'earth', dx: 1, dy: 1 },\n    otherPieces: [\n      { type: 'earth', dx: 1, dy: 0 },\n      { type: 'earth', dx: 0, dy: 1 },\n      { type: 'earth', dx: 1, dy: 1 },\n    ]\n  },\n  3: {\n    name: 'Flash Bolt',\n    anchor: { type: 'wind', dx: 1, dy: 1 },\n    otherPieces: [\n      { type: 'wind', dx: 1, dy: 0 },\n      { type: 'fire', dx: 0, dy: 1 },\n      { type: 'fire', dx: 0, dy: 2 },\n    ]\n  },\n  4: {\n    name: 'Vital Boon',\n    anchor: { type: 'earth', dx: 1, dy: 1 },\n    otherPieces: [\n      { type: 'wind', dx: 1, dy: 0 },\n      { type: 'wind', dx: 0, dy: 1 },\n      { type: 'earth', dx: 1, dy: 1 },\n    ]\n  },\n  5: {\n    name: 'Coldforge',\n    anchor: { type: 'earth', dx: 1, dy: 1 },\n    otherPieces: [\n      { type: 'earth', dx: 1, dy: 0 },\n      { type: 'water', dx: 0, dy: 1 },\n      { type: 'water', dx: 1, dy: 1 },\n    ]\n  },\n  6: {\n    name: 'Liquifier',\n    anchor: { type: 'water', dx: 1, dy: 1 },\n    otherPieces: [\n      { type: 'fire', dx: 1, dy: 0 },\n      { type: 'fire', dx: 0, dy: 1 },\n      { type: 'water', dx: 1, dy: 1 },\n    ]\n  },\n  7: {\n    name: 'Mad Blast',\n    anchor: { type: 'fire', dx: 1, dy: 1 },\n    otherPieces: [\n      { type: 'fire', dx: 1, dy: 0 },\n      { type: 'fire', dx: 0, dy: 1 },\n      { type: 'fire', dx: 1, dy: 1 },\n    ]\n  },\n  8: {\n    name: 'Tornado',\n    anchor: { type: 'wind', dx: 1, dy: 1 },\n    otherPieces: [\n      { type: 'wind', dx: 1, dy: 0 },\n      { type: 'wind', dx: 0, dy: 1 },\n      { type: 'wind', dx: 1, dy: 1 },\n    ]\n  },\n  9: {\n    name: 'Deluge',\n    anchor: { type: 'water', dx: 1, dy: 1 },\n    otherPieces: [\n      { type: 'water', dx: 1, dy: 0 },\n      { type: 'water', dx: 0, dy: 1 },\n      { type: 'water', dx: 1, dy: 1 },\n    ]\n  },\n  10: {\n    name: 'Epicenter',\n    anchor: { type: 'earth', dx: 2, dy: 1 },\n    otherPieces: [\n      { type: 'earth', dx: -1, dy: 0 },\n      { type: 'fire', dx: 1, dy: 0 },\n      { type: 'fire', dx: 1, dy: 1 },\n    ]\n  }\n}\n\nSpellList.fiveCost = {\n  1: {\n    name: 'Meteor',\n    anchor: { type: 'fire', dx: 2, dy: 2 },\n    otherPieces: [\n      { type: 'fire', dx: -1, dy: 0 },\n      { type: 'wind', dx: 0, dy: -1 },\n      { type: 'earth', dx: 0, dy: 1 },\n      { type: 'earth', dx: -1, dy: 1 }\n    ]\n  },\n  2: {\n    name: 'Avalanche',\n    anchor: { type: 'earth', dx: 2, dy: 2 },\n    otherPieces: [\n      { type: 'earth', dx: -2, dy: 0 },\n      { type: 'earth', dx: -1, dy: 0 },\n      { type: 'water', dx: 1, dy: 0 },\n      { type: 'water', dx: 1, dy: -1 }\n    ]\n  },\n  3: {\n    name: 'Pyroclasm',\n    anchor: { type: 'fire', dx: 2, dy: 2 },\n    otherPieces: [\n      { type: 'fire', dx: 0, dy: -1 },\n      { type: 'water', dx: -1, dy: 1 },\n      { type: 'water', dx: 0, dy: 1 },\n      { type: 'water', dx: 1, dy: 1 }\n    ]\n  },\n  4: {\n    name: 'Supernova',\n    anchor: { type: 'earth', dx: 2, dy: 2 },\n    otherPieces: [\n      { type: 'fire', dx: 0, dy: -1 },\n      { type: 'fire', dx: 0, dy: 1 },\n      { type: 'fire', dx: -1, dy: 0 },\n      { type: 'fire', dx: 1, dy: 0 }\n    ]\n  },\n  5: {\n    name: 'Thunderhead',\n    anchor: { type: 'wind', dx: 1, dy: 1 },\n    otherPieces: [\n      { type: 'wind', dx: 1, dy: 0 },\n      { type: 'wind', dx: 2, dy: 0 },\n      { type: 'fire', dx: 0, dy: 1 },\n      { type: 'fire', dx: 0, dy: 2 }\n    ]\n  },\n  6: {\n    name: 'Hurricane',\n    anchor: { type: 'water', dx: 2, dy: 2 },\n    otherPieces: [\n      { type: 'wind', dx: 0, dy: -1 },\n      { type: 'wind', dx: 0, dy: 1 },\n      { type: 'wind', dx: -1, dy: 0 },\n      { type: 'water', dx: -1, dy: -1 }\n    ]\n  },\n  7: {\n    name: 'Diamond Berg',\n    anchor: { type: 'earth', dx: 2, dy: 2 },\n    otherPieces: [\n      { type: 'earth', dx: 0, dy: -1 },\n      { type: 'earth', dx: 1, dy: 0 },\n      { type: 'water', dx: -1, dy: 0 },\n      { type: 'water', dx: -1, dy: -1 }\n    ]\n  },\n  8: {\n    name: 'Judgment',\n    anchor: { type: 'wind', dx: 2, dy: 2 },\n    otherPieces: [\n      { type: 'earth', dx: 0, dy: 1 },\n      { type: 'wind', dx: 0, dy: -1 },\n      { type: 'water', dx: -1, dy: -1 },\n      { type: 'water', dx: 1, dy: -1 }\n    ]\n  },\n  9: {\n    name: 'Dire Inferno',\n    anchor: { type: 'fire', dx: 2, dy: 2 },\n    otherPieces: [\n      { type: 'fire', dx: 1, dy: 0 },\n      { type: 'wind', dx: -1, dy: 0 },\n      { type: 'wind', dx: -1, dy: -1 },\n      { type: 'earth', dx: -1, dy: 1 }\n    ]\n  },\n  10: {\n    name: 'Spark Plasma',\n    anchor: { type: 'water', dx: 2, dy: 2 },\n    otherPieces: [\n      { type: 'fire', dx: -1, dy: 0 },\n      { type: 'fire', dx: 1, dy: 0 },\n      { type: 'wind', dx: -1, dy: -1 },\n      { type: 'wind', dx: 1, dy: -1 }\n    ]\n  }\n}\n\nmodule.exports = SpellList;\n\n//# sourceURL=webpack:///./src/spell_list.js?");

/***/ })

/******/ });