// OogaahTestScene Class...
// 
function OogaahTestScene() {
	this.mPersist = false;
	
	this.mBatch = new RenderBatch();
	
	this.mShape = new Shape();
};

// returns the type of this object for validity checking
OogaahTestScene.prototype.Type = function() {
	return "OogaahTestScene";
}

// initialises the scene object
OogaahTestScene.prototype.SetUp = function() {
	nmain.game.mClearColour = "#2A2330";
	
	this.mShape.MakeRectangle(new Vec2(100, 100), new Vec2(100, 40));
	this.mShape.mColour = "#FFFFFF";
	
	this.mShape.SetSkew(new Vec2(10, 10));
}

// cleans up the scene object
OogaahTestScene.prototype.TearDown = function() {
	
}

// handles user input
OogaahTestScene.prototype.Input = function() {
	
}

// handles game logic
OogaahTestScene.prototype.Process = function() {
	
}

// handles all drawing tasks
OogaahTestScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	
	arr.push(this.mShape);
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(null, null);
}
// ...End

