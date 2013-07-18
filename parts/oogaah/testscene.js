// OogaahTestScene Class...
// 
function OogaahTestScene() {
	this.mPersist = false;
	
	this.mBatch = new RenderBatch();
	
	this.mSprite = new Sprite();
	this.mShape = new Shape();
	this.mShapeLine = new Shape();
	
	this.mSpriteB = new Sprite();
	this.mShapeB = new Shape();
	this.mShapeLineB = new Shape();
};

// returns the type of this object for validity checking
OogaahTestScene.prototype.Type = function() {
	return "OogaahTestScene";
}

// initialises the scene object
OogaahTestScene.prototype.SetUp = function() {
	nmain.game.mClearColour = "#2A2330";
	
	{
		var pos = new Vec2(100, 100);
		
		this.mShape.SetPosition(new Vec2(pos.mX + 120, pos.mY));
		this.mShape.SetOrigin(new Vec2(40, 40));
		this.mShape.AddPoint(new Vec2(0, 171));
		this.mShape.AddPoint(new Vec2(-120, 171));
		
		this.mShape.AddPoint(new Vec2(-80, 95));
		this.mShape.AddPoint(new Vec2(-60, 85)); // mid
		this.mShape.AddPoint(new Vec2(-40, 75));
		
		/* this.mShapeLine.SetPosition(new Vec2(110, 258));
		this.mShapeLine.AddPoint(new Vec2(34, -50));
		this.mShapeLine.AddPoint(new Vec2(32, -70));
		this.mShapeLine.AddPoint(new Vec2(69, -76));
		this.mShapeLine.AddPoint(new Vec2(67, -99));
		this.mShapeLine.AddPoint(new Vec2(100, -148));
		this.mShapeLine.mLineWidth = 4;
		this.mShapeLine.mRenderStyle = "Line"
		this.mShapeLine.mColour = "#FAF1CE"; */
		
		var tex = nmgrs.resMan.mTexStore.GetResource("cardsMedium");
		this.mSprite.SetTexture(tex, 13, 5);
		this.mSprite.SetCurrentFrame(12);
		this.mSprite.SetPosition(new Vec2(pos.mX, pos.mY));
		
		var spr = this.mSprite.GetCopy();
		spr.SetCurrentFrame(5);
		spr.SetPosition(new Vec2(-120, 0));
		
		this.mShape.mSprite = spr;
	}
	
	{
		var pos = new Vec2(300, 100);
		
		this.mShapeB.SetPosition(new Vec2(pos.mX + 72, pos.mY));
		this.mShapeB.AddPoint(new Vec2(0, 103));
		this.mShapeB.AddPoint(new Vec2(-72, 103));
		
		this.mShapeB.AddPoint(new Vec2(-50, 59));
		this.mShapeB.AddPoint(new Vec2(-36, 51)); // mid
		this.mShapeB.AddPoint(new Vec2(-22, 43));
		
		/* this.mShapeLineB.SetPosition(new Vec2(310, 258));
		this.mShapeLineB.AddPoint(new Vec2(34, -50));
		this.mShapeLineB.AddPoint(new Vec2(32, -70));
		this.mShapeLineB.AddPoint(new Vec2(69, -76));
		this.mShapeLineB.AddPoint(new Vec2(67, -99));
		this.mShapeLineB.AddPoint(new Vec2(100, -148));
		this.mShapeLineB.mLineWidth = 4;
		this.mShapeLineB.mRenderStyle = "Line"
		this.mShapeLineB.mColour = "#FAF1CE"; */
		
		var tex = nmgrs.resMan.mTexStore.GetResource("cardsSmall");
		this.mSpriteB.SetTexture(tex, 13, 5);
		this.mSpriteB.SetCurrentFrame(12);
		this.mSpriteB.SetPosition(new Vec2(pos.mX, pos.mY));
		
		var spr = this.mSpriteB.GetCopy();
		spr.SetCurrentFrame(5);
		spr.SetPosition(new Vec2(-72, 0));
		
		this.mShapeB.mSprite = spr;
	}
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
	
	arr.push(this.mSprite);
	arr.push(this.mShape);
	// arr.push(this.mShapeLine);
	
	arr.push(this.mSpriteB);
	arr.push(this.mShapeB);
	// arr.push(this.mShapeLineB);
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(this.mCamera, null);
}
// ...End

