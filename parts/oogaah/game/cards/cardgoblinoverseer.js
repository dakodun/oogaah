// OogaahCardGoblinOverseer class
function OogaahCardGoblinOverseer() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "2"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Goblin"; // the type of the card (e.g., Goblin)
	this.mCardName = "Overseer"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Overseerial"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 2; // the current value of the card
};

// inherit the base class's prototype
OogaahCardGoblinOverseer.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardGoblinOverseer.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
}

OogaahCardGoblinOverseer.prototype.GetCopy = function() {
	var c = new OogaahCardGoblinOverseer(); c.Copy(this);
	
	return c;
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardGoblinOverseer.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			// whilst the orc warrior's ability won't affect this card it's still important to handle it as it will
			// reset the status of the warrior's ability for future plays
			this.HandleOrcWarrior();
			
			// update current attackvalue and squadsize
			currScene.SetAV(this.mCardValue);
			currScene.SetSS(cards.length);
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
			}
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			
			{ // ability
				if (currPlayer.mHand.mCards.length > 0) { // if player still has cards left in hand
					if (currPlayer.mHand.mCards[0].mCardAttack == "1") { // and if player has any hordes in hand
						for (var i = 0; i < currPlayer.mHand.mCards.length; ++i) { // for all cards in the player's hand
							var c = currPlayer.mHand.mCards[i]; // get a reference to the card
							if (c.mCardAttack != "1") { // if its attack value is not 1 (not a goblin horde)
								currPlayer.mSelectedCards[i] = -1; // set its status to locked
								
								if (currPlayer.mType == "Human") {
									c.mDarken = true;
								}
							}
						}
						
						currPlayer.mMode = 2; // set current player's mode to 2 (goblin overseer ability)
						currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
						
						if (currPlayer.mType == "Human") {
							currPlayer.mGUI.mButtonText[0].SetString("Play Hordes");
							currPlayer.mGUI.ShowMessage(true, "Choose to play Goblin Hordes or pass.");
						}
					}
					else {
						currScene.ChangePlayer(); // change to the next player
					}
				}
				else {
					currScene.ChangePlayer(); // change to the next player
				}
			}
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}
// ...End

