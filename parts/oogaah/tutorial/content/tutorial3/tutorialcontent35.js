// OogaahTutorialContent35 Class...
// tutorial content for "goblin technician" card
function OogaahTutorialContent35() {
	OogaahTutorialContent.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahTutorialContent35.prototype = Object.create(OogaahTutorialContent.prototype);

// adds cards to the player's hands
OogaahTutorialContent35.prototype.SetCards = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mCurrPlayer = 0; // set the initial player to the human
	
	{ // player 0 (human)
		// 1 goblin horde
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[0]);
		
		// 1 orc warrior
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[3]);
		
		// 1 goblin technician
		currScene.mPlayers[0].mHand.AddCard(currScene.mCardList[4]);
	}
	
	{ // player 1 (ai)
		// 1 goblin horde - not played
		currScene.mPlayers[1].mHand.AddCard(currScene.mCardList[0]);
	}
	
	{ // player 2 (ai)
		// 1 goblin horde - not played
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[0]);
		
		// 1 orc warrior
		currScene.mPlayers[2].mHand.AddCard(currScene.mCardList[3]);
	}
	
	{ // player 3 (ai)
		// 1 goblin horde - not played
		currScene.mPlayers[3].mHand.AddCard(currScene.mCardList[0]);
	}
}

// adds messages to the tutorial message queue
OogaahTutorialContent35.prototype.SetMessages = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mShowMessage = 6; // the initial show message count
	this.AddMessage("default", "Welcome to the 'Goblin Technician' tutorial!", new Array());
	this.AddMessage("card", "In this tutorial we will learn how the Goblin Technician card works.", new Array(2, 1));
	this.AddMessage("default", "The Goblin Technician's ability allows us to trade a single card with an opponent or the graveyard.", new Array());
	this.AddMessage("default", "After first selecting our desired target, one of their cards are chosen at random.", new Array());
	this.AddMessage("default", "If we decide that we would like to swap for that card then we select one of ours and make the trade.", new Array());
	this.AddMessage("card", "Play our Goblin Technician.", new Array(2, 1));
	
	this.AddMessage("ai", "Choose the second AI to trade cards with.", new Array(2, 0));
	
	this.AddMessage("ui", "A card was chosen at random (an Orc Warrior); accept it.", new Array("play"));
	
	this.AddMessage("card", "In our hand we have a single Goblin Horde and a single Orc Warrior.", new Array(0, 2));
	this.AddMessage("default", "It would be wise to rid ourselves of the single Goblin Horde and at the same time double up on our Orc Warrior.", new Array());
	this.AddMessage("card", "So choose to swap our Goblin Horde.", new Array(0, 1));
	
	this.AddMessage("card", "We now have 2x Orc Warrior which will certainly be easier to play later!", new Array(0, 2));
	this.AddMessage("ai", "On top of that, the AI potenitally has a single Goblin Horde; good luck getting rid of that!", new Array(2, 0));
	this.AddMessage("default", "As the chosen card is random, playing Goblin Technician earlier when targeting the graveyard allows more control over the chosen card.", new Array());
	this.AddMessage("default", "Conversely, when selecting other players, waiting until later can net you a card the opponent was saving or relying upon.", new Array());
	this.AddMessage("default", "It's worthwhile to always choose an opponent to trade with as you can cancel it after seeing which card was chosen.", new Array());
	this.AddMessage("default", "And that's that! Continue to return to the main menu.", new Array());
	
	{ // set up the timeout for all the messages
		var queue = currScene.mMessageQueue.mQueue; // reference to the actual message queue
		for (var i = 0; i < queue.length; ++i) { // for all messages in the queue
			queue[i].SetTimeout(0.4); // set the timeout to 0.4 seconds
		}
	}
}

// adds the desired play card arrays to the players
OogaahTutorialContent35.prototype.SetDesired = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.AddDesired(0, new Array(currScene.mCardList[4]), 1); // 1x technician
	
	{
		// the first card's value is the player id to swap with
		var playerID = currScene.mCardList[0].GetCopy();
		playerID.mCardValue = 2; 
		
		// the second card's value is the id of the card to choose in the hand
		var chosenID = currScene.mCardList[0].GetCopy();
		chosenID.mCardValue = 1;
		
		currScene.AddDesired(0, new Array(playerID, chosenID), 1); // playerID - swap player, chosenID - swap card
		currScene.AddDesired(0, new Array(currScene.mCardList[4]), 3); // 1x technician - not empty implies accept
		currScene.AddDesired(0, new Array(currScene.mCardList[0]), 6); // 1x horde (our swap card)
	}
}
// ...End

