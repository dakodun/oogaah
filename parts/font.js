// Font Class...
// 
function Font() {
	this.mFontName = "";
	this.mLoaded = ""; // the load status of our font
	this.mFailTimer = new Timer();
};

// returns the type of this object for validity checking
Font.prototype.Type = function() {
	return "Font";
}

// loads a custom font from a file
Font.prototype.LoadFromFile = function(fontName, fontFile) {
	this.mLoaded = ""; // no initial load status
	this.mFailTimer.Reset(); // reset the load timeout
	
	this.mFontName = fontName; // set the name of the font
	
	// create the css rule that defines the font
	var rule = "@font-face { font-family: " + fontName + "; src: url('" + fontFile + ".ttf'), url('" + fontFile + ".eot'); }";
	
	// append the rule to the stylesheet depending on which method the browser supports
	if (nmain.game.mStyleSheet.styleSheet) {
		nmain.game.mStyleSheet.styleSheet.cssText += rule;
	}
	else {
		nmain.game.mStyleSheet.appendChild(document.createTextNode(rule));
	}
}

// checks the current status of the font
Font.prototype.CheckLoadStatus = function() {
	var str = "This is the Test String!"; // string used to test if the font has loaded
	var old = nmain.game.mCurrContext.font; // store the current font
	
	nmain.game.mCurrContext.font = "256px Impact"; // choose a really large font to test against
	var widthControl = nmain.game.mCurrContext.measureText(str).width; // get the width of the test font
	
	nmain.game.mCurrContext.font = "256px " + this.mFontName + ", Impact"; // try to set to our new font, fall back on previous test font if failure
	var widthTest = nmain.game.mCurrContext.measureText(str).width; // get the width of the new font
	
	// if the widths do not match then we can assume (which is correct in most cases) that we didn't fall back to the test font
	if (widthControl != widthTest) {
		this.mLoaded = "load"; // indicate success
	}
	
	nmain.game.mCurrContext.font = old; // reset the font to the stored current font
	
	if (this.mLoaded != "load") {
		if (this.mFailTimer.GetElapsedTime() > 10000) { // timeout after 10 seconds
			this.mLoaded = "error"; // we've timed out
		}
	}
}
// ...End

