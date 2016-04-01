// Microfactory, didn't want to extend more classes
function GameStateFactory () {
  this.states = {};
}

GameStateFactory.prototype.giveState = function (name) {
  if (name in this.states)
    return this.states[name];
    
  switch (name) {      
    case 'pong':
      return this.createPongState();
    case 'p1win':
      return this.createWinState('p1');
    case 'p2win':
      return this.createWinState('p2');
  }
}

GameStateFactory.prototype.createPongState = function () {
  var pong = new GameState('pong');

  pong.addObject('ball', new Ball());
  pong.addObject('p1', new Paddle(true));
  pong.addObject('p2', new Paddle(false));
  pong.addObject('s1', new Score(pong.objects['p1']));
  pong.addObject('s2', new Score(pong.objects['p2']));
  pong.addObject('computers', {});

  pong.objects['ball'].init();
  pong.objects['p1'].init();
  pong.objects['p2'].init();

  // Set up AI for Paddle 1
  if (game.settings['p1-computer']) {
    pong.objects['computers']['p1'] = new Computer(
      pong.objects['p1'], 
      game.settings['p1-computer-difficulty']
    );
    
    pong.objects['computers']['p1'].init();
  }
  // Set up controls for Paddle 1
  else {
    pong.addListener(window, 'keydown', 
      (event) => { 
        switch (event.code) {
          case 'KeyA':
            game.currentState.objects['p1'].direction = Game.constants['UP'];
            break;
          case 'KeyZ':
            game.currentState.objects['p1'].direction = Game.constants['DOWN'];
            break;
        }
      }
    );
    
    pong.addListener(window, 'keyup',
      (event) => {
        switch (event.code) {
          case 'KeyA':
          case 'KeyZ':
            game.currentState.objects['p1'].direction = Game.constants['NONE'];
            break;
        }
      }
    );
  }

  // Set up AI for Paddle 2
  if (game.settings['p2-computer']) {
    pong.objects['computers']['p2'] = new Computer(
      pong.objects['p2'],
      game.settings['p2-computer-difficulty']
    );
    
    pong.objects['computers']['p2'].init();
  }
  // Set up controls for Paddle 2
  else {
    pong.addListener(window, 'keydown',
      (event) => {
        switch (event.code) {
          case 'KeyK':
            game.currentState.objects['p2'].direction = Game.constants['UP'];
            break;
          case 'KeyM':
            game.currentState.objects['p2'].direction = Game.constants['DOWN'];
            break;
        }
      }
    );
    
    pong.addListener(window, 'keyup',
      (event) => {
        switch (event.code) {
          case 'KeyK':
          case 'KeyM':
            game.currentState.objects['p2'].direction = Game.constants['NONE'];
        }
      }
    );
  }
  
  pong.step = function () {
    // Update AI if possible
    for (var p in this.objects['computers']) {
      this.objects['computers'][p].update(this.objects['ball']);
    }
    
    // Move paddles
    this.objects['p1'].move();
    this.objects['p2'].move();
    
    // Detect collision and move ball
    this.objects['ball'].detectCollision();
    this.objects['ball'].applyVector();
    
    // Render objects
    for (var obj in this.objects) {
      if ('render' in this.objects[obj])
        this.objects[obj].render();   
    }
  };

  return pong;
};

GameStateFactory.prototype.createWinState = function (paddle) {
  var win = new GameState('win');
  
  // Add singular gameover object
  win.addObject('gameover', new GameOver(paddle));
  
  // Add listener
  win.addListener(window, 'keypress',
    (event) => {
      game.switchState('pong');
    }
  );
    
  // Step
  win.step = function () {
    for (var obj in this.objects) {
      if ('render' in this.objects[obj])
        this.objects[obj].render();   
    }
  }
  
  return win;
};