// Sound Class...
function Sound() {
	this.mSndBuffer = null; // the associated sound buffer (sound element and source)
	this.mClone = null; // the clone of the sound, a copy of the sound buffer element used to allow multiple sounds to play at the same time
	
	this.mStatus = "stopped"; // the current internal status of the sound
	
	this.mLoop = false; // should the sound repeat when it is finished playing
	this.mVolume = 100; // the current volume (0 - 100)
};

// returns the type of this object for validity checking
Sound.prototype.Type = function() {
	return "Sound";
}

// process the status of the sound
Sound.prototype.Process = function() {
	if (this.mClone != null) { // if this sound has a clone (has been started)
		if (this.mClone.paused == true && this.mStatus != "paused") { // if the sound is stopped but not paused
			this.mStatus = "stopped"; // the sound has finished
			this.mClone = null; // remove the clone
		}
	}
}

// sets the buffer (sound source)
Sound.prototype.SetSoundBuffer = function(sndBuff) {
	this.mSndBuffer = sndBuff;
}

// plays the sound
Sound.prototype.Play = function() {
	if (this.mStatus == "paused") { // if the sound is paused (was already playing previously)
		this.mClone.volume = this.mVolume / 100; // reset the volume
		this.mClone.loop = this.mLoop; // reset the loop status
		
		this.mClone.play(); // resume the sound
	}
	else {
		this.mClone = (this.mSndBuffer.mAud.cloneNode(true)); // create a clone of the sound element
		
		this.mClone.volume = this.mVolume / 100; // set the volume
		this.mClone.loop = this.mLoop; // set the loop status
		
		this.mClone.play(); // start the sound playing
		this.mStatus = "playing";
	}
}

// stops the sound
Sound.prototype.Stop = function() {
	if (this.mStatus == "playing") { // if the sound is playing
		this.mClone.pause(); // pause the clone
		this.mClone = null; // remove the clone
		this.mStatus = "stopped";
	}
}

// pauses the sound
Sound.prototype.Pause = function() {
	if (this.mStatus == "playing") { // if the sound is playing
		this.mClone.pause(); // pause the clone
		this.mStatus = "paused";
	}
}

// sets the volume of the sound
Sound.prototype.SetVolume = function(volume) {
	this.mVolume = volume; // set the volume
	
	if (this.mStatus == "playing") { // if the sound is already playing
		this.mClone.volume = this.mVolume / 100; // set the volume of the clone
	}
}

// should the sound repeat
Sound.prototype.SetLoop = function(loop) {
	this.mLoop = loop; // set the loop status
	
	if (this.mStatus == "playing") { // if the sound is already playing
		this.mClone.loop = this.mLoop; // set the status of the clone
	}
}

// ...End

