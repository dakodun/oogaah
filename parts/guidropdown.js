// GUIDropDown Class...
function GUIDropDown() {
	this.mPos = new Vec2(0, 0); // the position of the drop-down list
	this.mBase = new GUIButton(); // the button representing a single item in the drop-down list (used for interaction)
	
	this.mItems = new Array(); // an array of buttons representing items in the drop-down (used for interaction)
	this.mItemsText = new Array(); // the text to be shown on an item in the items array
	
	this.mExpanded = false; // is the drop-down list expanded
	
	this.mHover = false; // is the user hovering over any of the items in the drop-down list
};

// sets up initial attributes
GUIDropDown.prototype.SetUp = function(baseButton) {
	this.mPos.Copy(baseButton.mPos); // set the position to the buttons position
	this.mBase.Copy(baseButton); // copy the button to the base button
}

// handles the user input relating to the drop-down list
GUIDropDown.prototype.Input = function() {
	this.mBase.Input(); // process input for the base button
	
	if (this.mExpanded == true) { // if the list is expanded
		for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
			this.mItems[i].Input(); // process input
		}
	}
	
	if (this.mExpanded == true) { // if the list is expanded
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left)) { // if the left mouse button is pressed
			var thisClick = this.mBase.mHover; // set the hover status to the base hover status
			
			if (thisClick == false) { // if the base hover status is false
				for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
					thisClick = this.mItems[i].mHover; // set the hover status to the item's hover status
					if (thisClick == true) { // if hover status is now true
						break; // exit the loop
					}
				}
			}
			
			if (thisClick == false) { // if hover status is still false after looping all items
				this.mExpanded = !this.mExpanded; // collapse the drop-down list (click was outside all item's in the list)
			}
		}
	}
}

// processes the logic relating to drop-down list interaction
GUIDropDown.prototype.Process = function(point) {
	this.mBase.Process(point); // process the base button
	
	if (this.mBase.OnClick() == true) { // if the base button was clicked
		this.mExpanded = !this.mExpanded; // toggle expanded state
	}
	
	if (this.mExpanded == true) { // if the list is expanded
		for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
			this.mItems[i].Process(point); // process the item
		}
	}
	
	{
		this.mHover = false;
		
		if (this.mBase.mHover == true) {
			this.mHover = true;
		}
		else {
			for (var i = 0; i < this.mItems.length; ++i) {
				if (this.mExpanded == true) {
					if (this.mItems[i].mHover == true) {
						this.mHover = true;
						break;
					}
				}
				else {
					this.mItems[i].mOnClick = false;
				}
			}
		}
	}
}

// returns the correct data to render the drop-down list's current state
GUIDropDown.prototype.GetRenderData = function() {
	var arr = new Array(); // the array to hold our renderable objects
	
	if (this.mExpanded == true) { // if the list is expanded
		arr.push(this.mBase.mSpriteDown); // add the 'down' sprite of the base button
		
		for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
			arr = util.ConcatArray(arr, this.mItems[i].GetRenderData()); // get the appropiate render data (button)
		}
		
		for (var i = 0; i < this.mItemsText.length; ++i) { // for all item text in the list
			arr.push(this.mItemsText[i]); // add the text
		}
	}
	else {
		arr = util.ConcatArray(arr, this.mBase.GetRenderData()); // otherwise not expanded so get the appropiate base render data (button)
	}
	
	return arr; // return the renderable objects
}

// returns click status for the supplied item
GUIDropDown.prototype.OnClick = function(itemID) {
	if (itemID >= 0 && itemID < this.mItems.length) { // if the supplied id is within proper bounds
		if (this.mItems[itemID].OnClick()) { // if the supplied item was clicked
			this.mExpanded = false; // collapse the list
			return true; // return success
		}
	}
	
	return false; // return failure
}

// returns the position of the sprites (base idle only) [deprecated]
GUIDropDown.prototype.GetSpritePositions = function() {
	return this.mBase.mSpriteIdle.mPos;
}

// sets the positions of all of the sprites
GUIDropDown.prototype.SetSpritePositions = function(pos) {
	// get the difference between new position and current position
	var posDif = new Vec2(0, 0);
	posDif.Copy(this.mBase.GetSpritePositions());
	posDif.Set(pos.mX - posDif.mX, pos.mY - posDif.mY);
	
	this.mBase.SetSpritePositions(pos); // set the base position
	
	for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
		{ // update the item position by the difference
			var newPos = new Vec2(0, 0);
			newPos.Copy(this.mItems[i].GetSpritePositions());
			newPos.mX += posDif.mX; newPos.mY += posDif.mY;
			this.mItems[i].SetSpritePositions(newPos);
		}
		
		{ // update the text position by the difference
			var newPos = new Vec2(0, 0);
			newPos.Copy(this.mItemsText[i].mPos);
			newPos.mX += posDif.mX; newPos.mY += posDif.mY;
			this.mItemsText[i].mPos.Copy(newPos);
		}
	}
}

// sets the depths of all of the sprites
GUIDropDown.prototype.SetSpriteDepths = function(depth) {
	this.mBase.SetSpriteDepths(depth);
	
	for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
		this.mItems[i].SetSpriteDepths(depth);
	}
}

// adds an item to the drop-down list
GUIDropDown.prototype.AddItem = function(itemButton, text) {
	// make a copy of the button
	var but = new GUIButton();
	but.Copy(itemButton);
	
	// make a copy of the text
	var txt = new Text();
	txt.Copy(text);
	txt.mAbsolute = true;
	
	var newPos = new Vec2(0, 0); // the position of the new item (offset by previous items)
	
	if (this.mItems.length == 0) { // if this is the first item
		// set position to base and offset by base height
		newPos.Copy(this.mBase.mSpriteIdle.mPos);
		newPos.mY += this.mBase.mSize.mY;
	}
	else {
		// set position to previous item's and offset by previous item's height
		var id = this.mItems.length - 1;
		newPos.Copy(this.mItems[id].mPos);
		newPos.mY += this.mItems[id].mSize.mY;
	}
	
	// update the new button's position
	but.mPos.mX += newPos.mX; but.mPos.mY += newPos.mY;
	but.SetSpritePositions(but.mPos);
	
	// update the new text's position
	txt.mPos.mX += newPos.mX; txt.mPos.mY += newPos.mY;
	
	// add the new item to the list(s)
	this.mItems.push(but);
	this.mItemsText.push(txt);
}
// ...End

