// OogaahMenuControl Class...
// 
function OogaahMenuControl() {
	this.mMenuOptionIndicator = new Shape();
	this.mMenuOptions = new Array();
	this.mMenuOptions[0] = new Text();
	
	this.mCurrentOption = -1;
};

OogaahMenuControl.prototype.SetUp = function() {
	this.mMenuOptionIndicator.SetPosition(new Vec2(230, 422));
	this.mMenuOptionIndicator.AddPoint(new Vec2(8, 0));
	this.mMenuOptionIndicator.AddPoint(new Vec2(8, 8));
	this.mMenuOptionIndicator.AddPoint(new Vec2(0, 8));
	
	this.mMenuOptionIndicator.mColour = "#FFFFFF";
	this.mMenuOptionIndicator.mAbsolute = true;
	
	
	this.mMenuOptions[0].SetPosition(new Vec2(250, 410));
	
	var fnt = nmgrs.resMan.mFontStore.GetResource("poetsen");
	this.mMenuOptions[0].SetFont(fnt);
	this.mMenuOptions[0].SetFontSize(26);
	
	this.mMenuOptions[0].SetString("Start Game");
	this.mMenuOptions[0].mColour = "#FFFFFF";
	this.mMenuOptions[0].mAbsolute = true;
	
	this.mMenuOptions[0].SetMask();
}

// handles user input
OogaahMenuControl.prototype.Input = function() {
	if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) {
		if (this.mCurrentOption == 0) {
			nmgrs.sceneMan.RequestSceneChange(new OogaahGameScene());
		}
	}
}

// handles game logic
OogaahMenuControl.prototype.Process = function() {
	this.mCurrentOption = -1;
	
	for (var i = 0; i < this.mMenuOptions.length; ++i) {
		var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		
		var bounds = this.mMenuOptions[i].mGlobalMask.GetBounds();
		var tl = bounds[0];
		var br = bounds[1];
		
		if (util.PointInRectangle(p, tl, br) == true) {
			this.mCurrentOption = i;
			break;
		}
	}
}

//
OogaahMenuControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mCurrentOption >= 0) {
		arr.push(this.mMenuOptionIndicator);
	}
	
	for (var i = 0; i < this.mMenuOptions.length; ++i) {
		arr.push(this.mMenuOptions[i]);
	}
	
	return arr;
}
// ...End

