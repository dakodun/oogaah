// OogaahCardOrcWarrior class
function OogaahCardOrcWarrior() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "4"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Orc"; // the type of the card (e.g., Goblin)
	this.mCardName = "Warrior"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Mmmm, Fresh Meat"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 4; // the current value of the card
};

// inherit the base class's prototype
OogaahCardOrcWarrior.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardOrcWarrior.prototype.Copy = function(other) {
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

OogaahCardOrcWarrior.prototype.GetCopy = function() {
	var c = new OogaahCardOrcWarrior(); c.Copy(this);
	
	return c;
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardOrcWarrior.prototype.Play = function(cards) {
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
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			if (currPlayer.mHand.mCards.length > 0) { // if player still has cards left in hand
				currScene.mWarriorOwner = currScene.mCurrPlayer; // set the owner of the last card for the orc warrior's ability
			}
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
			
			currScene.ChangePlayer(); // change to the next player
			
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

