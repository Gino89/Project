document.write("<html>");
document.write("<head>");
document.write("<script src=\"WallSpritesPool.js\"><\/script>");
document.write("<\/head>");
document.write("<\/html>");

Main.MIN_SCROLL_SPEED = 5;
Main.MAX_SCROLL_SPEED = 15;
Main.SCROLL_ACCELERATION = 0.005;

function Main() {
  this.stage = new PIXI.Stage(0x66FF99);
  this.renderer = new PIXI.autoDetectRenderer(
    512,
    384,
    {view:document.getElementById("game-canvas")}
  );

  this.scrollSpeed = Main.MIN_SCROLL_SPEED;

  this.loadSpriteSheet();
}


Main.prototype.update = function() {
  this.scroller.moveViewportXBy(this.scrollSpeed);

  this.scrollSpeed += Main.SCROLL_ACCELERATION;
  if (this.scrollSpeed > Main.MAX_SCROLL_SPEED)
  {
    this.scrollSpeed = Main.MAX_SCROLL_SPEED;
  }

  this.renderer.render(this.stage);
  requestAnimationFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
  var assetsToLoad = ["wall.json", "bg-mid.png", 
  "bg-far.png","bunny.png"];
  loader = new PIXI.AssetLoader(assetsToLoad);
  loader.onComplete = this.spriteSheetLoaded.bind(this);
  loader.load();
};

Main.prototype.spriteSheetLoaded = function() {
  this.scroller = new Scroller(this.stage);
  requestAnimationFrame(this.update.bind(this));

};

Main.prototype.borrowWallSprites = function(num) {
  for (var i = 0; i < num; i++)
  {
    if (i % 2 == 0) {
      var sprite = this.pool.borrowWindow();
    } else {
      var sprite = this.pool.borrowDecoration();
    }

    sprite.position.x = -32 + (i * 64);
    sprite.position.y = 128;

    this.wallSlices.push(sprite);

    this.stage.addChild(sprite);
  }
};

Main.prototype.returnWallSprites = function() {
  for (var i = 0; i < this.wallSlices.length; i++)
  {
    var sprite = this.wallSlices[i];
    this.stage.removeChild(sprite);
    if (i % 2 == 0) {
      this.pool.returnWindow(sprite);
    } else {
      this.pool.returnDecoration(sprite);
    }
  }

  this.wallSlices = [];
};