function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function setup() {

  //Create the `character` sprite
  character = PIXI.Texture.fromImage("bunny.png");
  character.y = 96;
  character.vx = 0;
  character.vy = 0;
  stage.addChild(character);

  //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40),
		//space
	  jump = keyboard(32);

  //Left arrow key `press` method
  left.press = function() {

    //Change the character's velocity when the key is pressed
    character.vx = -5;
    character.vy = 0;
  };

  //Left arrow key `release` method
  left.release = function() {

    //If the left arrow has been released, and the right arrow isn't down,
    //and the character isn't moving vertically:
    //Stop the character
    if (!right.isDown && character.vy === 0) {
      character.vx = 0;
    }
  };

  //Up
  up.press = function() {
    character.vy = -5;
    character.vx = 0;
  };
  up.release = function() {
    if (!down.isDown && character.vx === 0) {
      character.vy = 0;
    }
  };

  //Right
  right.press = function() {
    character.vx = 5;
    character.vy = 0;
  };
  right.release = function() {
    if (!left.isDown && character.vy === 0) {
      character.vx = 0;
    }
  };

  //Down
  down.press = function() {
    character.vy = 5;
    character.vx = 0;
  };
  down.release = function() {
    if (!up.isDown && character.vx === 0) {
      character.vy = 0;
    }
  };

  //Set the game state
  state = play;

  //Start the game loop
  gameLoop();
}

function gameLoop() {
  requestAnimationFrame(gameLoop);
  state();
  renderer.render(stage);
}

function play() {

  //Use the character's velocity to make it move
  character.x += character.vx;
  character.y += character.vy
}