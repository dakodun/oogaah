// OogaahTutorialContent34 Class...
// tutorial content for "orc warrior" card
function OogaahTutorialContent34() {
	OogaahTutorialContent.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahTutorialContent34.prototype = Object.create(OogaahTutorialContent.prototype);

// adds cards to the player's hands
OogaahTutorialContent34.prototype.SetCards = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mCurrPlayer = 3; // set the initial player to the third ai
	
	{ // player 0 (human)
		// 1 orc warrior
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[3]);
		
		// 1 human cleric
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[6]);
	}
	
	{ // player 1 (ai)
		// 1 goblin horde - not played
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
	}
	
	{ // player 2 (ai)
		// 1 goblin horde - not played
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
	}
	
	{ // player 3 (ai)
		// 1 goblin horde - not played
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[0]);
		
		// 1 orc warrior
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[3]);
	}
}

// adds messages to the tutorial message queue
OogaahTutorialContent34.prototype.SetMessages = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mShowMessage = 4; // the initial show message count
	this.AddMessage("default", "Welcome to the 'Orc Warrior' tutorial!", new Array());
	this.AddMessage("card", "In this tutorial we will learn how the Orc Warrior card works.", new Array(0, 1));
	this.AddMessage("default", "The Orc Warrior's ability affects the next card (or squad of cards) played in the current skirmish.", new Array());
	this.AddMessage("default", "If it is of the type Human then it will be discarded (sent straight to the graveyard) and play will revert back to the player who played the Orc Warrior.", new Array());
	
	this.AddMessage("zone", "The AI played an Orc Warrior.", new Array("battlefield"));
	this.AddMessage("status", "Notice that a small icon (a piece of meat) has appeared under the current game status? This indicates that the Orc warrior's ability is in play.", new Array(2, 1));
	this.AddMessage("card", "To see its effect, try and play our Human Cleric.", new Array(1, 1));
	
	this.AddMessage("zone", "Our Human Cleric went straight to the graveyard...", new Array("graveyard"));
	this.AddMessage("ai", "...and play was reverted back to the AI that played the Orc Warrior.", new Array(3, 0));
	this.AddMessage("status", "The Orc Warrior's ability is now no longer in effect.", new Array(2, 1));
	this.AddMessage("default", "This can be used to block opponents from playing a combo involving Human typed cards (though the cards will still be discarded).", new Array());
	this.AddMessage("default", "And that's that! Continue to return to the main menu.", new Array());
	
	{ // set up the timeout for all the messages
		var queue = currScene.mMessageQueue.mQueue; // reference to the actual message queue
		for (var i = 0; i < queue.length; ++i) { // for all messages in the queue
			queue[i].SetTimeout(0.4); // set the timeout to 0.4 seconds
		}
	}
}

// adds the desired play card arrays to the players
OogaahTutorialContent34.prototype.SetDesired = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.AddDesired(3, new Array(currScene.mCardList[3]), 3); // 1x warrior
	currScene.AddDesired(0, new Array(currScene.mCardList[6]), 5); // 1x cleric
}
// ...End

