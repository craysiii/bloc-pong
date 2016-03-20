function GameObject () {      
  this.position = {
    x: 0,
    y: 0  
  };
}

GameObject.prototype.setPosition = function (x, y) {
  this.position.x = x;
  this.position.y = y;
};

GameObject.prototype.translatePosition = function () {
  this.position.x = (this.position.x / oldWidth) * canvas.width;
  this.position.y = (this.position.y / oldHeight) * canvas.height;
};
