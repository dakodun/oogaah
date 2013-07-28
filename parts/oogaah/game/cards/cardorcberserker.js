// OogaahCardOrcBerserker class
function OogaahCardOrcBerserker() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "C"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Orc"; // the type of the card (e.g., Goblin)
	this.mCardName = "Berserker"; // the name of the card (e.g., Horde)
	this.mCardAbility = "A Calmed Mind"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 10; // the current value of the card
	
	this.mValueText = new Array();
	this.mValueText[0] = new Text();
	this.mValueText[1] = new Text();
	this.mValueText[2] = new Text();
	
	var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
	for (var i = 0; i < this.mValueText.length; ++i) {
		this.mValueText[i].SetFont(fnt);
		
		this.mValueText[i].mAlign = "right";
		this.mValueText[i].mAbsolute = true;
		this.mValueText[i].mDepth = 0;
		this.mValueText[i].mColour = "#FFFFFF";
	}
	
	this.mValueText[0].SetFontSize(38);
	this.mValueText[1].SetFontSize(22);
	this.mValueText[2].SetFontSize(14);
	
	this.ModifyValue(0);
	this.PositionValueText();
};

// inherit the base class's prototype
OogaahCardOrcBerserker.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardOrcBerserker.prototype.Copy = function(other) {
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
	
	this.mValueText[0].Copy(other.mValueText[0]);
	this.mValueText[1].Copy(other.mValueText[1]);
	this.mValueText[2].Copy(other.mValueText[2]);
}

OogaahCardOrcBerserker.prototype.GetCopy = function() {
	var c = new OogaahCardOrcBerserker(); c.Copy(this);
	
	return c;
}

OogaahCardOrcBerserker.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mHidden == false) {
		arr.push(this.mCardSprites[this.mSize]);
		
		if (this.mCardValue - 10 < 0) { // if the card attack has been modified due to ability
			arr.push(this.mValueText[this.mSize]); // display the appropiate modification
		}
	}
	else {
		arr.push(this.mCardBacks[this.mSize]);
	}
	
	if (this.mDarken == true) { // 
		arr.push(this.mCardShapes[this.mSize]);
	}
	
	return arr;
}

OogaahCardOrcBerserker.prototype.Play = function(cards) {
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
				for (var i = 0; i < currScene.mPlayers.length; ++i) { // for all players
					var player = currScene.mPlayers[i]; // reference to the player
					
					for (var j = 0; j < player.mHand.mCards.length; ++j) { // for all cards in the player's hand
						var card =  player.mHand.mCards[j]; // reference to the card
						
						// if the card is an orc berserker and it's value is greater than 6 (6 is the minimum card value)
						if (card.mCardAttack == "C" && card.mCardValue > 6) {
							var value = card.mCardValue - 6; // set the deduction to the minimum we can decrease by
							if (cards.length < value) { // if we are decreasing less than the minimum
								value = cards.length; // set the deduction to the decrease amount
							}
							
							card.ModifyValue(-value); // modify the card's value
						}
					}
					
					player.PositionHand();
				}
				
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
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

// modifies this cards value due to its ability
OogaahCardOrcBerserker.prototype.ModifyValue = function(amount) {
	this.mCardValue += amount; // change the card value by the amount
	
	for (var i = 0; i < this.mValueText.length; ++i) { // for all texts
		this.mValueText[i].SetString("-" + (10 - this.mCardValue).toString()); // set the string to the new amount
	}
}

// 
OogaahCardOrcBerserker.prototype.PositionValueText = function() {
	var lrgSpr = this.mCardSprites[0];
	this.mValueText[0].SetPosition(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 3) + Math.round(lrgSpr.mSize.mX / 2) - 14,
			Math.round(nmain.game.mCanvasSize.mY / 2) + Math.round(lrgSpr.mSize.mY / 2) - 108));
	this.mValueText[0].mDepth = lrgSpr.mDepth;
	
	var medSpr = this.mCardSprites[1];
	var medPos = new Vec2(); medPos.Copy(medSpr.mPos);
	medPos.mX -= medSpr.mOrigin.mX; medPos.mY -= medSpr.mOrigin.mY;
	this.mValueText[1].SetPosition(new Vec2(medPos.mX + medSpr.mSize.mX - 4, medPos.mY + medSpr.mSize.mY - 52));
	this.mValueText[1].mDepth = medSpr.mDepth;
	
	var smlSpr = this.mCardSprites[2];
	var smlPos = new Vec2(); smlPos.Copy(smlSpr.mPos);
	smlPos.mX -= smlSpr.mOrigin.mX; smlPos.mY -= smlSpr.mOrigin.mY;
	this.mValueText[2].SetPosition(new Vec2(smlPos.mX + smlSpr.mSize.mX - 2, smlPos.mY + smlSpr.mSize.mY - 32));
	this.mValueText[2].mDepth = smlSpr.mDepth;
}
// ...End

