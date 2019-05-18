class Sounds {
  constructor() {
    this.audio = new Audio('../dist/audio/venus_lighthouse.mp3');
    this.playAudio = document.getElementById("audio-button");
    this.playAudio.addEventListener("click", this.toggle.bind(this));
  }

  toggle() {
    if(this.audio.paused) {
      this.audio.play()
    } else {
      this.audio.pause()
    }
  }
}

module.exports = Sounds