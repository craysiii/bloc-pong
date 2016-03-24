function Canvas (id) {
  this.primitive = document.getElementById(id);
  this.context   = this.primitive.getContext('2d');
  
  this.width  = (() => this.primitive.width);
  this.height = (() => this.primitive.height);
  
  this.oldWidth  = 0;
  this.oldHeight = 0;
};

Canvas.prototype.setDimensions = function (width, height) {
  this.primitive.width  = width;
  this.primitive.height = height;
};

Canvas.prototype.setSize = function (aspectRatio) {
  var width  = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  
  if (width / height >= aspectRatio) 
    // scale according to height
    this.setDimensions(height * aspectRatio, height); 
  else 
    // scale according to width
    this.setDimensions(width, width * (1 / aspectRatio));
};

Canvas.prototype.centerVertical = function (height) {
  return (this.primitive.height / 2) - (height / 2);
};

Canvas.prototype.centerHorizontal = function (width) {
  return (this.primitive.width / 2) - (width / 2);
};

Canvas.prototype.storeDimensions = function () {
  this.oldWidth   = this.width();
  this.oldHeight = this.height();
};