// OogaahTutorialContent3S Class...
// tutorial content for "" card
function OogaahTutorialContent3S() {
	OogaahTutorialContent.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahTutorialContent3S.prototype = Object.create(OogaahTutorialContent.prototype);

// adds cards to the player's hands
OogaahTutorialContent3S.prototype.SetCards = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mCurrPlayer = 0; // set the initial player
}

// adds messages to the tutorial message queue
OogaahTutorialContent3S.prototype.SetMessages = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	currScene.mFinished = true; // default blank tutorial - set finished to true
	currScene.mShowMessage = 1; // the initial show message count
	this.AddMessage("default", "And that's that! Continue to return to the main menu.", new Array());
	
	{ // set up the timeout for all the messages
		var queue = currScene.mMessageQueue.mQueue; // reference to the actual message queue
		for (var i = 0; i < queue.length; ++i) { // for all messages in the queue
			queue[i].SetTimeout(0.4); // set the timeout to 0.4 seconds
		}
	}
}

// adds the desired play card arrays to the players
OogaahTutorialContent3S.prototype.SetDesired = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
}
// ...End

