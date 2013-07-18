// GUIDOMInputBox Class...
function GUIDOMInputBox() {
	this.mPos = new Vec2(0, 0); // the position of the input box element
	
	// the gui dom input box element
	this.mElement = document.createElement('input');
	this.mElement.type = "text";
	
	this.mOldValue = ""; // the stored value of the input box
	
	this.mValidInput = new Array(); // an array that holds the characters that are allowed to be entered into this input box
	
	{ // various default arrays of valid input characters
		this.mAlphaUpper = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
				"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ");
				
		this.mAlphaLower = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
				"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ");
				
		this.mNumbers = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
		
		this.mAlphaNumeric = new Array();
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mAlphaUpper);
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mAlphaLower);
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mNumbers);
		
		{
			var arr = new Array("¬", "!", '"', "£", "$", "%", "^", "&", "*", "(", ")", "_", "+",
					"`", "¦", "-", "=", "[", "{", "]", "}", ";", ":", "'", "@", "#", "~", "\\", "|",
					",", "<", ".", ">", "/", "?");
			
			this.mAlphaNumericPunctuation = new Array();
			this.mAlphaNumericPunctuation = this.mAlphaNumeric.concat(this.mAlphaNumeric);
			this.mAlphaNumericPunctuation = this.mAlphaNumeric.concat(arr);
		}
	}
	
	this.mSelected = false; // input box is currently selected (ready for input)
	this.mHover = false; // user is hovering over input box
};

// returns the type of this gui element
GUIDOMInputBox.prototype.Type = function() {
	return "GUIDOMInputBox";
}

// copy constructor
GUIDOMInputBox.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	
	this.mElement = other.mElement;
	
	this.mOldValue = other.mOldValue;
	
	this.mValidInput.splice(0, this.mValidInput.length);
	this.mValidInput = this.mValidInput.concat(other.mValidInput);
	
	this.mSelected = other.mSelected;
	this.mHover = other.mHover;
}

// sets up the position, font, default text and valid input characters of the gui dom element
GUIDOMInputBox.prototype.SetUp = function(pos, fontString, defaultText, inputArr) {
	this.mPos.Copy(pos); // set the internal position
	
	// set the position of the element itself
	this.mElement.style.position = "absolute";
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
	
	this.mElement.defaultValue = defaultText; // set the default value
	this.mElement.style.font = fontString; // set the font used
	
	if (inputArr == null) { // if no valid input was supplied
		this.mValidInput = this.mValidInput.concat(this.mAlphaNumericPunctuation); // use default
	}
	else {
		this.mValidInput = this.mValidInput.concat(inputArr); // set valid input
	}
}

// processes the element
GUIDOMInputBox.prototype.Process = function() {
	if (this.mElement.value != this.mOldValue) { // if the value in the input box doesn't match our stored value (has changed)
		var valueStr = this.mElement.value; // get the current value
		var finalStr = ""; // validated string
		
		for (var i = 0; i < valueStr.length; ++i) {	 // for every character in the current value
			for (var j = 0; j < this.mValidInput.length; ++j) { // for every valid input character
				if (valueStr.charAt(i) == this.mValidInput[j]) { // if the current character exists within the valid input array
					finalStr += valueStr.charAt(i); // add to the final validated string
					break; // break out of inner loop (valid input array)
				}
			}
		}
		
		this.mElement.value = finalStr; // set the current value to the validated value
		this.mOldValue = this.mElement.value; // update the stored value
	}
}

// sets the position of the gui dom element [deprecated - see SetPosition]
GUIDOMInputBox.prototype.SetPos = function(pos) {
	this.mPos.Copy(pos); // set the internal position
	
	// set the position of the gui dom element
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
}

// as above
GUIDOMInputBox.prototype.SetPosition = function(pos) {
	this.mPos.Copy(pos);
	
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
}

// register callbacks for the element's events
GUIDOMInputBox.prototype.RegisterCallbacks = function(e) {
	this.mElement.onfocus = function(e) { // input box is selected
		nmgrs.inputMan.mDisableBackspace = false; // allow default backspace functionality to be used
		this.mSelected = true; // set selected status
	}
	
	this.mElement.onblur = function(e) { // input box is deselected (lost focus)
		nmgrs.inputMan.mDisableBackspace = true; // disable default backspace functionality
		this.mSelected = false; // set selected status
	}
	
	this.mElement.onmouseover = function(e) { // mouse in
		this.mHover = true; // user is hovering
	}
	
	this.mElement.onmouseout = function(e) { // mouse out
		this.mHover = false; // user no longer hovering
	}
}

// unregisters any previously registered callbacks for the element
GUIDOMInputBox.prototype.UnregisterCallbacks = function(e) {
	this.mElement.onfocus = function(e) {
		
	}
	
	this.mElement.onblur = function(e) {
		
	}
	
	this.mElement.onmouseover = function(e) {
		
	}
	
	this.mElement.onmouseout = function(e) {
		
	}
}

// returns the current value of the input box (current text)
GUIDOMInputBox.prototype.GetText = function() {
	return this.mElement.value;
}

// sets the value of the input box (current text)
GUIDOMInputBox.prototype.SetText = function(text) {
	this.mElement.value = text;
}

// returns the width of the input box
GUIDOMInputBox.prototype.GetWidth = function() {
	var str = this.mElement.style.width; // get the width of the input box (in string form "Npx")
	var len = str.length - 2; // remove last 2 characters ("px")
	
	return Number(str.substr(0, len)); // convert to integer and return the width
}

// sets the width of the input box
GUIDOMInputBox.prototype.SetWidth = function(width) {
	this.mElement.style.width = width + "px"; // add "px" to the supplied width and apply it
}

// get the max number of characters allowed
GUIDOMInputBox.prototype.GetMaxChars = function() {
	return this.mElement.maxLength;
}

// set the max number of characters allowed
GUIDOMInputBox.prototype.SetMaxChars = function(length) {
	this.mElement.maxLength = length;
}

// get the current readonly status (editable or not)
GUIDOMInputBox.prototype.GetReadOnly = function() {
	return this.mElement.readOnly;
}

// set the readonly status (editable or not)
GUIDOMInputBox.prototype.SetReadOnly = function(readOnly) {
	this.mElement.readOnly = readOnly;
}

// select all of the text in the input box
GUIDOMInputBox.prototype.SelectAll = function() {
	this.mElement.select();
}
// ...End

