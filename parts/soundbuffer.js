// SoundBuffer Class...
// 
function SoundBuffer() {
	this.mAud = new Audio();
	this.mAud.mLoaded = "";
	
	this.mAud.controls = false;
	this.mAud.loop = false;
	
	// called when the audio successfully loads
	this.mAud.oncanplay = function() {
		this.mLoaded = "load";
	}
	
	// called when the audio loading is cancelled
	this.mAud.onabort = function() {
		this.mLoaded = "abort";
	}
	
	// called when the audio fails to load
	this.mAud.onerror = function() {
		this.mLoaded = "error";
	}
};

// returns the type of this object for validity checking
SoundBuffer.prototype.Type = function() {
	return "SoundBuffer";
};

// loads a soundbuffer from a file
SoundBuffer.prototype.LoadFromFile = function(source, types) {
	this.mAud.mLoaded = ""; // reset the audio object's load status
	
	var arr = types.split(","); // delimit types at ","
	for (var i = 0; i < arr.length; ++i) { // for all types
		arr[i] = arr[i].replace(" ", ""); // remove superfluous spaces from type
		
		var supportTest = new Audio(); // create a new audio object for testing
		
		// if the current type is supported, try and load it
		if (supportTest.canPlayType && supportTest.canPlayType("audio/" + arr[i]) != "") {
			this.mAud.src = source + "." + arr[i]; // set the source file of the audio
			return; // success, exit the function
		}
	}
	
	this.mAud.mLoaded = "error"; // if we reach here, none of the formats were supported
}
// ...End

