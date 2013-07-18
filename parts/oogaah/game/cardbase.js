// OogaahCardBase class
// the base card that all other cards inherit from
function OogaahCardBase() {
	this.mCardAttack = ""; // the base attack value of the card (e.g., 1)
	this.mCardType = ""; // the type of the card (e.g., Goblin)
	this.mCardName = ""; // the name of the card (e.g., Horde)
	this.mCardAbility = ""; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 0; // the current value of the card
	
	// the face textures for the cards in all sizes
	this.mCardSprites = new Array();
	this.mCardSprites[0] = new Sprite(); // large
	this.mCardSprites[1] = new Sprite(); // medium
	this.mCardSprites[2] = new Sprite(); // small
	
	// the back textures for the cards in all sizes
	this.mCardBacks = new Array();
	this.mCardBacks[0] = new Sprite(); // large
	this.mCardBacks[1] = new Sprite(); // medium
	this.mCardBacks[2] = new Sprite(); // small
	
	// the shapes that overlay the cards (used to darken cards)
	this.mCardShapes = new Array();
	this.mCardShapes[0] = new Shape(); // large
	this.mCardShapes[1] = new Shape(); // medium
	this.mCardShapes[2] = new Shape(); // small
	
	this.mHidden = false; // is this card visible to the player?
	this.mSize = 2; // the current card size to display
	this.mDarken = false; // 
};

// makes a deep copy of another (other) OogaahCardBase
OogaahCardBase.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack; // copy the base attack
	this.mCardType = other.mCardType; // copy the type
	this.mCardName = other.mCardName; // copy the name
	this.mCardAbility = other.mCardAbility; // copy the ability
	
	this.mCardValue = other.mCardValue; // copy the card value
	
	// copy all sizes of card face sprites
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	// copy all sizes of card back sprites
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	// copy all sizes of card overlay shapes
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden; // copy hidden status
	this.mSize = other.mSize; // copy current size
	this.mDarken = other.mDarken; // copy darkened status
}

// returns a copy of this card
OogaahCardBase.prototype.GetCopy = function() {
	var c = new OogaahCardBase(); c.Copy(this); // create a new card base and copy this into it
	
	return c; // return new card base
}

// returns the data required to render this card base
OogaahCardBase.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	if (this.mHidden == false) { // if the card isn't hidden
		arr.push(this.mCardSprites[this.mSize]); // add the appropiately size face sprite
	}
	else { // otherwise the card is hidden
		arr.push(this.mCardBacks[this.mSize]); // add the appropiately size back sprite
	}
	
	if (this.mDarken == true) { // 
		arr.push(this.mCardShapes[this.mSize]);
	}
	
	return arr; // return the renderables array
}

OogaahCardBase.prototype.CreateCardShapes = function() {
	for (var i = 0; i < 3; ++i) {
		var spr = this.mCardSprites[i];
		if (this.mHidden == true) {
			spr = this.mCardBacks[i];
		}
		
		this.mCardShapes[i].Clear();
		this.mCardShapes[i].SetPosition(spr.mGlobalMask.mPos);
		this.mCardShapes[i].AddPoints(spr.mGlobalMask.mPoints);
	}
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardBase.prototype.Play = function(cards) {
	return false; // invalid - this is a base and as such has no play logic
}

// handles the orc warriors ability
OogaahCardBase.prototype.HandleOrcWarrior = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var result = -1; // the return value
	
	if (currScene.mWarriorOwner >= 0) { // if the current scene's owner value is greater than or equal to 0
		result = currScene.mWarriorOwner; // store the owner value
		currScene.mWarriorOwner = -1; // reset the owener value
	}
	
	return result;
}

// handles swapping of cards between players due to goblin technician's ability
OogaahCardBase.prototype.HandleCardSwap = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	var cardGive = cards[0]; // get a copy of the card to give
	var cardGet = currPlayer.mChosenPlayer.GetCard(currPlayer.mChosenCard); // get a copy of the card to recieve
	
	currPlayer.RemoveSelected(); // remove card from current player's hands
	currPlayer.mChosenPlayer.RemoveCard(currPlayer.mChosenCard); // remove card from chosen player's hand
	
	var mimicAttack = "0"; // the value that the being of light is mimicking (0 implies not a being of light)
	if (cardGet.mCardAttack == "S") { // if the card recieved is a being of light
		if (cardGet.mMimic != null) {
			mimicAttack = cardGet.mMimic.mCardAttack; // store the being of light's mimicked attack value
			cardGet.mMimic = null; // reset the being of light's mimicked card
		}
	}
	
	currPlayer.mHand.AddCard(cardGet); // add the recieved card to the current player's hand
	currPlayer.mChosenPlayer.AddCard(cardGive); // add the given card to the chosen player's hand
	
	if (currPlayer.mChosenID != -1) { // if the chosen player is not the graveyard
		
		currScene.mPlayers[currPlayer.mChosenID].PositionHand(); // reposition their hand
	}
	else {
		if (cardGet.mCardAttack == "9" || cardGive.mCardAttack == "9") {
			currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activates.");
		}
		else if (cardGet.mCardAttack == "S") {
			if (mimicAttack != "0") { // if being of light was played using its ability
				if (mimicAttack == "9") { // if the card was played as a knight
					currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activates.");
				}
			}
		}
	}
	
	// add entry to the play log
	currScene.mLog.AddEntry(3, currPlayer.mName + " swapped 1x " + cardGive.mCardType + " " + cardGive.mCardName +
			" for 1x " + cardGet.mCardType + " " + cardGet.mCardName + ".");
	
	currPlayer.ResetSelected(); // reset the current player's selection status
	currPlayer.PositionHand(); // reposition their hand
	
	// reset goblin technician selection choices
	currPlayer.mChosenPlayer = null;
	currPlayer.mChosenID = -1;
	currPlayer.mChosenCard = -1;
	
	if (currPlayer.mType == "Human") {
		// update player gui text
		currPlayer.mGUI.mButtonText[0].SetString("Play");
		currPlayer.mGUI.mButtonText[1].SetString("Pass");
	}
	
	currPlayer.mMode = 0; // reset the current player's mode
	currPlayer.mSubMode = "a"; // reset the current player's submode
	
	if (currPlayer.mType == "Human") {
		currPlayer.mGUI.mButtonText[0].SetString("Play");
		currPlayer.mGUI.ShowMessage(false);
	}
	
	currScene.ChangePlayer(); // change to the next player
}

// 
OogaahCardBase.prototype.HandleHumanMage = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	currScene.SetAV(cards[0].mCardValue);
	currScene.SetSS(1);
	
	currScene.mLog.AddEntry(3, currPlayer.mName + " played " + this.mCardType + " " + this.mCardName + " alongside Human Mage.");
	
	currPlayer.mMode = 0; // reset the current player's mode
	currPlayer.RemoveSelected(); // remove cards from current player's hands
	currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
	
	if (currPlayer.mType == "Human") {
		currPlayer.mGUI.mButtonText[0].SetString("Play");
		currPlayer.mGUI.ShowMessage(false);
	}
	
	currScene.ChangePlayer(); // change to the next player
}
// ...End

