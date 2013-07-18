// OogaahBattlefield class
// a card pile which holds cards currently in play
function OogaahBattlefield() {
	OogaahPile.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahBattlefield.prototype = Object.create(OogaahPile.prototype);

// adds a card to the battlefield
OogaahBattlefield.prototype.AddCard = function(card) {
	var c = card.GetCopy(); // get a copy of the card
	
	c.mHidden = false;
	c.mDarken = false;
	c.mSize = 2;
	
	var pos = new Vec2(356, 188);
	
	var lrgSpr = c.mCardSprites[0];
	
	// reposition the card's medium sprite
	var medSpr = c.mCardSprites[1];
	medSpr.SetRotation(0);
	medSpr.SetOrigin(new Vec2(Math.round(medSpr.mSize.mX / 2), Math.round(medSpr.mSize.mY / 2)));
	medSpr.SetPosition(pos);
	
	// reposition the card's small sprite
	var smlSpr = c.mCardSprites[2];
	smlSpr.SetRotation(0);
	smlSpr.SetOrigin(new Vec2(Math.round(smlSpr.mSize.mX / 2), Math.round(smlSpr.mSize.mY / 2)));
	smlSpr.SetPosition(pos);
	
	if (c.mCardAttack == "3" || c.mCardAttack == "C") { // if the card is a human peasant or an orc berserker
		c.PositionValueText();
	}
	else if (c.mCardAttack == "S") {
		if (c.mMimic != null) {
			// medium
			c.mSplitShape[1].SetOrigin(new Vec2(Math.round(medSpr.mSize.mX / 2), Math.round(medSpr.mSize.mY / 2)));
			c.mSplitShape[1].SetPosition(new Vec2(pos.mX + medSpr.mSize.mX, pos.mY));
			c.mSplitShape[1].mDepth = medSpr.mDepth;
			
			c.mSplitShapeLine[1].SetOrigin(new Vec2(Math.round(medSpr.mSize.mX / 2), Math.round(medSpr.mSize.mY / 2)));
			c.mSplitShapeLine[1].SetPosition(new Vec2(pos.mX, pos.mY + medSpr.mSize.mY));
			c.mSplitShapeLine[1].mDepth = medSpr.mDepth;
			
			var mimicMed = c.mMimic.mCardSprites[1];
			mimicMed.SetRotation(0);
			mimicMed.SetPosition(new Vec2(-medSpr.mSize.mX, 0));
			mimicMed.SetOrigin(new Vec2());
			mimicMed.mDepth = medSpr.mDepth; 
			c.mSplitShape[1].mSprite = mimicMed;
			
			// small
			c.mSplitShape[2].SetOrigin(new Vec2(Math.round(smlSpr.mSize.mX / 2), Math.round(smlSpr.mSize.mY / 2)));
			c.mSplitShape[2].SetPosition(new Vec2(pos.mX + smlSpr.mSize.mX, pos.mY));
			c.mSplitShape[2].mDepth = smlSpr.mDepth;
			
			c.mSplitShapeLine[2].SetOrigin(new Vec2(Math.round(smlSpr.mSize.mX / 2), Math.round(smlSpr.mSize.mY / 2)));
			c.mSplitShapeLine[2].SetPosition(new Vec2(pos.mX, pos.mY + smlSpr.mSize.mY));
			c.mSplitShapeLine[2].mDepth = smlSpr.mDepth;
			
			var mimicSml = c.mMimic.mCardSprites[2];
			mimicSml.SetRotation(0);
			mimicSml.SetPosition(new Vec2(-smlSpr.mSize.mX, 0));
			mimicSml.SetOrigin(new Vec2());
			mimicSml.mDepth = smlSpr.mDepth; 
			c.mSplitShape[2].mSprite = mimicSml;
			
			if (c.mMimic.mCardAttack == "3" || c.mMimic.mCardAttack == "C") {
				c.PositionValueText();
			}
		}
	}
	
	this.mCards.push(c); // add it to the cards array
}

// returns battlefield render data
OogaahBattlefield.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	if (this.mCards.length > 0) { // if there is at least 1 card on the battlefield
		arr = util.ConcatArray(arr, this.mCards[this.mCards.length - 1].GetRenderData()); // show the small face sprite of the top card
	}
	
	return arr; // return the renderables array
}

// ...End

