function GameState (name) {
  this.name      = name;
  
  this.objects   = {};
  this.listeners = [];
}

GameState.prototype.addObject = function (key, gameObject) {
  this.objects[key] = gameObject;
};

GameState.prototype.addListener = function (target, type, listener) {
  this.listeners.push({
    target  : target,
    type    : type,
    listener: listener
  });
  
  target.addEventListener(type, listener);
};

GameState.prototype.destroy = function () {  
  // Don't want lingering listeners
  for (var listener in this.listeners) {
    listener.target.removeEventListener(listener.type, listener.listener);
  }
};

GameState.prototype.step = function () {
  throw 'Error for GameState(' + this.name +  '): step method not implemented.';
};