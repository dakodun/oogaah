// OogaahPile class
// a pile of cards
function OogaahPile() {
	this.mCards = new Array(); // array containing the cards in this pile
};

// clears all cards from the pile
OogaahPile.prototype.Clear = function() {
	this.mCards.splice(0, this.mCards.length); // clear the cards array
}

// adds a card to the pile
OogaahPile.prototype.AddCard = function(card) {
	var c = card.GetCopy(); // get a copy of the card
	this.mCards.push(c); // add it to the cards array
}

// removes a card from the pile
OogaahPile.prototype.RemoveCard = function(id) {
	if (id >= 0 && id < this.mCards.length) { // if card id is valid
		this.mCards.splice(id, 1); // remove the card from the array
	}
}

// returns a copy of a card in the pile
OogaahPile.prototype.GetCard = function(id) {
	if (id >= 0 && id < this.mCards.length) { // if the card id is valid
		var c = this.mCards[id].GetCopy(); // create a copy of the card
		return c; // return the copy
	}
	
	return null; // otherwise return null (invalid id)
}

// adds an array of cards to the pile
OogaahPile.prototype.AddCards = function(cards) {
	for (var i = 0; i < cards.length; ++i) { // for all cards in the array
		this.AddCard(cards[i]); // add each to the pile
	}
}

// returns the card at the top of the pile
OogaahPile.prototype.GetTopCard = function() {
	return this.GetCard(this.mCards.length - 1); // try and return last card in the array
}
// ...End

