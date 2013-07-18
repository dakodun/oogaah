// OogaahCardOrcShaman class
function OogaahCardOrcShaman() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "6"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Orc"; // the type of the card (e.g., Goblin)
	this.mCardName = "Shaman"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Extreme Magicks"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 6; // the current value of the card
};

// inherit the base class's prototype
OogaahCardOrcShaman.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardOrcShaman.prototype.Copy = function(other) {
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

OogaahCardOrcShaman.prototype.GetCopy = function() {
	var c = new OogaahCardOrcShaman(); c.Copy(this);
	
	return c;
}

OogaahCardOrcShaman.prototype.Play = function(cards) {
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
				for (var i = 0; i < currPlayer.mHand.mCards.length; ++i) { // for all cards in the player's hand
					currPlayer.mSelectedCards[i] = -1; // set status to locked
				}
				
				currPlayer.mMode = 6; // set current player's mode to 6 (orc shaman ability)
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
				
				if (currPlayer.mType == "Human") {
					currPlayer.mGUI.mButtonText[0].SetString("Reverse");
					currPlayer.mGUI.ShowMessage(true, "Choose to reverse card values or pass.");
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

