// OogaahTutorialHuman class
// 
function OogaahTutorialHuman() {
	OogaahHuman.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahTutorialHuman.prototype = Object.create(OogaahHuman.prototype);

// logic called when the play button is clicked in the player gui
OogaahTutorialHuman.prototype.OnPlay = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	var match = true; // assume a match initially
	var desired = new Array();
	desired.push(currScene.mCardList[0]);
	
	{
		var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
		
		if (arr.length == desired.length) { // if the lengths match then we potentially have a match
			for (var i = 0; i < arr.length; ++i) { // for all cards in both arrays
				// if the cards don't match
				if (arr[i].mCardAttack != desired[i].mCardAttack && arr[i].mCardValue != desired[i].mCardValue) {
					match = false; // indicated no match
					break; // stop
				}
			}
		}
		else { // otherwise, mismatched lengths indicate no match
			match = false;
		}
	}
	
	if (match == false) { // if we didn't get a match
		// no dice, dummy!
		alert("Invalid!");
	}
	else {
	
	}
	
	/* if (this.mMode == 5 && this.mSubMode == "b") { // if we are in goblin technician mode (submode b)
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
	} */
}

// logic called when the pass button is clicked in the player gui
OogaahTutorialHuman.prototype.OnPass = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	// check we want a pass
	// if so do ur thang
	
	/* if (this.mMode == 2) { // if we are in goblin overseer mode
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
	} */
}
// ...End

