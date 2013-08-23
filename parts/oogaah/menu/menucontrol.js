// OogaahMenuOption Class...
// an interactable option in the main menu
function OogaahMenuOption() {
	this.mBack = new Shape(); // the option's back shape (and interactable mask)
	this.mText = new RenderCanvas(); // the option's text (a render canvas with text rendered to it for cleaner scaling)
	
	this.mString = ""; // the current string
	this.mShow = true; // should the option be visible
	
	this.mHighlighted = false; // is the option currently highlighted
	
	this.mAnimatedStatus = false; // has this option fully animated
};

// sets the state of the option
OogaahMenuOption.prototype.SetState = function(renderstyle, string, visibility) {
	this.mBack.mRenderStyle = renderstyle; // set the render style (and by consequence, the active state)
	this.SetString(string); // set the string
	this.mShow = visibility; // set the visibility
}

// sets the highlight state of the option
OogaahMenuOption.prototype.SetHighlight = function(highlighted) {
	if (this.mHighlighted != highlighted) { // if supplied state is different from current
		if (highlighted == true) { // if we are to highlight the option
			this.mBack.mAlpha = 1; // set the alpha to fully opaque
			this.mText.SetScale(new Vec2(1.2, 1.0)); // set the scale of the text
		}
		else { // otherwise we are to unhighlight it
			this.mBack.mAlpha = 0.5; // set the alpha
			this.mText.SetScale(new Vec2(1.0, 1.0)); // set the text scale to normal
		}
		
		this.mHighlighted = highlighted; // update the highlight state
	}
}

// sets the string of the menu option
OogaahMenuOption.prototype.SetString = function(string) {
	if (string != null) {
		if (this.mString != string) {
			this.mText.Clear(); // clear the current text
			
			// setup the text object
			var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
			var txt = new Text();
			txt.SetFont(fnt);
			txt.SetFontSize(28);
			txt.mAlign = "right";
			txt.mColour = "#35251C";
			txt.SetPosition(new Vec2(320, 0));
			
			txt.SetString(string); // set the string of the text object
			
			var arr = new Array(txt); // add it to an array
			this.mText.RenderTo(arr); // render it to the canvas
			this.mString = string; // update the current string
		}
	}
}
// ...End


// OogaahMenuControl Class...
// handles the main menu logic and rendering
function OogaahMenuControl() {
	// menu options, top to bottom
	this.mMenuOptions = new Array();
	this.mMenuOptions[0] = new OogaahMenuOption();
	this.mMenuOptions[1] = new OogaahMenuOption();
	this.mMenuOptions[2] = new OogaahMenuOption();
	this.mMenuOptions[3] = new OogaahMenuOption();
	this.mMenuOptions[4] = new OogaahMenuOption();
	
	this.mCurrentOption = -1; // the current highlighted option id (-1 is none)
	this.mMode = "mainMenu"; // the current menu mode
	this.mSubMode = "none"; // and the current submode
	
	this.mOptionsAnimState = "out"; // the current state of the menu (in terms of animation)
	this.mAnimatedCount = 0; // the count of options fully animated
};

// set up the menu control
OogaahMenuControl.prototype.SetUp = function() {
	{ // position the options back shape
		var yOff = 420; // the initial y-offset
		
		for (var i = 0; i < this.mMenuOptions.length; ++i) { // for all options
			// make a rectangle shape and set its attributes
			this.mMenuOptions[i].mBack.MakeRectangle(new Vec2(-80, yOff), new Vec2(80, 32));
			this.mMenuOptions[i].mBack.SetSkew(new Vec2(15, 0));
			this.mMenuOptions[i].mBack.mColour = "#FAF1CE";
			this.mMenuOptions[i].mBack.mAlpha = 0.5;
			
			yOff += 40; // increment the y-offset
		}
	}
	
	{ // position the options text
		var yOff = 234; // the initial y-offset
		
		for (var i = 0; i < this.mMenuOptions.length; ++i) { // for all options
			// set the render canvas attributes
			this.mMenuOptions[i].mText.SetSize(new Vec2(320, 36));
			this.mMenuOptions[i].mText.SetPosition(new Vec2(nmain.game.mCanvasSize.mX - 40, yOff));
			this.mMenuOptions[i].mText.SetOrigin(new Vec2(320, 0));
			this.mMenuOptions[i].mText.SetSkew(new Vec2(15, 0));
			
			this.mMenuOptions[i].mText.mAlpha = 0.0; // intially canvas is invisible
			
			yOff += 40; // increment the y-offset
		}
	}
	
	this.mOptionsAnimState = "out"; // set initial animation state to 'out' (fully unloaded)
}

// handles user input
OogaahMenuControl.prototype.Input = function() {
	if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if the left mouse button is clicked
		switch (this.mCurrentOption) { // depending on the current highlight option
			case 0 : // option 0 (top)
				if (this.mMode == "mainMenu") { // if we are in "main menu"
					this.mMode = "gameStart"; // go to "game start"
					this.mOptionsAnimState = "animOut";
				}
				break;
			case 1 :
				if (this.mMode == "mainMenu") { // if we are in "main menu"
					this.mMode = "selectTutorial"; // go to "select tutorial"
					this.mOptionsAnimState = "animOut";
				}
				break;
			case 2 :
				if (this.mMode == "selectTutorial") { // if we are in "select tutorial"
					this.mSubMode = "selectCard"; // go to "select card" submode
					this.mOptionsAnimState = "animOut";
				}
				
				break;
			case 3 :
				if (this.mMode == "selectTutorial") { // if we are in "select tutorial"
					this.mSubMode = "exampleHand"; // go to "example hand" submode
					this.mOptionsAnimState = "animOut";
				}
				
				break;
			case 4 : // option 4 (bottom)
				if (this.mMode == "selectTutorial") { // if we are in "select tutorial"
					if (this.mSubMode == "none") { // if we aren't in a submode
						this.mMode = "mainMenu"; // return to "main menu"
						this.mOptionsAnimState = "animOut";
					}
					else if (this.mSubMode == "selectCard") { // otherwise if we are in "select card" submode
						this.mSubMode = "none"; // reset to no submode
						this.mOptionsAnimState = "animOut";
					}
				}
				
				break;
		}
	}
}

// handles game logic
OogaahMenuControl.prototype.Process = function() {
	this.mCurrentOption = -1; // reset the current option
	
	if (this.mOptionsAnimState == "in") { // if menu has fully loaded
		for (var i = 0; i < this.mMenuOptions.length; ++i) { // for all options
			var state = false; // the highlight state of the option (false initially - not highlighted)
			
			if (this.mCurrentOption == -1) { // if we're not highlighting anything else
				// if the render style is filled (i.e., selectable) and the mouse is inside the canvas
				if (this.mMenuOptions[i].mBack.mRenderStyle == "Fill" && nmgrs.inputMan.GetMouseInCanvas() == true) {
					var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get mouse position
					var polygon = this.mMenuOptions[i].mBack.mGlobalMask.GetAbsolute(); // get mask of option box
					
					// if the mouse is inside the mask
					if (util.PointInConvex(p, polygon) == true ) {
						this.mCurrentOption = i; // set the current option
						state = true; // the option is highlighted
					}
				}
			}
			
			this.mMenuOptions[i].SetHighlight(state); // set the highlighted state of the option
		}
	}
	else if (this.mOptionsAnimState == "out") { // otherwise if menu has fully unloaded
		this.SwitchModes(); // switch modes
	}
	else { // otherwise we're still loading menu
		this.AnimateMenu(); // animate the menu
	}
}

// renders the menu
OogaahMenuControl.prototype.GetRenderData = function() {
	var arr = new Array(); // an array of renderables relating to the menu
	
	for (var i = 0; i < this.mMenuOptions.length; ++i) { // for all options
		if (this.mMenuOptions[i].mShow == true) { // if the option is visible
			arr.push(this.mMenuOptions[i].mBack); // add its back shape
			
			if (this.mMenuOptions[i].mBack.mRenderStyle == "Fill") { // if the option is interactable
				arr.push(this.mMenuOptions[i].mText); // return its text render canvas
			}
		}
	}
	
	return arr; // return the menu renderables
}

// switches modes after the menu has fully unloaded (is not visible)
OogaahMenuControl.prototype.SwitchModes = function() {
	switch (this.mMode) { // depending on the current mode
		case "mainMenu" : // main menu mode - the default state
			this.mMenuOptions[0].SetState("Fill", "Play a Game", true);
			this.mMenuOptions[1].SetState("Fill", "Learn to Play", true);
			this.mMenuOptions[2].SetState("Fill", "-", true); // Set Options
			this.mMenuOptions[3].SetState("LineLoop", "", true);
			this.mMenuOptions[4].SetState("LineLoop", "", true);
			
			this.mOptionsAnimState = "animIn"; // set the animation state
			break;
		case "gameStart" :
			nmgrs.sceneMan.RequestSceneChange(new OogaahGameScene());
			
			break;
		case "selectTutorial" :
			if (this.mSubMode == "none") {
				this.mMenuOptions[0].SetState("Fill", "-", true); // Learn the Basic Game Rules
				this.mMenuOptions[1].SetState("Fill", "-", true); // Learn the Screen Layout
				this.mMenuOptions[2].SetState("Fill", "Learn the Card Abilities", true);
				this.mMenuOptions[3].SetState("Fill", "Play an Example Round", true);
				this.mMenuOptions[4].SetState("Fill", "Back", true);
				
				this.mOptionsAnimState = "animIn";
			}
			else if (this.mSubMode == "selectCard") { // if we are in "select card" sub mode
				this.mMenuOptions[0].SetState("LineLoop", null, false);
				this.mMenuOptions[1].SetState("LineLoop", null, false);
				this.mMenuOptions[2].SetState("LineLoop", null, false);
				this.mMenuOptions[3].SetState("LineLoop", null, false);
				this.mMenuOptions[4].SetState("Fill", "Back", true);
				
				this.mOptionsAnimState = "animIn";
			}
			else if (this.mSubMode == "exampleHand") { // if we are in "example hand" sub mode
				nmgrs.sceneMan.RequestSceneChange(new OogaahTutorialScene());
				nmgrs.sceneMan.mReadyScene.mTutorialContent = new OogaahTutorialMessageContent4();
			}
			
			break;
	}
}

// controls all logic related to animating the menu in and out
OogaahMenuControl.prototype.AnimateMenu = function() {
	if (this.mOptionsAnimState == "animIn") { // if menu is loading 'in'
		for (var i = 0; i < this.mMenuOptions.length; ++i) { // for all options
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
					if (this.mMenuOptions[i].mShow == false) { // if the option is not to be drawn
						// fully animate it immediately
						var shp = this.mMenuOptions[i].mBack;
						shp.MakeRectangle(shp.mPos, new Vec2(nmain.game.mCanvasSize.mX + 160, shp.mSize.mY));
					}
					else { // otherwise it is shown
						var shp = this.mMenuOptions[i].mBack; // reference the back shape
						shp.MakeRectangle(shp.mPos, new Vec2(shp.mSize.mX + 16, shp.mSize.mY)); // increase the length of the shape
					}
				}
			}
			else { // otherwise it has fully loaded
				if (this.mMenuOptions[i].mText.mAlpha < 1.0) { // if the text is not yet fully opaque
					if (this.mMenuOptions[i].mShow == false) { // if the option is not to be drawn
						this.mMenuOptions[i].mText.mAlpha = 1.0; // fully animate it immediately
					}
					else { // otherwise it is shown
						this.mMenuOptions[i].mText.mAlpha += 0.1; // increase the alpha value
					}
				}
				else { // otherwise text is fully opaque
					// if option has yet to be fully animated
					if (this.mMenuOptions[i].mAnimatedStatus != true) {
						this.mMenuOptions[i].mBack.SetMask(); // so set the collision mask (for user interaction)
						
						this.mMenuOptions[i].mAnimatedStatus = true; // set option as fully animated
						++this.mAnimatedCount; // increment the count
					}
					
					if (this.mAnimatedCount == this.mMenuOptions.length) { // if all items are loaded
						this.mOptionsAnimState = "in"; // once last shape is fully loaded, we are done
						
						this.AnimateMenuResetStatus(); // reset the animated status
					}
				}
			}
		}
	}
	else if (this.mOptionsAnimState == "animOut") { // otherwise if menu is loading 'out'
		for (var i = this.mMenuOptions.length - 1; i >= 0; --i) { // for all shapes
			if (this.mMenuOptions[i].mText.mAlpha > 0.0) { // if the text is not yet fully transparent
				var animate = false; // should we animate
				if (i < this.mMenuOptions.length - 1) { // if we are not on the last element
					// if the next element has breached a certain alpha value
					if (this.mMenuOptions[i + 1].mText.mAlpha == 0.0) {
						animate = true; // we should animated
					}
				}
				
				if (i == this.mMenuOptions.length - 1 || animate == true) {
					if (this.mMenuOptions[i].mShow == false) { // if the option is not to be drawn
						this.mMenuOptions[i].mText.mAlpha = 0.0; // fully animate it immediately
					}
					else { // otherwise it is shown
						this.mMenuOptions[i].mText.mAlpha -= 0.2; // decrease the alpha value
						if (this.mMenuOptions[i].mText.mAlpha < 0.0) {
							this.mMenuOptions[i].mText.mAlpha = 0.0;
						}
					}
				}
			}
			else { // otherwise text is fully transparent
				if (this.mMenuOptions[i].mBack.mPoints[0].mX > 80) {
					if (this.mMenuOptions[i].mShow == false) { // if the option is not to be drawn
						// fully animate it immediately
						var shp = this.mMenuOptions[i].mBack;
						shp.MakeRectangle(shp.mPos, new Vec2(80, shp.mSize.mY));
					}
					else { // otherwise it is shown
						var shp = this.mMenuOptions[i].mBack; // reference the back shape
						shp.MakeRectangle(shp.mPos, new Vec2(shp.mSize.mX - 16, shp.mSize.mY)); // increase the length of the shape
					}
				}
				else { // otherwise 
					// if option has yet to be fully animated
					if (this.mMenuOptions[i].mAnimatedStatus != true) {
						this.mMenuOptions[i].mBack.SetMask(); // so set the collision mask (for user interaction)
						this.mMenuOptions[i].mBack.mAlpha = 0.5;
						this.mMenuOptions[i].mText.SetScale(new Vec2(1.0, 1.0));
						
						this.mMenuOptions[i].mAnimatedStatus = true; // set option as fully animated
						++this.mAnimatedCount; // increment the count
					}
					
					if (this.mAnimatedCount == this.mMenuOptions.length) { // if all items are loaded
						this.mOptionsAnimState = "out"; // once last shape is fully loaded, we are done
						
						this.AnimateMenuResetStatus(); // reset the animated status
					}
				}
			}
		}
	}
}

// resets the animated status of all options
OogaahMenuControl.prototype.AnimateMenuResetStatus = function() {
	for (var i = 0; i < this.mMenuOptions.length; ++i) { // for all options
		this.mMenuOptions[i].mAnimatedStatus = false; // reset animated status
	}
	
	this.mAnimatedCount = 0; // reset animated count
}
// ...End

