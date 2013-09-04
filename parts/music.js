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
	
	this.mFadeTarget = 100; // 
	this.mFadeValue = 0;
	
	this.mNotifyPlay = false;
	this.mNotifyFadeEnd = false;
};

// returns the type of this object for validity checking
Music.prototype.Type = function() {
	return "Music";
}

// make a deep copy of another (other) music object
Music.prototype.Copy = function(other) {
	this.Stop(); // stop any currently playing audio
	
	this.mSndBuffer = other.mSndBuffer; // copy the sound buffer
	this.mStatus = "stopped"; // sound should be stopped initially
	this.mSubStatus = ""; // sound should have no substatus initially
	
	// copy the music's current attributes and status
	this.mLoop = other.mLoop;
	this.mVolume = other.mVolume;
	this.mCurrentTime = other.mCurrentTime;
	
	// 
	this.mFadeTarget = other.mFadeTarget;
	this.mFadeValue = other.mFadeValue;
	
	// reset notifications
	this.mNotifyPlay = false;
	this.mNotifyFadeEnd = false;
	
	if (other.mStatus == "playing" || other.mStatus == "paused") { // if the other music object is playing or paused
		this.Play();
		this.Pause();
	}
}

// return a deep copy of this music object
Music.prototype.GetCopy = function() {
	var m = new Music(); m.Copy(this); // create a new music object and copy this into it
	return m; // return the new music object
}

// process the status of the music
Music.prototype.Process = function() {
	this.mNotifyPlay = false;
	this.mNotifyFadeEnd = false;
	
	
	/*
	 * detect when the audio ends (if not looping) and update object accordingly
	 */
	
	// if audio is playing and we have a valid clone
	if (this.mStatus == "playing" && this.mClone != null) {
		this.mCurrentTime = this.mClone.currentTime; // update current playback time
		
		if (this.mClone.paused == true && this.mStatus != "paused") { // if audio is stopped but not paused
			this.mStatus = "stopped"; // audio has finished
			this.mSubStatus = ""; // reset sub status
			this.mCurrentTime = 0; // reset current playback time
			this.mClone = null; // remove clone
		}
	}
	
	
	/* 
	 * can't immediately play when requested, have to ensure audio is valid to play first which
	 * may take a few frames
	 */
	
	// if we are stopped or paused, and pending play and have a valid clone
	if ((this.mStatus == "stopped" || this.mStatus == "paused") &&
			this.mSubStatus == "pending" && this.mClone != null) {
		
		if (this.mClone.readyState == 4) { // if audio is fully loaded
			this.PerformPlay(); // start play
		}
	}
	
	
	/*
	 *
	 */
	
	if (this.mSubStatus == "fading") { // if there is a fade in progress
		if (this.mVolume < this.mFadeTarget) { // if the voulme is less than the target
			this.mVolume += this.mFadeValue; // increment the volume
			if (this.mVolume > this.mFadeTarget) { // if volume is now greater than the target
				this.mVolume = this.mFadeTarget; // set it to the target
			}
		}
		else if (this.mVolume > this.mFadeTarget) {
			this.mVolume -= this.mFadeValue;
			if (this.mVolume < this.mFadeTarget) {
				this.mVolume = this.mFadeTarget;
			}
		}
		
		
		if (this.mVolume != this.mFadeTarget) { // if the volume has not yet reached the target
			this.mClone.volume = this.mVolume / 100; // set volume
		}
		else {
			this.mSubStatus = ""; // otherwise fade is finished
			this.mNotifyFadeEnd = true;
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
	// if audio is stopped or paused and isn't already pending play
	if ((this.mStatus == "stopped" || this.mStatus == "paused") && this.mSubStatus != "pending") {
		// if we don't have a valid clone but do have a valid soundbuffer
		if (this.mClone == null && this.mSndBuffer != null) {
			this.mClone = (this.mSndBuffer.mAud.cloneNode(true)); // create clone of sound buffer
		}
		
		this.mSubStatus = "pending"; // audio is ready to play
	}
}

// performs the actual play functionality -- internal use
Music.prototype.PerformPlay = function() {
	if (this.mClone != null) {
		this.mClone.volume = this.mVolume / 100; // set volume
		this.mClone.loop = this.mLoop; // set loop status
		this.mClone.currentTime = this.mCurrentTime; // set current playback time
		
		this.mClone.play(); // start playing audio
		this.mStatus = "playing"; // audio is playing
		this.mSubStatus = ""; // no longer ready to play
		
		this.mNotifyPlay = true;
	}
}

// pauses the audio
Music.prototype.Pause = function() {
	if (this.mStatus == "playing") {
		if (this.mClone != null) { // if we have a valid clone
			this.mClone.pause(); // pause clone
			
			this.mStatus = "paused"; // audio is paused
			
			if (this.mSubStatus == "fading") { // if audio was fading
				this.mVolume = this.mFadeTarget; // set the volume to the target
				
				this.mSubStatus = ""; // no longer fading
			}
		}
	}
	
	if (this.mSubStatus == "pending") { // if audio was pending play
		this.mSubStatus = ""; // no longer pending play
	}
}

// stops the audio
Music.prototype.Stop = function() {
	if (this.mStatus == "playing" || this.mStatus == "paused") {
		if (this.mClone != null) { // if we have a valid clone
			this.mClone.pause(); // pause clone
			this.mClone = null; // remove clone
			
			this.mCurrentTime = 0; // reset current playback time
			this.mStatus = "stopped"; // audio is stopped
			
			if (this.mSubStatus == "fading") { // if audio was fading
				this.mVolume = this.mFadeTarget; // set the volume to the target
				
				this.mSubStatus = ""; // no longer fading
			}
		}
	}
	
	if (this.mSubStatus == "pending") { // if audio was pending play
		this.mSubStatus = ""; // no longer pending play
	}
}

// sets the volume of the audio
Music.prototype.SetVolume = function(volume) {
	this.mVolume = volume; // set the volume
	
	if (this.mClone != null) { // if we have a valid clone
		if (this.mStatus == "playing") { // if the audio is already playing
			this.mClone.volume = this.mVolume / 100; // set the volume of the clone
		}
	}
}

// should the audio loop
Music.prototype.SetLoop = function(loop) {
	this.mLoop = loop; // set the loop status
	
	if (this.mClone != null) { // if we have a valid clone
		if (this.mStatus == "playing") { // if the audio is already playing
			this.mClone.loop = this.mLoop; // set the status of the clone
		}
	}
}

// set the current playback time
Music.prototype.SetCurrentTime = function(ctime) {
	this.mCurrentTime = ctime; // set the current time
	
	if (this.mClone != null) { // if we have a valid clone
		if (this.mStatus == "playing") { // if the audio is already playing
			this.mClone.currentTime = this.mCurrentTime; // update the current time
		}
	}
}

// fades the volume from its current value to a target value by value every frame
Music.prototype.StartFade = function(target, value) {
	if (this.mStatus == "playing") { // if the audio is playing
		this.mFadeTarget = target; // set the fade target volume
		this.mFadeValue = value; // set the fade change value
		
		this.mSubStatus = "fading"; // start fading
	}
}

// returns true when the audio starts playing
Music.prototype.OnPlay = function() {
	return this.mNotifyPlay; // return play start callback status
}

// returns true when a fade finishes
Music.prototype.OnFadeEnd = function() {
	return this.mNotifyFadeEnd; // return fade end callback status
}
// ...End

