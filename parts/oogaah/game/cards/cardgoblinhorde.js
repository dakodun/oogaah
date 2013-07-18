// OogaahCardGoblinHorde class
function OogaahCardGoblinHorde() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "1"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Goblin"; // the type of the card (e.g., Goblin)
	this.mCardName = "Horde"; // the name of the card (e.g., Horde)
	this.mCardAbility = "A Mob Mentality"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 1; // the current value of the card
};

// inherit the base class's prototype
OogaahCardGoblinHorde.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardGoblinHorde.prototype.Copy = function(other) {
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

OogaahCardGoblinHorde.prototype.GetCopy = function() {
	var c = new OogaahCardGoblinHorde(); c.Copy(this);
	
	return c;
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardGoblinHorde.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		var value = cards.length; // the value of this card is the squad size, due to ability
		
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed (if number played > 1 then ability activates and
		// squadsize is ignored)
		if (((value > currScene.mCurrAV && currScene.mReversed == false) ||
				(value < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0 || cards.length > 1)) {
			
			// whilst the orc warrior's ability won't affect this card it's still important to handle it as it will
			// reset the status of the warrior's ability for future plays
			this.HandleOrcWarrior();
			
			// update current attackvalue and squadsize
			currScene.SetAV(value);
			currScene.SetSS(cards.length);
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
			}
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			
			if (value > 1) {
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
			}
			
			currScene.ChangePlayer(); // change to the next player
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 2) { // otherwise if the current player is in "goblin overseer" mode
		// set the current attackvalue and squadsize
		currScene.SetAV(1);
		currScene.SetSS(1);
		
		currPlayer.mMode = 0; // reset the current player's mode
		currPlayer.RemoveSelected(); // remove cards from current player's hands
		currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
		currScene.mLog.AddEntry(3, currPlayer.mName + " played " + cards.length + "x Goblin Horde alongside Goblin Overseer.");
		
		if (currPlayer.mType == "Human") {
			currPlayer.mGUI.mButtonText[0].SetString("Play");
			currPlayer.mGUI.ShowMessage(false);
		}
		
		currScene.ChangePlayer(); // change to the next player
		
		return true; // valid
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

