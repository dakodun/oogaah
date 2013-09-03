// OogaahTutorialDesired Class...
//
function OogaahTutorialDesired() {
	this.mCards = new Array();
	this.mString = "";
	this.mShowMessageInc = 0;
	
	this.mPos = new Vec2();
	this.mSize = new Vec2();
	this.mArrowDir = "none";
	this.mArrowOff = 0;
	
	this.mFadePos = new Vec2();
	this.mFadeSize = new Vec2();
	
	this.mTutorialContent = null;
};
// ...End


// OogaahTutorialScene Class...
// 
function OogaahTutorialScene() {
	OogaahGameScene.apply(this, null); // construct the base class
	
	this.mPlayers[0] = new OogaahTutorialHuman();
	
	this.mMessageQueue = new OogaahTutorialMessageQueue();
	this.mShowMessage = 0;
	this.mFinished = false;
};

// inherit the base class's prototype
OogaahTutorialScene.prototype = Object.create(OogaahGameScene.prototype);

// initialises the scene object
OogaahTutorialScene.prototype.SetUp = function() {
	this.mBatch.mFrustrumCull = false;
	
	{
		var tex = nmgrs.resMan.mTextureStore.GetResource("gameBack");
		this.mGameBack.SetTexture(tex);
		this.mGameBack.SetPosition(new Vec2(2, 2));
		this.mGameBack.mDepth = 99999;
	}
	
	this.CreateCardList();
	this.mTutorialContent.SetCards();
	
	this.mGraveyard.SetUp();
	
	for (var i = 0; i < this.mPlayers.length; ++i) {
		this.mPlayers[i].SetUp(i);
		this.mPlayers[i].PositionHand();
	}
	
	this.mLog.SetUp();
	this.mLog.SetLoggedActions(noogaah.options.mLogOptions);
	
	for (var i = 0; i < this.mPlayers.length; ++i) {
		if (this.mPlayers[i].mType == "AI") {
			var behaviour = new OogaahBehaviourTutorial();
			behaviour.SetUp(this.mPlayers[i]);
			
			this.mPlayers[i].mBehaviourStore.mBehaviours.push(behaviour);
		}
	}
	
	if (this.mPlayers[this.mCurrPlayer].mType == "Human") {
		this.mPlayers[this.mCurrPlayer].OnTurnBegin();
	}
	
	{
		var pos = new Vec2(102, 143);
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		
		this.mStatusAVText.SetFont(fnt);
		this.mStatusAVText.SetFontSize(36);
		this.mStatusAVText.SetPosition(new Vec2(pos.mX + 46, pos.mY - 3));
		this.mStatusAVText.mDepth = 0;
		this.mStatusAVText.mColour = "#FFFFFF";
		this.mStatusAVText.mAlign = "centre";
		this.mStatusAVText.SetString("0");
		
		var texAV = nmgrs.resMan.mTextureStore.GetResource("statusAVBack");
		this.mStatusAVSprite.SetTexture(texAV);
		this.mStatusAVSprite.SetPosition(new Vec2(pos.mX, pos.mY));
		this.mStatusAVSprite.mDepth = 1;
		
		this.mStatusSSText.SetFont(fnt);
		this.mStatusSSText.SetFontSize(16);
		this.mStatusSSText.SetPosition(new Vec2(pos.mX + 46, pos.mY + 65));
		this.mStatusSSText.mDepth = 0;
		this.mStatusSSText.mColour = "#FFFFFF";
		this.mStatusSSText.mAlign = "centre";
		this.mStatusSSText.SetString("0x");
		
		var texSS = nmgrs.resMan.mTextureStore.GetResource("statusSSBack");
		this.mStatusSSSprite.SetTexture(texSS, 6, 1, -1, -1);
		this.mStatusSSSprite.SetCurrentFrame(0);
		this.mStatusSSSprite.SetPosition(new Vec2(pos.mX + 1, pos.mY + 38));
		this.mStatusSSSprite.mDepth = 1;
		
		
		var texIcons = nmgrs.resMan.mTextureStore.GetResource("statusIcons");
		
		this.mStatusWarrior.SetTexture(texIcons, 3, 3, -1, -1);
		this.mStatusWarrior.SetCurrentFrame(1);
		this.mStatusWarrior.SetPosition(new Vec2(pos.mX + 18, pos.mY + 91));
		this.mStatusWarrior.mDepth = 1;
		
		this.mStatusReversed.SetTexture(texIcons, 3, 3, -1, -1);
		this.mStatusReversed.SetCurrentFrame(0);
		this.mStatusReversed.SetPosition(new Vec2(pos.mX + 38, pos.mY + 91));
		this.mStatusReversed.mDepth = 1;
		
		this.mStatusPeasants.SetTexture(texIcons, 3, 3, -1, -1);
		this.mStatusPeasants.SetCurrentFrame(2);
		this.mStatusPeasants.SetPosition(new Vec2(pos.mX + 58, pos.mY + 91));
		this.mStatusPeasants.mDepth = 1;
	}
	
	this.mTutorialContent.SetMessages();
	this.mTutorialContent.SetDesired();
	
	if (this.mPlayers[this.mCurrPlayer].mType == "AI") { // if the initial player is ai
		this.mDelay = 1000; // add a delay before they play their first card
	}
}

// handles user input
OogaahTutorialScene.prototype.Input = function() {
	if (this.mShowMessage == 0) {
		this.mGraveyard.Input(); // process the graveyard's user input
		this.mLog.Input(); // process the play log's user input
		
		for (var i = 0; i < this.mPlayers.length; ++i) {
			if (this.mPlayers[i].mType == "Human") {
				this.mPlayers[i].Input();
			}
		}
	}
	else {
		var clicked = this.mMessageQueue.Input();
		
		if (clicked == true) {
			if (this.mShowMessage == 1 && this.mFinished == true) {
				nmgrs.sceneMan.RequestSceneChange(new OogaahMenuScene());
			}
			else if (this.mShowMessage > 0) {
				--this.mShowMessage;
			}
		}
	}
}

// handles game logic
OogaahTutorialScene.prototype.Process = function() {
	if (this.mShowMessage == 0) {
		this.mLog.Process(); // process the play log
		
		this.mGraveyard.Process(); // process the graveyard
		
		for (var i = 0; i < this.mPlayers.length; ++i) {
			if (this.mPlayers[i].mType == "Human") {
				this.mPlayers[i].Process();
			}
		}
		
		if (this.mDelay <= 0) {
			if (this.mPlayers[this.mCurrPlayer].mType == "AI") {
				this.mPlayers[this.mCurrPlayer].Process();
			}
		}
		else {
			if (this.mPlayers[this.mCurrPlayer].mType == "Human") {
				if (this.mPlayers[this.mCurrPlayer].mFinished == false) {
					this.mDelay = 0;
				}
			}
			else {
				this.mDelay -= 1000 / nmain.game.mFrameLimit;
			}
		}
		
		if (this.mFinishedCount == 3) {
			var lastPlayer = null;
			for (var i = 0; i < this.mPlayers.length; ++i) {
				if (this.mPlayers[i].mFinished == false) {
					lastPlayer = this.mPlayers[i];
					break;
				}
			}
			
			this.mLog.AddEntry(10, lastPlayer.mName + " was thoroughly decimated (4th)!"); // add entry to the play log
			lastPlayer.mFinished = true;
			++this.mFinishedCount;
			this.mLastPlayer = -1;
		}
	}
	else {
		this.mMessageQueue.Process();
	}
}

// handles all drawing tasks
OogaahTutorialScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	
	arr.push(this.mGameBack);
	
	arr = util.ConcatArray(arr, this.mLog.GetRenderData()); // render the play log
	
	for (var i = 0; i < 4; ++i) {
		arr = util.ConcatArray(arr, this.mPlayers[i].GetRenderData());
	}
	
	arr = util.ConcatArray(arr, this.mGraveyard.GetRenderData());
	arr = util.ConcatArray(arr, this.mBattlefield.GetRenderData());
	
	{
		arr.push(this.mStatusAVSprite);
		
		if (this.mStatusAVText.mString != "0") {
			arr.push(this.mStatusAVText);
		}
		
		arr.push(this.mStatusSSSprite);
		
		if (this.mStatusSSText.mString != "0x") {
			arr.push(this.mStatusSSText);
		}
		
		if (this.mWarriorOwner != -1) {
			arr.push(this.mStatusWarrior);
		}
		
		if (this.mReversed == true) {
			arr.push(this.mStatusReversed);
		}
		
		if (this.mOnlyPeasants == true) {
			arr.push(this.mStatusPeasants);
		}
	}
	
	if (this.mShowMessage != 0) {
		arr = util.ConcatArray(arr, this.mMessageQueue.GetRenderData());
	}
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(null, null);
}
// ...End

