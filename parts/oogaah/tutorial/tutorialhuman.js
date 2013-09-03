// OogaahTutorialHuman class
// 
function OogaahTutorialHuman() {
	OogaahHuman.apply(this, null); // construct the base class
	
	this.mDesired = new Array();
};

// inherit the base class's prototype
OogaahTutorialHuman.prototype = Object.create(OogaahHuman.prototype);

// logic called when the play button is clicked in the player gui
OogaahTutorialHuman.prototype.OnPlay = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene

	var success = false; // is our desired play successful
	if (this.mDesired.length > 0) { // if the is at least 1 desired card
		if (this.mMode == 5 && this.mSubMode == "b") { // if we are in goblin technician mode (submode b)
			// if there is a desired card (a card means accept decision)
			if (this.mDesired[0].mCards.length > 0) {
				for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards
					this.mSelectedCards[i] = 3; // set cards to single-selectable (3)
					this.mHand.mCards[i].mDarken = false;
				}
				
				this.mGUI.mDisplayCard = null;
				
				// update player gui text
				this.mGUI.mButtonText[0].SetString("Swap Card");
				this.mGUI.ShowMessage(true, "Choose which card to swap or pass.");
				
				this.mSubMode = "c"; // change to submode c
				
				success = true; // play was successful
			}
		}
		else if (this.mMode == 6) { // otherwise if we are in orc shaman mode
			// if there is a desired card (a card means accept decision)
			if (this.mDesired[0].mCards.length > 0) {
				currScene.mReversed = !currScene.mReversed; // reverse the current game values
				
				// update player gui text
				this.mGUI.mButtonText[0].SetString("Play");
				this.mGUI.ShowMessage(false);
				
				currScene.mLog.AddEntry(3, this.mName + " reversed card values for this skirmish."); // add entry to the play log
				
				this.mMode = 0; // reset to mode 0
				this.ResetSelected(); // reset selected states
				currScene.ChangePlayer(); // change to the next player
				currScene.mDelay = 1000;
				
				success = true; // play was successful
			}
		}
		else { // otherwise we are in normal play
			// check that selected match desired
			var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
			
			// if the lengths match and are not 0 then we potentially have a match
			if (arr.length > 0 && arr.length == this.mDesired[0].mCards.length) {
				success = true; // assume we have a success (adjusted later if not true)
				for (var i = 0; i < arr.length; ++i) { // for all cards in both arrays
					// if the cards don't match
					if (arr[i].mCardAttack != this.mDesired[0].mCards[i].mCardAttack ||
							arr[i].mCardValue != this.mDesired[0].mCards[i].mCardValue) {
						
						success = false; // turns out we have no success
						break; // stop
					}
				}
				
				if (success == true) { // if we still have success
					arr[0].Play(arr); // play that/those cards
					currScene.mDelay = 1000;
				}
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
		
		if (success == true) { // if we made a successfule play
			// increment message display and remove desired cards
			currScene.mShowMessage += this.mDesired[0].mShowMessageInc;
			this.mDesired.splice(0, 1);
		}
		else {
			if (this.mDesired.length > 0) { // if there is at least 1 desired card
				// increment message display and add the error message to the front of the queue
				++currScene.mShowMessage;
				currScene.mMessageQueue.InsertMessage(this.mDesired[0].mPos, this.mDesired[0].mString, this.mDesired[0].mSize,
						this.mDesired[0].mArrowDir, this.mDesired[0].mArrowOff,
						this.mDesired[0].mFadePos, this.mDesired[0].mFadeSize,
						0);
				currScene.mMessageQueue.mQueue[0].SetTimeout(0.4);
			}
		}
		
		if (this.mDesired.length == 0) { // if there are no more desired cards
			currScene.mFinished = true; // we are done with the tutorial
		}
	}
}

// logic called when the pass button is clicked in the player gui
OogaahTutorialHuman.prototype.OnPass = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	var match = false; // assume no match initially
	
	{
		if (this.mDesired.length > 0) {
			if (this.mDesired[0].mCards.length == 0) {
				match = true;
			}
		}
	}
	
	if (match == false) { // if we didn't get a match
		if (this.mDesired.length > 0) {
			++currScene.mShowMessage;
			currScene.mMessageQueue.InsertMessage(this.mDesired[0].mPos, this.mDesired[0].mString, this.mDesired[0].mSize,
					this.mDesired[0].mArrowDir, this.mDesired[0].mArrowOff,
					this.mDesired[0].mFadePos, this.mDesired[0].mFadeSize,
					0);
			currScene.mMessageQueue.mQueue[0].SetTimeout(0.4);
		}
	}
	else {
		currScene.mShowMessage += this.mDesired[0].mShowMessageInc;
		this.mDesired.splice(0, 1);
		
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
		
		if (this.mDesired.length == 0) {
			currScene.mFinished = true;
		}
	}
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
					var match = true; // assume a match initially
					
					{
						if (this.mDesired.length > 0) { // if we have desired cards
							if (this.mDesired[0].mCards.length > 1) { // 
								if (this.mDesired[0].mCards[0].mCardValue != this.mChosenID) {
									match = false;
								}
							}
							else { // 
								match = false;
							}
						}
						else { // otherwise, no desired cards
							match = false;
						}
					}
					
					if (match == false) { // if we didn't get a match
						if (this.mDesired.length > 0) {
							++currScene.mShowMessage;
							currScene.mMessageQueue.InsertMessage(this.mDesired[0].mPos, this.mDesired[0].mString, this.mDesired[0].mSize,
									this.mDesired[0].mArrowDir, this.mDesired[0].mArrowOff,
									this.mDesired[0].mFadePos, this.mDesired[0].mFadeSize,
									0);
							currScene.mMessageQueue.mQueue[0].SetTimeout(0.4);
						}
					}
					else { // if it is the desired player
						if (this.mChosenPlayer.mCards.length > 0) { // if the player has at least 1 card
							// select a card from the chosen player's hand
							this.mChosenCard = this.mDesired[0].mCards[1].mCardValue;
							
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
							
							currScene.mShowMessage += this.mDesired[0].mShowMessageInc;
							this.mDesired.splice(0, 1);
						}
					}
				}
			}
			else { // otherwise if no mouse button was pressed
				this.mChosenPlayer = null; // reset the selected player to null
			}
		}
	}
}

// 
OogaahTutorialHuman.prototype.AddDesired = function(cards, string, inc, pos, size, adir, aoff, fadePos, fadeSize) {
	var desired = new OogaahTutorialDesired();
	desired.mCards = util.ConcatArray(desired.mCards, cards);
	desired.mString = string;
	desired.mShowMessageInc = inc;
	
	desired.mPos.Copy(pos);
	desired.mSize.Copy(size);
	desired.mArrowDir = adir;
	desired.mArrowOff = aoff;
	
	desired.mFadePos = fadePos;
	desired.mFadeSize = fadeSize;
	
	this.mDesired.push(desired);
}
// ...End

