// OogaahCardHumanPeasant class
function OogaahCardHumanPeasant() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "3"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Human"; // the type of the card (e.g., Goblin)
	this.mCardName = "Peasant"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Unplanned Uprising"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 3; // the current value of the card
	
	this.mValueText = new Array();
	this.mValueText[0] = new Text();
	this.mValueText[1] = new Text();
	this.mValueText[2] = new Text();
	
	var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
	for (var i = 0; i < this.mValueText.length; ++i) {
		this.mValueText[i].SetFont(fnt);
		
		this.mValueText[i].mAlign = "centre";
		this.mValueText[i].mAbsolute = true;
		this.mValueText[i].mColour = "#81BD1C";
		
		this.mValueText[i].mShadow = true;
		this.mValueText[i].mShadowColour = "#498E1F";
	}
	
	this.mValueText[0].SetFontSize(82);
	this.mValueText[1].SetFontSize(38);
	this.mValueText[1].mShadowAlpha = 0.5;
	this.mValueText[2].SetFontSize(22);
	this.mValueText[2].mShadowAlpha = 0.3;
	
	this.mSplitShape = new Array();
	
	{
		this.mSplitShape[0] = new Shape();
		this.mSplitShape[0].MakeCircle(new Vec2(), 33, 24);
		this.mSplitShape[0].mColour = "#501616";
		
		this.mSplitShape[1] = new Shape();
		this.mSplitShape[1].MakeCircle(new Vec2(), 15, 24);
		this.mSplitShape[1].mColour = "#501616";
		
		this.mSplitShape[2] = new Shape();
		this.mSplitShape[2].MakeCircle(new Vec2(), 9, 24);
		this.mSplitShape[2].mColour = "#501616";
	}
	
	this.ModifyValue(0);
	this.PositionValueText();
};

// inherit the base class's prototype
OogaahCardHumanPeasant.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardHumanPeasant.prototype.Copy = function(other) {
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
	
	this.mSplitShape[0].Copy(other.mSplitShape[0]);
	this.mSplitShape[1].Copy(other.mSplitShape[1]);
	this.mSplitShape[2].Copy(other.mSplitShape[2]);
}

OogaahCardHumanPeasant.prototype.GetCopy = function() {
	var c = new OogaahCardHumanPeasant(); c.Copy(this);
	
	return c;
}

OogaahCardHumanPeasant.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mHidden == false) {
		arr.push(this.mCardSprites[this.mSize]);
		
		if (this.mCardValue - 3 > 0) { // if the card attack has been modified due to ability
			arr.push(this.mSplitShape[this.mSize]);
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

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardHumanPeasant.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		// or if human knight's ability is active
		if ((((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) ||
				currScene.mOnlyPeasants == true) {
			
			var orcWarrior = this.HandleOrcWarrior(); // the id of the player who owns the orc warrior, if any (-1 is none)
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			if (orcWarrior == -1) { // if there is no orc warrior whose ability is active
				// update current attackvalue and squadsize
				currScene.SetAV(this.mCardValue);
				currScene.SetSS(cards.length);
				
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
				currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
				currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
				
				if (currScene.mOnlyPeasants == true) {
					currScene.mOnlyPeasants = false;
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

// modifies this cards value due to its ability
OogaahCardHumanPeasant.prototype.ModifyValue = function(amount) {
	this.mCardValue += amount; // change the card value by the amount
	
	for (var i = 0; i < this.mValueText.length; ++i) { // for all texts
		this.mValueText[i].SetString(noogaah.IndexToAV(this.mCardValue - 1)); // set the string to the new amount
	}
}

// 
OogaahCardHumanPeasant.prototype.PositionValueText = function() {
	var lrgSpr = this.mCardSprites[0];
	this.mValueText[0].SetPosition(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 3) + Math.round(lrgSpr.mSize.mX / 2) - 59,
			Math.round(nmain.game.mCanvasSize.mY / 2) + Math.round(lrgSpr.mSize.mY / 2) - 93));
	this.mValueText[0].mDepth = lrgSpr.mDepth;
	
	var medSpr = this.mCardSprites[1];
	var medPos = new Vec2(); medPos.Copy(medSpr.mPos);
	medPos.mX -= medSpr.mOrigin.mX; medPos.mY -= medSpr.mOrigin.mY;
	this.mValueText[1].SetPosition(new Vec2(medPos.mX + medSpr.mSize.mX - 26, medPos.mY + medSpr.mSize.mY - 42));
	this.mValueText[1].mDepth = medSpr.mDepth;
	
	var smlSpr = this.mCardSprites[2];
	var smlPos = new Vec2(); smlPos.Copy(smlSpr.mPos);
	smlPos.mX -= smlSpr.mOrigin.mX; smlPos.mY -= smlSpr.mOrigin.mY;
	this.mValueText[2].SetPosition(new Vec2(smlPos.mX + smlSpr.mSize.mX - 15, smlPos.mY + smlSpr.mSize.mY - 25));
	this.mValueText[2].mDepth = smlSpr.mDepth;
	
	for (var i = 0; i < this.mCardSprites.length; ++i) {
		this.mSplitShape[i].SetPosition(new Vec2(this.mCardSprites[i].mPos.mX + this.mCardSprites[i].mSize.mX,
				this.mCardSprites[i].mPos.mY + this.mCardSprites[i].mSize.mY));
		this.mSplitShape[i].SetOrigin(this.mCardSprites[i].mOrigin);
	}
	
	{
		var ss0 = this.mSplitShape[0];
		ss0.SetPosition(new Vec2(ss0.mPos.mX - 56, ss0.mPos.mY - 40));
		ss0.mDepth = lrgSpr.mDepth;
		
		var ss1 = this.mSplitShape[1];
		ss1.SetPosition(new Vec2(ss1.mPos.mX - 26, ss1.mPos.mY - 18));
		ss1.mDepth = medSpr.mDepth;
		
		var ss2 = this.mSplitShape[2];
		ss2.SetPosition(new Vec2(ss2.mPos.mX - 15, ss2.mPos.mY - 10));
		ss2.mDepth = smlSpr.mDepth;
	}
}
// ...End

