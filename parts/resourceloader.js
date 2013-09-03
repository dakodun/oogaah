// ResourceStore Class...
// handles the loading of a batch of asynchronous resources such as images or sounds
function ResourceLoader() {
	this.mTextureQueue = new Array(); // the queue of unprocessed textures
	this.mFontQueue = new Array(); // the queue of unprocessed fonts
	this.mSoundBufferQueue = new Array(); // the queue of unprocessed sound buffers
	
	this.mWorking = false; // indicates if our resourceloader is currently working
	this.mIntervalID = null; // the handle of the interval that is checking the state of the resources
};

// adds a texture to the queue for future processing
ResourceLoader.prototype.QueueTexture = function(texName, texLocation, texTypes) {
	// replace with a binary search; queue already sorted, use more efficient insert
	
	// if we are currently processing resources then error
	if (this.mWorking == true) {
		throw Exception("Resource loader already working.");
	}
	
	// for all textures in the queue
	for (var i = 0; i < this.mTextureQueue.length; ++i) {
		// if we find a match to the one we are trying to add then error
		if (this.mTextureQueue[i].mResName == texName) {
			throw Exception("Resource already exists.");
		}
	}
	
	this.mTextureQueue.push(new QueuedResource(texName, texLocation, texTypes)); // add to the queue
	this.mTextureQueue.sort(ResourceSort); // sort the queue
}

// adds a font to the queue for future processing
ResourceLoader.prototype.QueueFont = function(fontName, fontLocation) {
	// replace with a binary search; queue already sorted, use more efficient insert
	
	// if we are currently processing resources then error
	if (this.mWorking == true) {
		throw Exception("Resource loader already working.");
	}
	
	// for all textures in the queue
	for (var i = 0; i < this.mFontQueue.length; ++i) {
		// if we find a match to the one we are trying to add then error
		if (this.mFontQueue[i].mResName == fontName) {
			throw Exception("Resource already exists.");
		}
	}
	
	this.mFontQueue.push(new QueuedResource(fontName, fontLocation)); // add to the queue
	this.mFontQueue.sort(ResourceSort); // sort the queue
}

// adds an audio file to the queue for future processing
ResourceLoader.prototype.QueueSoundBuffer = function(sndName, sndLocation, sndTypes) {
	// replace with a binary search; queue already sorted, use more efficient insert
	
	// if we are currently processing resources then error
	if (this.mWorking == true) {
		throw Exception("Resource loader already working.");
	}
	
	// for all audio in the queue
	for (var i = 0; i < this.mSoundBufferQueue.length; ++i) {
		// if we find a match to the one we are trying to add then error
		if (this.mSoundBufferQueue[i].mResName == sndName) {
			throw Exception("Resource already exists.");
		}
	}
	
	this.mSoundBufferQueue.push(new QueuedResource(sndName, sndLocation, sndTypes)); // add to the queue
	this.mSoundBufferQueue.sort(ResourceSort); // sort the queue
}

// processes all resources currently in the queue
ResourceLoader.prototype.AcquireResources = function() {
	this.mWorking = true; // indicate we are currently working
	
	// for all textures in the queue
	for (var i = 0; i < this.mTextureQueue.length; ++i) {
		// add texture to resource manager and load the associated image
		var tex = nmgrs.resMan.mTextureStore.AddResource(new Texture(), this.mTextureQueue[i].mResName);
		tex.LoadFromFile(this.mTextureQueue[i].mResLocation, this.mTextureQueue[i].mResTypes);
	}
	
	// for all fonts in the queue
	for (var i = 0; i < this.mFontQueue.length; ++i) {
		// add font to resource manager and load the associated font file
		var font = nmgrs.resMan.mFontStore.AddResource(new Font(), this.mFontQueue[i].mResName);
		font.LoadFromFile(this.mFontQueue[i].mResName, this.mFontQueue[i].mResLocation);
	}
	
	// for all audio in the queue
	for (var i = 0; i < this.mSoundBufferQueue.length; ++i) {
		// add audio to resource manager and load the associated file
		var snd = nmgrs.resMan.mSoundBufferStore.AddResource(new SoundBuffer(), this.mSoundBufferQueue[i].mResName);
		snd.LoadFromFile(this.mSoundBufferQueue[i].mResLocation, this.mSoundBufferQueue[i].mResTypes);
	}
}

// periodically checks the progress of our resource loader
ResourceLoader.prototype.ProgressCheck = function() {
	// if we are currently working (otherwise no progress will be made)
	if (this.mWorking == true) {
		// for all textures in the queue
		for (var i = 0; i < this.mTextureQueue.length; ++i) {
			// check if the texture has finished loading, whether or not it was successful
			var tex = nmgrs.resMan.mTextureStore.GetResource(this.mTextureQueue[i].mResName);
			
			if (tex.mImg.mLoaded == "load") { // if the texture loaded successfully
				tex.mTypes.splice(0, tex.mTypes.length); // remove any stored types
				this.mTextureQueue.splice(i, 1); // remove the texture from the unprocessed queue
			}
			else if (tex.mImg.mLoaded == "abort" || tex.mImg.mLoaded == "error") { // otherwise if it failed in any way
				if (tex.mTypes.length > 0) { // if there are any types left to try
					tex.LoadFromFile(this.mTextureQueue[i].mResLocation, null); // try to load the texture again using a previously supplied type
				}
				else {
					alert("Texture failed to load: " + tex.mImg.mLoaded);
					this.mTextureQueue.splice(i, 1); // remove the texture from the unprocessed queue
				}
			}
		}
		
		// for all fonts in the queue
		for (var i = 0; i < this.mFontQueue.length; ++i) {
			// check if the font has finished loading, whether or not it was successful
			var font = nmgrs.resMan.mFontStore.GetResource(this.mFontQueue[i].mResName);
			font.CheckLoadStatus();
			if (font.mLoaded == "load" || font.mLoaded == "abort" || font.mLoaded == "error") {
				if (font.mLoaded == "abort" || font.mLoaded == "error") {
					alert("Font failed to load: " + font.mLoaded);
				}
				
				this.mFontQueue.splice(i, 1); // remove the font from the unprocessed queue
			}
		}
		
		// for all audio in the queue
		for (var i = 0; i < this.mSoundBufferQueue.length; ++i) {
			// check if the audio has finished loading, whether or not it was successful
			var snd = nmgrs.resMan.mSoundBufferStore.GetResource(this.mSoundBufferQueue[i].mResName);
			if (snd.mAud.mLoaded == "load" || snd.mAud.mLoaded == "abort" || snd.mAud.mLoaded == "error") {
				if (snd.mAud.mLoaded == "abort" || snd.mAud.mLoaded == "error") {
					alert("Audio failed to load: " + snd.mAud.mLoaded);
				}
				
				this.mSoundBufferQueue.splice(i, 1); // remove the audio from the unprocessed queue
			}
		}
		
		// if our unprocessed queue is now empty
		if (this.mTextureQueue.length == 0 && this.mFontQueue.length == 0 && this.mSoundBufferQueue.length == 0) {
			this.mWorking = false; // we are finished working
			clearInterval(this.mIntervalID); // stop checking for progress
			this.mIntervalID = null; // clear interval handle
		}
	}
	else {
		// if called by an interval
		if (this.mIntervalID != null) {
			clearInterval(this.mIntervalID); // function called in error, stop future calls
			this.mIntervalID = null; // clear interval handle
		}
	}
}
// ...End

