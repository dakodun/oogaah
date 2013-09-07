// SoundBuffer Class...
// 
function SoundBuffer() {
	this.mAud = new Audio(); // the html5 audio element
	this.mAud.mLoaded = ""; // the audio element's load status
	
	// called when the audio successfully loads
	this.mAud.addEventListener("canplaythrough",  function(){this.mLoaded = "load"}, false);
	
	// called when the audio loading is cancelled
	this.mAud.addEventListener("abort",  function(){this.mLoaded = "abort"}, false);
	
	// called when the audio fails to load
	this.mAud.addEventListener("error",  function(){this.mLoaded = "error"}, false);
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

