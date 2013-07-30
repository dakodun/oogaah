// Shape Class...
// 
function Shape() {
	Renderable.apply(this, null); // construct the base class
	
	this.mSprite = null; // sprite used to texture the shape
	
	this.mRenderStyle = "Fill"; // the style to render the shape (Fill, Line, LineLoop, Point)
	this.mPointSize = 1;
	this.mLineWidth = 1;
	this.mColour = "#FFFFFF";
	this.mPoints = new Array(); // an array containing the relative points (vectors) that make up the polygon
	
	this.mTopLeft = new Vec2();
	this.mBottomRight = new Vec2();
};

// inherit the base class's prototype
Shape.prototype = Object.create(Renderable.prototype);

// returns the type of this object for validity checking
Shape.prototype.Type = function() {
	return "Shape";
}

// make a deep copy of another (other) shape
Shape.prototype.Copy = function(other) {
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
	
	this.mSprite = other.mSprite;
	
	this.mRenderStyle = other.mRenderStyle;
	this.mPointSize = other.mPointSize;
	this.mLineWidth = other.mLineWidth;
	this.mColour = other.mColour;
	this.mPoints.splice(0, this.mPoints.length);
	this.mPoints = util.ConcatArray(this.mPoints, other.mPoints);
	
	this.mTopLeft.Copy(other.mTopLeft);
	this.mBottomRight.Copy(other.mBottomRight);
}

// return a deep copy of this shape
Shape.prototype.GetCopy = function() {
	var s = new Shape(); s.Copy(this); // create a new shape and copy this into it
	return s; // return the new shape
}

// renders this shape to the supplied render target
Shape.prototype.Render = function(renderTarget, cull, cullRect) {
	if (renderTarget != null) { // if render target is valid and sprite has a valid texture
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
				trans.Rotate(this.mRotation); // appl rotation (after scaling is done)
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
			
			{
				if (this.mRenderStyle != "Point") {
					renderTarget.beginPath();
					renderTarget.moveTo(0, 0);
					
					// for all points in the shape
					for (var i = 0; i < this.mPoints.length; ++i) {
						// draw a line to the point
						var pt = this.mPoints[i];
						renderTarget.lineTo(pt.mX, pt.mY);
					}
					
					if (this.mRenderStyle == "Line" || this.mRenderStyle == "LineLoop") {
						if (this.mRenderStyle == "LineLoop") {
							renderTarget.closePath(); // finish the path
						}
						
						renderTarget.strokeStyle = this.mColour;
						renderTarget.lineWidth = this.mLineWidth;
						renderTarget.stroke();
					}
					else {
						renderTarget.closePath(); // finish the path
						
						if (this.mSprite == null) {
							renderTarget.fillStyle = this.mColour;
							renderTarget.fill();
						}
						else {
							renderTarget.clip();
							this.mSprite.Render(renderTarget, false);
						}
					}
				}
				else {
					var offSet = new Vec2(Math.floor(this.mPointSize / 2), Math.floor(this.mPointSize / 2));
					var ptSize = Math.ceil(this.mPointSize / 2);
					
					renderTarget.fillStyle = this.mColour;
					renderTarget.fillRect(0 - offSet.mX, 0 - offSet.mY, ptSize, ptSize);
					
					for (var i = 0; i < this.mPoints.length; ++i) {
						// draw
						var pt = this.mPoints[i];
						renderTarget.fillRect(pt.mX - offSet.mX, pt.mY - offSet.mY, ptSize, ptSize);
					}
				}
			}
			
			renderTarget.globalAlpha = oldAlpha; // restore the old alpha value
			renderTarget.globalCompositeOperation = oldComp; // 
			renderTarget.restore(); // load the saved transform matrix
		}
	}
}

Shape.prototype.UpdateGlobalBoundingBox = function() {
	{
		var p = new Polygon();
		for (var i = 0; i < this.mPoints.length; ++i) {
			p.AddPoint(this.mPoints[i].GetCopy());
		}
		
		this.mGlobalBoundingBox.Copy(p); // reset the global bbox to the current shape (more accurate than local bbox)
	}
	
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
	
	this.mGlobalBoundingBox.Transform(trans); // transform the global bbox by the transformation matrix
	
	// clear the global bbox and replace it with an axis-aligned bbox using its bounds
	var bounds = this.mGlobalBoundingBox.GetBounds();
	this.mGlobalBoundingBox.Clear();
	this.mGlobalBoundingBox.mPos.Set(bounds[0].mX, bounds[0].mY);
	this.mGlobalBoundingBox.AddPoint(new Vec2(bounds[1].mX - bounds[0].mX, 0));
	this.mGlobalBoundingBox.AddPoint(new Vec2(bounds[1].mX - bounds[0].mX, bounds[1].mY - bounds[0].mY));
	this.mGlobalBoundingBox.AddPoint(new Vec2(0, bounds[1].mY - bounds[0].mY));
}

Shape.prototype.CreateLocalMask = function() {
	{
		var p = new Polygon();
		for (var i = 0; i < this.mPoints.length; ++i) {
			p.AddPoint(this.mPoints[i].GetCopy());
		}
		
		this.mLocalMask.Copy(p);
	}
}

// clears the points that make up the shape
Shape.prototype.Clear = function() {
	this.mPoints.splice(0, this.mPoints.length); // clear all points
	this.mSize.Set(0, 0); // reset the size
	
	this.mTopLeft.Set(0, 0);
	this.mBottomRight.Set(0, 0);
	
	this.mLocalBoundingBox.Clear();
	this.UpdateGlobalBoundingBox();
}

// adds a relative point to the shape
Shape.prototype.AddPoint = function(point) {
	this.mPoints.push(point.GetCopy()); // copy the point and add it to the shape
	
	// check if the current point is outwith any of the bounds and if so adjust the bounds
	if (point.mX < this.mTopLeft.mX) { // left
		this.mTopLeft.mX = point.mX;
	}
	else if (point.mX > this.mBottomRight.mX) { // right
		this.mBottomRight.mX = point.mX;
	}
	
	if (point.mY < this.mTopLeft.mY) { // top
		this.mTopLeft.mY = point.mY;
	}
	else if (point.mY > this.mBottomRight.mY) { // bottom
		this.mBottomRight.mY = point.mY;
	}
	
	// set the size of the shape depending on the bounds
	this.mSize.Set(this.mBottomRight.mX - this.mTopLeft.mX, this.mBottomRight.mY - this.mTopLeft.mY);
	
	// recreate the local bounding box
	this.mLocalBoundingBox.Clear();
	this.mLocalBoundingBox.mPos.Set(this.mTopLeft.mX, this.mTopLeft.mY);
	this.mLocalBoundingBox.AddPoint(new Vec2(this.mSize.mX,             0));
	this.mLocalBoundingBox.AddPoint(new Vec2(this.mSize.mX, this.mSize.mY));
	this.mLocalBoundingBox.AddPoint(new Vec2(            0, this.mSize.mY));
	
	this.UpdateGlobalBoundingBox();
}

// 
Shape.prototype.AddPoints = function(points) {
	for (var i = 0; i < points.length; ++i) {
		this.AddPoint(points[i]);
	}
}

Shape.prototype.MakeRectangle = function(pos, size) {
	this.Clear(); // clear the current shape, if any
	
	this.mPos.Copy(pos);
	this.AddPoint(new Vec2(size.mX,       0));
	this.AddPoint(new Vec2(size.mX, size.mY));
	this.AddPoint(new Vec2(      0, size.mY));
	
	this.mSize.Copy(size);
}

Shape.prototype.MakeCircle = function(pos, radius, numPoints) {
	this.Clear(); // clear the current shape, if any
	
	this.mPos.Copy(pos); // set the centre of the circle
	
	var angle = 0; // the current angle
	var angleInc = (360 / numPoints) * (Math.PI / 180); // the amount to increment the angle for each point
	angle -= angleInc; // decrement the current angle by the angle incrementation
	
	while (angle < Math.PI * 2) { // while we don't have a full circle
		this.AddPoint(new Vec2(radius * Math.cos(angle), radius * Math.sin(angle))); // add another point
		
		angle += angleInc; // increment the angle
	}
	
	this.mSize.Set(radius * 2, radius * 2);
}
// ...End