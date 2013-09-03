// OogaahGameScene Class...
// 
function OogaahGameScene() {
	this.mPersist = false;
	this.mPaused = false;
	
	this.mBatch = new RenderBatch(); // the main render batch
	this.mRand = new RNG(); // the random number generator
	
	// this.mBackColour = new Shape();
	this.mGameBack = new Sprite();
	
	this.mCardList = new Array(); // array containing a list of the available cards
	this.mDeck = new Array(); // the deck containing all of the cards required for a game
	
	this.mCurrPlayer = 0;
	this.mLastPlayer = -1;
	this.mPlayers = new Array();
	this.mPlayers[0] = new OogaahHuman();
	this.mPlayers[1] = new OogaahAI();
	this.mPlayers[2] = new OogaahAI();
	this.mPlayers[3] = new OogaahAI();
	this.mFinishedCount = 0;
	
	this.mDelay = 0; // the amount of delay left before the AI can make another move (in MS)
	
	this.mCurrAV = 0;
	this.mCurrSS = 0;
	this.mWarriorOwner = -1;
	this.mReversed = false;
	this.mOnlyPeasants = false;
	
	this.mBattlefield = new OogaahBattlefield();
	this.mGraveyard = new OogaahGraveyard();
	
	this.mStatusAVText = new Text();
	this.mStatusAVSprite = new Sprite();
	this.mStatusSSText = new Text();
	this.mStatusSSSprite = new Sprite();
	this.mStatusWarrior = new Sprite();
	this.mStatusReversed = new Sprite();
	this.mStatusPeasants = new Sprite();
	
	this.mLog = new OogaahPlayLog();
};

// returns the type of this object for validity checking
OogaahGameScene.prototype.Type = function() {
	return "OogaahGameScene";
}

// initialises the scene object
OogaahGameScene.prototype.SetUp = function() {
	this.mBatch.mFrustrumCull = false;
	
	{
		/* this.mBackColour.mPos.Set(2, 2);
		this.mBackColour.AddPoint(new Vec2(636,   0));
		this.mBackColour.AddPoint(new Vec2(636, 476));
		this.mBackColour.AddPoint(new Vec2(  0, 476));
		this.mBackColour.mAbsolute = true;
		this.mBackColour.mDepth = 99999;
		this.mBackColour.mColour = "#35251C"; */
		
		var tex = nmgrs.resMan.mTextureStore.GetResource("gameBack");
		this.mGameBack.SetTexture(tex);
		this.mGameBack.SetPosition(new Vec2(2, 2));
		this.mGameBack.mDepth = 99999;
	}
	
	this.CreateCardList();
	this.ShuffleDeck();
	this.DealCards();
	
	this.mGraveyard.SetUp();
	
	for (var i = 0; i < this.mPlayers.length; ++i) {
		this.mPlayers[i].SetUp(i);
		this.mPlayers[i].PositionHand();
	}
	
	this.mLog.SetUp();
	this.mLog.SetLoggedActions(noogaah.options.mLogOptions);
	
	for (var i = 0; i < this.mPlayers.length; ++i) {
		if (this.mPlayers[i].mType == "AI") {
			var behaviour = new OogaahBehaviourSimple();
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
	
	/* this.mBattlefield.AddCard(this.mCardList[n]);
	this.mPlayers[n].mHand.mCards.splice(0, this.mPlayers[n].mHand.mCards.length);
	this.mPlayers[n].mHand.AddCard(this.mCardList[m]);
	this.mPlayers[n].mHand.mCards[this.mPlayers[n].mHand.mCards.length - 1].ModifyValue(-3);
	this.mPlayers[n].PositionHand();
	this.mPlayers[n].ResetSelected(); */
}

// cleans up the scene object
OogaahGameScene.prototype.TearDown = function() {
	
}

// handles user input
OogaahGameScene.prototype.Input = function() {
	this.mGraveyard.Input(); // process the graveyard's user input
	this.mLog.Input(); // process the play log's user input
	
	for (var i = 0; i < this.mPlayers.length; ++i) {
		if (this.mPlayers[i].mType == "Human") {
			this.mPlayers[i].Input();
		}
	}
}

// handles game logic
OogaahGameScene.prototype.Process = function() {
	this.mLog.Process(); // process the play log
	
	if (false) { // if playMode is 0
		if (true) { // if this is the first round
			// do init stuff
		}
		else { // otherwise
			// do other stuff
		}
	}
	else if (true) { // otherwise if playMode is 1
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
}

// handles all drawing tasks
OogaahGameScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	
	// arr.push(this.mBackColour);
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
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(null, null);
}

OogaahGameScene.prototype.CreateCardList = function() {	
	// load card face textures (large, medium and small)
	var texLarge = nmgrs.resMan.mTextureStore.GetResource("cardsLarge");
	var texMedium = nmgrs.resMan.mTextureStore.GetResource("cardsMedium");
	var texSmall = nmgrs.resMan.mTextureStore.GetResource("cardsSmall");
	
	// load card back textures (large, medium and small)
	var texBackLarge = nmgrs.resMan.mTextureStore.GetResource("cardBackLarge");
	var texBackMedium = nmgrs.resMan.mTextureStore.GetResource("cardBackMedium");
	var texBackSmall = nmgrs.resMan.mTextureStore.GetResource("cardBackSmall");
	
	{ // add one of each card to the card list
		this.mCardList.push(new OogaahCardGoblinHorde());
		this.mCardList.push(new OogaahCardGoblinOverseer());
		this.mCardList.push(new OogaahCardHumanPeasant());
		this.mCardList.push(new OogaahCardOrcWarrior());
		
		this.mCardList.push(new OogaahCardGoblinTechnician());
		this.mCardList.push(new OogaahCardOrcShaman());
		this.mCardList.push(new OogaahCardHumanCleric());
		this.mCardList.push(new OogaahCardHumanMage());
		
		this.mCardList.push(new OogaahCardHumanKnight());
		this.mCardList.push(new OogaahCardOrcBerserker());
		this.mCardList.push(new OogaahCardOrcWarchief());
		this.mCardList.push(new OogaahCardHumanPaladin());
		
		this.mCardList.push(new OogaahCardBeingOfEnergy());
	}
	
	for (var i = 0; i < this.mCardList.length; ++i) { // for all cards in the card list
		var c = this.mCardList[i]; // get a reference to the card
		
		// set the large textures
		c.mCardSprites[0].SetTexture(texLarge, 13, 5, -1, -1); c.mCardSprites[0].SetCurrentFrame(i);
		c.mCardSprites[0].SetMask();
		c.mCardBacks[0].SetTexture(texBackLarge);
		c.mCardBacks[0].SetMask();
		
		// set the medium textures
		c.mCardSprites[1].SetTexture(texMedium, 13, 5, -1, -1); c.mCardSprites[1].SetCurrentFrame(i);
		c.mCardSprites[1].SetMask();
		c.mCardBacks[1].SetTexture(texBackMedium);
		c.mCardBacks[1].SetMask();
		
		// set the small textures
		c.mCardSprites[2].SetTexture(texSmall, 13, 5, -1, -1); c.mCardSprites[2].SetCurrentFrame(i);
		c.mCardSprites[2].SetMask();
		c.mCardBacks[2].SetTexture(texBackSmall);
		c.mCardBacks[2].SetMask();
		
		// set the large shape alpha and colour
		c.mCardShapes[0].mAlpha = 0.0;
		c.mCardShapes[0].mColour = "#000000";
		
		// set the medium shape alpha and colour
		c.mCardShapes[1].mAlpha = 0.5;
		c.mCardShapes[1].mColour = "#000000";
		
		// set the small shape alpha and colour
		c.mCardShapes[2].mAlpha = 0.64;
		c.mCardShapes[2].mColour = "#000000";
	}
}

OogaahGameScene.prototype.ShuffleDeck = function() {
	this.mDeck.splice(0, this.mDeck.length); // make sure the deck is empty
	var unshuffled = new Array(); // unshuffle deck
	
	// for all the cards in the list (except the last)
	for (var i = 0; i < this.mCardList.length - 1; ++i) {
		for (var j = 0; j < 4; ++j) { // add 4 of them to the deck
			unshuffled.push(this.mCardList[i].GetCopy());
		}
	}
	
	{
		// add a copy of the last card "Being of Light"
		unshuffled.push(this.mCardList[this.mCardList.length - 1].GetCopy());
	}
	
	this.mDeck = util.ConcatArray(this.mDeck, util.ShuffleArray(this.mRand, unshuffled)); // shuffle the deck
}

OogaahGameScene.prototype.DealCards = function(first) {
	var id = first; // set first to the supplied id
	if (id == null) { // if no id was supplied
		id = this.mRand.GetRandInt(0, 3); // choose a random number from 0 to 3 inclusive
	}
	
	this.mCurrPlayer = id; // set the current player
	if (this.mPlayers[this.mCurrPlayer].mType == "AI") { // if the initial player is ai
		this.mDelay = 1000; // add a delay before they play their first card
	}
	
	for (var i = 0; i < this.mDeck.length; ++i) { // for all cards in the deck
		this.mPlayers[id].mHand.AddCard(this.mDeck[i]); // add current card to current players hand
		id = (id + 1) % 4; // go to next player
	}
}

OogaahGameScene.prototype.ChangePlayer = function(player) {
	if (this.mFinishedCount < 4) {
		if (player == null) {
			if (this.mLastPlayer == -1 && this.mPlayers[this.mCurrPlayer].mFinished == false) {
				this.mLastPlayer = this.mCurrPlayer;
			}
			
			this.mCurrPlayer = (this.mCurrPlayer + 1) % 4;
		}
		else {
			this.mCurrPlayer = player;
			this.mLastPlayer = -1;
		}
		
		if (this.mCurrPlayer == this.mLastPlayer) { // 
			this.mLog.AddEntry(6, this.mPlayers[this.mCurrPlayer].mName + " won the skirmish!");
			
			this.mLastPlayer = -1; // reset the last player id
			this.SetAV(0); // reset the current attackvalue
			this.SetSS(0); // reset the current squadsize
			this.mWarriorOwner = -1;
			this.mReversed = false;
			this.mOnlyPeasants = false;
			
			var arr = new Array(); arr = util.ConcatArray(arr, this.mBattlefield.mCards);
			
			if (arr.length > 0) {
				if (arr[0].mCardAttack == "9") {
					this.mLog.AddEntry(5, "Human Peasant's " + this.mCardList[2].mCardAbility + " ability activates.");
				}
				
				this.mGraveyard.AddCards(arr);
				this.mBattlefield.Clear();
			}
		}
		
		if (this.mPlayers[this.mCurrPlayer].mType == "Human") {
			this.mPlayers[this.mCurrPlayer].OnTurnBegin();
		}
	}
}

OogaahGameScene.prototype.SetAV = function(newAV) {
	this.mCurrAV = newAV;
	
	if (newAV > 0) {
		this.mStatusAVText.SetString(noogaah.IndexToAV(newAV - 1));
	}
	else {
		this.mStatusAVText.SetString("0");
	}
}

OogaahGameScene.prototype.SetSS = function(newSS) {
	this.mCurrSS = newSS;
	
	this.mStatusSSText.SetString(newSS + "x");
	this.mStatusSSSprite.SetCurrentFrame(newSS);
}
// ...End

