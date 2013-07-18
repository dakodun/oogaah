// Vec2 Class...
// a 2d vector
function Vec2(x, y) {
	// set xval to value passed in unless null
	var xVal = 0;
	if (x != null) {
		xVal = x;
	}
	
	// set yval to value passed in unless null
	var yVal = 0;
	if (y != null) {
		yVal = y;
	}

	this.mX = xVal; // x value of our 2d vector
	this.mY = yVal; // y value of our 2d vector
};

// returns the type of this object for validity checking
Vec2.prototype.Type = function() {
	return "Vec2";
};

// returns formatted output for this vector
Vec2.prototype.Output = function() {
	return "(" + this.mX + ", " + this.mY + ")";
};

// make a copy of another (other) vector (copy constructor)
Vec2.prototype.Copy = function(other) {
	// copy x and y
	this.mX = other.mX;
	this.mY = other.mY;
};

// returns a copy of this vector
Vec2.prototype.GetCopy = function() {
	var v = new Vec2(); v.Copy(this);
	return v;
};

// set the x and y components of the vector
Vec2.prototype.Set = function(x, y) {
	this.mX = x; // x value of our 2d vector
	this.mY = y; // y value of our 2d vector
};

// returns the dot product between this and other
Vec2.prototype.Dot = function(other) {
	return (this.mX * other.mX) + (this.mY * other.mY);
};

// rotates the vector around a point
Vec2.prototype.Rotate = function(angleRad, point) {
	var angle = (2 * Math.PI) - angleRad; // convert the angle so that 90 is up (instead of down)
	
	var pt = new Vec2();
	if (point != null) {
		pt.Copy(point);
	}
	
	var result = new Vec2();
	result.mX = (((this.mX - pt.mX) * Math.cos(angle)) - ((this.mY - pt.mY) * Math.sin(angle))) + pt.mX;
	result.mY = (((this.mX - pt.mX) * Math.sin(angle)) + ((this.mY - pt.mY) * Math.cos(angle))) + pt.mY;
	
	return result;
};

// transform the point by a transformation matrix
Vec2.prototype.Transform = function(transformation) {
	var result = new Vec2();
	result.mX = (transformation.mArray[0][0] * this.mX) + (transformation.mArray[0][1] * this.mY) + transformation.mArray[0][2];
	result.mY = (transformation.mArray[1][0] * this.mX) + (transformation.mArray[1][1] * this.mY) + transformation.mArray[1][2];
	
	return result;
}
// ...End

