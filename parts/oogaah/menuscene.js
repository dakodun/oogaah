// OogaahMenuScene Class...
// 
function OogaahMenuScene() {
	this.mPersist = false;
	
	this.mBatch = new RenderBatch();
	
	this.mBackColour = new Shape();
	this.mMenuControl = new OogaahMenuControl();
	
	this.mLogo = new Sprite();
};

// returns the type of this object for validity checking
OogaahMenuScene.prototype.Type = function() {
	return "OogaahMenuScene";
}

// initialises the scene object
OogaahMenuScene.prototype.SetUp = function() {
	nmain.game.mClearColour = "#FAF1CE";
	
	{
		this.mBackColour.SetPosition(new Vec2(2, 2));
		this.mBackColour.AddPoint(new Vec2(636,   0));
		this.mBackColour.AddPoint(new Vec2(636, 476));
		this.mBackColour.AddPoint(new Vec2(  0, 476));
		this.mBackColour.mAbsolute = true;
		this.mBackColour.mDepth = 99999;
		this.mBackColour.mColour = "#35251C";
	}
	
	this.mMenuControl.SetUp();
	
	var tex = nmgrs.resMan.mTexStore.GetResource("menuLogo");
	this.mLogo.SetTexture(tex);
	this.mLogo.SetPosition(new Vec2(10, 10));
}

// cleans up the scene object
OogaahMenuScene.prototype.TearDown = function() {
	
}

// handles user input
OogaahMenuScene.prototype.Input = function() {
	this.mMenuControl.Input();
}

// handles game logic
OogaahMenuScene.prototype.Process = function() {
	this.mMenuControl.Process();
}

// handles all drawing tasks
OogaahMenuScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	
	arr.push(this.mBackColour);
	arr.push(this.mLogo);
	
	arr = util.ConcatArray(arr, this.mMenuControl.GetRenderData());
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(null, null);
}
// ...End

