function GameObject () {      
  this.position  = {};
}

GameObject.prototype.setPosition = function (x, y) {
  this.position.x = x;
  this.position.y = y;
};

GameObject.prototype.translatePosition = function () {
  this.position.x = (this.position.x / game.canvas.oldWidth) * game.canvas.width();
  this.position.y = (this.position.y / game.canvas.oldHeight) * game.canvas.height();
};
