// OogaahAI Class...
// 
function OogaahAI() {
	OogaahPlayer.apply(this, null); // construct the base class
	
	this.mType = "AI";
	
	this.mBehaviourStore = new OogaahBehaviourStore();
	
	this.mSelectable = false;
	this.mSelectableArrow = new Shape();
	
	this.mTurnHighlight = new Array();
};

// inherit the base class's prototype
OogaahAI.prototype = Object.create(OogaahPlayer.prototype);

// 
OogaahAI.prototype.SetUp = function(id) {
	this.mPlayerID = id; // set the player's id
	this.mName = "CPU " + id;
	this.ResetSelected(); // reset selected cards (initialises array)
	
	this.mSelectableArrow.SetPosition(new Vec2(100 + (210 * (this.mPlayerID - 1)), 50));
	this.mSelectableArrow.AddPoint(new Vec2(22, 27));
	this.mSelectableArrow.AddPoint(new Vec2(11, 27));
	this.mSelectableArrow.AddPoint(new Vec2(11, 38));
	this.mSelectableArrow.AddPoint(new Vec2(-11, 38));
	this.mSelectableArrow.AddPoint(new Vec2(-11, 27));
	this.mSelectableArrow.AddPoint(new Vec2(-22, 27));
	this.mSelectableArrow.mColour = "#74AA19";
	this.mSelectableArrow.mDepth = 100;
}

OogaahAI.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (this.mMode == 2) {
		var hordes = this.mBehaviourStore.DecideMode2(); // decide if we want to play any goblin hordes
		
		if (hordes == null) { // if no hordes are played
			hordes = new Array(); // set hordes to a blank array
		}
		
		if (hordes.length > 0) {
			for (var i = 0; i < hordes.length; ++i) {
				this.mSelectedCards[hordes[i]] = 2;
			}
			
			var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
			if (arr.length > 0) { // if we have selected at least 1 card
				arr[0].Play(arr); // play that/those cards
			}
		}
		else {
			currScene.mLog.AddEntry(4, this.mName + " chose not to play any Goblin Hordes."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer();
		}
		
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 5) {
		var wannaPlay = false;
		
		wannaPlay = this.mBehaviourStore.DecideMode5(); // decide if we wanna swap at all
		
		if (wannaPlay == true) {
			this.mSubMode = "b";
			wannaPlay = false;
			
			var target = this.mBehaviourStore.DecideMode5(); // pick the target we want to swap with (if at all)
			if (target != null) {
				if (target == -1) {
					this.mChosenPlayer = currScene.mGraveyard; // store a reference to the graveyard
				}
				else {
					this.mChosenPlayer = currScene.mPlayers[target].mHand;
				}
				
				this.mChosenID = target; // store the chosen player's id
				this.mChosenCard = currScene.mRand.GetRandInt(0, this.mChosenPlayer.mCards.length - 1);
				
				wannaPlay = true;
			}
			
			if (wannaPlay == true) {
				this.mSubMode = "c";
				wannaPlay = false;
				
				var cardID = this.mBehaviourStore.DecideMode5(); // decide if we want the chosen card
				if (cardID != null) {
					wannaPlay = true;
				}
				
				if (wannaPlay == true) {
					this.mSelectedCards[cardID] = 2;
					
					var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
					if (arr.length > 0) { // if we have selected at least 1 card
						arr[0].Play(arr); // play that/those cards
					}
				}
				else {
					// add entry to the play log
					currScene.mLog.AddEntry(4, this.mName + " chose not to swap for a " +
							this.mChosenPlayer.mCards[this.mChosenCard].mCardType + " " +
							this.mChosenPlayer.mCards[this.mChosenCard].mCardName  + ".");
					
					this.mMode = 0; // reset to mode 0
					this.mSubMode = "a"; // reset to submode a
					this.ResetSelected(); // reset selected states
					currScene.ChangePlayer();
				}
			}
			else {
				currScene.mLog.AddEntry(4, this.mName + " cancelled the card swap."); // add entry to the play log
				
				this.mMode = 0; // reset to mode 0
				this.mSubMode = "a"; // reset to submode a
				this.ResetSelected(); // reset selected states
				currScene.ChangePlayer(); // change to the next player
			}
		}
		else {
			currScene.mLog.AddEntry(4, this.mName + " chose not to swap a card."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer();
		}
		
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 6) {
		var wannaReverse = this.mBehaviourStore.DecideMode6(); // 
		
		if (wannaReverse == true) {
			currScene.mReversed = !currScene.mReversed; // reverse the current game values
			
			currScene.mLog.AddEntry(3, this.mName + " reversed card values for this skirmish."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
		}
		else {
			currScene.mLog.AddEntry(4, this.mName + " chose not to reverse card values for this skirmish."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
		}
		
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 8) {
		var cardID = this.mBehaviourStore.DecideMode8(); // 
		
		if (cardID >= 0) {
			this.mSelectedCards[cardID] = 2;
			
			var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
			if (arr.length > 0) { // if we have selected at least 1 card
				arr[0].Play(arr); // play that/those cards
			}
		}
		else {
			currScene.mLog.AddEntry(4, this.mName + " chose not to play a card alongside Human Mage."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
		}
		
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 12) {
		var recieved = this.mBehaviourStore.DecideMode12(); // 
		
		if (recieved == null) {
			recieved = new Array();
		}
		
		if (recieved.length > 0) {
			var card = currScene.mGraveyard.GetCard(recieved[0]);

			{ // if taken card was human knight
				if (card.mCardAttack == "9") {
					currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activated.");
				}
				else if (card.mCardAttack == "S") {
					if (card.mMimic != null) { // if being of light was played using its ability
						if (card.mMimic.mCardAttack == "9") { // if the card was played as a knight
							currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activated.");
						}
						
						card.mMimic = null;
					}
				}
			}
			
			for (var i = recieved.length - 1; i >= 0; --i) {
				var c = currScene.mGraveyard.GetCard(recieved[i]);
				this.mHand.AddCard(c);
				currScene.mGraveyard.RemoveCard(recieved[i]);
			}
			
			this.PositionHand();
			
			currScene.mLog.AddEntry(3, this.mName + " took " + recieved.length + "x " + card.mCardType + " " + card.mCardName + " from the graveyard.");
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
		}
		else {
			currScene.mLog.AddEntry(4, this.mName + " chose not to take any cards from the graveyard."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
		}
		
		currScene.mDelay = 1000;
	}
	else {
		if (this.mFinished == false) {
			var play = this.mBehaviourStore.DecideMode0(); //
			if (play == null) {
				play = new Array();
			}
			
			if (play.length > 0) {
				for (var i = 0; i < play.length; ++i) {
					this.mSelectedCards[play[i]] = 2;
				}
				
				var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
				if (arr.length > 0) { // if we have selected at least 1 card
					arr[0].Play(arr); // play that/those cards
					currScene.mDelay = 1000;
				}
			}
			else {
				currScene.mLog.AddEntry(2, this.mName + " passed.");
				currScene.ChangePlayer();
				currScene.mDelay = 1000;
			}
		}
		else {
			currScene.ChangePlayer();
		}
	}
	
	if (this.mHand.mCards.length == 0 && this.mMode == 0 && this.mFinished == false) {
		if (currScene.mFinishedCount == 0) {
			currScene.mLog.AddEntry(7, this.mName + " achieved a flawless victory (1st)!"); // add entry to the play log
		}
		else if (currScene.mFinishedCount == 1) {
			currScene.mLog.AddEntry(8, this.mName + " won a costly battle (2nd)!"); // add entry to the play log
		}
		else if (currScene.mFinishedCount == 2) {
			currScene.mLog.AddEntry(9, this.mName + " yielded and limped home (3rd)!"); // add entry to the play log
		}
		
		++currScene.mFinishedCount;
		this.mFinished = true;
	}
}

// render anything associated with the player
OogaahAI.prototype.GetRenderData = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var arr = new Array(); // returned array holding the renderables
	
	arr = util.ConcatArray(arr, this.mHand.GetRenderData()); // add the player's hand to the array
	
	if (currScene.mCurrPlayer == this.mPlayerID) {
		for (var i = 0; i < this.mTurnHighlight.length; ++i) {
			arr.push(this.mTurnHighlight[i]);
		}
	}
	
	if (this.mSelectable == true) {
		arr.push(this.mSelectableArrow);
	}
	
	return arr; // return the renderables array
}

// positions the player's hand
OogaahAI.prototype.PositionHand = function() {
	this.mHand.mCards.sort(noogaah.CardSort); // sort the cards by value
	this.mTurnHighlight.splice(0, this.mTurnHighlight.length);
	
	var pos = new Vec2(120 + (210 * (this.mPlayerID - 1)), -60); // the default posiiton (initial card position)
	var rot = 160; // default rotation
	
	for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
		var card = this.mHand.mCards[i]; // store a reference to the card
		card.mHidden = true; // set the card to hidden
		// card.mDarken = true; // set the card to hidden
		
		// set the small sprite position, origin, depth and rotation
		var smlSpr = card.mCardSprites[2];
		smlSpr.SetPosition(pos);
		smlSpr.SetOrigin(new Vec2(0, smlSpr.mSize.mX));
		smlSpr.mDepth = 1 + i;
		smlSpr.SetRotation(rot);
		
		var smlSprB = card.mCardBacks[2];
		smlSprB.SetPosition(pos);
		smlSprB.SetOrigin(new Vec2(0, smlSprB.mSize.mX));
		smlSprB.mDepth = 1 + i;
		smlSprB.SetRotation(rot);
		
		// create the card shapes
		card.CreateCardShapes();
		
		// set depth
		card.mCardShapes[2].mDepth = 1 + i;
		
		{
			var high = new Shape();
			
			high.SetPosition(new Vec2(smlSprB.mPos.mX, smlSprB.mPos.mY));
			high.AddPoint(new Vec2(smlSprB.mSize.mX + 6, 0));
			high.AddPoint(new Vec2(smlSprB.mSize.mX + 6, smlSprB.mSize.mY + 6));
			high.AddPoint(new Vec2(0, smlSprB.mSize.mY + 6));
			high.SetOrigin(new Vec2(3, smlSprB.mSize.mX + 3));
			high.SetRotation(rot);
			
			high.mColour = "#74AA19";
			high.mDepth = 50;
			
			this.mTurnHighlight.push(high);
		}
		
		rot += 6; // increase the rotation angle for the next card
	}
}

// returns true if the player's hand is highlighted
OogaahAI.prototype.HandHighlighted = function() {
	for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
		var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get the cursor position
		var poly = this.mHand.mCards[i].mCardBacks[2].mGlobalMask.GetAbsolute(); // get array containing the points that make the shape
		
		// if the cursor is within the bounding box
		if (util.PointInConvex(p, poly) == true) {
			return true; // highlighted
		}
	}
	
	return false; // not highlighted
}

// sets the player's hand highlight status
OogaahAI.prototype.Highlight = function(highlight) {
	if (highlight == true) { // if we are to highlight hand
		for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
			var spr = this.mHand.mCards[i].mCardSprites[2];
			spr.SetPosition(new Vec2(spr.mPos.mX, -30)); // set y position lower
			
			var sprB = this.mHand.mCards[i].mCardBacks[2];
			sprB.SetPosition(new Vec2(sprB.mPos.mX, -30));
		}
	}
	else { // otherwise we are to unhighlight hand
		for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
			var spr = this.mHand.mCards[i].mCardSprites[2];
			spr.SetPosition(new Vec2(spr.mPos.mX, -60)); // set y position lower
			
			var sprB = this.mHand.mCards[i].mCardBacks[2];
			sprB.SetPosition(new Vec2(sprB.mPos.mX, -60));
		}
	}
}

OogaahAI.prototype.GetValidPlays = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mHand.mCards;
	var validPlays = new Array();
	
	{ // get all valid plays
		if (currScene.mOnlyPeasants == true) {
			for (var i = 0; i < cards.length; ++i) {
				var c = cards[i];
				if (c.mCardAttack == "3") {
					var arr = new Array();
					arr.push(i); validPlays.push(arr);
				}
			}
		}
		else {
			var stored = new Array();
			var sMatched = false;
			
			for (var i = 0; i < cards.length; ++i) {
				var c = cards[i];
				
				if (stored.length == 0) {
					if ((c.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
							(c.mCardValue < currScene.mCurrAV && currScene.mReversed == true) || 
							c.mCardAttack == "1") {
						
						stored.push(i);
					}
				}
				else {
					if (c.mCardValue == cards[stored[0]].mCardValue &&
							c.mCardAttack == cards[stored[0]].mCardAttack) {
						
						stored.push(i);
					}
					else {
						if (cards[cards.length - 1].mCardAttack == "S" && sMatched == false) {
							stored.push(cards.length - 1);
							sMatched = true;
							--i;
						}
						else {
							stored.splice(0, stored.length);
							sMatched = false;
							--i;
						}
					}
				}
				
				if (stored.length > 0) {
					if (cards[stored[0]].mCardAttack == "1") {
						if ((stored.length > currScene.mCurrAV && currScene.mReversed == false) ||
								(stored.length < currScene.mCurrAV && currScene.mReversed == true)) {
							
							if (stored.length > 1 || (stored.length == 1 && currScene.mCurrSS <= 1)) {
								var arr = new Array();
								arr = arr.concat(stored); validPlays.push(arr);
							}
						}
					}
					else if (stored.length == currScene.mCurrSS || currScene.mCurrSS == 0) {
						var arr = new Array();
						arr = arr.concat(stored); validPlays.push(arr);
					}
				}
			}
		}
	}
	
	return validPlays;
}
// ...End

