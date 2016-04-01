function Score (paddle) {
  GameObject.call(this);
  
  this.paddle = paddle;
}

Score.prototype = Object.create(GameObject.prototype);
Score.prototype.constructer = Score;

Score.prototype.render = function () {
  game.canvas.context.fillStyle = 'white';
  game.canvas.context.textAlign = 'center';
  game.canvas.context.font      = (this.paddle.width * 4) + 'px Courier New';
  
  game.canvas.context.fillText(this.paddle.score, 
    (game.canvas.width() / 2) + ((this.paddle.isPlayerOne ? -this.paddle.width : this.paddle.width) * 3), 
    this.paddle.width * 4);
};