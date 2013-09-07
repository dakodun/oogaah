// OogaahTutorialContent33 Class...
// tutorial content for "human peasant" card
function OogaahTutorialContent33() {
	OogaahTutorialContent.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahTutorialContent33.prototype = Object.create(OogaahTutorialContent.prototype);

// adds cards to the player's hands
OogaahTutorialContent33.prototype.SetCards = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mCurrPlayer = 3; // set the initial player to the third ai
	
	{ // player 0 (human)
		// 1 human peasant
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[2]);
	}
	
	{ // player 1 (ai)
		// 1 goblin horde - not played
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		
		// 1 human cleric
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[6]);
	}
	
	{ // player 2 (ai)
		// 1 goblin horde - not played
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
	}
	
	{ // player 3 (ai)
		// 1 goblin horde - not played
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[0]);
		
		// 1 human knight
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[8]);
	}
}

// adds messages to the tutorial message queue
OogaahTutorialContent33.prototype.SetMessages = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mShowMessage = 5; // the initial show message count
	this.AddMessage("default", "Welcome to the 'Human Peasant' tutorial!", new Array());
	this.AddMessage("card", "In this tutorial we will learn how the Human Peasant card works.", new Array(0, 1));
	this.AddMessage("default", "The Human Peasant's ability is reactive and relies on another card: the Human Knight.", new Array());
	this.AddMessage("default", "For every Human Knight in the graveyard every Human Peasant gains 1 attack value (with a maximum gain of 5).", new Array());
	this.AddMessage("default", "If the Human Peasant is currently on the battlefield when a Human Knight enters or leaves the graveyard, its value won't change until it leaves the battlefield.", new Array());
	
	this.AddMessage("zone", "The AI played a Human Knight.", new Array("battlefield"));
	this.AddMessage("ui", "Pass our turn so that the Human Knight enters the graveyard.", new Array("pass"));
	
	this.AddMessage("card", "Notice how our Human Peasant's attack value in the lower right has changed (it was 3 and is now 4)?", new Array(0, 1));
	
	this.AddMessage("ui", "Once again pass our turn so that the AI can play.", new Array("pass"));
	
	this.AddMessage("zone", "The AI played another card which removed a card from the graveyard – the Human Knight.", new Array("battlefield"));
	this.AddMessage("card", "Our Human Peasant's attack value has now returned to its original value (3).", new Array(0, 1));
	this.AddMessage("default", "That means if we save our Human Peasants for use later they can be a lot more potent, but be wary of Human Knights being removed from the graveyard!", new Array());
	this.AddMessage("default", "And that's that! Continue to return to the main menu.", new Array());
	
	{ // set up the timeout for all the messages
		var queue = currScene.mMessageQueue.mQueue; // reference to the actual message queue
		for (var i = 0; i < queue.length; ++i) { // for all messages in the queue
			queue[i].SetTimeout(0.4); // set the timeout to 0.4 seconds
		}
	}
}

// adds the desired play card arrays to the players
OogaahTutorialContent33.prototype.SetDesired = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.AddDesired(3, new Array(currScene.mCardList[8]), 2); // 1x human knight
	currScene.AddDesired(0, new Array(), 0); // pass
	currScene.AddDesired(1, new Array(), 0); // pass
	currScene.AddDesired(2, new Array(), 1); // pass
	currScene.AddDesired(3, new Array(), 1); // pass
	currScene.AddDesired(0, new Array(), 0); // pass
	currScene.AddDesired(1, new Array(currScene.mCardList[6]), 4); // 1x human cleric
}
// ...End

