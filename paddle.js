function Paddle (isPlayerOne) {
  GameObject.call(this);
  
  this.isPlayerOne = isPlayerOne;
  this.direction   = 0;
}

Paddle.prototype = Object.create(GameObject.prototype);
Paddle.prototype.constructor = Paddle;

Paddle.prototype.init = function () {
  this.setSpeed();
  this.setDimension();
  this.setDefault();
}

Paddle.prototype.resize = function () {
  this.setSpeed();
  this.setDimension();
  this.translatePosition();
}

Paddle.prototype.setDefault = function () {
  this.resetPosition();
  this.direction = 0;
};

Paddle.prototype.setSpeed = function () {
  this.speed = game.canvas.height() / 50;
};

Paddle.prototype.setDimension = function () {
  this.height = game.canvas.height() / 8;
  this.width  = this.height / 8;
};

Paddle.prototype.resetPosition = function () {
  this.setPosition(Math.floor(this.isPlayerOne ? this.width : game.canvas.width() - (this.width * 2)),
    Math.floor(game.canvas.centerVertical(this.height)));
};

Paddle.prototype.move = function () {
  if (this.direction == Game.constants['UP'] && this.position.y - this.speed <= 0) {
    this.position.y = 0;
    return;
  }

  if (this.direction == Game.constants['DOWN'] && this.position.y + this.height + this.speed >= game.canvas.height()) {
    this.position.y = game.canvas.height() - this.height;
    return;
  }

  this.position.y += this.speed * this.direction;
};

Paddle.prototype.render = function () {
  game.canvas.context.fillStyle = 'white';
  game.canvas.context.fillRect(this.position.x, this.position.y, 
  this.width, this.height);
};