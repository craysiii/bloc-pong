function GameOver (paddle) {
  GameObject.call(this);
  
  this.paddle = paddle;
}

GameOver.prototype = Object.create(GameObject.prototype);
GameOver.prototype.constructor = GameOver;

GameOver.prototype.render = function () {
  game.canvas.context.fillStyle = 'white';
  game.canvas.context.textAlign = 'center';
  game.canvas.context.font      = (game.canvas.height() / 4) + 'px Courier New';
  game.canvas.context.fillText(this.paddle + ' wins!', 
    game.canvas.width() / 2, 
    game.canvas.height() / 2);
    
    
  game.canvas.context.font = (game.canvas.height() / 16) + 'px Courier New';
  console.log(game.canvas.context.font);
  game.canvas.context.fillText('Press any key to continue',
    game.canvas.width() / 2,
    game.canvas.height() * (3/4));
};