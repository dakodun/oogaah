// utility functions that don't belong to any specific class
var util = new function() {
	this.EPSILON = 1e-6; // epsilon value used for floating-point comparison
	
	// used to compare 2 float values
	this.FloatEquals = function(first, second) {
		// if the absolute value of (first - second) is within the epsilon value
		if (Math.abs(first - second) < this.EPSILON) {
			return true;
		}
		
		return false;
	}
	
	// returns the sig of a number (1 or -1)
	this.SignOf = function(number) {
		var sign = 1; // assume positive initially
		if (number != 0) { // if number is not 0 (0 is assumed to be positive)
			sign = Math.round(number / Math.abs(number)); // set the sign of the number
		}
		
		return sign;
	}
	
	// checks if the specified point is within the axis-aligned rectangle (x1, y2) to (x2, y2) - special case of PointInConvex below
	this.PointInRectangle = function(point, topLeft, bottomRight) {
		// if the point lies within the bounds (lying on the bounds is assumed to be outside)
		if ((point.mX > topLeft.mX) && (point.mX < bottomRight.mX) &&
				(point.mY > topLeft.mY) && (point.mY < bottomRight.mY)) {
			
			return true;
		}
		
		return false;
	}
	
	// checks to see if a point lies within a convex polygon
	this.PointInConvex = function(point, polygon) {
		if (polygon.length > 2) { // if there as at least 3 points in the polygon (triangle)
			var pt = new Vec2(0, 0); pt.Copy(point);
			pt.mX -= 3; pt.mY -= 3;
			
			// copy the polygon to an array and add the first point to the end for looping
			var poly = new Array();
			poly = util.ConcatArray(poly, polygon);
			poly.push(polygon[0]);
			
			// for all points in the polygon
			for (var i = 0; i < poly.length - 1; ++i) {
				//  get the vector from the current point to the point we are checking
				var x1 = pt.mX - poly[i].mX;
				var y1 = pt.mY - poly[i].mY;
				
				// get the vector from the current point to the next point in the polygon
				var x2 = poly[i + 1].mX - poly[i].mX;
				var y2 = poly[i + 1].mY - poly[i].mY;
				
				if ((x1 * y2) - (y1 * x2) > 0) {
					return false; // not inside
				}
			}
			
			return true;
		}
		
		return false; // not inside
	}
	
	// checks for a collision (intersection) between 2 rectangles
	this.RectangleCollision = function(rectAPos, rectASize, rectBPos, rectBSize, touchingCounts) {
		var intersect = false;
		
		var width = rectASize.mX + rectBSize.mX;
		var height = rectASize.mY + rectBSize.mY;
		
		var left = rectAPos.mX;
		var right = rectBPos.mX + rectBSize.mX;
		if (rectBPos.mX < rectAPos.mX) {
			left = rectBPos.mX;
			right = rectAPos.mX + rectASize.mX;
		}
		
		if (right - left < width || (touchingCounts == true && right - left == width)) {
			var top = rectAPos.mY;
			var bottom = rectBPos.mY + rectBSize.mY;
			if (rectBPos.mY < rectAPos.mY) {
				top = rectBPos.mY;
				bottom = rectAPos.mY + rectASize.mY;
			}
			
			if (bottom - top < height || (touchingCounts == true && bottom - top == height)) {
				intersect = true;
			}
		}
		
		return intersect;
	}
	
	// shuffles the contents of an array, returning a new array
	this.ShuffleArray = function(randGen, inputArr) {
		var output = new Array();
		var input = new Array();
		input = input.concat(inputArr);
		
		while (input.length > 0) {
			var id = randGen.GetRandInt(0, input.length - 1);
			output.push(input[id]);
			input.splice(id, 1);
		}
		
		return output;
	}
	
	// 
	this.ConcatArray = function(input, add) {
		for (var i = 0; i < add.length; ++i) {
			input.push(add[i].GetCopy());
		}
		
		return input;
	}
	
	// converts polar coordinates to rectangular (cartesian) coordinates
	this.PolarToRectangular = function(distance, angleRad) {
		return new Vec2(distance * Math.cos(angleRad), distance * Math.sin(angleRad));
	}
	
	// converts rectangular (cartesian) coordinates to polar coordinates
	this.RectangularToPolar = function(x, y) {
		var distance = (x * x) + (y * y); // the magnitude
		var angleRad = (Math.atan2(y, x)); // use atan to account for x = 0 and quadrants
		
		angleRad = (2 * Math.PI) - angleRad; // convert the angle so that 90 is up (instead of down)
		
		// ensure the angle is between 0 => n => 2PI
		while (angleRad >= (2 * Math.PI)) {
			angleRad -= (2 * Math.PI);
		}
		
		while (angleRad < 0) {
			angleRad += (2 * Math.PI);
		}
		
		return new Vec2(distance, angleRad); // return a vector containing the polar coordinates
	}
	
	// adapted from http://stackoverflow.com/a/9847841
	// returns the width and height of text on teh canvas (parity with context.measureText(string))
	this.MeasureText = function(context, string) {
		var result = {}; // an object holding the width and height of the text
		
		// create a span element that will hold our text
		var text = document.createElement("span");
		// text.textContent = "";
		text.style.font = context.font;
		
		// create a div element that will be used to measure text
		var block = document.createElement("div");
		block.style.display = "inline-block";
		block.style.width = "1px";
		block.style.height = "0px";
		
		// create a div element that will hold our text and block elements
		var div = document.createElement("div");
		div.appendChild(text);
		div.appendChild(block);
		
		// add our container div to the body
		var body = document.getElementsByTagName("body")[0];
		body.appendChild(div);
		
		block.style.verticalAlign = "bottom"; // set the alignment of the text
		result.height = block.offsetTop - text.offsetTop; // get the height of the text
		result.width = context.measureText(string).width; // get the width of the text
		
		// remove the container from the body
		body.removeChild(div);
		
		return result; // return the dimensions of the text
	};
};
// ...End

