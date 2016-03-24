function Ball () {
  GameObject.call(this);
  
  this.startAngle = 0;
  this.endAngle   = 2 * Math.PI;
  
  this.vector = {};
}

Ball.prototype = Object.create(GameObject.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.init = function () {
  this.setDimension();
  this.setDefault();
}

Ball.prototype.resize = function () {
  this.setDimension();
  this.translatePosition();
  this.translateVector();
}

Ball.prototype.setDefault = function () {
  this.resetPosition();
  this.defaultVector();
};

Ball.prototype.defaultVector = function () {
  this.vector.x = (game.canvas.width() / 150) * game.currentAspectRatio();
  this.vector.y = 1 / game.currentAspectRatio();
};

Ball.prototype.applyVector = function () {
  this.position.x += this.vector.x;
  this.position.y += this.vector.y;
};

Ball.prototype.translateVector = function () {
  this.vector.x = (this.vector.x / game.canvas.oldWidth) * game.canvas.width();
  this.vector.y = (this.vector.y / game.canvas.oldHeight) * game.canvas.height();
};

Ball.prototype.detectCollision = function () {  
  var reset = function () {
    game.currentState.objects['p1'].setDefault();
    game.currentState.objects['p2'].setDefault();
    game.currentState.objects['ball'].setDefault();
  };
  
  // detect x-axis escapes
  if (this.position.x - this.radius > game.canvas.width()) { // p1 wins
    console.log('p1 win');
    reset();
    return;
  }
  
  if (this.position.x + this.radius < 0) { // p2 wins
    console.log('p2 win');
    reset();
    return;
  }
  
  // detect y-axis collisions
  if (this.position.y - this.radius <= 0 || this.position.y + this.radius >= game.canvas.height())
    this.vector.y *= -1;
 
  // Collision code below needs work
  // detect p1 collision
  var p1 = game.currentState.objects['p1'];
  if (this.position.x - this.radius <= p1.position.x + p1.width &&
      this.position.x - this.radius >= p1.position.x &&
      this.position.y >= p1.position.y &&
      this.position.y <= p1.position.y + p1.height) {
        this.vector.x *= -1;
        this.vector.y += ((this.position.y - (p1.position.y + (p1.height / 2))) / 8) *
          game.currentAspectRatio();
        return;
      }
      
  // detect p2 collision
  var p2 = game.currentState.objects['p2'];
  if (this.position.x + this.radius <= p2.position.x + p2.width &&
      this.position.x + this.radius >= p2.position.x &&
      this.position.y >= p2.position.y &&
      this.position.y <= p2.position.y + p2.height) {
        this.vector.x *= -1;
        this.vector.y +=  ((this.position.y - (p2.position.y + (p2.height / 2))) / 8) *
          game.currentAspectRatio();
        return;
      } 
};

Ball.prototype.setDimension = function () {
  this.radius = Math.floor(game.canvas.height() / 128);
};

Ball.prototype.resetPosition = function() {
  this.setPosition(Math.floor(game.canvas.width() / 2),
    Math.floor(game.canvas.height() / 2));
};

Ball.prototype.render = function () {
  game.canvas.context.fillStyle = 'white';
  game.canvas.context.beginPath();
  game.canvas.context.arc(this.position.x, this.position.y, 
    this.radius, this.startAngle, this.endAngle);
  game.canvas.context.fill();
};