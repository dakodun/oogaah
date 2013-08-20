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
		var tex = nmgrs.resMan.mTexStore.GetResource("gameBack");
		this.mGameBack.SetTexture(tex);
		this.mGameBack.SetPosition(new Vec2(2, 2));
		this.mGameBack.mDepth = 99999;
	}
	
	this.CreateCardList();
	this.DealCards(0);
	
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
		
		var texAV = nmgrs.resMan.mTexStore.GetResource("statusAVBack");
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
		
		var texSS = nmgrs.resMan.mTexStore.GetResource("statusSSBack");
		this.mStatusSSSprite.SetTexture(texSS, 6, 1, -1, -1);
		this.mStatusSSSprite.SetCurrentFrame(0);
		this.mStatusSSSprite.SetPosition(new Vec2(pos.mX + 1, pos.mY + 38));
		this.mStatusSSSprite.mDepth = 1;
		
		
		var texIcons = nmgrs.resMan.mTexStore.GetResource("statusIcons");
		
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
	
	{
		this.mShowMessage = 4;
		this.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"Welcome to the 'Example Round' tutorial!",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 30), "none", 0);
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"In this tutorial we will play a short round of Oogaah.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"It is currently our turn and no cards have been played yet, so we can play whichever cards we like.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(84, 280),
				"Start by playing both of our Goblin Overseers.",
				new Vec2(280, 45), "down", 10, new Vec2(96, 377), new Vec2(39, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		this.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"Our Goblin Overseer's ability activated which allows us to play any Goblin Hordes in our hand.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(34, 280),
				"Now would be a great time to get rid of our single Goblin Horde, so play it now.",
				new Vec2(280, 45), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		this.mMessageQueue.PushMessage(new Vec2(248, 156),
				"When using this ability, the Current Attack Value and Required Squad Size both become 1, regardless of the number of Goblin Hordes played.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 60), "left", 12, new Vec2(99, 142), new Vec2(99, 84));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		this.mMessageQueue.PushMessage(new Vec2(122, 276),
				"The first AI made a play similar to ours (Goblin Overseer, then Goblin Hordes via its ability).",
				new Vec2(280, 60), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		this.mMessageQueue.PushMessage(new Vec2(122, 276),
				"The second AI played 2 Goblin Hordes using their ability.",
				new Vec2(280, 45), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(248, 156),
				"This ignores the Required Squad Size (setting both it and the Current Attack Value to the number of Goblin Hordes played).",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 60), "left", 12, new Vec2(99, 142), new Vec2(99, 84));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		this.mMessageQueue.PushMessage(new Vec2(122, 276),
				"The third AI just played 2 Orc Berserkers.",
				new Vec2(280, 30), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(74, 280),
				"Notice that our Orc Berserker actually lost some attack value!",
				new Vec2(280, 45), "down", 10, new Vec2(96, 377), new Vec2(19, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"This persists throughout the current battle, so it's usually wise to dispose of them early on.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 126),
				"We can't currently make a move, so pass our turn.",
				new Vec2(280, 45), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"No one could make a move (or chose not to) and it passed back the the last player who played (CPU 3). As a result the current game status has reset and it is now the third AI's turn again.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 75), "none", 0);
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
	}
	
	{
		this.mMessageQueue.PushMessage(new Vec2(122, 276),
				"The third AI played an Orc Warchief.",
				new Vec2(280, 30), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(94, 265),
				"Whilst we could play our Being of Energy, sometimes it is wiser to save cards to play in combos later.",
				new Vec2(280, 60), "down", 10, new Vec2(116, 377), new Vec2(19, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 111),
				"So for now, just pass our turn.",
				new Vec2(280, 30), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		this.mMessageQueue.PushMessage(new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 126),
				"Once again we'd like to save our cards, so pass.",
				new Vec2(280, 45), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
	}
	
	{
		this.mMessageQueue.PushMessage(new Vec2(122, 276),
				"The second AI just played a Human Knight which activated its ability.",
				new Vec2(280, 45), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(248, 210),
				"This means that the only card that can be played next in the current skirmish is a Human Peasant.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "left", 16, new Vec2(99, 230), new Vec2(99, 24));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		this.mMessageQueue.PushMessage(new Vec2(34, 280),
				"It's our turn and the Human Knight's ability is still in effect, so play our Human Peasant.",
				new Vec2(280, 45), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		this.mMessageQueue.PushMessage(new Vec2(122, 276),
				"It is once again our turn and the current card is a Human Mage.",
				new Vec2(280, 45), "up", 218, new Vec2(320, 136), new Vec2(71, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"We can now go on to win the battle from here by playing our Being of Energy. It has the highest attack value and nothing can beat it when it is played by itself.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 75), "none", 0);
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(74, 295),
				"So go ahead and play our Being of Energy.",
				new Vec2(280, 30), "down", 10, new Vec2(96, 377), new Vec2(19, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
	}
	
	{
		this.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"The board has been cleared, we have only 1 card left and it is our turn.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		this.mMessageQueue.PushMessage(new Vec2(34, 280),
				"Play our last card - the Orc Berserker - and win the battle!",
				new Vec2(280, 45), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
		
		
		this.mMessageQueue.PushMessage(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 4), 80),
				"Congratulations, a masterful victory! Continue to return to the main menu.",
				new Vec2(Math.round(nmain.game.mCanvasSize.mX / 2), 45), "none", 0);
		this.mMessageQueue.mQueue[this.mMessageQueue.mQueue.length - 1].SetTimeout(0.4);
	}
	
	this.SetDesired();
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

OogaahTutorialScene.prototype.DealCards = function(first) {
	this.mCurrPlayer = first; // set the current player
	
	{
		// cards
		this.mPlayers[0].mHand.AddCard(this.mCardList[0]);
		
		this.mPlayers[0].mHand.AddCard(this.mCardList[1]);
		this.mPlayers[0].mHand.AddCard(this.mCardList[1]);
		
		this.mPlayers[0].mHand.AddCard(this.mCardList[2]);
		
		this.mPlayers[0].mHand.AddCard(this.mCardList[9]);
		
		this.mPlayers[0].mHand.AddCard(this.mCardList[12]);
	}
	
	{
		// "dead" cards (won't ever be played)
		this.mPlayers[1].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[1].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[1].mHand.AddCard(this.mCardList[0]);
		
		// cards
		this.mPlayers[1].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[1].mHand.AddCard(this.mCardList[0]);
		
		this.mPlayers[1].mHand.AddCard(this.mCardList[1]);
	}
	
	{
		// "dead" cards (won't ever be played)
		this.mPlayers[2].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[2].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[2].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[2].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[2].mHand.AddCard(this.mCardList[0]);
		
		// cards
		this.mPlayers[2].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[2].mHand.AddCard(this.mCardList[0]);
		
		this.mPlayers[2].mHand.AddCard(this.mCardList[7]);
		
		this.mPlayers[2].mHand.AddCard(this.mCardList[8]);
		
		this.mPlayers[2].mHand.AddCard(this.mCardList[11]);
	}
	
	{
		// "dead" cards (won't ever be played)
		this.mPlayers[3].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[3].mHand.AddCard(this.mCardList[0]);
		
		// cards
		this.mPlayers[3].mHand.AddCard(this.mCardList[9]);
		this.mPlayers[3].mHand.AddCard(this.mCardList[9]);
		
		this.mPlayers[3].mHand.AddCard(this.mCardList[10]);
	}
}

OogaahTutorialScene.prototype.SetDesired = function() {
	/*
	 * a.[0] 2x Overseer 	- "Play Overseer"
	 * b.[0] 1x Horde 		- "Play Horde"
	 * c.[1] 1x Overseer
	 * d.[1] 2x Horde
	 * e.[2] 2x Horde		- "Notice ability"
	 * f.[3] 2x Berserker	- "Notice ability"
	 * g.[0] Pass 			- "Pass"
	 * h.[1] Pass
	 * i.[2] Pass			- "AI won, reset"
	 */
	
	{
		// a.[0]
		this.mPlayers[0].AddDesired(new Array(this.mCardList[1], this.mCardList[1]),
				"Not quite! Start by playing both of our Goblin Overseers.",
				2, new Vec2(84, 280), new Vec2(280, 45), "down", 10, new Vec2(96, 377), new Vec2(39, 102));
		
		// b.[0]
		this.mPlayers[0].AddDesired(new Array(this.mCardList[0]),
				"Not quite! Now would be a great time to get rid of our single Goblin Horde, so play it now.",
				1, new Vec2(34, 265), new Vec2(280, 60), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		
		// c.[1]
		this.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(this.mCardList[1]),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// d.[1]
		this.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(this.mCardList[0], this.mCardList[0]),
				"", 1, new Vec2(), new Vec2(), "none", 0);
		
		// e.[2]
		this.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(this.mCardList[0], this.mCardList[0]),
				"", 2, new Vec2(), new Vec2(), "none", 0);
		
		// f.[3]
		this.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(this.mCardList[9], this.mCardList[9]),
				"", 4, new Vec2(), new Vec2(), "none", 0);
		
		// g.[0]
		this.mPlayers[0].AddDesired(new Array(),
				"Not quite! We can't currently make a move, so pass your turn.",
				0, new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 126), new Vec2(280, 45), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		
		// h.[1]
		this.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// i.[2]
		this.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 1, new Vec2(), new Vec2(), "none", 0);
	}
	
	
	/*
	 * a.[3] 1x Warchief
	 * b.[0] Pass 			- "Pass, don't always play"
	 * c.[1] Pass
	 * d.[2] 1x Paladin
	 * e.[3] Pass
	 * f.[0] Pass			- "pass"
	 * g.[1] Pass
	 */
	
	{
		// a.[3]
		this.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(this.mCardList[10]),
				"", 3, new Vec2(), new Vec2(), "none", 0);
		
		// b.[0]
		this.mPlayers[0].AddDesired(new Array(),
				"Not quite! So for now, just pass our turn.",
				0, new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 111), new Vec2(280, 30), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		
		// c.[1]
		this.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// d.[2]
		this.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(this.mCardList[11]),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// e.[3]
		this.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 1, new Vec2(), new Vec2(), "none", 0);
		
		// f.[0]
		this.mPlayers[0].AddDesired(new Array(),
				"Not quite! Once again we'd like to save our cards, so pass.",
				0, new Vec2(nmain.game.mCanvasSize.mX - 300, nmain.game.mCanvasSize.mY - 126), new Vec2(280, 45), "down", 203, new Vec2(505, 446), new Vec2(110, 30));
		
		// g.[1]
		this.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
	}
	
	
	/*
	 * a.[2] 1x Knight		- "ability"
	 * b.[3] Pass
	 * c.[0] 1x Peasant		- "play peasant"
	 * d.[1] Pass
	 * e.[2] 1x Mage
	 * f.[3] Pass
	 * g.[0] 1x Being		- "play being, setting up for the guaranteed win"
	 * h.[1] Pass
	 * i.[2] Pass
	 * j.[3] Pass
	 */
	
	{
		// a.[2]
		this.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(this.mCardList[8]),
				"", 2, new Vec2(), new Vec2(), "none", 0);
		
		// b.[3]
		this.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 1, new Vec2(), new Vec2(), "none", 0);
		
		// c.[0]
		this.mPlayers[0].AddDesired(new Array(this.mCardList[2]),
				"Not quite! It's our turn and the Human Knight's ability is still in effect, so play our Human Peasant.",
				0, new Vec2(34, 265), new Vec2(280, 60), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		
		// d.[1]
		this.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// e.[2]
		this.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(this.mCardList[7]),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// f.[3]
		this.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 3, new Vec2(), new Vec2(), "none", 0);
		
		// g.[0]
		this.mPlayers[0].AddDesired(new Array(this.mCardList[12]),
				"Not quite! So go ahead and play our Being of Energy.",
				0, new Vec2(74, 280), new Vec2(280, 45), "down", 10, new Vec2(96, 377), new Vec2(19, 102));
		
		// h.[1]
		this.mPlayers[1].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// i.[2]
		this.mPlayers[2].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 0, new Vec2(), new Vec2(), "none", 0);
		
		// j.[3]
		this.mPlayers[3].mBehaviourStore.mBehaviours[0].AddDesired(new Array(),
				"", 2, new Vec2(), new Vec2(), "none", 0);
	}
	
	
	/*
	 * a.[0] 1x Berserker
	*/
	
	{
		// a.[0]
		{
			var card = this.mCardList[9].GetCopy();
			card.ModifyValue(-2);
			
			this.mPlayers[0].AddDesired(new Array(card),
					"Not quite! Play our last card - the Orc Berserker - and win the battle!.",
					1, new Vec2(34, 280), new Vec2(280, 45), "down", 10, new Vec2(24, 377), new Vec2(71, 102));
		}
	}
}
// ...End

