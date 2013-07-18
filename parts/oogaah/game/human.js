// OogaahHuman class
// logic for a human player (as opposed to an ai player)
function OogaahHuman() {
	OogaahPlayer.apply(this, null); // construct the base class
	
	this.mType = "Human";
	
	this.mPreview = false; // indication of whether preview mode is active or not (viewing large card sprite)
	
	this.mCurrentHighlight = -1; // the id of the current card highlighted (-1 if none)
	
	this.mRecentSelection = false; // was a card selected recently
	this.mRecentCoords = new Vec2(); // the coordinates of the mouse when the card was selected
	
	this.mHelpMode = false; // has help mode been enabled? (clicking on a card will show card help)
	
	this.mRecievedCount = 0; // 
	this.mRecievedCard = null;
	
	this.mGUI = new OogaahHumanUI(); // player gui
	this.mTurnHighlightSmall = new Array();
	this.mTurnHighlightMedium = new Array();
};

// inherit the base class's prototype
OogaahHuman.prototype = Object.create(OogaahPlayer.prototype);

// set up the player (id assigned to this player [integer])
OogaahHuman.prototype.SetUp = function(id) {
	this.mPlayerID = id; // set the player's id
	this.mName = "Player";
	this.ResetSelected(); // reset selected cards (initialises array)
	
	// set up the player gui
	this.mGUI.SetUp(this);
	
	// set up the tooltip element
	// var fntTT = nmgrs.resMan.mFontStore.GetResource("monaco");
	// this.mGUI.mTooltip.SetUp(new Vec2(), -10); // initiate font and size so we don't have to do it later when setting text
	// this.mGUI.mTooltip.SetText(fntTT, 16, "");
}

// process player input
OogaahHuman.prototype.Input = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.P) == true) { // if the p key is pressed
		currScene.mPaused = !currScene.mPaused; // toggle pause
		this.mGUI.SetFade(currScene.mPaused, "Paused");
		
		if (this.mPreview == true) { // if we're in preview mode
			this.mHand.mCards[this.mCurrentHighlight].mSize = 2; // display small card sprite
			this.mPreview = false; // we've left preview mode
		}
	}
	
	if (currScene.mPaused == false) { // if game is currently unpaused
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if LMB is pressed
			if (this.mHelpMode == true) { // if in help mode
				if (this.mCurrentHighlight != -1) { // if a card is currently highlighted
					currScene.mPaused = true; // pause the current game
					this.mGUI.SetFade(true, "Card Preview");
					
					this.mHand.mCards[this.mCurrentHighlight].mSize = 0; // display large card sprite
					this.mPreview = true; // we've entered preview mode
				}
				
				this.mHelpMode = false; // disable help mode
				nmgrs.inputMan.SetCursorStyle("default"); // set the cursor back to default
			}
			else {
				if (currScene.mCurrPlayer == 0) { // if this player is the current player
					if (this.mCurrentHighlight != -1) { // if a card is currently highlighted
						this.SelectedControl(); // select a card
					}
				}
			}
		}
		
		this.HandleGoblinTechnician(); // handle player input when we are in goblin tachnician mode (due to ability)
		this.HandleHumanPaladin();
		this.mGUI.Input(); // handle gui input
	}
}

// process the player state
OogaahHuman.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (currScene.mPaused == false) { // if the game isn't paused
		if (this.mPreview == false) { // if we're not in preview mode
			var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get the cursor position
			
			if (this.mRecentSelection == false) { // if we haven't recently selected a card
				this.mCurrentHighlight = -1; // reset the current highlighted card
				var found = false; // have we found a card that is highlighted (assume no initially)
				
				for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
					var bounds = this.mHand.mCards[i].mCardSprites[2].mGlobalMask.GetBounds();
					var tl = bounds[0];
					var br = bounds[1];
					
					// if the cursor is within the bounding box
					if (util.PointInRectangle(p, tl, br) == true && found == false) {
						this.mCurrentHighlight = i; // set the current highlighted card to this card
						this.mHand.mCards[i].mSize = 1; // set its size to medium
						found = true; // we're done searching
					}
					else {
						this.mHand.mCards[i].mSize = 2; // ensure size is small
					}
				}
			}
			else {
				// if either of the coordinates has changed since the selection was made
				if (p.mX != this.mRecentCoords.mX || p.mY != this.mRecentCoords.mY) {
					this.mRecentSelection = false; // recent selection no longer applies
				}
			}
			
			if (this.mFinished == true && currScene.mCurrPlayer == this.mPlayerID) {
				currScene.ChangePlayer(); // change to the next player
			}
		}
		
		this.mGUI.Process(); // process the player gui
	}
}

// render anything associated with the player
OogaahHuman.prototype.GetRenderData = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var arr = new Array(); // returned array holding the renderables
	
	arr = util.ConcatArray(arr, this.mHand.GetRenderData()); // add the player's hand to the array
	
	arr = util.ConcatArray(arr, this.mGUI.GetRenderData()); // add the player gui
	
	if (currScene.mCurrPlayer == this.mPlayerID) {
		for (var i = 0; i < this.mTurnHighlightSmall.length; ++i) {
			if (this.mHand.mCards[i].mSize != 0) {
				if (this.mCurrentHighlight == i) {
					arr.push(this.mTurnHighlightMedium[i]);
				}
				else {
					arr.push(this.mTurnHighlightSmall[i]);
				}
			}
		}
	}
	
	return arr; // return the renderables array
}

// positions the player's hand
OogaahHuman.prototype.PositionHand = function() {
	this.mHand.mCards.sort(noogaah.CardSort); // sort the cards by value
	this.mTurnHighlightSmall.splice(0, this.mTurnHighlightSmall.length);
	this.mTurnHighlightMedium.splice(0, this.mTurnHighlightMedium.length);
	
	var pos = new Vec2(60, 480); // the default posiiton (initial card position)
	
	for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
		var card = this.mHand.mCards[i]; // store a reference to the current card
		card.mHidden = false;
		
		if (this.mSelectedCards[i] == 1 || this.mSelectedCards[i] == 3) {
			card.mDarken = false;
		}
		
		card.mSize = 2;
		
		// set the large sprite position, origin and depth
		var lrgSpr = card.mCardSprites[0];
		lrgSpr.SetPosition(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 3), Math.round(nmain.game.mCanvasSize.mY / 2)));
		lrgSpr.SetOrigin(new Vec2(Math.round(lrgSpr.mSize.mX / 2), Math.round(lrgSpr.mSize.mY / 2)));
		lrgSpr.mDepth = -101;
		
		// set the medium sprite position, origin and depth
		var medSpr = card.mCardSprites[1];
		medSpr.SetPosition(pos);
		medSpr.SetOrigin(new Vec2(Math.round(medSpr.mSize.mX / 2), medSpr.mSize.mY));
		medSpr.mDepth = 0;
		medSpr.SetRotation(0);
		
		// set the small sprite position, origin and depth
		var smlSpr = card.mCardSprites[2];
		smlSpr.SetPosition(pos);
		smlSpr.SetOrigin(new Vec2(Math.round(smlSpr.mSize.mX / 2), smlSpr.mSize.mY));
		smlSpr.mDepth = 1 + i;
		smlSpr.SetRotation(0);
		
		// create the card shapes
		card.CreateCardShapes();
		
		// set depths
		card.mCardShapes[1].mDepth = 0;
		card.mCardShapes[2].mDepth = 1 + i;
		
		if (card.mCardAttack == "3" || card.mCardAttack == "C") { // if the card is a human peasant or an orc berserker
			card.PositionValueText();
		}
		
		{
			var highSmall = new Shape();
			
			highSmall.SetPosition(new Vec2(smlSpr.mPos.mX, smlSpr.mPos.mY));
			highSmall.AddPoint(new Vec2(smlSpr.mSize.mX + 6, 0));
			highSmall.AddPoint(new Vec2(smlSpr.mSize.mX + 6, smlSpr.mSize.mY + 6));
			highSmall.AddPoint(new Vec2(0, smlSpr.mSize.mY + 6));
			highSmall.SetOrigin(new Vec2(Math.round(smlSpr.mSize.mX / 2) + 3, smlSpr.mSize.mY + 3));
			
			highSmall.mColour = "#74AA19";
			highSmall.mDepth = 50;
			
			this.mTurnHighlightSmall.push(highSmall);
			
			
			var highMedium = new Shape();
			
			highMedium.SetPosition(new Vec2(medSpr.mPos.mX, medSpr.mPos.mY));
			highMedium.AddPoint(new Vec2(medSpr.mSize.mX + 6, 0));
			highMedium.AddPoint(new Vec2(medSpr.mSize.mX + 6, medSpr.mSize.mY + 6));
			highMedium.AddPoint(new Vec2(0, medSpr.mSize.mY + 6));
			highMedium.SetOrigin(new Vec2(Math.round(medSpr.mSize.mX / 2) + 3, medSpr.mSize.mY + 3));
			
			highMedium.mColour = "#74AA19";
			highMedium.mDepth = 50;
			
			this.mTurnHighlightMedium.push(highMedium);
		}
		
		pos.mX += 20; // increment the position by an x offset
	}
}

// reset the state of selected cards in the hand
OogaahHuman.prototype.ResetSelected = function() {
	this.mSelectedCards.splice(0, this.mSelectedCards.length); // clear the current selected array
	for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
		this.mSelectedCards.push(1); // add a 1 (selectable) to the selected array
		this.mHand.mCards[i].mDarken = false;
	}
	
	this.PositionHand(); // reposition the hand
	
	// reset the recent selection status
	this.mRecentSelection = false;
	this.mRecentCoords.Set(0, 0);
}

// handle card selection
OogaahHuman.prototype.SelectedControl = function() {
	// if highlighted card is selectable (1) OR single-selectable (3)
	if (this.mSelectedCards[this.mCurrentHighlight] == 1 || this.mSelectedCards[this.mCurrentHighlight] == 3) {
		// reposition card visually
		this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].SetPosition(new Vec2(
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].mPos.mX,
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].mPos.mY - 40));
		
		this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].SetPosition(new Vec2(
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].mPos.mX,
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].mPos.mY - 40));
		
		// if the card is a human peasant or an orc berserker
		if (this.mHand.mCards[this.mCurrentHighlight].mCardAttack == "3" ||
				this.mHand.mCards[this.mCurrentHighlight].mCardAttack == "C") {
			
			// reposition the cards value text (due to ability)
			this.mHand.mCards[this.mCurrentHighlight].mValueText[2].SetPosition(new Vec2(
					this.mHand.mCards[this.mCurrentHighlight].mValueText[2].mPos.mX,
					this.mHand.mCards[this.mCurrentHighlight].mValueText[2].mPos.mY - 40));
			
			this.mHand.mCards[this.mCurrentHighlight].mValueText[1].SetPosition(new Vec2(
					this.mHand.mCards[this.mCurrentHighlight].mValueText[1].mPos.mX,
					this.mHand.mCards[this.mCurrentHighlight].mValueText[1].mPos.mY - 40));
		}
		
		// reposition the highlight sprites
		this.mTurnHighlightSmall[this.mCurrentHighlight].SetPosition(new Vec2(
				this.mTurnHighlightSmall[this.mCurrentHighlight].mPos.mX,
				this.mTurnHighlightSmall[this.mCurrentHighlight].mPos.mY - 40));
		
		this.mTurnHighlightMedium[this.mCurrentHighlight].SetPosition(new Vec2(
				this.mTurnHighlightMedium[this.mCurrentHighlight].mPos.mX,
				this.mTurnHighlightMedium[this.mCurrentHighlight].mPos.mY - 40));
		
		if (this.mSelectedCards[this.mCurrentHighlight] == 1) { // if the card is selectable (1)
			this.mSelectedCards[this.mCurrentHighlight]	= 2; // highlighted card is selected (2)
			
			if (this.mHand.mCards[this.mCurrentHighlight].mCardAttack != "S") { // don't block any cards if this is an S
				for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
					if (this.mSelectedCards[i] == 1) { // if card is selectable
						// if card doesn't match this and isn't an S
						if (this.mHand.mCards[i].mCardValue != this.mHand.mCards[this.mCurrentHighlight].mCardValue &&
								this.mHand.mCards[i].mCardAttack != "S") {
							
							this.mSelectedCards[i] = 0; // card can no longer be selected
							this.mHand.mCards[i].mDarken = true;
						}
					}
				}
			}
		}
		else { // otherwise card is single-selectable (3)
			this.mSelectedCards[this.mCurrentHighlight]	= 4; // highlighted card is single-selected (4)
			
			for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
				if (this.mSelectedCards[i] == 3) { // if card is single-selectable
					this.mSelectedCards[i] = 0; // card can no longer be selected
					this.mHand.mCards[i].mDarken = true;
				}
			}
		}
	}
	else if (this.mSelectedCards[this.mCurrentHighlight] == 2 || this.mSelectedCards[this.mCurrentHighlight] == 4) { // if highlighted card is already selected (2) OR single-selected (4)
		// reposition card visually
		this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].SetPosition(new Vec2(
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].mPos.mX,
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].mPos.mY + 40));
		
		this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].SetPosition(new Vec2(
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].mPos.mX,
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].mPos.mY + 40));
		
		if (this.mHand.mCards[this.mCurrentHighlight].mCardAttack == "3" ||
				this.mHand.mCards[this.mCurrentHighlight].mCardAttack == "C") {
			
			this.mHand.mCards[this.mCurrentHighlight].mValueText[2].SetPosition(new Vec2(
					this.mHand.mCards[this.mCurrentHighlight].mValueText[2].mPos.mX,
					this.mHand.mCards[this.mCurrentHighlight].mValueText[2].mPos.mY + 40));
			
			this.mHand.mCards[this.mCurrentHighlight].mValueText[1].SetPosition(new Vec2(
					this.mHand.mCards[this.mCurrentHighlight].mValueText[1].mPos.mX,
					this.mHand.mCards[this.mCurrentHighlight].mValueText[1].mPos.mY + 40));
		}
		
		// reposition the highlight sprites
		this.mTurnHighlightSmall[this.mCurrentHighlight].SetPosition(new Vec2(
				this.mTurnHighlightSmall[this.mCurrentHighlight].mPos.mX,
				this.mTurnHighlightSmall[this.mCurrentHighlight].mPos.mY + 40));
		
		this.mTurnHighlightMedium[this.mCurrentHighlight].SetPosition(new Vec2(
				this.mTurnHighlightMedium[this.mCurrentHighlight].mPos.mX,
				this.mTurnHighlightMedium[this.mCurrentHighlight].mPos.mY + 40));
		
		if (this.mSelectedCards[this.mCurrentHighlight] == 2) { // if the card is selected (2)
			this.mSelectedCards[this.mCurrentHighlight]	= 1; // highlighted card is selectable (1)
			
			var allValid = false; // should we allow all cards to be selected again
			var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // currently selected cards
			if (arr.length == 1) { // if there is only one currently selected card
				if (arr[0].mCardAttack == "S") { // and it is an S
					allValid = true; // all cards are now valid
				}
			}
			else if (arr.length == 0) { // otherwise if there are no currently selected cards
				allValid = true; // all cards are now valid
			}
			
			if (allValid == true) {  // if all cards are valid
				for (var i = 0; i < this.mSelectedCards.length; ++i) { // for all cards
					if (this.mSelectedCards[i] == 0) { // if a card was previously invalid
						this.mSelectedCards[i] = 1; // make it selectable
						this.mHand.mCards[i].mDarken = false;
					}
				}
			}
		}
		else { // otherwise card is single-selected (4)
			this.mSelectedCards[this.mCurrentHighlight]	= 3; // highlighted card is single-selectable (3)
			
			for (var i = 0; i < this.mSelectedCards.length; ++i) { // for all cards
				if (this.mSelectedCards[i] == 0) { // if a card was previously invalid
					this.mSelectedCards[i] = 3; // make it single-selectable
					this.mHand.mCards[i].mDarken = false;
				}
			}
		}
	}
	
	// set the recent selection status
	this.mRecentSelection = true;
	this.mRecentCoords = new Vec2(); this.mRecentCoords.Copy(nmgrs.inputMan.GetLocalMouseCoords());
}

// logic called when the player's turn begins
OogaahHuman.prototype.OnTurnBegin = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (currScene.mOnlyPeasants == true) {
		for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
			if (this.mHand.mCards[i].mCardAttack == "3") {
				this.mSelectedCards[i] = 3;
				this.mHand.mCards[i].mDarken = false;
			}
			else {
				this.mSelectedCards[i] = -1;
				this.mHand.mCards[i].mDarken = true;
			}
		}
	}
}

// logic called when the play button is clicked in the player gui
OogaahHuman.prototype.OnPlay = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (this.mMode == 5 && this.mSubMode == "b") { // if we are in goblin technician mode (submode b)
		for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards
			this.mSelectedCards[i] = 3; // set cards to single-selectable (3)
			this.mHand.mCards[i].mDarken = false;
		}
		
		this.mGUI.mDisplayCard = null;
		
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Swap Card");
		this.mGUI.ShowMessage(true, "Choose which card to swap or pass.");
		
		this.mSubMode = "c"; // change to submode c
	}
	else if (this.mMode == 6) { // otherwise if we are in orc shaman mode
		currScene.mReversed = !currScene.mReversed; // reverse the current game values
		
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(3, this.mName + " reversed card values for this skirmish."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else { // otherwise we are in normal play
		var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
		if (arr.length > 0) { // if we have selected at least 1 card
			arr[0].Play(arr); // play that/those cards
			currScene.mDelay = 1000;
		}
	}
	
	if (this.mHand.mCards.length == 0 && this.mMode == 0 && this.mFinished == false) {
		if (currScene.mFinishedCount == 0) {
			currScene.mLog.AddEntry(7, this.mName + " achieved a flawless victory (1st)!"); // add entry to the play log
		}
		else if (currScene.mFinishedCount == 1) {
			currScene.mLog.AddEntry(8, this.mName + " won a costly battle (2nd)!"); // add entry to the play log
		}
		else if (currScene.mFinishedCount == 2) {
			currScene.mLog.AddEntry(9, this.mName + " yielded and limped home (3rd)!"); // add entry to the play log
		}
		
		++currScene.mFinishedCount;
		this.mFinished = true;
	}
}

// logic called when the pass button is clicked in the player gui
OogaahHuman.prototype.OnPass = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (this.mMode == 2) { // if we are in goblin overseer mode
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(4, this.mName + " chose not to play any Goblin Hordes."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 5) { // otherwise if we are in goblin technician mode
		if (this.mSubMode == "a") { // if we are in submode a
			for (var i = 0; i < 4; ++i) { // for all other players
				if (i != this.mPlayerID) {
					currScene.mPlayers[i].mSelectable = false; // set hand selection to false
				}
			}
			
			currScene.mGraveyard.mSelectable = false; // set graveyard selection to false
			
			this.mGUI.mButtons[0].mActive = true;
			this.mGUI.mButtonCovers[0].mActive = true;
			this.mGUI.ShowMessage(false);
			
			currScene.mLog.AddEntry(4, this.mName + " chose not to swap a card."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
			currScene.mDelay = 1000;
		}
		else if (this.mSubMode == "b") { // otherwise if we are in submode b
			// update player gui text
			this.mGUI.mButtonText[0].SetString("Play");
			this.mGUI.ShowMessage(false);
			
			// add entry to the play log
			currScene.mLog.AddEntry(4, this.mName + " chose not to swap for a " +
					this.mChosenPlayer.mCards[this.mChosenCard].mCardType + " " +
					this.mChosenPlayer.mCards[this.mChosenCard].mCardName  + ".");
			
			this.mMode = 0; // reset to mode 0
			this.mSubMode = "a"; // reset to submode a
			
			// reset goblin technician selection choices
			this.mGUI.mDisplayCard = null;
			this.mChosenPlayer = null;
			this.mChosenID = -1;
			this.mChosenCard = -1;
			
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
			currScene.mDelay = 1000;
		}
		else if (this.mSubMode == "c") { // otherwise if we are in submode c
			this.mGUI.mButtonText[0].SetString("Play");
			this.mGUI.ShowMessage(false);
			
			currScene.mLog.AddEntry(4, this.mName + " cancelled the card swap."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.mSubMode = "a"; // reset to submode a
			
			// reset goblin technician selection choices
			this.mChosenPlayer = null;
			this.mChosenID = -1;
			this.mChosenCard = -1;
			
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
			currScene.mDelay = 1000;
		}
	}
	else if (this.mMode == 6) { // otherwise if we are in orc shaman mode
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(4, this.mName + " chose not to reverse card values for this skirmish."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 8) { // otherwise if we are in human mage mode
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(4, this.mName + " chose not to play a card alongside Human Mage."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 12) { // otherwise if we are in human paladin mode
		if (this.mRecievedCount == 0) {
			currScene.mLog.AddEntry(4, this.mName + " chose not to take any cards from the graveyard."); // add entry to the play log
		}
		else {
			currScene.mLog.AddEntry(3, this.mName + " took " + this.mRecievedCount + "x " +
					this.mRecievedCard.mCardType + " " + this.mRecievedCard.mCardName + " from the graveyard.");
			
			currScene.mGraveyard.mViewLeftButton.mActive = true;
			currScene.mGraveyard.mViewRightButton.mActive = true;
		}
		
		currScene.mGraveyard.SetView(false);
		
		this.mGUI.mButtons[0].mActive = true;
		this.mGUI.mButtonCovers[0].mActive = true;
		this.mGUI.ShowMessage(false);
		
		this.mRecievedCount = 0;
		this.mRecievedCard = null;
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else { // otherwise we are in normal play
		currScene.mLog.AddEntry(2, this.mName + " passed."); // add entry to the play log
		
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
}

// logic called when the help button is clicked in the player gui
OogaahHuman.prototype.OnHelp = function() {
	this.mHelpMode = true; // enable help mode
	nmgrs.inputMan.SetCursorStyle("help"); // change the cursor
}

// logic called when the options button is clicked in the player gui
OogaahHuman.prototype.OnOptions = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	currScene.mPersist = true; // set this scene to persistent
	nmgrs.sceneMan.RequestSceneChange(new OogaahOptionsScene()); // request a scene change to the options scene
}

// logic to handle user input when relating to goblin technician's ability
OogaahHuman.prototype.HandleGoblinTechnician = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (this.mMode == 5) { // if we are in goblin technician mode
		if (this.mSubMode == "a") { // if we are in submode a
			this.mChosenPlayer = null; // reset chosen player to null
			var found = false; // selected player hand not found
			var player = null; // selected player is null
			
			for (var i = 0; i < 4; ++i) { // for all other players
				if (i != this.mPlayerID) {
					var p = currScene.mPlayers[i]; // store a reference to the player
					var hand = p.mHand; // store a reference to the player's hand
					
					p.Highlight(false); // player isn't highlighted
					
					if (found == false) { // if we haven't yet found a player hand
						if (p.HandHighlighted() == true) { // if we are hovering over the current player's hand
							player = currScene.mPlayers[i]; // store the reference to that player
							this.mChosenPlayer = hand; // store a reference to that player's hand
							this.mChosenID = i; // store that players id
							
							found = true; // indicate we have found a player
							p.Highlight(true); // highlight the current player's hand
						}
					}
				}
			}
			
			if (this.mChosenPlayer == null) { // if we didn't find a player previously
				player = currScene.mGraveyard; // store a reference to the graveyard
				
				player.Highlight(false); // graveyard isn't highlighted
				if (currScene.mGraveyard.HandHighlighted() == true) { // if we are hovering over the current graveyard
					this.mChosenPlayer = currScene.mGraveyard; // store a reference to the graveyard
					this.mChosenID = -1; // store the graveyards id (-1)
					
					player.Highlight(true); // highlight the graveyard
				}
			}
			
			if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if left mouse button is clicked
				if (this.mChosenPlayer != null) { // if we have found a player (inc. the graveyard)
					if (this.mChosenPlayer.mCards.length > 0) { // if the player has at least 1 card
						// select a random card from the chosen player's hand
						this.mChosenCard = currScene.mRand.GetRandInt(0, this.mChosenPlayer.mCards.length - 1);
						
						{
							this.mGUI.mDisplayCard = this.mChosenPlayer.mCards[this.mChosenCard].GetCopy();
							this.mGUI.mDisplayCard.mHidden = false;
							this.mGUI.mDisplayCard.mDarken = false;
							this.mGUI.mDisplayCard.mSize = 1;
							this.mGUI.mDisplayCard.mCardSprites[1].SetOrigin(new Vec2());
							this.mGUI.mDisplayCard.mCardSprites[1].SetPosition(new Vec2(246, 121));
							this.mGUI.mDisplayCard.mCardSprites[1].SetRotation(0);
							this.mGUI.mDisplayCard.mCardSprites[1].mDepth = -10;
							
							// if the card is a human peasant or an orc berserker
							if (this.mGUI.mDisplayCard.mCardAttack == "3" || this.mGUI.mDisplayCard.mCardAttack == "C") {
								this.mGUI.mDisplayCard.PositionValueText();
							}
						}
						
						player.Highlight(false); // unhighlight the chosen player
						for (var i = 0; i < 4; ++i) { // for all other players
							if (i != this.mPlayerID) {
								currScene.mPlayers[i].mSelectable = false; // player can't be selected
							}
						}
						
						currScene.mGraveyard.mSelectable = false; // graveyard can't be selected
						
						// update player gui text
						this.mGUI.mButtons[0].mActive = true;
						this.mGUI.mButtonCovers[0].mActive = true;
						this.mGUI.mButtonText[0].SetString("Accept");
						this.mGUI.ShowMessage(true, "Choose to accept " + this.mChosenPlayer.mCards[this.mChosenCard].mCardType +
								" " + this.mChosenPlayer.mCards[this.mChosenCard].mCardName + " or pass.");
						
						this.mSubMode = "b"; // enter submode b
					}
				}
			}
			else { // otherwise if no mouse button was pressed
				this.mChosenPlayer = null; // reset the selected player to null
			}
		}
	}
}

// logic to handle user input when relating to human paladin's ability
OogaahHuman.prototype.HandleHumanPaladin = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var graveyard = currScene.mGraveyard;
	
	if (this.mMode == 12) { // if we are in human paladin mode
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if left mouse button is clicked
			if (graveyard.mCurrentHighlight != -1) {
				var viewCard = graveyard.mViewCards[graveyard.mViewIndex][graveyard.mCurrentHighlight];
				
				var done = false;
				if (graveyard.mViewCards[graveyard.mViewIndex].length == 1) {
					done = true;
				}
				
				if (this.mRecievedCount == 0) {
					graveyard.mViewLeftButton.mActive = false;
					graveyard.mViewRightButton.mActive = false;
					
					if (viewCard.mCard.mCardAttack == "9") {
						currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activated.");
					}
					else if (viewCard.mCard.mCardAttack == "S") {
						if (viewCard.mCard.mMimic != null) { // if being of light was played using its ability
							if (viewCard.mCard.mMimic.mCardAttack == "9") { // if the card was played as a knight
								currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activated.");
							}
							
							viewCard.mCard.mMimic = null;
						}
					}
				}
				
				{
					var card = viewCard.mCard.GetCopy();
					if (card.mMimic != null) {
						card.mMimic = null;
					}
					
					card.mDarken = true;
					this.mHand.AddCard(card);
					++this.mRecievedCount;
					
					this.mRecievedCard = card;
				}
				
				graveyard.RemoveCard(viewCard.mIndex);
				
				this.PositionHand();
				
				if (done == true) {
					if (this.mRecievedCount > 0) {
						currScene.mLog.AddEntry(3, this.mName + " took " + this.mRecievedCount + "x " +
								this.mRecievedCard.mCardType + " " + this.mRecievedCard.mCardName + " from the graveyard.");
						this.mRecievedCount = 0;
						this.mRecievedCard = null;
					}
					
					currScene.mGraveyard.SetView(false);
					graveyard.mViewLeftButton.mActive = true;
					graveyard.mViewRightButton.mActive = true;
					
					this.mGUI.mButtons[0].mActive = true;
					this.mGUI.mButtonCovers[0].mActive = true;
					this.mGUI.ShowMessage(false);
					
					this.mMode = 0; // reset to mode 0
					this.ResetSelected(); // reset selected states
					currScene.ChangePlayer(); // change to the next player
				}
			}
		}
	}
}
// ...End

