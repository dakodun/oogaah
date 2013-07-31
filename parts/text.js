// TextPart Class...
// a renderable text part - usually a line or an individual word used in the renderable text class
function TextPart() {
	this.mPos = new Vec2();
	this.mString = "";
};

// make a deep copy of another (other) text part
TextPart.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mString = other.mString;
}

// return a deep copy of this text part
TextPart.prototype.GetCopy = function() {
	var tp = new TextPart(); tp.Copy(this); // create a new text part and copy this into it
	return tp; // return the new text part
}
// ...End


// Text Class...
// renderable text
function Text() {
	Renderable.apply(this, null); // construct the base class
	
	this.mFont = null; // the font object used to render the text
	this.mFontSize = 12; // the size of the text
	this.mFontString = "12px Arial"; // the internal font string used when rendering
	this.mVSpacing = 1; // vertical spacing modifier of the font
	
	this.mString = ""; // the current text to be rendered
	this.mTextParts = new Array();
	this.mColour = "#FFFFFF"; // the colour of the text
	
	this.mShadow = false; // whether to render an offset shadow
	this.mShadowAlpha = 1.0; // the alpha value of the shaod
	this.mShadowColour = "#000000"; // the colour of the offset shadow
	this.mShadowBlur = 0; // the amount for blur to apply to the shaodw
	this.mShadowOffset = new Vec2(1, 1); // the shadow's offset in comparison to the text
	
	this.mOutline = false; // whether to draw an outline around the text or not
	this.mOutlineColour = "#000000"; // the colour of the text outline
	this.mOutlineAlpha = 1.0; // the alpha value of the text outline
	this.mOutlineWidth = 1; // the width of the text outline
	
	this.mAlign = "left"; // the alignment of the text (left, centre, right)
	
	this.mWrap = false; // should this text wrap
	this.mWrapWidth = 0; // the width that the text should wrap within when text wrap is true
	this.mWrapWordLength = 6; // the minimum word length on which hyphenation can occur (minimum is 6)
};

// inherit the base class's prototype
Text.prototype = Object.create(Renderable.prototype);

// returns the type of this object for validity checking
Text.prototype.Type = function() {
	return "Text";
}

// make a deep copy of another (other) text
Text.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	this.mOrigin.Copy(other.mOrigin);
	this.mAbsolute = other.mAbsolute;
	
	this.mDepth = other.mDepth;
	
	this.mTransformation.Copy(other.mTransformation);
	this.mScale.Copy(other.mScale);
	this.mRotation = other.mRotation;
	this.mSkew.Copy(other.mSkew);
	this.mAlpha = other.mAlpha;
	this.mCompositeOp = other.mCompositeOp;
	
	this.mLocalBoundingBox.Copy(other.mLocalBoundingBox);
	this.mGlobalBoundingBox.Copy(other.mGlobalBoundingBox);
	
	this.mLocalMask.Copy(other.mLocalMask);
	this.mGlobalMask.Copy(other.mGlobalMask);
	
	this.mFont = other.mFont;
	this.mFontSize = other.mFontSize;
	this.mFontString = other.mFontString;
	this.mVSpacing = other.mVSpacing;
	
	this.mString = other.mString;
	
	this.mTextParts.splice(0, this.mTextParts.length);
	this.mTextParts = util.ConcatArray(this.mTextParts, other.mTextParts)
	
	this.mColour = other.mColour;
	
	this.mShadow = other.mShadow;
	this.mShadowAlpha = other.mShadowAlpha;
	this.mShadowColour = other.mShadowColour;
	this.mShadowBlur = other.mShadowBlur;
	this.mShadowOffset.Copy(other.mShadowOffset);
	
	this.mOutline = other.mOutline;
	this.mOutlineColour = other.mOutlineColour;
	this.mOutlineAlpha = other.mOutlineAlpha;
	this.mOutlineWidth = other.mOutlineWidth;
	
	this.mAlign = other.mAlign;
	
	this.mWrap = other.mWrap;
	this.mWrapWidth = other.mWrapWidth;
	this.mWrapWordLength = other.mWrapWordLength;
}

// return a deep copy of this text
Text.prototype.GetCopy = function() {
	var t = new Text(); t.Copy(this); // create a new text and copy this into it
	return t; // return the new text
}

// renders this text to the supplied render target
Text.prototype.Render = function(renderTarget, cull, cullRect) {
	if (renderTarget != null) { // if render target is valid
		var intersect = true; // assume instersection occurs initially
		if (cull == true) {
			var bounds = this.mGlobalBoundingBox.GetBounds();
			var pos = bounds[0];
			var size = bounds[1];
			size.mX -= pos.mX; size.mY -= pos.mY;
			
			intersect = util.RectangleCollision(pos, size, cullRect.mPos, cullRect.mSize, false);
		}
		
		// if we have a collision then render
		if (intersect == true) {
			renderTarget.save(); // save the current transform matrix
			
			// set the font of the text (size and family)
			renderTarget.font = this.mFontString;
			
			// store the current alpha value
			var oldAlpha = renderTarget.globalAlpha;
			
			// 
			var oldComp = renderTarget.globalCompositeOperation;
			renderTarget.globalCompositeOperation = this.mCompositeOp;
			
			var trans = new Matrix3(); trans.Copy(this.mTransformation); // create a copy of our current transformation matrix
			
			{ // apply basic transformations first (in reverse order)
				// translate to current position offsetting by the origin (happens last)
				trans.Translate(new Vec2(this.mPos.mX - this.mOrigin.mX, this.mPos.mY - this.mOrigin.mY));
				
				trans.Translate(new Vec2(this.mOrigin.mX,  this.mOrigin.mY)); // translate back from the origin
				trans.Rotate(this.mRotation); // apply rotation (after scaling is done)
				trans.Skew(this.mSkew);
				trans.Scale(this.mScale); // apply scale first (to scale in x and y axes as defined by the texture)
				trans.Translate(new Vec2(-this.mOrigin.mX, -this.mOrigin.mY)); // translate to the origin
			}
			
			{ // apply the transformation matrix
				var a = trans.mArray[0][0];
				var b = trans.mArray[1][0];
				var c = trans.mArray[0][1];
				var d = trans.mArray[1][1];
				var e = trans.mArray[0][2];
				var f = trans.mArray[1][2];
				
				renderTarget.transform(a, b, c, d, e, f);
			}
			
			var shadowColour = "rgba(0, 0, 0, 0)"; // the default shadow colour is black and transparent
			if (this.mShadow == true) { // if shadow is enabled
				// update the shadow string
				shadowColour = "rgba(" + parseInt(this.mShadowColour.substr(1, 2), 16) + ", " +
						parseInt(this.mShadowColour.substr(3, 2), 16) + ", " +
						parseInt(this.mShadowColour.substr(5, 2), 16) + ", " + this.mShadowAlpha + ")";
				
				// set the other attributes of the shadow
				renderTarget.shadowBlur = this.mShadowBlur;
				renderTarget.shadowOffsetX = this.mShadowOffset.mX;
				renderTarget.shadowOffsetY = this.mShadowOffset.mY;
			}
			
			renderTarget.fillStyle = this.mColour; // set the colour of the filled text
			renderTarget.strokeStyle = this.mOutlineColour; // set the colour of the outline
			renderTarget.lineWidth = this.mOutlineWidth; // set the outline width
			
			for (var i = 0; i < this.mTextParts.length; ++i) { // for all text parts
				// set the shadow colour and alpha value of the filled text
				renderTarget.shadowColor = shadowColour;
				renderTarget.globalAlpha = this.mAlpha;
				
				// draw filled text
				renderTarget.fillText(this.mTextParts[i].mString, this.mTextParts[i].mPos.mX, this.mTextParts[i].mPos.mY);
				
				if (this.mOutline == true) { // if we are to do an outline
					// set the shadow colour and alpha value of the filled text
					renderTarget.shadowColor = "rgba(0, 0, 0, 0)"; // no shadow
					renderTarget.globalAlpha = this.mOutlineAlpha;
					
					// draw the outline
					renderTarget.strokeText(this.mTextParts[i].mString, this.mTextParts[i].mPos.mX, this.mTextParts[i].mPos.mY);
				}
			}
			
			renderTarget.globalAlpha = oldAlpha; // restore the old alpha value
			renderTarget.globalCompositeOperation = oldComp; // restore the saved composite value
			renderTarget.restore(); // load the saved transform matrix
		}
	}
}

Text.prototype.UpdateGlobalBoundingBox = function() {
	this.mGlobalBoundingBox.Copy(this.mLocalBoundingBox); // reset the global bbox to the local bbox
	
	var trans = new Matrix3(); trans.Copy(this.mTransformation); // create a copy of our current transformation matrix
	
	{ // apply basic transformations first (in reverse order)
		if (this.mAlign == "centre") {
			this.mGlobalBoundingBox.mPos.mX -= Math.round(this.mSize.mX / 2);
		}
		else if (this.mAlign == "right") {
			this.mGlobalBoundingBox.mPos.mX -= this.mSize.mX;
		}
		
		// translate to current position offsetting by the origin (happens last)
		trans.Translate(new Vec2(this.mPos.mX - this.mOrigin.mX, this.mPos.mY - this.mOrigin.mY));
		
		trans.Translate(new Vec2(this.mOrigin.mX,  this.mOrigin.mY)); // translate back from the origin
		trans.Rotate(this.mRotation); // apply rotation (after scaling is done)
		trans.Skew(this.mSkew);
		trans.Scale(this.mScale); // apply scale first (to scale in x and y axes as defined by the texture)
		trans.Translate(new Vec2(-this.mOrigin.mX, -this.mOrigin.mY)); // translate to the origin
	}
	
	this.mGlobalBoundingBox.Transform(trans); // transform the global bbox by the transformation matrix
	
	// clear the global bbox and replace it with an axis-aligned bbox using its bounds
	var bounds = this.mGlobalBoundingBox.GetBounds();
	this.mGlobalBoundingBox.Clear();
	this.mGlobalBoundingBox.mPos.Set(bounds[0].mX, bounds[0].mY);
	this.mGlobalBoundingBox.AddPoint(new Vec2(bounds[1].mX - bounds[0].mX, 0));
	this.mGlobalBoundingBox.AddPoint(new Vec2(bounds[1].mX - bounds[0].mX, bounds[1].mY - bounds[0].mY));
	this.mGlobalBoundingBox.AddPoint(new Vec2(0, bounds[1].mY - bounds[0].mY));
}

Text.prototype.UpdateGlobalMask = function() {
	this.mGlobalMask.Copy(this.mLocalMask); // reset the global mask to the local mask
	
	var trans = new Matrix3(); trans.Copy(this.mTransformation); // create a copy of our current transformation matrix
	
	{ // apply basic transformations first (in reverse order)
		if (this.mAlign == "centre") {
			this.mGlobalMask.mPos.mX -= Math.round(this.mSize.mX / 2);
		}
		else if (this.mAlign == "right") {
			this.mGlobalMask.mPos.mX -= this.mSize.mX;
		}
		
		// translate to current position offsetting by the origin (happens last)
		trans.Translate(new Vec2(this.mPos.mX - this.mOrigin.mX, this.mPos.mY - this.mOrigin.mY));
		
		trans.Translate(new Vec2(this.mOrigin.mX,  this.mOrigin.mY)); // translate back from the origin
		trans.Rotate(this.mRotation); // apply rotation (after scaling is done)
		trans.Skew(this.mSkew);
		trans.Scale(this.mScale); // apply scale first (to scale in x and y axes as defined by the texture)
		trans.Translate(new Vec2(-this.mOrigin.mX, -this.mOrigin.mY)); // translate to the origin
	}
	
	this.mGlobalMask.Transform(trans); // transform the global mask by the transformation matrix
}

// sets the font of the text to the supplied font object reference
Text.prototype.SetFont = function(font) {
	this.mFont = font; // set the font
	this.mFontString = String(this.mFontSize) + "px " + this.mFont.mFontName; // create the internal font string
	
	this.CreateTextParts(); // need to recreate the text parts when a new  font is set (due to sizing)
}

// returns this text objects font reference
Text.prototype.GetFont = function() {
	return this.mFont;
}

// sets the size of the text
Text.prototype.SetFontSize = function(size) {
	this.mFontSize = size; // set the font size
	this.mFontString = String(this.mFontSize) + "px " + this.mFont.mFontName; // create the internal font string
	
	this.CreateTextParts(); // need to recreate the text parts when a new font size is set
}

// returns the size of this text objects font
Text.prototype.GetFontSize = function() {
	return this.mFontSize;
}

// 
Text.prototype.GetFontString = function() {
	return this.mFontString;
}

// sets the text's string value
Text.prototype.SetString = function(string) {
	this.mString = string; // set the string value
	
	this.CreateTextParts(); // need to recreate the text parts when a new string is set
}

// enables wrapping, setting the wrap width and minimum word split length (for hyphenation) if supplied
Text.prototype.EnableWrapping = function(width, minSplit) {
	if (width != null) { // if a width was supplied
		this.mWrapWidth = width; // set it
	}
	
	if (minSplit != null) { // if a minimum split length was supplied
		this.mWrapWordLength = minSplit; // set it
	}
	
	this.mWrap = true; // enable wrapping
	this.CreateTextParts();
}

// disables text wrapping
Text.prototype.DisableWrapping = function() {
	this.mWrap = false;
	this.CreateTextParts();
}

Text.prototype.CreateTextParts = function() {
	this.mTextParts.splice(0, this.mTextParts.length);
	
	var old = nmain.game.mCurrContext.font; // store the current font
	nmain.game.mCurrContext.font = this.mFontString; // set the current font to this font
	
	var txtArr = new Array();
	var blockArr = this.mString.split("\n"); // split the text at any new line characters 
	
	if (this.mWrap == true) { // if text wrap is enabled
		for (var i = 0; i < blockArr.length; ++i) { // for all current text strings ("\n" delimited)
			var blockArrNew = new Array(); // an array to hold our new text strings
			
			var split = blockArr[i].split(" "); // split at " " (space)
			var str = ""; // our new string
			var width = 0; // our new string's width
			
			// for all current 'words' (" " delimited)
			for (var j = 0; j < split.length; ++j) {
				// if the current width + the width of the current 'word' (" " delimited) is less than the specified wrap width
				if (width + nmain.game.mCurrContext.measureText(split[j]).width <= this.mWrapWidth) {
					str += split[j]; // add the current 'word' to the new string
					str += " "; // add a space to the new string
					width = nmain.game.mCurrContext.measureText(str).width; // calculate the new width of the new string
				}
				else { // otherwise it is larger
					var minimumSplit = this.mWrapWordLength; // copy the hyphenation limit
					if (minimumSplit < 6) { // if it is less than the minimum
						minimumSplit = 6; // set it to the minimum
					}
					
					// if the string is empty and the word - split or not - will never fit then we must avoid an infinite loop
					// this happens if the wrapwidth is too small, so just place the word anyway and got to next line
					if (str == "" &&
							((split[j].length < minimumSplit && util.MeasureText(nmain.game.mCurrContext, split[j]).width > this.mWrapWidth) ||
							(split[j].length >= minimumSplit && util.MeasureText(nmain.game.mCurrContext, split[j].substr(0, 3) + "-").width > this.mWrapWidth))) {
						
						str = split[j] + " "; // set the string to the current word (inc. space)
						++j; // increment j (will be decremented later)
					}
					else {
						if (split[j].length >= minimumSplit) { // if the current word is at least the minimum split length (min is 6)
							var strFront = split[j].substr(0, 3) + "-"; // the front part of the cut string (inc. hyphen)
							var spaceLeft = this.mWrapWidth - width; // the amount of space left on the current line (in pixels)
							
							// if the front string (minimum of 3 chars + hyphen) fits
							if (nmain.game.mCurrContext.measureText(strFront).width <= spaceLeft) {
								var cutPos = 0; // the position to cut the string
								for (var k = 3; k < split[j].length - 2; ++k) { // for all characters in the string (except last 3)
									var strTest = split[j].substr(0, k) + "-"; // create new test string (inc. hyphen)
									
									// if new test string + hyphen no longer fits in the leftover space
									if (nmain.game.mCurrContext.measureText(strTest).width > spaceLeft) {
										break; // we're done
									}
									else {
										strFront = strTest; // set the front string to the test string
										cutPos = k; // update the cut position
									}
								}
								
								str += strFront + " "; // add the front string to the current string
								split[j] = split[j].substr(cutPos, split[j].length - 3); // update the current word to the leftover
							}
						}
					}
					
					str = str.substr(0, str.length - 1); // remove the trailing space (there will always be one)
					blockArrNew.push(str); // add the new string to the array
					str = ""; // reset the new string
					width = 0; // reset the width
					--j; // decrement iterator so we repeat the current 'word'
				}
			}
			
			// when we reach here, if width is greater than 0, then we still have a string to push
			if (width > 0) {
				str = str.substr(0, str.length - 1); // remove the trailing space (there will always be one)
				blockArrNew.push(str); // add the final string
			}
			
			txtArr.push(blockArrNew); // add the wrapped text block
		}
	}
	else { // otherwise no wrapping
		txtArr.push(blockArr); // just add the line
	}
	
	var vAlign = 0; // the vertical alignment of each text line (line number)
	var longest = 0; // the current longest line (for multi-line text)
	var totalHeight = 0; // the total height of the entire text
	
	// find the amount that each line of the text should be incremented by
	var heightInc = util.MeasureText(nmain.game.mCurrContext, "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz").height;
	
	for (var i = 0; i < txtArr.length; ++i) { // for all delimited text strings
		var currentBlock = txtArr[i]; // get the current text block
		
		for (var j = 0; j < currentBlock.length; ++j) { // for all words in the current text block
			var strSize = util.MeasureText(nmain.game.mCurrContext, currentBlock[j]);
			if (strSize.width > longest) { // if it is longer than previously stored longest
				longest = strSize.width; // set it as the stored longest
			}
			
			totalHeight += strSize.height;
			
			// if alignment is (justify and text is wrapped) AND (this is not the last line)
			if ((this.mAlign == "justify" && this.mWrap == true) && (j != currentBlock.length - 1)) {
				// split the current line into individual words
				var spacingArr = new Array();
				spacingArr = currentBlock[j].split(" ");
				
				var hAlign = 0; // the current orizontal offset
				
				var spaceLeft = this.mWrapWidth; // the amount of space left at the end of the line (wrap width which is the maximum)
				for (var k = 0; k < spacingArr.length; ++k) { // for all words in the line
					spaceLeft -= nmain.game.mCurrContext.measureText(spacingArr[k]).width; // remove their width from the space left
				}
				
				var gap = spaceLeft / (spacingArr.length - 1); // divide the space left by the number of words
				
				for (var k = 0; k < spacingArr.length; ++k) { // for all words in the line
					{
						var tp = new TextPart(); // the new text part object
						tp.mString = spacingArr[k]; // set the string to the current word
						
						// set the position to the horizontal offset and the vertical offset * line number
						// the y pos also gets modified by the vertical spacing modifier, and starts at font size
						// to fix the origin (javascript sets it to bottom left which doesn't match the engine default)
						tp.mPos.Set(hAlign, this.mFontSize + ((heightInc * vAlign) * this.mVSpacing));
						
						this.mTextParts.push(tp); // add the new text part to the array
					}
					
					// move the horizontal offset by the current word length and the justified gap
					hAlign += nmain.game.mCurrContext.measureText(spacingArr[k]).width;
					hAlign += gap;
				}
				
				++vAlign; // increment the vertical alignment
			}
			else { // otherwise text is to long to be justified
				var hAlign = 0; // assume alignment is at the left point of the text string initially
				
				// if alignment is centred
				if (this.mAlign == "centre") {
					// set alignment to the centre point of the text string
					hAlign = Math.round(0 - (nmain.game.mCurrContext.measureText(currentBlock[j]).width / 2));
				}
				else if (this.mAlign == "right") { // else if align is right aligned
					// set alignment to the right point of the text string
					hAlign = Math.round(0 - nmain.game.mCurrContext.measureText(currentBlock[j]).width);
				}
				
				{
					var tp = new TextPart(); // the new text part object
					tp.mString = currentBlock[j]; // set the string to the current line
					
					// set the position to the horizontal offset and the vertical offset * line number
					// the y pos also gets modified by the vertical spacing modifier, and starts at font size
					// to fix the origin (javascript sets it to bottom left which doesn't match the engine default)
					tp.mPos.Set(hAlign, this.mFontSize + ((heightInc * vAlign) * this.mVSpacing));
					
					this.mTextParts.push(tp); // add the new text part to the array
				}
				
				++vAlign; // increment the vertical alignment
			}
		}
	}
	
	{	
		this.mSize.mX = longest; // set the size to the longest line
		this.mSize.mY = totalHeight * this.mVSpacing; // set the height to the total height modified by the vertical spacing modifier
		
		// if wrapping is enabled and the width is wider than the longest line
		if (this.mWrap == true && this.mWrapWidth > longest) {
			this.mSize.mX = this.mWrapWidth; // set the size to the wrapping width
		}
	}
	
	nmain.game.mCurrContext.font = old; // restore the stored font
	
	// recreate the local bounding box
	this.mLocalBoundingBox.Clear();
	this.mLocalBoundingBox.mPos.Set(0, 0);
	this.mLocalBoundingBox.AddPoint(new Vec2(this.mSize.mX,             0));
	this.mLocalBoundingBox.AddPoint(new Vec2(this.mSize.mX, this.mSize.mY));
	this.mLocalBoundingBox.AddPoint(new Vec2(            0, this.mSize.mY));
	
	this.UpdateGlobalBoundingBox();
}
// ...End

