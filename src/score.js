class Score {
  constructor(){
    this.score = 0;
    this.scoreDisplay = document.getElementById("score");
    this.combo = 0;
    this.comboDisplay = document.getElementById("combo");
    this.total = 0;
    this.totalDisplay = document.getElementById("total-count");
    this.maxSpells = 20;
  }

  addScore(cost) {
    let baseScore;
    switch (cost) {
      case 3:
        baseScore = 10;
        break;
      case 4:
        baseScore = 20;
        break;
      case 5:
        baseScore = 40;
        break;
    }
    this.score += baseScore * this.combo;
    this.scoreDisplay.innerHTML = "Score: " + this.score;
  }

  incrementCombo() {
    this.combo += 1;
    this.comboDisplay.innerHTML = "Combo: " + this.combo;
    this.total += 1;
    if (this.total < this.maxSpells) {
      this.totalDisplay.innerHTML = "Spells Cast: " + this.total + "/" + this.maxSpells;
    } else {
      this.totalDisplay.innerHTML = "BONUS TIME";
    }
  }

  resetCombo() {
    this.combo = 0;
    this.comboDisplay.innerHTML = "Combo: " + this.combo;
  }

  gameOver() {
    this.totalDisplay.innerHTML = "YOU WIN!";
  }
}

module.exports = Score;