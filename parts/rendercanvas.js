// RenderCanvas Class...
// a renderable canvas (like an image)
function RenderCanvas() {
	Renderable.apply(this, null); // construct the base class
	
	this.mFrustrumCull = true;
	
	this.mCanvas = document.createElement('canvas');
	this.mCanvas.width = 1; this.mCanvas.height = 1;
	this.mContext = this.mCanvas.getContext("2d");
};

// inherit the base class's prototype
RenderCanvas.prototype = Object.create(Renderable.prototype);

// returns the type of this object for validity checking
RenderCanvas.prototype.Type = function() {
	return "RenderCanvas";
}

// make a deep copy of another (other) render canvas
RenderCanvas.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	this.mOrigin.Copy(other.mOrigin);
	this.mAbsolute = other.mAbsolute;
	
	this.mDepth = other.mDepth;
	
	this.mTransformation.Copy(other.mTransformation);
	this.mScale.Copy(other.mScale);
	this.mRotation = other.mRotation;
	this.mSkew.Copy(other.mSkew);
	this.mAlpha = other.mAlpha;
	this.mCompositeOp = other.mCompositeOp; //
	
	this.mLocalBoundingBox.Copy(other.mLocalBoundingBox);
	this.mGlobalBoundingBox.Copy(other.mGlobalBoundingBox);
	
	this.mLocalMask.Copy(other.mLocalMask);
	this.mGlobalMask.Copy(other.mGlobalMask);
	
	this.mFrustrumCull = other.mFrustrumCull;
	
	this.Clear(); // cleat the current canvas
	this.SetSize(other.mSize); // resize the canvas
	this.mContext.drawImage(other.mCanvas, 0, 0); // copy the other canvas onto this one
}

// return a deep copy of this render canvas
RenderCanvas.prototype.GetCopy = function() {
	var rc = new RenderCanvas(); rc.Copy(this); // create a new render canvas and copy this into it
	return rc; // return the new render canvas
}

// renders this render canvas to the supplied render target
RenderCanvas.prototype.Render = function(renderTarget, cull, cullRect) {
	if (renderTarget != null) { // if render target is valid
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
				trans.Skew(this.mSkew);
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
			
			// this.mContext.fillRect(0, 0, this.mSize.mX, this.mSize.mY);
			renderTarget.drawImage(this.mCanvas, 0, 0);
			
			renderTarget.globalAlpha = oldAlpha; // restore the old alpha value
			renderTarget.globalCompositeOperation = oldComp; // 
			renderTarget.restore(); // load the saved transform matrix
		}
	}
}

// sets the render canvas' size
RenderCanvas.prototype.SetSize = function(size) {
	var s = new Vec2(); s.Copy(size); // copy the supplied size
	if (s.mX <= 0) { // if the x is 0 or less (invalid)
		s.mX = 1; // set it to 1 (minimum width)
	}
	
	if (s.mY <= 0) {
		s.mY = 1;
	}
	
	this.mSize.Copy(s); // set the size
	
	// update the canvas size to match the render canvas' size
	this.mCanvas.width = this.mSize.mX; this.mCanvas.height = this.mSize.mY;
	
	// recreate the local bounding box
	this.mLocalBoundingBox.Clear();
	this.mLocalBoundingBox.mPos.Set(0, 0);
	this.mLocalBoundingBox.AddPoint(new Vec2(this.mSize.mX,             0));
	this.mLocalBoundingBox.AddPoint(new Vec2(this.mSize.mX, this.mSize.mY));
	this.mLocalBoundingBox.AddPoint(new Vec2(            0, this.mSize.mY));
	
	this.UpdateGlobalBoundingBox();
}

// clears the render canvas' render context
RenderCanvas.prototype.Clear = function() {
	this.mContext.setTransform(1, 0, 0, 1, 0, 0); // set the transformation matrix to the identity matrix
	this.mContext.clearRect(0, 0, this.mSize.mX, this.mSize.mY); // clear the entire canvas
}

RenderCanvas.prototype.RenderTo = function(renderable, camera) {
	var batch = new RenderBatch();
	batch.mFrustrumCull = this.mFrustrumCull;
	batch.Clear();
	
	for (var i = 0; i < renderable.length; ++i) {
		batch.Add(renderable[i]);
	}
	
	batch.Render(camera, this.mContext);
}
// ...End

