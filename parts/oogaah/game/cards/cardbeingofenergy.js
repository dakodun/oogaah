// OogaahCardBeingOfEnergy class
function OogaahCardBeingOfEnergy() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "S"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Being"; // the type of the card (e.g., Goblin)
	this.mCardName = "of Energy"; // the name of the card (e.g., Horde)
	this.mCardAbility = "In Duplicate"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 13; // the current value of the card
	
	this.mSplitShape = new Array();
	
	{
		this.mSplitShape[0] = new Shape();
		
		this.mSplitShape[1] = new Shape();
		this.mSplitShape[1].AddPoint(new Vec2(0, 171));
		this.mSplitShape[1].AddPoint(new Vec2(-120, 171));
		this.mSplitShape[1].AddPoint(new Vec2(-80, 95));
		this.mSplitShape[1].AddPoint(new Vec2(-60, 85));
		this.mSplitShape[1].AddPoint(new Vec2(-40, 75));
		
		this.mSplitShape[2] = new Shape();
		this.mSplitShape[2].AddPoint(new Vec2(0, 103));
		this.mSplitShape[2].AddPoint(new Vec2(-72, 103));
		this.mSplitShape[2].AddPoint(new Vec2(-50, 59));
		this.mSplitShape[2].AddPoint(new Vec2(-36, 51));
		this.mSplitShape[2].AddPoint(new Vec2(-22, 43));
	}
	
	this.mSplitShapeLine = new Array();
	
	{
		this.mSplitShapeLine[0] = new Shape();
		
		this.mSplitShapeLine[1] = new Shape();
		this.mSplitShapeLine[1].AddPoint(new Vec2(40, -76));
		this.mSplitShapeLine[1].AddPoint(new Vec2(60, -86));
		this.mSplitShapeLine[1].AddPoint(new Vec2(80, -96));
		this.mSplitShapeLine[1].AddPoint(new Vec2(120, -171));
		this.mSplitShapeLine[1].mLineWidth = 4;
		this.mSplitShapeLine[1].mRenderStyle = "Line";
		this.mSplitShapeLine[1].mColour = "#212121";
		this.mSplitShapeLine[1].mAlpha = 0.7;
		
		this.mSplitShapeLine[2] = new Shape();
		this.mSplitShapeLine[2].AddPoint(new Vec2(22, -44));
		this.mSplitShapeLine[2].AddPoint(new Vec2(36, -52));
		this.mSplitShapeLine[2].AddPoint(new Vec2(50, -60));
		this.mSplitShapeLine[2].AddPoint(new Vec2(72, -103));
		this.mSplitShapeLine[2].mLineWidth = 2;
		this.mSplitShapeLine[2].mRenderStyle = "Line";
		this.mSplitShapeLine[2].mColour = "#212121";
		this.mSplitShapeLine[2].mAlpha = 0.7;
	}
	
	this.mMimic = null; // a copy of the target card that this transformed into (retains when on battlefield or in graveyard)
};

// inherit the base class's prototype
OogaahCardBeingOfEnergy.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardBeingOfEnergy.prototype.Copy = function(other) {
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
	
	this.mSplitShape.splice(0, this.mSplitShape.length);
	this.mSplitShape = util.ConcatArray(this.mSplitShape, other.mSplitShape);
	
	this.mSplitShapeLine.splice(0, this.mSplitShapeLine.length);
	this.mSplitShapeLine = util.ConcatArray(this.mSplitShapeLine, other.mSplitShapeLine);
	
	if (other.mMimic != null) {
		this.mMimic = other.mMimic.GetCopy();
	}
	else {
		this.mMimic = null;
	}
}

OogaahCardBeingOfEnergy.prototype.GetCopy = function() {
	var c = new OogaahCardBeingOfEnergy(); c.Copy(this);
	
	return c;
}

// returns the data required to render this card base
OogaahCardBeingOfEnergy.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	if (this.mHidden == false) { // if the card isn't hidden
		arr.push(this.mCardSprites[this.mSize]); // add the appropiately size face sprite
		
		if (this.mMimic != null && this.mSize != 0) {
			arr.push(this.mSplitShape[this.mSize]);
			arr.push(this.mSplitShapeLine[this.mSize]);
			
			if (this.mMimic.mCardAttack == "3") {
				if (this.mMimic.mCardValue - 3 > 0) { // if the card attack has been modified due to ability
					arr.push(this.mMimic.mValueText[this.mSize]); // display the appropiate modification
				}
			}
			else if (this.mMimic.mCardAttack == "C") {
				if (this.mMimic.mCardValue - 10 < 0) { // if the card attack has been modified due to ability
					arr.push(this.mMimic.mValueText[this.mSize]); // display the appropiate modification
				}
			}
		}
	}
	else { // otherwise the card is hidden
		arr.push(this.mCardBacks[this.mSize]); // add the appropiately size back sprite
	}
	
	if (this.mDarken == true) { // 
		arr.push(this.mCardShapes[this.mSize]);
	}
	
	return arr; // return the renderables array
}

OogaahCardBeingOfEnergy.prototype.Play = function(cards) {
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
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			
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

// 
OogaahCardBeingOfEnergy.prototype.PositionValueText = function() {
	if (this.mMimic != null) {
		if (this.mMimic.mCardAttack == "3" || this.mMimic.mCardAttack == "C") {
			var lrgSpr = this.mCardSprites[0];
			this.mMimic.mValueText[0].SetPosition(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 3) + Math.round(lrgSpr.mSize.mX / 2) - 14,
					Math.round(nmain.game.mCanvasSize.mY / 2) + Math.round(lrgSpr.mSize.mY / 2) - 108));
			this.mMimic.mValueText[0].mDepth = lrgSpr.mDepth;
			
			var medSpr = this.mCardSprites[1];
			var medPos = new Vec2(); medPos.Copy(medSpr.mPos);
			medPos.mX -= medSpr.mOrigin.mX; medPos.mY -= medSpr.mOrigin.mY;
			this.mMimic.mValueText[1].SetPosition(new Vec2(medPos.mX + medSpr.mSize.mX - 4, medPos.mY + medSpr.mSize.mY - 52));
			this.mMimic.mValueText[1].mDepth = medSpr.mDepth;
			
			var smlSpr = this.mCardSprites[2];
			var smlPos = new Vec2(); smlPos.Copy(smlSpr.mPos);
			smlPos.mX -= smlSpr.mOrigin.mX; smlPos.mY -= smlSpr.mOrigin.mY;
			this.mMimic.mValueText[2].SetPosition(new Vec2(smlPos.mX + smlSpr.mSize.mX - 2, smlPos.mY + smlSpr.mSize.mY - 32));
			this.mMimic.mValueText[2].mDepth = smlSpr.mDepth;
		}
	}
}
// ...End

