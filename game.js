var gameObjects = {};

var UP    = -1;
var LEFT  = -1;
var DOWN  = 1;
var RIGHT = 1;
 
var animate = window.requestAnimationFrame  ||
  window.webkitRequestAnimationFrame      ||
  window.mozRequestAnimationFrame         ||
  window.oRequestAnimationFrame           ||
  window.msRequestAnimationFrame          ||
  function (callback) { window.setTimeout(callback, 1000/60) };

var step = function () {
  canvas.width = canvas.width; // 'repaint' screen
  
  gameObjects['ball'].detectCollision();
  gameObjects['ball'].applyVector();
  
  gameObjects['p1'].move();
  gameObjects['p2'].move();
  
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
        gameObjects['p1'].direction = UP;
        break;
      case 'KeyZ':
        gameObjects['p1'].direction = DOWN;
        break;
    }
  });
  
  window.addEventListener('keyup', function (event) {
    switch (event.code) {
      case 'KeyA':
        gameObjects['p1'].direction = 0;
        break;
      case 'KeyZ':
        gameObjects['p1'].direction = 0;
        break;
    }
  });
  
  animate(step);
};