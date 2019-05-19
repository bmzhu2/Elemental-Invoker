class Piece {
  constructor(position) {
    this.piece = Piece.randomPiece();
    this.position = position;
    this.posX = (position % 5) * 90 + 45;
    this.posY = Math.floor(position / 5) * 90 + 45
    this.renderX = this.posX;
    this.renderY = this.posY;
    this.selected = false;
    this.neighbor = false;
    this.radius = 0;
    this.fullRadius = 40;

    this.swap = this.swap.bind(this);
  }

  newPiece() {
    this.piece = Piece.randomPiece();
    this.radius = 0;
  }

  swap(otherPiece) {
    if(this.canSwap(otherPiece)) {
      let tempPos = this.position;
      let tempPosX = this.posX;
      let tempPosY = this.posY;

      this.position = otherPiece.position;
      otherPiece.position = tempPos;

      this.posX = otherPiece.posX;
      otherPiece.posX = tempPosX;

      this.posY = otherPiece.posY
      otherPiece.posY = tempPosY;

      return true;
    }

    return false;
  }

  getValidNeighbors(pieces) {
    let neighbors = []
    for (let i = 0; i < 25; i++) {
      if(this.position !== i && this.canSwap(pieces[i])) {
        neighbors.push(i)
      }
    }
    return neighbors;
  }

  canSwap(otherPiece) {
    switch (this.piece) {
      case "earth":
        break;
      case "water":
        if (Math.abs(otherPiece.position - this.position) === 5) {
          return true
        }
        break;
      case "wind":
        if (Math.abs(otherPiece.position - this.position) === 6 || 
          Math.abs(otherPiece.position - this.position) === 4 ) {
          if (!(this.position % 5 === 4 && otherPiece.position % 5 === 0)
            && !(this.position % 5 === 0 && otherPiece.position % 5 === 4)) {
            return true
          }
        }
        break;
      case "fire":
        if (Math.abs(otherPiece.position - this.position) === 1) {
          if(!(this.position % 5 === 4 && otherPiece.position % 5 === 0)
            && !(this.position % 5 === 0 && otherPiece.position % 5 === 4)) {
              return true
            }
        }
        break;
      default:
        break;
    }

    switch (otherPiece.piece) {
      case "earth":
        break;
      case "water":
        if (Math.abs(otherPiece.position - this.position) === 5) {
          return true
        }
        break;
      case "wind":
        if (Math.abs(otherPiece.position - this.position) === 6 ||
          Math.abs(otherPiece.position - this.position) === 4) {
          if (!(otherPiece.position % 5 === 4 && this.position % 5 === 0)
            && !(otherPiece.position % 5 === 0 && this.position % 5 === 4)) {
            return true
          }
        }
        break;
      case "fire":
        if (Math.abs(otherPiece.position - this.position) === 1) {
          if (!(otherPiece.position % 5 === 4 && this.position % 5 === 0)
            && !(otherPiece.position % 5 === 0 && this.position % 5 === 4)) {
            return true
          }
        }
        break;
      default:
        break;
    }

    return false;
  }

  draw(ctx) {
    if(this.posX !== this.renderX || this.posY !== this.renderY) {
      this.move();
    }
    if(this.radius < this.fullRadius) {
      this.radius += 1;
    }

    ctx.beginPath();
    
    ctx.arc(this.renderX, this.renderY, this.radius, 0, 2 * Math.PI)

    switch (this.piece) {
      case "earth":
        ctx.fillStyle = '#fdde33'
        break;
      case "water":
        ctx.fillStyle= 'cornflowerblue'
        break;
      case "wind":
        ctx.fillStyle = '#28a028'
        break;
      case "fire":
        ctx.fillStyle = '#db4136'
        break;
    }

    ctx.fill();
    if(this.selected) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgb(120,120,120";
      ctx.stroke();
    }
    if(this.neighbor) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.stroke();
    }

    if(this.radius === this.fullRadius) {
      ctx.drawImage(document.getElementById(this.piece), this.renderX - 45, this.renderY - 45)
    }
  }

  move() {
    if(this.renderPosition !== this.position) {
      if(this.renderX - this.posX < -5) {
        this.renderX += 5;
      } else if (this.renderX - this.posX > 5) {
        this.renderX -= 5;
      } else {
        this.renderX = this.posX;
      }

      if (this.renderY - this.posY < -5) {
        this.renderY += 5;
      } else if (this.renderY - this.posY > 5) {
        this.renderY -= 5;
      } else {
        this.renderY = this.posY;
      }
    }
  }

  static randomPiece() {
    const randomNumber = Math.floor(Math.random() * 4) + 1

    switch (randomNumber) {
      case 1:
        return "earth"
      case 2:
        return "water"
      case 3:
        return "wind"
      case 4:
        return "fire"
      default:
        break;
    }
  }
}

module.exports = Piece;