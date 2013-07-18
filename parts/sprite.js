// Sprite Class...
// a sprite (representation of an image on the canvas)
function Sprite() {
	Renderable.apply(this, null); // construct the base class
	
	this.mTex = null;
	
	this.mClipPos = new Vec2(0, 0);
	
	this.mNumFrames = 0;
	this.mFramesPerLine = 0;
	this.mCurrFrame = 0;
	this.mStartFrame = 0;
	this.mEndFrame = 0;
	this.mAnimSpeed = 0;
	this.mIsAnimated = false;
	this.mNumLoops = 0;
	this.mAnimIter = 0;
};

// inherit the base class's prototype
Sprite.prototype = Object.create(Renderable.prototype);

// returns the type of this object for validity checking
Sprite.prototype.Type = function() {
	return "Sprite";
}

// make a deep copy of another (other) sprite
Sprite.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	this.mOrigin.Copy(other.mOrigin);
	this.mAbsolute = other.mAbsolute;
	
	this.mDepth = other.mDepth;
	
	this.mTransformation.Copy(other.mTransformation);
	this.mScale.Copy(other.mScale);
	this.mRotation = other.mRotation;
	this.mAlpha = other.mAlpha;
	this.mCompositeOp = other.mCompositeOp; //
	
	this.mLocalBoundingBox.Copy(other.mLocalBoundingBox);
	this.mGlobalBoundingBox.Copy(other.mGlobalBoundingBox);
	
	this.mLocalMask.Copy(other.mLocalMask);
	this.mGlobalMask.Copy(other.mGlobalMask);
	
	this.mTex = other.mTex;
	
	this.mClipPos.Copy(other.mClipPos);
	
	this.mNumFrames = other.mNumFrames;
	this.mFramesPerLine = other.mFramesPerLine;
	this.mCurrFrame = other.mCurrFrame;
	this.mStartFrame = other.mStartFrame;
	this.mEndFrame = other.mEndFrame;
	this.mAnimSpeed = other.mAnimSpeed;
	this.mIsAnimated = other.mIsAnimated;
	this.mNumLoops = other.mNumLoops;
	this.mAnimIter = other.mAnimIter;
}

// return a deep copy of this sprite
Sprite.prototype.GetCopy = function() {
	var s = new Sprite(); s.Copy(this); // create a new sprite and copy this into it
	return s; // return the new sprite
}

// renders this sprite to the supplied render target
Sprite.prototype.Render = function(renderTarget, cull, cullRect) {
	if (renderTarget != null && this.mTex != null) { // if render target is valid and sprite has a valid texture
		var intersect = true; // assume instersection occurs initially
		if (cull == true) {
			var bounds = this.mGlobalBoundingBox.GetBounds();
			var pos = bounds[0];
			var size = bounds[1];
			size.mX -= pos.mX; size.mY -= pos.mY;
			
			intersect = util.RectangleCollision(pos, size, cullRect.mPos, cullRect.mSize, false);
		}
		
		// if we have a collision then render
		if (intersect == true) {
			renderTarget.save(); // save the current transform matrix
			
			// store the current alpha value and then set it to the sprite's alpha value
			var oldAlpha = renderTarget.globalAlpha;
			renderTarget.globalAlpha = this.mAlpha;
			
			// 
			var oldComp = renderTarget.globalCompositeOperation;
			renderTarget.globalCompositeOperation = this.mCompositeOp;
			
			var trans = new Matrix3(); trans.Copy(this.mTransformation); // create a copy of our current transformation matrix
			
			{ // apply basic transformations first (in reverse order)
				// translate to current position offsetting by the origin (happens last)
				trans.Translate(new Vec2(this.mPos.mX - this.mOrigin.mX, this.mPos.mY - this.mOrigin.mY));
				
				trans.Translate(new Vec2(this.mOrigin.mX,  this.mOrigin.mY)); // translate back from the origin
				trans.Rotate(this.mRotation); // apply rotation (after scaling is done)
				trans.Scale(this.mScale); // apply scale first (to scale in x and y axes as defined by the texture)
				trans.Translate(new Vec2(-this.mOrigin.mX, -this.mOrigin.mY)); // translate to the origin
			}
			
			{ // apply the transformation matrix
				var a = trans.mArray[0][0];
				var b = trans.mArray[1][0];
				var c = trans.mArray[0][1];
				var d = trans.mArray[1][1];
				var e = trans.mArray[0][2];
				var f = trans.mArray[1][2];
				
				renderTarget.transform(a, b, c, d, e, f);
			}
			
			// draw the sprite texture using clip and scale values
			renderTarget.drawImage(this.mTex.mImg, this.mClipPos.mX, this.mClipPos.mY,
					this.mSize.mX, this.mSize.mY, 0, 0, this.mSize.mX, this.mSize.mY);
			
			renderTarget.globalAlpha = oldAlpha; // restore the old alpha value
			renderTarget.globalCompositeOperation = oldComp; // 
			renderTarget.restore(); // load the saved transform matrix
		}
	}
}

// set the clipping rectangle
Sprite.prototype.SetClipRect = function(pos, size) {
	this.mClipPos.mX = pos.mX;
	this.mClipPos.mY = pos.mY;
	
	this.mSize.mX = size.mX;
	this.mSize.mY = size.mY;
}

Sprite.prototype.Process = function() {
	if (this.mIsAnimated) { // if this sprite is animated
		if (this.mAnimSpeed >= 0) { // if it's animation speed is greater than 0
			if (this.mAnimIter > this.mAnimSpeed) { // if the timer is greater than the limit (speed)
				this.mAnimIter = 0; // reset the timer
				
				// increment current frame, wrapping back to first frame if past end frame
				this.mCurrFrame = (this.mCurrFrame + 1) % (this.mEndFrame + 1);
				
				if (this.mCurrFrame < this.mStartFrame) { // if current frame is less than start frame
					this.mCurrFrame = this.mStartFrame; // set current frame to start frame
				}
				
				if (this.mCurrFrame == this.mStartFrame && this.mNumLoops > 0) { // if we have looped once and still have loops left
					--this.mNumLoops; // decrement loop counter
				}
				
				if (this.mNumLoops == 0) { // if we are at loop count 0
					this.mAnimSpeed = -1; // stop animation
					this.mCurrFrame = this.mEndFrame; // set current frame to end frame
				}
				
				this.SetCurrentFrame(this.mCurrFrame); // set the current frame
			}
			else { // otherwise timer is less than limit
				this.mAnimIter += (1 / nmain.game.mFrameLimit); // increment the animation timer
			}
		}
	}
}

// set the static texture
Sprite.prototype.SetTexture = function(texture, numFrames, framesPerLine, animSpeed, loops, startFrame, endFrame) {
	this.mTex = texture; // set the texture
	
	this.mNumFrames = 1; // set the number of frames to 1 initially
	if (numFrames != null) { // if a frames number was supplied
		if (numFrames >= 1) { // and if it is valid (there has to be at least 1 frame)
			this.mNumFrames = numFrames; // set the number of frames to the supplied frames number
		}
	}
	
	this.mFramesPerLine = 1; // set the number of frames per line to 1 initially
	if (framesPerLine != null) { // if a number of frames per line was supplied
		if (framesPerLine >= 1) { // and if it is valid (there has to be at least 1 frame per line)
			this.mFramesPerLine = framesPerLine; // set the number of frames per line
		}
	}
	
	this.mCurrFrame = 0; // set the current frame to 0 (first frame) initially
	this.mStartFrame = 0; // set the initial frame to 0 initially
	if (startFrame != null) { // if a starting frame was supplied
		// and if it is valid (has to be within first frame (0) and the last frame (this.mNumFrames - 1))
		if (startFrame >= 0 && startFrame <= (this.mNumFrames - 1)) {
			// set both the current frame and the start frame to the starting frame
			this.mCurrFrame = startFrame;
			this.mStartFrame = startFrame;
		}
	}
	
	this.mEndFrame = (this.mNumFrames - 1); // set the final frame to the last frame initially
	if (endFrame != null) { // if a final frame was supplied
		// and if it is valid (has to be within the supplied starting frame (this.mStartFrame)
		// and the last frame (this.mNumFrames - 1))
		if (endFrame >= this.mStartFrame && endFrame <= (this.mNumFrames - 1)) {
			this.mEndFrame = endFrame; // set the final frame
		}
	}
	
	this.mAnimSpeed = 0; // set the initial animation speed to 0 (no aniamtion)
	this.mIsAnimated = false; // indicate sprite is not animated
	if (animSpeed != null) { // if an animation speed was supplied
		if (animSpeed >= 0) { // if it is valid (not negative)
			this.mAnimSpeed = animSpeed; // set the animation speed
			this.mIsAnimated = true; // indicate sprite is animated
		}
	}
	
	this.mNumLoops = -1; // set the number of loops to infinite (-1) initially
	if (loops != null) { // if loop number was specified
		if (loops >= -1) { // if it is valid (-1 for infinite or 0+ for none+)
			this.mNumLoops = loops; // set the number of loops
		}
	}
	
	this.mAnimIter = 0; // reset the animation timer
	
	// set the size of the sprite on the spritesheet
	this.mSize.mX = this.mTex.mImg.width / this.mFramesPerLine;
	this.mSize.mY = this.mTex.mImg.height / (Math.ceil(this.mNumFrames / this.mFramesPerLine));
	
	this.SetCurrentFrame(this.mCurrFrame); // set the current frame
	
	// recreate the local bounding box
	this.mLocalBoundingBox.Clear();
	this.mLocalBoundingBox.mPos.Set(0, 0);
	this.mLocalBoundingBox.AddPoint(new Vec2(this.mSize.mX,             0));
	this.mLocalBoundingBox.AddPoint(new Vec2(this.mSize.mX, this.mSize.mY));
	this.mLocalBoundingBox.AddPoint(new Vec2(            0, this.mSize.mY));
	
	this.UpdateGlobalBoundingBox();
}

// set the current frame
Sprite.prototype.SetCurrentFrame = function(frame) {
	if (frame >= this.mStartFrame && frame <= this.mEndFrame) { // if the supplied frame is within predefined bounds
		this.mAnimIter = 0; // reset the animation timer
		
		// increment current frame, wrapping back to first frame if past end frame
		this.mCurrFrame = frame % (this.mEndFrame + 1);
		
		if (this.mCurrFrame < this.mStartFrame) { // if current frame is less than start frame
			this.mCurrFrame = this.mStartFrame; // set current frame to start frame
		}
		
		// build the rectangle that encompasses the frame within the spritesheet
		var rectX = (this.mCurrFrame % this.mFramesPerLine) * this.mSize.mX;
		var rectY = (Math.floor(this.mCurrFrame / this.mFramesPerLine)) * this.mSize.mY;
		var rectW = this.mSize.mX;
		var rectH = this.mSize.mY;
		
		this.SetClipRect(new Vec2(rectX, rectY), new Vec2(rectW, rectH)); // set the clip rectangle
	}
}
// ...End

