// OogaahTutorialContent32 Class...
// tutorial content for "goblin overseer" card
function OogaahTutorialContent32() {
	OogaahTutorialContent.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahTutorialContent32.prototype = Object.create(OogaahTutorialContent.prototype);

// adds cards to the player's hands
OogaahTutorialContent32.prototype.SetCards = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mCurrPlayer = 0; // set the initial player to the human
	
	{ // player 0 (human)
		// 2 goblin horde
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[0]);
		
		// 1 goblin overseer
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[1]);
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
	}
}

// adds messages to the tutorial message queue
OogaahTutorialContent32.prototype.SetMessages = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mShowMessage = 6; // the initial show message count
	this.AddMessage("default", "Welcome to the 'Goblin Overseer' tutorial!", new Array());
	this.AddMessage("card", "In this tutorial we will learn how the Goblin Overseer card works.", new Array(2, 1));
	this.AddMessage("default", "The Goblin Overseer's ability allows us to also play any Goblin Hordes in our hand if we wish.", new Array());
	this.AddMessage("default", "As a result, it will only activate if we have any Goblin Hordes.", new Array());
	this.AddMessage("default", "If we choose to play any Goblin Hordes then both the Current Attack Value and Required Squad Size become 1, regardless of the number played.", new Array());
	this.AddMessage("card", "To start, play our Goblin Overseer.", new Array(2, 1));
	
	this.AddMessage("card", "Now play 2x Goblin Horde using the Goblin Overseer's ability.", new Array(0, 2));
	
	this.AddMessage("status", "Notice how both the Current Attack Value and Required Squad Size are now 1?", new Array(0, 2));
	this.AddMessage("default", "We could use this to set ourselves up for playing a higher valued single card, or to prevent opponents from playing big combos.", new Array());
	this.AddMessage("default", "It's also really useful for ditching those single Goblin Hordes!", new Array());
	this.AddMessage("default", "And that's that! Continue to return to the main menu.", new Array());
	
	{ // set up the timeout for all the messages
		var queue = currScene.mMessageQueue.mQueue; // reference to the actual message queue
		for (var i = 0; i < queue.length; ++i) { // for all messages in the queue
			queue[i].SetTimeout(0.4); // set the timeout to 0.4 seconds
		}
	}
}

// adds the desired play card arrays to the players
OogaahTutorialContent32.prototype.SetDesired = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.AddDesired(0, new Array(currScene.mCardList[1]), 1); // 1x overseer
	currScene.AddDesired(0, new Array(currScene.mCardList[0], currScene.mCardList[0]), 4); // 2x hordes using ability
}
// ...End

