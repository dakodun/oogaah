// OogaahTutorialContent4 Class...
// tutorial content for "example round" tutorial
function OogaahTutorialContent4() {
	OogaahTutorialContent.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahTutorialContent4.prototype = Object.create(OogaahTutorialContent.prototype);

// adds cards to the player's hands
OogaahTutorialContent4.prototype.SetCards = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mCurrPlayer = 0; // set the initial player to the human
	
	{ // player 0 (human)
		// 1 goblin horde
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[0]);
		
		// 2 goblin overseer
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[1]);
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[1]);
		
		// 1 human peasant
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[2]);
		
		// 1 orc berserker
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[9]);
		
		// 1 being of light
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[12]);
	}
	
	{ // player 1 (ai)
		// 3 goblin horde - not played
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		
		// 2 goblin horde
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		
		// 1 goblin overseer
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[1]);
	}
	
	{ // player 2 (ai)
		// 5 goblin horde - not played
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		
		// 2 goblin horde
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		
		// 1 human mage
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[7]);
		
		// 1 human knight
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[8]);
		
		// 1 human paladin
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[11]);
	}
	
	{ // player 3 (ai)
		// 2 goblin horde - not played
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[0]);
		
		// 2 orc berserker
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[9]);
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[9]);
		
		// 1 orc warchief
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[10]);
	}
}

// adds messages to the tutorial message queue
OogaahTutorialContent4.prototype.SetMessages = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mShowMessage = 4; // the initial show message count
	this.AddMessage("default", "Welcome to the 'Example Round' tutorial!", new Array());
	this.AddMessage("default", "In this tutorial we will play a short round of Oogaah.", new Array());
	this.AddMessage("default", "It is currently our turn and no cards have been played yet, so we can play whichever cards we like.", new Array());
	this.AddMessage("card", "Start by playing both of our Goblin Overseers.", new Array(1, 2));
	
	this.AddMessage("default", "Our Goblin Overseer's ability activated which allows us to play any Goblin Hordes in our hand.", new Array());
	this.AddMessage("card", "Now would be a great time to get rid of our single Goblin Horde, so play it now.", new Array(0, 1));
	
	this.AddMessage("status", "When using this ability, the Current Attack Value and Required Squad Size both become 1, regardless of the number of Goblin Hordes played.", new Array(0, 2));
	
	this.AddMessage("zone", "The first AI made a play similar to ours (Goblin Overseer, then Goblin Hordes via its ability).", new Array("battlefield"));
	
	this.AddMessage("zone", "The second AI played 2 Goblin Hordes using their ability.", new Array("battlefield"));
	this.AddMessage("status", "This ignores the Required Squad Size (setting both it and the Current Attack Value to the number of Goblin Hordes played).", new Array(0, 2));
	
	this.AddMessage("zone", "The third AI just played 2 Orc Berserkers.", new Array("battlefield"));
	this.AddMessage("card", "Notice that our Orc Berserker actually lost some attack value!", new Array(1, 1));
	this.AddMessage("default", "This persists throughout the current battle, so it's usually wise to dispose of them early on.", new Array());
	this.AddMessage("ui", "We can't currently make a move, so pass our turn.", new Array("pass"));
	this.AddMessage("ai", "No one could make a move (or chose not to) and it passed back the the last player who played. As a result the current game status has reset and it is now the third AI's turn again.", new Array(3, 0));
	
	this.AddMessage("zone", "The third AI played an Orc Warchief.", new Array("battlefield"));
	this.AddMessage("card", "Whilst we could play our Being of Energy, sometimes it is wiser to save cards to play in combos later.", new Array(2, 1));
	this.AddMessage("ui", "So for now, just pass our turn.", new Array("pass"));
	
	this.AddMessage("ui", "Once again we'd like to save our cards, so pass.", new Array("pass"));
	
	this.AddMessage("zone", "The second AI just played a Human Knight which activated its ability.", new Array("battlefield"));
	this.AddMessage("status", "This means that the only card that can be played next in the current skirmish is a Human Peasant.", new Array(2, 1));
	
	this.AddMessage("card", "It's our turn and the Human Knight's ability is still in effect, so play our Human Peasant.", new Array(0, 1));
	
	this.AddMessage("zone", "It is once again our turn and the current card is a Human Mage.", new Array("battlefield"));
	this.AddMessage("default", "We can now go on to win the battle from here by playing our Being of Energy. It has the highest attack value and nothing can beat it when it is played by itself.", new Array());
	this.AddMessage("card", "So go ahead and play our Being of Energy.", new Array(1, 1));
	
	this.AddMessage("zone", "The board has been cleared, we have only 1 card left and it is our turn.", new Array("battlefield"));
	this.AddMessage("card", "Play our last card - the Orc Berserker - and win the battle!", new Array(0, 1));
	
	this.AddMessage("default", "Congratulations, a masterful victory! Continue to return to the main menu.", new Array());
	
	{ // set up the timeout for all the messages
		var queue = currScene.mMessageQueue.mQueue; // reference to the actual message queue
		for (var i = 0; i < queue.length; ++i) { // for all messages in the queue
			queue[i].SetTimeout(0.4); // set the timeout to 0.4 seconds
		}
	}
}

// adds the desired play card arrays to the players
OogaahTutorialContent4.prototype.SetDesired = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.AddDesired(0, new Array(currScene.mCardList[1], currScene.mCardList[1]), 2); //
	currScene.AddDesired(0, new Array(currScene.mCardList[0]), 1); //
	currScene.AddDesired(1, new Array(currScene.mCardList[1]), 0); //
	currScene.AddDesired(1, new Array(currScene.mCardList[0], currScene.mCardList[0]), 1); //
	currScene.AddDesired(2, new Array(currScene.mCardList[0], currScene.mCardList[0]), 2); //
	currScene.AddDesired(3, new Array(currScene.mCardList[9], currScene.mCardList[9]), 4); //
	currScene.AddDesired(0, new Array(), 0); //
	currScene.AddDesired(1, new Array(), 0); //
	currScene.AddDesired(2, new Array(), 1); //
	
	currScene.AddDesired(3, new Array(currScene.mCardList[10]), 3); //
	currScene.AddDesired(0, new Array(), 0); //
	currScene.AddDesired(1, new Array(), 0); //
	currScene.AddDesired(2, new Array(currScene.mCardList[11]), 0); //
	currScene.AddDesired(3, new Array(), 1); //
	currScene.AddDesired(0, new Array(), 0); //
	currScene.AddDesired(1, new Array(), 0); //
	
	currScene.AddDesired(2, new Array(currScene.mCardList[8]), 2); //
	currScene.AddDesired(3, new Array(), 1); //
	currScene.AddDesired(0, new Array(currScene.mCardList[2]), 0); //
	currScene.AddDesired(1, new Array(), 0); //
	currScene.AddDesired(2, new Array(currScene.mCardList[7]), 0); //
	currScene.AddDesired(3, new Array(), 3); //
	currScene.AddDesired(0, new Array(currScene.mCardList[12]), 0); //
	currScene.AddDesired(1, new Array(), 0); //
	currScene.AddDesired(2, new Array(), 0); //
	currScene.AddDesired(3, new Array(), 2); //
	
	{
		var card = currScene.mCardList[9].GetCopy();
		card.ModifyValue(-2);
		
		currScene.AddDesired(0, new Array(card),1); //
	}
}
// ...End

