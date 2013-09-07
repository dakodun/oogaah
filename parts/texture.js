// Texture Class...
// a texture (wrapper for javascript Image)
function Texture() {
	this.mImg = new Image(); // the image associated with our texture
	this.mImg.mLoaded = ""; // the load status of our image
	this.mTypes = new Array(); // a list of the file types to load
	
	// called when the image successfully loads
	this.mImg.addEventListener("load",  function(){this.mLoaded = "load"}, false);
	
	// called when the image loading is cancelled
	this.mImg.addEventListener("abort",  function(){this.mLoaded = "abort"}, false);
	
	// called when the image fails to load
	this.mImg.addEventListener("error",  function(){this.mLoaded = "error"}, false);
};

// returns the type of this object for validity checking
Texture.prototype.Type = function() {
	return "Texture";
}

// loads a texture from a file
Texture.prototype.LoadFromFile = function(source, types) {
	this.mImg.mLoaded = ""; // reset our loading status to blank
	
	if (types != null) {
		this.mTypes.splice(0, this.mTypes.length); // remove any stored types
		this.mTypes = types.split(","); // delimit types at ","
		
		for (var i = 0; i < this.mTypes.length; ++i) { // for all types
			this.mTypes[i] = this.mTypes[i].replace(" ", ""); // remove superfluous spaces from type
		}
	}
	
	if (this.mTypes.length > 0) { // if there is at least 1 type
		this.mImg.src = source + "." + this.mTypes[0]; // set the source file of the texture
		this.mTypes.splice(0, 1); // remove the current type
	}
	else {
		this.mImg.mLoaded = "error"; // otherwise no types were supplied
	}
}
// ...End

