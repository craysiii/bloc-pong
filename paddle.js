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
  this.resetPosition();
  this.direction = 0;
}

Paddle.prototype.reinit = function () {
  this.setSpeed();
  this.setDimension();
  this.translatePosition();
}

Paddle.prototype.setSpeed = function () {
  this.speed = canvas.height / 50;
};

Paddle.prototype.setDimension = function () {
  this.height = canvas.height / 8;
  this.width  = this.height / 8;
};

Paddle.prototype.resetPosition = function () {
  this.setPosition(Math.floor(this.isPlayerOne ? this.width : canvas.width - (this.width * 2)),
    Math.floor(centerVertical(this.height)));
};

Paddle.prototype.move = function () {
  if (this.direction == UP && this.position.y - this.speed <= 0) {
    this.position.y = 0;
    return;
  }

  if (this.direction == DOWN && this.position.y + this.height + this.speed >= canvas.height) {
    this.position.y = canvas.height - this.height;
    return;
  }

  this.position.y += this.speed * this.direction;
};

Paddle.prototype.render = function () {
  context.fillStyle = 'white';
  context.fillRect(this.position.x, this.position.y, 
  this.width, this.height);
};