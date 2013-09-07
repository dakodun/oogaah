// OogaahTutorialContent31 Class...
// tutorial content for "goblin horde" card
function OogaahTutorialContent31() {
	OogaahTutorialContent.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahTutorialContent31.prototype = Object.create(OogaahTutorialContent.prototype);

// adds cards to the player's hands
OogaahTutorialContent31.prototype.SetCards = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mCurrPlayer = 3; // set the initial player to the third ai
	
	{ // player 0 (human)
		// 3 goblin horde
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[0]);
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[0]);
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
		
		// 2 goblin overseer
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[1]);
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[1]);
	}
}

// adds messages to the tutorial message queue
OogaahTutorialContent31.prototype.SetMessages = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mShowMessage = 4; // the initial show message count
	this.AddMessage("default", "Welcome to the 'Goblin Horde' tutorial!", new Array());
	this.AddMessage("card", "In this tutorial we will learn how the Goblin Horde card works.", new Array(0, 3));
	this.AddMessage("default", "The Goblin Horde's ability activates when it is played in a squad of 2 or more.", new Array());
	this.AddMessage("default", "It completely ignores the Required Squad Size for the current skirmish. In addition to this, it sets the effective attack value of the Goblin Hordes to the number played.", new Array());
	
	this.AddMessage("zone", "The AI played 2x Goblin Overseer.", new Array("battlefield"));
	this.AddMessage("card", "Try playing all of our Goblin Hordes together.", new Array(0, 3));
	
	this.AddMessage("status", "Notice how both the Current Attack Value and the Required Squad Size are set to the number of Goblin Hordes we played?", new Array(0, 2));
	this.AddMessage("default", "This can be useful not only to get rid of our low value Goblin Hordes but also to set up combos with other cards later.", new Array());
	this.AddMessage("default", "And that's that! Continue to return to the main menu.", new Array());
	
	{ // set up the timeout for all the messages
		var queue = currScene.mMessageQueue.mQueue; // reference to the actual message queue
		for (var i = 0; i < queue.length; ++i) { // for all messages in the queue
			queue[i].SetTimeout(0.4); // set the timeout to 0.4 seconds
		}
	}
}

// adds the desired play card arrays to the players
OogaahTutorialContent31.prototype.SetDesired = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.AddDesired(3, new Array(currScene.mCardList[1], currScene.mCardList[1]), 0); // 2x overseer
	currScene.AddDesired(3, new Array(), 2); // no hordes using ability
	currScene.AddDesired(0, new Array(currScene.mCardList[0], currScene.mCardList[0], currScene.mCardList[0]), 3); // 3x horde
}
// ...End

