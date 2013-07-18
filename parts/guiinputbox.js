// GUIInputBox Class...
function GUIInputBoxCaret() {
	this.mShape = new Shape(); // the shape that represents the caret
	
	this.mFlash = 0; // floating-point value that controls flashing timing
	this.mPlace = 0; // the caret's current place in the string
	this.mOldPlace = 0; // the caret's place in the string last frame
	
	this.mScroll = 0; // the direction in which we are scrolling through the string (-1 => left, 1 => right)
	this.mScrollTimer = 0; // controls the speed at which we scroll through the string when held
	
	// the bounds of the string on the screen
	this.mLeftBound = 0;
	this.mRightBound = 0;
}

// initialises the caret parameters and bounds
GUIInputBoxCaret.prototype.SetUp = function(pos, depth, leftBound, rightBound) {
	// set up the shape
	this.mShape.mPos.Copy(pos);
	this.mShape.mDepth = depth;
	this.mShape.mColour = "#000000";
	this.mShape.mAbsolute = true;
	
	// set up the bounds
	this.mLeftBound = leftBound;
	this.mRightBound = rightBound;
}

// handles user input moving the caret within the string
GUIInputBoxCaret.prototype.Input = function(inputText) {
	if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.left)) { // if left arrow key is pressed
		this.mPlace--; // move the caret left 1 character
		if (this.mPlace < 0) { // if the caret is past the start of the string
			this.mPlace = 0; // set to the start of the string
		}
		
		this.mScroll = -1; // indicate we are scrolling left
		this.mScrollTimer = 0; // reset the scroll timer
		this.mFlash = 0; // reset the flash timer (don't flash when scrolling)
	}
	else if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.right)) { // otherwise if the left arrow key is pressed
		this.mPlace++;
		if (this.mPlace > inputText.mString.length) {
			this.mPlace = inputText.mString.length;
		}
		
		this.mScroll = 1;
		this.mScrollTimer = 0;
		this.mFlash = 0;
	}
	else if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.left) == false &&
			nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.right) == false) { // otherwise if neither key is down
		
		if (this.mScroll != 0) { // if we're scrolling in a direction
			this.mScroll = 0; // stop scrolling
			this.mFlash = 0;
		}
	}
}

// processes the caret flashing and scrolling
GUIInputBoxCaret.prototype.Process = function(inputText, renderCanvas) {
	// if we are scrolling with the arrow keys
	if (this.mScroll != 0) {
		// if scroll timer has elapsed
		if (this.mScrollTimer > 0.5) {
			this.mPlace += this.mScroll; // move the caret's place in the text
			
			// check string position boundaries
			if (this.mPlace < 0) {
				this.mPlace = 0;
			}
			else if (this.mPlace > inputText.mString.length) {
				this.mPlace = inputText.mString.length;
			}
			
			this.mScrollTimer = 0.48; // lower scroll timer (partially reset)
		}
		else {
			this.mScrollTimer += 1 / nmain.game.mFrameLimit; // increment the timer
		}
	}
	else {
		// process the caret flash timer (caret doesn't flash when moving)
		if (this.mFlash > 2) {
			this.mFlash = 0;
		}
		else {
			this.mFlash += 2 / nmain.game.mFrameLimit;
		}
	}
	
	// if caret's position in text has been moved
	if (this.mPlace != this.mOldPlace) {
		// create a new text object, copy our input text and then create a substring
		var txt = new Text();
		txt.Copy(inputText);
		txt.mString = inputText.mString.substr(0, this.mPlace);
		
		this.mShape.mPos.mX = inputText.mPos.mX + renderCanvas.mPos.mX + txt.GetWidth() - 1; // move the caret's position on canvas
		
		// if the caret is past the right bound
		if (this.mShape.mPos.mX > this.mRightBound) {
			var diff = this.mShape.mPos.mX - this.mRightBound; // find out how much past it is
			
			// move the text and caret's position on canvas
			inputText.mPos.mX -= diff;
			this.mShape.mPos.mX -= diff;
			
			// redraw the render canvas
			renderCanvas.Clear();
			renderCanvas.RenderTo(inputText);
		}
		else if (this.mShape.mPos.mX < this.mLeftBound - 1) { // otherwise if it is past the left bound
			var diff = (this.mLeftBound - 1) - this.mShape.mPos.mX;
			
			inputText.mPos.mX += diff;
			this.mShape.mPos.mX += diff;
			
			renderCanvas.Clear();
			renderCanvas.RenderTo(inputText);
		}
		
		this.mOldPlace = this.mPlace; // store the current place in the string
	}
}

// returns the correct data to render the caret's current state
GUIInputBoxCaret.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mFlash < 1) { // if the caret is currently visible (flash)
		arr.push(this.mShape);
	}
	
	return arr;
}

// sets the size of the caret (x, y)
GUIInputBoxCaret.prototype.SetSize = function(size) {
	this.mShape.Clear(); // clear the previous caret
	
	// create a new one bsaed on input size
	this.mShape.AddPoint(new Vec2(size.mX, 0));
	this.mShape.AddPoint(new Vec2(size.mX, size.mY));
	this.mShape.AddPoint(new Vec2(0, size.mY));
}
// ...End


// GUIInputBox Class...
function GUIInputBox() {
	this.mPos = new Vec2(0, 0); // the position of the input box
	this.mSize = new Vec2(0, 0); // the size of the input box
	this.mDepth = 0; // the depth of the input box
	
	// the current status and sprites that represent the input box's current state on the canvas
	this.mStatus = "idle";
	this.mSpriteIdle = new Sprite();
	this.mSpriteHover = new Sprite();
	this.mSpriteFocus = new Sprite();
	this.mSpriteInactive = new Sprite();
	
	this.mInputText = new Text(); // the renderable text that represents the string value of the input box
	this.mBox = new GUIButton(); // the button that represents the input box (handles input box hovering and clicking)
	this.mHasFocus = false; // does the input box have focus
	
	this.mCaret = new GUIInputBoxCaret(); // the input caret
	
	this.mBackspace = false; // is backspace pressed
	this.mBackspaceTimer = 0; // timer that triggers removal of characters from the input box when backspace is pressed or held
	
	this.mRenderCanvas = new RenderCanvas(); // the render canvas used to display the clipped string
	this.mInputString = ""; // the new text that has been entered into the input box since last frame
	
	this.mActive = true; // is the input box active (interactable)
	
	this.mMaxChars = -1; // the maximum number of characters allowed to be entered
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
};

// initialises the input box
GUIInputBox.prototype.SetUp = function(pos, size, depth, inputArr) {
	// setup the input box attributes
	this.mPos.Copy(pos);
	this.mSize.Copy(size);
	this.mDepth = depth;
	
	this.mBox.SetUp(pos, size, depth); // set up the button that represents the input box
	
	{ // set up the render canvas
		this.mRenderCanvas.mPos.mX += pos.mX;
		this.mRenderCanvas.mPos.mY += pos.mY;
		
		this.mRenderCanvas.SetDimensions(size);
		
		this.mRenderCanvas.mDepth = depth - 1;
		this.mRenderCanvas.mAbsolute = true;
	}
	
	// set the initial positions and depths of the input box sprites (and assume absolute)
	// the sprites can be altered individually later, after calling setup
	{
		this.mSpriteIdle.SetPosition(pos);
		this.mSpriteIdle.mDepth = depth;
		this.mSpriteIdle.mAbsolute = true;
		
		this.mSpriteHover.SetPosition(pos);
		this.mSpriteHover.mDepth = depth;
		this.mSpriteHover.mAbsolute = true;
		
		this.mSpriteFocus.SetPosition(pos);
		this.mSpriteFocus.mDepth = depth;
		this.mSpriteFocus.mAbsolute = true;
		
		this.mSpriteInactive.SetPosition(pos);
		this.mSpriteInactive.mDepth = depth;
		this.mSpriteInactive.mAbsolute = true;
	}
	
	{ // set up the caret, setting its size and colour
		this.mCaret.SetUp(this.mRenderCanvas.mPos, depth - 2, this.mRenderCanvas.mPos.mX,
				this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX);
		this.mCaret.SetSize(new Vec2(1, size.mY - 10));
		this.mCaret.mShape.mColour = "#4A4A4A";
	}
	
	if (inputArr == null) { // if no valid input was specified
		this.mValidInput = this.mValidInput.concat(this.mAlphaNumericPunctuation); // revert to default
	}
	else {
		this.mValidInput = this.mValidInput.concat(inputArr); // set valid input
	}
}

// handles the user input relating to the input box
GUIInputBox.prototype.Input = function() {
	if (this.mHasFocus == true) { // if the input box has focus
		var inString = ""; // the validated addition to the current string (if any)
		for (var i = 0; i < nmgrs.inputMan.mTextInput.length; ++i) { // for all characters input since last frame
			var charCheck = nmgrs.inputMan.mTextInput.charAt(i); // get the current character
			for (var j = 0; j < this.mValidInput.length; ++j) { // for all valid characters
				if (charCheck == this.mValidInput[j]) { // check that the current character is valid
					inString += charCheck; // add the current character to the new string
					break; // stop checking for current character
				}
			}
		}
		
		// if there is no limit on the maximum number of characters or our addition is within the limits
		if (this.mMaxChars == -1 || (this.mInputText.mString.length + inString.length) <= this.mMaxChars) {
			this.mInputString += inString; // add the new input to the current string
		}
		
		// if backspace was pressed
		if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.backspace)) {
			this.mBackspace = true; // indicate backspace pressed
			this.mBackspaceTimer = 0; // reset the backspace timer
			
			if (this.mInputText.mString.length > 0) { // if the string isn't empty
				// create a new string from the current and remove the character that the caret is in front of
				var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace - 1);
				newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
				
				// set the current string and update the caret
				this.mInputText.mString = newStr;
				this.mCaret.mPlace--;
				if (this.mCaret.mPlace < 0) { // check for bounds
					this.mCaret.mPlace = 0;
				}
				
				// if text is not currently filling the render canvas
				if ((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth() <
						this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) {
					
					// if text is wider and is able to fill the render canvas
					if (this.mInputText.GetWidth() >= this.mRenderCanvas.mSize.mX) {
						// move the text to ensure render canvas is filled
						var shift = (this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) -
								((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth());
						this.mInputText.mPos.mX += shift;
					}
				}
				
				// re-render the string
				this.mRenderCanvas.Clear();
				this.mRenderCanvas.RenderTo(this.mInputText);
			}
		}
		else if (nmgrs.inputMan.GetKeyboardReleased(nkeyboard.key.code.backspace)) {
			this.mBackspace = false; // no longer holding backspace
		}
		
		this.mCaret.Input(this.mInputText); // process caret input
	}
	
	this.mBox.Input(); // process the button representing the input box user interaction
	if (this.mHasFocus == true) { // if input box has focus
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left)) { // if left mouse button is pressed
			if (this.mBox.mHover == false) { // if not hovering the input box
				this.mHasFocus = !this.mHasFocus; // lose focus
			}
		}
	}
}

// processes the input box manipulation including string alteration
GUIInputBox.prototype.Process = function(point) {
	this.mBox.Process(point); // process the button representing the input box
	
	if (this.mBox.OnClick() == true) { // if the input box has been clicked
		if (this.mHasFocus == false) { // if the input box doesn't have focus
			this.mHasFocus = true; // input box now has focus
			this.mCaret.mFlash = 0; // start the caret flash animation
		}
	}
	
	if (this.mBackspace == true) { // if backspace was pressed
		if (this.mBackspaceTimer > 0.5) { // if timer has breached limit
			// create a new string omitting the current character
			var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace - 1);
			newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
			
			this.mInputText.mString = newStr; // assign new string to input box value
			this.mCaret.mPlace--; // move caret place back one
			if (this.mCaret.mPlace < 0) { // check bound
				this.mCaret.mPlace = 0;
			}
			
			this.mBackspaceTimer = 0.48; // partially reset backspace timer (if held, delete faster)
			
			// re-render the string
			this.mRenderCanvas.Clear();
			this.mRenderCanvas.RenderTo(this.mInputText);
		}
		else {
			this.mBackspaceTimer += 1 / nmain.game.mFrameLimit; // increment the timer
		}
	}
	
	if (this.mInputString.length > 0) { // if new string text has been entered
		// insert the new string text
		var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace);
		newStr += this.mInputString;
		newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
		
		this.mInputText.mString = newStr; // assign new string to input box value
		this.mCaret.mPlace += this.mInputString.length; // move caret place to the end of the new string text
		this.mInputString = ""; // reset the new input string
		
		// re-render the string
		this.mRenderCanvas.Clear();
		this.mRenderCanvas.RenderTo(this.mInputText);
	}
	
	{
		this.mCaret.Process(this.mInputText, this.mRenderCanvas); // process the caret
	}
	
	{
		// set input box status
		if (this.mActive == true) { // if the input box is active
			if (this.mHasFocus == false) { // if input box doesn't have focus
				if (this.mBox.mHover == true) { // if hovering
					this.mStatus = "hover"; // set hovering
				}
				else { // not hovering
					this.mStatus = "idle"; // set idle
				}
			}
			else { // has focus
				this.mStatus = "focus"; // set focus
			}
		}
		
		// process correct sprite depending on status
		if (this.mActive == true) { // if the input box is active
			if (this.mStatus == "focus") { // has focus
				this.mSpriteFocus.Process(); // process focus sprite
			}
			else if (this.mStatus == "hover") { // no focus but hovering
				this.mSpriteHover.Process(); // process hover sprite
			}
			else { // no focus, not hovering
				this.mSpriteIdle.Process(); // process idle sprite
			}
		}
		else {
			this.mSpriteInactive.Process(); // input box is inactive
		}
	}
	
	{ // ensure position and size match the button's position and size
		this.mBox.mPos.Copy(this.mPos);
		this.mBox.mSize.Copy(this.mSize);
	}
}

// returns the correct data to render the input box's current state
GUIInputBox.prototype.GetRenderData = function() {
	var arr = new Array(); // the array to hold our renderable objects
	
	arr.push(this.mRenderCanvas); // the render canvas representing the string
	
	if (this.mActive == true) { // if the input box is active
		// add the correct sprite to the renderables array depending on the current state
		if (this.mStatus == "hover") {
			arr.push(this.mSpriteHover);
		}
		else if (this.mStatus == "focus") {
			arr.push(this.mSpriteFocus);
			
			arr = util.ConcatArray(arr, this.mCaret.GetRenderData()); // add the caret
		}
		else {
			arr.push(this.mSpriteIdle);
		}
	}
	else {
		arr.push(this.mSpriteInactive); // input box is inactive
	}
	
	return arr; // return the renderable objects
}

// returns the position of the sprites (idle only) [deprecated]
GUIInputBox.prototype.GetSpritePositions = function() {
	return this.mSpriteIdle.mPos;
}

// sets the positions of all of the sprites
GUIInputBox.prototype.SetSpritePositions = function(pos) {
	// calculate the offset (difference between current positon and new position)
	var offset = new Vec2(0, 0);
	offset.mX = pos.mX - this.mSpriteIdle.mPos.mX;
	offset.mY = pos.mY - this.mSpriteIdle.mPos.mY;
	
	// set the sprite positions to new position
	this.mSpriteIdle.mPos.Copy(pos);
	this.mSpriteHover.mPos.Copy(pos);
	this.mSpriteFocus.mPos.Copy(pos);
	this.mSpriteInactive.mPos.Copy(pos);
	
	// offset the caret by the difference between the positions
	this.mCaret.mShape.mPos.mX += offset.mX;
	this.mCaret.mShape.mPos.mY += offset.mY;
	this.mCaret.mLeftBound += offset.mX;
	this.mCaret.mRightBound += offset.mX;
	
	// offset the render canvas
	this.mRenderCanvas.mPos.mX += offset.mX;
	this.mRenderCanvas.mPos.mY += offset.mY;
}

// sets the depths of all of the sprites
GUIInputBox.prototype.SetSpriteDepths = function(depth) {
	this.mSpriteIdle.mDepth = depth;
	this.mSpriteHover.mDepth = depth;
	this.mSpriteFocus.mDepth = depth;
	this.mSpriteInactive.mDepth = depth;
	
	this.mCaret.mShape.mDepth = depth - 2;
	this.mRenderCanvas.mDepth = depth - 1;
}

// sets the value of the input box (current text)
GUIInputBox.prototype.SetText = function(string) {
	if (this.mInputText.mString.length > 0) {
		var len = string.length - this.mInputText.mString.length; // get the difference in lengths between current and new strings
		
		this.mInputText.mString = string; // set the string to the new string
		this.mCaret.mPlace += len; // move the caret by the difference in string lengths
		if (this.mCaret.mPlace < 0) { // check left bounds of the string
			this.mCaret.mPlace = 0;
		}
		
		// if text is not currently filling the render canvas
		if ((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth() <
				this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) {
			
			// if text is wider and is able to fill the render canvas
			if (this.mInputText.GetWidth() >= this.mRenderCanvas.mSize.mX) {
				// move the text to ensure render canvas is filled
				var shift = (this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) -
						((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth());
				this.mInputText.mPos.mX += shift;
			}
		}
		
		// re-render the string to the render canvas
		this.mRenderCanvas.Clear();
		this.mRenderCanvas.RenderTo(this.mInputText);
		
		this.mCaret.mOldPlace = this.mCaret.mPlace - 1; // force the caret to update it's position on the canvas
	}
}
// ...End

