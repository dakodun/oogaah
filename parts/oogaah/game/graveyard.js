// OogaahGraveyardViewCard class
// 
function OogaahGraveyardViewCard() {
	this.mCard = null;
	this.mIndex = 0;
};
// ...End


// OogaahGraveyard class
// a card pile which holds discarded cards
function OogaahGraveyard() {
	OogaahPile.apply(this, null); // construct the base class
	
	this.mCard = new OogaahCardBase();
	
	// additionaly sprites representing multiple (more than 1) cards in the graveyard
	this.mBundleSprites = new Array();
	this.mBundleSprites[1] = new Sprite();
	this.mBundleSprites[2] = new Sprite();
	
	this.mSize = 2; // the current render size of the graveyard
	this.m3 = false; // is the graveyard currently selectable
	
	this.mView = false;
	this.mViewShape = new Shape();
	this.mViewLeftButton = new GUIButton();
	this.mViewRightButton = new GUIButton();
	this.mViewIndex = 0;
	this.mViewCards = new Array();
	this.mCurrentHighlight = -1; // the id of the current card highlighted (-1 if none)
	
	this.mSelectableArrow = new Shape();
};

// inherit the base class's prototype
OogaahGraveyard.prototype = Object.create(OogaahPile.prototype);

// clears all cards from the pile
OogaahGraveyard.prototype.Clear = function() {
	this.mCards.splice(0, this.mCards.length); // clear the cards array
	this.mViewCards.splice(0, this.mViewCards.length);
	this.mViewIndex = 0;
}

// adds a card to the pile
OogaahGraveyard.prototype.AddCard = function(card) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var c = card.GetCopy(); // get a copy of the card
	
	{ // handle human peasant ability (which activates when a human knight enters the graveyard)
		var knight = false; // was it a knight that was added
		var peasant = false; // was it a peasant that was added
		
		if (c.mCardAttack == "9") { // if the card is a "9" (knight)
			knight = true; // it was a knight
		}
		else if (c.mCardAttack == "S") { // otherwise if the card is an "S" (being of light)
			if (c.mMimic != null) { // if being of light was played using its ability
				if (c.mMimic.mCardAttack == "9") { // if the card was played as a knight
					knight = true; // it was a knight
				}
			}
		}
		else if (c.mCardAttack == "3") { // if the card is a "3" (peasant)
			peasant = true; // it was a peasant
		}
		
		if (knight == true) { // if it was a knight that was added
			for (var i = 0; i < currScene.mPlayers.length; ++i) { // for all players
				var hand = currScene.mPlayers[i].mHand; // reference to current hand
				for (var j = 0; j < hand.mCards.length; ++j) { // for all cards in the hand
					if (hand.mCards[j].mCardAttack == "3") { // if the card is a "3" (human peasant)
						hand.mCards[j].ModifyValue(1); // update the card's value
					}
				}
				
				currScene.mPlayers[i].PositionHand();
			}
			
			for (var i = 0; i < this.mViewCards.length; ++i) {
				for (var j = 0; j < this.mViewCards[i].length; ++j) {
					if (this.mViewCards[i][j].mCard.mCardAttack == "3") { // if the card is a "3" (peasant)
						this.mViewCards[i][j].mCard.ModifyValue(1);
						this.mViewCards[i][j].mCard.PositionValueText();
						
						this.mCards[this.mViewCards[i][j].mIndex].ModifyValue(1);
						this.mCards[this.mViewCards[i][j].mIndex].PositionValueText();
					}
				}
			}
		}
		else if (peasant == true) { // if it was a peasant that was added
			var knights = 0;
			
			for (var i = 0; i < this.mCards.length; ++i) {
				if (this.mCards[i].mCardAttack == "9") { // if the card is a "9" (knight)
					++knights;
				}
				else if (this.mCards[i].mCardAttack == "S") { // otherwise if the card is an "S" (being of light)
					if (this.mCards[i].mMimic != null) { // if being of light was played using its ability
						if (this.mCards[i].mMimic.mCardAttack == "9") { // if the card was played as a knight
							++knights;
						}
					}
				}
			}
			
			c.mCardValue = 3;
			c.ModifyValue(knights);
			c.PositionValueText();
		}
	}
	
	this.mCards.push(c); // add it to the cards array
	
	{ // handle viewing cards
		var found = false; // did we find a matching card in the viewing cards array
		var id = -1; // the id of the matching card array OR the closest card array past it
		
		for (var i = 0; i < this.mViewCards.length; ++i) { // for all card arrays in the viewing cards array
			var cardOther = this.mViewCards[i][0].mCard; // the card we're comparing against
			var attack = card.mCardAttack;
			if (attack == "S") {
				if (card.mMimic != null) {
					attack = card.mMimic.mCardAttack;
				}
			}
			
			if (cardOther.mCardAttack == attack) { // if the attacks match
				id = i; // set the id to this index
				found = true; // we found a match
				break; // stop looking
			}
			else if (noogaah.AVToIndex(cardOther.mCardAttack) > noogaah.AVToIndex(attack)) { // ordered, so if greater then doesn't exist
				id = i; // set the id to this index
				break; // stop looking
			}
		}
		
		var viewCard = new OogaahGraveyardViewCard();
		viewCard.mCard = c.GetCopy();
		viewCard.mIndex = this.mCards.length - 1;
		
		var cardNew = viewCard.mCard;
		
		{
			cardNew.mCardSprites[1].SetPosition(new Vec2(220, 259));
			cardNew.mCardSprites[1].SetOrigin(new Vec2(0, cardNew.mCardSprites[1].mSize.mY));
			cardNew.mCardSprites[1].SetRotation(0);
			cardNew.mCardSprites[1].mDepth = -56;
			
			cardNew.mCardSprites[2].SetPosition(new Vec2(220, 259));
			cardNew.mCardSprites[2].SetOrigin(new Vec2(0, cardNew.mCardSprites[2].mSize.mY));
			cardNew.mCardSprites[2].SetRotation(0);
			cardNew.mCardSprites[2].mDepth = -55;
			
			// if the card is a human peasant or an orc berserker
			if (cardNew.mCardAttack == "3" || cardNew.mCardAttack == "C") {
				cardNew.PositionValueText();
			}
			else if (cardNew.mCardAttack == "S") {
				if (cardNew.mMimic != null) {
					// medium
					cardNew.mSplitShape[1].SetOrigin(new Vec2(0, cardNew.mCardSprites[1].mSize.mY));
					cardNew.mSplitShape[1].SetPosition(new Vec2(220 + cardNew.mCardSprites[1].mSize.mX, 259));
					cardNew.mSplitShape[1].mDepth = cardNew.mCardSprites[1].mDepth;
					
					cardNew.mSplitShapeLine[1].SetOrigin(new Vec2(0, cardNew.mCardSprites[1].mSize.mY));
					cardNew.mSplitShapeLine[1].SetPosition(new Vec2(220, 259 + cardNew.mCardSprites[1].mSize.mY));
					cardNew.mSplitShapeLine[1].mDepth = cardNew.mCardSprites[1].mDepth;
					
					var mimicMed = cardNew.mMimic.mCardSprites[1];
					mimicMed.SetRotation(0);
					mimicMed.SetPosition(new Vec2(-cardNew.mCardSprites[1].mSize.mX, 0));
					mimicMed.SetOrigin(new Vec2());
					mimicMed.mDepth = cardNew.mCardSprites[1].mDepth;
					cardNew.mSplitShape[1].mSprite = mimicMed;
					
					// small
					cardNew.mSplitShape[2].SetOrigin(new Vec2(0, cardNew.mCardSprites[2].mSize.mY));
					cardNew.mSplitShape[2].SetPosition(new Vec2(220 + cardNew.mCardSprites[2].mSize.mX, 259));
					cardNew.mSplitShape[2].mDepth = cardNew.mCardSprites[2].mDepth;
					
					cardNew.mSplitShapeLine[2].SetOrigin(new Vec2(0, cardNew.mCardSprites[2].mSize.mY));
					cardNew.mSplitShapeLine[2].SetPosition(new Vec2(220, 259 + cardNew.mCardSprites[2].mSize.mY));
					cardNew.mSplitShapeLine[2].mDepth = cardNew.mCardSprites[2].mDepth;
					
					var mimicSml = cardNew.mMimic.mCardSprites[2];
					mimicSml.SetRotation(0);
					mimicSml.SetPosition(new Vec2(-cardNew.mCardSprites[2].mSize.mX, 0));
					mimicSml.SetOrigin(new Vec2());
					mimicSml.mDepth = cardNew.mCardSprites[2].mDepth;
					cardNew.mSplitShape[2].mSprite = mimicSml;
					
					if (cardNew.mMimic.mCardAttack == "3" || cardNew.mMimic.mCardAttack == "C") {
						cardNew.PositionValueText();
					}
				}
			}
			
			cardNew.mHidden = false;
			cardNew.mDarken = false;
			cardNew.mSize = 2;
			cardNew.CreateCardShapes();
		}
		
		if (found == true) { // if we found a match
			this.mViewCards[id].push(viewCard); // add it to the array
			
			var pos = new Vec2(220 - ((20 * (this.mViewCards[id].length - 1)) / 2),
					259 - ((20 * (this.mViewCards[id].length - 1)) / 2));
			
			for (var i = 0; i < this.mViewCards[id].length; ++i) {
				this.mViewCards[id][i].mCard.mCardSprites[1].SetPosition(pos);
				this.mViewCards[id][i].mCard.mCardSprites[2].SetPosition(pos);
				
				// if the card is a human peasant or an orc berserker
				if (this.mViewCards[id][i].mCard.mCardAttack == "3" || this.mViewCards[id][i].mCard.mCardAttack == "C") {
					this.mViewCards[id][i].mCard.PositionValueText();
				}
				else if (this.mViewCards[id][i].mCard.mCardAttack == "S") {
					if (this.mViewCards[id][i].mCard.mMimic != null) {
						// medium
						this.mViewCards[id][i].mCard.mSplitShape[1].SetPosition(new Vec2(pos.mX +
								this.mViewCards[id][i].mCard.mCardSprites[1].mSize.mX, pos.mY));
						this.mViewCards[id][i].mCard.mSplitShapeLine[1].SetPosition(new Vec2(pos.mX,
								pos.mY + this.mViewCards[id][i].mCard.mCardSprites[1].mSize.mY));
						
						// small
						this.mViewCards[id][i].mCard.mSplitShape[2].SetPosition(new Vec2(pos.mX +
								this.mViewCards[id][i].mCard.mCardSprites[2].mSize.mX, pos.mY));
						this.mViewCards[id][i].mCard.mSplitShapeLine[2].SetPosition(new Vec2(pos.mX,
								pos.mY + this.mViewCards[id][i].mCard.mCardSprites[2].mSize.mY));
						
						if (this.mViewCards[id][i].mCard.mMimic.mCardAttack == "3" || this.mViewCards[id][i].mCard.mMimic.mCardAttack == "C") {
							this.mViewCards[id][i].mCard.PositionValueText();
						}
					}	
				}
				
				pos.mX += 20; pos.mY += 20;
			}
		}
		else { // otherwise no match
			if (id >= 0) { // if we have an id
				this.mViewCards.splice(id, 0, new Array()); // insert new card array before the id we found
				
				this.mViewCards[id].push(viewCard); // add it to the array
			}
			else { // otherwise we have no id
				this.mViewCards.push(new Array()); // insert new card array at the end
				
				this.mViewCards[this.mViewCards.length - 1].push(viewCard); // add it to the array
			}
		}
	}
}

// removes a card from the pile
OogaahGraveyard.prototype.RemoveCard = function(id) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (id >= 0 && id < this.mCards.length) { // if card id is valid
		{ // handle human peasant ability (which activates when a human knight leaves the graveyard)
			var knight = false;
			if (this.mCards[id].mCardAttack == "9") { // if the card is a "9" (knight)
				knight = true; // it was a knight
			}
			else if (this.mCards[id].mCardAttack == "S") { // otherwise if the card is an "S" (being of light)
				if (this.mCards[id].mMimic != null) { // if being of light was played using its ability
					if (this.mCards[id].mMimic.mCardAttack == "9") { // if the card was played as a knight
						knight = true; // it was a knight
					}
				}
			}
			
			if (knight == true) { // if it was a knight that was added
				for (var i = 0; i < currScene.mPlayers.length; ++i) { // for all players
					var hand = currScene.mPlayers[i].mHand; // reference to current hand
					for (var j = 0; j < hand.mCards.length; ++j) { // for all cards in the hand
						if (hand.mCards[j].mCardAttack == "3") { // if the card is a "3" (human peasant)
							hand.mCards[j].ModifyValue(-1); // update the card's value
						}
					}
					
					currScene.mPlayers[i].PositionHand();
				}
				
				for (var i = 0; i < this.mViewCards.length; ++i) {
					for (var j = 0; j < this.mViewCards[i].length; ++j) {
						if (this.mViewCards[i][j].mCard.mCardAttack == "3") { // if the card is a "3" (peasant)
							this.mViewCards[i][j].mCard.ModifyValue(-1);
							this.mViewCards[i][j].mCard.PositionValueText();
							
							this.mCards[this.mViewCards[i][j].mIndex].ModifyValue(-1);
							this.mCards[this.mViewCards[i][j].mIndex].PositionValueText();
						}
					}
				}
			}
		}
		
		this.mCards.splice(id, 1); // remove the card from the array
		
		{ // handle viewing cards
			var index = 0; // the index of the card array which held the card we removed
			for (var i = 0; i < this.mViewCards.length; ++i) { // for all card arrays in the viewing cards array
				for (var j = 0; j < this.mViewCards[i].length; ++j) { // for all cards in the card array
					if (this.mViewCards[i][j].mIndex == id) { // if the card's id matches the id we're removing
						this.mViewCards[i].splice(j, 1); // remove the card
						index = i; // store the index of the card array it belonged too
						--j; // decrement j
					}
					else if (this.mViewCards[i][j].mIndex > id) { // otherwise if the id is greater
						--this.mViewCards[i][j].mIndex; // decrement the id by 1
					}
				}
			}
			
			if (this.mViewCards[index].length == 0) { // if the card array we removed from is now empty
				this.mViewCards.splice(index, 1); // remove the card array from the viewing cards array
				// if the view index is greater than the index of the card array we removed OR
				// the view index is the same as the index of the card array we removed AND is at the end of the viewing cards array
				if (this.mViewIndex > index || (this.mViewIndex == index && this.mViewIndex == this.mViewCards.length)) { 
					this.mViewIndex--; // decrement the view index
				}
			}
			else { // otherwise not empty so we need to reposition
				// the initial position
				var pos = new Vec2(220 - ((20 * (this.mViewCards[index].length - 1)) / 2),
						259 - ((20 * (this.mViewCards[index].length - 1)) / 2));
				
				for (var i = 0; i < this.mViewCards[index].length; ++i) { // for all cards in the cards array
					// set the position of the medium and small card faces
					this.mViewCards[index][i].mCard.mCardSprites[1].SetPosition(pos);
					this.mViewCards[index][i].mCard.mCardSprites[2].SetPosition(pos);
					
					// if the card is a human peasant or an orc berserker
					if (this.mViewCards[index][i].mCard.mCardAttack == "3" || this.mViewCards[index][i].mCard.mCardAttack == "C") {
						this.mViewCards[index][i].mCard.PositionValueText();
					}
					else if (this.mViewCards[index][i].mCard.mCardAttack == "S") {
						if (this.mViewCards[index][i].mCard.mMimic != null) {
							// medium
							this.mViewCards[index][i].mCard.mSplitShape[1].SetPosition(new Vec2(pos.mX +
									this.mViewCards[index][i].mCard.mCardSprites[1].mSize.mX, pos.mY));
							this.mViewCards[index][i].mCard.mSplitShapeLine[1].SetPosition(new Vec2(pos.mX,
									pos.mY + this.mViewCards[index][i].mCard.mCardSprites[1].mSize.mY));
							
							// small
							this.mViewCards[index][i].mCard.mSplitShape[2].SetPosition(new Vec2(pos.mX +
									this.mViewCards[index][i].mCard.mCardSprites[2].mSize.mX, pos.mY));
							this.mViewCards[index][i].mCard.mSplitShapeLine[2].SetPosition(new Vec2(pos.mX,
									pos.mY + this.mViewCards[index][i].mCard.mCardSprites[2].mSize.mY));
							
							if (this.mViewCards[index][i].mCard.mMimic.mCardAttack == "3" || this.mViewCards[index][i].mCard.mMimic.mCardAttack == "C") {
								this.mViewCards[index][i].mCard.PositionValueText();
							}
						}	
					}
					
					pos.mX += 20; pos.mY += 20; // adjust the position
				}
			}
		}
	}
}

// set up the graveyard
OogaahGraveyard.prototype.SetUp = function() {
	{
		// textures for card backs
		var texBackMedium = nmgrs.resMan.mTexStore.GetResource("cardBackMedium");
		var texBackSmall = nmgrs.resMan.mTexStore.GetResource("cardBackSmall");
		
		this.mCard.mHidden = true;
		
		// set the medium textures
		this.mCard.mCardBacks[1].SetTexture(texBackMedium);
		this.mCard.mCardBacks[1].SetPosition(new Vec2(256, 208));
		this.mCard.mCardBacks[1].SetOrigin(new Vec2(Math.round(this.mCard.mCardBacks[1].mSize.mX / 2),
				Math.round(this.mCard.mCardBacks[1].mSize.mY / 2)));
		this.mCard.mCardBacks[1].SetMask(null);
		
		// set the small textures
		this.mCard.mCardBacks[2].SetTexture(texBackSmall);
		this.mCard.mCardBacks[2].SetPosition(new Vec2(256, 208));
		this.mCard.mCardBacks[2].SetOrigin(new Vec2(Math.round(this.mCard.mCardBacks[2].mSize.mX / 2),
				Math.round(this.mCard.mCardBacks[2].mSize.mY / 2)));
		this.mCard.mCardBacks[2].SetMask(null);
		
		// set the small shape alpha and colour
		this.mCard.mCardShapes[2].mAlpha = 0.64;
		this.mCard.mCardShapes[2].mColour = "#000000";
		
		this.mCard.CreateCardShapes();
	}
	
	{
		// textures for card bundles
		var texBundleMedium = nmgrs.resMan.mTexStore.GetResource("cardBundleMedium");
		var texBundleSmall = nmgrs.resMan.mTexStore.GetResource("cardBundleSmall");
		
		// set up medium bundle sprite
		this.mBundleSprites[1].SetTexture(texBundleMedium);
		this.mBundleSprites[1].SetPosition(new Vec2(256, 208));
		this.mBundleSprites[1].SetOrigin(new Vec2(Math.round(this.mBundleSprites[1].GetSize().mX / 2),
				Math.round(this.mBundleSprites[1].GetSize().mY / 2)));
		
		// set up small bundle sprite
		this.mBundleSprites[2].SetTexture(texBundleSmall);
		this.mBundleSprites[2].SetPosition(new Vec2(256, 208));
		this.mBundleSprites[2].SetOrigin(new Vec2(Math.round(this.mBundleSprites[2].GetSize().mX / 2),
				Math.round(this.mBundleSprites[2].GetSize().mY / 2)));
	}
	
	{
		this.mViewShape.MakeRectangle(new Vec2(2, 132), new Vec2(nmain.game.mCanvasSize.mX - 4, 151));
		this.mViewShape.mDepth = -10;
		this.mViewShape.mAlpha = 0.5;
		this.mViewShape.mColour = "#000000";
		
		var arrowTex = nmgrs.resMan.mTexStore.GetResource("buttonGraveyardArrow");
		this.mViewLeftButton.SetUp(new Vec2(136, 181), new Vec2(25, 50), -51);
		this.mViewLeftButton.mSpriteIdle.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewLeftButton.mSpriteIdle.SetCurrentFrame(0);
		this.mViewLeftButton.mSpriteHover.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewLeftButton.mSpriteHover.SetCurrentFrame(2);
		this.mViewLeftButton.mSpriteDown.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewLeftButton.mSpriteDown.SetCurrentFrame(4);
		this.mViewLeftButton.mSpriteInactive.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewLeftButton.mSpriteInactive.SetCurrentFrame(6);
		
		this.mViewRightButton.SetUp(new Vec2(352, 181), new Vec2(25, 50), -51);
		this.mViewRightButton.mSpriteIdle.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewRightButton.mSpriteIdle.SetCurrentFrame(1);
		this.mViewRightButton.mSpriteHover.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewRightButton.mSpriteHover.SetCurrentFrame(3);
		this.mViewRightButton.mSpriteDown.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewRightButton.mSpriteDown.SetCurrentFrame(5);
		this.mViewRightButton.mSpriteInactive.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewRightButton.mSpriteInactive.SetCurrentFrame(7);
	}
	
	this.mSelectableArrow.SetPosition(new Vec2(256, 274));
	this.mSelectableArrow.AddPoint(new Vec2(22, 27));
	this.mSelectableArrow.AddPoint(new Vec2(11, 27));
	this.mSelectableArrow.AddPoint(new Vec2(11, 38));
	this.mSelectableArrow.AddPoint(new Vec2(-11, 38));
	this.mSelectableArrow.AddPoint(new Vec2(-11, 27));
	this.mSelectableArrow.AddPoint(new Vec2(-22, 27));
	this.mSelectableArrow.mColour = "#74AA19";
	this.mSelectableArrow.mDepth = 100;
}

OogaahGraveyard.prototype.Input = function() {
	this.mViewLeftButton.Input();
	this.mViewRightButton.Input();
}

OogaahGraveyard.prototype.Process = function() {
	if (this.mView == true) {
		this.mViewLeftButton.Process(null);
		this.mViewRightButton.Process(null);
		
		if (this.mViewIndex > 0) {
			if (this.mViewLeftButton.OnClick()) {
				this.mViewIndex--;
			}
		}
		
		if (this.mViewIndex < this.mViewCards.length - 1) {
			if (this.mViewRightButton.OnClick()) {
				this.mViewIndex++;
			}
		}
		
		{
			this.mCurrentHighlight = -1; // reset the current highlighted card
			var found = false; // have we found a card that is highlighted (assume no initially)
			
			if (this.mViewCards.length > 0) {
				if (this.mViewIndex >= 0 && this.mViewIndex < this.mViewCards.length) {
					var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get the cursor position
					
					for (var i = this.mViewCards[this.mViewIndex].length - 1; i >= 0; --i) { // for all cards in the card array
						var bounds = this.mViewCards[this.mViewIndex][i].mCard.mCardSprites[2].mGlobalMask.GetBounds();
						var tl = bounds[0];
						var br = bounds[1];
						
						// if the cursor is within the bounding box
						if (util.PointInRectangle(p, tl, br) == true && found == false) {
							this.mCurrentHighlight = i; // set the current highlighted card to this card
							this.mViewCards[this.mViewIndex][i].mCard.mSize = 1; // set its size to medium
							
							found = true; // we're done searching
						}
						else {
							this.mViewCards[this.mViewIndex][i].mCard.mSize = 2; // ensure size is small
						}
					}
				}
			}
		}
	}
}

// returns graveyard render data
OogaahGraveyard.prototype.GetRenderData = function() {
	var arr = new Array();  // returned array holding the renderables
	
	if (this.mView == false) {
		if (this.mCards.length > 0) { // if there is at least 1 card in the graveyard
			if (this.mCards.length > 1) { // if there is more than 1 card in the graveyard
				arr.push(this.mBundleSprites[this.mSize]); // add the appropiately sized bundle sprite
			}
			
			arr = util.ConcatArray(arr, this.mCard.GetRenderData());
			
			if (this.mSelectable == true) {
				arr.push(this.mSelectableArrow);
			}
		}
	}
	else {
		arr.push(this.mViewShape);
		
		if (this.mViewIndex > 0) {
			arr = util.ConcatArray(arr, this.mViewLeftButton.GetRenderData());
		}
		
		if (this.mViewIndex < this.mViewCards.length - 1) {
			arr = util.ConcatArray(arr, this.mViewRightButton.GetRenderData());
		}
		
		if (this.mViewIndex >= 0 && this.mViewIndex < this.mViewCards.length) {
			var cards = this.mViewCards[this.mViewIndex];
			
			for (var i = 0; i < cards.length; ++i) {
				arr = util.ConcatArray(arr, cards[i].mCard.GetRenderData());
			}
		}
	}
	
	return arr; // return the renderables array
}

// returns true if the mouse is highlighting the graveyard
OogaahGraveyard.prototype.HandHighlighted = function() {
	var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get the cursor position
	
	var bounds = this.mCard.mCardBacks[2].mGlobalMask.GetBounds();
	var tl = bounds[0];
	var br = bounds[1];
	
	// if the cursor is within the bounding box
	if (util.PointInRectangle(p, tl, br) == true) {
		return true; // highlighting
	}
	
	return false; // not highlighting
}

// sets the graveyard highlight status
OogaahGraveyard.prototype.Highlight = function(highlight) {
	if (highlight == true) { // if we are to highlight the graveyard
		this.mSize = 1; // set the size to medium
		this.mCard.mSize = this.mSize;
	}
	else { // otherwise if we are to unhighlight
		this.mSize = 2; // set the size to small
		this.mCard.mSize = this.mSize;
	}
}

OogaahGraveyard.prototype.SetView = function(view) {
	if (view != this.mView) {
		this.mView = view;
		this.mViewIndex = 0;
	}
}
// ...End

