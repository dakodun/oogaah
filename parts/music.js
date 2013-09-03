// Music Class...
// a music object is used to play a longer audio file
function Music() {
	this.mSndBuffer = null; // the associated sound buffer
	this.mClone = null; // a copy of the sound buffer element used to allow multiple buffers to play at the same time
	this.mStatus = "stopped"; // the current playback status of the audio
	this.mSubStatus = ""; // the current substatus of the audio
	
	this.mLoop = false; // should the audio repeat when it is finished playing
	this.mVolume = 100; // the current volume (0 - 100)
	this.mCurrentTime = 0; // the current audio playback position in seconds
	
	this.mFadeValue = 0; // the amount to alter the volume when fading
	this.mFadeVolume = 100; // the current volume during the fade
};

// returns the type of this object for validity checking
Music.prototype.Type = function() {
	return "Music";
}

// make a deep copy of another (other) music object
Music.prototype.Copy = function(other) {
	this.Stop(); // stop any currently playing audio
	
	this.mSndBuffer = other.mSndBuffer; // copy the sound buffer
	this.mSubStatus = "stopped"; // sound should be stopped initially
	this.mSubStatus = ""; // sound should have no substatus initially
	
	// copy the music's current attributes and status
	this.mLoop = other.mLoop;
	this.mVolume = other.mVolume;
	this.mCurrentTime = other.mCurrentTime;
	
	if (other.mStatus == "playing" || other.mStatus == "paused") { // if the other music object is playing or paused
		if (other.mSubStatus == "fadingOut") { // if the other music object is currently fading out
			this.mCurrentTime = 0; // set the time to 0 (it is stopped)
		}
		else {
			// otherwise play and pause so that we will be paused at other's current location
			this.Play();
			this.Pause();
		}
	}
}

// return a deep copy of this music object
Music.prototype.GetCopy = function() {
	var m = new Music(); m.Copy(this); // create a new music object and copy this into it
	return m; // return the new music object
}

// process the status of the music
Music.prototype.Process = function() {
	if (this.mStatus == "playing") { // if audio is playing
		this.mCurrentTime = this.mClone.currentTime; // update current playback time
		
		if (this.mClone.paused == true && this.mStatus != "paused") { // if audio is stopped but not paused
			this.mStatus = "stopped"; // audio has finished
			this.mCurrentTime = 0; // reset current playback time
			this.mClone = null; // remove clone
		}
		
		if (this.mSubStatus == "fadingOut") { // if we are fading out
			this.mFadeVolume -= this.mFadeValue; // decrease the fade volume by the value
			
			if (this.mFadeVolume <= 0) { // if the volume is now 0
				this.mClone.pause(); // pause clone
				this.mStatus = "stopped"; // audio has finished
				this.mSubStatus = ""; // reset the substatus
				this.mCurrentTime = 0; // reset current playback time
				this.mClone = null; // remove clone
			}
			else {
				this.mClone.volume = this.mFadeVolume / 100; // set the new volume of the clone
			}
		}
	}
	else if (this.mStatus == "stopped" || this.mStatus == "paused") { // otherwise if audio is stopped or paused
		if (this.mSubStatus == "playingPending") { // if audio is ready to play
			if (this.mClone.readyState == 4) { // if audio is fully loaded
				this.mClone.volume = this.mVolume / 100; // set volume
				this.mClone.loop = this.mLoop; // set loop status
				this.mClone.currentTime = this.mCurrentTime; // set current playback time
				
				this.mClone.play(); // start playing audio
				this.mStatus = "playing"; // audio is playing
				this.mSubStatus = ""; // no longer ready to play
			}
		}
	}
}

// sets the buffer (sound source)
Music.prototype.SetSoundBuffer = function(sndBuff) {
	this.mSndBuffer = sndBuff; // update the sound buffer
	this.mClone = null; // remove any previously existing clones
	this.mStatus = "stopped"; // update the current playback status
	this.mSubStatus = ""; // reset the substatus
	
	this.mCurrentTime = 0; // reset the current time
}

// starts the audio file from its current position
Music.prototype.Play = function() {
	// if audio is stopped or paused and isn't ready to play
	if ((this.mStatus == "stopped" || this.mStatus == "paused") && this.mSubStatus != "playingPending") { 
		if (this.mStatus == "stopped") { // if audio is stopped
			this.mClone = (this.mSndBuffer.mAud.cloneNode(true)); // create clone of sound buffer
		}
		
		this.mSubStatus = "playingPending"; // audio is ready to play
	}
	
	// if the audio is playing and currently fading out
	if (this.mStatus == "playing" && this.mSubStatus == "fadingOut") {
		this.mSubStatus = ""; // reset sub status
		
		this.mClone.pause(); // pause clone
		this.mClone.volume = this.mVolume / 100; // reset volume to  original
		
		// reset current playback time
		this.mCurrentTime = 0; 
		this.mClone.currentTime = this.mCurrentTime;
		
		this.mClone.play(); // restart clone
	}
}

// pauses the audio
Music.prototype.Pause = function() {
	if (this.mStatus == "playing") { // if audio is playing
		if (this.mSubStatus == "fadingOut") { // if the audio is currently fading out
			this.mStatus = "stopped"; // audio has stopped
			this.mSubStatus = ""; // reset sub status
			
			this.mClone.pause(); // pause clone
			this.mClone = null; // remove clone
			
			this.mCurrentTime = 0; // reset current playback time
		}
		else {
			this.mClone.pause(); // pause clone
			this.mStatus = "paused"; // audio is paused
		}
	}
	
	if (this.mSubStatus == "playingPending") { // if audio was ready to play
		this.mSubStatus = ""; // no longer ready to play
	}
}

// stops the audio
Music.prototype.Stop = function(fade) {
	if (this.mStatus == "playing" || this.mStatus == "paused") { // if audio is playing or paused
		if (this.mStatus == "playing" && fade > 0) { // if we are playing and are to fade
			this.mSubStatus = "fadingOut"; // set the sub status to fading out
			this.mFadeValue = fade; // update the fade decrement
			this.mFadeVolume = this.mVolume; // set the initial fade volume to the current
		}
		else {
			this.mClone.pause(); // pause clone
			this.mClone = null; // remove clone
			
			this.mStatus = "stopped"; // audio is stopped
			
			this.mCurrentTime = 0; // reset current playback time
		}
	}
	
	if (this.mSubStatus == "playingPending") { // if audio was ready to play
		this.mSubStatus = ""; // no longer ready to play
	}
}

// sets the volume of the audio
Music.prototype.SetVolume = function(volume) {
	this.mVolume = volume; // set the volume
	
	if (this.mStatus == "playing") { // if the audio is already playing
		this.mClone.volume = this.mVolume / 100; // set the volume of the clone
	}
}

// should the audio loop
Music.prototype.SetLoop = function(loop) {
	this.mLoop = loop; // set the loop status
	
	if (this.mStatus == "playing") { // if the audio is already playing
		this.mClone.loop = this.mLoop; // set the status of the clone
	}
}

// set the current playback time
Music.prototype.SetCurrentTime = function(ctime) {
	this.mCurrentTime = ctime; // set the current time
	
	if (this.mStatus == "playing") { // if the audio is already playing
		this.mClone.currentTime = this.mCurrentTime; // update the current time
	}
}
// ...End

