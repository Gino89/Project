function Character() {
	var texture = PIXI.Texture.fromImage("bunny.png");
  	PIXI.Sprite.call(this, texture, 20, 32);

	this.position.x = 20;
	this.position.y = 20;
	this.y = 96;
  	this.vx = 0;
  	this.vy = 0;
}

var isJumping = false;

Character.constructor = Character;
Character.prototype = Object.create(PIXI.Sprite.prototype);

Character.prototype.Jump = function() {
	console.log("jump");
	this.position.y -= 1;
}

Character.prototype.Crouch = function() {
	console.log("crouch");
	this.vy = 5;
}

Character.prototype.onclick = function(){
	console.log("click");
}

Character.prototype.position = function(){
	this.position.y -=1;
}
function jump(){
	isJumping = true;
	main.scroller.character.position.y -=1;
	requestAnimationFrame(jump);

		//console.log("hi");
}

function fall(){
	while(main.scroller.character.position.y < 300){
		requestAnimationFrame(fall);
		//console.log("hi");
		main.scroller.character.position.y +=1;
	}
}
this.onmousedown = jump;
this.onmouseup = fall;
this.onkeydown = function() {
     if(getCode()==83){//s-Taste
		console.log("hi");
		main.scroller.character.position.y -=1;
	}
}