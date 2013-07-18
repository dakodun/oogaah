// GUIDOMButton Class...
function GUIDOMButton() {
	this.mPos = new Vec2(0, 0); // the position of the button element
	
	this.mElement = document.createElement('button'); // the gui dom button element
	
	this.mHover = false; // user is hovering over button
	this.mDown = false; // button is being held down
	this.mWasClicked = false; // button was clicked
};

// returns the type of this gui element
GUIDOMButton.prototype.Type = function() {
	return "GUIDOMButton";
}

// copy constructor
GUIDOMButton.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	
	this.mElement = other.mElement;
	
	this.mHover = other.mHover;
	this.mDown = other.mDown;
	this.mWasClicked = other.mWasClicked;
}

// sets up the position and display text of the gui dom element
GUIDOMButton.prototype.SetUp = function(pos, text) {
	this.mPos.Copy(pos); // set the internal position
	
	// set the position of the element itself
	this.mElement.style.position = "absolute";
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
	
	// add the text node
	var txt = document.createTextNode(text);
	this.mElement.appendChild(txt);
}

// processes the element
GUIDOMButton.prototype.Process = function() {
	
}

// sets the position of the gui dom element [deprecated - see SetPosition]
GUIDOMButton.prototype.SetPos = function(pos) {
	this.mPos.Copy(pos); // set the internal position
	
	// set the position of the gui dom element
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
}

// as above
GUIDOMButton.prototype.SetPosition = function(pos) {
	this.mPos.Copy(pos);
	
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
}

// return if this button was clicked [needs updated - see guibutton.js]
GUIDOMButton.prototype.OnClick = function() {
	if (this.mWasClicked == true) {
		this.mWasClicked = false;
		return true;
	}
	
	return false;
}

// register callbacks for the element's events
GUIDOMButton.prototype.RegisterCallbacks = function(e) {
	this.mElement.onclick = function(e) { // button is clicked
		this.mWasClicked = true; // set click status
	}
	
	this.mElement.onmouseover = function(e) { // mouse in
		this.mHover = true; // user is hovering
	}
	
	this.mElement.onmouseout = function(e) { // mouse out
		this.mHover = false; // user no longer hovering
	}
	
	this.mElement.onmousedown = function(e) { // left mouse pressed
		this.mDown = true; // button is down
	}
	
	this.mElement.onmouseup = function(e) { // left mouse released
		this.mDown = false; // button is up
	}
}

// unregisters any previously registered callbacks for the element
GUIDOMButton.prototype.UnregisterCallbacks = function(e) {
	this.mElement.onclick = function(e) {
		
	}
	
	this.mElement.onmouseover = function(e) {
		
	}
	
	this.mElement.onmouseout = function(e) {
		
	}
	
	this.mElement.onmousedown = function(e) {
		
	}
	
	this.mElement.onmouseup = function(e) {
		
	}
}
// ...End

