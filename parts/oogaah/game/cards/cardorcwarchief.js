// OogaahCardOrcWarchief class
function OogaahCardOrcWarchief() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "B"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Orc"; // the type of the card (e.g., Goblin)
	this.mCardName = "Warchief"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Leading from the Back"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 11; // the current value of the card
};

// inherit the base class's prototype
OogaahCardOrcWarchief.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardOrcWarchief.prototype.Copy = function(other) {
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

OogaahCardOrcWarchief.prototype.GetCopy = function() {
	var c = new OogaahCardOrcWarchief(); c.Copy(this);
	
	return c;
}

OogaahCardOrcWarchief.prototype.Play = function(cards) {
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
			
			var foundOrc = null; // the last played orc card this skirmish
			
			{ // ability
				var storedValue = -1;
				var index = -1;
				
				for (var i = currScene.mBattlefield.mCards.length - 1; i >= 0; --i) { // for all cards on the battlefield
					var card = currScene.mBattlefield.mCards[i]; // reference to card
					
					// if the card is an orc and has a higher attack value than the one stored
					if (card.mCardType == "Orc" && card.mCardValue > storedValue) {
						foundOrc = card; // store the card
						storedValue = card.mCardValue; // store the card value
						index = i; // store the card's index
					}
				}
				
				if (index >= 0) { // if the stored index is not negative
					currScene.mBattlefield.RemoveCard(index); // remove the corresponding card from the battlefield
				}
			}
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			
			if (foundOrc != null) {
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
				currScene.mLog.AddEntry(3, foundOrc.mCardType + " " + foundOrc.mCardName + " was moved to the top."); // add entry to the play log
				
				// reset the current attack value and squad size
				currScene.SetAV(foundOrc.mCardValue);
				currScene.SetSS(1);
				
				currScene.mBattlefield.AddCard(foundOrc);
			}
			
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

