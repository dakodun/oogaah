// OogaahBehaviourSimple Class...
//
function OogaahBehaviourSimple() {
	OogaahBehaviourBase.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahBehaviourSimple.prototype = Object.create(OogaahBehaviourBase.prototype);

// 
OogaahBehaviourSimple.prototype.DecideMode0 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	
	/*
	 * decide which cards to play by:
	 * lowest possible value
	 * as many as possible
	 */
	
	// var arr = new Array();
	var plays = this.mAI.GetValidPlays();
	
	if (plays.length > 0) {
		var choice = new Array();
		
		var lowestValue = cards[plays[0][0]].mCardValue;
		if (currScene.mReverse == true) {
			lowestValue = cards[plays[plays.length - 1][0]].mCardValue;
		}
		
		var maxLength = 0;
		for (var i = 0; i < plays.length; ++i) {
			if (cards[plays[i][0]].mCardValue == lowestValue && plays[i].length > maxLength) {
				var arr = new Array();
				for (var j = 0; j < plays[i].length; ++j) {
					arr.push(plays[i][j]);
				}
				
				choice.splice(0, choice.length);
				choice.push(arr);
				maxLength = plays[i].length;
			}
		}
		
		return choice;
	}
	
	return null;
}

// 
OogaahBehaviourSimple.prototype.DecideMode2 = function() {
	var cards = this.mAI.mHand.mCards;
	
	{
		/*
		 * play goblin hordes if:
		 * we only have 1 or 2
		 * OR
		 * we only have goblin hordes left
		 */
		
		var hordes = new Array(); // the ids of all goblin hordes in the hand
		for (var i = 0; i < cards.length; ++i) { // for all cards in the hand
			var c = cards[i]; // reference to card
			
			if (c.mCardAttack == "1") { // if the card is a goblin horde
				hordes.push(i); // add the id
			}
			else if (noogaah.AVToIndex(c.mCardAttack) > 0) { // otherwise if we are past goblin hordes
				break; // stop searching
			}
		}
		
		if (hordes.length > 0) { // if we have any goblin hordes
			if (hordes.length == cards.length || hordes.length < 3) {
				return hordes;
			}
		}
	}
	
	return null;
}

// 
OogaahBehaviourSimple.prototype.DecideMode5 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	
	// if we are in submode a then we are only looking to decided if we should swap at all
	if (this.mAI.mSubMode == "a") {
		/*
		 * decided to swap if:
		 * we have at least 1 card type for which we only have 1 card
		 * and it is a 6 or lower
		 * and we have more than 6 cards in our hand
		 */
		
		var swap = false; // should we swap or not
		
		if (cards.length > 6) { // if we have more than 6 cards in our hand
			var v = this.mAI.mHand.GetCardsByAVSingles();
			for (var i = 0; i < 6; ++i) {
				if (v[i].length == 1) {
					swap = true; // we want to swap
					break;
				}
			}
		}
		
		return swap;
	}
	else if (this.mAI.mSubMode == "b") { // otherwise we are in submode b deciding which player to choose if any
		/* 
		 * continue the swap if:
		 * the graveyard has cards that match one of ours or an A or an S
		 * and the percent of eligible cards is is 40 or greater
		 * OR
		 * there is a player with less than 6 cards still in the game
		 */
		
		var targets = new Array(); // all eligible swap target id's (graveyard -1)
		var graveyard = currScene.mGraveyard.mCards; // reference to the graveyard
		
		if (graveyard.length > 0) { // if the graveyard isn't empty
			var count = 0; // the count of eligible cards
			
			for (var i = 0; i < graveyard.length; ++i) { // for all cards in the graveyard
				// if the graveyard card is and S or an A
				if (graveyard[i].mCardAttack == "S" || graveyard[i].mCardAttack == "A") {
					++count; // increment the eligible count
				}
				else { // otherwise
					for (var j = 0; j < cards.length; ++j) { // for all cards in the hand
						var card = cards[j]; // reference to current card
						if (graveyard[i].mCardValue == card.mCardValue) { // if the card values match
							++count; // increment the eligible count
						}
					}
				}
			}
			
			if ((count / graveyard.length * 100) >= 40) { // if the eligible percentage is greater than 40
				targets.push(-1); // add the graveyard
			}
		}
		
		if (targets.length == 0) { // if we didn't add the graveyard (graveyard hs priority)
			for (var i = 0; i < currScene.mPlayers.length; ++i) { // for all players
				var player = currScene.mPlayers[i]; // reference to player
				
				// if the player has at least 1 card and less than 7, and isn't this player
				if ((player.mHand.mCards.length > 0 && player.mHand.mCards.length < 7) && player.mPlayerID != this.mAI.mPlayerID) {
					targets.push(i); // add player's id
				}
			}
		}
		
		if (targets.length > 0) { // if we have at least 1 swap target
			var rand = currScene.mRand.GetRandInt(0, targets.length - 1); // get a random swap id
			return targets[rand]; // return swap id
		}
	}
	else if (this.mAI.mSubMode == "c") { // otherwise in submode c we decide if we want to perform a swap
		/*
		 * only perform the swap if:
		 * the card we're recieving matches 1 we already have
		 * OR
		 * is an A or an S
		 */
		
		var swapCards = new Array();
		var cardValid = false;
		
		{
			var chosen = this.mAI.mChosenPlayer.mCards[this.mAI.mChosenCard];
			var ind = noogaah.AVToIndex(chosen.mCardAttack);
			
			var singles = this.mAI.mHand.GetCardsByAVSingles();
			for (var i = 0; i < 6; ++i) {
				if (singles[i].length > 0 && i != ind) {
					swapCards.push(singles[i][0]);
					cardValid = true;
				}
			}
			
			if (chosen.mCardAttack == "A" || chosen.mCardAttack == "S") {
				cardValid = true;
			}
		}
		
		if (cardValid == true && swapCards.length > 0) {
			var rand = currScene.mRand.GetRandInt(0, swapCards.length - 1); // get a random
			return swapCards[rand]; // return
		}
	}
	
	return null;
}

// 
OogaahBehaviourSimple.prototype.DecideMode6 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	
	/*
	 * reverse attack values if:
	 * 4, 3, 2 or 1 (at least 2) that can match squadsize
	 * in the case of 1, if only 1 then squadsize must match
	 * in the case of 3, value must be 4 or less
	 */
	
	var count = new Array();
	for (var i = 0; i < 4; ++i) {
		count.push(0);
	}
	
	for (var i = 0; i < cards.length; ++i) {
		var index = noogaah.AVToIndex(cards[i].mCardAttack);
		if (index < 4 && cards[i].mCardValue < 5) {
			++count[index];
		}
		else {
			break;
		}
	}
	
	var valid = 0;
	for (var i = 0; i < count.length; ++i) {
		// if count at least matches the current squadsize
		// or index is 0 (goblin horde) and count is greater than 1 (ability activates)
		if (count[i] >= currScene.mCurrSS || (i == 0 && count[i] > 1)) {
			++valid; // add a valid count
		}
	}
	
	if (valid > 1) {
		return true;
	}
	
	return null;
}

// 
OogaahBehaviourSimple.prototype.DecideMode8 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	
	/*
	 * play a card alongside human mage if:
	 * we have a card type for which we have only 1 (not an S)
	 * play lowest of those
	 */
	
	var singles = -1;
	
	{ // 
		var v = this.mAI.mHand.GetCardsByAVSingles();
		for (var i = 0; i < v.length - 1; ++i) {
			if (v[i].length == 1) {
				singles = v[i][0];
			}
		}
	}
	
	return singles;
}

// 
OogaahBehaviourSimple.prototype.DecideMode12 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	var graveyard = currScene.mGraveyard.mCards;
	
	/*
	 * take cards from the graveyard if:
	 * there is an S in the graveyard (priority)
	 * we have a single horde (take other hordes if any, otherwise look for a mage or overseer)
	 * we have a lower card (6 and lower) in single only and there are others in the graveyard
	 */
	
	var choice = new Array();
	var graveyardIDs = new Array(); // valid card ids in the graveyard
	
	for (var i = 0; i < currScene.mCardList.length; ++i) { // for all available card types
		graveyardIDs.push(new Array()); // add a blank array
	}
	
	for (var i = 0; i < graveyard.length; ++i) { // for all cards in the graveyard
		var index = noogaah.AVToIndex(graveyard[i].mCardAttack); // get the card type index
		if (index == 12 || index == 7 || index < 6) { // if the index is S, 8, or 6 or less
			graveyardIDs[index].push(i); // add the id as a valid choice
		}
	}
	
	var singles = this.mAI.mHand.GetCardsByAVSingles();
	
	if (graveyardIDs[12].length > 0) { // if there was an S in there
		choice.push(graveyardIDs[12][0]); // add the card id to the choice array
	}
	else {
		var done = false;
		if (singles[0].length > 0) { // if we have a single goblin horde
			if (graveyardIDs[0].length > 0) { // if there are hordes in the graveyard
				for (var i = 0; i < graveyardIDs[0].length; ++i) {
					choice.push(graveyardIDs[0][i]);
				}
				
				done = true
			}
			else if (graveyardIDs[7].length > 0) { // otherwise if there are mages in the graveyard
				for (var i = 0; i < graveyardIDs[7].length; ++i) {
					choice.push(graveyardIDs[7][i]);
				}
				
				done = true
			}
			else if (graveyardIDs[1].length > 0) { // otherwise if there are overseers in the graveyard
				for (var i = 0; i < graveyardIDs[1].length; ++i) {
					choice.push(graveyardIDs[1][i]);
				}
				
				done = true
			}
		}
		
		if (done == false) {
			var matchingSingles = new Array();
			
			for (var i = 0; i < graveyardIDs.length; ++i) { // for all card ids
				if (graveyardIDs[i].length > 0) { // if the card type exists in the graveyard
					if (singles[i].length > 0) { // and it matches a single in the hand
						var arr = new Array();
						
						for (var j = 0; j < graveyardIDs[i].length; ++j) {
							arr.push(graveyardIDs[i][j]);
						}
						
						matchingSingles.push(arr);
					}
				}
			}
			
			if (matchingSingles.length > 0) {
				var rand = currScene.mRand.GetRandInt(0, matchingSingles.length - 1);
				
				for (var i = 0; i < matchingSingles[rand].length; ++i) {
					choice.push(matchingSingles[rand][i]);
				}
			}
		}
	}
	
	if (choice.length > 0) { // if we have a choice
		return choice; // return it
	}
	
	return null; // return null
}
// ...End

