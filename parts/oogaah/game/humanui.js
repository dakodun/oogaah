// OogaahHumanUI class
// 
function OogaahHumanUI() {
	this.mHuman = null; // reference to the human that this ui belongs to
	
	this.mFade = false;
	this.mFadeShape = new Shape();
	this.mFadeText = new Text();
	
	this.mShowMessage = false;
	this.mMessageShape = new Shape();
	this.mMessageText = new Text();
	
	this.mButtons = new Array(); // main buttons
	this.mButtons[0] = new GUIButton(); // play
	this.mButtons[1] = new GUIButton(); // pass
	this.mButtons[2] = new GUIButton(); // help
	this.mButtons[3] = new GUIButton(); // options
	
	this.mButtonCovers = new Array(); // additional button graphics
	this.mButtonCovers[0] = new GUIButton();
	this.mButtonCovers[1] = new GUIButton();
	this.mButtonCovers[2] = new GUIButton();
	this.mButtonCovers[3] = new GUIButton();
	
	this.mButtonText = new Array(); // button text
	this.mButtonText[0] = new Text();
	this.mButtonText[1] = new Text();
	this.mButtonText[2] = new Text();
	this.mButtonText[3] = new Text();
	
	this.mDisplayShape = new Shape();
	this.mDisplayCard = null;
	
	// this.mButtonHoverID = -1; // the current gui element being hovered over (that has a tooltip associated with it)
	// this.mTooltip = new GUITooltip(); // the tooltip gui element shown when hovering over certain gui elements
};

// initialise the gui (owner [OogaahHuman])
OogaahHumanUI.prototype.SetUp = function(owner) {
	this.mHuman = owner; // store the reference to the human this gui belongs to
	
	{
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		
		this.mFadeShape.SetPosition(new Vec2(0, 0));
		this.mFadeShape.AddPoint(new Vec2(nmain.game.mCanvasSize.mX, 0));
		this.mFadeShape.AddPoint(nmain.game.mCanvasSize);
		this.mFadeShape.AddPoint(new Vec2(0, nmain.game.mCanvasSize.mY));
		this.mFadeShape.mAbsolute = true;
		this.mFadeShape.mDepth = -100;
		this.mFadeShape.mColour = "#000000";
		this.mFadeShape.mAlpha = 0.75;
		
		this.mFadeText.SetFont(fnt);
		this.mFadeText.SetFontSize(26);
		this.mFadeText.SetPosition(new Vec2(nmain.game.mCanvasSize.mX / 2, 40));
		this.mFadeText.mAbsolute = true;
		this.mFadeText.mDepth = -101;
		this.mFadeText.mColour = "#FFFFFF";
		this.mFadeText.mAlign = "centre";
		this.mFadeText.SetString("");
	}
	
	{
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		
		this.mMessageShape.MakeRectangle(new Vec2(2, 60), new Vec2(nmain.game.mCanvasSize.mX - 4, + 36));
		this.mMessageShape.mDepth = -10;
		this.mMessageShape.mAlpha = 0.5;
		this.mMessageShape.mColour = "#000000";
		
		this.mMessageText.SetFont(fnt);
		this.mMessageText.SetFontSize(13);
		this.mMessageText.SetPosition(new Vec2(nmain.game.mCanvasSize.mX / 2, 69));
		this.mMessageText.mAbsolute = true;
		this.mMessageText.mDepth = -11;
		this.mMessageText.mColour = "#FFFFFF";
		this.mMessageText.mAlign = "centre";
		this.mMessageText.SetString("");
	}
	
	{
		// textures for ui buttons and font for button text
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		var texLarge = nmgrs.resMan.mTextureStore.GetResource("buttonLarge");
		var texSmall = nmgrs.resMan.mTextureStore.GetResource("buttonSmall");
		
		{ // play button
			var pos = new Vec2(506, 412); // button position
			
			// set up the button and assign textures to sprites
			this.mButtons[0].SetUp(pos, new Vec2(109, 29), 0);
			this.mButtons[0].mSpriteIdle.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[0].mSpriteIdle.SetCurrentFrame(0);
			this.mButtons[0].mSpriteHover.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[0].mSpriteHover.SetCurrentFrame(2);
			this.mButtons[0].mSpriteDown.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[0].mSpriteDown.SetCurrentFrame(4);
			this.mButtons[0].mSpriteInactive.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[0].mSpriteInactive.SetCurrentFrame(6);
			
			// set up the button text
			this.mButtonText[0].SetFont(fnt);
			this.mButtonText[0].SetFontSize(19);
			this.mButtonText[0].SetPosition(new Vec2(pos.mX + 54, pos.mY));
			this.mButtonText[0].mAbsolute = true;
			this.mButtonText[0].mDepth = 0;
			this.mButtonText[0].mColour = "#FFFFFF";
			this.mButtonText[0].mAlign = "centre";
			this.mButtonText[0].SetString("Play");
			
			this.mButtonText[0].mShadow = true;
			this.mButtonText[0].mShadowColour = "#090B0D";
			this.mButtonText[0].mShadowAlpha = 0.5;
			this.mButtonText[0].mShadowBlur = 2;
			this.mButtonText[0].mShadowOffset.Set(2, 2);
			
			// set up the button front image (cover)
			this.mButtonCovers[0].SetUp(pos, new Vec2(109, 29), 0);
			this.mButtonCovers[0].mSpriteIdle.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[0].mSpriteIdle.SetCurrentFrame(1);
			this.mButtonCovers[0].mSpriteHover.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[0].mSpriteHover.SetCurrentFrame(3);
			this.mButtonCovers[0].mSpriteDown.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[0].mSpriteDown.SetCurrentFrame(5);
			this.mButtonCovers[0].mSpriteInactive.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[0].mSpriteInactive.SetCurrentFrame(7);
		}
		
		{ // pass button
			var pos = new Vec2(506, 447);
			this.mButtons[1].SetUp(pos, new Vec2(109, 29), 0);
			this.mButtons[1].mSpriteIdle.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[1].mSpriteIdle.SetCurrentFrame(0);
			this.mButtons[1].mSpriteHover.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[1].mSpriteHover.SetCurrentFrame(2);
			this.mButtons[1].mSpriteDown.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[1].mSpriteDown.SetCurrentFrame(4);
			this.mButtons[1].mSpriteInactive.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[1].mSpriteInactive.SetCurrentFrame(6);
			
			this.mButtonText[1].SetFont(fnt);
			this.mButtonText[1].SetFontSize(19);
			this.mButtonText[1].SetPosition(new Vec2(pos.mX + 54, pos.mY));
			this.mButtonText[1].mAbsolute = true;
			this.mButtonText[1].mDepth = 0;
			this.mButtonText[1].mColour = "#FFFFFF";
			this.mButtonText[1].mAlign = "centre";
			this.mButtonText[1].SetString("Pass");
			
			this.mButtonText[1].mShadow = true;
			this.mButtonText[1].mShadowColour = "#090B0D";
			this.mButtonText[1].mShadowAlpha = 0.5;
			this.mButtonText[1].mShadowBlur = 2;
			this.mButtonText[1].mShadowOffset.Set(2, 2);
			
			this.mButtonCovers[1].SetUp(pos, new Vec2(109, 29), 0);
			this.mButtonCovers[1].mSpriteIdle.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[1].mSpriteIdle.SetCurrentFrame(1);
			this.mButtonCovers[1].mSpriteHover.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[1].mSpriteHover.SetCurrentFrame(3);
			this.mButtonCovers[1].mSpriteDown.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[1].mSpriteDown.SetCurrentFrame(5);
			this.mButtonCovers[1].mSpriteInactive.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[1].mSpriteInactive.SetCurrentFrame(7);
		}
		
		{ // help button
			var pos = new Vec2(506, 377);
			this.mButtons[2].SetUp(pos, new Vec2(29, 29), 0);
			this.mButtons[2].mSpriteIdle.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[2].mSpriteIdle.SetCurrentFrame(0);
			this.mButtons[2].mSpriteHover.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[2].mSpriteHover.SetCurrentFrame(2);
			this.mButtons[2].mSpriteDown.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[2].mSpriteDown.SetCurrentFrame(4);
			this.mButtons[2].mSpriteInactive.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[2].mSpriteInactive.SetCurrentFrame(6);
			
			this.mButtonText[2].SetFont(fnt);
			this.mButtonText[2].SetFontSize(19);
			this.mButtonText[2].SetPosition(new Vec2(pos.mX + 14, pos.mY + 1));
			this.mButtonText[2].mAbsolute = true;
			this.mButtonText[2].mDepth = 0;
			this.mButtonText[2].mColour = "#FFFFFF";
			this.mButtonText[2].mAlign = "centre";
			this.mButtonText[2].SetString("?");
			
			this.mButtonText[2].mShadow = true;
			this.mButtonText[2].mShadowColour = "#694343";
			this.mButtonText[2].mShadowAlpha = 0.5;
			this.mButtonText[2].mShadowBlur = 2;
			this.mButtonText[2].mShadowOffset.Set(2, 2);
		}
		
		{ // options button
			var pos = new Vec2(540, 377);
			this.mButtons[3].SetUp(pos, new Vec2(29, 29), 0);
			this.mButtons[3].mSpriteIdle.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[3].mSpriteIdle.SetCurrentFrame(0);
			this.mButtons[3].mSpriteHover.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[3].mSpriteHover.SetCurrentFrame(2);
			this.mButtons[3].mSpriteDown.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[3].mSpriteDown.SetCurrentFrame(4);
			this.mButtons[3].mSpriteInactive.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[3].mSpriteInactive.SetCurrentFrame(6);
			
			this.mButtonText[3].SetFont(fnt);
			this.mButtonText[3].SetFontSize(19);
			this.mButtonText[3].SetPosition(new Vec2(pos.mX + 14, pos.mY + 2));
			this.mButtonText[3].mAbsolute = true;
			this.mButtonText[3].mDepth = 0;
			this.mButtonText[3].mColour = "#FFFFFF";
			this.mButtonText[3].mAlign = "centre";
			this.mButtonText[3].SetString("O");
			
			this.mButtonText[3].mShadow = true;
			this.mButtonText[3].mShadowColour = "#694343";
			this.mButtonText[3].mShadowAlpha = 0.5;
			this.mButtonText[3].mShadowBlur = 2;
			this.mButtonText[3].mShadowOffset.Set(2, 2);
		}
	}
	
	{
		this.mDisplayShape.MakeRectangle(new Vec2(2, 132), new Vec2(nmain.game.mCanvasSize.mX - 4, 151));
		this.mDisplayShape.mDepth = -10;
		this.mDisplayShape.mAlpha = 0.5;
		this.mDisplayShape.mColour = "#000000";
	}
}

// user interaction
OogaahHumanUI.prototype.Input = function() {
	// this.mTooltip.Input(); // process the tooltip
	
	for (var i = 0; i < this.mButtons.length; ++i) { // for all buttons
		// process button user input interaction
		this.mButtons[i].Input();
		this.mButtonCovers[i].Input();
	}
}

OogaahHumanUI.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	// this.mTooltip.Process(); // process the tooltip
	// var ttHover = -1; // current gui element (with tooltip) being hovered over
	
	if (currScene.mCurrPlayer != this.mHuman.mPlayerID || this.mHuman.mFinished == true) {
		if (this.mButtons[0].mActive == true) {
			this.mButtons[0].mActive = false;
			this.mButtons[1].mActive = false;
			
			this.mButtonCovers[0].mActive = false;
			this.mButtonCovers[1].mActive = false;
		}
		
		// if not all done and finish button not enabled
		// enable finish button
		// otherwise if all done and go next button not enabled
		// enable go next button
		// disable finish button
	}
	else if (this.mHuman.mMode == 0) {
		if (this.mButtons[0].mActive == false) {
			this.mButtons[0].mActive = true;
			this.mButtons[1].mActive = true;
			
			this.mButtonCovers[0].mActive = true;
			this.mButtonCovers[1].mActive = true;
		}
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) { // for all buttons
		// process button logic
		this.mButtons[i].Process();
		this.mButtonCovers[i].Process();
		
		// update button text colour depending on button state
		if (this.mButtons[i].mActive == false) {
			this.mButtonText[i].mColour = "#888888";
			this.mButtonText[i].mShadow = false;
		}
		else {
			if (this.mButtons[i].mStatus == "idle") {
				this.mButtonText[i].mColour = "#DDDDDD";
			}
			else if (this.mButtons[i].mStatus == "hover") {
				this.mButtonText[i].mColour = "#FFFFFF";
			}
			else if (this.mButtons[i].mStatus == "down") {
				this.mButtonText[i].mColour = "#AAAAAA";
			}
		}
		
		// if this button is being hovered and no other gui element is being hovered
		// if (this.mButtons[i].mHover == true && ttHover == -1) {
		// 	ttHover = i; // indicate this element is
		// }
	}
	
	/* if (ttHover >= 0) { // if there is an element being hovered over
		if (this.mButtonHoverID != ttHover) { // if it is not the same as the current hovered element
			this.mButtonHoverID = ttHover; // set the current hovered element
			this.mTooltip.StartTimeout(1500); // set the timeout on the tooltip
			
			if (ttHover == 0) { // if the element id is 0 (button 1)
				this.mTooltip.SetText(null, null, "Button 1 - usually affirmative (Play, Yes, etc.).");
			}
			else if (ttHover == 1) { // (button 2)
				this.mTooltip.SetText(null, null, "Button 2 - usually negative (Pass, No, etc.).");
			}
			else if (ttHover == 2) { // (help button)
				this.mTooltip.SetText(null, null, "Select a card from your hand to view it full-size.");
			}
			else if (ttHover == 3) { // (options button)
				this.mTooltip.SetText(null, null, "Go to the options menu.");
			}
		}
		
		// adjust the position of the tooltip, fixing it if it goes outside the canvas borders
		this.mTooltip.SetPosition(new Vec2(nmgrs.inputMan.GetLocalMouseCoords().mX + 10,
				(nmgrs.inputMan.GetLocalMouseCoords().mY - this.mTooltip.mTooltipText.GetHeight()) + 3));
		this.mTooltip.FixPosition(new Vec2(0, 0), nmain.game.mCanvasSize);
	}
	else {
		this.mButtonHoverID = ttHover; // reset the stored element id
	} */
	
	if (this.mButtons[0].OnClick() == true) { // if play button clicked
		this.mHuman.OnPlay(); // call on play logic
	}
	else if (this.mButtons[1].OnClick() == true) { // otherwise if pass button clicked
		this.mHuman.OnPass();
	}
	else if (this.mButtons[2].OnClick() == true) { // otherwise if help button clicked
		this.mHuman.OnHelp();
	}
	else if (this.mButtons[3].OnClick() == true) { // otherwise if options button clicked
		this.mHuman.OnOptions();
	}
}

// returns array containing gui render data
OogaahHumanUI.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	if (this.mFade == true) {
		arr.push(this.mFadeShape);
		arr.push(this.mFadeText);
	}
	
	if (this.mShowMessage == true) {
		arr.push(this.mMessageShape);
		arr.push(this.mMessageText);
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) { // for all buttons
		arr = util.ConcatArray(arr, this.mButtons[i].GetRenderData()); // add the button base
		arr.push(this.mButtonText[i]); // add the button text
		arr = util.ConcatArray(arr, this.mButtonCovers[i].GetRenderData()); // add the button cover
	}
	
	if (this.mDisplayCard != null) {
		arr.push(this.mDisplayShape);
		arr = util.ConcatArray(arr, this.mDisplayCard.GetRenderData());
	}
	
	/* if (this.mButtonHoverID >= 0) { // if there is an element being hovered over
		arr = util.ConcatArray(arr, this.mTooltip.GetRenderData()); // add the tooltip
	} */
	
	return arr; // return the renderables array
}

//
OogaahHumanUI.prototype.SetFade = function(fade, string) {
	if (fade == true) {
		if (string != null) {
			this.mFadeText.SetString(string);
		}
		
		this.mFade = true;
	}
	else {
		this.mFade = false;
	}
}

//
OogaahHumanUI.prototype.ShowMessage = function(show, string) {
	if (show == true) {
		if (string != null) {
			this.mMessageText.SetString(string);
		}
		
		this.mShowMessage = true;
	}
	else {
		this.mShowMessage = false;
	}
}
//...End

