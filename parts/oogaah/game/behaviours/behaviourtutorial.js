// OogaahBehaviourTutorial Class...
//
function OogaahBehaviourTutorial() {
	OogaahBehaviourBase.apply(this, null); // construct the base class
	
	this.mDesired = new Array(); // an array of arrays of cards, making up the desired plays for the tutorial
};

// inherit the base class's prototype
OogaahBehaviourTutorial.prototype = Object.create(OogaahBehaviourBase.prototype);

// 
OogaahBehaviourTutorial.prototype.DecideMode0 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	
	// var arr = new Array();
	var plays = this.mAI.GetValidPlays();
	
	if (plays.length > 0) {
		if (this.mDesired.length > 0) {
			if (this.mDesired[0].mCards.length > 0) {
				for (var i = 0; i < plays.length; ++i) {
					if (plays[i].length == this.mDesired[0].mCards.length) {
						for (var j = 0; j < plays[i].length; ++j) {
							if (cards[plays[i][j]].mCardAttack != this.mDesired[0].mCards[j].mCardAttack ||
									cards[plays[i][j]].mCardValue != this.mDesired[0].mCards[j].mCardValue) {
								
								break;
							}
							
							if (j == plays[i].length - 1) { // if we reach here then all match
								currScene.mShowMessage += this.mDesired[0].mShowMessageInc;
								this.mDesired.splice(0, 1);
								
								var arr = new Array(plays[i]);
								return arr;
							}
						}
					}
				}
			}
		}
	}
	
	if (this.mDesired.length > 0) {
		currScene.mShowMessage += this.mDesired[0].mShowMessageInc;
		this.mDesired.splice(0, 1);
	}
	
	return null;
}

// 
OogaahBehaviourTutorial.prototype.DecideMode2 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	
	{
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
		
		if (this.mDesired.length > 0) {
			var valid = true;
			for (var i = 0; i < this.mDesired[0].mCards.length; ++i) {
				if (this.mDesired[0].mCards[i].mCardAttack != "1") {
					valid = false;
					break;
				}
			}
			
			if (valid == true) {
				if (hordes.length >= this.mDesired[0].mCards.length) {
					var howMany = hordes.length - this.mDesired[0].mCards.length;
					if (howMany > 0) {
						hordes.splice(this.mDesired[0].mCards.length, howMany);
					}
					
					currScene.mShowMessage += this.mDesired[0].mShowMessageInc;
					this.mDesired.splice(0, 1);
					return hordes;
				}
			}
		}
	}
	
	currScene.mShowMessage += this.mDesired[0].mShowMessageInc;
	this.mDesired.splice(0, 1);
	return null;
}

// 
OogaahBehaviourTutorial.prototype.DecideMode5 = function() {
	return null;
}

// 
OogaahBehaviourTutorial.prototype.DecideMode6 = function() {
	return null;
}

// 
OogaahBehaviourTutorial.prototype.DecideMode8 = function() {
	return -1;
}

// 
OogaahBehaviourTutorial.prototype.DecideMode12 = function() {
	return null; // return null
}

// adds a set of cards which act as a desired play to the player
OogaahBehaviourTutorial.prototype.AddDesired = function(cards, msgInc) {
	var desired = new OogaahTutorialDesired();
	
	desired.mCards = util.ConcatArray(desired.mCards, cards); // add the cards
	desired.mShowMessageInc = msgInc; // add the increment to the message iterator after successful play
	
	this.mDesired.push(desired);
}
// ...End

