class Sounds {
  constructor() {
    this.muted = true;
    this.gameState = 'normal';
    this.song = new Audio('dist/audio/elemental_stars.mp3');
    this.playAudio = document.getElementById("audio-button");
    this.playAudio.innerHTML = "Sound On";
    this.toggle = this.toggle.bind(this)
    this.playAudio.addEventListener("click", this.toggle);

    this.bonus = new Audio('dist/audio/venus_lighthouse.mp3');
    this.victory = new Audio('dist/audio/victory.mp3');

    this.sfx = new Audio('dist/audio/131.wav')
  }

  toggle() {
    // debugger;
    if(this.muted) {
      this.muted = false;
      if(this.gameState === 'normal') {
        this.song.load()
        this.song.play()
      } else if (this.gameState === 'over') {
        this.victory.load()
        this.victory.play()
      }
      this.playAudio.innerHTML = "Sound Off";
    } else {
      this.muted = true;
      this.song.pause()
      this.victory.pause()
      this.playAudio.innerHTML = "Sound On";
    }
  }
}

module.exports = Sounds