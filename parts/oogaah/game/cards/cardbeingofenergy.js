// OogaahCardBeingOfEnergy class
function OogaahCardBeingOfEnergy() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "S"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Being"; // the type of the card (e.g., Goblin)
	this.mCardName = "of Energy"; // the name of the card (e.g., Horde)
	this.mCardAbility = "In Duplicate"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 13; // the current value of the card
	
	this.mSplitRect = new Array();
	this.mSplitCircle = new Array();
	
	{
		this.mSplitRect[0] = new Shape();
		this.mSplitCircle[0] = new Shape();
		
		this.mSplitRect[1] = new Shape();
		this.mSplitRect[1].MakeRectangle(new Vec2(), new Vec2(90, 136));
		this.mSplitCircle[1] = new Shape();
		this.mSplitCircle[1].MakeCircle(new Vec2(), 15, 32);
		
		this.mSplitRect[2] = new Shape();
		this.mSplitRect[2].MakeRectangle(new Vec2(), new Vec2(54, 83));
		this.mSplitCircle[2] = new Shape();
		this.mSplitCircle[2].MakeCircle(new Vec2(), 9, 32);
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
	
	this.mSplitRect.splice(0, this.mSplitRect.length);
	this.mSplitRect = util.ConcatArray(this.mSplitRect, other.mSplitRect);
	
	this.mSplitCircle.splice(0, this.mSplitCircle.length);
	this.mSplitCircle = util.ConcatArray(this.mSplitCircle, other.mSplitCircle);
	
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
		
		if (this.mMimic != null) {
			arr.push(this.mSplitRect[this.mSize]);
			
			if (this.mMimic.mCardAttack == "3") {
				if (this.mMimic.mCardValue - 3 > 0) { // if the card attack has been modified due to ability
					arr.push(this.mMimic.mSplitShape[this.mSize]);
					arr.push(this.mMimic.mValueText[this.mSize]); // display the appropiate modification
				}
			}
			else if (this.mMimic.mCardAttack == "C") {
				if (this.mMimic.mCardValue - 10 < 0) { // if the card attack has been modified due to ability
					arr.push(this.mMimic.mSplitShape[this.mSize]);
					arr.push(this.mMimic.mValueText[this.mSize]); // display the appropiate modification
				}
			}
			else {
				arr.push(this.mSplitCircle[this.mSize]);
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
OogaahCardBeingOfEnergy.prototype.PositionClip = function() {
	{
		var medSpr = this.mCardSprites[1];
		
		this.mSplitRect[1].SetOrigin(medSpr.mOrigin);
		this.mSplitRect[1].SetPosition(medSpr.mPos);
		this.mSplitRect[1].mPos.mX += 15; this.mSplitRect[1].mPos.mY += 15;
		this.mSplitRect[1].SetPosition(this.mSplitRect[1].mPos);
		this.mSplitRect[1].mDepth = medSpr.mDepth;
		
		this.mSplitCircle[1].SetOrigin(medSpr.mOrigin);
		this.mSplitCircle[1].SetPosition(medSpr.mPos);
		this.mSplitCircle[1].mPos.mX += medSpr.mSize.mX - 26; this.mSplitCircle[1].mPos.mY += medSpr.mSize.mY - 18;
		this.mSplitCircle[1].SetPosition(this.mSplitCircle[1].mPos);
		this.mSplitCircle[1].mDepth = medSpr.mDepth;
		
		var mimicMedSpr = this.mMimic.mCardSprites[1];
		mimicMedSpr.SetRotation(0);
		mimicMedSpr.SetOrigin(new Vec2());
		mimicMedSpr.mDepth = medSpr.mDepth; 
		
		mimicMedSpr.SetPosition(new Vec2(-15, -15));
		this.mSplitRect[1].mSprite = mimicMedSpr.GetCopy();
		
		mimicMedSpr.SetPosition(new Vec2(-(medSpr.mSize.mX - 26), -(medSpr.mSize.mY - 18)));
		this.mSplitCircle[1].mSprite = mimicMedSpr.GetCopy();
	}
	
	{
		var smlSpr = this.mCardSprites[2];
		
		this.mSplitRect[2].SetOrigin(smlSpr.mOrigin);
		this.mSplitRect[2].SetPosition(smlSpr.mPos);
		this.mSplitRect[2].mPos.mX += 9; this.mSplitRect[2].mPos.mY += 9;
		this.mSplitRect[2].SetPosition(this.mSplitRect[2].mPos);
		this.mSplitRect[2].mDepth = smlSpr.mDepth;
		
		this.mSplitCircle[2].SetOrigin(smlSpr.mOrigin);
		this.mSplitCircle[2].SetPosition(smlSpr.mPos);
		this.mSplitCircle[2].mPos.mX += smlSpr.mSize.mX - 15; this.mSplitCircle[2].mPos.mY += smlSpr.mSize.mY - 10;
		this.mSplitCircle[2].SetPosition(this.mSplitCircle[2].mPos);
		this.mSplitCircle[2].mDepth = smlSpr.mDepth;
		
		var mimicSmlSpr = this.mMimic.mCardSprites[2];
		mimicSmlSpr.SetRotation(0);
		mimicSmlSpr.SetOrigin(new Vec2());
		mimicSmlSpr.mDepth = smlSpr.mDepth; 
		
		mimicSmlSpr.SetPosition(new Vec2(-9, -9));
		this.mSplitRect[2].mSprite = mimicSmlSpr.GetCopy();
		
		mimicSmlSpr.SetPosition(new Vec2(-(smlSpr.mSize.mX - 15), -(smlSpr.mSize.mY - 10)));
		this.mSplitCircle[2].mSprite = mimicSmlSpr.GetCopy();
	}
	
	if (this.mMimic.mCardAttack == "3" || this.mMimic.mCardAttack == "C") {
		this.PositionValueText();
	}
}

OogaahCardBeingOfEnergy.prototype.PositionValueText = function() {
	if (this.mMimic != null) {
		if (this.mMimic.mCardAttack == "3" || this.mMimic.mCardAttack == "C") {
			var lrgSpr = this.mCardSprites[0];
			this.mMimic.mValueText[0].SetPosition(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 3) + Math.round(lrgSpr.mSize.mX / 2) - 59,
					Math.round(nmain.game.mCanvasSize.mY / 2) + Math.round(lrgSpr.mSize.mY / 2) - 93));
			this.mMimic.mValueText[0].mDepth = lrgSpr.mDepth;
			
			var medSpr = this.mCardSprites[1];
			var medPos = new Vec2(); medPos.Copy(medSpr.mPos);
			medPos.mX -= medSpr.mOrigin.mX; medPos.mY -= medSpr.mOrigin.mY;
			this.mMimic.mValueText[1].SetPosition(new Vec2(medPos.mX + medSpr.mSize.mX - 26, medPos.mY + medSpr.mSize.mY - 42));
			this.mMimic.mValueText[1].mDepth = medSpr.mDepth;
			
			var smlSpr = this.mCardSprites[2];
			var smlPos = new Vec2(); smlPos.Copy(smlSpr.mPos);
			smlPos.mX -= smlSpr.mOrigin.mX; smlPos.mY -= smlSpr.mOrigin.mY;
			this.mMimic.mValueText[2].SetPosition(new Vec2(smlPos.mX + smlSpr.mSize.mX - 15, smlPos.mY + smlSpr.mSize.mY - 25));
			this.mMimic.mValueText[2].mDepth = smlSpr.mDepth;
			
			for (var i = 0; i < this.mCardSprites.length; ++i) {
				this.mMimic.mSplitShape[i].SetPosition(new Vec2(this.mCardSprites[i].mPos.mX + this.mCardSprites[i].mSize.mX,
						this.mCardSprites[i].mPos.mY + this.mCardSprites[i].mSize.mY));
				this.mMimic.mSplitShape[i].SetOrigin(this.mCardSprites[i].mOrigin);
			}
			
			{
				var ss0 = this.mMimic.mSplitShape[0];
				ss0.SetPosition(new Vec2(ss0.mPos.mX - 56, ss0.mPos.mY - 40));
				ss0.mDepth = lrgSpr.mDepth;
				
				var ss1 = this.mMimic.mSplitShape[1];
				ss1.SetPosition(new Vec2(ss1.mPos.mX - 26, ss1.mPos.mY - 18));
				ss1.mDepth = medSpr.mDepth;
				
				var ss2 = this.mMimic.mSplitShape[2];
				ss2.SetPosition(new Vec2(ss2.mPos.mX - 15, ss2.mPos.mY - 10));
				ss2.mDepth = smlSpr.mDepth;
			}
		}
	}
}
// ...End

