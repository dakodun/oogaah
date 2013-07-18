// Particle Class...
// a single particle created by a particle system (emitter)
function Particle() {
	this.mShape = null; // the particles shape (or sprite)
	this.mPos = new Vec2(0, 0); // the position of the particle (not rounded)
	this.mGrav = new Vec2(0, 0); // the current cumulative gravity
	
	this.mRotation = 0;
	this.mRotationChange = 0;
	
	this.mScale = 1;
	this.mScaleChange = 0;
	
	this.mColourR = 0;
	this.mColourG = 0;
	this.mColourB = 0;
	this.mColourRChange = 0;
	this.mColourGChange = 0;
	this.mColourBChange = 0;
	
	// the current speed and acceleration
	this.mSpeed = 0;
	this.mSpeedChange = 0;
	
	// the current direction and direction delta
	this.mDirection = 0;
	this.mDirectionChange = 0;
	
	// the magnitude and direction of the gravity (90 is down [!] fix)
	this.mGravity = 0;
	this.mGravityDirection = 0;
	
	this.mAlive = true; // has this particles life expired?
	this.mTimer = 0; // the current time
	this.mLifetime = 0; // the time that has to pass before this particle is considered done
}

// moves the particle, updates its sprite and checks for expiration
Particle.prototype.Process = function() {
	// if this particle still has time left
	if (this.mAlive == true) {
		// convert the polar coordinates (speed & direction and gravity) to cartesian and increment the accumulated gravity
		var posChange = new Vec2(0, 0); posChange.Copy(util.PolarToRectangular(this.mSpeed, this.mDirection * (Math.PI / 180)));
		var gravChange = new Vec2(0, 0); gravChange.Copy(util.PolarToRectangular(this.mGravity, this.mGravityDirection * (Math.PI / 180)));
		this.mGrav.mX += gravChange.mX; this.mGrav.mY += gravChange.mY;
		
		// add the the current position and set the sprites position (rounded)
		this.mPos.mX += posChange.mX + this.mGrav.mX; this.mPos.mY += posChange.mY + this.mGrav.mY;
		this.mShape.mPos.mX = Math.round(this.mPos.mX); this.mShape.mPos.mY = Math.round(this.mPos.mY);
		
		this.mShape.mRotation = this.mRotation;
		this.mRotation += this.mRotationChange;
		
		this.mShape.mScale.Set(this.mScale, this.mScale);
		this.mScale += this.mScaleChange;
		
		{
			// convert the red component of the colour to a hexadecimal string
			var r = Math.round(this.mColourR).toString(16);
			if (r.length == 1) { // if the string is only 1 character long
				r = "0" + r; // add a trailing 0
			}
			
			var g = Math.round(this.mColourG).toString(16);
			if (g.length == 1) {
				g = "0" + g;
			}
			
			var b = Math.round(this.mColourB).toString(16);
			if (b.length == 1) {
				b = "0" + b;
			}
			
			var hex = "#" + r + g + b; // create a hexadecimal colour string
			this.mShape.mColour = hex; // apply the colour string
			
			// increment the current colour
			this.mColourR += this.mColourRChange; this.mColourG += this.mColourGChange; this.mColourB += this.mColourBChange;
		}
		
		{ // apply the acceleration and check bounds
			this.mSpeed += this.mSpeedChange;
			if (this.mSpeed <= 0) {
				this.mSpeed = 0;
			}
		}
		
		{ // apply the direction change and check bounds
			this.mDirection += this.mDirectionChange;
			while (this.mDirection >= 360) {
				this.mDirection -= 360;
			}
			
			while (this.mDirection < 0) {
				this.mDirection += 360;
			}
		}
		
		// if the timer has reached the particle lifetime
		if (this.mTimer >= this.mLifetime) {
			this.mAlive = false; // the particle is now done
		}
		else {
			this.mTimer++; // otherwise increment the timer
		}
	}
}

// sets the shape of the particle
Particle.prototype.SetShape = function(rand, shape) {
	if (shape == "star") {
		this.mShape = new Shape();
		
		this.mShape.AddPoint(new Vec2( 3,  4));
		this.mShape.AddPoint(new Vec2( 2,  9));
		this.mShape.AddPoint(new Vec2( 8,  7));
		this.mShape.AddPoint(new Vec2(14,  9));
		this.mShape.AddPoint(new Vec2(13,  4));
		this.mShape.AddPoint(new Vec2(16,  0));
		this.mShape.AddPoint(new Vec2(11, -1));
		this.mShape.AddPoint(new Vec2( 8, -6));
		this.mShape.AddPoint(new Vec2( 5, -1));
		
		this.mShape.mOrigin.Copy(this.mShape.GetCentroid());
	}
}

// sets the initial rotation and the rotation delta
Particle.prototype.SetRotation = function(rand, rotMin, rotMax, rotChange) {
	this.mRotation = rand.GetRandFloat(rotMin, rotMax, 3); // get a random float for the initial rotation
	this.mRotationChange = rotChange;
}

// sets the initial scale and change of scale of the particle
Particle.prototype.SetScale = function(rand, scaleMin, scaleMax, scaleChange) {
	this.mScale = rand.GetRandFloat(scaleMin, scaleMax, 3); // get a random float for the initial scale
	this.mScaleChange = scaleChange;
}

// sets the start and end colour of the particle
Particle.prototype.SetColour = function(colourStart, colourEnd) {
	this.mColourStart = colourStart;
	this.mColourEnd = colourEnd;
	
	this.mShape.mColour = colourStart;
	
	var life = this.mLifetime;
	if (life == 0) {
		life = 1;
	}
	
	var r0 = parseInt(colourStart.substr(1, 2), 16);
	var r1 = parseInt(colourEnd.substr(1, 2), 16);
	this.mColourRChange = (r1 - r0) / life;
	this.mColourR = r0;
	
	var g0 = parseInt(colourStart.substr(3, 2), 16);
	var g1 = parseInt(colourEnd.substr(3, 2), 16);
	this.mColourGChange = (g1 - g0) / life;
	this.mColourG = g0;
	
	var b0 = parseInt(colourStart.substr(5, 2), 16);
	var b1 = parseInt(colourEnd.substr(5, 2), 16);
	this.mColourBChange = (b1 - b0) / life;
	this.mColourB = b0;
}

// sets the speed of the particle; rand is an RNG, min and max are the bounds
Particle.prototype.SetSpeed = function(rand, speedMin, speedMax, speedChange) {
	this.mSpeed = rand.GetRandFloat(speedMin, speedMax, 3); // get a random float for the speed
	this.mSpeedChange = speedChange;
}

// sets the direction of the particle; rand is an RNG, min and max are the bounds
Particle.prototype.SetDirection = function(rand, dirMin, dirMax, dirChange) {
	this.mDirection = rand.GetRandFloat(dirMin, dirMax, 3); // get a random float for the direction
	this.mDirectionChange = dirChange;
}

// sets the direction and magnitude of the gravity
Particle.prototype.SetGravity = function(gravity, gravityDir) {
	this.mGravity = gravity;
	this.mGravityDirection = gravityDir;
}

// sets the lifetime of the particle; rand is an RNG, min and max are the bounds
Particle.prototype.SetLifetime = function(rand, lifeMin, lifeMax) {
	// get a random float for the lifetime and multiply by the framelimit
	this.mLifetime = rand.GetRandFloat(lifeMin, lifeMax, 3) * nmain.game.mFrameLimit;
	
	this.mColourRChange /= this.mLifetime;
	this.mColourGChange /= this.mLifetime;
	this.mColourBChange /= this.mLifetime;
}
// ...End

