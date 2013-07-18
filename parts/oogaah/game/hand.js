// OogaahHand Class...
// a playable hand consisting of a number of cards
function OogaahHand() {
	this.mCards = new Array(); // the cards that make up this hand
};

// makes a deep copy of the (other) hand
OogaahHand.prototype.Copy = function(other) {
	this.mCards.splice(0, this.mCards.length); // remove all cards from this hand
	for (var i = 0; i < other.mCards.length; ++i) { // for all cards in the other hand
		this.mCards.push(other.mCards[i].GetCopy()); // add a copy to this hand
	}
}

// returns all renderable data relating to this class
OogaahHand.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	for (var i = 0; i < this.mCards.length; ++i) { // for all cards in the hand
		arr = util.ConcatArray(arr, this.mCards[i].GetRenderData()); // add the card to the array
	}
	
	return arr; // return the renderables array
}

// adds a card to the hand, sorts it by attack value and then positions it (card to add [OogaahCardBase])
OogaahHand.prototype.AddCard = function(card) {	
	var c = card.GetCopy(); // get a copy of the card
	this.mCards.push(c); // add the copy to the hand
	
	this.mCards.sort(noogaah.CardSort); // sort the hand by value
}

// removes a card from the hand (id of the card [integer])
OogaahHand.prototype.RemoveCard = function(id) {
	if (id >= 0 && id < this.mCards.length) { // if the id is valid
		this.mCards.splice(id, 1); // remove the card from the array
	}
}

// returns a card from the hand (id of the card [integer])
OogaahHand.prototype.GetCard = function(id) {
	if (id >= 0 && id < this.mCards.length) { // if the id is valid
		var c = this.mCards[id].GetCopy(); // get a copy of the card
		return c; // return the copy
	}
	
	return null; // return null (invalid id)
}

// returns card ids seperated by attack value
OogaahHand.prototype.GetCardsByAV = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	var arr = new Array();
	for (var i = 0; i < currScene.mCardList.length; ++i) {
		arr.push(new Array());
	}
	
	for (var i = 0; i < this.mCards.length; ++i) {
		var ind = noogaah.AVToIndex(this.mCards[i].mCardAttack);
		arr[ind].push(i);
	}
	
	return arr;
}

// returns card ids seperated by attack value for which we have only 1
OogaahHand.prototype.GetCardsByAVSingles = function() {
	var cards = this.GetCardsByAV();
	
	for (var i = 0; i < cards.length; ++i) {
		if (cards[i].length > 1) {
			cards[i].splice(0, cards[i].length);
		}
	}
	
	return cards;
}
// ...End

