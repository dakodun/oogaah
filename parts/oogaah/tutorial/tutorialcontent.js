// OogaahTutorialContent Class...
//
function OogaahTutorialContent() {
	
};

OogaahTutorialContent.prototype.SetCards = function() {
	
}

OogaahTutorialContent.prototype.SetMessages = function() {
	
}

OogaahTutorialContent.prototype.SetDesired = function() {
	
}

// adds a default tutorial message (no highlight or specific position required)
OogaahTutorialContent.prototype.AddMessageDefault = function(string, position) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	var pos = new Vec2(); var size = new Vec2(); // the position and size of the message box
	
	{ // set up the message box
		// create an example text object used to measure the number of lines
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		var text = new Text();
		text.SetOrigin(new Vec2(-5, 0));
		text.SetFont(fnt);
		text.SetFontSize(16);
		text.mAlign = "justify";
		text.mDepth = -1000;
		text.mVSpacing = 0.9;
		
		// set the string and wrapping to properly position text
		text.SetString(string);
		text.EnableWrapping(Math.round(nmain.game.mCanvasSize.mX / 2) - 10, 10);
		
		// set the position and size of the message box depending on the number of lines in the string
		pos.Set(Math.round(nmain.game.mCanvasSize.mX / 4), 80);
		size.Set(Math.round(nmain.game.mCanvasSize.mX / 2), 20 + (16 * (text.mLines)));
	}
	
	if (position == null) {
		currScene.mMessageQueue.PushMessage(pos, string, size, "none", 0, new Vec2(), new Vec2()); // add the message to the queue
		currScene.mMessageMeta.push(new Array("default", string, new Array()));
	}
	else {
		currScene.mMessageQueue.PushMessage(pos, string, size, "none", new Vec2(), new Vec2(), position); // insert the message into the queue
		currScene.mMessageMeta.splice(position, 0, new Array("default", string, new Array()));
	}
}

// adds a card tutorial message (highlight a selection of cards, message positioned above)
OogaahTutorialContent.prototype.AddMessageCard = function(string, initial, number, position) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	var pos = new Vec2(); var size = new Vec2(); // the position and size of the message box
	var hiPos = new Vec2(); var hiSize = new Vec2(); // the position and size of the highlight
	
	{ // set up the highlight
		if (initial == 0) { // if the initial card is the first card
			// set the highlight to the whole first card
			hiPos.Set(24, 377);
			hiSize.Set(72, 103);
		}
		else { // otherwise if it is any other card (and thus partially hidden)
			// set the highlight to the visible part
			hiPos.Set(96, 377);
			hiSize.Set(20, 103);
		}
		
		for (var i = 0; i < number - 1; ++i) { // for all subsequent highlighted cards
			hiSize.mX += 20; // increase the width of the highlight to encompass them
		}
	}
	
	{ // set up the message box
		// create an example text object used to measure the number of lines
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		var text = new Text();
		text.SetOrigin(new Vec2(-5, 0));
		text.SetFont(fnt);
		text.SetFontSize(16);
		text.mAlign = "justify";
		text.mDepth = -1000;
		text.mVSpacing = 0.9;
		
		// set the string and wrapping to properly position text
		text.SetString(string);
		text.EnableWrapping(290, 10);
		
		// set the position and size of the message box depending on the highlight and number of lines in the string
		pos.Set(hiPos.mX + (hiSize.mX / 2) - 38, 280 - (16 * (text.mLines)));
		size.Set(300, 20 + (16 * (text.mLines)));
	}
	
	if (position == null) {
		currScene.mMessageQueue.PushMessage(pos, string, size, "down", 20, hiPos, hiSize); // add the message to the queue
		currScene.mMessageMeta.push(new Array("card", string, new Array(initial, number)));
	}
	else {
		currScene.mMessageQueue.InsertMessage(pos, string, size, "down", 20, hiPos, hiSize, position); // insert the message into the queue
		currScene.mMessageMeta.splice(position, 0, new Array("card", string, new Array(initial, number)));
	}
}

// adds a battlefield message (highlight the specified zone, message positioned below)
OogaahTutorialContent.prototype.AddMessageZone = function(string, zone, position) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	var off = 0;
	var pos = new Vec2(); var size = new Vec2(); // the position and size of the message box
	var hiPos = new Vec2(); var hiSize = new Vec2(); // the position and size of the highlight
	
	{ // set up the highlight
		if (zone == "battlefield") { // if the specified zone is the battlefield
			hiPos.Set(318, 135); // set the highlight position to the battlefield
		}
		else { // otherwise if it is the graveyard
			hiPos.Set(218, 154); // set the highlight position to the graveyard
			
			off = 19; // set the y offset
		}
		
		hiSize.Set(76, 107);
	}
	
	{ // set up the message box
		// create an example text object used to measure the number of lines
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		var text = new Text();
		text.SetOrigin(new Vec2(-5, 0));
		text.SetFont(fnt);
		text.SetFontSize(16);
		text.mAlign = "justify";
		text.mDepth = -1000;
		text.mVSpacing = 0.9;
		
		// set the string and wrapping to properly position text
		text.SetString(string);
		text.EnableWrapping(270, 10);
		
		// set the position and size of the message box depending on the highlight and number of lines in the string
		pos.Set(hiPos.mX + (hiSize.mX / 2) - 140, 280 + off);
		size.Set(280, 20 + (16 * (text.mLines)));
	}
	
	if (position == null) {
		currScene.mMessageQueue.PushMessage(pos, string, size, "up", 122, hiPos, hiSize); // add the message to the queue
		currScene.mMessageMeta.push(new Array("zone", string, new Array(zone)));
	}
	else {
		currScene.mMessageQueue.InsertMessage(pos, string, size, "up", 122, hiPos, hiSize, position); // insert the message into the queue
		currScene.mMessageMeta.splice(position, 0, new Array("zone", string, new Array(zone)));
	}
}

// adds an ai hand message (highlight the specified ai's hand, message positioned below)
OogaahTutorialContent.prototype.AddMessageAI = function(string, id, position) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	var aiID = id - 1;
	var arrowOff = 20;
	
	var pos = new Vec2(); var size = new Vec2(); // the position and size of the message box
	var hiPos = new Vec2(); var hiSize = new Vec2(); // the position and size of the highlight
	
	{ // set up the highlight
		if (aiID < 0 || aiID > 2) {
			aiID = 0;
		}
		
		hiPos.Set(25 + (210 * aiID), 0);
		hiSize.Set(151, 60);
	}
	
	{ // set up the message box
		if (aiID == 1) {
			arrowOff = 182;
		}
		else if (aiID == 2) {
			arrowOff = 342;
		}
		
		// create an example text object used to measure the number of lines
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		var text = new Text();
		text.SetOrigin(new Vec2(-5, 0));
		text.SetFont(fnt);
		text.SetFontSize(16);
		text.mAlign = "justify";
		text.mDepth = -1000;
		text.mVSpacing = 0.9;
		
		// set the string and wrapping to properly position text
		text.SetString(string);
		text.EnableWrapping(390, 10);
		
		// set the position and size of the message box depending on the highlight and number of lines in the string
		pos.Set(hiPos.mX + (hiSize.mX / 2) - (arrowOff + 18), 106);
		size.Set(400, 20 + (16 * (text.mLines)));
	}
	
	if (position == null) {
		currScene.mMessageQueue.PushMessage(pos, string, size, "up", arrowOff, hiPos, hiSize); // add the message to the queue
		currScene.mMessageMeta.push(new Array("ai", string, new Array(id)));
	}
	else {
		currScene.mMessageQueue.InsertMessage(pos, string, size, "up", arrowOff, hiPos, hiSize, position); // insert the message into the queue
		currScene.mMessageMeta.splice(position, 0, new Array("ai", string, new Array(id)));
	}
}

// adds an ui message (highlight the specified ui button, message positioned above)
OogaahTutorialContent.prototype.AddMessageUI = function(string, button, position) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	var off = 0;
	var pos = new Vec2(); var size = new Vec2(); // the position and size of the message box
	var hiPos = new Vec2(); var hiSize = new Vec2(); // the position and size of the highlight
	
	{ // set up the highlight
		if (button == "play") { // if the specified button is the play button
			hiPos.Set(506, 412); // set the highlight position to the play button
		}
		else { // otherwise if it is the pass button
			hiPos.Set(506, 447); // set the highlight position to the pass button
			
			off = 35; // set the y offset
		}
		
		hiSize.Set(109, 29);
	}
	
	{ // set up the message box
		// create an example text object used to measure the number of lines
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		var text = new Text();
		text.SetOrigin(new Vec2(-5, 0));
		text.SetFont(fnt);
		text.SetFontSize(16);
		text.mAlign = "justify";
		text.mDepth = -1000;
		text.mVSpacing = 0.9;
		
		// set the string and wrapping to properly position text
		text.SetString(string);
		text.EnableWrapping(270, 10);
		
		// set the position and size of the message box depending on the highlight and number of lines in the string
		pos.Set(hiPos.mX + (hiSize.mX / 2) - 221, nmain.game.mCanvasSize.mY - (140 - off) - (16 * (text.mLines)));
		size.Set(280, 20 + (16 * (text.mLines)));
	}
	
	if (position == null) {
		currScene.mMessageQueue.PushMessage(pos, string, size, "down", 203, hiPos, hiSize); // add the message to the queue
		currScene.mMessageMeta.push(new Array("ui", string, new Array(button)));
	}
	else {
		currScene.mMessageQueue.InsertMessage(pos, string, size, "down", 203, hiPos, hiSize, position); // insert the message into the queue
		currScene.mMessageMeta.splice(position, 0, new Array("ui", string, new Array(button)));
	}
}

// adds a game status message (highlight the specified game status(es), message positioned to the right)
OogaahTutorialContent.prototype.AddMessageStatus = function(string, initial, number, position) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	var arrowOff = 0;
	var pos = new Vec2(); var size = new Vec2(); // the position and size of the message box
	var hiPos = new Vec2(); var hiSize = new Vec2(); // the position and size of the highlight
	
	{ // set up the highlight
		if (initial == 0) { // if the initial status is the current attack value
			// set the highlight to the whole first card
			hiPos.Set(100, 144);
			hiSize.Set(97, 36);
			
			if (number > 1) {
				hiSize.mY += 46;
			}
			
			if (number > 2) {
				hiSize.mY += 24;
			}
		}
		else if (initial == 1) { // otherwise if it is the required squad size
			// set the highlight to the visible part
			hiPos.Set(100, 181);
			hiSize.Set(97, 45);
			
			if (number > 1) {
				hiSize.mY += 24;
			}
		}
		else { // otherwise it is the current mode icons
			hiPos.Set(100, 234);
			hiSize.Set(97, 16);
		}
	}
	
	{ // set up the message box
		// create an example text object used to measure the number of lines
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		var text = new Text();
		text.SetOrigin(new Vec2(-5, 0));
		text.SetFont(fnt);
		text.SetFontSize(16);
		text.mAlign = "justify";
		text.mDepth = -1000;
		text.mVSpacing = 0.9;
		
		// set the string and wrapping to properly position text
		text.SetString(string);
		text.EnableWrapping(Math.round(nmain.game.mCanvasSize.mX / 2) - 10, 10);
		
		// calculate the arrow offset based on the height of the message box
		var height = 40 + (16 * (text.mLines));
		arrowOff = (height / 2) - 18;
		
		// set the position and size of the message box depending on the highlight and number of lines in the string
		pos.Set(254, hiPos.mY + (hiSize.mY / 2) - (arrowOff + 18));
		size.Set(Math.round(nmain.game.mCanvasSize.mX / 2), 20 + (16 * (text.mLines)));
	}
	
	if (position == null) {
		currScene.mMessageQueue.PushMessage(pos, string, size, "left", arrowOff, hiPos, hiSize); // add the message to the queue
		currScene.mMessageMeta.push(new Array("status", string, new Array(initial, number)));
	}
	else {
		currScene.mMessageQueue.InsertMessage(pos, string, size, "left", arrowOff, hiPos, hiSize, position); // insert the message into the queue
		currScene.mMessageMeta.splice(position, 0, new Array("status", string, new Array(initial, number)));
	}
}

OogaahTutorialContent.prototype.AddMessage = function(type, string, additional, position) {
	switch (type) {
		case "card" :
			if (additional.length > 1) {
				this.AddMessageCard(string, additional[0], additional[1], position);
			}
			
			break;
		case "zone" :
			if (additional.length > 0) {
				this.AddMessageZone(string, additional[0], position);
			}
			
			break;
		case "ai" :
			if (additional.length > 0) {
				this.AddMessageAI(string, additional[0], position);
			}
			
			break;
		case "ui" :
			if (additional.length > 0) {
				this.AddMessageUI(string, additional[0], position);
			}
			
			break;
		case "status" :
			if (additional.length > 1) {
				this.AddMessageStatus(string, additional[0], additional[1], position);
			}
			
			break;
		default :
			this.AddMessageDefault(string, position);
			break;
	}
}
// ...End

