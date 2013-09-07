// OogaahTutorialDesired Class...
//
function OogaahTutorialDesired() {
	this.mCards = new Array(); // the desired cards
	this.mShowMessageInc = 0; // the show message increment after a successful play
};
// ...End


// OogaahTutorialScene Class...
// 
function OogaahTutorialScene() {
	OogaahGameScene.apply(this, null); // construct the base class
	
	this.mPlayers[0] = new OogaahTutorialHuman(); // change the first player to a tutorial human
	
	this.mMessageQueue = new OogaahTutorialMessageQueue(); // the queue for tutorial messages
	this.mMessageMeta = new Array(); // holds meta data about the messages in the queue
	this.mShowMessage = 0; // the current message iterator (when > 0, show message at front of queue)
	this.mFinished = false; // is the tutorial finished
	
	this.mTutorialContent = null; // the object that holds the tutorials content (players hands, messages and desired plays)
	
};

// inherit the base class's prototype
OogaahTutorialScene.prototype = Object.create(OogaahGameScene.prototype);

// initialises the scene object
OogaahTutorialScene.prototype.SetUp = function() {
	this.mBatch.mFrustrumCull = false; // don't cull objects outside the screen
	
	{ // set up the background image that makes up the game board
		var tex = nmgrs.resMan.mTextureStore.GetResource("gameBack");
		this.mGameBack.SetTexture(tex);
		this.mGameBack.SetPosition(new Vec2(2, 2)); // slight offset for white border
		this.mGameBack.mDepth = 99999; // always right at the back
	}
	
	this.mMessageMeta.push(new Array()); // add blank meta data so it is always 1 behind message queue
	
	this.CreateCardList(); // create the list holding one of each card
	this.mTutorialContent.SetCards(); // set up player hands in accordance with the tutorial content
	
	this.mGraveyard.SetUp(); // initialise the graveyard
	
	for (var i = 0; i < this.mPlayers.length; ++i) { // for all players
		this.mPlayers[i].SetUp(i); // set up the player
		this.mPlayers[i].PositionHand(); // position their cards
		
		if (this.mPlayers[i].mType == "AI") { // if the player is an ai player
			var behaviour = new OogaahBehaviourTutorial(); // create a new tutorial behaviour
			behaviour.SetUp(this.mPlayers[i]); // initialise the new behaviour with a reference to the player object
			
			this.mPlayers[i].mBehaviourStore.mBehaviours.push(behaviour); // add the behaviour to the player
		}
	}
	
	this.mLog.SetUp(); // set up the play log
	this.mLog.SetLoggedActions(noogaah.options.mLogOptions); // set the log's stored display options
	
	{ // set up and position the status elements
		var pos = new Vec2(102, 143);
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		
		// set up the current attack value element
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
		
		
		// set up the required squad size element
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
		
		
		// set up the game status element
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
	
	this.mTutorialContent.SetMessages(); // set up tutorial messages in accordance with the tutorial content
	this.mTutorialContent.SetDesired(); // set up desired plays in accordance with the tutorial content
	
	if (this.mPlayers[this.mCurrPlayer].mType == "Human") { // if the current (initial) player is a human
		this.mPlayers[this.mCurrPlayer].OnTurnBegin(); // perform logic for the beginning of their turn
	}
	else {
		this.mDelay = 1000; // add a delay before the ai plays their first card
	}
}

// handles user input
OogaahTutorialScene.prototype.Input = function() {
	if (this.mShowMessage == 0) { // if we are not showing tutorial messages
		this.mGraveyard.Input(); // process the graveyard's user input
		this.mLog.Input(); // process the play log's user input
		
		for (var i = 0; i < this.mPlayers.length; ++i) { // for all players
			if (this.mPlayers[i].mType == "Human") { // if the player is human
				this.mPlayers[i].Input(); // process player's input
			}
		}
	}
	else {
		var clicked = this.mMessageQueue.Input(); // handle message queue input, returning true if message was removed from queue
		
		if (clicked == true) { // if message was removed from queue
			if (this.mShowMessage == 1 && this.mFinished == true) { // if we are at the last message and our tutorial is finished
				nmgrs.sceneMan.RequestSceneChange(new OogaahMenuScene()); // return to main menu
			}
			else {
				--this.mShowMessage; // decrement the message iterator
				
				if (this.mMessageMeta.length > 0) { // if there is still message meta data
					this.mMessageMeta.splice(0, 1); // remove 1 from the meta data
				}
			}
		}
	}
}

// handles game logic
OogaahTutorialScene.prototype.Process = function() {
	if (this.mShowMessage == 0) { // if we are not showing tutorial messages
		this.mLog.Process(); // process the play log
		
		this.mGraveyard.Process(); // process the graveyard
		
		for (var i = 0; i < this.mPlayers.length; ++i) { // for all players
			if (this.mPlayers[i].mType == "Human") { // if the player is human 
				this.mPlayers[i].Process(); // process the player
			}
		}
		
		if (this.mDelay <= 0) { // if the ai action delay timer has elapsed
			if (this.mPlayers[this.mCurrPlayer].mType == "AI") { // if the current player is ai
				this.mPlayers[this.mCurrPlayer].Process(); // process the ai
			}
		}
		else {
			if (this.mPlayers[this.mCurrPlayer].mType == "Human") { // if the current player is human
				if (this.mPlayers[this.mCurrPlayer].mFinished == false) { // if the player is still in the game
					this.mDelay = 0; // remove the delay
				}
			}
			else {
				this.mDelay -= 1000 / nmain.game.mFrameLimit; // set the delay to 1 second
			}
		}
		
		if (this.mFinishedCount == 3) { // if 3 of 4 players are finished
			var lastPlayer = null; // reference to the remaining player
			for (var i = 0; i < this.mPlayers.length; ++i) { // for all players
				if (this.mPlayers[i].mFinished == false) { // if the player hasn't finished
					lastPlayer = this.mPlayers[i]; // then they are the remaining player
					break; // stop searching
				}
			}
			
			this.mLog.AddEntry(10, lastPlayer.mName + " was thoroughly decimated (4th)!"); // add entry to the play log
			lastPlayer.mFinished = true; // last player has now finished
			++this.mFinishedCount; // increment count of finished players
			this.mLastPlayer = -1; // unset last player to play
		}
	}
	else {
		this.mMessageQueue.Process(); // process the tutorial message queue
	}
}

// handles all drawing tasks
OogaahTutorialScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	
	arr.push(this.mGameBack); // add the game board
	
	arr = util.ConcatArray(arr, this.mLog.GetRenderData()); // render the play log
	
	for (var i = 0; i < this.mPlayers.length; ++i) { // for all players
		arr = util.ConcatArray(arr, this.mPlayers[i].GetRenderData()); // render the player data
	}
	
	// render the graveyard and battlefield zones
	arr = util.ConcatArray(arr, this.mGraveyard.GetRenderData());
	arr = util.ConcatArray(arr, this.mBattlefield.GetRenderData());
	
	{ // render the game status
		arr.push(this.mStatusAVSprite); // add the current attack value icon
		
		if (this.mStatusAVText.mString != "0") { // if the current attack value text is valid
			arr.push(this.mStatusAVText); // add the current attack value text
		}
		
		arr.push(this.mStatusSSSprite); // add the required squad size icon
		
		if (this.mStatusSSText.mString != "0x") { // if the required squad size text is valid
			arr.push(this.mStatusSSText); // add the required squad size text
		}
		
		if (this.mWarriorOwner != -1) { // if the orc warrior's ability is active
			arr.push(this.mStatusWarrior); // add the icon
		}
		
		if (this.mReversed == true) { // if the orc shaman's ability is active
			arr.push(this.mStatusReversed); // add the icon
		}
		
		if (this.mOnlyPeasants == true) { // if the human knight's ability is active
			arr.push(this.mStatusPeasants); // add the icon
		}
	}
	
	if (this.mShowMessage != 0) { // if we are to show tutorial messages
		arr = util.ConcatArray(arr, this.mMessageQueue.GetRenderData()); // add the current tutorial message from the queue
	}
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(null, null); // render to default target with default camera
}

// adds desired tutorial plays to the specified player
OogaahTutorialScene.prototype.AddDesired = function(playerID, cards, msgInc) {
	if (this.mPlayers[playerID].mType == "Human") { // if the player is human
		this.mPlayers[playerID].AddDesired(cards, msgInc); // add the desired plays
	}
	else { // otherwise it is an ai player
		this.mPlayers[playerID].mBehaviourStore.mBehaviours[0].AddDesired(cards, msgInc); // add the desired plays
	}
}

// adds a repeat of the previous message if a desired play wasn't performed correctly
OogaahTutorialScene.prototype.AddRepeatMessage = function() {
	if (this.mMessageMeta.length > 0) { // if there is still message meta data
		// add the repeat message to the start of the queue and increment the iterator so it displays
		++this.mShowMessage;
		this.mTutorialContent.AddMessage(this.mMessageMeta[0][0], "Not Quite! " + this.mMessageMeta[0][1],
				this.mMessageMeta[0][2], 0);
		this.mMessageQueue.mQueue[0].SetTimeout(0.4);
	}
}
// ...End

