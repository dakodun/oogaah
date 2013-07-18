// GUIButton Class...
function GUIButton() {
	this.mPos = new Vec2(0, 0); // the position of the clickable button area
	this.mSize = new Vec2(0, 0); // the size of the clickable button area
	
	this.mStatus = "idle"; // current status of the button
	
	// the various sprites for the various button states
	this.mSpriteIdle = new Sprite();
	this.mSpriteHover = new Sprite();
	this.mSpriteDown = new Sprite();
	this.mSpriteInactive = new Sprite();
	
	this.mActive = true; // is the button active (interactable)
	this.mHover = false; // is the button being hovered over (e.g., by the mouse)
	this.mDown = false; // is the button being held down
	
	this.mWasClicked = false; // was the button clicked since last frame (internal use)
	this.mOnClick = false; // was the button clicked
};

// copy constructor
GUIButton.prototype.Copy = function(other) {
	// copy "other"
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	
	this.mStatus = other.mStatus
	this.mSpriteIdle.Copy(other.mSpriteIdle);
	this.mSpriteHover.Copy(other.mSpriteHover);
	this.mSpriteDown.Copy(other.mSpriteDown);
	this.mSpriteInactive.Copy(other.mSpriteInactive);
	
	this.mActive = other.mActive;
	this.mHover = other.mHover;
	this.mDown = other.mDown;
	this.mWasClicked = other.mWasClicked;
}

// sets up the initial button attributes
GUIButton.prototype.SetUp = function(pos, size, depth) {
	this.mPos.Copy(pos); // set position
	this.mSize.Copy(size); // set size
	
	// set the initial positions and depths of the button sprites (and assume absolute)
	// the sprites can be altered individually later, after calling setup
	this.mSpriteIdle.SetPosition(pos);
	this.mSpriteIdle.mDepth = depth;
	this.mSpriteIdle.mAbsolute = true;
	
	this.mSpriteHover.SetPosition(pos);
	this.mSpriteHover.mDepth = depth;
	this.mSpriteHover.mAbsolute = true;
	
	this.mSpriteDown.SetPosition(pos);
	this.mSpriteDown.mDepth = depth;
	this.mSpriteDown.mAbsolute = true;
	
	this.mSpriteInactive.SetPosition(pos);
	this.mSpriteInactive.mDepth = depth;
	this.mSpriteInactive.mAbsolute = true;
}

// handles the user input relating to the button
GUIButton.prototype.Input = function() {
	if (this.mActive == true) { // if the button is currently active
		if (this.mHover == true) { // and the user is hovering over it
			if (nmgrs.inputMan.GetMouseReleased(nmouse.button.code.left)) { // if the left mouse button is released
				if (this.mDown == true) { // if the button was down previously
					this.mWasClicked = true; // then indicate (internally) that the button was clicked
					this.mDown = false; // reset down status
				}
			}
			else if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left)) { // else if the left mouse button is pressed
				this.mDown = true; // then indicate the button is down
			}
		}
		
		if (nmgrs.inputMan.GetMouseReleased(nmouse.button.code.left)) { // if the left mouse button is released with no hovering
			this.mDown = false; // reset down status
		}
	}
}

// processes the logic relating to button interaction
GUIButton.prototype.Process = function(point) {
	var pt = point;
	if (pt == null) {
		pt = nmgrs.inputMan.GetLocalMouseCoords();
	}
	
	if (this.mWasClicked == true) { // if the button was clicked previously
		this.mWasClicked = false; // reset internal click status
		this.mOnClick = true; // set external click status
	}
	else {
		this.mOnClick = false; // otherwise ensure external click status is false
	}
	
	if (this.mActive == true) { // if the button is active
		// get the bounding box of the button
		var tl = new Vec2(0, 0); tl.Copy(this.mPos);
		
		var br = new Vec2(0, 0); br.Copy(this.mPos);
		br.mX += this.mSize.mX; br.mY += this.mSize.mY;
		
		// check if the point specified is within the button's bounding box
		if (util.PointInRectangle(pt, tl, br)) {
			this.mHover = true; // set the hovering status
			if (this.mDown == false) { // if the button isn't previously down
				this.mStatus = "hover"; // then indicate we are hovering
			}
			else {
				this.mStatus = "down"; // otherwise 'down' status overrides 'hover' status
			}
		}
		else {
			this.mHover = false; // otherwise we aren't inside button
			this.mStatus = "idle"; // button is idle
		}
		
		
		// process the correct sprite depending on current status
		if (this.mStatus == "hover") {
			this.mSpriteHover.Process();
		}
		else if (this.mStatus == "down") {
			this.mSpriteDown.Process();
		}
		else {
			this.mSpriteIdle.Process();
		}
	}
	else {
		this.mSpriteInactive.Process(); // button is inactive
	}
}

// returns the correct data to render the button's current state
GUIButton.prototype.GetRenderData = function() {
	var arr = new Array(); // the array to hold our renderable objects
	
	if (this.mActive == true) { // if the button is active
		// add the correct sprite to the renderables array depending on the current state
		if (this.mStatus == "hover") {
			arr.push(this.mSpriteHover);
		}
		else if (this.mStatus == "down") {
			arr.push(this.mSpriteDown);
		}
		else {
			arr.push(this.mSpriteIdle);
		}
	}
	else {
		arr.push(this.mSpriteInactive); // button is inactive
	}
	
	return arr; // return the renderable objects
}

// returns button click status
GUIButton.prototype.OnClick = function() {
	return this.mOnClick;
}

// returns the position of the sprites (idle only) [deprecated]
GUIButton.prototype.GetSpritePositions = function() {
	return this.mSpriteIdle.GetPosition();
}

// sets the positions of all of the sprites
GUIButton.prototype.SetSpritePositions = function(pos) {
	this.mSpriteIdle.SetPosition(pos);
	this.mSpriteHover.SetPosition(pos);
	this.mSpriteDown.SetPosition(pos);
	this.mSpriteInactive.SetPosition(pos);
}

// sets the depths of all of the sprites
GUIButton.prototype.SetSpriteDepths = function(depth) {
	this.mSpriteIdle.mDepth = depth;
	this.mSpriteHover.mDepth = depth;
	this.mSpriteDown.mDepth = depth;
	this.mSpriteInactive.mDepth = depth;
}
// ...End

