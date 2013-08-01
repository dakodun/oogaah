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
			c.PositionClip();
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

