// OogaahTutorialContent36 Class...
// tutorial content for "orc shaman" card
function OogaahTutorialContent36() {
	OogaahTutorialContent.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahTutorialContent36.prototype = Object.create(OogaahTutorialContent.prototype);

// adds cards to the player's hands
OogaahTutorialContent36.prototype.SetCards = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mCurrPlayer = 0; // set the initial player to the human
	
	{ // player 0 (human)
		// 1 orc shaman
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[5]);
	}
	
	{ // player 1 (ai)
		// 1 goblin horde - not played
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
		
		// 1 goblin horde
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
OogaahTutorialContent36.prototype.SetMessages = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mShowMessage = 5; // the initial show message count
	this.AddMessage("default", "Welcome to the 'Orc Shaman' tutorial!", new Array());
	this.AddMessage("card", "In this tutorial we will learn how the Orc Shaman card works.", new Array(0, 1));
	this.AddMessage("default", "The Orc Shaman's ability reverses the attack values for the current skirmish.", new Array());
	this.AddMessage("default", "This means that the new highest attack value is 1, and the lowest is S.", new Array());
	this.AddMessage("card", "Play our Orc Shaman to see this in action.", new Array(0, 1));
	
	this.AddMessage("ui", "We now have the option to reverse the attack values for the current skirmish; select yes.", new Array("play"));
	
	this.AddMessage("status", "Notice that a small icon (a circle of 2 arrows) has appeared under the current game status? This indicates that the Orc Shaman's ability is in play.", new Array(2, 1));
	
	this.AddMessage("zone", "The AI played a Goblin Horde.", new Array("battlefield"));
	this.AddMessage("default", "When attack values are reverse, a single Goblin Horde is the most powerful card and can't be beaten (note that its ability still applies).", new Array());
	this.AddMessage("default", "As such, using the Orc Shaman's ability allows us to play our lower value cards and also potentially win the skirmish!", new Array());
	this.AddMessage("default", "And that's that! Continue to return to the main menu.", new Array());
	
	{ // set up the timeout for all the messages
		var queue = currScene.mMessageQueue.mQueue; // reference to the actual message queue
		for (var i = 0; i < queue.length; ++i) { // for all messages in the queue
			queue[i].SetTimeout(0.4); // set the timeout to 0.4 seconds
		}
	}
}

// adds the desired play card arrays to the players
OogaahTutorialContent36.prototype.SetDesired = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.AddDesired(0, new Array(currScene.mCardList[5]), 1); // 1x shaman
	currScene.AddDesired(0, new Array(currScene.mCardList[5]), 1); // 1x shaman - not empty implies accept
	currScene.AddDesired(1, new Array(currScene.mCardList[0]), 4); // 1x horde
}
// ...End

