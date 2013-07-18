// OogaahLogEntry class
// an entry into the play log
function OogaahLogEntry() {
	this.mType = 0; // the type of entry, used when checking if entry should be shown (due to user options)
	this.mIcon = new Sprite(); // the icon that is displayed next to the entry (corellation with type)
	this.mString = new Text(); // the string the comprises the log entry
};
// ...End


// OogaahPlayLog class
// a visible log of all the actions taking place in the current game (player defineable)
function OogaahPlayLog() {
	this.mPos = new Vec2(); // base position of the log (elements are offset by this)
	
	this.mLogCanvas = new RenderCanvas(); // the canvas that the log is rendered too
	this.mLogTab = new Polygon(); // tab used to show and hide the log
	this.mCamera = new SimpleCamera(); // camera used when rendering the log to offset by scroll amount
	
	this.mLogEntries = new Array(); // array that holds all of the current log entries
	
	this.mIconCount = 11; // the number of icons
	this.mIcons = new Array(); // missing, play, pass, yes, no, ability, skirmish win
	
	this.mLogBack = new Sprite(); // back image of the log
	this.mLogFront = new Sprite(); // front image of the log
	this.mLogScrollMarker = new Shape(); // scrollbar used to scroll through the log
	
	this.mLogSize = 0; // the size (height) of the play log (i.e., the size of all entries, not the size shown on screen)
	
	this.mLogHighlight = false; // is the log highlighted
	this.mLogTabHighlight = false; // is the tab being highlighted
	this.mLogScrollMarkerHighlight = false; // is the scrollbar highlighted
	this.mLogTabGrab = false; // has the tab been grabbed
	this.mLogTabMouseX = 0; // the stored x value used when moving the play log via the tab
	this.mLogScrollMarkerGrab = false; // has the scroll bar been grabbed
	this.mLogScrollMarkerMouseY = 0; // the stored y value used when scrolling the log via the scrollbar
	
	this.mLoggedActions = new Array(); // array of bools that decide if a certain log action should be shown
	for (var i = 0; i < this.mIconCount; ++i) { // missing, play, pass, yes, no, ability, skirmish win, 1st, 2nd, 3rd, 4th
		this.mLoggedActions.push(true);
	}
};

// initiate the log
OogaahPlayLog.prototype.SetUp = function() {
	var texIcon = nmgrs.resMan.mTexStore.GetResource("logIcons"); // the texture containing the icons for the play log
	
	for (var i = 0; i < this.mIconCount; ++i) { // for all icons
		this.mIcons[i] = new Sprite(); // create a new sprite
		this.mIcons[i].SetTexture(texIcon, this.mIconCount + (3 - (this.mIconCount % 3)), 3, -1, -1); // set texture
		this.mIcons[i].SetCurrentFrame(i); // set the frame the corresponds with the current icon
	}
	
	this.mPos.Set(480, 110); // set the base position
	
	// set up the render canvas
	this.mLogCanvas.SetPosition(this.mPos);
	this.mLogCanvas.SetSize(new Vec2(160, 250));
	this.mLogCanvas.mAbsolute = true;
	this.mLogCanvas.mDepth = -50;
	
	{ // set up the log mask
		var mask = new Polygon();
		mask.mPos.Set(-20, -10);
		mask.AddPoint(new Vec2(180,   0));
		mask.AddPoint(new Vec2(180, 270));
		mask.AddPoint(new Vec2(  0, 270));
		
		this.mLogCanvas.SetMask(mask);
		
		// set up the log tab
		this.mLogTab.mPos.Set(this.mPos.mX - 42, this.mPos.mY + 84);
		this.mLogTab.AddPoint(new Vec2(28,  0));
		this.mLogTab.AddPoint(new Vec2(28, 84));
		this.mLogTab.AddPoint(new Vec2( 0, 84));
		this.mLogTab.mDepth = -50;
	}
	
	// set up the log back graphic
	var texBack = nmgrs.resMan.mTexStore.GetResource("logBack");
	this.mLogBack.SetTexture(texBack);
	this.mLogBack.SetPosition(new Vec2(this.mPos.mX - 42, this.mPos.mY - 10));
	this.mLogBack.mDepth = -45;
	
	// set up the log front graphics
	var texFront = nmgrs.resMan.mTexStore.GetResource("logFront");
	this.mLogFront.SetTexture(texFront);
	this.mLogFront.SetPosition(new Vec2(this.mPos.mX - 42, this.mPos.mY - 10));
	this.mLogFront.mDepth = -55;
	
	// set up the log scrollbar
	this.mLogScrollMarker.mPos.Set(this.mPos.mX - 10, this.mPos.mY);
	this.mLogScrollMarker.AddPoint(new Vec2(6, 0));
	this.mLogScrollMarker.AddPoint(new Vec2(6, 250));
	this.mLogScrollMarker.AddPoint(new Vec2(0, 250));
	this.mLogScrollMarker.SetMask();
	this.mLogScrollMarker.mDepth = -50;
	this.mLogScrollMarker.mColour = "#FBF9E8";
}

// handle user interaction with the log
OogaahPlayLog.prototype.Input = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (currScene.mPaused == false) { // if the scene isn't paused
		// if the log is being highlighted and log is scrollable
		if (this.mLogHighlight == true && this.mLogSize > this.mLogCanvas.mSize.mY) {
			var wheelDelta = nmgrs.inputMan.GetMouseWheel(); // the amount the wheel has been scrolled
			var amount = Math.abs(wheelDelta); // the absolute value of wheel scroll
			
			if (wheelDelta > 0) { // if mouse wheel was scrolled down
				// if the camera translation is less than the max value
				if (this.mCamera.mPos.mY < (this.mLogSize - this.mLogCanvas.mSize.mY - (26 * amount))) {
					this.mCamera.mPos.mY += 26 * amount; // translate the camera
					this.UpdateCanvas(); // redraw the log canvas
				}
				else if (this.mCamera.mPos.mY != (this.mLogSize - this.mLogCanvas.mSize.mY)) { // otherwise if it's not already max
					this.mCamera.mPos.mY = (this.mLogSize - this.mLogCanvas.mSize.mY); // set it to max value
					this.UpdateCanvas(); // redraw the log canvas
				}
			}
			else if (wheelDelta < 0) { // otherise if mouse wheel was scrolled up
				if (this.mCamera.mPos.mY > 26 * amount) {
					this.mCamera.mPos.mY -= 26 * amount;
					this.UpdateCanvas();
				}
				else if (this.mCamera.mPos.mY != 0) {
					this.mCamera.mPos.mY = 0;
					this.UpdateCanvas();
				}
			}
		}
		
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if LMB is pressed
			if (this.mLogTabHighlight == true && this.mLogTabGrab == false) { // if log tab is highlighted and isn't grabbed
				this.mLogTabGrab = true; // indicate log tab was grabbed
				this.mLogTabMouseX = nmgrs.inputMan.GetLocalMouseCoords().mX; // store current mouse x coord
			}
			
			if (this.mLogScrollMarkerHighlight == true && this.mLogScrollMarkerGrab == false) { // if scrollbar is highlighted and isn't grabbed
				this.mLogScrollMarkerGrab = true; // indicate scrollbar was grabbed
				this.mLogScrollMarkerMouseY = nmgrs.inputMan.GetLocalMouseCoords().mY; // store current mouse y coord
				this.mLogScrollMarker.mColour = "#A79C63"
			}
		}
		else if (nmgrs.inputMan.GetMouseReleased(nmouse.button.code.left) == true) { // if LMB is released
			// reset grab status
			this.mLogTabGrab = false;
			this.mLogScrollMarkerGrab = false;
			this.mLogScrollMarker.mColour = "#F7F2AE"
		}
	}
	else { // otherwise if scene paused
		// reset grab status
		this.mLogTabGrab = false;
		this.mLogScrollMarkerGrab = false;
		this.mLogScrollMarker.mColour = "#F7F2AE"
	}
}

// process the log
OogaahPlayLog.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to current scene
	
	if (currScene.mPaused == false) { // if the current scene isn't paused
		{ // highlighting logic
			// assume nothing is highlighted initially
			this.mLogHighlight = false;
			this.mLogTabHighlight = false;
			this.mLogScrollMarkerHighlight = false;
			
			var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get the cursor position
			
			{ // handle log highlighting
				// get top left and bottom right coordinates of the bounding box
				var bounds = this.mLogCanvas.mGlobalMask.GetBounds();
				var tl = bounds[0];
				var br = bounds[1];
				
				if (util.PointInRectangle(p, tl, br) == true) { // if mouse is inside log bounding box
					this.mLogHighlight = true; // log is highlighted
				}
			}
			
			{ // handle log tab highlighting
				var bounds = this.mLogTab.GetBounds();
				var tl = bounds[0];
				var br = bounds[1];
				
				if (util.PointInRectangle(p, tl, br) == true) { // if mouse is inside log tab bounding box
					this.mLogTabHighlight = true; // log tab is highlighted
				}
			}
			
			{ // handle scrollbar highlighting
				var bounds = this.mLogScrollMarker.mGlobalMask.GetBounds();
				var tl = bounds[0];
				var br = bounds[1];
				
				if (util.PointInRectangle(p, tl, br) == true) { // if mouse is inside log tab bounding box
					this.mLogScrollMarkerHighlight = true; // scrollbar is highlighted
					
					if (this.mLogScrollMarkerGrab == false) {
						this.mLogScrollMarker.mColour = "#F7F2AE"
					}
				}
				else {
					if (this.mLogScrollMarkerGrab == false) {
						this.mLogScrollMarker.mColour = "#FBF9E8"
					}
					else {
						this.mLogScrollMarker.mColour = "#A79C63"
					}
				}
			}
		}
		
		{
			if (this.mLogTabGrab == true) { // if log tab has been grabbed
				// get the difference in current and stored mouse value
				var diff = nmgrs.inputMan.GetLocalMouseCoords().mX - this.mLogTabMouseX;
				
				if (diff != 0) { // if there is a difference
					if (this.mPos.mX + diff < 480) { // if the new position is less than the min
						diff -= (this.mPos.mX + diff) - 480; // adjust difference value
						this.mPos.mX = 480; // set to the min
					}
					else if (this.mPos.mX + diff > 660) { // otherwise if new position is greater than the max
						diff -= (this.mPos.mX + diff) - 660;
						this.mPos.mX = 660; // set to the max
					}
					else {
						this.mPos.mX += diff; // apply the difference to the position
					}
					
					this.mLogTabMouseX += diff; // adjust the stored mouse value by the adjusted difference value
					
					// update the positons of all of the elements that make up the play log
					this.mLogCanvas.SetPosition(new Vec2(this.mPos.mX, this.mLogCanvas.mPos.mY));
					this.mLogBack.SetPosition(new Vec2(this.mPos.mX - 42, this.mLogBack.mPos.mY));
					this.mLogFront.SetPosition(new Vec2(this.mPos.mX - 42, this.mLogFront.mPos.mY));
					this.mLogScrollMarker.SetPosition(new Vec2(this.mPos.mX - 10, this.mLogScrollMarker.mPos.mY));
					this.mLogTab.mPos.mX = this.mPos.mX - 42;
				}
			}
			
			if (this.mLogScrollMarkerGrab == true) {
				var diff = nmgrs.inputMan.GetLocalMouseCoords().mY - this.mLogScrollMarkerMouseY;
				
				if (diff != 0) {
					// the max value (y position) of the scrollbar
					var max = (this.mPos.mY + this.mLogCanvas.mSize.mY) -
							(this.mLogScrollMarker.mSize.mY * this.mLogScrollMarker.mScale.mY);
					
					if (this.mLogScrollMarker.mPos.mY + diff < this.mPos.mY) {
						diff -= (this.mLogScrollMarker.mPos.mY + diff) - this.mPos.mY;
						this.mLogScrollMarker.SetPosition(new Vec2(this.mLogScrollMarker.mPos.mX, this.mPos.mY));
					}
					else if ((this.mLogScrollMarker.mPos.mY + 0) + diff > max) {
						diff -= (this.mLogScrollMarker.mPos.mY + diff) - max;
						this.mLogScrollMarker.SetPosition(new Vec2(this.mLogScrollMarker.mPos.mX, max));
					}
					else {
						this.mLogScrollMarker.SetPosition(new Vec2(this.mLogScrollMarker.mPos.mX, this.mLogScrollMarker.mPos.mY + diff));
					}
					
					this.mLogScrollMarkerMouseY += diff;
					
					this.mCamera.mPos.mY += diff * (this.mLogSize / this.mLogCanvas.mSize.mY); // update the camera y translation
					this.UpdateCanvas(); // redraw the log canvas
				}
			}
		}
	}
}

// returns all renderables required to draw the log to the canvas
OogaahPlayLog.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	arr.push(this.mLogBack); // add the log back graphic
	arr.push(this.mLogCanvas); // add the log render canvas
	
	if (this.mLogSize > this.mLogCanvas.mSize.mY) { // if the lig size is greater than the render canvas size
		arr.push(this.mLogScrollMarker); // add the scrollbar
	}
	
	arr.push(this.mLogFront); // add the log front graphic
	
	return arr; // return the renderables array
}

// adds and entry to the log (type of entry [int], entry text [string])
OogaahPlayLog.prototype.AddEntry = function(type, string) {
	var entry = new OogaahLogEntry(); // create a new log entry
	
	if (type >= 0 && type < this.mIconCount) { // if type is valid
		entry.mType = type; // set entry type
		entry.mIcon.Copy(this.mIcons[type]); // copy appropiate icon to entry
	}
	else {
		entry.mIcon.Copy(this.mIcons[0]); // copy missing icon to entry
	}
	
	// set the entry's renderable text object
	var font = nmgrs.resMan.mFontStore.GetResource("monaco");
	entry.mString.SetFont(font);
	entry.mString.SetFontSize(16);
	entry.mString.mVSpacing = 0.9; // adjust vertical spacing
	entry.mString.EnableWrapping(155, 40) // enable text wrapping
	entry.mString.SetString("        " + string); // add offset to string (so icon fits)
	entry.mString.mColour = "#FFFFFF";
	
	this.mLogEntries.push(entry); // add the entry to the log entries array
	this.UpdateCanvas(); // redraw the canvas
}

// redraws the log to its render canvas
OogaahPlayLog.prototype.UpdateCanvas = function() {
	this.mLogCanvas.Clear(); // clear the render canvas
	this.mLogSize = 0; // reset the log size to 0
	
	var arr = new Array();
	var yPos = 0; // initial y offset is 0
	for (var i = this.mLogEntries.length - 1; i >= 0; --i) { // for all current entries in the log
		if (this.mLoggedActions[this.mLogEntries[i].mType] == true) { // if the current entry type is to be shown
			// set the y position of the current log entry using offset
			this.mLogEntries[i].mIcon.SetPosition(new Vec2(3, yPos));
			this.mLogEntries[i].mString.SetPosition(new Vec2(4, yPos - 3));
			
			// add the current entry to the array
			arr.push(this.mLogEntries[i].mIcon);
			arr.push(this.mLogEntries[i].mString);
			
			yPos += this.mLogEntries[i].mString.mSize.mY + 8; // increment y offset for next entry
			this.mLogSize += this.mLogEntries[i].mString.mSize.mY + 8; // increase the log size
		}
	}
	
	this.mLogCanvas.RenderTo(arr, this.mCamera); // render
	
	{
		if (this.mLogSize > this.mLogCanvas.mSize.mY) { // if the log size is bigger than the render canvas height
			var scale = this.mLogCanvas.mSize.mY / this.mLogSize; // get the current scale of canvas size to log size
			if (scale < 0.025) { // if scale is lower the the min
				scale = 0.025; // set it to the min
			}
			
			this.mLogScrollMarker.SetScale(new Vec2(1.0, scale)); // scale the scrollbar by the scale value
		}
		
		// the max position the scrollbar can move to
		var maxPos = this.mLogCanvas.mSize.mY - (this.mLogScrollMarker.mSize.mY * scale);
		
		// the percent value that the scrollbar has moved (towards max)
		var percent = this.mCamera.mPos.mY / (this.mLogSize - this.mLogCanvas.mSize.mY);
		
		this.mLogScrollMarker.SetPosition(new Vec2(this.mLogScrollMarker.mPos.mX, this.mPos.mY + (maxPos * percent))); // move the scrollbar to appropiate position
	}
}

// sets the which actions are to be shown in the log (from array)
OogaahPlayLog.prototype.SetLoggedActions = function(actions) {
	for (var i = 0; i < actions.length; ++i) { // for all items in the array
		this.mLoggedActions[i] = actions[i]; // set corresponding log action visibility
	}
	
	this.UpdateCanvas(); // redraw the canvas
}
// ...End

