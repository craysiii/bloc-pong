var gameObjects = {
  'ball': 0,
  'p1'  : 0,
  'p2'  : 0  
};

var UP   = -1;
var DOWN = 1;

var animate = window.requestAnimationFrame  ||
  window.webkitRequestAnimationFrame      ||
  window.mozRequestAnimationFrame         ||
  window.oRequestAnimationFrame           ||
  window.msRequestAnimationFrame          ||
  function (callback) { window.setTimeout(callback, 1000/60) };

var step = function () {
  canvas.width = canvas.width;
  for (var obj in gameObjects) {
    gameObjects[obj].render();   
  }
  
  animate(step);
};

var size = function () {
  setCanvasSize();
  
  for (var obj in gameObjects) {
    gameObjects[obj].reinit();
  }
  
  oldWidth = canvas.width;
  oldHeight = canvas.height;
};

var init = function () {
  setCanvasSize();
  
  oldWidth  = canvas.width;
  oldHeight = canvas.height;
  
  gameObjects['ball'] = new Ball();
  gameObjects['p1']   = new Paddle(true);
  gameObjects['p2']   = new Paddle(false);
  
  for (var obj in gameObjects) {
    gameObjects[obj].init();
  }
  
  window.addEventListener('keydown', function (event) {
    switch (event.code) {
      case 'KeyA':
        gameObjects['p1'].move(UP);
        break;
      case 'KeyZ':
        gameObjects['p1'].move(DOWN);
        break;
    }
  });
  
  animate(step);
};