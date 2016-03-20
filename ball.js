function Ball () {
  GameObject.call(this);
  
  this.startAngle = 0;
  this.endAngle   = 2 * Math.PI;
  this.handle     = 0;
  
  this.vector = {
    x: 0,
    y: 0
  }
}

Ball.prototype = Object.create(GameObject.prototype);
Ball.prototype.constructor = Ball;

Ball.prototype.init = function () {
  this.setVector();
  this.setDimension();
  this.resetPosition();
  
};

Ball.prototype.reinit = function () {
  this.setDimension();
  this.translatePosition();
  this.translateVector();
}

Ball.prototype.setVector = function (vector) {
  if (!vector) {
    this.vector.x = canvas.width / (Math.random() * canvas.width) * (Math.random() - 0.5 <= 0 ? -1 : 1);
    this.vector.y = canvas.height / (Math.random() * canvas.height) * (Math.random() - 0.5 <= 0 ? -1 : 1);
  }
  else {
    this.vector.x = vector.x;
    this.vector.y = vector.y;
  }
};

Ball.prototype.applyVector = function () {
  this.position.x += this.vector.x;
  this.position.y += this.vector.y;
};

Ball.prototype.translateVector = function () {
  this.vector.x = (this.vector.x / oldWidth) * canvas.width;
  this.vector.y = (this.vector.y / oldHeight) * canvas.height;
};

Ball.prototype.detectCollision = function () {  
  // detect x-axis escapes
  if (this.position.x - this.radius > canvas.width) { // p1 wins
    this.init();
    return;
  }
  
  if (this.position.x + this.radius < 0) { // p2 wins
    this.init();
    return;
  }
  
  // detect y-axis collisions
  if (this.position.y - this.radius <= 0 || this.position.y + this.radius >= canvas.height)
    this.vector.y *= -1;
  
  // detect p1 collision
  var p1 = gameObjects['p1'];
  if (this.position.x - this.radius <= p1.position.x + p1.width &&
      this.position.x - this.radius >= p1.position.x &&
      this.position.y >= p1.position.y &&
      this.position.y <= p1.position.y + p1.height) {
        this.vector.x *= -1;
        return;
      }
      
  // detect p2 collision
  var p2 = gameObjects['p2'];
  if (this.position.x + this.radius <= p2.position.x + p2.width &&
      this.position.x + this.radius >= p2.position.x &&
      this.position.y >= p2.position.y &&
      this.position.y <= p2.position.y + p2.height) {
        this.vector.x *= -1;
        return;
      } 
};

Ball.prototype.setDimension = function () {
  this.radius = Math.floor(canvas.height / 128);
};

Ball.prototype.resetPosition = function() {
  this.setPosition(Math.floor(canvas.width / 2),
    Math.floor(canvas.height / 2));
};

Ball.prototype.render = function () {
  context.fillStyle = 'white';
  context.beginPath();
  context.arc(this.position.x, this.position.y, 
    this.radius, this.startAngle, this.endAngle);
  context.fill();
};