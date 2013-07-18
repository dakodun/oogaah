// CollisionResult Class...
// information returned from a collision check
function CollisionResult() {
	this.mCollision = false; // has a collision occured
	this.mMTAxis = new Vec2(0, 0); // the minimum translation axis (normalised)
	this.mMTMagnitude = 0; // the minimum translation magnitude
};
// ...End


// Polygon Class...
//
function Polygon() {
	this.mPos = new Vec2(); // the position of the polygon (also acts as the first point)
	this.mSize = new Vec2();
	this.mPoints = new Array(); // an array containing the relative points (vectors) that make up the polygon
	
	this.mTopLeft = new Vec2();
	this.mBottomRight = new Vec2();
};

Polygon.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	
	this.mPoints.splice(0, this.mPoints.length);
	this.mPoints = util.ConcatArray(this.mPoints, other.mPoints);
	
	this.mTopLeft.Copy(other.mTopLeft);
	this.mBottomRight.Copy(other.mBottomRight);
}

Polygon.prototype.GetCopy = function() {
	var p = new Polygon(); p.Copy(this)
	return p;
}

// clears the points that make up the polygon
Polygon.prototype.Clear = function() {
	this.mPos.Set(0, 0); // reset the position back to the origin
	this.mSize.Set(0, 0); // reset the position back to the origin
	this.mPoints.splice(0, this.mPoints.length); // clear all points
}

// adds a relative point to the polygon
Polygon.prototype.AddPoint = function(point) {
	this.mPoints.push(point.GetCopy()); // copy the point and add it to the polygon
	
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
}

// 
Polygon.prototype.AddPoints = function(points) {
	for (var i = 0; i < points.length; ++i) {
		this.AddPoint(points[i]);
	}
}

Polygon.prototype.MakeRectangle = function(pos, size) {
	this.Clear(); // clear the current polygon, if any
	
	this.mPos.Copy(pos);
	this.AddPoint(new Vec2(size.mX,       0));
	this.AddPoint(new Vec2(size.mX, size.mY));
	this.AddPoint(new Vec2(      0, size.mY));
	
	this.mSize.Copy(size);
}

Polygon.prototype.MakeCircle = function(pos, radius, numPoints) {
	this.Clear(); // clear the current polygon, if any
	
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

// returns the bounds of the polygon (essentially top-left and bottom-right coordinates of the
// rectangle that encapsulates the entire polygon)
Polygon.prototype.GetBounds = function() {
	var poly = this.GetAbsolute();
	var topLeft = new Vec2();
	var bottomRight = new Vec2();
	
	if (poly.length > 0) {
		// the first point makes up the bounds
		topLeft.mX = poly[0].mX;
		topLeft.mY = poly[0].mY;
		bottomRight.mX = poly[0].mX;
		bottomRight.mY = poly[0].mY;
	}
	
	for (var i = 1; i < poly.length; ++i) { // for all points that make up the polygon (excluding the first one)
		// check if the current point is outwith any of the bounds and if so adjust the bounds
		
		if (poly[i].mX < topLeft.mX) { // left
			topLeft.mX = poly[i].mX;
		}
		else if (poly[i].mX > bottomRight.mX) { // right
			bottomRight.mX = poly[i].mX;
		}
		
		if (poly[i].mY < topLeft.mY) { // top
			topLeft.mY = poly[i].mY;
		}
		else if (poly[i].mY > bottomRight.mY) { // bottom
			bottomRight.mY = poly[i].mY;
		}
	}
	
	var bounds = new Array(); // array that will hold the bounds (top, left, bottom, right)
	bounds.push(topLeft); bounds.push(bottomRight);
	return bounds;
}

// returns an array containing the absolute points that make up the polygon
Polygon.prototype.GetAbsolute = function() {
	var poly = new Array();
	poly.push(this.mPos.GetCopy()); // add the position as the initial point
	
	for (var i = 0; i < this.mPoints.length; ++i) { // for all points that make up the polygon
		// add all other points, offsetting by position so they are absolute
		var x = this.mPoints[i].mX + this.mPos.mX;
		var y = this.mPoints[i].mY + this.mPos.mY;
		poly.push(new Vec2(x, y));
	}
	
	return poly; // return the polygon array
}

// rotate the polygon by an angle around the point
Polygon.prototype.Rotate = function(angle, point) {
	var poly = this.GetAbsolute(); // get the absolute points that make up the polygon
	this.Clear(); // clear this polygon
	
	for (var i = 0; i < poly.length; ++i) { // for all points in the polygon array
		var angleRad = angle * (Math.PI / 180); // convert the angle into radians
		poly[i] = poly[i].Rotate(angleRad, point); // rotate the polygon by the angle around the specified point
		
		if (i == 0) { // if this is the first point
			this.mPos.Copy(poly[i]); // add the point as the position
		}
		else { // otherwise for all other points
			// make the point relative to the position and add it
			this.AddPoint(new Vec2(poly[i].mX - this.mPos.mX, poly[i].mY - this.mPos.mY));
		}
	}
}

// transform the polygon by a transformation matrix
Polygon.prototype.Transform = function(transformation) {
	var poly = this.GetAbsolute(); // get the absolute points that make up the polygon
	this.Clear(); // clear this polygon
	
	for (var i = 0; i < poly.length; ++i) { // for all points in the polygon array
		poly[i] = poly[i].Transform(transformation); // transform the current point
		
		if (i == 0) { // if this is the first point
			this.mPos.Copy(poly[i]); // add the point as the position
		}
		else { // otherwise for all other points
			// make the point relative to the position and add it
			this.AddPoint(new Vec2(poly[i].mX - this.mPos.mX, poly[i].mY - this.mPos.mY));
		}
	}
}
// ...End



/*

// returns the centroid of the shape
Shape.prototype.GetCentroid = function() {
	// get the vertices of the shape
	var poly = new Array();
	poly = util.ConcatArray(poly, this.GetPolygon());
	
	{ // add the first vertex to the end to complete the loop
		var vert0 = new Vec2(0, 0); vert0.Copy(poly[0]);
		poly.push(vert0);
	}
	
	var signedArea = 0; // the signed area of the shape
	var centroid = new Vec2(0, 0);
	
	for (var i = 0; i < poly.length - 1; ++i) {
		// (x0 * y1) - (x1 * y0)
		var a = (poly[i].mX * poly[i + 1].mY) - (poly[i + 1].mX * poly[i].mY);
		signedArea += a;
		
		// (x0 + x1) * a
		centroid.mX += (poly[i].mX + poly[i + 1].mX) * a;
		
		// (y0 + y1) * a
		centroid.mY += (poly[i].mY + poly[i + 1].mY) * a;
	}
	
	signedArea *= 3; // (* 0.5 * 6)
	centroid.mX = (centroid.mX / signedArea) - this.mPos.mX;
	centroid.mY = (centroid.mY / signedArea) - this.mPos.mY;
	
	return centroid;
}

// triangulates the shape and returns a sequential array of triangles (t0v0, t0v1 & t0v2; t1v0, t1v1 & t1v2; etc)
Shape.prototype.Triangulate = function(convex) {
	var triangles = new Array();
	var poly = new Array();
	poly = util.ConcatArray(poly, this.GetPolygon());
	
	if (poly.length > 3) { // if the shape needs triangulated
		if (convex == true) { // if the shape is convex (simpler to triangulate)
			var v0 = new Vec2(0, 0); v0.Copy(poly[0]);
			
			// create the triangles
			for (var i = 1; i < poly.length - 1; ++i) {
				var v1 = new Vec2(0, 0); v1.Copy(poly[i]);
				var v2 = new Vec2(0, 0); v2.Copy(poly[i + 1]);
				
				triangles.push(v0); triangles.push(v1); triangles.push(v2);
			}
		}
	}
	
	return triangles;
}

// a projection is essentially a vector that lies on an axis (projection axis)
Shape.prototype.GetProjection = function(projectionAxis) {
	var poly = new Array();
	poly = util.ConcatArray(poly, this.GetPolygon());
	
	var min = 0.0; // lower value of the projection
	var max = 0.0; // upper value of the projection
	min = max = projectionAxis.Dot(poly[0]); // default min/max is the first point in the shape
	
	// for all points in th shape (except the first)
	for (var i = 1; i < poly.length; ++i) {
		var dotProduct = projectionAxis.Dot(poly[i]); // get the dot product
		
		// update min or max accordingly
		if (dotProduct < min) {
			min = dotProduct;
		}
		else if (dotProduct > max) {
			max = dotProduct;
		}
	}
	
	// return the projection
	return new Vec2(min, max);
}

// (clockwise-winding)
Shape.prototype.CollisionCheck = function(other) {
	var collisionResult = new CollisionResult();
	
	for (var i = 0; i < 2; ++i) { // loop through both shapes
		var points = new Array();
		
		// add current shape's points to an array for looping
		if (i == 0) {
			points = util.ConcatArray(points, this.GetPolygon());
		}
		else {
			points = util.ConcatArray(points, other.GetPolygon());
		}
		
		for (var j = 0; j < points.length; ++j) { // for all points (in current shape)
			var e1 = new Vec2(0, 0); e1.Copy(points[(j + 1) % (points.length - 1)]);
			var e2 = new Vec2(0, 0); e2.Copy(points[j]);
			
			var edge = new Vec2(e1.mX - e2.mX, e1.mY - e2.mY);
			var axis = new Vec2(-edge.mY, edge.mX); // left-hand normal - points outwards
			
			// normalise axis (make optional)
			var mag = Math.sqrt((axis.mX * axis.mX) + (axis.mY * axis.mY));
			axis.mX /= mag;
			axis.mY /= mag;
			
			// project the shapes onto the axis
			var proj1 = new Vec2(0, 0); proj1.Copy(this.GetProjection(axis));
			var proj2 = new Vec2(0, 0); proj2.Copy(other.GetProjection(axis));
			
			// if there is not an overlap between the projections
			if (proj2.mY < proj1.mX || proj1.mY < proj2.mX) {
				return collisionResult;
			}
			
			var mtvOverlap = Math.min(proj1.mY, proj2.mY) - Math.max(proj1.mX, proj2.mX);
			if (mtvOverlap < collisionResult.mMTMagnitude || (i == 0 && j == 0)) {
				collisionResult.mMTAxis.Copy(axis);
				collisionResult.mMTMagnitude = mtvOverlap;
			}
		}
	}
	
	collisionResult.mCollision = true;
	if (util.FloatEquals(collisionResult.mMTMagnitude, 0.0) == true) {
		collisionResult.mCollision = false;
	}
	
	{ // make the mtv point from this to other
		var vecA = this.GetCentroid();
		vecA.mX += this.mPos.mX; vecA.mY += this.mPos.mY;
		
		var vecB = other.GetCentroid();
		vecB.mX += other.mPos.mX; vecB.mY += other.mPos.mY;
		
		var vecAB = new Vec2(vecB.mX - vecA.mX, vecB.mY - vecA.mY);
		
		if (collisionResult.mMTAxis.Dot(vecAB) < 0) {
			collisionResult.mMTAxis.mX = -collisionResult.mMTAxis.mX;
			collisionResult.mMTAxis.mY = -collisionResult.mMTAxis.mY;
		}
	}
	
	return collisionResult;
}

*/

