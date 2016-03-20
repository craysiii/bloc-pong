function Ball () {
  GameObject.call(this);
  
  this.startAngle = 0;
  this.endAngle   = 2 * Math.PI;
}

Ball.prototype = Object.create(GameObject.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.init = function () {
  this.setSpeed();
  this.setDimension();
  this.resetPosition();
};

Ball.prototype.reinit = function () {
  this.setSpeed();
  this.setDimension();
  this.translatePosition();
}

Ball.prototype.setSpeed = function () {
  this.speed = canvas.height / 50;
};

Ball.prototype.setDimension = function () {
  this.radius = Math.floor(canvas.height / 128);
};

Ball.prototype.resetPosition = function() {
  this.setPosition(Math.floor(centerHorizontal(this.radius * 2)),
    Math.floor(centerVertical(this.radius * 2)));
};

Ball.prototype.render = function () {
  context.fillStyle = 'white';
  context.beginPath();
  context.arc(this.position.x, this.position.y, 
    this.radius, this.startAngle, this.endAngle);
  context.fill();
};