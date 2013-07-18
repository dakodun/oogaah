// ParticleEmitterTriangle Class...
function ParticleEmitterTriangle() {
	this.mVertices = new Array();
	this.mVertices[0] = new Vec2(0, 0);
	this.mVertices[1] = new Vec2(0, 0);
	this.mVertices[2] = new Vec2(0, 0);
	
	this.mArea = 0;
	this.mWeight = 0;
};
// ...End


// ParticleEmitter Class...
// a particle emitter that creates particles witin a particle system
function ParticleEmitter() {
	this.mName = ""; // the unique name of this emitter within the system
	this.mPos = new Vec2(0, 0); // the relative position of this emitter to the system
	
	this.mParticleShape = null; // the sprite or shape of the particles that this emitter creates
	
	// the emission shape
	this.mShape = new Array();
	
	// the shape and related attributes of the particle
	this.mParticleShape = "";
	
	// 
	this.mRotationMin = 0;
	this.mRotationMax = 0;
	this.mRotationChange = 0;
	
	// 
	this.mScaleMin = 1;
	this.mScaleMax = 1;
	this.mScaleChange = 0;
	
	this.mColourStart = "#FFFFFF";
	this.mColourEnd = "#FFFFFF";
	
	this.mNumParts = 1; // the number of particles created each burst
	
	// the minimum and maximum initial speed and the acceleration of the particle
	this.mSpeedMin = 0;
	this.mSpeedMax = 0;
	this.mSpeedChange = 0;
	
	// the minimum and maximum initial direction and the rate of change of direction of the particle
	this.mDirectionMin = 0;
	this.mDirectionMax = 360;
	this.mDirectionChange = 0;
	
	// the magnitude of the gravity and the direction (90 is down [!] fix) of the particle
	this.mGravity = 0;
	this.mGravityDir = 90;
	
	// the minimum and maximum time in seconds that the particle remains active
	this.mLifetimeMin = 0;
	this.mLifetimeMax = 0;
	
	this.mTimer = 0; // the timer used for spawning particles
	this.mSpawnLimit = 0; // the time limit for each spawn
};

// process the particles movement and liftime; system is a reference to the system that this emitter belongs to
ParticleEmitter.prototype.Process = function(system) {
	// if the timer has reached the spawn limit
	if (this.mTimer >= this.mSpawnLimit) {
		// for the number of particles per burst
		for (var i = 0; i < this.mNumParts; ++i) {
			var part = new Particle(); // create a temporary particle
			
			var pos = new Vec2(0.0, 0.0); pos.Copy(this.mPos); // set the intial particle position to the emitter position (point)
			
			{
				var triWeight = system.mRand.GetRandFloat(0, 1, 3);
				var j = 0;
				
				for (j = 0; j < this.mShape.length; ++j) {
					if (triWeight <= this.mShape[j].mWeight) {
						break;
					}
				}
				
				// pos = v0 + (a * v01) + (b * v02)
				
				var v0 = new Vec2(0, 0); v0.Copy(this.mShape[j].mVertices[0]);
				
				var v01 = new Vec2(0, 0); v01.Copy(this.mShape[j].mVertices[1]);
				v01.mX -= this.mShape[j].mVertices[0].mX; v01.mY -= this.mShape[j].mVertices[0].mY;
				
				var v02 = new Vec2(0, 0); v02.Copy(this.mShape[j].mVertices[2]);
				v02.mX -= this.mShape[j].mVertices[0].mX; v02.mY -= this.mShape[j].mVertices[0].mY;
				
				var a = system.mRand.GetRandFloat(0, 1, 3);
				var b = system.mRand.GetRandFloat(0, 1, 3);
				if (a + b >= 1) {
					a = 1 - a;
					b = 1 - b;
				}
				
				pos.mX += v0.mX + (a * v01.mX) + (b * v02.mX);
				pos.mY += v0.mY + (a * v01.mY) + (b * v02.mY);
			}
			
			// set the position of the particle
			part.mPos.Copy(pos);
			
			if (this.mParticleShape == "sprite") {
				
			}
			else {
				part.SetShape(system.mRand, this.mParticleShape, this.mSizeMin, this.mSizeMax,
						this.mColour, this.mRotation);
				part.mShape.mPos.Copy(pos);
			}
			
			// set the attributes of the particle depending on the specified attributes of the emitter
			part.SetRotation(system.mRand, this.mRotationMin, this.mRotationMax, this.mRotationChange);
			part.SetScale(system.mRand, this.mScaleMin, this.mScaleMax, this.mScaleChange);
			part.SetColour(this.mColourStart, this.mColourEnd);
			part.SetSpeed(system.mRand, this.mSpeedMin, this.mSpeedMax, this.mSpeedChange);
			part.SetDirection(system.mRand, this.mDirectionMin, this.mDirectionMax, this.mDirectionChange);
			part.SetGravity(this.mGravity, this.mGravityDir);
			part.SetLifetime(system.mRand, this.mLifetimeMin, this.mLifetimeMax);
			
			system.mParticles.push(part); // add the particle to the system
		}
		
		// calculate a new spawn limit and reset the timer
		this.mSpawnLimit = system.mRand.GetRandFloat(this.mSpawnMin, this.mSpawnMax, 3);
		this.mSpawnLimit *= nmain.game.mFrameLimit;
		this.mTimer = 0;
	}
	else {
		this.mTimer++; // otherwise increment the timer
	}
}

// sets the shape of the emitter type and parameters of the emitter
ParticleEmitter.prototype.SetShape = function(shape) {
	this.mShape.splice(0, this.mShape.length);
	
	var triangles = new Array();
	triangles = util.ConcatArray(triangles, shape.Triangulate(true));
	
	this.mShape = new Array();
	var totalArea = 0;
	for (var i = 0; i < triangles.length; i += 3) {
		var tri = new ParticleEmitterTriangle();
		tri.mVertices[0] = triangles[i];
		tri.mVertices[1] = triangles[i + 1];
		tri.mVertices[2] = triangles[i + 2];
		
		tri.mArea = (tri.mVertices[0].mX * tri.mVertices[1].mY) - (tri.mVertices[1].mX * tri.mVertices[0].mY) +
				(tri.mVertices[1].mX * tri.mVertices[2].mY) - (tri.mVertices[2].mX * tri.mVertices[1].mY) +
				(tri.mVertices[2].mX * tri.mVertices[0].mY) - (tri.mVertices[0].mX * tri.mVertices[2].mY);
		
		this.mShape.push(tri);
		totalArea += tri.mArea;
	}
	
	var weightAccum = 0;
	for (var i = 0; i < this.mShape.length; ++i) {
		var weight = this.mShape[i].mArea / totalArea;
		this.mShape[i].mWeight = weightAccum + weight;
		weightAccum += weight;
	}
}

// sets the shape of the particles created by this emitter
ParticleEmitter.prototype.SetParticleShape = function(shape) {
	this.mParticleShape = shape;
}

// sets the initial rotation and the rotation delta
ParticleEmitter.prototype.SetRotation = function(rotMin, rotMax, rotChange) {
	this.mRotationMin = rotMin;
	this.mRotationMax = rotMax;
	this.mRotationChange = rotChange;
}

// sets the initial scale and the rate of change of scale
ParticleEmitter.prototype.SetScale = function(scaleMin, scaleMax, scaleChange) {
	this.mScaleMin = scaleMin;
	this.mScaleMax = scaleMax;
	this.mScaleChange = scaleChange;
}

// sets the start and end colour of the particle
ParticleEmitter.prototype.SetColour = function(colourStart, colourEnd) {
	this.mColourStart = colourStart;
	this.mColourEnd = colourEnd;
}

// sets the number of particles per burst
ParticleEmitter.prototype.SetParticleNumber = function(numParts) {
	this.mNumParts = numParts;
}

// sets the frequency at which particles spawn
ParticleEmitter.prototype.SetSpawnFrequency = function(rand, spawnMin, spawnMax) {
	// set the min and max time for particle spawning
	this.mSpawnMin = spawnMin;
	this.mSpawnMax = spawnMax;
	
	// if no rng is supplied
	if (rand == null) {
		this.mSpawnLimit = spawnMin; // set the initial limit to the minimum
	}
	else {
		this.mSpawnLimit = rand.GetRandFloat(spawnMin, spawnMax, 3); // otherwise set it to a random number between the bounds
	}
	
	this.mSpawnLimit *= nmain.game.mFrameLimit; // multiply by the frame limit (converting to seconds)
}

// sets the speed and acceleration of the particle
ParticleEmitter.prototype.SetSpeed = function(speedMin, speedMax, speedChange) {
	this.mSpeedMin = speedMin;
	this.mSpeedMax = speedMax;
	this.mSpeedChange = speedChange;
}

// sets the direection and rate of change of direction of the particle
ParticleEmitter.prototype.SetDirection = function(dirMin, dirMax, dirChange) {
	this.mDirectionMin = dirMin;
	this.mDirectionMax = dirMax;
	this.mDirectionChange = dirChange;
}

// sets the gravity and gravity direction of the particle (90 is down [!] fix)
ParticleEmitter.prototype.SetGravity = function(grav, gravDir) {
	this.mGravity = grav;
	this.mGravityDir = gravDir;
}

// sets the lifetime of the particle
ParticleEmitter.prototype.SetLifeTime = function(lifeMin, lifeMax) {
	this.mLifetimeMin = lifeMin;
	this.mLifetimeMax = lifeMax;
}
// ...End

