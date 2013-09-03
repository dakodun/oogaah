// OogaahOptionsHeader Class...
function OogaahOptionsHeader() {
	this.mBarTop = new Shape();
	this.mText = new Text();
	this.mBarBottom = new Shape();
};

OogaahOptionsHeader.prototype.SetUp = function(pos) {
	this.mBarTop.SetPosition(pos);
	this.mBarTop.AddPoint(new Vec2(285, 0));
	this.mBarTop.AddPoint(new Vec2(285, 2));
	this.mBarTop.AddPoint(new Vec2(  0, 2));
	this.mBarTop.mColour = "#D6D5C6";
	
	var fnt = nmgrs.resMan.mFontStore.GetResource("oldmansans");
	this.mText.SetFont(fnt);
	this.mText.SetFontSize(24);
	this.mText.SetPosition(new Vec2(pos.mX + 30, pos.mY));
	this.mText.mDepth = 0;
	this.mText.mColour = "#D6D5C6";
	this.mText.mAlign = "left";
	this.mText.SetString("Play Logging");
	
	this.mBarBottom.Copy(this.mBarTop);
	this.mBarBottom.SetPosition(new Vec2(this.mBarBottom.mPos.mX, this.mBarBottom.mPos.mY + 32));
}

OogaahOptionsHeader.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mBarTop);
	arr.push(this.mText);
	arr.push(this.mBarBottom);
	
	return arr;
}
// ...End


// OogaahOptionsScene Class...
// 
function OogaahOptionsScene() {
	this.mPersist = false;
	
	this.mBatch = new RenderBatch();
	
	this.mBackColour = new Shape();
	
	this.mBackButton = new GUIButton();
	this.mBackButtonText = new Text();
	this.mBackButtonCover = new GUIButton();
	
	{
		this.mLogHeader = new OogaahOptionsHeader();
		
		this.mLogChecks = new Array();
		this.mLogChecks[0] = new GUICheckBox();
		this.mLogChecks[1] = new GUICheckBox();
		this.mLogChecks[2] = new GUICheckBox();
		this.mLogChecks[3] = new GUICheckBox();
		this.mLogChecks[4] = new GUICheckBox();
		
		this.mLogText = new Array();
		this.mLogText[0] = new Text();
		this.mLogText[1] = new Text();
		this.mLogText[2] = new Text();
		this.mLogText[3] = new Text();
		this.mLogText[4] = new Text();
		
		this.mLogValues = new Array();
		this.mLogValues[0] = 6;
		this.mLogValues[1] = 1;
		this.mLogValues[2] = 2;
		this.mLogValues[3] = 5;
		this.mLogValues[4] = 3; // or 4
	}
	
	// this.mButtonHoverID = -1;
	// this.mTooltip = new GUITooltip();
};

// returns the type of this object for validity checking
OogaahOptionsScene.prototype.Type = function() {
	return "OogaahOptionsScene";
}

// initialises the scene object
OogaahOptionsScene.prototype.SetUp = function() {
	nmain.game.mClearColour = "#FFFFFF";
	
	{
		this.mBackColour.SetPosition(new Vec2(2, 2));
		this.mBackColour.AddPoint(new Vec2(636,   0));
		this.mBackColour.AddPoint(new Vec2(636, 476));
		this.mBackColour.AddPoint(new Vec2(  0, 476));
		this.mBackColour.mAbsolute = true;
		this.mBackColour.mDepth = 99999;
		this.mBackColour.mColour = "#35251C";
	}
	
	{
		var tex = nmgrs.resMan.mTextureStore.GetResource("buttonLarge");
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		
		this.mBackButton.SetUp(new Vec2(265, 424), new Vec2(109, 29), 0);
		this.mBackButton.mSpriteIdle.SetTexture(tex, 8, 2, -1, -1); this.mBackButton.mSpriteIdle.SetCurrentFrame(0);
		this.mBackButton.mSpriteHover.SetTexture(tex, 8, 2, -1, -1); this.mBackButton.mSpriteHover.SetCurrentFrame(2);
		this.mBackButton.mSpriteDown.SetTexture(tex, 8, 2, -1, -1); this.mBackButton.mSpriteDown.SetCurrentFrame(4);
		this.mBackButton.mSpriteInactive.SetTexture(tex, 8, 2, -1, -1); this.mBackButton.mSpriteInactive.SetCurrentFrame(6);
		
		this.mBackButtonText.SetFont(fnt);
		this.mBackButtonText.SetFontSize(14);
		this.mBackButtonText.SetPosition(new Vec2(319, 429));
		this.mBackButtonText.mAbsolute = true;
		this.mBackButtonText.mDepth = 0;
		this.mBackButtonText.mColour = "#FFFFFF";
		this.mBackButtonText.mAlign = "centre";
		this.mBackButtonText.SetString("Return");
		
		this.mBackButtonCover.SetUp(new Vec2(265, 424), new Vec2(109, 29), 0);
		this.mBackButtonCover.mSpriteIdle.SetTexture(tex, 8, 2, -1, -1); this.mBackButtonCover.mSpriteIdle.SetCurrentFrame(1);
		this.mBackButtonCover.mSpriteHover.SetTexture(tex, 8, 2, -1, -1); this.mBackButtonCover.mSpriteHover.SetCurrentFrame(3);
		this.mBackButtonCover.mSpriteDown.SetTexture(tex, 8, 2, -1, -1); this.mBackButtonCover.mSpriteDown.SetCurrentFrame(5);
		this.mBackButtonCover.mSpriteInactive.SetTexture(tex, 8, 2, -1, -1); this.mBackButtonCover.mSpriteInactive.SetCurrentFrame(7);
	}
	
	{
		this.mLogHeader.SetUp(new Vec2(65, 60));
		
		{
			var texCB = nmgrs.resMan.mTextureStore.GetResource("optionsCheck");
			var fnt = nmgrs.resMan.mFontStore.GetResource("oldmansans");
			var pos = new Vec2(100, 140);
			
			for (var i = 0; i < this.mLogChecks.length; ++i) {
				this.mLogChecks[i].SetUp(pos, new Vec2(32, 31), 0);
				
				this.mLogChecks[i].mButton.mSpriteIdle.SetTexture(texCB, 4, 4, -1, -1); this.mLogChecks[i].mButton.mSpriteIdle.SetCurrentFrame(0);
				this.mLogChecks[i].mButton.mSpriteHover.SetTexture(texCB, 4, 4, -1, -1); this.mLogChecks[i].mButton.mSpriteHover.SetCurrentFrame(1);
				this.mLogChecks[i].mButton.mSpriteDown.SetTexture(texCB, 4, 4, -1, -1); this.mLogChecks[i].mButton.mSpriteDown.SetCurrentFrame(2);
				this.mLogChecks[i].mButton.mSpriteInactive.SetTexture(texCB, 4, 4, -1, -1); this.mLogChecks[i].mButton.mSpriteInactive.SetCurrentFrame(0);
				
				this.mLogChecks[i].mSpriteSelected.SetTexture(texCB, 4, 4, -1, -1); this.mLogChecks[i].mSpriteSelected.SetCurrentFrame(3);
				
				this.mLogChecks[i].mButton.mPos.mX += 16; this.mLogChecks[i].mButton.mPos.mY += 3;
				
				this.mLogText[i].SetFont(fnt);
				this.mLogText[i].SetFontSize(13);
				this.mLogText[i].SetPosition(new Vec2(pos.mX + 31, 110));
				this.mLogText[i].mAbsolute = true;
				this.mLogText[i].mDepth = 0;
				this.mLogText[i].mColour = "#D6D5C6";
				this.mLogText[i].mAlign = "centre";
				
				pos.mX += 65;
			}
			
			this.mLogText[0].SetString("Skirmish\nWins");
			this.mLogText[1].SetString("Card\nPlays");
			this.mLogText[2].SetString("Passing");
			this.mLogText[2].SetPosition(new Vec2(this.mLogText[2].mPos.mX, this.mLogText[2].mPos.mY + 15));
			this.mLogText[3].SetString("Ability\nActivation");
			this.mLogText[4].SetString("Confirm and\nCancel");
		}
		
		for (var i = 0; i < this.mLogChecks.length; ++i) {
			if (noogaah.options.mLogOptions[this.mLogValues[i]] == true) {
				this.mLogChecks[i].mSelected = true;
			}
		}
	}
	
	// var fntTT = nmgrs.resMan.mFontStore.GetResource("monaco");
	// this.mTooltip.SetUp(new Vec2(), -10);
	// this.mTooltip.SetText(fntTT, 16, "");
	// this.mTooltip.mTooltipText.mVSpacing = 0.8;
}

// cleans up the scene object
OogaahOptionsScene.prototype.TearDown = function() {
	
}

// handles user input
OogaahOptionsScene.prototype.Input = function() {
	// this.mTooltip.Input();
	
	this.mBackButton.Input();
	this.mBackButtonCover.Input();
	
	for (var i = 0; i < this.mLogChecks.length; ++i) {
		this.mLogChecks[i].Input();
	}
	
	if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.P) == true) { // if the p key is pressed
		/* for (var i = 0; i < this.mLogChecks.length; ++i) {
			var value = false;
			if (this.mLogChecks[i].mSelected == true) {
				value = true;
			}
			
			noogaah.options.mLogOptions[this.mLogValues[i]] = value;
			if (i == 4) {
				noogaah.options.mLogOptions[4] = value;
			}
		}
		
		noogaah.options.SaveOptions();
		
		nmgrs.sceneMan.RequestSceneChange(new OogaahGameScene());
		nmgrs.sceneMan.mReadyScene.mPersist = false;
		nmgrs.sceneMan.mReadyScene.mLog.SetLoggedActions(noogaah.options.mLogOptions); */
	}
}

// handles game logic
OogaahOptionsScene.prototype.Process = function() {
	// this.mTooltip.Process();
	// var ttHover = -1;
	
	{
		this.mBackButton.Process(null);
		this.mBackButtonCover.Process(null);
		
		// update button text colour depending on button state
		if (this.mBackButton.mActive == false) {
			this.mBackButtonText.mColour = "#888888";
		}
		else {
			if (this.mBackButton.mStatus == "idle") {
				this.mBackButtonText.mColour = "#DDDDDD";
			}
			else if (this.mBackButton.mStatus == "hover") {
				this.mBackButtonText.mColour = "#FFFFFF";
			}
			else if (this.mBackButton.mStatus == "down") {
				this.mBackButtonText.mColour = "#AAAAAA";
			}
		}
		
		// if (this.mBackButton.mHover == true && ttHover == -1) {
		// 	ttHover = 0;
		// }
	}
	
	if (this.mBackButton.OnClick() == true) { // if play button clicked
		for (var i = 0; i < this.mLogChecks.length; ++i) {
			var value = false;
			if (this.mLogChecks[i].mSelected == true) {
				value = true;
			}
			
			noogaah.options.mLogOptions[this.mLogValues[i]] = value;
			if (i == 4) {
				noogaah.options.mLogOptions[4] = value;
			}
		}
		
		noogaah.options.SaveOptions();
		
		nmgrs.sceneMan.RequestSceneChange(new OogaahGameScene());
		nmgrs.sceneMan.mReadyScene.mPersist = false;
		nmgrs.sceneMan.mReadyScene.mLog.SetLoggedActions(noogaah.options.mLogOptions);
	}
	
	for (var i = 0; i < this.mLogChecks.length; ++i) {
		this.mLogChecks[i].Process(null);
		
		// if (this.mLogChecks[i].mButton.mHover == true && ttHover == -1) {
		// 	ttHover = i + 1;
		// }
	}
	
	/* if (ttHover >= 0) {
		if (this.mButtonHoverID != ttHover) {
			this.mButtonHoverID = ttHover;
			this.mTooltip.StartTimeout(1500);
			
			if (ttHover == 0) {
				this.mTooltip.SetText(null, null, "Accept changes and return to the game.");
			}
			else if (ttHover == 1) {
				this.mTooltip.SetText(null, null, "Enable/Disable logging when a player wins a skirmish.");
			}
			else if (ttHover == 2) {
				this.mTooltip.SetText(null, null, "Enable/Disable logging when a player plays a card.");
			}
			else if (ttHover == 3) {
				this.mTooltip.SetText(null, null, "Enable/Disable logging when a player passes.");
			}
			else if (ttHover == 4) {
				this.mTooltip.SetText(null, null, "Enable/Disable logging when a player activates a cards ability.");
			}
			else if (ttHover == 5) {
				this.mTooltip.SetText(null, null, "Enable/Disable logging when a player makes a choice.");
			}
		}
		
		this.mTooltip.SetPosition(new Vec2(nmgrs.inputMan.GetLocalMouseCoords().mX + 10,
				(nmgrs.inputMan.GetLocalMouseCoords().mY - this.mTooltip.mTooltipText.GetHeight()) + 3));
		this.mTooltip.FixPosition(new Vec2(0, 0), nmain.game.mCanvasSize);
	}
	else {
		this.mButtonHoverID = ttHover;
	} */
}

// handles all drawing tasks
OogaahOptionsScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	
	arr.push(this.mBackColour);
	
	arr = util.ConcatArray(arr, this.mBackButton.GetRenderData());
	arr.push(this.mBackButtonText);
	arr = util.ConcatArray(arr, this.mBackButtonCover.GetRenderData());
	
	{
		arr = util.ConcatArray(arr, this.mLogHeader.GetRenderData());
		
		for (var i = 0; i < this.mLogChecks.length; ++i) {
			arr = util.ConcatArray(arr, this.mLogChecks[i].GetRenderData());
			arr.push(this.mLogText[i]);
		}
	}
	
	if (this.mButtonHoverID >= 0) {
		arr = util.ConcatArray(arr, this.mTooltip.GetRenderData());
	}
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(null, null);
}
// ...End

