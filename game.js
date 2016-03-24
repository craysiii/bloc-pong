function Game (canvas) {
  this.canvas       = canvas;
  this.currentState = null;
  this.factory      = new GameStateFactory();
  
  this.settings = {};
}

Game.constants = {
  'UP'   : -1,        // Directions
  'LEFT' : -1,
  'DOWN' : 1,
  'RIGHT': 1,
  'NONE' : 0,
  '4:3'  : 1920/1440, // Aspect Ratios
  '16:9' : 1920/1080,
  '16:10': 2560/1600
};

Game.prototype.defaultSettings = function () {
  this.settings['aspectRatio']            = '16:9';
  this.settings['gameState']              = 'pong';
  
  this.settings['p1-computer']            = false;
  this.settings['p2-computer']            = true;
  this.settings['p1-computer-difficulty'] = 'normal';
  this.settings['p2-computer-difficulty'] = 'easy';
};

Game.prototype.currentAspectRatio = function () {
   return Game.constants[this.settings['aspectRatio']];
};
 
Game.prototype.animate = 
  window.requestAnimationFrame        ||
  window.webkitRequestAnimationFrame  ||
  window.mozRequestAnimationFrame     ||
  window.oRequestAnimationFrame       ||
  window.msRequestAnimationFrame      ||
function (callback) { window.setTimeout(callback, 1000/60) };
  
Game.prototype.init = function () {
  this.defaultSettings();
  this.canvas.setSize(game.currentAspectRatio());
  this.canvas.storeDimensions();
  this.currentState = this.factory.giveState(this.settings['gameState']);
  this.animate.call(window, this.step);
};

Game.prototype.step = function () {
  // Can't use 'this' because it would refer to window
  game.canvas.primitive.width = game.canvas.primitive.width; // Repaint
  game.currentState.step();
  game.animate.call(window, game.step);
};

Game.prototype.resize = function () {
  this.canvas.setSize(game.currentAspectRatio());
  
  for (var obj in this.currentState.objects) {
    if ('resize' in this.currentState.objects[obj])
      this.currentState.objects[obj].resize();
  }
  
  // Should probably abstract this out somehow
  if ('computers' in this.currentState.objects)
  {
    if (game.settings['p1-computer']) this.currentState.objects['computers']['p1'].setSpeed();
    if (game.settings['p2-computer']) this.currentState.objects['computers']['p2'].setSpeed();
  }
  
  // Store dimensions for next resize
  this.canvas.storeDimensions();
};
