function init(){
	stage = new PIXI.Stage(0x66FF99);
	renderer = PIXI.autoDetectRenderer
	(
		512,
    	384,
    	{view:document.getElementById("game-canvas")}
  	);
	
	//Far Layer
	far = new Far();
	stage.addChild(far);

	//Middle Layer

  	mid = new Mid();
 	stage.addChild(mid);

	requestAnimationFrame(update);
}

function update(){
	far.update();
	mid.update();

	renderer.render(stage);

  	requestAnimationFrame(update);
}