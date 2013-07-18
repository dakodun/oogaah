// Renderable Class...
// the base class of all renderable objects
function Renderable() {
	this.mPos = new Vec2(0, 0);
	this.mSize = new Vec2(0, 0);
	this.mOrigin = new Vec2(0, 0);
	this.mAbsolute = false;
	
	this.mDepth = 0;
	
	this.mTransformation = new Matrix3();
	this.mScale = new Vec2(1.0, 1.0);
	this.mRotation = 0;
	this.mAlpha = 1.0;
	this.mCompositeOp = "source-over";
	
	this.mLocalBoundingBox = new Polygon(); // the local bounding box is in object coordinates (no transformations applied)
	this.mGlobalBoundingBox = new Polygon(); // the global bounding box is in world coordinates (transformations applied)
	
	this.mLocalMask = new Polygon();
	this.mGlobalMask = new Polygon();
};

// returns the type of this object for validity checking
Renderable.prototype.Type = function() {
	return "Renderable";
}

// make a deep copy of another (other) renderable base
Renderable.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos); // copy the position vector
	this.mSize.Copy(other.mSize); // copy the size vector
	this.mOrigin.Copy(other.mOrigin); // copy the origin vector
	this.mAbsolute = other.mAbsolute;
	
	this.mDepth = other.mDepth; // copy the depth draw value
	
	this.mTransformation.Copy(other.mTransformation);
	this.mScale.Copy(other.mScale); // copy the scale
	this.mRotation = other.mRotation; // copy the rotation
	this.mAlpha = other.mAlpha; // copy the alpha value
	this.mCompositeOp = other.mCompositeOp; //
	
	this.mLocalBoundingBox.Copy(other.mLocalBoundingBox);
	this.mGlobalBoundingBox.Copy(other.mGlobalBoundingBox);
	
	this.mLocalMask.Copy(other.mLocalMask);
	this.mGlobalMask.Copy(other.mGlobalMask);
}

// return a deep copy of this renderable
Renderable.prototype.GetCopy = function() {
	var r = new Renderable(); r.Copy(this); // create a new renderable and copy this into it
	return r; // return the new renderable
}

Renderable.prototype.Render = function(renderTarget, cull, cullRect) {
	
}

Renderable.prototype.SetPosition = function(pos) {
	this.mPos.Copy(pos);
	
	this.UpdateGlobalBoundingBox();
	this.UpdateGlobalMask();
}

Renderable.prototype.Translate = function(translation) {
	this.mTransformation.Translate(translation);
	
	this.UpdateGlobalBoundingBox();
	this.UpdateGlobalMask();
}

Renderable.prototype.GetPosition = function() {
	return this.mPos.GetCopy();
}

Renderable.prototype.GetSize = function() {
	return this.mSize.GetCopy();
}

Renderable.prototype.SetOrigin = function(origin) {
	this.mOrigin.Copy(origin);
	
	this.UpdateGlobalBoundingBox();
	this.UpdateGlobalMask();
}

Renderable.prototype.GetOrigin = function() {
	return this.mOrigin.GetCopy();
}

Renderable.prototype.SetScale = function(scale) {
	this.mScale.Copy(scale);
	
	this.UpdateGlobalBoundingBox();
	this.UpdateGlobalMask();
}

Renderable.prototype.GetScale = function() {
	return this.mScale;
}

Renderable.prototype.Scale = function(scale) {
	this.mTransformation.Scale(scale);
	
	this.UpdateGlobalBoundingBox();
	this.UpdateGlobalMask();
}

Renderable.prototype.SetRotation = function(rotation) {
	this.mRotation = rotation;
	
	this.UpdateGlobalBoundingBox();
	this.UpdateGlobalMask();
}

Renderable.prototype.GetRotation = function() {
	return this.mRotation;
}

Renderable.prototype.Rotate = function(rotation) {
	this.mTransformation.Rotate(rotation);
	
	this.UpdateGlobalBoundingBox();
	this.UpdateGlobalMask();
}

Renderable.prototype.SetTransformation = function(transform) {
	if (transform != null) { // if a valid matrix was supplied
		this.mTransformation.Copy(transform); // replace current transformation with supplied matrix
	}
	else {
		this.mTransformation.Copy(new Matrix3()); // otherwise replace it with the identity matrix
	}
	
	this.UpdateGlobalBoundingBox();
	this.UpdateGlobalMask();
}

Renderable.prototype.GetTransformation = function() {
	return this.mTransformation.GetCopy();
}

Renderable.prototype.UpdateGlobalBoundingBox = function() {
	this.mGlobalBoundingBox.Copy(this.mLocalBoundingBox); // reset the global bbox to the local bbox
	
	var trans = new Matrix3(); trans.Copy(this.mTransformation); // create a copy of our current transformation matrix
	
	{ // apply basic transformations first (in reverse order)
		// translate to current position offsetting by the origin (happens last)
		trans.Translate(new Vec2(this.mPos.mX - this.mOrigin.mX, this.mPos.mY - this.mOrigin.mY));
		
		trans.Translate(new Vec2(this.mOrigin.mX,  this.mOrigin.mY)); // translate back from the origin
		trans.Rotate(this.mRotation); // apply rotation (after scaling is done)
		trans.Scale(this.mScale); // apply scale first (to scale in x and y axes as defined by the texture)
		trans.Translate(new Vec2(-this.mOrigin.mX, -this.mOrigin.mY)); // translate to the origin
	}
	
	this.mGlobalBoundingBox.Transform(trans); // transform the global bbox by the transformation matrix
	
	// clear the global bbox and replace it with an axis-aligned bbox using its bounds
	var bounds = this.mGlobalBoundingBox.GetBounds();
	this.mGlobalBoundingBox.Clear();
	this.mGlobalBoundingBox.mPos.Set(bounds[0].mX, bounds[0].mY);
	this.mGlobalBoundingBox.AddPoint(new Vec2(bounds[1].mX - bounds[0].mX, 0));
	this.mGlobalBoundingBox.AddPoint(new Vec2(bounds[1].mX - bounds[0].mX, bounds[1].mY - bounds[0].mY));
	this.mGlobalBoundingBox.AddPoint(new Vec2(0, bounds[1].mY - bounds[0].mY));
}

Renderable.prototype.SetMask = function(mask) {
	if (mask == null) {
		this.CreateLocalMask();
	}
	else {
		this.mLocalMask.Copy(mask);
	}
	
	this.UpdateGlobalMask();
}

// creates a default local mask
Renderable.prototype.CreateLocalMask = function() {
	this.mLocalMask.Clear();
	this.mLocalMask.mPos.Set(0, 0);
	this.mLocalMask.AddPoint(new Vec2(this.mSize.mX,             0));
	this.mLocalMask.AddPoint(new Vec2(this.mSize.mX, this.mSize.mY));
	this.mLocalMask.AddPoint(new Vec2(            0, this.mSize.mY));
}

Renderable.prototype.UpdateGlobalMask = function() {
	this.mGlobalMask.Copy(this.mLocalMask); // reset the global mask to the local mask
	
	var trans = new Matrix3(); trans.Copy(this.mTransformation); // create a copy of our current transformation matrix
	
	{ // apply basic transformations first (in reverse order)
		// translate to current position offsetting by the origin (happens last)
		trans.Translate(new Vec2(this.mPos.mX - this.mOrigin.mX, this.mPos.mY - this.mOrigin.mY));
		
		trans.Translate(new Vec2(this.mOrigin.mX,  this.mOrigin.mY)); // translate back from the origin
		trans.Rotate(this.mRotation); // apply rotation (after scaling is done)
		trans.Scale(this.mScale); // apply scale first (to scale in x and y axes as defined by the texture)
		trans.Translate(new Vec2(-this.mOrigin.mX, -this.mOrigin.mY)); // translate to the origin
	}
	
	this.mGlobalMask.Transform(trans); // transform the global mask by the transformation matrix
}
// End...

