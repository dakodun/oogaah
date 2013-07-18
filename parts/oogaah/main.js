// oogaah Namespace...
var noogaah = new function() {
	this.options = new OogaahOptions();
	
	this.mAttackValues = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "B", "A", "S");
	
	this.AVToIndex = function(attackValue) {
		return this.mAttackValues.indexOf(attackValue);
	}
	
	this.IndexToAV = function(index) {
		return this.mAttackValues[index];
	}
	
	// sorts cards based on attack value, lowest to highest
	this.CardSort = function(first, second) {
		var result = first.mCardValue - second.mCardValue; // find the difference between the card values (-1 < 0 < 1)
		if (result == 0) { // if result is 0 then values are the same
			if (first.mCardAttack != second.mCardAttack) { // if cards don't match
				
				// since human peasant (3) can only go higher than base and orc berserker (C) can only go lower,
				// if either of these cards are first then always position them either to the left or right
				// respectively; this ensures that they are always grouped and ordered logically
				// reverse values if the second card is one of these
				
				if (first.mCardAttack == "3") {
					result = -1;
				}
				else if (first.mCardAttack == "C") {
					result = 1;
				}
				else if (second.mCardAttack == "3") {
					result = 1;
				}
				else if (second.mCardAttack == "C") {
					result = -1;
				}
			}
		}
		
		return result;
	}
};
// ...End
