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
  console.log(this.listeners);
  for (var listener in this.listeners) {
    var obj = this.listeners[listener];
    obj.target.removeEventListener(obj.type, obj.listener);
  }
};

GameState.prototype.step = function () {
  throw 'Error for GameState(' + this.name +  '): step method not implemented.';
};