var canvas  = document.getElementById('pong');
var context = canvas.getContext('2d');


// aspect ratios lie, can't use small numbers
var currentAspectRatio= '16:10';
var aspectRatios = {
  '4:3'  : 1920/1440,
  '16:9' : 1920/1080,
  '16:10': 2560/1600,
  '21:9' : 2560/1080,
};

var browserWidth  = () => document.documentElement.clientWidth;
var browserHeight = () => document.documentElement.clientHeight;

var oldWidth  = 0;
var oldHeight = 0;

var setDimensions = function (width, height) {
  canvas.width  = width;
  canvas.height = height;
};

var centerVertical = function (height) {
  return (canvas.height / 2) - (height / 2);
};

var centerHorizontal = function (width) {
  return (canvas.width / 2) - (width / 2);
};

var setCanvasSize = function () {
  var width  = browserWidth();
  var height = browserHeight();
  if (width / height >= aspectRatios[currentAspectRatio]) 
    // scale according to height
    setDimensions(height * aspectRatios[currentAspectRatio], height); 
  else 
    // scale according to width
    setDimensions(width, width * (1 / aspectRatios[currentAspectRatio]));
};