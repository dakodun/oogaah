// OogaahMenuControl Class...
// 
function OogaahMenuControl() {
	this.mMenuOptionBack = new Array();
	this.mMenuOptionBack[0] = new Shape();
	this.mMenuOptionBack[1] = new Shape();
	this.mMenuOptionBack[2] = new Shape();
	
	this.mMenuOptionText = new Array();
	this.mMenuOptionText[0] = new RenderCanvas();
	this.mMenuOptionText[1] = new RenderCanvas();
	this.mMenuOptionText[2] = new RenderCanvas();
	
	this.mCurrentOption = -1;
};

OogaahMenuControl.prototype.SetUp = function() {
	{
		var yOff = 460;
		for (var i = 0; i < this.mMenuOptionBack.length; ++i) {
			this.mMenuOptionBack[i].MakeRectangle(new Vec2(-80, yOff), new Vec2(nmain.game.mCanvasSize.mX + 160, 32));
			this.mMenuOptionBack[i].SetSkew(new Vec2(15, 0));
			this.mMenuOptionBack[i].mColour = "#FAF1CE";
			this.mMenuOptionBack[i].mAlpha = 0.5;
			
			this.mMenuOptionBack[i].SetMask();
			
			yOff += 40;
		}
	}
	
	{
		var arr = new Array();
		
		{
			var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
			var txt = new Text();
			txt.SetFont(fnt);
			txt.SetFontSize(28);
			txt.mAlign = "right";
			txt.mColour = "#35251C";
			txt.SetPosition(new Vec2(320, 0));
			
			txt.SetString("Play a Game");
			arr.push(new Array(txt.GetCopy()));
			
			txt.SetString("Learn to Play");
			arr.push(new Array(txt.GetCopy()));
			
			txt.SetString("Set Options");
			arr.push(new Array(txt.GetCopy()));
		}
		
		var yOff = 274;
		for (var i = 0; i < this.mMenuOptionText.length; ++i) {
			this.mMenuOptionText[i].SetSize(new Vec2(320, 36));
			this.mMenuOptionText[i].RenderTo(arr[i]);
			
			this.mMenuOptionText[i].SetPosition(new Vec2(nmain.game.mCanvasSize.mX - 40, yOff));
			this.mMenuOptionText[i].SetOrigin(new Vec2(320, 0));
			this.mMenuOptionText[i].SetSkew(new Vec2(15, 0));
			
			yOff += 40;
		}
	}
}

// handles user input
OogaahMenuControl.prototype.Input = function() {
	if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) {
		switch (this.mCurrentOption) {
			case 0 :
				nmgrs.sceneMan.RequestSceneChange(new OogaahGameScene());
				break;
			case 1 :
				nmgrs.sceneMan.RequestSceneChange(new OogaahExamplePlayScene());
				break;
			case 2 :
				nmgrs.sceneMan.RequestSceneChange(new OogaahOptionsScene());
				break;
		}
	}
}

// handles game logic
OogaahMenuControl.prototype.Process = function() {
	this.mCurrentOption = -1;
	var found = false;
	
	for (var i = 0; i < this.mMenuOptionBack.length; ++i) {
		this.mMenuOptionBack[i].mAlpha = 0.5;
		this.mMenuOptionText[i].SetScale(new Vec2(1.0, 1.0));
		
		var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		var polygon = this.mMenuOptionBack[i].mGlobalMask.GetAbsolute();
		
		if (util.PointInConvex(p, polygon) == true && found == false &&
				nmgrs.inputMan.GetMouseInCanvas() == true) {
			
			this.mCurrentOption = i;
			this.mMenuOptionBack[i].mAlpha = 1;
			this.mMenuOptionText[i].SetScale(new Vec2(1.2, 1.0));
			found = true;
		}
	}
}

//
OogaahMenuControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	for (var i = 0; i < this.mMenuOptionBack.length; ++i) {
		arr.push(this.mMenuOptionBack[i]);
	}
	
	for (var i = 0; i < this.mMenuOptionText.length; ++i) {
		arr.push(this.mMenuOptionText[i]);
	}
	
	return arr;
}
// ...End

