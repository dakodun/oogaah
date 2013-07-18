// OogaahPlayer class
// 
function OogaahPlayer() {
	this.mHand = new OogaahHand(); // the hand belonging to this player
	this.mPlayerID = -1; // the id of this player (0)
	
	this.mType = "";
	this.mName = "";
	
	this.mSelectedCards = new Array(); // -1: locked; 0: invalid; 1: selectable; 2: selected; 3: single-selectable; 4: single-selected
	
	this.mMode = 0; // the current mode the game is in (used to handle card abilities)
	this.mSubMode = "a"; // the submode, used to further define stages of a certain mode
	
	this.mChosenPlayer = null; // reference to the current player's hand that has been chosen (goblin technician ability)
	this.mChosenID = -1; // the id of the chosen player
	this.mChosenCard = -1; // the current selected card id of the chosen player
	
	this.mFinished = false;
};

// 
OogaahPlayer.prototype.SetUp = function(id) {
	this.mPlayerID = id; // set the player's id
}

//
OogaahPlayer.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	arr = util.ConcatArray(arr, this.mHand.GetRenderData()); // add the player's hand to the array
	
	return arr; // return the renderables array
}

// 
OogaahPlayer.prototype.PositionHand = function() {

}

// reset the state of selected cards in the hand
OogaahPlayer.prototype.ResetSelected = function() {
	this.mSelectedCards.splice(0, this.mSelectedCards.length); // clear the current selected array
	for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
		this.mSelectedCards.push(1); // add a 1 (selectable) to the selected array
	}
}

// returns an array containing the currently selected cards in the hand
OogaahPlayer.prototype.GetSelected = function() {
	arr = new Array(); // an array of selected cards
	
	for (var i = 0; i < this.mSelectedCards.length; ++i) { // for all card's selection status
		if (this.mSelectedCards[i] == 2 || this.mSelectedCards[i] == 4) { // if the current card is selected or single-selected
			arr.push(this.mHand.GetCard(i)); // add a copy to the array
		}
	}
	
	if (arr.length > 1) { // at least 2 cards in array
		arr.sort(noogaah.CardSort); // sort the cards by value (ensure "S" is last card if it exists)
	}
	
	return arr; // return the array of selected cards
}

// removes the currently selected cards from the hand
OogaahPlayer.prototype.RemoveSelected = function() {
	for (var i = this.mSelectedCards.length - 1; i >= 0; --i) { // for all card's selection status
		if (this.mSelectedCards[i] == 2 || this.mSelectedCards[i] == 4) { // if the card is selected (2) or single-selected (4)
			this.mHand.RemoveCard(i); // remove the card from the hand
		}
	}
	
	this.PositionHand(); // reposition the hand
	this.ResetSelected(); // reset the selection state of the cards
}
// ...End

