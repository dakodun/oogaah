// GUIDOMElement Class...
function GUIDOMElement() {
	this.mGUIElement = null; // handle to the HTML5 element
	this.mName = ""; // name of the element
};
// ...End


// GUIDOMContainer Class...
function GUIDOMContainer() {
	this.mOldCanvas = new Vec2(0, 0); // position of the canvas last frame
	this.mOldCanvas.Copy(nmain.game.mCanvasPos);
	
	this.mElements = new Array(); // array containing the element belonging to this container
};

// processes the GUIDOM objects and updates the positions if necessary
GUIDOMContainer.prototype.Process = function() {
	for (var i = 0; i < this.mElements.length; ++i) { // for all elements
		this.mElements[i].mGUIElement.Process(); // process the elements logic
		
		// if the canvas position has changed
		if (this.mOldCanvas.mX != nmain.game.mCanvasPos.mX || this.mOldCanvas.mY != nmain.game.mCanvasPos.mY) {
			// update the element's position to match the change in the canvas' position
			var pos = new Vec2(0, 0); pos.Copy(this.mElements[i].mGUIElement.mPos);
			this.mElements[i].mGUIElement.SetPos(pos);
		}
	}
	
	this.mOldCanvas.Copy(nmain.game.mCanvasPos); // set the canvas' old position to its current position for next frame
}

// adds an element to the container
GUIDOMContainer.prototype.AddElement = function(element, elementName) {
	var found = false;
	for (var i = 0; i < this.mElements.length; ++i) { // for all elements in the container
		if (this.mElements[i].mName == elementName) { // if the requested name matches a stored name
			found = true; // indicate we found a match
			break; // quit the loop
		}
	}
	
	if (found == false) { // if not found
		var elem = new GUIDOMElement(); // create a new element container
		
		{ // create a new element of the proper type
			if (element.Type() == "GUIDOMButton") {
				elem.mGUIElement = new GUIDOMButton();
			}
			else if (element.Type() == "GUIDOMInputBox") {
				elem.mGUIElement = new GUIDOMInputBox();
			}
		}
		
        // copy the supplied element to the new element
		elem.mGUIElement.Copy(element);
		elem.mName = elementName;
		
        // add the element to the container and then to the document
		this.mElements.push(elem);
		var id = this.mElements.length - 1;
		document.body.appendChild(this.mElements[id].mGUIElement.mElement);
		
        // register callbacks for the new element
		this.mElements[id].mGUIElement.RegisterCallbacks();
	}
}

// removes and element from the container
GUIDOMContainer.prototype.RemoveElement = function(elementName) {
	var id = -1;
	for (var i = 0; i < this.mElements.length; ++i) { // for all elements in the container
		if (this.mElements[i].mName == elementName) { // if we have a match
			id = i; // set the id
			break; // quit the loop
		}
	}
	
	if (id >= 0) { // if the id is not negative (match was found)
		this.mElements[id].mGUIElement.UnregisterCallbacks(); // unregister previously registered callbacks
		
        // remove the element from the document and the container
		document.body.removeChild(this.mElements[id].mGUIElement.mElement);
		this.mElements.splice(id, 1);
	}
}

// returns an element from the container
GUIDOMContainer.prototype.GetElement = function(elementName) {
	for (var i = 0; i < this.mElements.length; ++i) { // for all elements in the container
		if (this.mElements[i].mName == elementName) { // if the requested element exists
			return this.mElements[i].mGUIElement; // return the requested element
		}
	}
	
	throw Exception("Resource not found."); // element doesn't exist
}

// removes all elements from the container and calls appropiate cleanup functions
GUIDOMContainer.prototype.Clear = function() {
	for (var i = 0; i < this.mElements.length; ++i) { // for all elements in the container
		this.mElements[i].mGUIElement.UnregisterCallbacks(); // remove any registered callbacks for the element
		
		document.body.removeChild(this.mElements[i].mGUIElement.mElement); // remove the element from the document
	}
	
	this.mElements.splice(0, this.mElements.length); // remove all elements from the container
}
// ...End

