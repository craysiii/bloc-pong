function Computer (paddle, difficulty) {
  this.difficulties = {
    "easy"  : 0.75,
    "normal": 1,
    "hard"  : 1.5
  };
  
  this.paddle     = paddle;
  this.difficulty = difficulty;
  
  this.init = function () {
    this.setSpeed();
  }
  
  this.setSpeed = function () {
    this.paddle.speed *= this.difficulties[difficulty];
  };
  
  this.update = function(ball) {
    var ballY   = ball.position.y;
    var paddleY = this.paddle.position.y;
    var paddleM = paddleY + (this.paddle.height / 2);
    
    // Follow but not too closely, or paddle jitters
    if (ballY <= paddleM - this.paddle.height / 4) {
      this.paddle.direction = Game.constants['UP'];
    }
    else if (ballY > paddleM + this.paddle.height / 4) {
      this.paddle.direction = Game.constants['DOWN'];
    }
    else {
      this.paddle.direction = Game.constants['NONE'];
    }
  };
}
