class Timer {
  constructor() {
    this.time = 0;
    this.ctx = document.getElementById("clock").getContext('2d');
  }

  setTimer(callback, amt) {
    this.time = amt;
    this.maxTime = amt;

    this.interval = setInterval(() => {
      if(this.time <= 0) {
        clearInterval(this.interval)
        callback();
      } else {
        this.draw();
        this.time -= 5;
      }
    }, 5)
  }

  draw() {
    this.ctx.clearRect(0,0,30,30);
    this.ctx.beginPath();
    this.ctx.arc(15, 15, 15, 3 * Math.PI / 2,-2 * Math.PI * this.time / this.maxTime + 3 * Math.PI / 2, true);
    this.ctx.fillStyle = "rgb(160,160,160)";
    this.ctx.lineTo(15, 15);
    this.ctx.fill();
  }


}

module.exports = Timer;