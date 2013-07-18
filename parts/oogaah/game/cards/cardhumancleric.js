// OogaahCardHumanCleric class
function OogaahCardHumanCleric() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "7"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Human"; // the type of the card (e.g., Goblin)
	this.mCardName = "Cleric"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Doctored Results"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 7; // the current value of the card
};

// inherit the base class's prototype
OogaahCardHumanCleric.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardHumanCleric.prototype.Copy = function(other) {
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

OogaahCardHumanCleric.prototype.GetCopy = function() {
	var c = new OogaahCardHumanCleric(); c.Copy(this);
	
	return c;
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardHumanCleric.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			var orcWarrior = this.HandleOrcWarrior(); // the id of the player who owns the orc warrior, if any (-1 is none)
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
			}
			
			if (orcWarrior == -1) { // if there is no orc warrior whose ability is active
				// update current attackvalue and squadsize
				currScene.SetAV(this.mCardValue);
				currScene.SetSS(cards.length);
				
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
				currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
				currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
				
				var knight = false;
				
				{ // ability
					currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
					
					for (var i = 0; i < currScene.mPlayers.length; ++i) {
						// if not this player and the player is still in the game
						if (i != currScene.mCurrPlayer && currScene.mPlayers[i].mFinished == false) {
							if (currScene.mGraveyard.mCards.length == 0) { // if the graveyard is empty
								break; // stop
							}
							
							// get a random card from the graveyard
							var id = currScene.mRand.GetRandInt(0, currScene.mGraveyard.mCards.length - 1);
							var card = currScene.mGraveyard.GetCard(id);
							
							// handle human peasant's ability
							if (card.mCardAttack == "9") {
								knight = true;
							}
							else if (card.mCardAttack == "S") {
								if (card.mMimic != null) { // if being of light was played using its ability
									if (card.mMimic.mCardAttack == "9") { // if the card was played as a knight
										knight = true;
									}
									
									card.mMimic = null;
								}
							}
							
							currScene.mGraveyard.RemoveCard(id); // remove card from the graveyard
							currScene.mPlayers[i].mHand.AddCard(card); // add it to the player's hand
							currScene.mPlayers[i].PositionHand(); // reposition the player's hand
							currScene.mPlayers[i].ResetSelected();
						}
					}
				}
				
				if (knight == true) {
					currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activated.");
				}

				currScene.ChangePlayer(); // change to the next player
			}
			else {
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mGraveyard.AddCards(cards); // add the cards straight into the graveyard
				currScene.mLog.AddEntry(4, cards.length + "x " + this.mCardType + " " + this.mCardName + " was discarded due to Mmmm, Fresh Meat ability.");
				
				currScene.ChangePlayer(orcWarrior); // revert play to the player who owns the orc warrior
				currScene.mLastPlayer = orcWarrior; // set last player to the player who owns the orc warrior
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

