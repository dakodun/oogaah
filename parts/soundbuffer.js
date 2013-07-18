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
SoundBuffer.prototype.LoadFromFile = function(source) {
	this.mAud.mLoaded = "";
	
	var supportTest = new Audio();
	if (supportTest.canPlayType("audio/wav") != "") {
		this.mAud.src = source + ".wav";
	}
	else {
		this.mAud.src = source + ".aac";
	}
}
// ...End

