// OogaahMenuOption Class...
// 
function OogaahMenuOption() {
	this.mBack = new Shape();
	this.mText = new RenderCanvas();
};

OogaahMenuOption.prototype.SetString = function(string) {
	this.mText.Clear();
	
	var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
	var txt = new Text();
	txt.SetFont(fnt);
	txt.SetFontSize(28);
	txt.mAlign = "right";
	txt.mColour = "#35251C";
	txt.SetPosition(new Vec2(320, 0));
	
	txt.SetString(string);
	
	var arr = new Array(txt);
	this.mText.RenderTo(arr);
}
// ...End


// OogaahMenuControl Class...
// 
function OogaahMenuControl() {
	this.mMenuOptions = new Array();
	this.mMenuOptions[0] = new OogaahMenuOption();
	this.mMenuOptions[1] = new OogaahMenuOption();
	this.mMenuOptions[2] = new OogaahMenuOption();
	this.mMenuOptions[3] = new OogaahMenuOption();
	this.mMenuOptions[4] = new OogaahMenuOption();
	
	this.mCurrentOption = -1;
	this.mOptionsAnimState = "out";
	this.mMode = 0;
	this.mSetup = true;
};

OogaahMenuControl.prototype.SetUp = function() {
	{
		var yOff = 420;
		
		for (var i = 0; i < this.mMenuOptions.length; ++i) {
			this.mMenuOptions[i].mBack.MakeRectangle(new Vec2(-80, yOff), new Vec2(80, 32));
			this.mMenuOptions[i].mBack.SetSkew(new Vec2(15, 0));
			this.mMenuOptions[i].mBack.mColour = "#FAF1CE";
			this.mMenuOptions[i].mBack.mAlpha = 0.5;
			
			yOff += 40;
		}
	}
	
	{	
		var yOff = 234;
		for (var i = 0; i < this.mMenuOptions.length; ++i) {
			this.mMenuOptions[i].mText.SetSize(new Vec2(320, 36));
			
			this.mMenuOptions[i].mText.SetPosition(new Vec2(nmain.game.mCanvasSize.mX - 40, yOff));
			this.mMenuOptions[i].mText.SetOrigin(new Vec2(320, 0));
			this.mMenuOptions[i].mText.SetSkew(new Vec2(15, 0));
			
			this.mMenuOptions[i].mText.mAlpha = 0.0;
			
			yOff += 40;
		}
		
		this.mMenuOptions[0].SetString("Play a Game");
		this.mMenuOptions[1].SetString("Learn to Play");
		this.mMenuOptions[2].SetString("-");// Set Options");
		this.mMenuOptions[3].SetString("");
		this.mMenuOptions[4].SetString("");
	}
	
	this.mMenuOptions[3].mBack.mRenderStyle = "LineLoop";
	this.mMenuOptions[4].mBack.mRenderStyle = "LineLoop";
	this.mOptionsAnimState = "animIn";
}

// handles user input
OogaahMenuControl.prototype.Input = function() {
	if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.Q) == true) {
		if (this.mOptionsAnimState == "out") {
			this.mOptionsAnimState = "animIn";
		}
	}
	
	if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) {
		switch (this.mCurrentOption) {
			case 0 :
				if (this.mMode == 0) {
					nmgrs.sceneMan.RequestSceneChange(new OogaahGameScene());
				}
				else if (this.mMode == 2) {
					// nmgrs.sceneMan.RequestSceneChange(new OogaahTutorialScene());
				}
				
				break;
			case 1 :
				if (this.mMode == 0) {
					this.mMode = 2;
					this.mSetup = false;
					this.mOptionsAnimState = "animOut";
				}
				else if (this.mMode == 2) {
					// nmgrs.sceneMan.RequestSceneChange(new OogaahTutorialScene());
				}
				
				break;
			case 2 :
				if (this.mMode == 0) {
					// nmgrs.sceneMan.RequestSceneChange(new OogaahOptionsScene());
				}
				else if (this.mMode == 2) {
					// nmgrs.sceneMan.RequestSceneChange(new OogaahTutorialScene());
				}
				
				break;
			case 3 :
				if (this.mMode == 2) {
					nmgrs.sceneMan.RequestSceneChange(new OogaahTutorialScene());
					nmgrs.sceneMan.mReadyScene.mTutorialContent = new OogaahTutorialMessageContent4();
				}
				
				break;
			case 4 :
				if (this.mMode == 2) {
					this.mMode = 0;
					this.mSetup = false;
					this.mOptionsAnimState = "animOut";
				}
				
				break;
		}
	}
}

// handles game logic
OogaahMenuControl.prototype.Process = function() {
	this.mCurrentOption = -1;
	
	if (this.mOptionsAnimState == "in") { // if menu has fully loaded
		var found = false;
		
		for (var i = 0; i < this.mMenuOptions.length; ++i) {
			this.mMenuOptions[i].mBack.mAlpha = 0.5;
			this.mMenuOptions[i].mText.SetScale(new Vec2(1.0, 1.0));
			
			if (this.mMenuOptions[i].mBack.mRenderStyle == "Fill") {
				var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords());
				var polygon = this.mMenuOptions[i].mBack.mGlobalMask.GetAbsolute();
				
				if (util.PointInConvex(p, polygon) == true && found == false &&
						nmgrs.inputMan.GetMouseInCanvas() == true) {
					
					this.mCurrentOption = i;
					this.mMenuOptions[i].mBack.mAlpha = 1;
					this.mMenuOptions[i].mText.SetScale(new Vec2(1.2, 1.0));
					found = true;
				}
			}
		}
	}
	else if (this.mOptionsAnimState == "out") { // 
		if (this.mSetup == false) {
			switch (this.mMode) {
				case 0 :
					this.mMenuOptions[3].mBack.mRenderStyle = "LineLoop";
					this.mMenuOptions[4].mBack.mRenderStyle = "LineLoop";
					
					this.mMenuOptions[0].SetString("Play a Game");
					this.mMenuOptions[1].SetString("Learn to Play");
					this.mMenuOptions[2].SetString("-");// Set Options");
					this.mMenuOptions[3].SetString("");
					this.mMenuOptions[4].SetString("");
					
					this.mSetup = true;
					this.mOptionsAnimState = "animIn";
					break;
				case 2 :
					this.mMenuOptions[3].mBack.mRenderStyle = "Fill";
					this.mMenuOptions[4].mBack.mRenderStyle = "Fill";
					
					this.mMenuOptions[0].SetString("-");// Learn the Basic Game Rules");
					this.mMenuOptions[1].SetString("-");// Learn the Screen Layout");
					this.mMenuOptions[2].SetString("-");// Learn the Card Abilities");
					this.mMenuOptions[3].SetString("Play an Example Round");
					this.mMenuOptions[4].SetString("Go Back");
					
					this.mSetup = true;
					this.mOptionsAnimState = "animIn";
					break;
			}
		}
	}
	else { // otherwise we're still loading menu
		if (this.mOptionsAnimState == "animIn") {
			for (var i = 0; i < this.mMenuOptions.length; ++i) {
				// if the first menu option back shape has not yet fully animated
				if (this.mMenuOptions[i].mBack.mPoints[0].mX < nmain.game.mCanvasSize.mX + 160) {
					var animate = false; // should we animate
					if (i > 0) { // if we are not on the first element
						// if the previous element has breached a certain point
						if (this.mMenuOptions[i - 1].mBack.mPoints[0].mX > 144) {
							animate = true; // we should animated
						}
					}
					
					if (i == 0 || animate == true) { // if we are on the first element or should animate
						var shp = this.mMenuOptions[i].mBack; // reference the back shape
						shp.MakeRectangle(shp.mPos, new Vec2(shp.mSize.mX + 16, shp.mSize.mY)); // increase the length of the shape
					}
				}
				else { // otherwise it has fully loaded
					if (this.mMenuOptions[i].mText.mAlpha < 1.0) { // if the text is not yet fully opaque
						this.mMenuOptions[i].mText.mAlpha += 0.1; // increase the alpha value
					}
					else { // otherwise text is fully opaque
						this.mMenuOptions[i].mBack.SetMask(); // so set the collision mask (for user interaction)
						
						if (i == this.mMenuOptions.length - 1) { // if this was the last option
							this.mOptionsAnimState = "in"; // once last shape is fully loaded, we are done
						}
					}
				}
			}
		}
		else if (this.mOptionsAnimState == "animOut") {
			for (var i = this.mMenuOptions.length - 1; i >= 0; --i) {
				if (this.mMenuOptions[i].mText.mAlpha > 0.0) { // if the text is not yet fully transparent
					var animate = false; // should we animate
					if (i < this.mMenuOptions.length - 1) { // if we are not on the last element
						// if the next element has breached a certain alpha value
						if (this.mMenuOptions[i + 1].mText.mAlpha == 0.0) {
							animate = true; // we should animated
						}
					}
					
					if (i == this.mMenuOptions.length - 1 || animate == true) {
						this.mMenuOptions[i].mText.mAlpha -= 0.2; // decrease the alpha value
						if (this.mMenuOptions[i].mText.mAlpha < 0.0) {
							this.mMenuOptions[i].mText.mAlpha = 0.0;
						}
					}
				}
				else { // otherwise text is fully transparent
					if (this.mMenuOptions[i].mBack.mPoints[0].mX > 80) {
						var shp = this.mMenuOptions[i].mBack; // reference the back shape
						shp.MakeRectangle(shp.mPos, new Vec2(shp.mSize.mX - 16, shp.mSize.mY)); // increase the length of the shape
					}
					else { // otherwise 
						this.mMenuOptions[i].mBack.SetMask(); // so set the collision mask (for user interaction)
						this.mMenuOptions[i].mBack.mAlpha = 0.5;
						this.mMenuOptions[i].mText.SetScale(new Vec2(1.0, 1.0));
						
						if (i == 0) { // if this was the first option
							this.mOptionsAnimState = "out"; // once last shape is fully loaded, we are done
						}
					}
				}
			}
		}
	}
}

//
OogaahMenuControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	for (var i = 0; i < this.mMenuOptions.length; ++i) {
		arr.push(this.mMenuOptions[i].mBack);
		
		if (this.mMenuOptions[i].mBack.mRenderStyle == "Fill") {
			arr.push(this.mMenuOptions[i].mText);
		}
	}
	
	return arr;
}

// options in
// options out
// set option text and function (onclick)

// ...End

