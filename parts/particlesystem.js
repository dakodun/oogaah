// ParticleSystem Class...
// a particle system consist of various parts (such as emitters) that control particles
function ParticleSystem() {
	this.mActive = true; // is this system active (spawning and rendering)
	this.mParts = new Array(); // the parts of the system (such as emitters)
	this.mRand = new RNG(0); // the RNG used to control particle attribute variation
	this.mPos = new Vec2(0, 0); // the position of the system
	
	this.mParticles = new Array(); // an array of currently existing particles
};

// sets up the initial state of the particle system
ParticleSystem.prototype.SetUp = function(seed) {
	var rngSeed = seed;
	
	// if no seed is specified, get a random one using the current date
	if (rngSeed == null) {
		var d = new Date();
		this.mRand.SetSeed(d.getTime());
		rngSeed = this.mRand.GetRandInt(0, 99999999);
	}
	
	this.mRand.SetSeed(rngSeed); // seed the RNG
}

// processes each of the parts of the system as well as the currently existing particles
ParticleSystem.prototype.Process = function() {
	// if the system is active
	if (this.mActive == true) {
		for (var i = 0; i < this.mParts.length; ++i) { // for all parts in the system
			this.mParts[i].Process(this); // process the part, passing a reference to the current system as the parameter
		}
		
		for (var i = 0; i < this.mParticles.length; ++i) { // for all currently existing particles
			this.mParticles[i].Process(); // process the particle
			
			// if the particle is no longer alive (lifetime has expired)
			if (this.mParticles[i].mAlive == false) {
				this.mParticles.splice(i, 1); // remove the particle from the system
				--i; // decrement the iterator
			}
		}
	}
}

// returns the render data for currently existing particles
ParticleSystem.prototype.GetRenderData = function() {
	var arr = new Array();
	
	// if the system is active
	if (this.mActive == true) {
		for (var i = 0; i < this.mParticles.length; ++i) { // for all exisiting particles
			arr.push(this.mParticles[i].mShape); // add their shape to the array
		}
	}
	
	return arr;
}

// adds an emitter to the system
ParticleSystem.prototype.AddEmitter = function(name, relativePos) {
	var emit = new ParticleEmitter(); // create an emitter
	emit.mName = name; // set the name
	
	// add the relative position to the system's position
	emit.mPos.mX = this.mPos.mX + relativePos.mX; emit.mPos.mY = this.mPos.mY + relativePos.mY;
	
	this.mParts.push(emit); // add the emitter to the system
	return this.mParts[this.mParts.length - 1]; // return a reference to the new emitter
}
// ...End

