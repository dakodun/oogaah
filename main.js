/* **************************************************************** **
**	
**	Copyright (c) 2012 Iain M. Crawford
**
**	This software is provided 'as-is', without any express or
**	implied warranty. In no event will the authors be held liable
**	for any damages arising from the use of this software.
**
**	Permission is granted to anyone to use this software for any
**	purpose, including commercial applications, and to alter it
**	and redistribute it freely, subject to the following
**	restrictions:
** 
**		1. The origin of this software must not be misrepresented;
**		   you must not claim that you wrote the original
**		   software. If you use this software in a product, an
**		   acknowledgment in the product documentation would be
**		   appreciated but is not required.
**
**		2. Altered source versions must be plainly marked as such,
**		   and must not be misrepresented as being the original
**		   software.
**
**		3. This notice may not be removed or altered from any
**		   source distribution.
** **************************************************************** */

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


// Matrix3 Class...
// a 3d matrix
function Matrix3(array) {
	var arr = new Array(); // our default values
	
	if (array == null) { // if no array of values was provided
		// set to identity matrix
		arr[0] = 1; arr[1] = 0; arr[2] = 0;
		arr[3] = 0; arr[4] = 1; arr[5] = 0;
		arr[6] = 0; arr[7] = 0; arr[8] = 1;
	}
	else {
		arr = arr.concat(array); // otherwise set to provided values
	}
	
	// set up array representing matrix
	this.mArray = new Array();
	this.mArray[0] = new Array();
	this.mArray[0][0] = arr[0];
	this.mArray[0][1] = arr[1];
	this.mArray[0][2] = arr[2];
	
	this.mArray[1] = new Array();
	this.mArray[1][0] = arr[3];
	this.mArray[1][1] = arr[4];
	this.mArray[1][2] = arr[5];
	
	this.mArray[2] = new Array();
	this.mArray[2][0] = arr[6];
	this.mArray[2][1] = arr[7];
	this.mArray[2][2] = arr[8];
};

// returns the type of this object for validity checking
Matrix3.prototype.Type = function() {
	return "Matrix3";
};

// returns formatted output for this matrix
Matrix3.prototype.Output = function() {
	var str = ""; // the output string containing the matrix
	for (var i = 0; i < 3; ++i) { // for all rows
		for (var j = 0; j < 3; ++j) { // for all columns
			str += this.mArray[i][j] + " "; // add the current matrix value and a space
		}
		
		str += "\n"; // add a new line
	}
	
	return str; // return the output string
};

// make a copy of another (other) matrix (copy constructor)
Matrix3.prototype.Copy = function(other) {
	// row 1
	this.mArray[0][0] = other.mArray[0][0]; // column 1
	this.mArray[0][1] = other.mArray[0][1]; // column 2
	this.mArray[0][2] = other.mArray[0][2]; // column 3
	
	// row 2
	this.mArray[1][0] = other.mArray[1][0];
	this.mArray[1][1] = other.mArray[1][1];
	this.mArray[1][2] = other.mArray[1][2];
	
	// row 3
	this.mArray[2][0] = other.mArray[2][0];
	this.mArray[2][1] = other.mArray[2][1];
	this.mArray[2][2] = other.mArray[2][2];
};

// returns a copy of this matrix
Matrix3.prototype.GetCopy = function() {
	var m = new Matrix3(); m.Copy(this);
	return m;
};

// set the components of the matrix
Matrix3.prototype.Set = function(array) {
	// row 1
	this.mArray[0][0] = array[0]; // column 1
	this.mArray[0][1] = array[1]; // column 2
	this.mArray[0][2] = array[2]; // column 3
	
	// row 2
	this.mArray[1][0] = array[3];
	this.mArray[1][1] = array[4];
	this.mArray[1][2] = array[5];
	
	// row 3
	this.mArray[2][0] = array[6];
	this.mArray[2][1] = array[7];
	this.mArray[2][2] = array[8];
};

// sets this matrix to the indentity matrix
Matrix3.prototype.SetIdentity = function() {
	m.mArray[0][0] = 1; m.mArray[0][1] = 0; m.mArray[0][2] = 0;
	m.mArray[1][0] = 0; m.mArray[1][1] = 1; m.mArray[1][2] = 0;
	m.mArray[2][0] = 0; m.mArray[2][1] = 0; m.mArray[2][2] = 1;
}

// multiply this matrix with other (mutable)
Matrix3.prototype.Multiply = function(other) {
	var m = new Matrix3(); // the resultant matrix
	
	for (var i = 0; i < 3; ++i) { // for all rows
		for (var j = 0; j < 3; ++j) { // for all columns
			// multiply the matrices together
			m.mArray[i][j] = (this.mArray[i][0] * other.mArray[0][j]) +
			(this.mArray[i][1] * other.mArray[1][j]) +
			(this.mArray[i][2] * other.mArray[2][j]);
		}
	}
	
	this.Copy(m); // copy the resultant matrix to this
};

// translates this matrix by multiplying it with the translation matrix
Matrix3.prototype.Translate = function(translation) {
	var m = new Matrix3();
	m.mArray[0][0] = 1; m.mArray[0][1] = 0; m.mArray[0][2] = translation.mX;
	m.mArray[1][0] = 0; m.mArray[1][1] = 1; m.mArray[1][2] = translation.mY;
	m.mArray[2][0] = 0; m.mArray[2][1] = 0; m.mArray[2][2] = 1;
	
	this.Multiply(m);
}

// rotates this matrix by multiplying it with the rotation matrix
Matrix3.prototype.Rotate = function(angle) {
	// convert the angle to radians and ensure that 90 is up (instead of down)
	var angleRad = (2 * Math.PI) - (angle * (Math.PI / 180));
	
	var m = new Matrix3();
	m.mArray[0][0] = Math.cos(angleRad); m.mArray[0][1] = -Math.sin(angleRad); m.mArray[0][2] = 0;
	m.mArray[1][0] = Math.sin(angleRad); m.mArray[1][1] = Math.cos(angleRad);  m.mArray[1][2] = 0;
	m.mArray[2][0] = 0;                  m.mArray[2][1] = 0;                   m.mArray[2][2] = 1;
	
	this.Multiply(m);
}

// scales this matrix by multiplying it with the scaling matrix
Matrix3.prototype.Scale = function(scale) {
	var m = new Matrix3();
	m.mArray[0][0] = scale.mX; m.mArray[0][1] = 0; m.mArray[0][2] = 0;
	m.mArray[1][0] = 0; m.mArray[1][1] = scale.mY; m.mArray[1][2] = 0;
	m.mArray[2][0] = 0; m.mArray[2][1] = 0; m.mArray[2][2] = 1;
	
	this.Multiply(m);
}

// skews the matrix by multiplying it with the skewing matrix
Matrix3.prototype.Skew = function(skew) {
	var angleRad = skew.GetCopy();
	
	// the tangent shouldn't exceed 90 is either direction
	if (angleRad.mX >= 90) {
		angleRad.mX = 89;
	}
	else if (angleRad.mX <= -90) {
		angleRad.mX = -89;
	}
	
	// boundary check for y
	if (angleRad.mY >= 90) {
		angleRad.mY = 89;
	}
	else if (angleRad.mY <= -90) {
		angleRad.mY = -89;
	}
	
	// convert to radians
	angleRad.mX = (angleRad.mX * (Math.PI / 180));
	angleRad.mY = (angleRad.mY * (Math.PI / 180));
	
	var m = new Matrix3();
	m.mArray[0][0] = 1; m.mArray[0][1] = -Math.tan(angleRad.mY); m.mArray[0][2] = 0;
	m.mArray[1][0] = -Math.tan(angleRad.mX); m.mArray[1][1] = 1; m.mArray[1][2] = 0;
	m.mArray[2][0] = 0; m.mArray[2][1] = 0; m.mArray[2][2] = 1;
	
	this.Multiply(m);
}
// ...End


// CountMapItem Class...
// 
function CountMapItem() {
	this.mItem = null;
	this.mCount = 0;
};
// ...End


// CountMap Class...
// 
function CountMap() {
	this.mStore = new Array();
};

CountMap.prototype.Add = function(item) {
	var found = false;
	for (var i = 0; i < this.mStore.length; ++i) {
		if (JSON.stringify(this.mStore[i].mItem) === JSON.stringify(item)) {
			++this.mStore[i].mCount;
			found = true;
			break;
		}
	}
	
	if (found == false) {
		var cmi = new CountMapItem();
		cmi.mItem = item; cmi.mCount = 1;
		this.mStore.push(cmi);
	}
}
// ...End


// Exception Class...
// a custom exception
function Exception(what) {
	this.mWhat = ""; // information about this exception
	if (what != null) { // if a string was passed
		this.mWhat = what;
	}
};

// returns information about this exception
Exception.prototype.What = function() {
	return this.mWhat;
}
// ...End


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


// enums...
// keyboard related enums
var nkeyboard = {
	key : {
		code : {
			a		: 65, // A - Z, a - z
			A		: 65,
			b		: 66,
			B		: 66,
			c		: 67,
			C		: 67,
			d		: 68,
			D		: 68,
			e		: 69,
			E		: 69,
			f		: 70,
			F		: 70,
			g		: 71,
			G		: 71,
			h		: 72,
			H		: 72,
			i		: 73,
			I		: 73,
			j		: 74,
			J		: 74,
			k		: 75,
			K		: 75,
			l		: 76,
			L		: 76,
			m		: 77,
			M		: 77,
			n		: 78,
			N		: 78,
			o		: 79,
			O		: 79,
			p		: 80,
			P		: 80,
			q		: 81,
			Q		: 81,
			r		: 82,
			R		: 82,
			s		: 83,
			S		: 83,
			t		: 84,
			T		: 84,
			u		: 85,
			U		: 85,
			v		: 86,
			V		: 86,
			w		: 87,
			W		: 87,
			x		: 88,
			X		: 88,
			y		: 89,
			Y		: 89,
			z		: 90,
			Z		: 90,
			
			num0	: 48, // TOP ROW NUMBERS
			num1	: 49,
			num2	: 50,
			num3	: 51,
			num4	: 52,
			num5	: 53,
			num6	: 54,
			num7	: 55,
			num8	: 56,
			num9	: 57,
			
			left 	: 37, // ARROW KEYS
			up 		: 38,
			right 	: 39,
			down 	: 40,
			
			backspace: 8,
			lctrl: 17,
			space: 32
		}
	}
};

// mouse related enums
var nmouse = {
	button : {
		code : {
			left 	: 0, // LMB
			middle 	: 1, // MMB
			right 	: 2 // RMB
		}
	}
};
// ...End


// input callbacks...
// register our call back to handle key down (and pressed)
document.onkeydown = function(e) {
	nmgrs.inputMan.HandleKeyDown(e);
}

// register our call back to handle key up (and released)
document.onkeyup = function(e) {
	nmgrs.inputMan.HandleKeyUp(e);
}

// register callback for key press (text input)
document.onkeypress = function(e) {
	nmgrs.inputMan.HandleKeyPress(e);
}

// register our call back to handle mouse movement
document.onmousemove = function(e) {
	nmgrs.inputMan.HandleMouseMove(e);
}

// register our call back to handle button down (and pressed)
document.onmousedown = function(e) {
	nmgrs.inputMan.HandleMouseDown(e);
}

// register our call back to handle button up (and released)
document.onmouseup = function(e) {
	nmgrs.inputMan.HandleMouseUp(e);
}

if (document.onmousewheel) {
	// register our call back to handle mouse wheel rotation
	document.onmousewheel = function(e) {
		nmgrs.inputMan.HandleMouseWheel(e);
	}
}
else {
	// register our call back to handle mouse wheel rotation
	document.addEventListener('DOMMouseScroll', function(e) {nmgrs.inputMan.HandleMouseWheel(e);}, false);
}
// ...End

// InputManager Class...
// handles user input (keyboard and mouse)
function InputManager() {
	// the state of each key (up to 255)
	this.mKeyStates = new Array();
	for (var i = 0; i < 255; ++i) {
		this.mKeyStates[i] = 0;
	}
	
	// the state of each mouse button (left, right and middle)
	this.mButtonStates = new Array();
	for (var i = 0; i < 3; ++i) {
		this.mButtonStates[i] = 0;
	}
	
	this.mMouseInCanvas = false; // is the mouse inside the canvas
	this.mLocalMouseCoords = new Vec2(0, 0); // coordinates of the mouse in the canvas
	this.mGlobalMouseCoords = new Vec2(0, 0); // coordinates of the mouse in the page
	this.mWheelDelta = 0;
	
	this.mTextInput = ""; // current text string that has been input since last frame
	
	this.mDisableBackspace = true; // should backspace functionality be disabled (usually 'back')
	this.mDisableMouseWheel = false; // should mouse wheel functionality be disabled (usually 'page scrolling')
};

// process the input manager (update key and button states)
InputManager.prototype.Process = function() {
	// update all key states
	for (var i = 0; i < 255; ++i) {
		if (this.mKeyStates[i] == 2) { // if key was pressed last frame
			this.mKeyStates[i] = 1; // it is now down
		}
		else if (this.mKeyStates[i] == 3) { // if key was released last frame
			this.mKeyStates[i] = 0; // it is now up
		}
	}
	
	// update all button states
	for (var i = 0; i < 3; ++i) {
		if (this.mButtonStates[i] == 2) { // if button was pressed last frame
			this.mButtonStates[i] = 1; // it is now down
		}
		else if (this.mButtonStates[i] == 3) { // if button was released last frame
			this.mButtonStates[i] = 0; // it is now up
		}
	}
	
	this.mWheelDelta = 0;
	
	this.mTextInput = ""; // reset the text input string
}

// handle key down
InputManager.prototype.HandleKeyDown = function(e) {
	// if key was previously up
	if (this.mKeyStates[e.keyCode] == 0) {
		this.mKeyStates[e.keyCode] = 2; // key is now pressed (note: not down)
	}
	
	if (e.keyCode == 8) { // if the key pressed was backspace
		if (this.mDisableBackspace == true) { // if we're to ignore backspace default action
			e.preventDefault(); // prevent default action
		}
	}
}

// handle key press, used text input
InputManager.prototype.HandleKeyPress = function(e) {
	// if the key is a valid character
	if ((e.which >= 32 && e.which <= 126) || (e.which == 163)  || (e.which == 172)) {
		if (e.ctrlKey == false && e.altKey == false) { // if no modifiers are held (except shift)
			this.mTextInput += String.fromCharCode(e.which); // add the character to the text input string
		}
	}
}

// handle key up
InputManager.prototype.HandleKeyUp = function(e) {
	// if key was previously down
	if (this.mKeyStates[e.keyCode] == 1) {
		this.mKeyStates[e.keyCode] = 3; // key is now released (note: not up)
	}
}

// handle mouse movement
InputManager.prototype.HandleMouseMove = function(e) {
	{
		// get the local coordinates using the canvases position on the page
		this.mLocalMouseCoords.mX = e.pageX - nmain.game.mCanvasPos.mX;
		this.mLocalMouseCoords.mY = e.pageY - nmain.game.mCanvasPos.mY;
		
		this.mMouseInCanvas = true; // assume mouse is inside canvas
		
		// if mouse x is off the canvas then set it to the bounds
		if (this.mLocalMouseCoords.mX < 0) {
			this.mLocalMouseCoords.mX = 0;
			this.mMouseInCanvas = false;
		}
		else if (this.mLocalMouseCoords.mX > nmain.game.mCanvasSize.mX) {
			this.mLocalMouseCoords.mX = nmain.game.mCanvasSize.mX;
			this.mMouseInCanvas = false;
		}
		
		
		// if mouse y is off the canvas then set it to the bounds
		if (this.mLocalMouseCoords.mY < 0) {
			this.mLocalMouseCoords.mY = 0;
			this.mMouseInCanvas = false;
		}
		else if (this.mLocalMouseCoords.mY > nmain.game.mCanvasSize.mY) {
			this.mLocalMouseCoords.mY = nmain.game.mCanvasSize.mY;
			this.mMouseInCanvas = false;
		}
	}
	
	// set the global coordinates to mouses position on the page
	this.mGlobalMouseCoords.mX = e.pageX;
	this.mGlobalMouseCoords.mY = e.pageY;
}

// handle button down
InputManager.prototype.HandleMouseDown = function(e) {
	// if key was previously up
	if (this.mButtonStates[e.button] == 0) {
		this.mButtonStates[e.button] = 2; // key is now pressed (note: not down)
	}
}

// handle button up
InputManager.prototype.HandleMouseUp = function(e) {
	// if key was previously down
	if (this.mButtonStates[e.button] == 1) {
		this.mButtonStates[e.button] = 3; // key is now released (note: not up)
	}
}

// handle mouse wheel rotation
InputManager.prototype.HandleMouseWheel = function(e) {
	var delta = 0;
	if (e.wheelDelta) {
		delta = e.wheelDelta;
	}
	else {
		delta = e.detail;
	}
	
	if (delta > 0) {
		++this.mWheelDelta;
	}
	else if (delta < 0) {
		--this.mWheelDelta;
	}
	
	if (this.mDisableMouseWheel == true) { // if we're to ignore mouse wheel default action
		e.preventDefault(); // prevent default action
	}
}

// returns true if key is down (including pressed); if returning false then you can assume up or released (not down)
InputManager.prototype.GetKeyboardDown = function(key) {
	// if key is valid
	if (key >= 0 && key <= 255) {
		// if key state is down or pressed
		if (this.mKeyStates[key] == 1 || this.mKeyStates[key] == 2) {
			return true;
		}
	}
	
	return false;
}

// returns true if a key was pressed since last frame (for 1 frame only)
InputManager.prototype.GetKeyboardPressed = function(key) {
	// if key is valid
	if (key >= 0 && key <= 255) {
		// if key state is pressed
		if (this.mKeyStates[key] == 2) {
			return true;
		}
	}
	
	return false;
}

// returns true if a key was released since last frame (for 1 frame only)
InputManager.prototype.GetKeyboardReleased = function(key) {
	// if key is valid
	if (key >= 0 && key <= 255) {
		// if key state is released
		if (this.mKeyStates[key] == 3) {
			return true;
		}
	}
	
	return false;
}

// returns true if the mouse is inside the canvas
InputManager.prototype.GetMouseInCanvas = function() {
	return this.mMouseInCanvas;
}

// returns the coordinates of the mouse on the canvas
InputManager.prototype.GetLocalMouseCoords = function() {
	var ret = new Vec2();
	ret.Copy(this.mLocalMouseCoords); // get a copy of the local coordinates (copy constructor)
	return ret;
}

// returns the coordinates of the mouse on the page
InputManager.prototype.GetGlobalMouseCoords = function() {
	var ret = new Vec2();
	ret.Copy(this.mGlobalMouseCoords); // get a copy of the global coordinates (copy constructor)
	return ret;
}

// returns true if button is down (including pressed); if returning false then you can assume up or released (not down)
InputManager.prototype.GetMouseDown = function(button) {
	// if button is valid
	if (button >= 0 && button <= 2) {
		// if button state is down or pressed
		if (this.mButtonStates[button] == 1 || this.mButtonStates[button] == 2) {
			return true;
		}
	}
	
	return false;
}

// returns true if a button was pressed since last frame (for 1 frame only)
InputManager.prototype.GetMousePressed = function(button) {
	// if button is valid
	if (button >= 0 && button <= 2) {
		// if button state is pressed
		if (this.mButtonStates[button] == 2) {
			return true;
		}
	}
	
	return false;
}

// returns true if a button was released since last frame (for 1 frame only)
InputManager.prototype.GetMouseReleased = function(button) {
	// if button is valid
	if (button >= 0 && button <= 2) {
		// if button state is released
		if (this.mButtonStates[button] == 3) {
			return true;
		}
	}
	
	return false;
}

// 
InputManager.prototype.GetMouseWheel = function() {
	return this.mWheelDelta;
}

// sets the style of the cursor
InputManager.prototype.SetCursorStyle = function (cursorStyle) {
	document.body.style.cursor = cursorStyle;
}
// ...End


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


// SceneManager Class...
// handles the creation and destruction of scenes, changing between scenes and storing and restoring persistent scenes
function SceneManager() {
	this.mCurrScene = null; // our current scene
	this.mSceneStore = new Array(); // all of our stored (persistent) scenes
	
	this.mReadyScene = null; // the scene we will switch to set in ReadyScene()
	this.mIsSetUp = false;
};

// initialises the scene manager
SceneManager.prototype.SetUp = function() {
	
}

// cleans up the scene manager and all scenes currently stored
SceneManager.prototype.TearDown = function() {
	// for all currently stored scenes
	for (var i = 0; i < this.mSceneStore.length; ++i) {
		this.mSceneStore[i].TearDown(); // clean up
	}
	
	this.mSceneStore.splice(0, this.mSceneStore.length); // remove all scenes
	this.mCurrScene = null; // set current scene to null
}

// returns the current scene
SceneManager.prototype.GetCurrentScene = function() {
	return this.mCurrScene;
}

// adds a new scene to the scene manager but doesn't yet switch which allows interaction betweens scenes
SceneManager.prototype.RequestSceneChange = function(newScene) {
	// this.mReadyScene = newScene;
	var found = false; // indicates if we have found a previously stored scene
	
	// for all currently stored (persistent) scenes
	for (var i = 0; i < this.mSceneStore.length; ++i) {
		// if we find a match
		if (this.mSceneStore[i].Type() == newScene.Type()) {
			this.mReadyScene = this.mSceneStore[i]; // restore the stored scene as our ready (next) scene
			this.mSceneStore.splice(i, i + 1); // remove it from the store
			this.mIsSetUp = true; // scene has been set up (persistent)
			found = true; // indicate we have found a persistent scene to restore
			break;
		}
	}
	
	// if we didn't find a scene to restore
	if (found == false) {
		this.mReadyScene = newScene; // create a new scene
		this.mIsSetUp = false; // scene hasn't been set up yet (not persistent)
	}
}

// 
SceneManager.prototype.ChangeScene = function() {
	if (this.mReadyScene != null) {
		// if we have a current scene (i.e., this is not our initial scene change on game start up)
		if (this.mCurrScene != null) {
			// if this scene is to be persistent
			if (this.mCurrScene.mPersist == true) {
				this.mSceneStore.push(this.mCurrScene); // store this scene
			}
			else {
				this.mCurrScene.TearDown(); // otherwise clean up and destroy this scene
			}
		}
		
		this.mCurrScene = this.mReadyScene; // set the current scene to the scene we prepared
		
		if (this.mIsSetUp == false) { // if the new scene hasn't been set up yet (it wasn't persistent)
			this.mCurrScene.SetUp(); // set up the new scene
		}
		
		this.mReadyScene = null; // discard the readied scene
	}
}
// ...End


// ResourceSort function
// sorts *Resource objects based on the resource name
function ResourceSort(first, second) {
	var result = 0;
	if (second.mResName < first.mResName) {
		result = 1;
	}
	else if (first.mResName < second.mResName) {
		result = -1;
	}
	
	return result;
};
// ...End

// Resource Class...
// holds a resource and an associated name
function Resource(resource, resourceName) {
	this.mRes = resource; // our resource data
	this.mResName = resourceName; // the id of our resource (string)
};
// ...End

// QueuedResource Class...
// holds a resource name and the location of the resource
function QueuedResource(resourceName, resourceLocation) {
	this.mResName = resourceName; // the id of our resource (string)
	this.mResLocation = resourceLocation; // the location of our resource on disk
};
// ...End


// ResourceStore Class...
// holds a specific type of resource and handles loading, retrieving and destruction
function ResourceStore() {
	this.mStore = new Array(); // our stored resources
};

// creates a resource and adds it to our store, returning a handle to it
ResourceStore.prototype.AddResource = function(resource, resourceName) {
	// replace with a binary search; queue already sorted, use more efficient insert
	
	// for all our stored resources
	for (var i = 0; i < this.mStore.length; ++i) {
		// if we find a match to the one we are trying to add then error
		if (this.mStore[i].mResName == resourceName) {
			throw Exception("Resource already exists.");
		}
	}
	
	this.mStore.push(new Resource(resource, resourceName)); // add to the store
	this.mStore.sort(ResourceSort); // sort the store
	
	return this.GetResource(resourceName); // return our new resource
};

// removes a resource from the store, cleaning up after it
ResourceStore.prototype.RemoveResource = function(resourceName) {
	// replace with a binary search
	
	// for all our stored resources
	for (var i = 0; i < this.mStore.length; ++i) {
		// if we find a match to the one we are trying to remove
		if (this.mStore[i].mResName == resourceName) {
			this.mStore[i].TearDown(); // perform cleanup
			this.mStore.splice(i, i + 1); // remove it from the store
		}
	}
	
	// otherwise error
	throw Exception("Resource doesn't exist.");
};

// returns a handle to a stored resource if found
ResourceStore.prototype.GetResource = function(resourceName) {
	// replace with a binary search
	
	// for all our stored resources
	for (var i = 0; i < this.mStore.length; ++i) {
		// if we find a match to the one we are trying to retrieve
		if (this.mStore[i].mResName == resourceName) {
			return this.mStore[i].mRes; // return it
		}
	}
	
	// otherwise error
	throw Exception("Resource not found.");
};
// ...End


// ResourceStore Class...
// handles the loading of a batch of asynchronous resources such as images or sounds
function ResourceLoader() {
	this.mTexQueue = new Array(); // the queue of unprocessed textures
	this.mFontQueue = new Array(); // the queue of unprocessed fonts
	this.mSndQueue = new Array(); // the queue of unprocessed audio
	
	this.mWorking = false; // indicates if our resourceloader is currently working
	this.mIntervalID = null; // the handle of the interval that is checking the state of the resources
};

// adds a texture to the queue for future processing
ResourceLoader.prototype.QueueTexture = function(texName, texLocation) {
	// replace with a binary search; queue already sorted, use more efficient insert
	
	// if we are currently processing resources then error
	if (this.mWorking == true) {
		throw Exception("Resource loader already working.");
	}
	
	// for all textures in the queue
	for (var i = 0; i < this.mTexQueue.length; ++i) {
		// if we find a match to the one we are trying to add then error
		if (this.mTexQueue[i].mResName == texName) {
			throw Exception("Resource already exists.");
		}
	}
	
	this.mTexQueue.push(new QueuedResource(texName, texLocation)); // add to the queue
	this.mTexQueue.sort(ResourceSort); // sort the queue
}

// adds a font to the queue for future processing
ResourceLoader.prototype.QueueFont = function(fontName, fontLocation) {
	// replace with a binary search; queue already sorted, use more efficient insert
	
	// if we are currently processing resources then error
	if (this.mWorking == true) {
		throw Exception("Resource loader already working.");
	}
	
	// for all textures in the queue
	for (var i = 0; i < this.mFontQueue.length; ++i) {
		// if we find a match to the one we are trying to add then error
		if (this.mFontQueue[i].mResName == fontName) {
			throw Exception("Resource already exists.");
		}
	}
	
	this.mFontQueue.push(new QueuedResource(fontName, fontLocation)); // add to the queue
	this.mFontQueue.sort(ResourceSort); // sort the queue
}

// adds an audio file to the queue for future processing
ResourceLoader.prototype.QueueSound = function(sndName, sndLocation) {
	// replace with a binary search; queue already sorted, use more efficient insert
	
	// if we are currently processing resources then error
	if (this.mWorking == true) {
		throw Exception("Resource loader already working.");
	}
	
	// for all audio in the queue
	for (var i = 0; i < this.mSndQueue.length; ++i) {
		// if we find a match to the one we are trying to add then error
		if (this.mSndQueue[i].mResName == sndName) {
			throw Exception("Resource already exists.");
		}
	}
	
	this.mSndQueue.push(new QueuedResource(sndName, sndLocation)); // add to the queue
	this.mSndQueue.sort(ResourceSort); // sort the queue
}

// processes all resources currently in the queue
ResourceLoader.prototype.AcquireResources = function() {
	this.mWorking = true; // indicate we are currently working
	
	// for all textures in the queue
	for (var i = 0; i < this.mTexQueue.length; ++i) {
		// add texture to resource manager and load the associated image
		var tex = nmgrs.resMan.mTexStore.AddResource(new Texture(), this.mTexQueue[i].mResName);
		tex.LoadFromFile(this.mTexQueue[i].mResLocation);
	}
	
	// for all fonts in the queue
	for (var i = 0; i < this.mFontQueue.length; ++i) {
		// add font to resource manager and load the associated font file
		var font = nmgrs.resMan.mFontStore.AddResource(new Font(), this.mFontQueue[i].mResName);
		font.LoadFromFile(this.mFontQueue[i].mResName, this.mFontQueue[i].mResLocation);
	}
	
	// for all audio in the queue
	for (var i = 0; i < this.mSndQueue.length; ++i) {
		// add audio to resource manager and load the associated file
		var snd = nmgrs.resMan.mSndStore.AddResource(new SoundBuffer(), this.mSndQueue[i].mResName);
		snd.LoadFromFile(this.mSndQueue[i].mResLocation);
	}
}

// periodically checks the progress of our resource loader
ResourceLoader.prototype.ProgressCheck = function() {
	// if we are currently working (otherwise no progress will be made)
	if (this.mWorking == true) {
		// for all textures in the queue
		for (var i = 0; i < this.mTexQueue.length; ++i) {
			// check if the texture has finished loading, whether or not it was successful
			var tex = nmgrs.resMan.mTexStore.GetResource(this.mTexQueue[i].mResName);
			if (tex.mImg.mLoaded == "load" || tex.mImg.mLoaded == "abort" || tex.mImg.mLoaded == "error") {
				if (tex.mImg.mLoaded == "abort" || tex.mImg.mLoaded == "error") {
					alert("Texture failed to load: " + tex.mImg.mLoaded);
				}
				
				this.mTexQueue.splice(i, 1); // remove the texture from the unprocessed queue
			}
		}
		
		// for all fonts in the queue
		for (var i = 0; i < this.mFontQueue.length; ++i) {
			// check if the font has finished loading, whether or not it was successful
			var font = nmgrs.resMan.mFontStore.GetResource(this.mFontQueue[i].mResName);
			font.CheckLoadStatus();
			if (font.mLoaded == "load" || font.mLoaded == "abort" || font.mLoaded == "error") {
				if (font.mLoaded == "abort" || font.mLoaded == "error") {
					alert("Font failed to load: " + font.mLoaded);
				}
				
				this.mFontQueue.splice(i, 1); // remove the font from the unprocessed queue
			}
		}
		
		// for all audio in the queue
		for (var i = 0; i < this.mSndQueue.length; ++i) {
			// check if the audio has finished loading, whether or not it was successful
			var snd = nmgrs.resMan.mSndStore.GetResource(this.mSndQueue[i].mResName);
			if (snd.mAud.mLoaded == "load" || snd.mAud.mLoaded == "abort" || snd.mAud.mLoaded == "error") {
				if (snd.mAud.mLoaded == "abort" || snd.mAud.mLoaded == "error") {
					alert("Audio failed to load: " + snd.mAud.mLoaded);
				}
				
				this.mSndQueue.splice(i, 1); // remove the audio from the unprocessed queue
			}
		}
		
		// if our unprocessed queue is now empty
		if (this.mTexQueue.length == 0 && this.mFontQueue.length == 0) { // && this.mSndQueue.length == 0) {
			this.mWorking = false; // we are finished working
			clearInterval(this.mIntervalID); // stop checking for progress
			this.mIntervalID = null; // clear interval handle
		}
	}
	else {
		// if called by an interval
		if (this.mIntervalID != null) {
			clearInterval(this.mIntervalID); // function called in error, stop future calls
			this.mIntervalID = null; // clear interval handle
		}
	}
}
// ...End


// ResourceManager Class...
// holds the resource stores for each individual resource type
function ResourceManager() {
	this.mTexStore = new ResourceStore(); // storage for our textures
	this.mFontStore = new ResourceStore(); // storage for our fonts
	this.mSndStore = new ResourceStore(); // storage for our audio
};
// ...End


// Texture Class...
// a texture (wrapper for javascript Image)
function Texture() {
	this.mImg = new Image(); // the image associated with our texture
	this.mImg.mLoaded = ""; // the load status of our image
	
	// called when the image successfully loads
	this.mImg.onload = function() {
		this.mLoaded = "load";
	}
	
	// called when the image loading is cancelled
	this.mImg.onabort = function() {
		this.mLoaded = "abort";
	}
	
	// called when the image fails to load
	this.mImg.onerror = function() {
		this.mLoaded = "error";
	}
};

// returns the type of this object for validity checking
Texture.prototype.Type = function() {
	return "Texture";
}

// loads a texture from a file
Texture.prototype.LoadFromFile = function(source) {
	this.mImg.mLoaded = ""; // reset our loading status to blank
	this.mImg.src = source; // attempt to load our image
}
// ...End


// Font Class...
// 
function Font() {
	this.mFontName = "";
	this.mLoaded = ""; // the load status of our font
	this.mFailTimer = new Timer();
};

// returns the type of this object for validity checking
Font.prototype.Type = function() {
	return "Font";
}

// loads a custom font from a file
Font.prototype.LoadFromFile = function(fontName, fontFile) {
	this.mLoaded = ""; // no initial load status
	this.mFailTimer.Reset(); // reset the load timeout
	
	this.mFontName = fontName; // set the name of the font
	
	// create the css rule that defines the font
	var rule = "@font-face { font-family: " + fontName + "; src: url('" + fontFile + ".ttf'), url('" + fontFile + ".eot'); }";
	
	// append the rule to the stylesheet depending on which method the browser supports
	if (nmain.game.mStyleSheet.styleSheet) {
		nmain.game.mStyleSheet.styleSheet.cssText += rule;
	}
	else {
		nmain.game.mStyleSheet.appendChild(document.createTextNode(rule));
	}
}

// checks the current status of the font
Font.prototype.CheckLoadStatus = function() {
	var str = "This is the Test String!"; // string used to test if the font has loaded
	var old = nmain.game.mCurrContext.font; // store the current font
	
	nmain.game.mCurrContext.font = "256px Impact"; // choose a really large font to test against
	var widthControl = nmain.game.mCurrContext.measureText(str).width; // get the width of the test font
	
	nmain.game.mCurrContext.font = "256px " + this.mFontName + ", Impact"; // try to set to our new font, fall back on previous test font if failure
	var widthTest = nmain.game.mCurrContext.measureText(str).width; // get the width of the new font
	
	// if the widths do not match then we can assume (which is correct in most cases) that we didn't fall back to the test font
	if (widthControl != widthTest) {
		this.mLoaded = "load"; // indicate success
	}
	
	nmain.game.mCurrContext.font = old; // reset the font to the stored current font
	
	if (this.mLoaded != "load") {
		if (this.mFailTimer.GetElapsedTime() > 10000) { // timeout after 10 seconds
			this.mLoaded = "error"; // we've timed out
		}
	}
}
// ...End


// SoundBuffer Class...
// 
function SoundBuffer() {
	this.mAud = new Audio();
	this.mAud.mLoaded = "";
	
	this.mAud.controls = false;
	this.mAud.loop = false;
	
	// called when the audio successfully loads
	this.mAud.oncanplay = function() {
		this.mLoaded = "load";
	}
	
	// called when the audio loading is cancelled
	this.mAud.onabort = function() {
		this.mLoaded = "abort";
	}
	
	// called when the audio fails to load
	this.mAud.onerror = function() {
		this.mLoaded = "error";
	}
};

// returns the type of this object for validity checking
SoundBuffer.prototype.Type = function() {
	return "SoundBuffer";
};

// loads a soundbuffer from a file
SoundBuffer.prototype.LoadFromFile = function(source) {
	this.mAud.mLoaded = "";
	
	var supportTest = new Audio();
	if (supportTest.canPlayType("audio/wav") != "") {
		this.mAud.src = source + ".wav";
	}
	else {
		this.mAud.src = source + ".aac";
	}
}
// ...End


// Sound Class...
function Sound() {
	this.mSndBuffer = null; // the associated sound buffer (sound element and source)
	this.mClone = null; // the clone of the sound, a copy of the sound buffer element used to allow multiple sounds to play at the same time
	
	this.mStatus = "stopped"; // the current internal status of the sound
	
	this.mLoop = false; // should the sound repeat when it is finished playing
	this.mVolume = 100; // the current volume (0 - 100)
};

// returns the type of this object for validity checking
Sound.prototype.Type = function() {
	return "Sound";
}

// process the status of the sound
Sound.prototype.Process = function() {
	if (this.mClone != null) { // if this sound has a clone (has been started)
		if (this.mClone.paused == true && this.mStatus != "paused") { // if the sound is stopped but not paused
			this.mStatus = "stopped"; // the sound has finished
			this.mClone = null; // remove the clone
		}
	}
}

// sets the buffer (sound source)
Sound.prototype.SetSoundBuffer = function(sndBuff) {
	this.mSndBuffer = sndBuff;
}

// plays the sound
Sound.prototype.Play = function() {
	if (this.mStatus == "paused") { // if the sound is paused (was already playing previously)
		this.mClone.volume = this.mVolume / 100; // reset the volume
		this.mClone.loop = this.mLoop; // reset the loop status
		
		this.mClone.play(); // resume the sound
	}
	else {
		this.mClone = (this.mSndBuffer.mAud.cloneNode(true)); // create a clone of the sound element
		
		this.mClone.volume = this.mVolume / 100; // set the volume
		this.mClone.loop = this.mLoop; // set the loop status
		
		this.mClone.play(); // start the sound playing
		this.mStatus = "playing";
	}
}

// stops the sound
Sound.prototype.Stop = function() {
	if (this.mStatus == "playing") { // if the sound is playing
		this.mClone.pause(); // pause the clone
		this.mClone = null; // remove the clone
		this.mStatus = "stopped";
	}
}

// pauses the sound
Sound.prototype.Pause = function() {
	if (this.mStatus == "playing") { // if the sound is playing
		this.mClone.pause(); // pause the clone
		this.mStatus = "paused";
	}
}

// sets the volume of the sound
Sound.prototype.SetVolume = function(volume) {
	this.mVolume = volume; // set the volume
	
	if (this.mStatus == "playing") { // if the sound is already playing
		this.mClone.volume = this.mVolume / 100; // set the volume of the clone
	}
}

// should the sound repeat
Sound.prototype.SetLoop = function(loop) {
	this.mLoop = loop; // set the loop status
	
	if (this.mStatus == "playing") { // if the sound is already playing
		this.mClone.loop = this.mLoop; // set the status of the clone
	}
}

// ...End


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
	this.mSkew = new Vec2();
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
	this.mSkew.Copy(other.mSkew); // copy the skew
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

Renderable.prototype.SetSkew = function(skew) {
	this.mSkew.Copy(skew);
	
	this.UpdateGlobalBoundingBox();
	this.UpdateGlobalMask();
}

Renderable.prototype.GetSkew = function() {
	return this.mSkew;
}

Renderable.prototype.Skew = function(skew) {
	this.mTransformation.Skew(skew);
	
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
		trans.Skew(this.mSkew);
		trans.Scale(this.mScale); // apply scale first (to scale in x and y axes as defined by the texture)
		trans.Translate(new Vec2(-this.mOrigin.mX, -this.mOrigin.mY)); // translate to the origin
	}
	
	this.mGlobalMask.Transform(trans); // transform the global mask by the transformation matrix
}
// End...


// TextPart Class...
// a renderable text part - usually a line or an individual word used in the renderable text class
function TextPart() {
	this.mPos = new Vec2();
	this.mString = "";
};

// make a deep copy of another (other) text part
TextPart.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mString = other.mString;
}

// return a deep copy of this text part
TextPart.prototype.GetCopy = function() {
	var tp = new TextPart(); tp.Copy(this); // create a new text part and copy this into it
	return tp; // return the new text part
}
// ...End


// Text Class...
// renderable text
function Text() {
	Renderable.apply(this, null); // construct the base class
	
	this.mFont = null; // the font object used to render the text
	this.mFontSize = 12; // the size of the text
	this.mFontString = "12px Arial"; // the internal font string used when rendering
	this.mVSpacing = 1; // vertical spacing modifier of the font
	
	this.mString = ""; // the current text to be rendered
	this.mTextParts = new Array();
	this.mColour = "#FFFFFF"; // the colour of the text
	
	this.mShadow = false; // whether to render an offset shadow
	this.mShadowAlpha = 1.0; // the alpha value of the shaod
	this.mShadowColour = "#000000"; // the colour of the offset shadow
	this.mShadowBlur = 0; // the amount for blur to apply to the shaodw
	this.mShadowOffset = new Vec2(1, 1); // the shadow's offset in comparison to the text
	
	this.mOutline = false; // whether to draw an outline around the text or not
	this.mOutlineColour = "#000000"; // the colour of the text outline
	this.mOutlineAlpha = 1.0; // the alpha value of the text outline
	this.mOutlineWidth = 1; // the width of the text outline
	
	this.mAlign = "left"; // the alignment of the text (left, centre, right)
	
	this.mWrap = false; // should this text wrap
	this.mWrapWidth = 0; // the width that the text should wrap within when text wrap is true
	this.mWrapWordLength = 6; // the minimum word length on which hyphenation can occur (minimum is 6)
};

// inherit the base class's prototype
Text.prototype = Object.create(Renderable.prototype);

// returns the type of this object for validity checking
Text.prototype.Type = function() {
	return "Text";
}

// make a deep copy of another (other) text
Text.prototype.Copy = function(other) {
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
	this.mCompositeOp = other.mCompositeOp;
	
	this.mLocalBoundingBox.Copy(other.mLocalBoundingBox);
	this.mGlobalBoundingBox.Copy(other.mGlobalBoundingBox);
	
	this.mLocalMask.Copy(other.mLocalMask);
	this.mGlobalMask.Copy(other.mGlobalMask);
	
	this.mFont = other.mFont;
	this.mFontSize = other.mFontSize;
	this.mFontString = other.mFontString;
	this.mVSpacing = other.mVSpacing;
	
	this.mString = other.mString;
	
	this.mTextParts.splice(0, this.mTextParts.length);
	this.mTextParts = util.ConcatArray(this.mTextParts, other.mTextParts)
	
	this.mColour = other.mColour;
	
	this.mShadow = other.mShadow;
	this.mShadowAlpha = other.mShadowAlpha;
	this.mShadowColour = other.mShadowColour;
	this.mShadowBlur = other.mShadowBlur;
	this.mShadowOffset.Copy(other.mShadowOffset);
	
	this.mOutline = other.mOutline;
	this.mOutlineColour = other.mOutlineColour;
	this.mOutlineAlpha = other.mOutlineAlpha;
	this.mOutlineWidth = other.mOutlineWidth;
	
	this.mAlign = other.mAlign;
	
	this.mWrap = other.mWrap;
	this.mWrapWidth = other.mWrapWidth;
	this.mWrapWordLength = other.mWrapWordLength;
}

// return a deep copy of this text
Text.prototype.GetCopy = function() {
	var t = new Text(); t.Copy(this); // create a new text and copy this into it
	return t; // return the new text
}

// renders this text to the supplied render target
Text.prototype.Render = function(renderTarget, cull, cullRect) {
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
			
			// set the font of the text (size and family)
			renderTarget.font = this.mFontString;
			
			// store the current alpha value
			var oldAlpha = renderTarget.globalAlpha;
			
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
			
			var shadowColour = "rgba(0, 0, 0, 0)"; // the default shadow colour is black and transparent
			if (this.mShadow == true) { // if shadow is enabled
				// update the shadow string
				shadowColour = "rgba(" + parseInt(this.mShadowColour.substr(1, 2), 16) + ", " +
						parseInt(this.mShadowColour.substr(3, 2), 16) + ", " +
						parseInt(this.mShadowColour.substr(5, 2), 16) + ", " + this.mShadowAlpha + ")";
				
				// set the other attributes of the shadow
				renderTarget.shadowBlur = this.mShadowBlur;
				renderTarget.shadowOffsetX = this.mShadowOffset.mX;
				renderTarget.shadowOffsetY = this.mShadowOffset.mY;
			}
			
			renderTarget.fillStyle = this.mColour; // set the colour of the filled text
			renderTarget.strokeStyle = this.mOutlineColour; // set the colour of the outline
			renderTarget.lineWidth = this.mOutlineWidth; // set the outline width
			
			for (var i = 0; i < this.mTextParts.length; ++i) { // for all text parts
				// set the shadow colour and alpha value of the filled text
				renderTarget.shadowColor = shadowColour;
				renderTarget.globalAlpha = this.mAlpha;
				
				// draw filled text
				renderTarget.fillText(this.mTextParts[i].mString, this.mTextParts[i].mPos.mX, this.mTextParts[i].mPos.mY);
				
				if (this.mOutline == true) { // if we are to do an outline
					// set the shadow colour and alpha value of the filled text
					renderTarget.shadowColor = "rgba(0, 0, 0, 0)"; // no shadow
					renderTarget.globalAlpha = this.mOutlineAlpha;
					
					// draw the outline
					renderTarget.strokeText(this.mTextParts[i].mString, this.mTextParts[i].mPos.mX, this.mTextParts[i].mPos.mY);
				}
			}
			
			renderTarget.globalAlpha = oldAlpha; // restore the old alpha value
			renderTarget.globalCompositeOperation = oldComp; // restore the saved composite value
			renderTarget.restore(); // load the saved transform matrix
		}
	}
}

Text.prototype.UpdateGlobalBoundingBox = function() {
	this.mGlobalBoundingBox.Copy(this.mLocalBoundingBox); // reset the global bbox to the local bbox
	
	var trans = new Matrix3(); trans.Copy(this.mTransformation); // create a copy of our current transformation matrix
	
	{ // apply basic transformations first (in reverse order)
		if (this.mAlign == "centre") {
			this.mGlobalBoundingBox.mPos.mX -= Math.round(this.mSize.mX / 2);
		}
		else if (this.mAlign == "right") {
			this.mGlobalBoundingBox.mPos.mX -= this.mSize.mX;
		}
		
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

Text.prototype.UpdateGlobalMask = function() {
	this.mGlobalMask.Copy(this.mLocalMask); // reset the global mask to the local mask
	
	var trans = new Matrix3(); trans.Copy(this.mTransformation); // create a copy of our current transformation matrix
	
	{ // apply basic transformations first (in reverse order)
		if (this.mAlign == "centre") {
			this.mGlobalMask.mPos.mX -= Math.round(this.mSize.mX / 2);
		}
		else if (this.mAlign == "right") {
			this.mGlobalMask.mPos.mX -= this.mSize.mX;
		}
		
		// translate to current position offsetting by the origin (happens last)
		trans.Translate(new Vec2(this.mPos.mX - this.mOrigin.mX, this.mPos.mY - this.mOrigin.mY));
		
		trans.Translate(new Vec2(this.mOrigin.mX,  this.mOrigin.mY)); // translate back from the origin
		trans.Rotate(this.mRotation); // apply rotation (after scaling is done)
		trans.Skew(this.mSkew);
		trans.Scale(this.mScale); // apply scale first (to scale in x and y axes as defined by the texture)
		trans.Translate(new Vec2(-this.mOrigin.mX, -this.mOrigin.mY)); // translate to the origin
	}
	
	this.mGlobalMask.Transform(trans); // transform the global mask by the transformation matrix
}

// sets the font of the text to the supplied font object reference
Text.prototype.SetFont = function(font) {
	this.mFont = font; // set the font
	this.mFontString = String(this.mFontSize) + "px " + this.mFont.mFontName; // create the internal font string
	
	this.CreateTextParts(); // need to recreate the text parts when a new  font is set (due to sizing)
}

// returns this text objects font reference
Text.prototype.GetFont = function() {
	return this.mFont;
}

// sets the size of the text
Text.prototype.SetFontSize = function(size) {
	this.mFontSize = size; // set the font size
	this.mFontString = String(this.mFontSize) + "px " + this.mFont.mFontName; // create the internal font string
	
	this.CreateTextParts(); // need to recreate the text parts when a new font size is set
}

// returns the size of this text objects font
Text.prototype.GetFontSize = function() {
	return this.mFontSize;
}

// 
Text.prototype.GetFontString = function() {
	return this.mFontString;
}

// sets the text's string value
Text.prototype.SetString = function(string) {
	this.mString = string; // set the string value
	
	this.CreateTextParts(); // need to recreate the text parts when a new string is set
}

// enables wrapping, setting the wrap width and minimum word split length (for hyphenation) if supplied
Text.prototype.EnableWrapping = function(width, minSplit) {
	if (width != null) { // if a width was supplied
		this.mWrapWidth = width; // set it
	}
	
	if (minSplit != null) { // if a minimum split length was supplied
		this.mWrapWordLength = minSplit; // set it
	}
	
	this.mWrap = true; // enable wrapping
	this.CreateTextParts();
}

// disables text wrapping
Text.prototype.DisableWrapping = function() {
	this.mWrap = false;
	this.CreateTextParts();
}

Text.prototype.CreateTextParts = function() {
	this.mTextParts.splice(0, this.mTextParts.length);
	
	var old = nmain.game.mCurrContext.font; // store the current font
	nmain.game.mCurrContext.font = this.mFontString; // set the current font to this font
	
	var txtArr = new Array();
	var blockArr = this.mString.split("\n"); // split the text at any new line characters 
	
	if (this.mWrap == true) { // if text wrap is enabled
		for (var i = 0; i < blockArr.length; ++i) { // for all current text strings ("\n" delimited)
			var blockArrNew = new Array(); // an array to hold our new text strings
			
			var split = blockArr[i].split(" "); // split at " " (space)
			var str = ""; // our new string
			var width = 0; // our new string's width
			
			// for all current 'words' (" " delimited)
			for (var j = 0; j < split.length; ++j) {
				// if the current width + the width of the current 'word' (" " delimited) is less than the specified wrap width
				if (width + nmain.game.mCurrContext.measureText(split[j]).width <= this.mWrapWidth) {
					str += split[j]; // add the current 'word' to the new string
					str += " "; // add a space to the new string
					width = nmain.game.mCurrContext.measureText(str).width; // calculate the new width of the new string
				}
				else { // otherwise it is larger
					var minimumSplit = this.mWrapWordLength; // copy the hyphenation limit
					if (minimumSplit < 6) { // if it is less than the minimum
						minimumSplit = 6; // set it to the minimum
					}
					
					// if the string is empty and the word - split or not - will never fit then we must avoid an infinite loop
					// this happens if the wrapwidth is too small, so just place the word anyway and got to next line
					if (str == "" &&
							((split[j].length < minimumSplit && util.MeasureText(nmain.game.mCurrContext, split[j]).width > this.mWrapWidth) ||
							(split[j].length >= minimumSplit && util.MeasureText(nmain.game.mCurrContext, split[j].substr(0, 3) + "-").width > this.mWrapWidth))) {
						
						str = split[j] + " "; // set the string to the current word (inc. space)
						++j; // increment j (will be decremented later)
					}
					else {
						if (split[j].length >= minimumSplit) { // if the current word is at least the minimum split length (min is 6)
							var strFront = split[j].substr(0, 3) + "-"; // the front part of the cut string (inc. hyphen)
							var spaceLeft = this.mWrapWidth - width; // the amount of space left on the current line (in pixels)
							
							// if the front string (minimum of 3 chars + hyphen) fits
							if (nmain.game.mCurrContext.measureText(strFront).width <= spaceLeft) {
								var cutPos = 0; // the position to cut the string
								for (var k = 3; k < split[j].length - 2; ++k) { // for all characters in the string (except last 3)
									var strTest = split[j].substr(0, k) + "-"; // create new test string (inc. hyphen)
									
									// if new test string + hyphen no longer fits in the leftover space
									if (nmain.game.mCurrContext.measureText(strTest).width > spaceLeft) {
										break; // we're done
									}
									else {
										strFront = strTest; // set the front string to the test string
										cutPos = k; // update the cut position
									}
								}
								
								str += strFront + " "; // add the front string to the current string
								split[j] = split[j].substr(cutPos, split[j].length - 3); // update the current word to the leftover
							}
						}
					}
					
					str = str.substr(0, str.length - 1); // remove the trailing space (there will always be one)
					blockArrNew.push(str); // add the new string to the array
					str = ""; // reset the new string
					width = 0; // reset the width
					--j; // decrement iterator so we repeat the current 'word'
				}
			}
			
			// when we reach here, if width is greater than 0, then we still have a string to push
			if (width > 0) {
				str = str.substr(0, str.length - 1); // remove the trailing space (there will always be one)
				blockArrNew.push(str); // add the final string
			}
			
			txtArr.push(blockArrNew); // add the wrapped text block
		}
	}
	else { // otherwise no wrapping
		txtArr.push(blockArr); // just add the line
	}
	
	var vAlign = 0; // the vertical alignment of each text line (line number)
	var longest = 0; // the current longest line (for multi-line text)
	var totalHeight = 0; // the total height of the entire text
	
	// find the amount that each line of the text should be incremented by
	var heightInc = util.MeasureText(nmain.game.mCurrContext, "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz").height;
	
	for (var i = 0; i < txtArr.length; ++i) { // for all delimited text strings
		var currentBlock = txtArr[i]; // get the current text block
		
		for (var j = 0; j < currentBlock.length; ++j) { // for all words in the current text block
			var strSize = util.MeasureText(nmain.game.mCurrContext, currentBlock[j]);
			if (strSize.width > longest) { // if it is longer than previously stored longest
				longest = strSize.width; // set it as the stored longest
			}
			
			totalHeight += strSize.height;
			
			// if alignment is (justify and text is wrapped) AND (this is not the last line)
			if ((this.mAlign == "justify" && this.mWrap == true) && (j != currentBlock.length - 1)) {
				// split the current line into individual words
				var spacingArr = new Array();
				spacingArr = currentBlock[j].split(" ");
				
				var hAlign = 0; // the current orizontal offset
				
				var spaceLeft = this.mWrapWidth; // the amount of space left at the end of the line (wrap width which is the maximum)
				for (var k = 0; k < spacingArr.length; ++k) { // for all words in the line
					spaceLeft -= nmain.game.mCurrContext.measureText(spacingArr[k]).width; // remove their width from the space left
				}
				
				var gap = spaceLeft / (spacingArr.length - 1); // divide the space left by the number of words
				
				for (var k = 0; k < spacingArr.length; ++k) { // for all words in the line
					{
						var tp = new TextPart(); // the new text part object
						tp.mString = spacingArr[k]; // set the string to the current word
						
						// set the position to the horizontal offset and the vertical offset * line number
						// the y pos also gets modified by the vertical spacing modifier, and starts at font size
						// to fix the origin (javascript sets it to bottom left which doesn't match the engine default)
						tp.mPos.Set(hAlign, this.mFontSize + ((heightInc * vAlign) * this.mVSpacing));
						
						this.mTextParts.push(tp); // add the new text part to the array
					}
					
					// move the horizontal offset by the current word length and the justified gap
					hAlign += nmain.game.mCurrContext.measureText(spacingArr[k]).width;
					hAlign += gap;
				}
				
				++vAlign; // increment the vertical alignment
			}
			else { // otherwise text is to long to be justified
				var hAlign = 0; // assume alignment is at the left point of the text string initially
				
				// if alignment is centred
				if (this.mAlign == "centre") {
					// set alignment to the centre point of the text string
					hAlign = Math.round(0 - (nmain.game.mCurrContext.measureText(currentBlock[j]).width / 2));
				}
				else if (this.mAlign == "right") { // else if align is right aligned
					// set alignment to the right point of the text string
					hAlign = Math.round(0 - nmain.game.mCurrContext.measureText(currentBlock[j]).width);
				}
				
				{
					var tp = new TextPart(); // the new text part object
					tp.mString = currentBlock[j]; // set the string to the current line
					
					// set the position to the horizontal offset and the vertical offset * line number
					// the y pos also gets modified by the vertical spacing modifier, and starts at font size
					// to fix the origin (javascript sets it to bottom left which doesn't match the engine default)
					tp.mPos.Set(hAlign, this.mFontSize + ((heightInc * vAlign) * this.mVSpacing));
					
					this.mTextParts.push(tp); // add the new text part to the array
				}
				
				++vAlign; // increment the vertical alignment
			}
		}
	}
	
	{	
		this.mSize.mX = longest; // set the size to the longest line
		this.mSize.mY = totalHeight * this.mVSpacing; // set the height to the total height modified by the vertical spacing modifier
		
		// if wrapping is enabled and the width is wider than the longest line
		if (this.mWrap == true && this.mWrapWidth > longest) {
			this.mSize.mX = this.mWrapWidth; // set the size to the wrapping width
		}
	}
	
	nmain.game.mCurrContext.font = old; // restore the stored font
	
	// recreate the local bounding box
	this.mLocalBoundingBox.Clear();
	this.mLocalBoundingBox.mPos.Set(0, 0);
	this.mLocalBoundingBox.AddPoint(new Vec2(this.mSize.mX,             0));
	this.mLocalBoundingBox.AddPoint(new Vec2(this.mSize.mX, this.mSize.mY));
	this.mLocalBoundingBox.AddPoint(new Vec2(            0, this.mSize.mY));
	
	this.UpdateGlobalBoundingBox();
}
// ...End


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
	this.mSkew.Copy(other.mSkew);
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


// DepthSort function
// sorts renderable resources based on depth
function DepthSort(first, second) {
	// find the difference between the depths
	var firstDepth = first.mDepth;
	var secondDepth = second.mDepth;
	var result = secondDepth - firstDepth;
	
	// if the depths match, then find the difference between the ids
	if (result == 0) {
		result = first.mID - second.mID;
	}
	
	return result; // <0 || >0
}
// ...End


// RenderBatchSortElement Class...
function RenderBatchSortElement() {
	this.mID = -1;
	this.mDepth = 0;
}
// ...End


// RenderBatch Class...
// a render batch handles all drawing operations and draws according to depth (z) values
function RenderBatch() {
	this.mRenderData = new Array();
	
	this.mNeedSort = false;
	this.mFrustrumCull = true;
};

// initialise the render batch
RenderBatch.prototype.SetUp = function() {
	
}

// clean up the render batch
RenderBatch.prototype.TearDown = function() {
	this.mRenderData.splice(0, this.mRenderData.length);
	this.mNeedSort = false;
	this.mFrustrumCull = true;
}

// add a renderable object to the batch
RenderBatch.prototype.Add = function(renderable) {
	this.mNeedSort = true; // new data entered implies a sort may be needed
	this.mRenderData.push(renderable.GetCopy()); // add a copy of the renderable to the renderables arraya
}

// clear the render batch
RenderBatch.prototype.Clear = function() {
	this.mRenderData.splice(0, this.mRenderData.length);
}

// render the render batch to the canvas
RenderBatch.prototype.Render = function(camera, target) {
	// use the supplied target (context) if valid, otherwise use the main context
	var targ = nmain.game.mCurrContext;
	if (target != null) {
		targ = target;
	}
	
	// if we need to sort the renderables array
	if (this.mNeedSort == true) {
		// add all depths and ids to an array for sorting
		// this ensures a stable sort since if depths are equal, id will be used
		var arr = new Array();
		for (var i = 0; i < this.mRenderData.length; ++i) {
			var element = new RenderBatchSortElement();
			element.mID = i;
			element.mDepth = this.mRenderData[i].mDepth;
			
			arr.push(element);
		}
		
		arr.sort(DepthSort); // sort our element array by depth
		
		// add our renderable data to a temporary array using the order supplied by the sorted elements array
		var temp = new Array();
		for (var i = 0; i < this.mRenderData.length; ++i) {
			temp.push(this.mRenderData[arr[i].mID]);
		}
		
		// set the contents of our renderables array to the contents of the temporary array
		this.mRenderData.splice(0, this.mRenderData.length);
		this.mRenderData = this.mRenderData.concat(temp);
		
		this.mNeedSort = false; // notify that sort is complete
	}
	
	var camContext = targ; // reference to the camera context (if simple cam, reference to main context)
	
	// create the rectangle that frustrum culling is check against, defaulting to canvas' dimensions
	var cullRect = new Polygon();
	cullRect.MakeRectangle(new Vec2(0, 0), new Vec2(targ.canvas.width, targ.canvas.height));
	
	if (camera != null) { // if a camera was supplied
		cullRect.mPos.Copy(camera.mPos); // set the culling rectangle's position to the camera's position
		
		if (camera.Type() == "Camera") { // if camera is NOT simple
			camera.Clear(); // clear the camera's context
			camContext = camera.mContext; // update the context reference
			
			cullRect.MakeRectangle(camera.mPos, camera.mSize); // remake the culling rect to be the size of the camera
		}
		
		for (var i = 0; i < this.mRenderData.length; ++i) { // for all data to be rendered
			if (this.mRenderData[i].mAbsolute == false) { // if the renderable is not absolute
				camContext.save(); // save the current transformation
				camContext.translate(-camera.mPos.mX, -camera.mPos.mY); // apply translation
			}
			
			this.mRenderData[i].Render(camContext, this.mFrustrumCull, cullRect); // render the renderable to the camera's context
			
			if (this.mRenderData[i].mAbsolute == false) {
				camContext.restore(); // restore the previous transformation
			}
		}
		
		if (camera.Type() == "Camera") {
			camera.Render(targ); // render the camera to the target context
		}
	}
	else { // otherwise no camera supplied
		for (var i = 0; i < this.mRenderData.length; ++i) {
			this.mRenderData[i].Render(targ, this.mFrustrumCull, cullRect); // render straight to the target context
		}
	}
}
// ...End


// GUIButton Class...
function GUIButton() {
	this.mPos = new Vec2(0, 0); // the position of the clickable button area
	this.mSize = new Vec2(0, 0); // the size of the clickable button area
	
	this.mStatus = "idle"; // current status of the button
	
	// the various sprites for the various button states
	this.mSpriteIdle = new Sprite();
	this.mSpriteHover = new Sprite();
	this.mSpriteDown = new Sprite();
	this.mSpriteInactive = new Sprite();
	
	this.mActive = true; // is the button active (interactable)
	this.mHover = false; // is the button being hovered over (e.g., by the mouse)
	this.mDown = false; // is the button being held down
	
	this.mWasClicked = false; // was the button clicked since last frame (internal use)
	this.mOnClick = false; // was the button clicked
};

// copy constructor
GUIButton.prototype.Copy = function(other) {
	// copy "other"
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	
	this.mStatus = other.mStatus
	this.mSpriteIdle.Copy(other.mSpriteIdle);
	this.mSpriteHover.Copy(other.mSpriteHover);
	this.mSpriteDown.Copy(other.mSpriteDown);
	this.mSpriteInactive.Copy(other.mSpriteInactive);
	
	this.mActive = other.mActive;
	this.mHover = other.mHover;
	this.mDown = other.mDown;
	this.mWasClicked = other.mWasClicked;
}

// sets up the initial button attributes
GUIButton.prototype.SetUp = function(pos, size, depth) {
	this.mPos.Copy(pos); // set position
	this.mSize.Copy(size); // set size
	
	// set the initial positions and depths of the button sprites (and assume absolute)
	// the sprites can be altered individually later, after calling setup
	this.mSpriteIdle.SetPosition(pos);
	this.mSpriteIdle.mDepth = depth;
	this.mSpriteIdle.mAbsolute = true;
	
	this.mSpriteHover.SetPosition(pos);
	this.mSpriteHover.mDepth = depth;
	this.mSpriteHover.mAbsolute = true;
	
	this.mSpriteDown.SetPosition(pos);
	this.mSpriteDown.mDepth = depth;
	this.mSpriteDown.mAbsolute = true;
	
	this.mSpriteInactive.SetPosition(pos);
	this.mSpriteInactive.mDepth = depth;
	this.mSpriteInactive.mAbsolute = true;
}

// handles the user input relating to the button
GUIButton.prototype.Input = function() {
	if (this.mActive == true) { // if the button is currently active
		if (this.mHover == true) { // and the user is hovering over it
			if (nmgrs.inputMan.GetMouseReleased(nmouse.button.code.left)) { // if the left mouse button is released
				if (this.mDown == true) { // if the button was down previously
					this.mWasClicked = true; // then indicate (internally) that the button was clicked
					this.mDown = false; // reset down status
				}
			}
			else if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left)) { // else if the left mouse button is pressed
				this.mDown = true; // then indicate the button is down
			}
		}
		
		if (nmgrs.inputMan.GetMouseReleased(nmouse.button.code.left)) { // if the left mouse button is released with no hovering
			this.mDown = false; // reset down status
		}
	}
}

// processes the logic relating to button interaction
GUIButton.prototype.Process = function(point) {
	var pt = point;
	if (pt == null) {
		pt = nmgrs.inputMan.GetLocalMouseCoords();
	}
	
	if (this.mWasClicked == true) { // if the button was clicked previously
		this.mWasClicked = false; // reset internal click status
		this.mOnClick = true; // set external click status
	}
	else {
		this.mOnClick = false; // otherwise ensure external click status is false
	}
	
	if (this.mActive == true) { // if the button is active
		// get the bounding box of the button
		var tl = new Vec2(0, 0); tl.Copy(this.mPos);
		
		var br = new Vec2(0, 0); br.Copy(this.mPos);
		br.mX += this.mSize.mX; br.mY += this.mSize.mY;
		
		// check if the point specified is within the button's bounding box
		if (util.PointInRectangle(pt, tl, br)) {
			this.mHover = true; // set the hovering status
			if (this.mDown == false) { // if the button isn't previously down
				this.mStatus = "hover"; // then indicate we are hovering
			}
			else {
				this.mStatus = "down"; // otherwise 'down' status overrides 'hover' status
			}
		}
		else {
			this.mHover = false; // otherwise we aren't inside button
			this.mStatus = "idle"; // button is idle
		}
		
		
		// process the correct sprite depending on current status
		if (this.mStatus == "hover") {
			this.mSpriteHover.Process();
		}
		else if (this.mStatus == "down") {
			this.mSpriteDown.Process();
		}
		else {
			this.mSpriteIdle.Process();
		}
	}
	else {
		this.mSpriteInactive.Process(); // button is inactive
	}
}

// returns the correct data to render the button's current state
GUIButton.prototype.GetRenderData = function() {
	var arr = new Array(); // the array to hold our renderable objects
	
	if (this.mActive == true) { // if the button is active
		// add the correct sprite to the renderables array depending on the current state
		if (this.mStatus == "hover") {
			arr.push(this.mSpriteHover);
		}
		else if (this.mStatus == "down") {
			arr.push(this.mSpriteDown);
		}
		else {
			arr.push(this.mSpriteIdle);
		}
	}
	else {
		arr.push(this.mSpriteInactive); // button is inactive
	}
	
	return arr; // return the renderable objects
}

// returns button click status
GUIButton.prototype.OnClick = function() {
	return this.mOnClick;
}

// returns the position of the sprites (idle only) [deprecated]
GUIButton.prototype.GetSpritePositions = function() {
	return this.mSpriteIdle.GetPosition();
}

// sets the positions of all of the sprites
GUIButton.prototype.SetSpritePositions = function(pos) {
	this.mSpriteIdle.SetPosition(pos);
	this.mSpriteHover.SetPosition(pos);
	this.mSpriteDown.SetPosition(pos);
	this.mSpriteInactive.SetPosition(pos);
}

// sets the depths of all of the sprites
GUIButton.prototype.SetSpriteDepths = function(depth) {
	this.mSpriteIdle.mDepth = depth;
	this.mSpriteHover.mDepth = depth;
	this.mSpriteDown.mDepth = depth;
	this.mSpriteInactive.mDepth = depth;
}
// ...End


// GUIDropDown Class...
function GUIDropDown() {
	this.mPos = new Vec2(0, 0); // the position of the drop-down list
	this.mBase = new GUIButton(); // the button representing a single item in the drop-down list (used for interaction)
	
	this.mItems = new Array(); // an array of buttons representing items in the drop-down (used for interaction)
	this.mItemsText = new Array(); // the text to be shown on an item in the items array
	
	this.mExpanded = false; // is the drop-down list expanded
	
	this.mHover = false; // is the user hovering over any of the items in the drop-down list
};

// sets up initial attributes
GUIDropDown.prototype.SetUp = function(baseButton) {
	this.mPos.Copy(baseButton.mPos); // set the position to the buttons position
	this.mBase.Copy(baseButton); // copy the button to the base button
}

// handles the user input relating to the drop-down list
GUIDropDown.prototype.Input = function() {
	this.mBase.Input(); // process input for the base button
	
	if (this.mExpanded == true) { // if the list is expanded
		for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
			this.mItems[i].Input(); // process input
		}
	}
	
	if (this.mExpanded == true) { // if the list is expanded
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left)) { // if the left mouse button is pressed
			var thisClick = this.mBase.mHover; // set the hover status to the base hover status
			
			if (thisClick == false) { // if the base hover status is false
				for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
					thisClick = this.mItems[i].mHover; // set the hover status to the item's hover status
					if (thisClick == true) { // if hover status is now true
						break; // exit the loop
					}
				}
			}
			
			if (thisClick == false) { // if hover status is still false after looping all items
				this.mExpanded = !this.mExpanded; // collapse the drop-down list (click was outside all item's in the list)
			}
		}
	}
}

// processes the logic relating to drop-down list interaction
GUIDropDown.prototype.Process = function(point) {
	this.mBase.Process(point); // process the base button
	
	if (this.mBase.OnClick() == true) { // if the base button was clicked
		this.mExpanded = !this.mExpanded; // toggle expanded state
	}
	
	if (this.mExpanded == true) { // if the list is expanded
		for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
			this.mItems[i].Process(point); // process the item
		}
	}
	
	{
		this.mHover = false;
		
		if (this.mBase.mHover == true) {
			this.mHover = true;
		}
		else {
			for (var i = 0; i < this.mItems.length; ++i) {
				if (this.mExpanded == true) {
					if (this.mItems[i].mHover == true) {
						this.mHover = true;
						break;
					}
				}
				else {
					this.mItems[i].mOnClick = false;
				}
			}
		}
	}
}

// returns the correct data to render the drop-down list's current state
GUIDropDown.prototype.GetRenderData = function() {
	var arr = new Array(); // the array to hold our renderable objects
	
	if (this.mExpanded == true) { // if the list is expanded
		arr.push(this.mBase.mSpriteDown); // add the 'down' sprite of the base button
		
		for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
			arr = util.ConcatArray(arr, this.mItems[i].GetRenderData()); // get the appropiate render data (button)
		}
		
		for (var i = 0; i < this.mItemsText.length; ++i) { // for all item text in the list
			arr.push(this.mItemsText[i]); // add the text
		}
	}
	else {
		arr = util.ConcatArray(arr, this.mBase.GetRenderData()); // otherwise not expanded so get the appropiate base render data (button)
	}
	
	return arr; // return the renderable objects
}

// returns click status for the supplied item
GUIDropDown.prototype.OnClick = function(itemID) {
	if (itemID >= 0 && itemID < this.mItems.length) { // if the supplied id is within proper bounds
		if (this.mItems[itemID].OnClick()) { // if the supplied item was clicked
			this.mExpanded = false; // collapse the list
			return true; // return success
		}
	}
	
	return false; // return failure
}

// returns the position of the sprites (base idle only) [deprecated]
GUIDropDown.prototype.GetSpritePositions = function() {
	return this.mBase.mSpriteIdle.mPos;
}

// sets the positions of all of the sprites
GUIDropDown.prototype.SetSpritePositions = function(pos) {
	// get the difference between new position and current position
	var posDif = new Vec2(0, 0);
	posDif.Copy(this.mBase.GetSpritePositions());
	posDif.Set(pos.mX - posDif.mX, pos.mY - posDif.mY);
	
	this.mBase.SetSpritePositions(pos); // set the base position
	
	for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
		{ // update the item position by the difference
			var newPos = new Vec2(0, 0);
			newPos.Copy(this.mItems[i].GetSpritePositions());
			newPos.mX += posDif.mX; newPos.mY += posDif.mY;
			this.mItems[i].SetSpritePositions(newPos);
		}
		
		{ // update the text position by the difference
			var newPos = new Vec2(0, 0);
			newPos.Copy(this.mItemsText[i].mPos);
			newPos.mX += posDif.mX; newPos.mY += posDif.mY;
			this.mItemsText[i].mPos.Copy(newPos);
		}
	}
}

// sets the depths of all of the sprites
GUIDropDown.prototype.SetSpriteDepths = function(depth) {
	this.mBase.SetSpriteDepths(depth);
	
	for (var i = 0; i < this.mItems.length; ++i) { // for all items in the list
		this.mItems[i].SetSpriteDepths(depth);
	}
}

// adds an item to the drop-down list
GUIDropDown.prototype.AddItem = function(itemButton, text) {
	// make a copy of the button
	var but = new GUIButton();
	but.Copy(itemButton);
	
	// make a copy of the text
	var txt = new Text();
	txt.Copy(text);
	txt.mAbsolute = true;
	
	var newPos = new Vec2(0, 0); // the position of the new item (offset by previous items)
	
	if (this.mItems.length == 0) { // if this is the first item
		// set position to base and offset by base height
		newPos.Copy(this.mBase.mSpriteIdle.mPos);
		newPos.mY += this.mBase.mSize.mY;
	}
	else {
		// set position to previous item's and offset by previous item's height
		var id = this.mItems.length - 1;
		newPos.Copy(this.mItems[id].mPos);
		newPos.mY += this.mItems[id].mSize.mY;
	}
	
	// update the new button's position
	but.mPos.mX += newPos.mX; but.mPos.mY += newPos.mY;
	but.SetSpritePositions(but.mPos);
	
	// update the new text's position
	txt.mPos.mX += newPos.mX; txt.mPos.mY += newPos.mY;
	
	// add the new item to the list(s)
	this.mItems.push(but);
	this.mItemsText.push(txt);
}
// ...End


// GUIInputBox Class...
function GUIInputBoxCaret() {
	this.mShape = new Shape(); // the shape that represents the caret
	
	this.mFlash = 0; // floating-point value that controls flashing timing
	this.mPlace = 0; // the caret's current place in the string
	this.mOldPlace = 0; // the caret's place in the string last frame
	
	this.mScroll = 0; // the direction in which we are scrolling through the string (-1 => left, 1 => right)
	this.mScrollTimer = 0; // controls the speed at which we scroll through the string when held
	
	// the bounds of the string on the screen
	this.mLeftBound = 0;
	this.mRightBound = 0;
}

// initialises the caret parameters and bounds
GUIInputBoxCaret.prototype.SetUp = function(pos, depth, leftBound, rightBound) {
	// set up the shape
	this.mShape.mPos.Copy(pos);
	this.mShape.mDepth = depth;
	this.mShape.mColour = "#000000";
	this.mShape.mAbsolute = true;
	
	// set up the bounds
	this.mLeftBound = leftBound;
	this.mRightBound = rightBound;
}

// handles user input moving the caret within the string
GUIInputBoxCaret.prototype.Input = function(inputText) {
	if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.left)) { // if left arrow key is pressed
		this.mPlace--; // move the caret left 1 character
		if (this.mPlace < 0) { // if the caret is past the start of the string
			this.mPlace = 0; // set to the start of the string
		}
		
		this.mScroll = -1; // indicate we are scrolling left
		this.mScrollTimer = 0; // reset the scroll timer
		this.mFlash = 0; // reset the flash timer (don't flash when scrolling)
	}
	else if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.right)) { // otherwise if the left arrow key is pressed
		this.mPlace++;
		if (this.mPlace > inputText.mString.length) {
			this.mPlace = inputText.mString.length;
		}
		
		this.mScroll = 1;
		this.mScrollTimer = 0;
		this.mFlash = 0;
	}
	else if (nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.left) == false &&
			nmgrs.inputMan.GetKeyboardDown(nkeyboard.key.code.right) == false) { // otherwise if neither key is down
		
		if (this.mScroll != 0) { // if we're scrolling in a direction
			this.mScroll = 0; // stop scrolling
			this.mFlash = 0;
		}
	}
}

// processes the caret flashing and scrolling
GUIInputBoxCaret.prototype.Process = function(inputText, renderCanvas) {
	// if we are scrolling with the arrow keys
	if (this.mScroll != 0) {
		// if scroll timer has elapsed
		if (this.mScrollTimer > 0.5) {
			this.mPlace += this.mScroll; // move the caret's place in the text
			
			// check string position boundaries
			if (this.mPlace < 0) {
				this.mPlace = 0;
			}
			else if (this.mPlace > inputText.mString.length) {
				this.mPlace = inputText.mString.length;
			}
			
			this.mScrollTimer = 0.48; // lower scroll timer (partially reset)
		}
		else {
			this.mScrollTimer += 1 / nmain.game.mFrameLimit; // increment the timer
		}
	}
	else {
		// process the caret flash timer (caret doesn't flash when moving)
		if (this.mFlash > 2) {
			this.mFlash = 0;
		}
		else {
			this.mFlash += 2 / nmain.game.mFrameLimit;
		}
	}
	
	// if caret's position in text has been moved
	if (this.mPlace != this.mOldPlace) {
		// create a new text object, copy our input text and then create a substring
		var txt = new Text();
		txt.Copy(inputText);
		txt.mString = inputText.mString.substr(0, this.mPlace);
		
		this.mShape.mPos.mX = inputText.mPos.mX + renderCanvas.mPos.mX + txt.GetWidth() - 1; // move the caret's position on canvas
		
		// if the caret is past the right bound
		if (this.mShape.mPos.mX > this.mRightBound) {
			var diff = this.mShape.mPos.mX - this.mRightBound; // find out how much past it is
			
			// move the text and caret's position on canvas
			inputText.mPos.mX -= diff;
			this.mShape.mPos.mX -= diff;
			
			// redraw the render canvas
			renderCanvas.Clear();
			renderCanvas.RenderTo(inputText);
		}
		else if (this.mShape.mPos.mX < this.mLeftBound - 1) { // otherwise if it is past the left bound
			var diff = (this.mLeftBound - 1) - this.mShape.mPos.mX;
			
			inputText.mPos.mX += diff;
			this.mShape.mPos.mX += diff;
			
			renderCanvas.Clear();
			renderCanvas.RenderTo(inputText);
		}
		
		this.mOldPlace = this.mPlace; // store the current place in the string
	}
}

// returns the correct data to render the caret's current state
GUIInputBoxCaret.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mFlash < 1) { // if the caret is currently visible (flash)
		arr.push(this.mShape);
	}
	
	return arr;
}

// sets the size of the caret (x, y)
GUIInputBoxCaret.prototype.SetSize = function(size) {
	this.mShape.Clear(); // clear the previous caret
	
	// create a new one bsaed on input size
	this.mShape.AddPoint(new Vec2(size.mX, 0));
	this.mShape.AddPoint(new Vec2(size.mX, size.mY));
	this.mShape.AddPoint(new Vec2(0, size.mY));
}
// ...End


// GUIInputBox Class...
function GUIInputBox() {
	this.mPos = new Vec2(0, 0); // the position of the input box
	this.mSize = new Vec2(0, 0); // the size of the input box
	this.mDepth = 0; // the depth of the input box
	
	// the current status and sprites that represent the input box's current state on the canvas
	this.mStatus = "idle";
	this.mSpriteIdle = new Sprite();
	this.mSpriteHover = new Sprite();
	this.mSpriteFocus = new Sprite();
	this.mSpriteInactive = new Sprite();
	
	this.mInputText = new Text(); // the renderable text that represents the string value of the input box
	this.mBox = new GUIButton(); // the button that represents the input box (handles input box hovering and clicking)
	this.mHasFocus = false; // does the input box have focus
	
	this.mCaret = new GUIInputBoxCaret(); // the input caret
	
	this.mBackspace = false; // is backspace pressed
	this.mBackspaceTimer = 0; // timer that triggers removal of characters from the input box when backspace is pressed or held
	
	this.mRenderCanvas = new RenderCanvas(); // the render canvas used to display the clipped string
	this.mInputString = ""; // the new text that has been entered into the input box since last frame
	
	this.mActive = true; // is the input box active (interactable)
	
	this.mMaxChars = -1; // the maximum number of characters allowed to be entered
	this.mValidInput = new Array(); // an array that holds the characters that are allowed to be entered into this input box
	
	{ // various default arrays of valid input characters
		this.mAlphaUpper = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
				"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ");
				
		this.mAlphaLower = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
				"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ");
				
		this.mNumbers = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
		
		this.mAlphaNumeric = new Array();
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mAlphaUpper);
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mAlphaLower);
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mNumbers);
		
		{
			var arr = new Array("¬", "!", '"', "£", "$", "%", "^", "&", "*", "(", ")", "_", "+",
					"`", "¦", "-", "=", "[", "{", "]", "}", ";", ":", "'", "@", "#", "~", "\\", "|",
					",", "<", ".", ">", "/", "?");
			
			this.mAlphaNumericPunctuation = new Array();
			this.mAlphaNumericPunctuation = this.mAlphaNumeric.concat(this.mAlphaNumeric);
			this.mAlphaNumericPunctuation = this.mAlphaNumeric.concat(arr);
		}
	}
};

// initialises the input box
GUIInputBox.prototype.SetUp = function(pos, size, depth, inputArr) {
	// setup the input box attributes
	this.mPos.Copy(pos);
	this.mSize.Copy(size);
	this.mDepth = depth;
	
	this.mBox.SetUp(pos, size, depth); // set up the button that represents the input box
	
	{ // set up the render canvas
		this.mRenderCanvas.mPos.mX += pos.mX;
		this.mRenderCanvas.mPos.mY += pos.mY;
		
		this.mRenderCanvas.SetDimensions(size);
		
		this.mRenderCanvas.mDepth = depth - 1;
		this.mRenderCanvas.mAbsolute = true;
	}
	
	// set the initial positions and depths of the input box sprites (and assume absolute)
	// the sprites can be altered individually later, after calling setup
	{
		this.mSpriteIdle.SetPosition(pos);
		this.mSpriteIdle.mDepth = depth;
		this.mSpriteIdle.mAbsolute = true;
		
		this.mSpriteHover.SetPosition(pos);
		this.mSpriteHover.mDepth = depth;
		this.mSpriteHover.mAbsolute = true;
		
		this.mSpriteFocus.SetPosition(pos);
		this.mSpriteFocus.mDepth = depth;
		this.mSpriteFocus.mAbsolute = true;
		
		this.mSpriteInactive.SetPosition(pos);
		this.mSpriteInactive.mDepth = depth;
		this.mSpriteInactive.mAbsolute = true;
	}
	
	{ // set up the caret, setting its size and colour
		this.mCaret.SetUp(this.mRenderCanvas.mPos, depth - 2, this.mRenderCanvas.mPos.mX,
				this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX);
		this.mCaret.SetSize(new Vec2(1, size.mY - 10));
		this.mCaret.mShape.mColour = "#4A4A4A";
	}
	
	if (inputArr == null) { // if no valid input was specified
		this.mValidInput = this.mValidInput.concat(this.mAlphaNumericPunctuation); // revert to default
	}
	else {
		this.mValidInput = this.mValidInput.concat(inputArr); // set valid input
	}
}

// handles the user input relating to the input box
GUIInputBox.prototype.Input = function() {
	if (this.mHasFocus == true) { // if the input box has focus
		var inString = ""; // the validated addition to the current string (if any)
		for (var i = 0; i < nmgrs.inputMan.mTextInput.length; ++i) { // for all characters input since last frame
			var charCheck = nmgrs.inputMan.mTextInput.charAt(i); // get the current character
			for (var j = 0; j < this.mValidInput.length; ++j) { // for all valid characters
				if (charCheck == this.mValidInput[j]) { // check that the current character is valid
					inString += charCheck; // add the current character to the new string
					break; // stop checking for current character
				}
			}
		}
		
		// if there is no limit on the maximum number of characters or our addition is within the limits
		if (this.mMaxChars == -1 || (this.mInputText.mString.length + inString.length) <= this.mMaxChars) {
			this.mInputString += inString; // add the new input to the current string
		}
		
		// if backspace was pressed
		if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.backspace)) {
			this.mBackspace = true; // indicate backspace pressed
			this.mBackspaceTimer = 0; // reset the backspace timer
			
			if (this.mInputText.mString.length > 0) { // if the string isn't empty
				// create a new string from the current and remove the character that the caret is in front of
				var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace - 1);
				newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
				
				// set the current string and update the caret
				this.mInputText.mString = newStr;
				this.mCaret.mPlace--;
				if (this.mCaret.mPlace < 0) { // check for bounds
					this.mCaret.mPlace = 0;
				}
				
				// if text is not currently filling the render canvas
				if ((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth() <
						this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) {
					
					// if text is wider and is able to fill the render canvas
					if (this.mInputText.GetWidth() >= this.mRenderCanvas.mSize.mX) {
						// move the text to ensure render canvas is filled
						var shift = (this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) -
								((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth());
						this.mInputText.mPos.mX += shift;
					}
				}
				
				// re-render the string
				this.mRenderCanvas.Clear();
				this.mRenderCanvas.RenderTo(this.mInputText);
			}
		}
		else if (nmgrs.inputMan.GetKeyboardReleased(nkeyboard.key.code.backspace)) {
			this.mBackspace = false; // no longer holding backspace
		}
		
		this.mCaret.Input(this.mInputText); // process caret input
	}
	
	this.mBox.Input(); // process the button representing the input box user interaction
	if (this.mHasFocus == true) { // if input box has focus
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left)) { // if left mouse button is pressed
			if (this.mBox.mHover == false) { // if not hovering the input box
				this.mHasFocus = !this.mHasFocus; // lose focus
			}
		}
	}
}

// processes the input box manipulation including string alteration
GUIInputBox.prototype.Process = function(point) {
	this.mBox.Process(point); // process the button representing the input box
	
	if (this.mBox.OnClick() == true) { // if the input box has been clicked
		if (this.mHasFocus == false) { // if the input box doesn't have focus
			this.mHasFocus = true; // input box now has focus
			this.mCaret.mFlash = 0; // start the caret flash animation
		}
	}
	
	if (this.mBackspace == true) { // if backspace was pressed
		if (this.mBackspaceTimer > 0.5) { // if timer has breached limit
			// create a new string omitting the current character
			var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace - 1);
			newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
			
			this.mInputText.mString = newStr; // assign new string to input box value
			this.mCaret.mPlace--; // move caret place back one
			if (this.mCaret.mPlace < 0) { // check bound
				this.mCaret.mPlace = 0;
			}
			
			this.mBackspaceTimer = 0.48; // partially reset backspace timer (if held, delete faster)
			
			// re-render the string
			this.mRenderCanvas.Clear();
			this.mRenderCanvas.RenderTo(this.mInputText);
		}
		else {
			this.mBackspaceTimer += 1 / nmain.game.mFrameLimit; // increment the timer
		}
	}
	
	if (this.mInputString.length > 0) { // if new string text has been entered
		// insert the new string text
		var newStr = this.mInputText.mString.substr(0, this.mCaret.mPlace);
		newStr += this.mInputString;
		newStr += this.mInputText.mString.substr(this.mCaret.mPlace,  this.mInputText.mString.length - this.mCaret.mPlace);
		
		this.mInputText.mString = newStr; // assign new string to input box value
		this.mCaret.mPlace += this.mInputString.length; // move caret place to the end of the new string text
		this.mInputString = ""; // reset the new input string
		
		// re-render the string
		this.mRenderCanvas.Clear();
		this.mRenderCanvas.RenderTo(this.mInputText);
	}
	
	{
		this.mCaret.Process(this.mInputText, this.mRenderCanvas); // process the caret
	}
	
	{
		// set input box status
		if (this.mActive == true) { // if the input box is active
			if (this.mHasFocus == false) { // if input box doesn't have focus
				if (this.mBox.mHover == true) { // if hovering
					this.mStatus = "hover"; // set hovering
				}
				else { // not hovering
					this.mStatus = "idle"; // set idle
				}
			}
			else { // has focus
				this.mStatus = "focus"; // set focus
			}
		}
		
		// process correct sprite depending on status
		if (this.mActive == true) { // if the input box is active
			if (this.mStatus == "focus") { // has focus
				this.mSpriteFocus.Process(); // process focus sprite
			}
			else if (this.mStatus == "hover") { // no focus but hovering
				this.mSpriteHover.Process(); // process hover sprite
			}
			else { // no focus, not hovering
				this.mSpriteIdle.Process(); // process idle sprite
			}
		}
		else {
			this.mSpriteInactive.Process(); // input box is inactive
		}
	}
	
	{ // ensure position and size match the button's position and size
		this.mBox.mPos.Copy(this.mPos);
		this.mBox.mSize.Copy(this.mSize);
	}
}

// returns the correct data to render the input box's current state
GUIInputBox.prototype.GetRenderData = function() {
	var arr = new Array(); // the array to hold our renderable objects
	
	arr.push(this.mRenderCanvas); // the render canvas representing the string
	
	if (this.mActive == true) { // if the input box is active
		// add the correct sprite to the renderables array depending on the current state
		if (this.mStatus == "hover") {
			arr.push(this.mSpriteHover);
		}
		else if (this.mStatus == "focus") {
			arr.push(this.mSpriteFocus);
			
			arr = util.ConcatArray(arr, this.mCaret.GetRenderData()); // add the caret
		}
		else {
			arr.push(this.mSpriteIdle);
		}
	}
	else {
		arr.push(this.mSpriteInactive); // input box is inactive
	}
	
	return arr; // return the renderable objects
}

// returns the position of the sprites (idle only) [deprecated]
GUIInputBox.prototype.GetSpritePositions = function() {
	return this.mSpriteIdle.mPos;
}

// sets the positions of all of the sprites
GUIInputBox.prototype.SetSpritePositions = function(pos) {
	// calculate the offset (difference between current positon and new position)
	var offset = new Vec2(0, 0);
	offset.mX = pos.mX - this.mSpriteIdle.mPos.mX;
	offset.mY = pos.mY - this.mSpriteIdle.mPos.mY;
	
	// set the sprite positions to new position
	this.mSpriteIdle.mPos.Copy(pos);
	this.mSpriteHover.mPos.Copy(pos);
	this.mSpriteFocus.mPos.Copy(pos);
	this.mSpriteInactive.mPos.Copy(pos);
	
	// offset the caret by the difference between the positions
	this.mCaret.mShape.mPos.mX += offset.mX;
	this.mCaret.mShape.mPos.mY += offset.mY;
	this.mCaret.mLeftBound += offset.mX;
	this.mCaret.mRightBound += offset.mX;
	
	// offset the render canvas
	this.mRenderCanvas.mPos.mX += offset.mX;
	this.mRenderCanvas.mPos.mY += offset.mY;
}

// sets the depths of all of the sprites
GUIInputBox.prototype.SetSpriteDepths = function(depth) {
	this.mSpriteIdle.mDepth = depth;
	this.mSpriteHover.mDepth = depth;
	this.mSpriteFocus.mDepth = depth;
	this.mSpriteInactive.mDepth = depth;
	
	this.mCaret.mShape.mDepth = depth - 2;
	this.mRenderCanvas.mDepth = depth - 1;
}

// sets the value of the input box (current text)
GUIInputBox.prototype.SetText = function(string) {
	if (this.mInputText.mString.length > 0) {
		var len = string.length - this.mInputText.mString.length; // get the difference in lengths between current and new strings
		
		this.mInputText.mString = string; // set the string to the new string
		this.mCaret.mPlace += len; // move the caret by the difference in string lengths
		if (this.mCaret.mPlace < 0) { // check left bounds of the string
			this.mCaret.mPlace = 0;
		}
		
		// if text is not currently filling the render canvas
		if ((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth() <
				this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) {
			
			// if text is wider and is able to fill the render canvas
			if (this.mInputText.GetWidth() >= this.mRenderCanvas.mSize.mX) {
				// move the text to ensure render canvas is filled
				var shift = (this.mRenderCanvas.mPos.mX + this.mRenderCanvas.mSize.mX) -
						((this.mInputText.mPos.mX + this.mRenderCanvas.mPos.mX) + this.mInputText.GetWidth());
				this.mInputText.mPos.mX += shift;
			}
		}
		
		// re-render the string to the render canvas
		this.mRenderCanvas.Clear();
		this.mRenderCanvas.RenderTo(this.mInputText);
		
		this.mCaret.mOldPlace = this.mCaret.mPlace - 1; // force the caret to update it's position on the canvas
	}
}
// ...End


// GUIListBox Class...
function GUIListBox() {
	this.mPos = new Vec2(0, 0);
	this.mDepth = 0;
	
	this.mTopArrow = new GUIButton();
	this.mBottomArrow = new GUIButton();
	
	this.mItemTop = 0;
	this.mItemsMax = 1;
	this.mItems = new Array();
	this.mItemsText = new Array();
	
	this.mSelected = -1;
	this.mSelectedShape = new Shape();
	
	this.mHover = false;
};

GUIListBox.prototype.SetUp = function(pos, depth, arrowTex) {
	this.mPos.Copy(pos);
	this.mDepth = depth;
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource(arrowTex);
		
		{
			this.mTopArrow.SetUp(pos, new Vec2(0, 0), this.mDepth);
			
			this.mTopArrow.mSpriteIdle.SetTexture(tex, 6, 2, -1, -1);
			this.mTopArrow.mSpriteIdle.SetCurrentFrame(0);
			
			this.mTopArrow.mSpriteHover.SetTexture(tex, 6, 2, -1, -1);
			this.mTopArrow.mSpriteHover.SetCurrentFrame(2);
			
			this.mTopArrow.mSpriteDown.SetTexture(tex, 6, 2, -1, -1);
			this.mTopArrow.mSpriteDown.SetCurrentFrame(4);
			
			this.mTopArrow.mSpriteInactive.SetTexture(tex, 6, 2, -1, -1);
			this.mTopArrow.mSpriteInactive.SetCurrentFrame(0);
			
			this.mTopArrow.mSize.Set(this.mTopArrow.mSpriteIdle.GetWidth(),
					this.mTopArrow.mSpriteIdle.GetHeight());
		}
		
		{
			this.mBottomArrow.SetUp(pos, new Vec2(0, 0), this.mDepth);
			
			this.mBottomArrow.mSpriteIdle.SetTexture(tex, 6, 2, -1, -1);
			this.mBottomArrow.mSpriteIdle.SetCurrentFrame(1);
			
			this.mBottomArrow.mSpriteHover.SetTexture(tex, 6, 2, -1, -1);
			this.mBottomArrow.mSpriteHover.SetCurrentFrame(3);
			
			this.mBottomArrow.mSpriteDown.SetTexture(tex, 6, 2, -1, -1);
			this.mBottomArrow.mSpriteDown.SetCurrentFrame(5);
			
			this.mBottomArrow.mSpriteInactive.SetTexture(tex, 6, 2, -1, -1);
			this.mBottomArrow.mSpriteInactive.SetCurrentFrame(1);
			
			this.mBottomArrow.mSize.Set(this.mBottomArrow.mSpriteIdle.GetWidth(),
					this.mBottomArrow.mSpriteIdle.GetHeight());
		}
	}
	
	this.mSelectedShape.mPos.Copy(pos);
	this.mSelectedShape.mDepth = this.mDepth - 2;
	this.mSelectedShape.mColour = "#FFFFFF";
	this.mSelectedShape.mLineWidth = 2;
	this.mSelectedShape.mAbsolute = true;
	this.mSelectedShape.mOutline = true;
}

GUIListBox.prototype.Input = function() {
	this.mTopArrow.Input();
	this.mBottomArrow.Input();
	
	for (var i = 0; i < this.mItems.length; ++i) {
		this.mItems[i].Input();
	}
}

GUIListBox.prototype.Process = function(point) {
	{
		if (this.mItemTop > 0) {
			this.mTopArrow.mActive = true;
		}
		else {
			this.mTopArrow.mActive = false;
		}
		
		if (this.mItemTop < this.mItems.length - this.mItemsMax) {
			this.mBottomArrow.mActive = true;
		}
		else {
			this.mBottomArrow.mActive = false;
		}
		
		this.mTopArrow.Process(point);
		this.mBottomArrow.Process(point);
		
		if (this.mTopArrow.OnClick()) {
			this.AdjustItems(-1);
		}
		else if (this.mBottomArrow.OnClick()) {
			this.AdjustItems(1);
		}
	}
	
	{
		for (var i = 0; i < this.mItems.length; ++i) {
			if (i >= this.mItemTop && i <= this.mItemTop + (this.mItemsMax - 1)) {
				this.mItems[i].mActive = true;
			}
			else {
				this.mItems[i].mActive = false;
			}
			
			this.mItems[i].Process(point);
		}
		
		for (var i = 0; i < this.mItems.length; ++i) {
			if (this.mItems[i].OnClick()) {
				this.mSelectedShape.mPos.mY -= (this.mSelected - i) * this.mItems[0].mSpriteIdle.GetHeight();
				this.mSelected = i;
				break;
			}
		}
	}
}

GUIListBox.prototype.GetRenderData = function() {
	var arr = new Array();
	
	{
		if (this.mItemTop > 0) {
			arr = util.ConcatArray(arr, this.mTopArrow.GetRenderData());
		}
		
		if (this.mItemTop < this.mItems.length - this.mItemsMax) {
			arr = util.ConcatArray(arr, this.mBottomArrow.GetRenderData());
		}
	}
	
	{
		var max = this.mItemTop + this.mItemsMax;
		if (max > this.mItems.length) {
			max = this.mItems.length;
		}
		
		for (var i = this.mItemTop; i < max; ++i) {
			arr = util.ConcatArray(arr, this.mItems[i].GetRenderData());
		}
		
		for (var i = this.mItemTop; i < max; ++i) {
			arr.push(this.mItemsText[i]);
		}
	}
	
	{
		if (this.mSelected >= this.mItemTop && this.mSelected <= this.mItemTop + (this.mItemsMax - 1)) {
			arr.push(this.mSelectedShape);
		}
	}
	
	return arr;
}

GUIListBox.prototype.AddItem = function(itemButton, text) {
	if (this.mItems.length == 0) {
		this.mTopArrow.mPos.Copy(this.mPos);
		this.mTopArrow.mPos.mX += itemButton.mSpriteIdle.GetWidth() + 2;
		this.mTopArrow.SetSpritePositions(this.mTopArrow.mPos);
		
		this.mBottomArrow.mPos.Copy(this.mPos);
		this.mBottomArrow.mPos.mX += itemButton.mSpriteIdle.GetWidth() + 2;
		this.mBottomArrow.mPos.mY += itemButton.mSpriteIdle.GetHeight() * (this.mItemsMax - 1);
		this.mBottomArrow.SetSpritePositions(this.mBottomArrow.mPos);
		
		this.mSelected = 0;
		this.mSelectedShape.mPos.Copy(this.mPos);
		this.mSelectedShape.AddPoint(new Vec2(itemButton.mSpriteIdle.GetWidth(), 0));
		this.mSelectedShape.AddPoint(new Vec2(itemButton.mSpriteIdle.GetWidth(), itemButton.mSpriteIdle.GetHeight()));
		this.mSelectedShape.AddPoint(new Vec2(0, itemButton.mSpriteIdle.GetHeight()));
	}
	
	var but = new GUIButton();
	but.Copy(itemButton);
	
	var txt = new Text();
	txt.Copy(text);
	txt.mAbsolute = true;
	
	var newPos = new Vec2(0, 0);
	
	if (this.mItems.length == 0) {
		newPos.Copy(this.mPos);
	}
	else {
		var id = this.mItems.length - 1;
		newPos.Copy(this.mItems[id].mPos);
		newPos.mY += this.mItems[id].mSize.mY;
	}
	
	but.mPos.mX += newPos.mX; but.mPos.mY += newPos.mY;
	but.SetSpritePositions(but.mPos);
	
	txt.mPos.mX += newPos.mX; txt.mPos.mY += newPos.mY;
	
	this.mItems.push(but);
	this.mItemsText.push(txt);
}

GUIListBox.prototype.RemoveItem = function(id) {
	if (id >= 0 && id < this.mItems.length) {
		this.mItems.splice(id, 1);
		this.mItemsText.splice(id, 1);
		
		if (this.mItems.length == 0) {
			this.Clear();
		}
		else {
			for (var i = id; i < this.mItems.length; ++i) {
				this.mItems[i].mPos.mY -= this.mItems[i].mSpriteIdle.GetHeight();
				this.mItems[i].SetSpritePositions(this.mItems[i].mPos);
				
				this.mItemsText[i].mPos.mY -= this.mItems[i].mSpriteIdle.GetHeight();
			}
			
			if (this.mItemTop > 0) {
				this.AdjustItems(-1);
			}
			
			if (id >= this.mItems.length) {
				if (this.mSelected == id) {
					this.mSelected--;
					this.mSelectedShape.mPos.mY -= this.mItems[0].mSpriteIdle.GetHeight();
				}
				
				id--;
			}
		}
	}
}

GUIListBox.prototype.Clear = function() {
	this.mItemTop = 0;
	this.mItems.splice(0, this.mItems.length);
	this.mItemsText.splice(0, this.mItemsText.length);
	
	this.mSelected = -1;
	this.mSelectedShape.Clear();
}

GUIListBox.prototype.AdjustItems = function(amount) {
	this.mItemTop += amount;
	
	for (var i = 0; i < this.mItems.length; ++i) {
		this.mItems[i].mPos.mY -= amount * this.mItems[i].mSpriteIdle.GetHeight();
		this.mItems[i].SetSpritePositions(this.mItems[i].mPos);
		
		this.mItemsText[i].mPos.mY -= amount * this.mItems[i].mSpriteIdle.GetHeight();
	}
	
	this.mSelectedShape.mPos.mY -= amount * this.mItems[0].mSpriteIdle.GetHeight();
}

// returns the
GUIListBox.prototype.GetActive = function() {
	if (this.mSelected >= 0) {
		return this.mItemsText[this.mSelected].mString;
	}
	
	return "";
}
// ...End


// GUITooltip Class...
function GUITooltip() {
	this.mPos = new Vec2();
	this.mDepth = 0;
	
	this.mTooltipText = new Text();
	this.mTooltipOuter = new Shape();
	this.mTooltipInner = new Shape();
	
	this.mTimer = new Timer();
	this.mTimeout = 0;
	this.mShowTooltip = false;
	
	this.mStoredMouse = new Vec2();
	this.mStoredMouse.Copy(nmgrs.inputMan.GetLocalMouseCoords());
};

// copy constructor
GUITooltip.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mDepth = other.mDepth;
	
	this.mTooltipText.Copy(other.mTooltipText);
	this.mTooltipOuter.Copy(other.mTooltipOuter);
	this.mTooltipInner.Copy(other.mTooltipInner);
	
	this.mTimer.Copy(other.mTimer);
	this.mTimeout = other.mTimeout;
	this.mShowTooltip = other.mShowTooltip;
	
	this.mStoredMouse.Copy(other.mStoredMouse);
}

GUITooltip.prototype.SetUp = function(pos, depth) {
	this.mPos.Copy(pos);
	this.mDepth = depth;
	
	this.mTooltipText.mPos.Copy(pos);
	this.mTooltipOuter.mPos.Set(pos.mX - 4, pos.mY - 4);
	this.mTooltipInner.mPos.Set(pos.mX - 2, pos.mY - 2);
	
	this.mTooltipText.mDepth = depth;
	this.mTooltipOuter.mDepth = depth;
	this.mTooltipInner.mDepth = depth;
	
	this.mTooltipText.mColour = "#333333";
	this.mTooltipOuter.mColour = "#222222";
	this.mTooltipInner.mColour = "#DDDDDD";
}

GUITooltip.prototype.Input = function() {
	if (this.mShowTooltip == true) {
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if LMB is pressed
			this.mTimer.Reset();
			this.mShowTooltip = false;
		}
	}
}

GUITooltip.prototype.Process = function() {
	if (nmgrs.inputMan.GetMouseDown(nmouse.button.code.left) == false) {
		if (this.mTimer.GetElapsedTime() > this.mTimeout && this.mShowTooltip == false) {
			this.mShowTooltip = true;
			this.mStoredMouse.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		}
		else if (this.mShowTooltip == true) {
			if (Math.abs(nmgrs.inputMan.GetLocalMouseCoords().mX - this.mStoredMouse.mX) > 4 ||
					Math.abs(nmgrs.inputMan.GetLocalMouseCoords().mY - this.mStoredMouse.mY) > 4) {
				
				this.mTimer.Reset();
				this.mShowTooltip = false;
			}
		}
	}
	else {
		this.mTimer.Reset();
	}

}

GUITooltip.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mShowTooltip == true) {
		arr.push(this.mTooltipOuter);
		arr.push(this.mTooltipInner);
		arr.push(this.mTooltipText);
	}
	
	return arr;
}

GUITooltip.prototype.SetText = function(font, fontSize, string) {
	if (font != null) {
		this.mTooltipText.SetFont(font);
	}
	
	if (fontSize != null) {
		this.mTooltipText.SetFontSize(fontSize);
	}
	
	if (string != null) {
		this.mTooltipText.SetString(string);
	}
	
	{
		var w = this.mTooltipText.GetWidth();
		var h = this.mTooltipText.GetHeight();
		
		this.mTooltipOuter.Clear();
		this.mTooltipOuter.mPos.Set(this.mPos.mX - 4, this.mPos.mY - 4);
		this.mTooltipOuter.AddPoint(new Vec2(w + 8, 0));
		this.mTooltipOuter.AddPoint(new Vec2(w + 8, h + 8));
		this.mTooltipOuter.AddPoint(new Vec2(0, h + 8));
		
		this.mTooltipInner.Clear();
		this.mTooltipInner.mPos.Set(this.mPos.mX - 2, this.mPos.mY - 2);
		this.mTooltipInner.AddPoint(new Vec2(w + 4, 0));
		this.mTooltipInner.AddPoint(new Vec2(w + 4, h + 4));
		this.mTooltipInner.AddPoint(new Vec2(0, h + 4));
	}
}

GUITooltip.prototype.SetPosition = function(pos) {
	this.mPos.Copy(pos);
	
	this.mTooltipText.mPos.Copy(pos);
	this.mTooltipOuter.mPos.Set(pos.mX - 4, pos.mY - 4);
	this.mTooltipInner.mPos.Set(pos.mX - 2, pos.mY - 2);
}

GUITooltip.prototype.FixPosition = function(bbPos, bbSize) {
	var fix = new Vec2();
	
	if (this.mTooltipOuter.mPos.mX < bbPos.mX) {
		fix.mX += bbPos.mX - this.mTooltipOuter.mPos.mX;
	}
	
	if (this.mTooltipOuter.mPos.mX + this.mTooltipOuter.GetWidth() > bbPos.mX + bbSize.mX) {
		fix.mX += (bbPos.mX + bbSize.mX) - (this.mTooltipOuter.mPos.mX + this.mTooltipOuter.GetWidth());
	}
	
	if (this.mTooltipOuter.mPos.mY < bbPos.mY) {
		fix.mY += bbPos.mY - this.mTooltipOuter.mPos.mY;
	}
	
	if (this.mTooltipOuter.mPos.mY + this.mTooltipOuter.GetHeight() > bbPos.mY + bbSize.mY) {
		fix.mY += (bbPos.mY + bbSize.mY) - (this.mTooltipOuter.mPos.mY + this.mTooltipOuter.GetHeight());
	}
	
	
	this.SetPosition(new Vec2(this.mTooltipOuter.mPos.mX += fix.mX, this.mTooltipOuter.mPos.mY += fix.mY));
}

GUITooltip.prototype.SetDepth = function(depth) {
	this.mDepth = depth;
	
	this.mTooltipText.mDepth = depth;
	this.mTooltipOuter.mDepth = depth;
	this.mTooltipInner.mDepth = depth;
}

GUITooltip.prototype.SetColour = function(textColour, outerColour, innerColour) {
	if (textColour != null) {
		this.mTooltipText.mColour = textColour;
	}
	
	if (outerColour != null) {
		this.mTooltipOuter.mColour = outerColour;
	}
	
	if (innerColour != null) {
		this.mTooltipInner.mColour = innerColour;
	}
}

GUITooltip.prototype.StartTimeout = function(timeout) {
	this.mTimeout = timeout;
	this.mTimer.Reset();
	this.mShowTooltip = false;
}
// ...End


// GUICheckBox Class...
function GUICheckBox() {
	this.mPos = new Vec2();
	this.mSize = new Vec2();
	
	this.mButton = new GUIButton();
	this.mSpriteSelected = new Sprite();
	
	this.mSelected = false;
};

GUICheckBox.prototype.Copy = function(other) {
	this.mButton.Copy(other.mButton);
}

GUICheckBox.prototype.SetUp = function(pos, size, depth) {
	this.mPos.Copy(pos); // set position
	this.mSize.Copy(size); // set size
	
	this.mButton.SetUp(pos, size, depth);
	
	this.mSpriteSelected.SetPosition(pos);
	this.mSpriteSelected.mDepth = depth;
	this.mSpriteSelected.mAbsolute = true;
}

GUICheckBox.prototype.Input = function() {
	this.mButton.Input();
}

GUICheckBox.prototype.Process = function(point) {
	this.mButton.Process(point);
	
	if (this.mButton.OnClick() == true) {
		this.mSelected = !this.mSelected;
	}
}

GUICheckBox.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr = util.ConcatArray(arr, this.mButton.GetRenderData());
	
	if (this.mSelected == true) {
		arr.push(this.mSpriteSelected);
	}
	
	return arr;
}
// ...End


// GUIDOMButton Class...
function GUIDOMButton() {
	this.mPos = new Vec2(0, 0); // the position of the button element
	
	this.mElement = document.createElement('button'); // the gui dom button element
	
	this.mHover = false; // user is hovering over button
	this.mDown = false; // button is being held down
	this.mWasClicked = false; // button was clicked
};

// returns the type of this gui element
GUIDOMButton.prototype.Type = function() {
	return "GUIDOMButton";
}

// copy constructor
GUIDOMButton.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	
	this.mElement = other.mElement;
	
	this.mHover = other.mHover;
	this.mDown = other.mDown;
	this.mWasClicked = other.mWasClicked;
}

// sets up the position and display text of the gui dom element
GUIDOMButton.prototype.SetUp = function(pos, text) {
	this.mPos.Copy(pos); // set the internal position
	
	// set the position of the element itself
	this.mElement.style.position = "absolute";
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
	
	// add the text node
	var txt = document.createTextNode(text);
	this.mElement.appendChild(txt);
}

// processes the element
GUIDOMButton.prototype.Process = function() {
	
}

// sets the position of the gui dom element [deprecated - see SetPosition]
GUIDOMButton.prototype.SetPos = function(pos) {
	this.mPos.Copy(pos); // set the internal position
	
	// set the position of the gui dom element
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
}

// as above
GUIDOMButton.prototype.SetPosition = function(pos) {
	this.mPos.Copy(pos);
	
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
}

// return if this button was clicked [needs updated - see guibutton.js]
GUIDOMButton.prototype.OnClick = function() {
	if (this.mWasClicked == true) {
		this.mWasClicked = false;
		return true;
	}
	
	return false;
}

// register callbacks for the element's events
GUIDOMButton.prototype.RegisterCallbacks = function(e) {
	this.mElement.onclick = function(e) { // button is clicked
		this.mWasClicked = true; // set click status
	}
	
	this.mElement.onmouseover = function(e) { // mouse in
		this.mHover = true; // user is hovering
	}
	
	this.mElement.onmouseout = function(e) { // mouse out
		this.mHover = false; // user no longer hovering
	}
	
	this.mElement.onmousedown = function(e) { // left mouse pressed
		this.mDown = true; // button is down
	}
	
	this.mElement.onmouseup = function(e) { // left mouse released
		this.mDown = false; // button is up
	}
}

// unregisters any previously registered callbacks for the element
GUIDOMButton.prototype.UnregisterCallbacks = function(e) {
	this.mElement.onclick = function(e) {
		
	}
	
	this.mElement.onmouseover = function(e) {
		
	}
	
	this.mElement.onmouseout = function(e) {
		
	}
	
	this.mElement.onmousedown = function(e) {
		
	}
	
	this.mElement.onmouseup = function(e) {
		
	}
}
// ...End


// GUIDOMElement Class...
function GUIDOMElement() {
	this.mGUIElement = null; // handle to the HTML5 element
	this.mName = ""; // name of the element
};
// ...End


// GUIDOMContainer Class...
function GUIDOMContainer() {
	this.mOldCanvas = new Vec2(0, 0); // position of the canvas last frame
	this.mOldCanvas.Copy(nmain.game.mCanvasPos);
	
	this.mElements = new Array(); // array containing the element belonging to this container
};

// processes the GUIDOM objects and updates the positions if necessary
GUIDOMContainer.prototype.Process = function() {
	for (var i = 0; i < this.mElements.length; ++i) { // for all elements
		this.mElements[i].mGUIElement.Process(); // process the elements logic
		
		// if the canvas position has changed
		if (this.mOldCanvas.mX != nmain.game.mCanvasPos.mX || this.mOldCanvas.mY != nmain.game.mCanvasPos.mY) {
			// update the element's position to match the change in the canvas' position
			var pos = new Vec2(0, 0); pos.Copy(this.mElements[i].mGUIElement.mPos);
			this.mElements[i].mGUIElement.SetPos(pos);
		}
	}
	
	this.mOldCanvas.Copy(nmain.game.mCanvasPos); // set the canvas' old position to its current position for next frame
}

// adds an element to the container
GUIDOMContainer.prototype.AddElement = function(element, elementName) {
	var found = false;
	for (var i = 0; i < this.mElements.length; ++i) { // for all elements in the container
		if (this.mElements[i].mName == elementName) { // if the requested name matches a stored name
			found = true; // indicate we found a match
			break; // quit the loop
		}
	}
	
	if (found == false) { // if not found
		var elem = new GUIDOMElement(); // create a new element container
		
		{ // create a new element of the proper type
			if (element.Type() == "GUIDOMButton") {
				elem.mGUIElement = new GUIDOMButton();
			}
			else if (element.Type() == "GUIDOMInputBox") {
				elem.mGUIElement = new GUIDOMInputBox();
			}
		}
		
        // copy the supplied element to the new element
		elem.mGUIElement.Copy(element);
		elem.mName = elementName;
		
        // add the element to the container and then to the document
		this.mElements.push(elem);
		var id = this.mElements.length - 1;
		document.body.appendChild(this.mElements[id].mGUIElement.mElement);
		
        // register callbacks for the new element
		this.mElements[id].mGUIElement.RegisterCallbacks();
	}
}

// removes and element from the container
GUIDOMContainer.prototype.RemoveElement = function(elementName) {
	var id = -1;
	for (var i = 0; i < this.mElements.length; ++i) { // for all elements in the container
		if (this.mElements[i].mName == elementName) { // if we have a match
			id = i; // set the id
			break; // quit the loop
		}
	}
	
	if (id >= 0) { // if the id is not negative (match was found)
		this.mElements[id].mGUIElement.UnregisterCallbacks(); // unregister previously registered callbacks
		
        // remove the element from the document and the container
		document.body.removeChild(this.mElements[id].mGUIElement.mElement);
		this.mElements.splice(id, 1);
	}
}

// returns an element from the container
GUIDOMContainer.prototype.GetElement = function(elementName) {
	for (var i = 0; i < this.mElements.length; ++i) { // for all elements in the container
		if (this.mElements[i].mName == elementName) { // if the requested element exists
			return this.mElements[i].mGUIElement; // return the requested element
		}
	}
	
	throw Exception("Resource not found."); // element doesn't exist
}

// removes all elements from the container and calls appropiate cleanup functions
GUIDOMContainer.prototype.Clear = function() {
	for (var i = 0; i < this.mElements.length; ++i) { // for all elements in the container
		this.mElements[i].mGUIElement.UnregisterCallbacks(); // remove any registered callbacks for the element
		
		document.body.removeChild(this.mElements[i].mGUIElement.mElement); // remove the element from the document
	}
	
	this.mElements.splice(0, this.mElements.length); // remove all elements from the container
}
// ...End


// GUIDOMInputBox Class...
function GUIDOMInputBox() {
	this.mPos = new Vec2(0, 0); // the position of the input box element
	
	// the gui dom input box element
	this.mElement = document.createElement('input');
	this.mElement.type = "text";
	
	this.mOldValue = ""; // the stored value of the input box
	
	this.mValidInput = new Array(); // an array that holds the characters that are allowed to be entered into this input box
	
	{ // various default arrays of valid input characters
		this.mAlphaUpper = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
				"O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " ");
				
		this.mAlphaLower = new Array("a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
				"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", " ");
				
		this.mNumbers = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9");
		
		this.mAlphaNumeric = new Array();
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mAlphaUpper);
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mAlphaLower);
		this.mAlphaNumeric = this.mAlphaNumeric.concat(this.mNumbers);
		
		{
			var arr = new Array("¬", "!", '"', "£", "$", "%", "^", "&", "*", "(", ")", "_", "+",
					"`", "¦", "-", "=", "[", "{", "]", "}", ";", ":", "'", "@", "#", "~", "\\", "|",
					",", "<", ".", ">", "/", "?");
			
			this.mAlphaNumericPunctuation = new Array();
			this.mAlphaNumericPunctuation = this.mAlphaNumeric.concat(this.mAlphaNumeric);
			this.mAlphaNumericPunctuation = this.mAlphaNumeric.concat(arr);
		}
	}
	
	this.mSelected = false; // input box is currently selected (ready for input)
	this.mHover = false; // user is hovering over input box
};

// returns the type of this gui element
GUIDOMInputBox.prototype.Type = function() {
	return "GUIDOMInputBox";
}

// copy constructor
GUIDOMInputBox.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	
	this.mElement = other.mElement;
	
	this.mOldValue = other.mOldValue;
	
	this.mValidInput.splice(0, this.mValidInput.length);
	this.mValidInput = this.mValidInput.concat(other.mValidInput);
	
	this.mSelected = other.mSelected;
	this.mHover = other.mHover;
}

// sets up the position, font, default text and valid input characters of the gui dom element
GUIDOMInputBox.prototype.SetUp = function(pos, fontString, defaultText, inputArr) {
	this.mPos.Copy(pos); // set the internal position
	
	// set the position of the element itself
	this.mElement.style.position = "absolute";
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
	
	this.mElement.defaultValue = defaultText; // set the default value
	this.mElement.style.font = fontString; // set the font used
	
	if (inputArr == null) { // if no valid input was supplied
		this.mValidInput = this.mValidInput.concat(this.mAlphaNumericPunctuation); // use default
	}
	else {
		this.mValidInput = this.mValidInput.concat(inputArr); // set valid input
	}
}

// processes the element
GUIDOMInputBox.prototype.Process = function() {
	if (this.mElement.value != this.mOldValue) { // if the value in the input box doesn't match our stored value (has changed)
		var valueStr = this.mElement.value; // get the current value
		var finalStr = ""; // validated string
		
		for (var i = 0; i < valueStr.length; ++i) {	 // for every character in the current value
			for (var j = 0; j < this.mValidInput.length; ++j) { // for every valid input character
				if (valueStr.charAt(i) == this.mValidInput[j]) { // if the current character exists within the valid input array
					finalStr += valueStr.charAt(i); // add to the final validated string
					break; // break out of inner loop (valid input array)
				}
			}
		}
		
		this.mElement.value = finalStr; // set the current value to the validated value
		this.mOldValue = this.mElement.value; // update the stored value
	}
}

// sets the position of the gui dom element [deprecated - see SetPosition]
GUIDOMInputBox.prototype.SetPos = function(pos) {
	this.mPos.Copy(pos); // set the internal position
	
	// set the position of the gui dom element
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
}

// as above
GUIDOMInputBox.prototype.SetPosition = function(pos) {
	this.mPos.Copy(pos);
	
	this.mElement.style.left = nmain.game.mCanvasPos.mX + this.mPos.mX + "px";
	this.mElement.style.top = nmain.game.mCanvasPos.mY + this.mPos.mY + "px";
}

// register callbacks for the element's events
GUIDOMInputBox.prototype.RegisterCallbacks = function(e) {
	this.mElement.onfocus = function(e) { // input box is selected
		nmgrs.inputMan.mDisableBackspace = false; // allow default backspace functionality to be used
		this.mSelected = true; // set selected status
	}
	
	this.mElement.onblur = function(e) { // input box is deselected (lost focus)
		nmgrs.inputMan.mDisableBackspace = true; // disable default backspace functionality
		this.mSelected = false; // set selected status
	}
	
	this.mElement.onmouseover = function(e) { // mouse in
		this.mHover = true; // user is hovering
	}
	
	this.mElement.onmouseout = function(e) { // mouse out
		this.mHover = false; // user no longer hovering
	}
}

// unregisters any previously registered callbacks for the element
GUIDOMInputBox.prototype.UnregisterCallbacks = function(e) {
	this.mElement.onfocus = function(e) {
		
	}
	
	this.mElement.onblur = function(e) {
		
	}
	
	this.mElement.onmouseover = function(e) {
		
	}
	
	this.mElement.onmouseout = function(e) {
		
	}
}

// returns the current value of the input box (current text)
GUIDOMInputBox.prototype.GetText = function() {
	return this.mElement.value;
}

// sets the value of the input box (current text)
GUIDOMInputBox.prototype.SetText = function(text) {
	this.mElement.value = text;
}

// returns the width of the input box
GUIDOMInputBox.prototype.GetWidth = function() {
	var str = this.mElement.style.width; // get the width of the input box (in string form "Npx")
	var len = str.length - 2; // remove last 2 characters ("px")
	
	return Number(str.substr(0, len)); // convert to integer and return the width
}

// sets the width of the input box
GUIDOMInputBox.prototype.SetWidth = function(width) {
	this.mElement.style.width = width + "px"; // add "px" to the supplied width and apply it
}

// get the max number of characters allowed
GUIDOMInputBox.prototype.GetMaxChars = function() {
	return this.mElement.maxLength;
}

// set the max number of characters allowed
GUIDOMInputBox.prototype.SetMaxChars = function(length) {
	this.mElement.maxLength = length;
}

// get the current readonly status (editable or not)
GUIDOMInputBox.prototype.GetReadOnly = function() {
	return this.mElement.readOnly;
}

// set the readonly status (editable or not)
GUIDOMInputBox.prototype.SetReadOnly = function(readOnly) {
	this.mElement.readOnly = readOnly;
}

// select all of the text in the input box
GUIDOMInputBox.prototype.SelectAll = function() {
	this.mElement.select();
}
// ...End


// LocalStorage Class...
// 
function LocalStorage() {
	this.mLength = 0;
	
	if (this.IsSupported == true) {
		this.mLength = localStorage.length; // the current length of the local store
	}
};

// checks if local storage is supported in the browser
LocalStorage.prototype.IsSupported = function() {
	// if local storage is supported and is allowed
	if (typeof(Storage) !== "undefined" && window["localStorage"] != null) {
		return true; // supported
	}
	
	return false; // not supported
}

// saves something to local storage
LocalStorage.prototype.Save = function(key, data, overwrite) {
	try {
		if (localStorage.getItem(key) == null || overwrite == true) { // if the current key doesn't exist or we're allowed to overwrite
			localStorage.setItem(key, data); // add the key and the data to the local store
		}
		else {
			return false; // key exists and we can't overwrite, unsuccessful
		}
	} catch (e) {
		return false; // esception occured, unsuccessful
	}
	
	this.mLength = localStorage.length; // update the length
	return true; // success
}

// loads something from the local storage
LocalStorage.prototype.Load = function(key) {
	return localStorage.getItem(key); // return the data corresponding to key
}

// checks if an item exists in the local storage
LocalStorage.prototype.Exists = function(key) {
	if (localStorage.getItem(key) != null) { // if the item exists
		return true; // return success
	}
	
	return false; // item doesn't exist
}

// removes a key-data pair from the local storage
LocalStorage.prototype.Delete = function(key) {
	localStorage.removeItem(key); // remove the item corresponding to the key
	this.mLength = localStorage.length; // update the length of the local storage
}

// clears all items from teh local storage
LocalStorage.prototype.Clear = function() {
	localStorage.clear(); // clear the local storage
	this.mLength = localStorage.length; // update the length
}

// returns the key in position id
LocalStorage.prototype.Key = function(id) {
	return localStorage.key(id); // return the associated key
}
// ...End


// RNG Class...
// a pseudo-random number generator
function RNG(seed) {
	this.mMers = new MersenneTwister(); // a reference to a mersenne twister (see mersenne-twister.js)
	this.SetSeed(seed);
};

// set the seed and seed the rng with it
RNG.prototype.SetSeed = function(seed) {
	var s = seed;
	if (s == null) {
		var d = new Date();
		this.SetSeed(d.getTime());
		var s = this.GetRandInt(0, 99999999);
		this.SetSeed(s);
	}
	
	this.mSeed = s;
	this.mMers.init_genrand(s);
};

// return the current seed
RNG.prototype.GetSeed = function() {
	return this.mSeed;
};

// get a random integer between lower and higher (inclusive)
RNG.prototype.GetRandInt = function(lower, higher) {
	return (this.mMers.genrand_int32() % ((higher + 1) - lower)) + lower;
};

// get a random float between lower and higher (inclusive) with precision (number of decimal places)
RNG.prototype.GetRandFloat = function(lower, higher, precision) {
	var l = lower * Math.pow(10, precision);
	var h = higher * Math.pow(10, precision);
	
	var f = this.GetRandInt(l, h);
	f /=  Math.pow(10.0, precision);
	return f;
};
// ...End


// Timer Class...
// a timer; keeps time
function Timer() {
	this.startTime = 0; // the time that this timer was started
	
	this.Reset(); // initially reset our timer
};

// resets the timer (sets it to the current time)
Timer.prototype.Reset = function() {
	var d = new Date();
	this.startTime = d.getTime(); // set the start time to the current time
}

// get the time that has passed since our last reset
Timer.prototype.GetElapsedTime = function() {
	var d = new Date();
	return d.getTime() - this.startTime; // return how much time has elapsed since last call to reset
}

// make a copy of another (other) timer (copy constructor)
Timer.prototype.Copy = function(other) {
	this.startTime = other.startTime;
}
// ...End


// 
function SimpleCamera() {
	this.mPos = new Vec2(); // the position of the view
};

SimpleCamera.prototype.Type = function() {
	return "SimpleCamera";
}

// make a deep copy of another (other) simple camera
SimpleCamera.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
}
// ...End

// Camera class...
function Camera() {
	this.mPos = new Vec2(); // the position of the view
	this.mSize = new Vec2(); // the dimensions of the view
	this.mSize.Copy(nmain.game.mCanvasSize); // set the initial size to the size of the canvas
	
	this.mScreenPos = new Vec2(); // the rendered position of the view on the canvas
	this.mScreenSize = new Vec2(); // the rendered dimensions of the view on the canvas
	this.mScreenSize.Copy(this.mSize); // set the initial rendered size to the size of the view
	
	// the camera's canvas which renderables are rendered to before being rendered to the supplied canvas
	this.mCanvas = document.createElement('canvas');
	this.mCanvas.width = this.mSize.mX; this.mCanvas.height = this.mSize.mY; // set the initial canvas size to the size of the view
	this.mContext = this.mCanvas.getContext("2d");
};

Camera.prototype.Type = function() {
	return "Camera";
}

// make a deep copy of another (other) camera
Camera.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mSize.Copy(other.mSize);
	
	this.mScreenPos.Copy(other.mScreenPos);
	this.mScreenSize.Copy(other.mScreenSize);
	
	this.Clear(); // cleat the current canvas
	this.SetSize(other.mSize); // resize the canvas
	this.mContext.drawImage(other.mCanvas, 0, 0); // copy the other canvas onto this one
}

// sets the camera's position
Camera.prototype.SetPosition = function(pos) {
	this.mPos.Copy(pos);
}

// reutrns the camera's position
Camera.prototype.GetPosition = function() {
	return this.mPos.GetCopy();
}

// sets the camera's size
Camera.prototype.SetSize = function(size) {
	var s = new Vec2(); s.Copy(size); // copy the supplied size
	if (s.mX <= 0) { // if the x is 0 or less (invalid)
		s.mX = 1; // set it to 1 (minimum width)
	}
	
	if (s.mY <= 0) {
		s.mY = 1;
	}
	
	this.mSize.Copy(s); // set the size
	this.mCanvas.width = this.mSize.mX; this.mCanvas.height = this.mSize.mY; // update the canvas size to match the camera's size
}

Camera.prototype.GetSize = function() {
	return this.mSize.GetCopy();
}

Camera.prototype.SetScreenPosition = function(pos) {
	this.mScreenPos.Copy(pos);
}

Camera.prototype.GetScreenPosition = function() {
	return this.mScreenPos.GetCopy();
}

Camera.prototype.SetScreenSize = function(size) {
	var s = new Vec2(); s.Copy(size);
	if (s.mX <= 0) {
		s.mX = 1;
	}
	
	if (s.mY <= 0) {
		s.mY = 1;
	}
	
	this.mScreenSize.Copy(s);
}

Camera.prototype.GetScreenSize = function() {
	return this.mScreenSize.GetCopy();
}

Camera.prototype.Render = function(context) {
	var renderContext = nmain.game.mCurrContext;
	if (context != null) {
		renderContext = context;
	}
	
	renderContext.save(); // save the current transform matrix
	
	var trans = new Matrix3();
	trans.Translate(this.mScreenPos);
	
	{ // apply the transformation matrix
		var a = trans.mArray[0][0];
		var b = trans.mArray[1][0];
		var c = trans.mArray[0][1];
		var d = trans.mArray[1][1];
		var e = trans.mArray[0][2];
		var f = trans.mArray[1][2];
		
		renderContext.transform(a, b, c, d, e, f);
	}
	
	renderContext.drawImage(this.mCanvas, 0, 0,
		this.mSize.mX, this.mSize.mY, 0, 0,
		this.mScreenSize.mX, this.mScreenSize.mY);
	
	renderContext.restore(); // load the saved transform matrix
}

// clears the camera's render context
Camera.prototype.Clear = function() {
	this.mContext.setTransform(1, 0, 0, 1, 0, 0); // set the transformation metrix to the identity matrix
	this.mContext.clearRect(0, 0, this.mSize.mX, this.mSize.mY); // clear the entire canvas
}
// ...End


// InitScene Class...
// self contained parts of the game such as different screens, levels or game modes
function InitScene() {
	this.mPersist = false;
};

// returns the type of this object for validity checking
InitScene.prototype.Type = function() {
	return "InitScene";
}

// initialises the scene object
InitScene.prototype.SetUp = function() {
	try {
		// 
		nmgrs.resLoad.QueueFont("monaco", "./res/sys/monaco/monaco");
		
		//
		nmgrs.resLoad.QueueFont("kingthings", "./res/sys/kingthings exeter/Kingthings_Exeter");
		
		nmgrs.resLoad.QueueFont("oldmansans", "./res/sys/OldSansBlack");
		
		// card textures
		nmgrs.resLoad.QueueTexture("cardsLarge", "./res/vis/cards/default/cardsLarge.png");
		nmgrs.resLoad.QueueTexture("cardsMedium", "./res/vis/cards/default/cardsMedium.png");
		nmgrs.resLoad.QueueTexture("cardsSmall", "./res/vis/cards/default/cardsSmall.png");
		nmgrs.resLoad.QueueTexture("cardBackLarge", "./res/vis/cards/default/cardBackLarge.png");
		nmgrs.resLoad.QueueTexture("cardBackMedium", "./res/vis/cards/default/cardBackMedium.png");
		nmgrs.resLoad.QueueTexture("cardBackSmall", "./res/vis/cards/default/cardBackSmall.png");
		nmgrs.resLoad.QueueTexture("cardBundleMedium", "./res/vis/cards/default/cardBundleMedium.png");
		nmgrs.resLoad.QueueTexture("cardBundleSmall", "./res/vis/cards/default/cardBundleSmall.png");
		
		nmgrs.resLoad.QueueTexture("buttonLarge", "./res/vis/ui/buttonLarge.png");
		nmgrs.resLoad.QueueTexture("buttonSmall", "./res/vis/ui/buttonSmall.png");
		nmgrs.resLoad.QueueTexture("buttonGraveyardArrow", "./res/vis/ui/buttonGraveyardArrow.png");
		
		nmgrs.resLoad.QueueTexture("logIcons", "./res/vis/ui/logIcons.png");
		nmgrs.resLoad.QueueTexture("logBack", "./res/vis/ui/logBack.png");
		nmgrs.resLoad.QueueTexture("logFront", "./res/vis/ui/logFront.png");
		
		nmgrs.resLoad.QueueTexture("optionsCheck", "./res/vis/ui/optionsCheck.png");
		
		nmgrs.resLoad.QueueTexture("statusAVBack", "./res/vis/ui/statusAVBack.png");
		nmgrs.resLoad.QueueTexture("statusSSBack", "./res/vis/ui/statusSSBack.png");
		nmgrs.resLoad.QueueTexture("statusIcons", "./res/vis/ui/statusIcons.png");
		
		nmgrs.resLoad.QueueTexture("menuLogo", "./res/vis/menuLogo.png");
		nmgrs.resLoad.QueueTexture("gameBack", "./res/vis/back.png");
		
		nmgrs.resLoad.AcquireResources();
		nmgrs.resLoad.mIntervalID = setInterval(function() {nmgrs.resLoad.ProgressCheck();}, 0);
	} catch(e) {
		alert(e.What());
	}
}

// cleans up the scene object
InitScene.prototype.TearDown = function() {
	
}

// handles user input
InitScene.prototype.Input = function() {
	
}

// handles game logic
InitScene.prototype.Process = function() {
	if (nmgrs.resLoad.mWorking == false) {
		noogaah.options.LoadOptions();
		
		nmgrs.sceneMan.RequestSceneChange(new OogaahMenuScene());
		// nmgrs.sceneMan.RequestSceneChange(new OogaahTestScene());
	}
}

// handles all drawing tasks
InitScene.prototype.Render = function() {
	
}
// ...End


// window callbacks...
// register our call back to handle window resize
window.onresize = function(e) {
	nmain.game.HandleResize(e);
}
// ...End

// Game Class...
// a game object contains all the logic and data of our game
function Game() {
	this.mGameLoop = null; // handle to the setInterval that runs our loop code
	this.mFrameLimit = 60; // the maximum frames per second
	this.mAccum = 0.0; // the current frame time accumulator
	this.mTimer = new Timer(); // the timer that handles our main loop timing
	this.mClearColour = "#000000"; // the clear colour i.e., background colour of the canvas
	
	this.mIntergrate = true; // should the process step be integrated
	
	this.mDoubleBuffered = false;
	this.mCanvas = new Array(); // an array of our canvases 
	this.mContext = new Array(); // an array of contexts (buffers)
	this.mBufferIter = 0; // our current buffer (context)
	
	this.mCurrCanvas = null; // reference to current buffer (context)
	this.mCurrContext = null; // reference to current buffer (context)
	
	this.mCanvasPos = new Vec2(0, 0); // position of the canvas on the page
	this.mCanvasSize = new Vec2(0, 0); // dimensions of the canvas
	
	this.mFillCanvas = true; // should the canvas be filled with a colour
	
	// used to measure the current average FPS
	this.mFPSIter = 0;
	this.mFPSAccum = 0;
	this.mFPS = 0;
	
	// custom stylesheet used to append custom styles (including custom fonts)
	this.mStyleSheet = document.createElement('style');
	this.mStyleSheet.type = 'text/css';
	document.getElementsByTagName('head')[0].appendChild(this.mStyleSheet);
	
	this.mUpdateMode = 0;
};

// initialises the game object
Game.prototype.SetUp = function() {
	// add front buffer context
	this.mCanvas.push(document.getElementById("frontbuffer"));
	this.mContext.push(this.mCanvas[0].getContext("2d"));
	
	// add back buffer context
	this.mCanvas.push(document.getElementById("backbuffer"));
	this.mContext.push(this.mCanvas[1].getContext("2d"));
	
	this.FindCanvasPosition(); // calculate the position of the canvas
	
	this.mCanvasSize.Set(this.mCanvas[0].width, this.mCanvas[0].height); // set dimensions of the canvas
	this.mCurrCanvas = this.mCanvas[this.mBufferIter];
	this.mCurrContext = this.mContext[this.mBufferIter]; // set reference to current buffer
	this.mCanvas[this.mBufferIter].style.visibility = 'visible'; // set current buffer to visible (display)
	
	// change to our initial scene
	nmgrs.sceneMan.RequestSceneChange(new InitScene());
	nmgrs.sceneMan.ChangeScene(new InitScene());
}

// cleans up the game object
Game.prototype.TearDown = function() {
	
}

// our main game loop
Game.prototype.Run = function() {
	var updateDisplay = false; // do we need to redisplay?
	
	this.Input(); // perform input handling
	nmgrs.inputMan.Process();
	
	var dt = (this.mTimer.GetElapsedTime() / 1000); // get the delta time (since last frame)
	this.mTimer.Reset(); // reset the timer to time next frame
	this.mAccum += dt; // add the delta time to our accumulated time
	this.mFPSAccum += dt;
	
	// while our accumulated time is greater than the frame limit
	while (this.mAccum > (1 / this.mFrameLimit)) {
		this.Process(); // process the game
		
		if (this.mIntergrate == true) {
			this.mAccum -= (1 / this.mFrameLimit); // decrease the accumulator
		}
		else {
			this.mAccum = 0; // reset the accumulator
		}
		
		// interpolate for smoother running, baby
		
		updateDisplay = true; // we need to redisplay
	}
	
	this.mFPSIter++;
	
	// if we need to redisplay
	if (updateDisplay == true) {
		this.Render(); // render the results
	}
	
	// calculate the current average FPS
	if (this.mFPSAccum > 1) {
		this.mFPS = this.mFPSIter / this.mFPSAccum;
		this.mFPSAccum = 0;
		this.mFPSIter = 0;
	}
	
	nmgrs.sceneMan.ChangeScene(); // perform any scene change at the end of a frame
	
	if (this.mUpdateMode == 0) {
		requestAnimationFrame(function() {nmain.game.Run();});
	}
}

// quits the game (not strictly required, could be used to completely restart the game)
Game.prototype.Quit = function() {
	if (this.mUpdateMode == 0) {
		cancelAnimationFrame(this.mGameLoop);
	}
	else {
		clearInterval(this.mGameLoop); // remove the interval running our game loop
	}
	
	this.TearDown(); // clean up the game object
}

// handles user input
Game.prototype.Input = function() {
	nmgrs.sceneMan.GetCurrentScene().Input(); // perform input for the current scene
}

// handles game logic
Game.prototype.Process = function() {
	nmgrs.sceneMan.GetCurrentScene().Process(); // process the current scene
}

// handles all drawing tasks
Game.prototype.Render = function() {
	this.Clear(this.mClearColour); // clear the canvas
	
	nmgrs.sceneMan.GetCurrentScene().Render(); // render the current scene
	
	this.SwapBuffers(); // swap the buffers (display)
}

// clear the context
Game.prototype.Clear = function(colour) {
	this.mCurrContext.save(); // save current transform
	this.mCurrContext.setTransform(1, 0, 0, 1, 0, 0); // set to identity transform to make sure we clear entire context
	
	this.mCurrContext.fillStyle = colour; // set fill to clear colour
	
	// clear the canvas and then draw a filled rect
	this.mCurrContext.clearRect(0, 0, this.mCanvasSize.mX, this.mCanvasSize.mY);
	
	if (this.mFillCanvas == true) {
		this.mCurrContext.fillRect(0, 0, this.mCanvasSize.mX, this.mCanvasSize.mY);
	}
	
	this.mCurrContext.restore(); // restore previously save transform
}

// swap the buffers (contexts)
Game.prototype.SwapBuffers = function() {
	if (this.mDoubleBuffered == true) {
		this.mCanvas[this.mBufferIter].style.visibility = 'visible'; // set current buffer to visible (display)
		
		this.mBufferIter = (this.mBufferIter + 1) % 2; // increment the buffer iterator
		this.mCurrCanvas = this.mCanvas[this.mBufferIter];
		this.mCurrContext = this.mContext[this.mBufferIter]; // set the current buffer
		this.mCanvas[this.mBufferIter].style.visibility = 'hidden'; // hide the current buffer (we are now drawing to it)
	}
}

// set the current transform to the identity matrix
Game.prototype.SetIdentity = function() {
	this.mCurrContext.setTransform(1, 0, 0, 1, 0, 0); // identity matrix
}

Game.prototype.FindCanvasPosition = function() {
	{ // http://www.quirksmode.org/js/findpos.html
		var currObj = this.mCanvas[0];
		var currX = 0, currY = 0;
		if (currObj.offsetParent) {
			do {
				currX += currObj.offsetLeft;
				currY += currObj.offsetTop;
			} while (currObj = currObj.offsetParent);
			
			this.mCanvasPos.Set(currX, currY);
		}
	}
}

Game.prototype.HandleResize = function(e) {
	this.FindCanvasPosition(); // refind the canvas position on a resize
}
// ...End


// main Namespace...
var nmain = new function() {
	this.game = new Game(); // our game object
}
// ...End


{ // http://stackoverflow.com/a/2107586
	// Check if native implementation available
	if (typeof Object.create !== 'function') {
		Object.create = function (o) {
			function F() {}  // empty constructor
			F.prototype = o; // set base object as prototype
			return new F();  // return empty object with right [[Prototype]]
		};
	}
}

{ // https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame
	(function() {
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		
		window.requestAnimationFrame = requestAnimationFrame;
		
		var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
	})();
}

// managers Namespace...
var nmgrs = new function() {
	this.inputMan = new InputManager();
	this.sceneMan = new SceneManager();
	this.resMan = new ResourceManager();
	this.resLoad = new ResourceLoader();
};
// ...End


function main(mode) {
	try {
		nmain.game.SetUp(); // initialise the game
		
		// run the game loop as fast as the browser will allow
		// note that timing is handled elsewhere (within the Game Run() function)
		nmain.game.mTimer.Reset();
		nmain.game.mUpdateMode = mode;
		
		if (mode == 1) {
			nmain.game.mGameLoop = setInterval(function() {nmain.game.Run();}, 0);
		}
		else {
			nmain.game.mGameLoop = requestAnimationFrame(function() {nmain.game.Run();});
		}
	} catch(e) {
		alert(e.What());
	}
};

// oogaah Namespace...
var noogaah = new function() {
	this.options = new OogaahOptions();
	
	this.mAttackValues = new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "B", "A", "S");
	
	this.AVToIndex = function(attackValue) {
		return this.mAttackValues.indexOf(attackValue);
	}
	
	this.IndexToAV = function(index) {
		return this.mAttackValues[index];
	}
	
	// sorts cards based on attack value, lowest to highest
	this.CardSort = function(first, second) {
		var result = first.mCardValue - second.mCardValue; // find the difference between the card values (-1 < 0 < 1)
		if (result == 0) { // if result is 0 then values are the same
			if (first.mCardAttack != second.mCardAttack) { // if cards don't match
				
				// since human peasant (3) can only go higher than base and orc berserker (C) can only go lower,
				// if either of these cards are first then always position them either to the left or right
				// respectively; this ensures that they are always grouped and ordered logically
				// reverse values if the second card is one of these
				
				if (first.mCardAttack == "3") {
					result = -1;
				}
				else if (first.mCardAttack == "C") {
					result = 1;
				}
				else if (second.mCardAttack == "3") {
					result = 1;
				}
				else if (second.mCardAttack == "C") {
					result = -1;
				}
			}
		}
		
		return result;
	}
};
// ...End

// OogaahTestScene Class...
// 
function OogaahTestScene() {
	this.mPersist = false;
	
	this.mBatch = new RenderBatch();
	
	this.mShape = new Shape();
};

// returns the type of this object for validity checking
OogaahTestScene.prototype.Type = function() {
	return "OogaahTestScene";
}

// initialises the scene object
OogaahTestScene.prototype.SetUp = function() {
	nmain.game.mClearColour = "#2A2330";
	
	this.mShape.MakeRectangle(new Vec2(100, 100), new Vec2(100, 40));
	this.mShape.mColour = "#FFFFFF";
	
	this.mShape.SetSkew(new Vec2(10, 10));
}

// cleans up the scene object
OogaahTestScene.prototype.TearDown = function() {
	
}

// handles user input
OogaahTestScene.prototype.Input = function() {
	
}

// handles game logic
OogaahTestScene.prototype.Process = function() {
	
}

// handles all drawing tasks
OogaahTestScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	
	arr.push(this.mShape);
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(null, null);
}
// ...End


// OogaahMenuScene Class...
// 
function OogaahMenuScene() {
	this.mPersist = false;
	
	this.mBatch = new RenderBatch();
	
	this.mBackColour = new Shape();
	this.mMenuControl = new OogaahMenuControl();
	
	this.mLogo = new Sprite();
};

// returns the type of this object for validity checking
OogaahMenuScene.prototype.Type = function() {
	return "OogaahMenuScene";
}

// initialises the scene object
OogaahMenuScene.prototype.SetUp = function() {
	nmain.game.mClearColour = "#FAF1CE";
	
	{
		this.mBackColour.SetPosition(new Vec2(2, 2));
		this.mBackColour.AddPoint(new Vec2(636,   0));
		this.mBackColour.AddPoint(new Vec2(636, 476));
		this.mBackColour.AddPoint(new Vec2(  0, 476));
		this.mBackColour.mAbsolute = true;
		this.mBackColour.mDepth = 99999;
		this.mBackColour.mColour = "#35251C";
	}
	
	this.mMenuControl.SetUp();
	
	var tex = nmgrs.resMan.mTexStore.GetResource("menuLogo");
	this.mLogo.SetTexture(tex);
	this.mLogo.SetPosition(new Vec2(10, 10));
}

// cleans up the scene object
OogaahMenuScene.prototype.TearDown = function() {
	
}

// handles user input
OogaahMenuScene.prototype.Input = function() {
	this.mMenuControl.Input();
}

// handles game logic
OogaahMenuScene.prototype.Process = function() {
	this.mMenuControl.Process();
}

// handles all drawing tasks
OogaahMenuScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	
	arr.push(this.mBackColour);
	arr.push(this.mLogo);
	
	arr = util.ConcatArray(arr, this.mMenuControl.GetRenderData());
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(null, null);
}
// ...End


// OogaahMenuControl Class...
// 
function OogaahMenuControl() {
	this.mMenuOptionBack = new Array();
	this.mMenuOptionBack[0] = new Shape();
	this.mMenuOptionBack[1] = new Shape();
	this.mMenuOptionBack[2] = new Shape();
	
	this.mMenuOptionText = new Array();
	this.mMenuOptionText[0] = new RenderCanvas();
	this.mMenuOptionText[1] = new RenderCanvas();
	this.mMenuOptionText[2] = new RenderCanvas();
	
	this.mCurrentOption = -1;
	
	this.mFinished = false;
};

OogaahMenuControl.prototype.SetUp = function() {
	{
		var yOff = 460;
		var xSize = 80;
		
		for (var i = 0; i < this.mMenuOptionBack.length; ++i) {
			this.mMenuOptionBack[i].MakeRectangle(new Vec2(-80, yOff), new Vec2(xSize, 32));
			this.mMenuOptionBack[i].SetSkew(new Vec2(15, 0));
			this.mMenuOptionBack[i].mColour = "#FAF1CE";
			this.mMenuOptionBack[i].mAlpha = 0.5;
			
			yOff += 40;
			xSize -= 64;
		}
	}
	
	{
		var arr = new Array();
		
		{
			var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
			var txt = new Text();
			txt.SetFont(fnt);
			txt.SetFontSize(28);
			txt.mAlign = "right";
			txt.mColour = "#35251C";
			txt.SetPosition(new Vec2(320, 0));
			
			txt.SetString("Play a Game");
			arr.push(new Array(txt.GetCopy()));
			
			txt.SetString("Learn to Play");
			arr.push(new Array(txt.GetCopy()));
			
			txt.SetString("Set Options");
			arr.push(new Array(txt.GetCopy()));
		}
		
		var yOff = 274;
		for (var i = 0; i < this.mMenuOptionText.length; ++i) {
			this.mMenuOptionText[i].SetSize(new Vec2(320, 36));
			this.mMenuOptionText[i].RenderTo(arr[i]);
			
			this.mMenuOptionText[i].SetPosition(new Vec2(nmain.game.mCanvasSize.mX - 40, yOff));
			this.mMenuOptionText[i].SetOrigin(new Vec2(320, 0));
			this.mMenuOptionText[i].SetSkew(new Vec2(15, 0));
			
			this.mMenuOptionText[i].mAlpha = 0.0;
			
			yOff += 40;
		}
	}
}

// handles user input
OogaahMenuControl.prototype.Input = function() {
	if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) {
		switch (this.mCurrentOption) {
			case 0 :
				nmgrs.sceneMan.RequestSceneChange(new OogaahGameScene());
				break;
			case 1 :
				nmgrs.sceneMan.RequestSceneChange(new OogaahExamplePlayScene());
				break;
			case 2 :
				nmgrs.sceneMan.RequestSceneChange(new OogaahOptionsScene());
				break;
		}
	}
}

// handles game logic
OogaahMenuControl.prototype.Process = function() {
	if (this.mFinished == true) { // if menu has fully loaded
		this.mCurrentOption = -1;
		var found = false;
		
		for (var i = 0; i < this.mMenuOptionBack.length; ++i) {
			this.mMenuOptionBack[i].mAlpha = 0.5;
			this.mMenuOptionText[i].SetScale(new Vec2(1.0, 1.0));
			
			var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords());
			
			var polygon = this.mMenuOptionBack[i].mGlobalMask.GetAbsolute();
			
			if (util.PointInConvex(p, polygon) == true && found == false &&
					nmgrs.inputMan.GetMouseInCanvas() == true) {
				
				this.mCurrentOption = i;
				this.mMenuOptionBack[i].mAlpha = 1;
				this.mMenuOptionText[i].SetScale(new Vec2(1.2, 1.0));
				found = true;
			}
		}
	}
	else { // otherwise we're still loading menu
		// if the first menu option back shape has not yet fully animated
		if (this.mMenuOptionBack[0].mPoints[0].mX < nmain.game.mCanvasSize.mX + 160) {
			var shp = this.mMenuOptionBack[0]; // reference the back shape
			shp.MakeRectangle(shp.mPos, new Vec2(shp.mSize.mX + 16, shp.mSize.mY)); // increase the length of the shape
		}
		else { // otherwise it has fully loaded
			if (this.mMenuOptionText[0].mAlpha < 1.0) { // if the text is not yet fully opaque
				this.mMenuOptionText[0].mAlpha += 0.1; // increase the alpha value
			}
			else { // otherwise text is fully opaque
				this.mMenuOptionBack[0].SetMask(); // so set the collision mask (for user interaction)
			}
		}
		
		// as above
		if (this.mMenuOptionBack[1].mPoints[0].mX < nmain.game.mCanvasSize.mX + 160) {
			var shp = this.mMenuOptionBack[1];
			shp.MakeRectangle(shp.mPos, new Vec2(shp.mSize.mX + 16, shp.mSize.mY));
		}
		else {
			if (this.mMenuOptionText[1].mAlpha < 1.0) {
				this.mMenuOptionText[1].mAlpha += 0.1;
			}
			else {
				this.mMenuOptionBack[1].SetMask();
			}
		}
		
		// as above
		if (this.mMenuOptionBack[2].mPoints[0].mX < nmain.game.mCanvasSize.mX + 160) {
			var shp = this.mMenuOptionBack[2];
			shp.MakeRectangle(shp.mPos, new Vec2(shp.mSize.mX + 16, shp.mSize.mY));
		}
		else {
			if (this.mMenuOptionText[2].mAlpha < 1.0) {
				this.mMenuOptionText[2].mAlpha += 0.1;
			}
			else {
				this.mMenuOptionBack[2].SetMask();
				this.mFinished = true; // once last shape is fully loaded, we are done
			}
		}
	}
}

//
OogaahMenuControl.prototype.GetRenderData = function() {
	var arr = new Array();
	
	for (var i = 0; i < this.mMenuOptionBack.length; ++i) {
		arr.push(this.mMenuOptionBack[i]);
	}
	
	for (var i = 0; i < this.mMenuOptionText.length; ++i) {
		arr.push(this.mMenuOptionText[i]);
	}
	
	return arr;
}
// ...End


// OogaahGameScene Class...
// 
function OogaahGameScene() {
	this.mPersist = false;
	this.mPaused = false;
	
	this.mBatch = new RenderBatch(); // the main render batch
	this.mRand = new RNG(); // the random number generator
	
	// this.mBackColour = new Shape();
	this.mGameBack = new Sprite();
	
	this.mCardList = new Array(); // array containing a list of the available cards
	this.mDeck = new Array(); // the deck containing all of the cards required for a game
	
	this.mCurrPlayer = 0;
	this.mLastPlayer = -1;
	this.mPlayers = new Array();
	this.mPlayers[0] = new OogaahHuman();
	this.mPlayers[1] = new OogaahAI();
	this.mPlayers[2] = new OogaahAI();
	this.mPlayers[3] = new OogaahAI();
	this.mFinishedCount = 0;
	
	this.mDelay = 0; // the amount of delay left before the AI can make another move (in MS)
	
	this.mCurrAV = 0;
	this.mCurrSS = 0;
	this.mWarriorOwner = -1;
	this.mReversed = false;
	this.mOnlyPeasants = false;
	
	this.mBattlefield = new OogaahBattlefield();
	this.mGraveyard = new OogaahGraveyard();
	
	this.mStatusAVText = new Text();
	this.mStatusAVSprite = new Sprite();
	this.mStatusSSText = new Text();
	this.mStatusSSSprite = new Sprite();
	this.mStatusWarrior = new Sprite();
	this.mStatusReversed = new Sprite();
	this.mStatusPeasants = new Sprite();
	
	this.mLog = new OogaahPlayLog();
};

// returns the type of this object for validity checking
OogaahGameScene.prototype.Type = function() {
	return "OogaahGameScene";
}

// initialises the scene object
OogaahGameScene.prototype.SetUp = function() {
	this.mBatch.mFrustrumCull = false;
	
	{
		/* this.mBackColour.mPos.Set(2, 2);
		this.mBackColour.AddPoint(new Vec2(636,   0));
		this.mBackColour.AddPoint(new Vec2(636, 476));
		this.mBackColour.AddPoint(new Vec2(  0, 476));
		this.mBackColour.mAbsolute = true;
		this.mBackColour.mDepth = 99999;
		this.mBackColour.mColour = "#35251C"; */
		
		var tex = nmgrs.resMan.mTexStore.GetResource("gameBack");
		this.mGameBack.SetTexture(tex);
		this.mGameBack.SetPosition(new Vec2(2, 2));
		this.mGameBack.mDepth = 99999;
	}
	
	this.CreateCardList();
	this.ShuffleDeck();
	this.DealCards();
	
	this.mGraveyard.SetUp();
	
	for (var i = 0; i < this.mPlayers.length; ++i) {
		this.mPlayers[i].SetUp(i);
		this.mPlayers[i].PositionHand();
	}
	
	this.mLog.SetUp();
	this.mLog.SetLoggedActions(noogaah.options.mLogOptions);
	
	for (var i = 0; i < this.mPlayers.length; ++i) {
		if (this.mPlayers[i].mType == "AI") {
			var behaviour = new OogaahBehaviourSimple();
			behaviour.SetUp(this.mPlayers[i]);
			
			this.mPlayers[i].mBehaviourStore.mBehaviours.push(behaviour);
		}
	}
	
	if (this.mPlayers[this.mCurrPlayer].mType == "Human") {
		this.mPlayers[this.mCurrPlayer].OnTurnBegin();
	}
	
	{
		var pos = new Vec2(102, 143);
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		
		this.mStatusAVText.SetFont(fnt);
		this.mStatusAVText.SetFontSize(36);
		this.mStatusAVText.SetPosition(new Vec2(pos.mX + 46, pos.mY - 3));
		this.mStatusAVText.mDepth = 0;
		this.mStatusAVText.mColour = "#FFFFFF";
		this.mStatusAVText.mAlign = "centre";
		this.mStatusAVText.SetString("0");
		
		var texAV = nmgrs.resMan.mTexStore.GetResource("statusAVBack");
		this.mStatusAVSprite.SetTexture(texAV);
		this.mStatusAVSprite.SetPosition(new Vec2(pos.mX, pos.mY));
		this.mStatusAVSprite.mDepth = 1;
		
		this.mStatusSSText.SetFont(fnt);
		this.mStatusSSText.SetFontSize(16);
		this.mStatusSSText.SetPosition(new Vec2(pos.mX + 46, pos.mY + 65));
		this.mStatusSSText.mDepth = 0;
		this.mStatusSSText.mColour = "#FFFFFF";
		this.mStatusSSText.mAlign = "centre";
		this.mStatusSSText.SetString("0x");
		
		var texSS = nmgrs.resMan.mTexStore.GetResource("statusSSBack");
		this.mStatusSSSprite.SetTexture(texSS, 6, 1, -1, -1);
		this.mStatusSSSprite.SetCurrentFrame(0);
		this.mStatusSSSprite.SetPosition(new Vec2(pos.mX + 1, pos.mY + 38));
		this.mStatusSSSprite.mDepth = 1;
		
		
		var texIcons = nmgrs.resMan.mTexStore.GetResource("statusIcons");
		
		this.mStatusWarrior.SetTexture(texIcons, 3, 3, -1, -1);
		this.mStatusWarrior.SetCurrentFrame(1);
		this.mStatusWarrior.SetPosition(new Vec2(pos.mX + 18, pos.mY + 91));
		this.mStatusWarrior.mDepth = 1;
		
		this.mStatusReversed.SetTexture(texIcons, 3, 3, -1, -1);
		this.mStatusReversed.SetCurrentFrame(0);
		this.mStatusReversed.SetPosition(new Vec2(pos.mX + 38, pos.mY + 91));
		this.mStatusReversed.mDepth = 1;
		
		this.mStatusPeasants.SetTexture(texIcons, 3, 3, -1, -1);
		this.mStatusPeasants.SetCurrentFrame(2);
		this.mStatusPeasants.SetPosition(new Vec2(pos.mX + 58, pos.mY + 91));
		this.mStatusPeasants.mDepth = 1;
	}
	
	/* this.mBattlefield.AddCard(this.mCardList[n]);
	this.mPlayers[n].mHand.mCards.splice(0, this.mPlayers[n].mHand.mCards.length);
	this.mPlayers[n].mHand.AddCard(this.mCardList[m]);
	this.mPlayers[n].mHand.mCards[this.mPlayers[n].mHand.mCards.length - 1].ModifyValue(-3);
	this.mPlayers[n].PositionHand();
	this.mPlayers[n].ResetSelected(); */
}

// cleans up the scene object
OogaahGameScene.prototype.TearDown = function() {
	
}

// handles user input
OogaahGameScene.prototype.Input = function() {
	this.mGraveyard.Input(); // process the graveyard's user input
	this.mLog.Input(); // process the play log's user input
	
	for (var i = 0; i < this.mPlayers.length; ++i) {
		if (this.mPlayers[i].mType == "Human") {
			this.mPlayers[i].Input();
		}
	}
}

// handles game logic
OogaahGameScene.prototype.Process = function() {
	this.mLog.Process(); // process the play log
	
	if (false) { // if playMode is 0
		if (true) { // if this is the first round
			// do init stuff
		}
		else { // otherwise
			// do other stuff
		}
	}
	else if (true) { // otherwise if playMode is 1
		this.mGraveyard.Process(); // process the graveyard
		
		for (var i = 0; i < this.mPlayers.length; ++i) {
			if (this.mPlayers[i].mType == "Human") {
				this.mPlayers[i].Process();
			}
		}
		
		if (this.mDelay <= 0) {
			if (this.mPlayers[this.mCurrPlayer].mType == "AI") {
				this.mPlayers[this.mCurrPlayer].Process();
			}
		}
		else {
			if (this.mPlayers[this.mCurrPlayer].mType == "Human") {
				if (this.mPlayers[this.mCurrPlayer].mFinished == false) {
					this.mDelay = 0;
				}
			}
			else {
				this.mDelay -= 1000 / nmain.game.mFrameLimit;
			}
		}
		
		if (this.mFinishedCount == 3) {
			var lastPlayer = null;
			for (var i = 0; i < this.mPlayers.length; ++i) {
				if (this.mPlayers[i].mFinished == false) {
					lastPlayer = this.mPlayers[i];
					break;
				}
			}
			
			this.mLog.AddEntry(10, lastPlayer.mName + " was thoroughly decimated (4th)!"); // add entry to the play log
			lastPlayer.mFinished = true;
			++this.mFinishedCount;
			this.mLastPlayer = -1;
		}
	}
}

// handles all drawing tasks
OogaahGameScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	
	// arr.push(this.mBackColour);
	arr.push(this.mGameBack);
	
	arr = util.ConcatArray(arr, this.mLog.GetRenderData()); // render the play log
	
	for (var i = 0; i < 4; ++i) {
		arr = util.ConcatArray(arr, this.mPlayers[i].GetRenderData());
	}
	
	arr = util.ConcatArray(arr, this.mGraveyard.GetRenderData());
	arr = util.ConcatArray(arr, this.mBattlefield.GetRenderData());
	
	{
		arr.push(this.mStatusAVSprite);
		
		if (this.mStatusAVText.mString != "0") {
			arr.push(this.mStatusAVText);
		}
		
		arr.push(this.mStatusSSSprite);
		
		if (this.mStatusSSText.mString != "0x") {
			arr.push(this.mStatusSSText);
		}
		
		if (this.mWarriorOwner != -1) {
			arr.push(this.mStatusWarrior);
		}
		
		if (this.mReversed == true) {
			arr.push(this.mStatusReversed);
		}
		
		if (this.mOnlyPeasants == true) {
			arr.push(this.mStatusPeasants);
		}
	}
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(null, null);
}

OogaahGameScene.prototype.CreateCardList = function() {	
	// load card face textures (large, medium and small)
	var texLarge = nmgrs.resMan.mTexStore.GetResource("cardsLarge");
	var texMedium = nmgrs.resMan.mTexStore.GetResource("cardsMedium");
	var texSmall = nmgrs.resMan.mTexStore.GetResource("cardsSmall");
	
	// load card back textures (large, medium and small)
	var texBackLarge = nmgrs.resMan.mTexStore.GetResource("cardBackLarge");
	var texBackMedium = nmgrs.resMan.mTexStore.GetResource("cardBackMedium");
	var texBackSmall = nmgrs.resMan.mTexStore.GetResource("cardBackSmall");
	
	{ // add one of each card to the card list
		this.mCardList.push(new OogaahCardGoblinHorde());
		this.mCardList.push(new OogaahCardGoblinOverseer());
		this.mCardList.push(new OogaahCardHumanPeasant());
		this.mCardList.push(new OogaahCardOrcWarrior());
		
		this.mCardList.push(new OogaahCardGoblinTechnician());
		this.mCardList.push(new OogaahCardOrcShaman());
		this.mCardList.push(new OogaahCardHumanCleric());
		this.mCardList.push(new OogaahCardHumanMage());
		
		this.mCardList.push(new OogaahCardHumanKnight());
		this.mCardList.push(new OogaahCardOrcBerserker());
		this.mCardList.push(new OogaahCardOrcWarchief());
		this.mCardList.push(new OogaahCardHumanPaladin());
		
		this.mCardList.push(new OogaahCardBeingOfEnergy());
	}
	
	for (var i = 0; i < this.mCardList.length; ++i) { // for all cards in the card list
		var c = this.mCardList[i]; // get a reference to the card
		
		// set the large textures
		c.mCardSprites[0].SetTexture(texLarge, 13, 5, -1, -1); c.mCardSprites[0].SetCurrentFrame(i);
		c.mCardSprites[0].SetMask();
		c.mCardBacks[0].SetTexture(texBackLarge);
		c.mCardBacks[0].SetMask();
		
		// set the medium textures
		c.mCardSprites[1].SetTexture(texMedium, 13, 5, -1, -1); c.mCardSprites[1].SetCurrentFrame(i);
		c.mCardSprites[1].SetMask();
		c.mCardBacks[1].SetTexture(texBackMedium);
		c.mCardBacks[1].SetMask();
		
		// set the small textures
		c.mCardSprites[2].SetTexture(texSmall, 13, 5, -1, -1); c.mCardSprites[2].SetCurrentFrame(i);
		c.mCardSprites[2].SetMask();
		c.mCardBacks[2].SetTexture(texBackSmall);
		c.mCardBacks[2].SetMask();
		
		// set the large shape alpha and colour
		c.mCardShapes[0].mAlpha = 0.0;
		c.mCardShapes[0].mColour = "#000000";
		
		// set the medium shape alpha and colour
		c.mCardShapes[1].mAlpha = 0.5;
		c.mCardShapes[1].mColour = "#000000";
		
		// set the small shape alpha and colour
		c.mCardShapes[2].mAlpha = 0.64;
		c.mCardShapes[2].mColour = "#000000";
	}
}

OogaahGameScene.prototype.ShuffleDeck = function() {
	this.mDeck.splice(0, this.mDeck.length); // make sure the deck is empty
	var unshuffled = new Array(); // unshuffle deck
	
	// for all the cards in the list (except the last)
	for (var i = 0; i < this.mCardList.length - 1; ++i) {
		for (var j = 0; j < 4; ++j) { // add 4 of them to the deck
			unshuffled.push(this.mCardList[i].GetCopy());
		}
	}
	
	{
		// add a copy of the last card "Being of Light"
		unshuffled.push(this.mCardList[this.mCardList.length - 1].GetCopy());
	}
	
	this.mDeck = util.ConcatArray(this.mDeck, util.ShuffleArray(this.mRand, unshuffled)); // shuffle the deck
}

OogaahGameScene.prototype.DealCards = function(first) {
	var id = first; // set first to the supplied id
	if (id == null) { // if no id was supplied
		id = this.mRand.GetRandInt(0, 3); // choose a random number from 0 to 3 inclusive
	}
	
	this.mCurrPlayer = id; // set the current player
	for (var i = 0; i < this.mDeck.length; ++i) { // for all cards in the deck
		this.mPlayers[id].mHand.AddCard(this.mDeck[i]); // add current card to current players hand
		id = (id + 1) % 4; // go to next player
	}
}

OogaahGameScene.prototype.ChangePlayer = function(player) {
	if (this.mFinishedCount < 4) {
		if (player == null) {
			if (this.mLastPlayer == -1 && this.mPlayers[this.mCurrPlayer].mFinished == false) {
				this.mLastPlayer = this.mCurrPlayer;
			}
			
			this.mCurrPlayer = (this.mCurrPlayer + 1) % 4;
		}
		else {
			this.mCurrPlayer = player;
			this.mLastPlayer = -1;
		}
		
		if (this.mCurrPlayer == this.mLastPlayer) { // 
			this.mLog.AddEntry(6, this.mPlayers[this.mCurrPlayer].mName + " won the skirmish!");
			
			this.mLastPlayer = -1; // reset the last player id
			this.SetAV(0); // reset the current attackvalue
			this.SetSS(0); // reset the current squadsize
			this.mWarriorOwner = -1;
			this.mReversed = false;
			this.mOnlyPeasants = false;
			
			var arr = new Array(); arr = util.ConcatArray(arr, this.mBattlefield.mCards);
			
			if (arr.length > 0) {
				if (arr[0].mCardAttack == "9") {
					this.mLog.AddEntry(5, "Human Peasant's " + this.mCardList[2].mCardAbility + " ability activates.");
				}
				
				this.mGraveyard.AddCards(arr);
				this.mBattlefield.Clear();
			}
		}
		
		if (this.mPlayers[this.mCurrPlayer].mType == "Human") {
			this.mPlayers[this.mCurrPlayer].OnTurnBegin();
		}
	}
}

OogaahGameScene.prototype.SetAV = function(newAV) {
	this.mCurrAV = newAV;
	
	if (newAV > 0) {
		this.mStatusAVText.SetString(noogaah.IndexToAV(newAV - 1));
	}
	else {
		this.mStatusAVText.SetString("0");
	}
}

OogaahGameScene.prototype.SetSS = function(newSS) {
	this.mCurrSS = newSS;
	
	this.mStatusSSText.SetString(newSS + "x");
	this.mStatusSSSprite.SetCurrentFrame(newSS);
}
// ...End


// OogaahCardBase class
// the base card that all other cards inherit from
function OogaahCardBase() {
	this.mCardAttack = ""; // the base attack value of the card (e.g., 1)
	this.mCardType = ""; // the type of the card (e.g., Goblin)
	this.mCardName = ""; // the name of the card (e.g., Horde)
	this.mCardAbility = ""; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 0; // the current value of the card
	
	// the face textures for the cards in all sizes
	this.mCardSprites = new Array();
	this.mCardSprites[0] = new Sprite(); // large
	this.mCardSprites[1] = new Sprite(); // medium
	this.mCardSprites[2] = new Sprite(); // small
	
	// the back textures for the cards in all sizes
	this.mCardBacks = new Array();
	this.mCardBacks[0] = new Sprite(); // large
	this.mCardBacks[1] = new Sprite(); // medium
	this.mCardBacks[2] = new Sprite(); // small
	
	// the shapes that overlay the cards (used to darken cards)
	this.mCardShapes = new Array();
	this.mCardShapes[0] = new Shape(); // large
	this.mCardShapes[1] = new Shape(); // medium
	this.mCardShapes[2] = new Shape(); // small
	
	this.mHidden = false; // is this card visible to the player?
	this.mSize = 2; // the current card size to display
	this.mDarken = false; // 
};

// makes a deep copy of another (other) OogaahCardBase
OogaahCardBase.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack; // copy the base attack
	this.mCardType = other.mCardType; // copy the type
	this.mCardName = other.mCardName; // copy the name
	this.mCardAbility = other.mCardAbility; // copy the ability
	
	this.mCardValue = other.mCardValue; // copy the card value
	
	// copy all sizes of card face sprites
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	// copy all sizes of card back sprites
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	// copy all sizes of card overlay shapes
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden; // copy hidden status
	this.mSize = other.mSize; // copy current size
	this.mDarken = other.mDarken; // copy darkened status
}

// returns a copy of this card
OogaahCardBase.prototype.GetCopy = function() {
	var c = new OogaahCardBase(); c.Copy(this); // create a new card base and copy this into it
	
	return c; // return new card base
}

// returns the data required to render this card base
OogaahCardBase.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	if (this.mHidden == false) { // if the card isn't hidden
		arr.push(this.mCardSprites[this.mSize]); // add the appropiately size face sprite
	}
	else { // otherwise the card is hidden
		arr.push(this.mCardBacks[this.mSize]); // add the appropiately size back sprite
	}
	
	if (this.mDarken == true) { // 
		arr.push(this.mCardShapes[this.mSize]);
	}
	
	return arr; // return the renderables array
}

OogaahCardBase.prototype.CreateCardShapes = function() {
	for (var i = 0; i < 3; ++i) {
		var spr = this.mCardSprites[i];
		if (this.mHidden == true) {
			spr = this.mCardBacks[i];
		}
		
		this.mCardShapes[i].Clear();
		this.mCardShapes[i].SetPosition(spr.mGlobalMask.mPos);
		this.mCardShapes[i].AddPoints(spr.mGlobalMask.mPoints);
	}
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardBase.prototype.Play = function(cards) {
	return false; // invalid - this is a base and as such has no play logic
}

// handles the orc warriors ability
OogaahCardBase.prototype.HandleOrcWarrior = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var result = -1; // the return value
	
	if (currScene.mWarriorOwner >= 0) { // if the current scene's owner value is greater than or equal to 0
		result = currScene.mWarriorOwner; // store the owner value
		currScene.mWarriorOwner = -1; // reset the owener value
	}
	
	return result;
}

// handles swapping of cards between players due to goblin technician's ability
OogaahCardBase.prototype.HandleCardSwap = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	var cardGive = cards[0]; // get a copy of the card to give
	var cardGet = currPlayer.mChosenPlayer.GetCard(currPlayer.mChosenCard); // get a copy of the card to recieve
	
	currPlayer.RemoveSelected(); // remove card from current player's hands
	currPlayer.mChosenPlayer.RemoveCard(currPlayer.mChosenCard); // remove card from chosen player's hand
	
	var mimicAttack = "0"; // the value that the being of light is mimicking (0 implies not a being of light)
	if (cardGet.mCardAttack == "S") { // if the card recieved is a being of light
		if (cardGet.mMimic != null) {
			mimicAttack = cardGet.mMimic.mCardAttack; // store the being of light's mimicked attack value
			cardGet.mMimic = null; // reset the being of light's mimicked card
		}
	}
	
	currPlayer.mHand.AddCard(cardGet); // add the recieved card to the current player's hand
	currPlayer.mChosenPlayer.AddCard(cardGive); // add the given card to the chosen player's hand
	
	if (currPlayer.mChosenID != -1) { // if the chosen player is not the graveyard
		
		currScene.mPlayers[currPlayer.mChosenID].PositionHand(); // reposition their hand
	}
	else {
		if (cardGet.mCardAttack == "9" || cardGive.mCardAttack == "9") {
			currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activates.");
		}
		else if (cardGet.mCardAttack == "S") {
			if (mimicAttack != "0") { // if being of light was played using its ability
				if (mimicAttack == "9") { // if the card was played as a knight
					currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activates.");
				}
			}
		}
	}
	
	// add entry to the play log
	currScene.mLog.AddEntry(3, currPlayer.mName + " swapped 1x " + cardGive.mCardType + " " + cardGive.mCardName +
			" for 1x " + cardGet.mCardType + " " + cardGet.mCardName + ".");
	
	currPlayer.ResetSelected(); // reset the current player's selection status
	currPlayer.PositionHand(); // reposition their hand
	
	// reset goblin technician selection choices
	currPlayer.mChosenPlayer = null;
	currPlayer.mChosenID = -1;
	currPlayer.mChosenCard = -1;
	
	if (currPlayer.mType == "Human") {
		// update player gui text
		currPlayer.mGUI.mButtonText[0].SetString("Play");
		currPlayer.mGUI.mButtonText[1].SetString("Pass");
	}
	
	currPlayer.mMode = 0; // reset the current player's mode
	currPlayer.mSubMode = "a"; // reset the current player's submode
	
	if (currPlayer.mType == "Human") {
		currPlayer.mGUI.mButtonText[0].SetString("Play");
		currPlayer.mGUI.ShowMessage(false);
	}
	
	currScene.ChangePlayer(); // change to the next player
}

// 
OogaahCardBase.prototype.HandleHumanMage = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	currScene.SetAV(cards[0].mCardValue);
	currScene.SetSS(1);
	
	currScene.mLog.AddEntry(3, currPlayer.mName + " played " + this.mCardType + " " + this.mCardName + " alongside Human Mage.");
	
	currPlayer.mMode = 0; // reset the current player's mode
	currPlayer.RemoveSelected(); // remove cards from current player's hands
	currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
	
	if (currPlayer.mType == "Human") {
		currPlayer.mGUI.mButtonText[0].SetString("Play");
		currPlayer.mGUI.ShowMessage(false);
	}
	
	currScene.ChangePlayer(); // change to the next player
}
// ...End


// OogaahHand Class...
// a playable hand consisting of a number of cards
function OogaahHand() {
	this.mCards = new Array(); // the cards that make up this hand
};

// makes a deep copy of the (other) hand
OogaahHand.prototype.Copy = function(other) {
	this.mCards.splice(0, this.mCards.length); // remove all cards from this hand
	for (var i = 0; i < other.mCards.length; ++i) { // for all cards in the other hand
		this.mCards.push(other.mCards[i].GetCopy()); // add a copy to this hand
	}
}

// returns all renderable data relating to this class
OogaahHand.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	for (var i = 0; i < this.mCards.length; ++i) { // for all cards in the hand
		arr = util.ConcatArray(arr, this.mCards[i].GetRenderData()); // add the card to the array
	}
	
	return arr; // return the renderables array
}

// adds a card to the hand, sorts it by attack value and then positions it (card to add [OogaahCardBase])
OogaahHand.prototype.AddCard = function(card) {	
	var c = card.GetCopy(); // get a copy of the card
	this.mCards.push(c); // add the copy to the hand
	
	this.mCards.sort(noogaah.CardSort); // sort the hand by value
}

// removes a card from the hand (id of the card [integer])
OogaahHand.prototype.RemoveCard = function(id) {
	if (id >= 0 && id < this.mCards.length) { // if the id is valid
		this.mCards.splice(id, 1); // remove the card from the array
	}
}

// returns a card from the hand (id of the card [integer])
OogaahHand.prototype.GetCard = function(id) {
	if (id >= 0 && id < this.mCards.length) { // if the id is valid
		var c = this.mCards[id].GetCopy(); // get a copy of the card
		return c; // return the copy
	}
	
	return null; // return null (invalid id)
}

// returns card ids seperated by attack value
OogaahHand.prototype.GetCardsByAV = function() {
	var currScene = nmgrs.sceneMan.mCurrScene;
	
	var arr = new Array();
	for (var i = 0; i < currScene.mCardList.length; ++i) {
		arr.push(new Array());
	}
	
	for (var i = 0; i < this.mCards.length; ++i) {
		var ind = noogaah.AVToIndex(this.mCards[i].mCardAttack);
		arr[ind].push(i);
	}
	
	return arr;
}

// returns card ids seperated by attack value for which we have only 1
OogaahHand.prototype.GetCardsByAVSingles = function() {
	var cards = this.GetCardsByAV();
	
	for (var i = 0; i < cards.length; ++i) {
		if (cards[i].length > 1) {
			cards[i].splice(0, cards[i].length);
		}
	}
	
	return cards;
}
// ...End


// OogaahPile class
// a pile of cards
function OogaahPile() {
	this.mCards = new Array(); // array containing the cards in this pile
};

// clears all cards from the pile
OogaahPile.prototype.Clear = function() {
	this.mCards.splice(0, this.mCards.length); // clear the cards array
}

// adds a card to the pile
OogaahPile.prototype.AddCard = function(card) {
	var c = card.GetCopy(); // get a copy of the card
	this.mCards.push(c); // add it to the cards array
}

// removes a card from the pile
OogaahPile.prototype.RemoveCard = function(id) {
	if (id >= 0 && id < this.mCards.length) { // if card id is valid
		this.mCards.splice(id, 1); // remove the card from the array
	}
}

// returns a copy of a card in the pile
OogaahPile.prototype.GetCard = function(id) {
	if (id >= 0 && id < this.mCards.length) { // if the card id is valid
		var c = this.mCards[id].GetCopy(); // create a copy of the card
		return c; // return the copy
	}
	
	return null; // otherwise return null (invalid id)
}

// adds an array of cards to the pile
OogaahPile.prototype.AddCards = function(cards) {
	for (var i = 0; i < cards.length; ++i) { // for all cards in the array
		this.AddCard(cards[i]); // add each to the pile
	}
}

// returns the card at the top of the pile
OogaahPile.prototype.GetTopCard = function() {
	return this.GetCard(this.mCards.length - 1); // try and return last card in the array
}
// ...End


// OogaahGraveyardViewCard class
// 
function OogaahGraveyardViewCard() {
	this.mCard = null;
	this.mIndex = 0;
};
// ...End


// OogaahGraveyard class
// a card pile which holds discarded cards
function OogaahGraveyard() {
	OogaahPile.apply(this, null); // construct the base class
	
	this.mCard = new OogaahCardBase();
	
	// additionaly sprites representing multiple (more than 1) cards in the graveyard
	this.mBundleSprites = new Array();
	this.mBundleSprites[1] = new Sprite();
	this.mBundleSprites[2] = new Sprite();
	
	this.mSize = 2; // the current render size of the graveyard
	this.mSelectable = false; // is the graveyard currently selectable
	
	this.mView = false;
	this.mViewShape = new Shape();
	this.mViewLeftButton = new GUIButton();
	this.mViewRightButton = new GUIButton();
	this.mViewIndex = 0;
	this.mViewCards = new Array();
	this.mCurrentHighlight = -1; // the id of the current card highlighted (-1 if none)
	
	this.mSelectableArrow = new Shape();
};

// inherit the base class's prototype
OogaahGraveyard.prototype = Object.create(OogaahPile.prototype);

// clears all cards from the pile
OogaahGraveyard.prototype.Clear = function() {
	this.mCards.splice(0, this.mCards.length); // clear the cards array
	this.mViewCards.splice(0, this.mViewCards.length);
	this.mViewIndex = 0;
}

// adds a card to the pile
OogaahGraveyard.prototype.AddCard = function(card) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var c = card.GetCopy(); // get a copy of the card
	
	this.HandlePeasant(c, 1);
	this.mCards.push(c); // add it to the cards array
	
	{
		if (this.mCards.length == 2) { // if we now have more than 1 card in the graveyard
			this.mCard.mCardBacks[1].SetPosition(new Vec2(254, 206));
			this.mCard.mCardBacks[2].SetPosition(new Vec2(254, 206));
		}
	}
	
	{ // handle viewing cards
		var found = false; // did we find a matching card in the viewing cards array
		var id = -1; // the id of the matching card array OR the closest card array past it
		
		for (var i = 0; i < this.mViewCards.length; ++i) { // for all card arrays in the viewing cards array
			var cardOther = this.mViewCards[i][0].mCard; // the card we're comparing against
			var attack = card.mCardAttack;
			if (attack == "S") {
				if (card.mMimic != null) {
					attack = card.mMimic.mCardAttack;
				}
			}
			
			var otherAttack = cardOther.mCardAttack;
			if (otherAttack == "S") {
				if (cardOther.mMimic != null) {
					otherAttack = cardOther.mMimic.mCardAttack;
				}
			}
			
			if (otherAttack == attack) { // if the attacks match
				id = i; // set the id to this index
				found = true; // we found a match
				break; // stop looking
			}
			else if (noogaah.AVToIndex(otherAttack) > noogaah.AVToIndex(attack)) { // ordered, so if greater then doesn't exist
				id = i; // set the id to this index
				break; // stop looking
			}
		}
		
		var viewCard = new OogaahGraveyardViewCard();
		viewCard.mCard = c.GetCopy();
		viewCard.mIndex = this.mCards.length - 1;
		
		var cardNew = viewCard.mCard;
		
		{
			cardNew.mCardSprites[1].SetPosition(new Vec2(220, 259));
			cardNew.mCardSprites[1].SetOrigin(new Vec2(0, cardNew.mCardSprites[1].mSize.mY));
			cardNew.mCardSprites[1].SetRotation(0);
			cardNew.mCardSprites[1].mDepth = -56;
			
			cardNew.mCardSprites[2].SetPosition(new Vec2(220, 259));
			cardNew.mCardSprites[2].SetOrigin(new Vec2(0, cardNew.mCardSprites[2].mSize.mY));
			cardNew.mCardSprites[2].SetRotation(0);
			cardNew.mCardSprites[2].mDepth = -55;
			
			// if the card is a human peasant or an orc berserker
			if (cardNew.mCardAttack == "3" || cardNew.mCardAttack == "C") {
				cardNew.PositionValueText();
			}
			else if (cardNew.mCardAttack == "S") {
				if (cardNew.mMimic != null) {
					cardNew.PositionClip();
				}
			}
			
			cardNew.mHidden = false;
			cardNew.mDarken = false;
			cardNew.mSize = 2;
			cardNew.CreateCardShapes();
		}
		
		if (found == true) { // if we found a match
			this.mViewCards[id].push(viewCard); // add it to the array
			
			var pos = new Vec2(220 - ((20 * (this.mViewCards[id].length - 1)) / 2),
					259 - ((20 * (this.mViewCards[id].length - 1)) / 2));
			
			for (var i = 0; i < this.mViewCards[id].length; ++i) {
				this.mViewCards[id][i].mCard.mCardSprites[1].SetPosition(pos);
				this.mViewCards[id][i].mCard.mCardSprites[2].SetPosition(pos);
				
				// if the card is a human peasant or an orc berserker
				if (this.mViewCards[id][i].mCard.mCardAttack == "3" || this.mViewCards[id][i].mCard.mCardAttack == "C") {
					this.mViewCards[id][i].mCard.PositionValueText();
				}
				else if (this.mViewCards[id][i].mCard.mCardAttack == "S") {
					if (this.mViewCards[id][i].mCard.mMimic != null) {
						this.mViewCards[id][i].mCard.PositionClip();
					}	
				}
				
				pos.mX += 20; pos.mY += 20;
			}
		}
		else { // otherwise no match
			if (id >= 0) { // if we have an id
				this.mViewCards.splice(id, 0, new Array()); // insert new card array before the id we found
				
				this.mViewCards[id].push(viewCard); // add it to the array
			}
			else { // otherwise we have no id
				this.mViewCards.push(new Array()); // insert new card array at the end
				
				this.mViewCards[this.mViewCards.length - 1].push(viewCard); // add it to the array
			}
		}
	}
}

// removes a card from the pile
OogaahGraveyard.prototype.RemoveCard = function(id) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (id >= 0 && id < this.mCards.length) { // if card id is valid
		this.HandlePeasant(this.mCards[id], -1);
		this.mCards.splice(id, 1); // remove the card from the array
		
		{
			if (this.mCards.length == 1) { // if we now have more than 1 card in the graveyard
				this.mCard.mCardBacks[1].SetPosition(new Vec2(256, 208));
				this.mCard.mCardBacks[2].SetPosition(new Vec2(256, 208));
			}
		}
		
		{ // handle viewing cards
			var index = 0; // the index of the card array which held the card we removed
			for (var i = 0; i < this.mViewCards.length; ++i) { // for all card arrays in the viewing cards array
				for (var j = 0; j < this.mViewCards[i].length; ++j) { // for all cards in the card array
					if (this.mViewCards[i][j].mIndex == id) { // if the card's id matches the id we're removing
						this.mViewCards[i].splice(j, 1); // remove the card
						index = i; // store the index of the card array it belonged too
						--j; // decrement j
					}
					else if (this.mViewCards[i][j].mIndex > id) { // otherwise if the id is greater
						--this.mViewCards[i][j].mIndex; // decrement the id by 1
					}
				}
			}
			
			if (this.mViewCards[index].length == 0) { // if the card array we removed from is now empty
				this.mViewCards.splice(index, 1); // remove the card array from the viewing cards array
				// if the view index is greater than the index of the card array we removed OR
				// the view index is the same as the index of the card array we removed AND is at the end of the viewing cards array
				if (this.mViewIndex > index || (this.mViewIndex == index && this.mViewIndex == this.mViewCards.length)) { 
					this.mViewIndex--; // decrement the view index
				}
			}
			else { // otherwise not empty so we need to reposition
				// the initial position
				var pos = new Vec2(220 - ((20 * (this.mViewCards[index].length - 1)) / 2),
						259 - ((20 * (this.mViewCards[index].length - 1)) / 2));
				
				for (var i = 0; i < this.mViewCards[index].length; ++i) { // for all cards in the cards array
					// set the position of the medium and small card faces
					this.mViewCards[index][i].mCard.mCardSprites[1].SetPosition(pos);
					this.mViewCards[index][i].mCard.mCardSprites[2].SetPosition(pos);
					
					// if the card is a human peasant or an orc berserker
					if (this.mViewCards[index][i].mCard.mCardAttack == "3" || this.mViewCards[index][i].mCard.mCardAttack == "C") {
						this.mViewCards[index][i].mCard.PositionValueText();
					}
					else if (this.mViewCards[index][i].mCard.mCardAttack == "S") {
						if (this.mViewCards[index][i].mCard.mMimic != null) {
							this.mViewCards[index][i].mCard.PositionClip();
						}	
					}
					
					pos.mX += 20; pos.mY += 20; // adjust the position
				}
			}
		}
	}
}

// set up the graveyard
OogaahGraveyard.prototype.SetUp = function() {
	{
		// textures for card backs
		var texBackMedium = nmgrs.resMan.mTexStore.GetResource("cardBackMedium");
		var texBackSmall = nmgrs.resMan.mTexStore.GetResource("cardBackSmall");
		
		this.mCard.mHidden = true;
		
		// set the medium textures
		this.mCard.mCardBacks[1].SetTexture(texBackMedium);
		this.mCard.mCardBacks[1].SetPosition(new Vec2(256, 208));
		this.mCard.mCardBacks[1].SetOrigin(new Vec2(Math.round(this.mCard.mCardBacks[1].mSize.mX / 2),
				Math.round(this.mCard.mCardBacks[1].mSize.mY / 2)));
		this.mCard.mCardBacks[1].SetMask(null);
		
		// set the small textures
		this.mCard.mCardBacks[2].SetTexture(texBackSmall);
		this.mCard.mCardBacks[2].SetPosition(new Vec2(256, 208));
		this.mCard.mCardBacks[2].SetOrigin(new Vec2(Math.round(this.mCard.mCardBacks[2].mSize.mX / 2),
				Math.round(this.mCard.mCardBacks[2].mSize.mY / 2)));
		this.mCard.mCardBacks[2].SetMask(null);
		
		// set the small shape alpha and colour
		this.mCard.mCardShapes[2].mAlpha = 0.64;
		this.mCard.mCardShapes[2].mColour = "#000000";
		
		this.mCard.CreateCardShapes();
	}
	
	{
		// textures for card bundles
		var texBundleMedium = nmgrs.resMan.mTexStore.GetResource("cardBundleMedium");
		var texBundleSmall = nmgrs.resMan.mTexStore.GetResource("cardBundleSmall");
		
		// set up medium bundle sprite
		this.mBundleSprites[1].SetTexture(texBundleMedium);
		this.mBundleSprites[1].SetPosition(new Vec2(254, 206));
		this.mBundleSprites[1].SetOrigin(new Vec2(Math.round(this.mBundleSprites[1].GetSize().mX / 2),
				Math.round(this.mBundleSprites[1].GetSize().mY / 2)));
		
		// set up small bundle sprite
		this.mBundleSprites[2].SetTexture(texBundleSmall);
		this.mBundleSprites[2].SetPosition(new Vec2(254, 206));
		this.mBundleSprites[2].SetOrigin(new Vec2(Math.round(this.mBundleSprites[2].GetSize().mX / 2),
				Math.round(this.mBundleSprites[2].GetSize().mY / 2)));
	}
	
	{
		this.mViewShape.MakeRectangle(new Vec2(2, 132), new Vec2(nmain.game.mCanvasSize.mX - 4, 151));
		this.mViewShape.mDepth = -10;
		this.mViewShape.mAlpha = 0.5;
		this.mViewShape.mColour = "#000000";
		
		var arrowTex = nmgrs.resMan.mTexStore.GetResource("buttonGraveyardArrow");
		this.mViewLeftButton.SetUp(new Vec2(136, 181), new Vec2(25, 50), -51);
		this.mViewLeftButton.mSpriteIdle.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewLeftButton.mSpriteIdle.SetCurrentFrame(0);
		this.mViewLeftButton.mSpriteHover.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewLeftButton.mSpriteHover.SetCurrentFrame(2);
		this.mViewLeftButton.mSpriteDown.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewLeftButton.mSpriteDown.SetCurrentFrame(4);
		this.mViewLeftButton.mSpriteInactive.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewLeftButton.mSpriteInactive.SetCurrentFrame(6);
		
		this.mViewRightButton.SetUp(new Vec2(352, 181), new Vec2(25, 50), -51);
		this.mViewRightButton.mSpriteIdle.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewRightButton.mSpriteIdle.SetCurrentFrame(1);
		this.mViewRightButton.mSpriteHover.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewRightButton.mSpriteHover.SetCurrentFrame(3);
		this.mViewRightButton.mSpriteDown.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewRightButton.mSpriteDown.SetCurrentFrame(5);
		this.mViewRightButton.mSpriteInactive.SetTexture(arrowTex, 8, 2, -1, -1); this.mViewRightButton.mSpriteInactive.SetCurrentFrame(7);
	}
	
	this.mSelectableArrow.SetPosition(new Vec2(256, 274));
	this.mSelectableArrow.AddPoint(new Vec2(22, 27));
	this.mSelectableArrow.AddPoint(new Vec2(11, 27));
	this.mSelectableArrow.AddPoint(new Vec2(11, 38));
	this.mSelectableArrow.AddPoint(new Vec2(-11, 38));
	this.mSelectableArrow.AddPoint(new Vec2(-11, 27));
	this.mSelectableArrow.AddPoint(new Vec2(-22, 27));
	this.mSelectableArrow.mColour = "#74AA19";
	this.mSelectableArrow.mDepth = 100;
}

OogaahGraveyard.prototype.Input = function() {
	this.mViewLeftButton.Input();
	this.mViewRightButton.Input();
}

OogaahGraveyard.prototype.Process = function() {
	if (this.mView == true) {
		this.mViewLeftButton.Process(null);
		this.mViewRightButton.Process(null);
		
		if (this.mViewIndex > 0) {
			if (this.mViewLeftButton.OnClick()) {
				this.mViewIndex--;
			}
		}
		
		if (this.mViewIndex < this.mViewCards.length - 1) {
			if (this.mViewRightButton.OnClick()) {
				this.mViewIndex++;
			}
		}
		
		{
			this.mCurrentHighlight = -1; // reset the current highlighted card
			var found = false; // have we found a card that is highlighted (assume no initially)
			
			if (this.mViewCards.length > 0) {
				if (this.mViewIndex >= 0 && this.mViewIndex < this.mViewCards.length) {
					var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get the cursor position
					
					for (var i = this.mViewCards[this.mViewIndex].length - 1; i >= 0; --i) { // for all cards in the card array
						var bounds = this.mViewCards[this.mViewIndex][i].mCard.mCardSprites[2].mGlobalMask.GetBounds();
						var tl = bounds[0];
						var br = bounds[1];
						
						// if the cursor is within the bounding box
						if (util.PointInRectangle(p, tl, br) == true && found == false) {
							this.mCurrentHighlight = i; // set the current highlighted card to this card
							this.mViewCards[this.mViewIndex][i].mCard.mSize = 1; // set its size to medium
							
							found = true; // we're done searching
						}
						else {
							this.mViewCards[this.mViewIndex][i].mCard.mSize = 2; // ensure size is small
						}
					}
				}
			}
		}
	}
}

// returns graveyard render data
OogaahGraveyard.prototype.GetRenderData = function() {
	var arr = new Array();  // returned array holding the renderables
	
	if (this.mView == false) {
		if (this.mCards.length > 0) { // if there is at least 1 card in the graveyard
			if (this.mCards.length > 1) { // if there is more than 1 card in the graveyard
				arr.push(this.mBundleSprites[this.mSize]); // add the appropiately sized bundle sprite
			}
			
			arr = util.ConcatArray(arr, this.mCard.GetRenderData());
			
			if (this.mSelectable == true) {
				arr.push(this.mSelectableArrow);
			}
		}
	}
	else {
		arr.push(this.mViewShape);
		
		if (this.mViewIndex > 0) {
			arr = util.ConcatArray(arr, this.mViewLeftButton.GetRenderData());
		}
		
		if (this.mViewIndex < this.mViewCards.length - 1) {
			arr = util.ConcatArray(arr, this.mViewRightButton.GetRenderData());
		}
		
		if (this.mViewIndex >= 0 && this.mViewIndex < this.mViewCards.length) {
			var cards = this.mViewCards[this.mViewIndex];
			
			for (var i = 0; i < cards.length; ++i) {
				arr = util.ConcatArray(arr, cards[i].mCard.GetRenderData());
			}
		}
	}
	
	return arr; // return the renderables array
}

// returns true if the mouse is highlighting the graveyard
OogaahGraveyard.prototype.HandHighlighted = function() {
	var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get the cursor position
	
	var bounds = this.mCard.mCardBacks[2].mGlobalMask.GetBounds();
	var tl = bounds[0];
	var br = bounds[1];
	
	// if the cursor is within the bounding box
	if (util.PointInRectangle(p, tl, br) == true) {
		return true; // highlighting
	}
	
	return false; // not highlighting
}

// sets the graveyard highlight status
OogaahGraveyard.prototype.Highlight = function(highlight) {
	if (highlight == true) { // if we are to highlight the graveyard
		this.mSize = 1; // set the size to medium
		this.mCard.mSize = this.mSize;
	}
	else { // otherwise if we are to unhighlight
		this.mSize = 2; // set the size to small
		this.mCard.mSize = this.mSize;
	}
}

OogaahGraveyard.prototype.SetView = function(view) {
	if (view != this.mView) {
		this.mView = view;
		this.mViewIndex = 0;
	}
}

OogaahGraveyard.prototype.HandlePeasant = function(card, action) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to current scene
	
	{
		var attack = card.mCardAttack; // store the card's attack
		if (card.mCardAttack == "S") { // if the card is a being of energy
			if (card.mMimic != null) {
				attack = card.mMimic.mCardAttack;
			}
		}
		
		if (attack == "9") { // human knight
			{ // handle player's hands
				for (var i = 0; i < currScene.mPlayers.length; ++i) { // for all players
					var hand = currScene.mPlayers[i].mHand; // store reference to player's hand
					for (var j = 0; j < hand.mCards.length; ++j) { // for all cards in hand
						if (hand.mCards[j].mCardAttack == "3") { // if card is a human peasant
							hand.mCards[j].ModifyValue(action); // add 1 to value
							hand.mCards[j].PositionValueText(); // reposition
						}
					}
				}
			}
			
			{ // handle the graveyard
				for (var i = 0; i < this.mCards.length; ++i) { // for all cards in graveyard
					if (this.mCards[i].mCardAttack == "3") { // if card is a human peasant
						this.mCards[i].ModifyValue(action); // add 1 to value
						this.mCards[i].PositionValueText(); // reposition
					}
					else if (this.mCards[i].mCardAttack == "S") { // if card is a being of energy
						if (this.mCards[i].mMimic != null) { // and was played using its ability
							if (this.mCards[i].mMimic.mCardAttack == "3") { // and was played as a human peasant
								this.mCards[i].mMimic.ModifyValue(action); // add 1 to value
								this.mCards[i].PositionValueText(); // reposition
							}
						}
					}
				}
				
				for (var i = 0; i < this.mViewCards.length; ++i) {
					for (var j = 0; j < this.mViewCards[i].length; ++j) {
						if (this.mViewCards[i][j].mCard.mCardAttack == "3") { // if card is a human peasant
							this.mViewCards[i][j].mCard.ModifyValue(action); // add 1 to value
							this.mViewCards[i][j].mCard.PositionValueText(); // reposition
						}
						else if (this.mViewCards[i][j].mCard.mCardAttack == "S") { // if card is a being of energy
							if (this.mViewCards[i][j].mCard.mMimic != null) { // and was played using its ability
								if (this.mViewCards[i][j].mCard.mMimic.mCardAttack == "3") { // and was played as a human peasant
									this.mViewCards[i][j].mCard.mMimic.ModifyValue(action); // add 1 to value
									this.mViewCards[i][j].mCard.PositionValueText(); // reposition
								}
							}
						}
					}
				}
			}
		}
		else if (attack == "3") { // adding a human peasant
			if (action == 1) {
				var knights = 0;
				
				for (var i = 0; i < this.mCards.length; ++i) { // for all cards in graveyard
					if (this.mCards[i].mCardAttack == "9") { // if card is a human knight
						++knights;
					}
					else if (this.mCards[i].mCardAttack == "S") { // if card is a being of energy
						if (this.mCards[i].mMimic != null) { // and was played using its ability
							if (this.mCards[i].mMimic.mCardAttack == "9") { // and was played as a human knight
								++knights;
							}
						}
					}
				}
				
				if (card.mCardAttack == "3") { // if card is a peasant
					card.mCardValue = 3; // reset value to default
					card.ModifyValue(knights);
					card.PositionValueText();
				}
				else if (card.mCardAttack == "S") { // otherwise if card is a being of energy
					card.mMimic.mCardValue = 3; // reset value to default
					card.mMimic.ModifyValue(knights);
					card.PositionValueText();
				}
			}
		}
	}
}
// ...End


// OogaahBattlefield class
// a card pile which holds cards currently in play
function OogaahBattlefield() {
	OogaahPile.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahBattlefield.prototype = Object.create(OogaahPile.prototype);

// adds a card to the battlefield
OogaahBattlefield.prototype.AddCard = function(card) {
	var c = card.GetCopy(); // get a copy of the card
	
	c.mHidden = false;
	c.mDarken = false;
	c.mSize = 2;
	
	var pos = new Vec2(356, 188);
	
	var lrgSpr = c.mCardSprites[0];
	
	// reposition the card's medium sprite
	var medSpr = c.mCardSprites[1];
	medSpr.SetRotation(0);
	medSpr.SetOrigin(new Vec2(Math.round(medSpr.mSize.mX / 2), Math.round(medSpr.mSize.mY / 2)));
	medSpr.SetPosition(pos);
	
	// reposition the card's small sprite
	var smlSpr = c.mCardSprites[2];
	smlSpr.SetRotation(0);
	smlSpr.SetOrigin(new Vec2(Math.round(smlSpr.mSize.mX / 2), Math.round(smlSpr.mSize.mY / 2)));
	smlSpr.SetPosition(pos);
	
	if (c.mCardAttack == "3" || c.mCardAttack == "C") { // if the card is a human peasant or an orc berserker
		c.PositionValueText();
	}
	else if (c.mCardAttack == "S") {
		if (c.mMimic != null) {
			c.PositionClip();
		}
	}
	
	this.mCards.push(c); // add it to the cards array
}

// returns battlefield render data
OogaahBattlefield.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	if (this.mCards.length > 0) { // if there is at least 1 card on the battlefield
		arr = util.ConcatArray(arr, this.mCards[this.mCards.length - 1].GetRenderData()); // show the small face sprite of the top card
	}
	
	return arr; // return the renderables array
}

// ...End


// OogaahPlayer class
// 
function OogaahPlayer() {
	this.mHand = new OogaahHand(); // the hand belonging to this player
	this.mPlayerID = -1; // the id of this player (0)
	
	this.mType = "";
	this.mName = "";
	
	this.mSelectedCards = new Array(); // -1: locked; 0: invalid; 1: selectable; 2: selected; 3: single-selectable; 4: single-selected
	
	this.mMode = 0; // the current mode the game is in (used to handle card abilities)
	this.mSubMode = "a"; // the submode, used to further define stages of a certain mode
	
	this.mChosenPlayer = null; // reference to the current player's hand that has been chosen (goblin technician ability)
	this.mChosenID = -1; // the id of the chosen player
	this.mChosenCard = -1; // the current selected card id of the chosen player
	
	this.mFinished = false;
};

// 
OogaahPlayer.prototype.SetUp = function(id) {
	this.mPlayerID = id; // set the player's id
}

//
OogaahPlayer.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	arr = util.ConcatArray(arr, this.mHand.GetRenderData()); // add the player's hand to the array
	
	return arr; // return the renderables array
}

// 
OogaahPlayer.prototype.PositionHand = function() {

}

// reset the state of selected cards in the hand
OogaahPlayer.prototype.ResetSelected = function() {
	this.mSelectedCards.splice(0, this.mSelectedCards.length); // clear the current selected array
	for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
		this.mSelectedCards.push(1); // add a 1 (selectable) to the selected array
	}
}

// returns an array containing the currently selected cards in the hand
OogaahPlayer.prototype.GetSelected = function() {
	arr = new Array(); // an array of selected cards
	
	for (var i = 0; i < this.mSelectedCards.length; ++i) { // for all card's selection status
		if (this.mSelectedCards[i] == 2 || this.mSelectedCards[i] == 4) { // if the current card is selected or single-selected
			arr.push(this.mHand.GetCard(i)); // add a copy to the array
		}
	}
	
	if (arr.length > 1) { // at least 2 cards in array
		arr.sort(noogaah.CardSort); // sort the cards by value (ensure "S" is last card if it exists)
	}
	
	return arr; // return the array of selected cards
}

// removes the currently selected cards from the hand
OogaahPlayer.prototype.RemoveSelected = function() {
	for (var i = this.mSelectedCards.length - 1; i >= 0; --i) { // for all card's selection status
		if (this.mSelectedCards[i] == 2 || this.mSelectedCards[i] == 4) { // if the card is selected (2) or single-selected (4)
			this.mHand.RemoveCard(i); // remove the card from the hand
		}
	}
	
	this.PositionHand(); // reposition the hand
	this.ResetSelected(); // reset the selection state of the cards
}
// ...End


// OogaahHuman class
// logic for a human player (as opposed to an ai player)
function OogaahHuman() {
	OogaahPlayer.apply(this, null); // construct the base class
	
	this.mType = "Human";
	
	this.mPreview = false; // indication of whether preview mode is active or not (viewing large card sprite)
	
	this.mCurrentHighlight = -1; // the id of the current card highlighted (-1 if none)
	
	this.mRecentSelection = false; // was a card selected recently
	this.mRecentCoords = new Vec2(); // the coordinates of the mouse when the card was selected
	
	this.mHelpMode = false; // has help mode been enabled? (clicking on a card will show card help)
	
	this.mRecievedCount = 0; // 
	this.mRecievedCard = null;
	
	this.mGUI = new OogaahHumanUI(); // player gui
	this.mTurnHighlightSmall = new Array();
	this.mTurnHighlightMedium = new Array();
};

// inherit the base class's prototype
OogaahHuman.prototype = Object.create(OogaahPlayer.prototype);

// set up the player (id assigned to this player [integer])
OogaahHuman.prototype.SetUp = function(id) {
	this.mPlayerID = id; // set the player's id
	this.mName = "Player";
	this.ResetSelected(); // reset selected cards (initialises array)
	
	// set up the player gui
	this.mGUI.SetUp(this);
	
	// set up the tooltip element
	// var fntTT = nmgrs.resMan.mFontStore.GetResource("monaco");
	// this.mGUI.mTooltip.SetUp(new Vec2(), -10); // initiate font and size so we don't have to do it later when setting text
	// this.mGUI.mTooltip.SetText(fntTT, 16, "");
}

// process player input
OogaahHuman.prototype.Input = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.P) == true) { // if the p key is pressed
		currScene.mPaused = !currScene.mPaused; // toggle pause
		this.mGUI.SetFade(currScene.mPaused, "Paused");
		
		if (this.mPreview == true) { // if we're in preview mode
			this.mHand.mCards[this.mCurrentHighlight].mSize = 2; // display small card sprite
			this.mPreview = false; // we've left preview mode
		}
	}
	
	if (currScene.mPaused == false) { // if game is currently unpaused
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if LMB is pressed
			if (this.mHelpMode == true) { // if in help mode
				if (this.mCurrentHighlight != -1) { // if a card is currently highlighted
					currScene.mPaused = true; // pause the current game
					this.mGUI.SetFade(true, "Card Preview");
					
					this.mHand.mCards[this.mCurrentHighlight].mSize = 0; // display large card sprite
					this.mPreview = true; // we've entered preview mode
				}
				
				this.mHelpMode = false; // disable help mode
				nmgrs.inputMan.SetCursorStyle("default"); // set the cursor back to default
			}
			else {
				if (currScene.mCurrPlayer == 0) { // if this player is the current player
					if (this.mCurrentHighlight != -1) { // if a card is currently highlighted
						this.SelectedControl(); // select a card
					}
				}
			}
		}
		
		this.HandleGoblinTechnician(); // handle player input when we are in goblin tachnician mode (due to ability)
		this.HandleHumanPaladin();
		this.mGUI.Input(); // handle gui input
	}
}

// process the player state
OogaahHuman.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (currScene.mPaused == false) { // if the game isn't paused
		if (this.mPreview == false) { // if we're not in preview mode
			var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get the cursor position
			
			if (this.mRecentSelection == false) { // if we haven't recently selected a card
				this.mCurrentHighlight = -1; // reset the current highlighted card
				var found = false; // have we found a card that is highlighted (assume no initially)
				
				for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
					var bounds = this.mHand.mCards[i].mCardSprites[2].mGlobalMask.GetBounds();
					var tl = bounds[0];
					var br = bounds[1];
					
					// if the cursor is within the bounding box
					if (util.PointInRectangle(p, tl, br) == true && found == false) {
						this.mCurrentHighlight = i; // set the current highlighted card to this card
						this.mHand.mCards[i].mSize = 1; // set its size to medium
						found = true; // we're done searching
					}
					else {
						this.mHand.mCards[i].mSize = 2; // ensure size is small
					}
				}
			}
			else {
				// if either of the coordinates has changed since the selection was made
				if (p.mX != this.mRecentCoords.mX || p.mY != this.mRecentCoords.mY) {
					this.mRecentSelection = false; // recent selection no longer applies
				}
			}
			
			if (this.mFinished == true && currScene.mCurrPlayer == this.mPlayerID) {
				currScene.ChangePlayer(); // change to the next player
			}
		}
		
		this.mGUI.Process(); // process the player gui
	}
}

// render anything associated with the player
OogaahHuman.prototype.GetRenderData = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var arr = new Array(); // returned array holding the renderables
	
	arr = util.ConcatArray(arr, this.mHand.GetRenderData()); // add the player's hand to the array
	
	arr = util.ConcatArray(arr, this.mGUI.GetRenderData()); // add the player gui
	
	if (currScene.mCurrPlayer == this.mPlayerID) {
		for (var i = 0; i < this.mTurnHighlightSmall.length; ++i) {
			if (this.mHand.mCards[i].mSize != 0) {
				if (this.mCurrentHighlight == i) {
					arr.push(this.mTurnHighlightMedium[i]);
				}
				else {
					arr.push(this.mTurnHighlightSmall[i]);
				}
			}
		}
	}
	
	return arr; // return the renderables array
}

// positions the player's hand
OogaahHuman.prototype.PositionHand = function() {
	this.mHand.mCards.sort(noogaah.CardSort); // sort the cards by value
	this.mTurnHighlightSmall.splice(0, this.mTurnHighlightSmall.length);
	this.mTurnHighlightMedium.splice(0, this.mTurnHighlightMedium.length);
	
	var pos = new Vec2(60, 480); // the default posiiton (initial card position)
	
	for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
		var card = this.mHand.mCards[i]; // store a reference to the current card
		card.mHidden = false;
		
		if (this.mSelectedCards[i] == 1 || this.mSelectedCards[i] == 3) {
			card.mDarken = false;
		}
		
		card.mSize = 2;
		
		// set the large sprite position, origin and depth
		var lrgSpr = card.mCardSprites[0];
		lrgSpr.SetPosition(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 3), Math.round(nmain.game.mCanvasSize.mY / 2)));
		lrgSpr.SetOrigin(new Vec2(Math.round(lrgSpr.mSize.mX / 2), Math.round(lrgSpr.mSize.mY / 2)));
		lrgSpr.mDepth = -101;
		
		// set the medium sprite position, origin and depth
		var medSpr = card.mCardSprites[1];
		medSpr.SetPosition(pos);
		medSpr.SetOrigin(new Vec2(Math.round(medSpr.mSize.mX / 2), medSpr.mSize.mY));
		medSpr.mDepth = 0;
		medSpr.SetRotation(0);
		
		// set the small sprite position, origin and depth
		var smlSpr = card.mCardSprites[2];
		smlSpr.SetPosition(pos);
		smlSpr.SetOrigin(new Vec2(Math.round(smlSpr.mSize.mX / 2), smlSpr.mSize.mY));
		smlSpr.mDepth = 1 + i;
		smlSpr.SetRotation(0);
		
		// create the card shapes
		card.CreateCardShapes();
		
		// set depths
		card.mCardShapes[1].mDepth = 0;
		card.mCardShapes[2].mDepth = 1 + i;
		
		if (card.mCardAttack == "3" || card.mCardAttack == "C") { // if the card is a human peasant or an orc berserker
			card.PositionValueText();
		}
		
		{
			var highSmall = new Shape();
			
			highSmall.SetPosition(new Vec2(smlSpr.mPos.mX, smlSpr.mPos.mY));
			highSmall.AddPoint(new Vec2(smlSpr.mSize.mX + 6, 0));
			highSmall.AddPoint(new Vec2(smlSpr.mSize.mX + 6, smlSpr.mSize.mY + 6));
			highSmall.AddPoint(new Vec2(0, smlSpr.mSize.mY + 6));
			highSmall.SetOrigin(new Vec2(Math.round(smlSpr.mSize.mX / 2) + 3, smlSpr.mSize.mY + 3));
			
			highSmall.mColour = "#74AA19";
			highSmall.mDepth = 50;
			
			this.mTurnHighlightSmall.push(highSmall);
			
			
			var highMedium = new Shape();
			
			highMedium.SetPosition(new Vec2(medSpr.mPos.mX, medSpr.mPos.mY));
			highMedium.AddPoint(new Vec2(medSpr.mSize.mX + 6, 0));
			highMedium.AddPoint(new Vec2(medSpr.mSize.mX + 6, medSpr.mSize.mY + 6));
			highMedium.AddPoint(new Vec2(0, medSpr.mSize.mY + 6));
			highMedium.SetOrigin(new Vec2(Math.round(medSpr.mSize.mX / 2) + 3, medSpr.mSize.mY + 3));
			
			highMedium.mColour = "#74AA19";
			highMedium.mDepth = 50;
			
			this.mTurnHighlightMedium.push(highMedium);
		}
		
		pos.mX += 20; // increment the position by an x offset
	}
}

// reset the state of selected cards in the hand
OogaahHuman.prototype.ResetSelected = function() {
	this.mSelectedCards.splice(0, this.mSelectedCards.length); // clear the current selected array
	for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
		this.mSelectedCards.push(1); // add a 1 (selectable) to the selected array
		this.mHand.mCards[i].mDarken = false;
	}
	
	this.PositionHand(); // reposition the hand
	
	// reset the recent selection status
	this.mRecentSelection = false;
	this.mRecentCoords.Set(0, 0);
}

// handle card selection
OogaahHuman.prototype.SelectedControl = function() {
	// if highlighted card is selectable (1) OR single-selectable (3)
	if (this.mSelectedCards[this.mCurrentHighlight] == 1 || this.mSelectedCards[this.mCurrentHighlight] == 3) {
		// reposition card visually
		this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].SetPosition(new Vec2(
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].mPos.mX,
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].mPos.mY - 40));
		
		this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].SetPosition(new Vec2(
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].mPos.mX,
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].mPos.mY - 40));
		
		// if the card is a human peasant or an orc berserker
		if (this.mHand.mCards[this.mCurrentHighlight].mCardAttack == "3" ||
				this.mHand.mCards[this.mCurrentHighlight].mCardAttack == "C") {
			
			this.mHand.mCards[this.mCurrentHighlight].PositionValueText();
		}
		
		// reposition the highlight sprites
		this.mTurnHighlightSmall[this.mCurrentHighlight].SetPosition(new Vec2(
				this.mTurnHighlightSmall[this.mCurrentHighlight].mPos.mX,
				this.mTurnHighlightSmall[this.mCurrentHighlight].mPos.mY - 40));
		
		this.mTurnHighlightMedium[this.mCurrentHighlight].SetPosition(new Vec2(
				this.mTurnHighlightMedium[this.mCurrentHighlight].mPos.mX,
				this.mTurnHighlightMedium[this.mCurrentHighlight].mPos.mY - 40));
		
		if (this.mSelectedCards[this.mCurrentHighlight] == 1) { // if the card is selectable (1)
			this.mSelectedCards[this.mCurrentHighlight]	= 2; // highlighted card is selected (2)
			
			if (this.mHand.mCards[this.mCurrentHighlight].mCardAttack != "S") { // don't block any cards if this is an S
				for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
					if (this.mSelectedCards[i] == 1) { // if card is selectable
						// if card doesn't match this and isn't an S
						if ((this.mHand.mCards[i].mCardAttack != this.mHand.mCards[this.mCurrentHighlight].mCardAttack ||
								this.mHand.mCards[i].mCardValue != this.mHand.mCards[this.mCurrentHighlight].mCardValue) &&
								this.mHand.mCards[i].mCardAttack != "S") {
							
							this.mSelectedCards[i] = 0; // card can no longer be selected
							this.mHand.mCards[i].mDarken = true;
						}
					}
				}
			}
		}
		else { // otherwise card is single-selectable (3)
			this.mSelectedCards[this.mCurrentHighlight]	= 4; // highlighted card is single-selected (4)
			
			for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
				if (this.mSelectedCards[i] == 3) { // if card is single-selectable
					this.mSelectedCards[i] = 0; // card can no longer be selected
					this.mHand.mCards[i].mDarken = true;
				}
			}
		}
	}
	else if (this.mSelectedCards[this.mCurrentHighlight] == 2 || this.mSelectedCards[this.mCurrentHighlight] == 4) { // if highlighted card is already selected (2) OR single-selected (4)
		// reposition card visually
		this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].SetPosition(new Vec2(
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].mPos.mX,
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[2].mPos.mY + 40));
		
		this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].SetPosition(new Vec2(
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].mPos.mX,
				this.mHand.mCards[this.mCurrentHighlight].mCardSprites[1].mPos.mY + 40));
		
		if (this.mHand.mCards[this.mCurrentHighlight].mCardAttack == "3" ||
				this.mHand.mCards[this.mCurrentHighlight].mCardAttack == "C") {
			
			this.mHand.mCards[this.mCurrentHighlight].PositionValueText();
		}
		
		// reposition the highlight sprites
		this.mTurnHighlightSmall[this.mCurrentHighlight].SetPosition(new Vec2(
				this.mTurnHighlightSmall[this.mCurrentHighlight].mPos.mX,
				this.mTurnHighlightSmall[this.mCurrentHighlight].mPos.mY + 40));
		
		this.mTurnHighlightMedium[this.mCurrentHighlight].SetPosition(new Vec2(
				this.mTurnHighlightMedium[this.mCurrentHighlight].mPos.mX,
				this.mTurnHighlightMedium[this.mCurrentHighlight].mPos.mY + 40));
		
		if (this.mSelectedCards[this.mCurrentHighlight] == 2) { // if the card is selected (2)
			this.mSelectedCards[this.mCurrentHighlight]	= 1; // highlighted card is selectable (1)
			
			var allValid = false; // should we allow all cards to be selected again
			var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // currently selected cards
			if (arr.length == 1) { // if there is only one currently selected card
				if (arr[0].mCardAttack == "S") { // and it is an S
					allValid = true; // all cards are now valid
				}
			}
			else if (arr.length == 0) { // otherwise if there are no currently selected cards
				allValid = true; // all cards are now valid
			}
			
			if (allValid == true) {  // if all cards are valid
				for (var i = 0; i < this.mSelectedCards.length; ++i) { // for all cards
					if (this.mSelectedCards[i] == 0) { // if a card was previously invalid
						this.mSelectedCards[i] = 1; // make it selectable
						this.mHand.mCards[i].mDarken = false;
					}
				}
			}
		}
		else { // otherwise card is single-selected (4)
			this.mSelectedCards[this.mCurrentHighlight]	= 3; // highlighted card is single-selectable (3)
			
			for (var i = 0; i < this.mSelectedCards.length; ++i) { // for all cards
				if (this.mSelectedCards[i] == 0) { // if a card was previously invalid
					this.mSelectedCards[i] = 3; // make it single-selectable
					this.mHand.mCards[i].mDarken = false;
				}
			}
		}
	}
	
	// set the recent selection status
	this.mRecentSelection = true;
	this.mRecentCoords = new Vec2(); this.mRecentCoords.Copy(nmgrs.inputMan.GetLocalMouseCoords());
}

// logic called when the player's turn begins
OogaahHuman.prototype.OnTurnBegin = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (currScene.mOnlyPeasants == true) {
		for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
			if (this.mHand.mCards[i].mCardAttack == "3") {
				this.mSelectedCards[i] = 3;
				this.mHand.mCards[i].mDarken = false;
			}
			else {
				this.mSelectedCards[i] = -1;
				this.mHand.mCards[i].mDarken = true;
			}
		}
	}
}

// logic called when the play button is clicked in the player gui
OogaahHuman.prototype.OnPlay = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (this.mMode == 5 && this.mSubMode == "b") { // if we are in goblin technician mode (submode b)
		for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards
			this.mSelectedCards[i] = 3; // set cards to single-selectable (3)
			this.mHand.mCards[i].mDarken = false;
		}
		
		this.mGUI.mDisplayCard = null;
		
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Swap Card");
		this.mGUI.ShowMessage(true, "Choose which card to swap or pass.");
		
		this.mSubMode = "c"; // change to submode c
	}
	else if (this.mMode == 6) { // otherwise if we are in orc shaman mode
		currScene.mReversed = !currScene.mReversed; // reverse the current game values
		
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(3, this.mName + " reversed card values for this skirmish."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else { // otherwise we are in normal play
		var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
		if (arr.length > 0) { // if we have selected at least 1 card
			arr[0].Play(arr); // play that/those cards
			currScene.mDelay = 1000;
		}
	}
	
	if (this.mHand.mCards.length == 0 && this.mMode == 0 && this.mFinished == false) {
		if (currScene.mFinishedCount == 0) {
			currScene.mLog.AddEntry(7, this.mName + " achieved a flawless victory (1st)!"); // add entry to the play log
		}
		else if (currScene.mFinishedCount == 1) {
			currScene.mLog.AddEntry(8, this.mName + " won a costly battle (2nd)!"); // add entry to the play log
		}
		else if (currScene.mFinishedCount == 2) {
			currScene.mLog.AddEntry(9, this.mName + " yielded and limped home (3rd)!"); // add entry to the play log
		}
		
		++currScene.mFinishedCount;
		this.mFinished = true;
	}
}

// logic called when the pass button is clicked in the player gui
OogaahHuman.prototype.OnPass = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (this.mMode == 2) { // if we are in goblin overseer mode
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(4, this.mName + " chose not to play any Goblin Hordes."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 5) { // otherwise if we are in goblin technician mode
		if (this.mSubMode == "a") { // if we are in submode a
			for (var i = 0; i < 4; ++i) { // for all other players
				if (i != this.mPlayerID) {
					currScene.mPlayers[i].mSelectable = false; // set hand selection to false
				}
			}
			
			currScene.mGraveyard.mSelectable = false; // set graveyard selection to false
			
			this.mGUI.mButtons[0].mActive = true;
			this.mGUI.mButtonCovers[0].mActive = true;
			this.mGUI.ShowMessage(false);
			
			currScene.mLog.AddEntry(4, this.mName + " chose not to swap a card."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
			currScene.mDelay = 1000;
		}
		else if (this.mSubMode == "b") { // otherwise if we are in submode b
			// update player gui text
			this.mGUI.mButtonText[0].SetString("Play");
			this.mGUI.ShowMessage(false);
			
			// add entry to the play log
			currScene.mLog.AddEntry(4, this.mName + " chose not to swap for a " +
					this.mChosenPlayer.mCards[this.mChosenCard].mCardType + " " +
					this.mChosenPlayer.mCards[this.mChosenCard].mCardName  + ".");
			
			this.mMode = 0; // reset to mode 0
			this.mSubMode = "a"; // reset to submode a
			
			// reset goblin technician selection choices
			this.mGUI.mDisplayCard = null;
			this.mChosenPlayer = null;
			this.mChosenID = -1;
			this.mChosenCard = -1;
			
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
			currScene.mDelay = 1000;
		}
		else if (this.mSubMode == "c") { // otherwise if we are in submode c
			this.mGUI.mButtonText[0].SetString("Play");
			this.mGUI.ShowMessage(false);
			
			currScene.mLog.AddEntry(4, this.mName + " cancelled the card swap."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.mSubMode = "a"; // reset to submode a
			
			// reset goblin technician selection choices
			this.mChosenPlayer = null;
			this.mChosenID = -1;
			this.mChosenCard = -1;
			
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
			currScene.mDelay = 1000;
		}
	}
	else if (this.mMode == 6) { // otherwise if we are in orc shaman mode
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(4, this.mName + " chose not to reverse card values for this skirmish."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 8) { // otherwise if we are in human mage mode
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(4, this.mName + " chose not to play a card alongside Human Mage."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 12) { // otherwise if we are in human paladin mode
		if (this.mRecievedCount == 0) {
			currScene.mLog.AddEntry(4, this.mName + " chose not to take any cards from the graveyard."); // add entry to the play log
		}
		else {
			currScene.mLog.AddEntry(3, this.mName + " took " + this.mRecievedCount + "x " +
					this.mRecievedCard.mCardType + " " + this.mRecievedCard.mCardName + " from the graveyard.");
			
			currScene.mGraveyard.mViewLeftButton.mActive = true;
			currScene.mGraveyard.mViewRightButton.mActive = true;
		}
		
		currScene.mGraveyard.SetView(false);
		
		this.mGUI.mButtons[0].mActive = true;
		this.mGUI.mButtonCovers[0].mActive = true;
		this.mGUI.ShowMessage(false);
		
		this.mRecievedCount = 0;
		this.mRecievedCard = null;
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else { // otherwise we are in normal play
		currScene.mLog.AddEntry(2, this.mName + " passed."); // add entry to the play log
		
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
}

// logic called when the help button is clicked in the player gui
OogaahHuman.prototype.OnHelp = function() {
	this.mHelpMode = true; // enable help mode
	nmgrs.inputMan.SetCursorStyle("help"); // change the cursor
}

// logic called when the options button is clicked in the player gui
OogaahHuman.prototype.OnOptions = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	currScene.mPersist = true; // set this scene to persistent
	nmgrs.sceneMan.RequestSceneChange(new OogaahOptionsScene()); // request a scene change to the options scene
}

// logic to handle user input when relating to goblin technician's ability
OogaahHuman.prototype.HandleGoblinTechnician = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (this.mMode == 5) { // if we are in goblin technician mode
		if (this.mSubMode == "a") { // if we are in submode a
			this.mChosenPlayer = null; // reset chosen player to null
			var found = false; // selected player hand not found
			var player = null; // selected player is null
			
			for (var i = 0; i < 4; ++i) { // for all other players
				if (i != this.mPlayerID) {
					var p = currScene.mPlayers[i]; // store a reference to the player
					var hand = p.mHand; // store a reference to the player's hand
					
					p.Highlight(false); // player isn't highlighted
					
					if (found == false) { // if we haven't yet found a player hand
						if (p.HandHighlighted() == true) { // if we are hovering over the current player's hand
							player = currScene.mPlayers[i]; // store the reference to that player
							this.mChosenPlayer = hand; // store a reference to that player's hand
							this.mChosenID = i; // store that players id
							
							found = true; // indicate we have found a player
							p.Highlight(true); // highlight the current player's hand
						}
					}
				}
			}
			
			if (this.mChosenPlayer == null) { // if we didn't find a player previously
				player = currScene.mGraveyard; // store a reference to the graveyard
				
				player.Highlight(false); // graveyard isn't highlighted
				if (currScene.mGraveyard.HandHighlighted() == true) { // if we are hovering over the current graveyard
					this.mChosenPlayer = currScene.mGraveyard; // store a reference to the graveyard
					this.mChosenID = -1; // store the graveyards id (-1)
					
					player.Highlight(true); // highlight the graveyard
				}
			}
			
			if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if left mouse button is clicked
				if (this.mChosenPlayer != null) { // if we have found a player (inc. the graveyard)
					if (this.mChosenPlayer.mCards.length > 0) { // if the player has at least 1 card
						// select a random card from the chosen player's hand
						this.mChosenCard = currScene.mRand.GetRandInt(0, this.mChosenPlayer.mCards.length - 1);
						
						{
							this.mGUI.mDisplayCard = this.mChosenPlayer.mCards[this.mChosenCard].GetCopy();
							this.mGUI.mDisplayCard.mHidden = false;
							this.mGUI.mDisplayCard.mDarken = false;
							this.mGUI.mDisplayCard.mSize = 1;
							this.mGUI.mDisplayCard.mCardSprites[1].SetOrigin(new Vec2());
							this.mGUI.mDisplayCard.mCardSprites[1].SetPosition(new Vec2(246, 121));
							this.mGUI.mDisplayCard.mCardSprites[1].SetRotation(0);
							this.mGUI.mDisplayCard.mCardSprites[1].mDepth = -10;
							
							// if the card is a human peasant or an orc berserker
							if (this.mGUI.mDisplayCard.mCardAttack == "3" || this.mGUI.mDisplayCard.mCardAttack == "C") {
								this.mGUI.mDisplayCard.PositionValueText();
							}
						}
						
						player.Highlight(false); // unhighlight the chosen player
						for (var i = 0; i < 4; ++i) { // for all other players
							if (i != this.mPlayerID) {
								currScene.mPlayers[i].mSelectable = false; // player can't be selected
							}
						}
						
						currScene.mGraveyard.mSelectable = false; // graveyard can't be selected
						
						// update player gui text
						this.mGUI.mButtons[0].mActive = true;
						this.mGUI.mButtonCovers[0].mActive = true;
						this.mGUI.mButtonText[0].SetString("Accept");
						this.mGUI.ShowMessage(true, "Choose to accept " + this.mChosenPlayer.mCards[this.mChosenCard].mCardType +
								" " + this.mChosenPlayer.mCards[this.mChosenCard].mCardName + " or pass.");
						
						this.mSubMode = "b"; // enter submode b
					}
				}
			}
			else { // otherwise if no mouse button was pressed
				this.mChosenPlayer = null; // reset the selected player to null
			}
		}
	}
}

// logic to handle user input when relating to human paladin's ability
OogaahHuman.prototype.HandleHumanPaladin = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var graveyard = currScene.mGraveyard;
	
	if (this.mMode == 12) { // if we are in human paladin mode
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if left mouse button is clicked
			if (graveyard.mCurrentHighlight != -1) {
				var viewCard = graveyard.mViewCards[graveyard.mViewIndex][graveyard.mCurrentHighlight];
				
				var done = false;
				if (graveyard.mViewCards[graveyard.mViewIndex].length == 1) {
					done = true;
				}
				
				if (this.mRecievedCount == 0) {
					graveyard.mViewLeftButton.mActive = false;
					graveyard.mViewRightButton.mActive = false;
					
					if (viewCard.mCard.mCardAttack == "9") {
						currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activated.");
					}
					else if (viewCard.mCard.mCardAttack == "S") {
						if (viewCard.mCard.mMimic != null) { // if being of light was played using its ability
							if (viewCard.mCard.mMimic.mCardAttack == "9") { // if the card was played as a knight
								currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activated.");
							}
							
							viewCard.mCard.mMimic = null;
						}
					}
				}
				
				{
					var card = viewCard.mCard.GetCopy();
					if (card.mMimic != null) {
						card.mMimic = null;
					}
					
					card.mDarken = true;
					this.mHand.AddCard(card);
					++this.mRecievedCount;
					
					this.mRecievedCard = card;
				}
				
				graveyard.RemoveCard(viewCard.mIndex);
				
				this.PositionHand();
				
				if (done == true) {
					if (this.mRecievedCount > 0) {
						currScene.mLog.AddEntry(3, this.mName + " took " + this.mRecievedCount + "x " +
								this.mRecievedCard.mCardType + " " + this.mRecievedCard.mCardName + " from the graveyard.");
						this.mRecievedCount = 0;
						this.mRecievedCard = null;
					}
					
					currScene.mGraveyard.SetView(false);
					graveyard.mViewLeftButton.mActive = true;
					graveyard.mViewRightButton.mActive = true;
					
					this.mGUI.mButtons[0].mActive = true;
					this.mGUI.mButtonCovers[0].mActive = true;
					this.mGUI.ShowMessage(false);
					
					this.mMode = 0; // reset to mode 0
					this.ResetSelected(); // reset selected states
					currScene.ChangePlayer(); // change to the next player
				}
			}
		}
	}
}
// ...End


// OogaahHumanUI class
// 
function OogaahHumanUI() {
	this.mHuman = null; // reference to the human that this ui belongs to
	
	this.mFade = false;
	this.mFadeShape = new Shape();
	this.mFadeText = new Text();
	
	this.mShowMessage = false;
	this.mMessageShape = new Shape();
	this.mMessageText = new Text();
	
	this.mButtons = new Array(); // main buttons
	this.mButtons[0] = new GUIButton(); // play
	this.mButtons[1] = new GUIButton(); // pass
	this.mButtons[2] = new GUIButton(); // help
	this.mButtons[3] = new GUIButton(); // options
	
	this.mButtonCovers = new Array(); // additional button graphics
	this.mButtonCovers[0] = new GUIButton();
	this.mButtonCovers[1] = new GUIButton();
	this.mButtonCovers[2] = new GUIButton();
	this.mButtonCovers[3] = new GUIButton();
	
	this.mButtonText = new Array(); // button text
	this.mButtonText[0] = new Text();
	this.mButtonText[1] = new Text();
	this.mButtonText[2] = new Text();
	this.mButtonText[3] = new Text();
	
	this.mDisplayShape = new Shape();
	this.mDisplayCard = null;
	
	// this.mButtonHoverID = -1; // the current gui element being hovered over (that has a tooltip associated with it)
	// this.mTooltip = new GUITooltip(); // the tooltip gui element shown when hovering over certain gui elements
};

// initialise the gui (owner [OogaahHuman])
OogaahHumanUI.prototype.SetUp = function(owner) {
	this.mHuman = owner; // store the reference to the human this gui belongs to
	
	{
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		
		this.mFadeShape.SetPosition(new Vec2(0, 0));
		this.mFadeShape.AddPoint(new Vec2(nmain.game.mCanvasSize.mX, 0));
		this.mFadeShape.AddPoint(nmain.game.mCanvasSize);
		this.mFadeShape.AddPoint(new Vec2(0, nmain.game.mCanvasSize.mY));
		this.mFadeShape.mAbsolute = true;
		this.mFadeShape.mDepth = -100;
		this.mFadeShape.mColour = "#000000";
		this.mFadeShape.mAlpha = 0.75;
		
		this.mFadeText.SetFont(fnt);
		this.mFadeText.SetFontSize(26);
		this.mFadeText.SetPosition(new Vec2(nmain.game.mCanvasSize.mX / 2, 40));
		this.mFadeText.mAbsolute = true;
		this.mFadeText.mDepth = -101;
		this.mFadeText.mColour = "#FFFFFF";
		this.mFadeText.mAlign = "centre";
		this.mFadeText.SetString("");
	}
	
	{
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		
		this.mMessageShape.MakeRectangle(new Vec2(2, 60), new Vec2(nmain.game.mCanvasSize.mX - 4, + 36));
		this.mMessageShape.mDepth = -10;
		this.mMessageShape.mAlpha = 0.5;
		this.mMessageShape.mColour = "#000000";
		
		this.mMessageText.SetFont(fnt);
		this.mMessageText.SetFontSize(13);
		this.mMessageText.SetPosition(new Vec2(nmain.game.mCanvasSize.mX / 2, 69));
		this.mMessageText.mAbsolute = true;
		this.mMessageText.mDepth = -11;
		this.mMessageText.mColour = "#FFFFFF";
		this.mMessageText.mAlign = "centre";
		this.mMessageText.SetString("");
	}
	
	{
		// textures for ui buttons and font for button text
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		var texLarge = nmgrs.resMan.mTexStore.GetResource("buttonLarge");
		var texSmall = nmgrs.resMan.mTexStore.GetResource("buttonSmall");
		
		{ // play button
			var pos = new Vec2(506, 412); // button position
			
			// set up the button and assign textures to sprites
			this.mButtons[0].SetUp(pos, new Vec2(109, 29), 0);
			this.mButtons[0].mSpriteIdle.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[0].mSpriteIdle.SetCurrentFrame(0);
			this.mButtons[0].mSpriteHover.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[0].mSpriteHover.SetCurrentFrame(2);
			this.mButtons[0].mSpriteDown.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[0].mSpriteDown.SetCurrentFrame(4);
			this.mButtons[0].mSpriteInactive.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[0].mSpriteInactive.SetCurrentFrame(6);
			
			// set up the button text
			this.mButtonText[0].SetFont(fnt);
			this.mButtonText[0].SetFontSize(19);
			this.mButtonText[0].SetPosition(new Vec2(pos.mX + 54, pos.mY));
			this.mButtonText[0].mAbsolute = true;
			this.mButtonText[0].mDepth = 0;
			this.mButtonText[0].mColour = "#FFFFFF";
			this.mButtonText[0].mAlign = "centre";
			this.mButtonText[0].SetString("Play");
			
			this.mButtonText[0].mShadow = true;
			this.mButtonText[0].mShadowColour = "#090B0D";
			this.mButtonText[0].mShadowAlpha = 0.5;
			this.mButtonText[0].mShadowBlur = 2;
			this.mButtonText[0].mShadowOffset.Set(2, 2);
			
			// set up the button front image (cover)
			this.mButtonCovers[0].SetUp(pos, new Vec2(109, 29), 0);
			this.mButtonCovers[0].mSpriteIdle.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[0].mSpriteIdle.SetCurrentFrame(1);
			this.mButtonCovers[0].mSpriteHover.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[0].mSpriteHover.SetCurrentFrame(3);
			this.mButtonCovers[0].mSpriteDown.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[0].mSpriteDown.SetCurrentFrame(5);
			this.mButtonCovers[0].mSpriteInactive.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[0].mSpriteInactive.SetCurrentFrame(7);
		}
		
		{ // pass button
			var pos = new Vec2(506, 447);
			this.mButtons[1].SetUp(pos, new Vec2(109, 29), 0);
			this.mButtons[1].mSpriteIdle.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[1].mSpriteIdle.SetCurrentFrame(0);
			this.mButtons[1].mSpriteHover.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[1].mSpriteHover.SetCurrentFrame(2);
			this.mButtons[1].mSpriteDown.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[1].mSpriteDown.SetCurrentFrame(4);
			this.mButtons[1].mSpriteInactive.SetTexture(texLarge, 8, 2, -1, -1); this.mButtons[1].mSpriteInactive.SetCurrentFrame(6);
			
			this.mButtonText[1].SetFont(fnt);
			this.mButtonText[1].SetFontSize(19);
			this.mButtonText[1].SetPosition(new Vec2(pos.mX + 54, pos.mY));
			this.mButtonText[1].mAbsolute = true;
			this.mButtonText[1].mDepth = 0;
			this.mButtonText[1].mColour = "#FFFFFF";
			this.mButtonText[1].mAlign = "centre";
			this.mButtonText[1].SetString("Pass");
			
			this.mButtonText[1].mShadow = true;
			this.mButtonText[1].mShadowColour = "#090B0D";
			this.mButtonText[1].mShadowAlpha = 0.5;
			this.mButtonText[1].mShadowBlur = 2;
			this.mButtonText[1].mShadowOffset.Set(2, 2);
			
			this.mButtonCovers[1].SetUp(pos, new Vec2(109, 29), 0);
			this.mButtonCovers[1].mSpriteIdle.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[1].mSpriteIdle.SetCurrentFrame(1);
			this.mButtonCovers[1].mSpriteHover.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[1].mSpriteHover.SetCurrentFrame(3);
			this.mButtonCovers[1].mSpriteDown.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[1].mSpriteDown.SetCurrentFrame(5);
			this.mButtonCovers[1].mSpriteInactive.SetTexture(texLarge, 8, 2, -1, -1); this.mButtonCovers[1].mSpriteInactive.SetCurrentFrame(7);
		}
		
		{ // help button
			var pos = new Vec2(506, 377);
			this.mButtons[2].SetUp(pos, new Vec2(29, 29), 0);
			this.mButtons[2].mSpriteIdle.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[2].mSpriteIdle.SetCurrentFrame(0);
			this.mButtons[2].mSpriteHover.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[2].mSpriteHover.SetCurrentFrame(2);
			this.mButtons[2].mSpriteDown.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[2].mSpriteDown.SetCurrentFrame(4);
			this.mButtons[2].mSpriteInactive.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[2].mSpriteInactive.SetCurrentFrame(6);
			
			this.mButtonText[2].SetFont(fnt);
			this.mButtonText[2].SetFontSize(19);
			this.mButtonText[2].SetPosition(new Vec2(pos.mX + 14, pos.mY + 1));
			this.mButtonText[2].mAbsolute = true;
			this.mButtonText[2].mDepth = 0;
			this.mButtonText[2].mColour = "#FFFFFF";
			this.mButtonText[2].mAlign = "centre";
			this.mButtonText[2].SetString("?");
			
			this.mButtonText[2].mShadow = true;
			this.mButtonText[2].mShadowColour = "#694343";
			this.mButtonText[2].mShadowAlpha = 0.5;
			this.mButtonText[2].mShadowBlur = 2;
			this.mButtonText[2].mShadowOffset.Set(2, 2);
		}
		
		{ // options button
			var pos = new Vec2(540, 377);
			this.mButtons[3].SetUp(pos, new Vec2(29, 29), 0);
			this.mButtons[3].mSpriteIdle.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[3].mSpriteIdle.SetCurrentFrame(0);
			this.mButtons[3].mSpriteHover.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[3].mSpriteHover.SetCurrentFrame(2);
			this.mButtons[3].mSpriteDown.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[3].mSpriteDown.SetCurrentFrame(4);
			this.mButtons[3].mSpriteInactive.SetTexture(texSmall, 4, 1, -1, -1); this.mButtons[3].mSpriteInactive.SetCurrentFrame(6);
			
			this.mButtonText[3].SetFont(fnt);
			this.mButtonText[3].SetFontSize(19);
			this.mButtonText[3].SetPosition(new Vec2(pos.mX + 14, pos.mY + 2));
			this.mButtonText[3].mAbsolute = true;
			this.mButtonText[3].mDepth = 0;
			this.mButtonText[3].mColour = "#FFFFFF";
			this.mButtonText[3].mAlign = "centre";
			this.mButtonText[3].SetString("O");
			
			this.mButtonText[3].mShadow = true;
			this.mButtonText[3].mShadowColour = "#694343";
			this.mButtonText[3].mShadowAlpha = 0.5;
			this.mButtonText[3].mShadowBlur = 2;
			this.mButtonText[3].mShadowOffset.Set(2, 2);
		}
	}
	
	{
		this.mDisplayShape.MakeRectangle(new Vec2(2, 132), new Vec2(nmain.game.mCanvasSize.mX - 4, 151));
		this.mDisplayShape.mDepth = -10;
		this.mDisplayShape.mAlpha = 0.5;
		this.mDisplayShape.mColour = "#000000";
	}
}

// user interaction
OogaahHumanUI.prototype.Input = function() {
	// this.mTooltip.Input(); // process the tooltip
	
	for (var i = 0; i < this.mButtons.length; ++i) { // for all buttons
		// process button user input interaction
		this.mButtons[i].Input();
		this.mButtonCovers[i].Input();
	}
}

OogaahHumanUI.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	// this.mTooltip.Process(); // process the tooltip
	// var ttHover = -1; // current gui element (with tooltip) being hovered over
	
	if (currScene.mCurrPlayer != this.mHuman.mPlayerID || this.mHuman.mFinished == true) {
		if (this.mButtons[0].mActive == true) {
			this.mButtons[0].mActive = false;
			this.mButtons[1].mActive = false;
			
			this.mButtonCovers[0].mActive = false;
			this.mButtonCovers[1].mActive = false;
		}
		
		// if not all done and finish button not enabled
		// enable finish button
		// otherwise if all done and go next button not enabled
		// enable go next button
		// disable finish button
	}
	else if (this.mHuman.mMode == 0) {
		if (this.mButtons[0].mActive == false) {
			this.mButtons[0].mActive = true;
			this.mButtons[1].mActive = true;
			
			this.mButtonCovers[0].mActive = true;
			this.mButtonCovers[1].mActive = true;
		}
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) { // for all buttons
		// process button logic
		this.mButtons[i].Process();
		this.mButtonCovers[i].Process();
		
		// update button text colour depending on button state
		if (this.mButtons[i].mActive == false) {
			this.mButtonText[i].mColour = "#888888";
			this.mButtonText[i].mShadow = false;
		}
		else {
			if (this.mButtons[i].mStatus == "idle") {
				this.mButtonText[i].mColour = "#DDDDDD";
			}
			else if (this.mButtons[i].mStatus == "hover") {
				this.mButtonText[i].mColour = "#FFFFFF";
			}
			else if (this.mButtons[i].mStatus == "down") {
				this.mButtonText[i].mColour = "#AAAAAA";
			}
		}
		
		// if this button is being hovered and no other gui element is being hovered
		// if (this.mButtons[i].mHover == true && ttHover == -1) {
		// 	ttHover = i; // indicate this element is
		// }
	}
	
	/* if (ttHover >= 0) { // if there is an element being hovered over
		if (this.mButtonHoverID != ttHover) { // if it is not the same as the current hovered element
			this.mButtonHoverID = ttHover; // set the current hovered element
			this.mTooltip.StartTimeout(1500); // set the timeout on the tooltip
			
			if (ttHover == 0) { // if the element id is 0 (button 1)
				this.mTooltip.SetText(null, null, "Button 1 - usually affirmative (Play, Yes, etc.).");
			}
			else if (ttHover == 1) { // (button 2)
				this.mTooltip.SetText(null, null, "Button 2 - usually negative (Pass, No, etc.).");
			}
			else if (ttHover == 2) { // (help button)
				this.mTooltip.SetText(null, null, "Select a card from your hand to view it full-size.");
			}
			else if (ttHover == 3) { // (options button)
				this.mTooltip.SetText(null, null, "Go to the options menu.");
			}
		}
		
		// adjust the position of the tooltip, fixing it if it goes outside the canvas borders
		this.mTooltip.SetPosition(new Vec2(nmgrs.inputMan.GetLocalMouseCoords().mX + 10,
				(nmgrs.inputMan.GetLocalMouseCoords().mY - this.mTooltip.mTooltipText.GetHeight()) + 3));
		this.mTooltip.FixPosition(new Vec2(0, 0), nmain.game.mCanvasSize);
	}
	else {
		this.mButtonHoverID = ttHover; // reset the stored element id
	} */
	
	if (this.mButtons[0].OnClick() == true) { // if play button clicked
		this.mHuman.OnPlay(); // call on play logic
	}
	else if (this.mButtons[1].OnClick() == true) { // otherwise if pass button clicked
		this.mHuman.OnPass();
	}
	else if (this.mButtons[2].OnClick() == true) { // otherwise if help button clicked
		this.mHuman.OnHelp();
	}
	else if (this.mButtons[3].OnClick() == true) { // otherwise if options button clicked
		this.mHuman.OnOptions();
	}
}

// returns array containing gui render data
OogaahHumanUI.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	if (this.mFade == true) {
		arr.push(this.mFadeShape);
		arr.push(this.mFadeText);
	}
	
	if (this.mShowMessage == true) {
		arr.push(this.mMessageShape);
		arr.push(this.mMessageText);
	}
	
	for (var i = 0; i < this.mButtons.length; ++i) { // for all buttons
		arr = util.ConcatArray(arr, this.mButtons[i].GetRenderData()); // add the button base
		arr.push(this.mButtonText[i]); // add the button text
		arr = util.ConcatArray(arr, this.mButtonCovers[i].GetRenderData()); // add the button cover
	}
	
	if (this.mDisplayCard != null) {
		arr.push(this.mDisplayShape);
		arr = util.ConcatArray(arr, this.mDisplayCard.GetRenderData());
	}
	
	/* if (this.mButtonHoverID >= 0) { // if there is an element being hovered over
		arr = util.ConcatArray(arr, this.mTooltip.GetRenderData()); // add the tooltip
	} */
	
	return arr; // return the renderables array
}

//
OogaahHumanUI.prototype.SetFade = function(fade, string) {
	if (fade == true) {
		if (string != null) {
			this.mFadeText.SetString(string);
		}
		
		this.mFade = true;
	}
	else {
		this.mFade = false;
	}
}

//
OogaahHumanUI.prototype.ShowMessage = function(show, string) {
	if (show == true) {
		if (string != null) {
			this.mMessageText.SetString(string);
		}
		
		this.mShowMessage = true;
	}
	else {
		this.mShowMessage = false;
	}
}
//...End


// OogaahAI Class...
// 
function OogaahAI() {
	OogaahPlayer.apply(this, null); // construct the base class
	
	this.mType = "AI";
	
	this.mBehaviourStore = new OogaahBehaviourStore();
	
	this.mSelectable = false;
	this.mSelectableArrow = new Shape();
	
	this.mTurnHighlight = new Array();
};

// inherit the base class's prototype
OogaahAI.prototype = Object.create(OogaahPlayer.prototype);

// 
OogaahAI.prototype.SetUp = function(id) {
	this.mPlayerID = id; // set the player's id
	this.mName = "CPU " + id;
	this.ResetSelected(); // reset selected cards (initialises array)
	
	this.mSelectableArrow.SetPosition(new Vec2(100 + (210 * (this.mPlayerID - 1)), 50));
	this.mSelectableArrow.AddPoint(new Vec2(22, 27));
	this.mSelectableArrow.AddPoint(new Vec2(11, 27));
	this.mSelectableArrow.AddPoint(new Vec2(11, 38));
	this.mSelectableArrow.AddPoint(new Vec2(-11, 38));
	this.mSelectableArrow.AddPoint(new Vec2(-11, 27));
	this.mSelectableArrow.AddPoint(new Vec2(-22, 27));
	this.mSelectableArrow.mColour = "#74AA19";
	this.mSelectableArrow.mDepth = 100;
}

OogaahAI.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (this.mMode == 2) {
		var hordes = this.mBehaviourStore.DecideMode2(); // decide if we want to play any goblin hordes
		
		if (hordes == null) { // if no hordes are played
			hordes = new Array(); // set hordes to a blank array
		}
		
		if (hordes.length > 0) {
			for (var i = 0; i < hordes.length; ++i) {
				this.mSelectedCards[hordes[i]] = 2;
			}
			
			var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
			if (arr.length > 0) { // if we have selected at least 1 card
				arr[0].Play(arr); // play that/those cards
			}
		}
		else {
			currScene.mLog.AddEntry(4, this.mName + " chose not to play any Goblin Hordes."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer();
		}
		
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 5) {
		var wannaPlay = false;
		
		wannaPlay = this.mBehaviourStore.DecideMode5(); // decide if we wanna swap at all
		
		if (wannaPlay == true) {
			this.mSubMode = "b";
			wannaPlay = false;
			
			var target = this.mBehaviourStore.DecideMode5(); // pick the target we want to swap with (if at all)
			if (target != null) {
				if (target == -1) {
					this.mChosenPlayer = currScene.mGraveyard; // store a reference to the graveyard
				}
				else {
					this.mChosenPlayer = currScene.mPlayers[target].mHand;
				}
				
				this.mChosenID = target; // store the chosen player's id
				this.mChosenCard = currScene.mRand.GetRandInt(0, this.mChosenPlayer.mCards.length - 1);
				
				wannaPlay = true;
			}
			
			if (wannaPlay == true) {
				this.mSubMode = "c";
				wannaPlay = false;
				
				var cardID = this.mBehaviourStore.DecideMode5(); // decide if we want the chosen card
				if (cardID != null) {
					wannaPlay = true;
				}
				
				if (wannaPlay == true) {
					this.mSelectedCards[cardID] = 2;
					
					var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
					if (arr.length > 0) { // if we have selected at least 1 card
						arr[0].Play(arr); // play that/those cards
					}
				}
				else {
					// add entry to the play log
					currScene.mLog.AddEntry(4, this.mName + " chose not to swap for a " +
							this.mChosenPlayer.mCards[this.mChosenCard].mCardType + " " +
							this.mChosenPlayer.mCards[this.mChosenCard].mCardName  + ".");
					
					this.mMode = 0; // reset to mode 0
					this.mSubMode = "a"; // reset to submode a
					this.ResetSelected(); // reset selected states
					currScene.ChangePlayer();
				}
			}
			else {
				currScene.mLog.AddEntry(4, this.mName + " cancelled the card swap."); // add entry to the play log
				
				this.mMode = 0; // reset to mode 0
				this.mSubMode = "a"; // reset to submode a
				this.ResetSelected(); // reset selected states
				currScene.ChangePlayer(); // change to the next player
			}
		}
		else {
			currScene.mLog.AddEntry(4, this.mName + " chose not to swap a card."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer();
		}
		
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 6) {
		var wannaReverse = this.mBehaviourStore.DecideMode6(); // 
		
		if (wannaReverse == true) {
			currScene.mReversed = !currScene.mReversed; // reverse the current game values
			
			currScene.mLog.AddEntry(3, this.mName + " reversed card values for this skirmish."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
		}
		else {
			currScene.mLog.AddEntry(4, this.mName + " chose not to reverse card values for this skirmish."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
		}
		
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 8) {
		var cardID = this.mBehaviourStore.DecideMode8(); // 
		
		if (cardID >= 0) {
			this.mSelectedCards[cardID] = 2;
			
			var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
			if (arr.length > 0) { // if we have selected at least 1 card
				arr[0].Play(arr); // play that/those cards
			}
		}
		else {
			currScene.mLog.AddEntry(4, this.mName + " chose not to play a card alongside Human Mage."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
		}
		
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 12) {
		var recieved = this.mBehaviourStore.DecideMode12(); // 
		
		if (recieved == null) {
			recieved = new Array();
		}
		
		if (recieved.length > 0) {
			var card = currScene.mGraveyard.GetCard(recieved[0]);

			{ // if taken card was human knight
				if (card.mCardAttack == "9") {
					currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activated.");
				}
				else if (card.mCardAttack == "S") {
					if (card.mMimic != null) { // if being of light was played using its ability
						if (card.mMimic.mCardAttack == "9") { // if the card was played as a knight
							currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activated.");
						}
						
						card.mMimic = null;
					}
				}
			}
			
			for (var i = recieved.length - 1; i >= 0; --i) {
				var c = currScene.mGraveyard.GetCard(recieved[i]);
				this.mHand.AddCard(c);
				currScene.mGraveyard.RemoveCard(recieved[i]);
			}
			
			this.PositionHand();
			
			currScene.mLog.AddEntry(3, this.mName + " took " + recieved.length + "x " + card.mCardType + " " + card.mCardName + " from the graveyard.");
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
		}
		else {
			currScene.mLog.AddEntry(4, this.mName + " chose not to take any cards from the graveyard."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
		}
		
		currScene.mDelay = 1000;
	}
	else {
		if (this.mFinished == false) {
			var play = this.mBehaviourStore.DecideMode0(); //
			if (play == null) {
				play = new Array();
			}
			
			if (play.length > 0) {
				for (var i = 0; i < play.length; ++i) {
					this.mSelectedCards[play[i]] = 2;
				}
				
				var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
				if (arr.length > 0) { // if we have selected at least 1 card
					arr[0].Play(arr); // play that/those cards
					currScene.mDelay = 1000;
				}
			}
			else {
				currScene.mLog.AddEntry(2, this.mName + " passed.");
				currScene.ChangePlayer();
				currScene.mDelay = 1000;
			}
		}
		else {
			currScene.ChangePlayer();
		}
	}
	
	if (this.mHand.mCards.length == 0 && this.mMode == 0 && this.mFinished == false) {
		if (currScene.mFinishedCount == 0) {
			currScene.mLog.AddEntry(7, this.mName + " achieved a flawless victory (1st)!"); // add entry to the play log
		}
		else if (currScene.mFinishedCount == 1) {
			currScene.mLog.AddEntry(8, this.mName + " won a costly battle (2nd)!"); // add entry to the play log
		}
		else if (currScene.mFinishedCount == 2) {
			currScene.mLog.AddEntry(9, this.mName + " yielded and limped home (3rd)!"); // add entry to the play log
		}
		
		++currScene.mFinishedCount;
		this.mFinished = true;
	}
}

// render anything associated with the player
OogaahAI.prototype.GetRenderData = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var arr = new Array(); // returned array holding the renderables
	
	arr = util.ConcatArray(arr, this.mHand.GetRenderData()); // add the player's hand to the array
	
	if (currScene.mCurrPlayer == this.mPlayerID) {
		for (var i = 0; i < this.mTurnHighlight.length; ++i) {
			arr.push(this.mTurnHighlight[i]);
		}
	}
	
	if (this.mSelectable == true) {
		arr.push(this.mSelectableArrow);
	}
	
	return arr; // return the renderables array
}

// positions the player's hand
OogaahAI.prototype.PositionHand = function() {
	this.mHand.mCards.sort(noogaah.CardSort); // sort the cards by value
	this.mTurnHighlight.splice(0, this.mTurnHighlight.length);
	
	var pos = new Vec2(120 + (210 * (this.mPlayerID - 1)), -60); // the default posiiton (initial card position)
	var rot = 160; // default rotation
	
	for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
		var card = this.mHand.mCards[i]; // store a reference to the card
		card.mHidden = true; // set the card to hidden
		// card.mDarken = true; // set the card to hidden
		
		// set the small sprite position, origin, depth and rotation
		var smlSpr = card.mCardSprites[2];
		smlSpr.SetPosition(pos);
		smlSpr.SetOrigin(new Vec2(0, smlSpr.mSize.mX));
		smlSpr.mDepth = 1 + i;
		smlSpr.SetRotation(rot);
		
		var smlSprB = card.mCardBacks[2];
		smlSprB.SetPosition(pos);
		smlSprB.SetOrigin(new Vec2(0, smlSprB.mSize.mX));
		smlSprB.mDepth = 1 + i;
		smlSprB.SetRotation(rot);
		
		// create the card shapes
		card.CreateCardShapes();
		
		// set depth
		card.mCardShapes[2].mDepth = 1 + i;
		
		{
			var high = new Shape();
			
			high.SetPosition(new Vec2(smlSprB.mPos.mX, smlSprB.mPos.mY));
			high.AddPoint(new Vec2(smlSprB.mSize.mX + 6, 0));
			high.AddPoint(new Vec2(smlSprB.mSize.mX + 6, smlSprB.mSize.mY + 6));
			high.AddPoint(new Vec2(0, smlSprB.mSize.mY + 6));
			high.SetOrigin(new Vec2(3, smlSprB.mSize.mX + 3));
			high.SetRotation(rot);
			
			high.mColour = "#74AA19";
			high.mDepth = 50;
			
			this.mTurnHighlight.push(high);
		}
		
		rot += 6; // increase the rotation angle for the next card
	}
}

// returns true if the player's hand is highlighted
OogaahAI.prototype.HandHighlighted = function() {
	for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
		var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get the cursor position
		var poly = this.mHand.mCards[i].mCardBacks[2].mGlobalMask.GetAbsolute(); // get array containing the points that make the shape
		
		// if the cursor is within the bounding box
		if (util.PointInConvex(p, poly) == true) {
			return true; // highlighted
		}
	}
	
	return false; // not highlighted
}

// sets the player's hand highlight status
OogaahAI.prototype.Highlight = function(highlight) {
	if (highlight == true) { // if we are to highlight hand
		for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
			var spr = this.mHand.mCards[i].mCardSprites[2];
			spr.SetPosition(new Vec2(spr.mPos.mX, -30)); // set y position lower
			
			var sprB = this.mHand.mCards[i].mCardBacks[2];
			sprB.SetPosition(new Vec2(sprB.mPos.mX, -30));
		}
	}
	else { // otherwise we are to unhighlight hand
		for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards in the hand
			var spr = this.mHand.mCards[i].mCardSprites[2];
			spr.SetPosition(new Vec2(spr.mPos.mX, -60)); // set y position lower
			
			var sprB = this.mHand.mCards[i].mCardBacks[2];
			sprB.SetPosition(new Vec2(sprB.mPos.mX, -60));
		}
	}
}

OogaahAI.prototype.GetValidPlays = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mHand.mCards;
	var validPlays = new Array();
	
	{ // get all valid plays
		if (currScene.mOnlyPeasants == true) {
			for (var i = 0; i < cards.length; ++i) {
				var c = cards[i];
				if (c.mCardAttack == "3") {
					var arr = new Array();
					arr.push(i); validPlays.push(arr);
				}
			}
		}
		else {
			var stored = new Array();
			var sMatched = false;
			
			for (var i = 0; i < cards.length; ++i) {
				var c = cards[i];
				
				if (stored.length == 0) {
					if ((c.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
							(c.mCardValue < currScene.mCurrAV && currScene.mReversed == true) || 
							c.mCardAttack == "1") {
						
						stored.push(i);
					}
				}
				else {
					if (c.mCardValue == cards[stored[0]].mCardValue &&
							c.mCardAttack == cards[stored[0]].mCardAttack) {
						
						stored.push(i);
					}
					else {
						if (cards[cards.length - 1].mCardAttack == "S" && sMatched == false) {
							stored.push(cards.length - 1);
							sMatched = true;
							--i;
						}
						else {
							stored.splice(0, stored.length);
							sMatched = false;
							--i;
						}
					}
				}
				
				if (stored.length > 0) {
					if (cards[stored[0]].mCardAttack == "1") {
						if ((stored.length > currScene.mCurrAV && currScene.mReversed == false) ||
								(stored.length < currScene.mCurrAV && currScene.mReversed == true)) {
							
							if (stored.length > 1 || (stored.length == 1 && currScene.mCurrSS <= 1)) {
								var arr = new Array();
								arr = arr.concat(stored); validPlays.push(arr);
							}
						}
					}
					else if (stored.length == currScene.mCurrSS || currScene.mCurrSS == 0) {
						var arr = new Array();
						arr = arr.concat(stored); validPlays.push(arr);
					}
				}
			}
		}
	}
	
	return validPlays;
}
// ...End


// OogaahLogEntry class
// an entry into the play log
function OogaahLogEntry() {
	this.mType = 0; // the type of entry, used when checking if entry should be shown (due to user options)
	this.mIcon = new Sprite(); // the icon that is displayed next to the entry (corellation with type)
	this.mString = new Text(); // the string the comprises the log entry
};
// ...End


// OogaahPlayLog class
// a visible log of all the actions taking place in the current game (player defineable)
function OogaahPlayLog() {
	this.mPos = new Vec2(); // base position of the log (elements are offset by this)
	
	this.mLogCanvas = new RenderCanvas(); // the canvas that the log is rendered too
	this.mLogTab = new Polygon(); // tab used to show and hide the log
	this.mCamera = new SimpleCamera(); // camera used when rendering the log to offset by scroll amount
	
	this.mLogEntries = new Array(); // array that holds all of the current log entries
	
	this.mIconCount = 11; // the number of icons
	this.mIcons = new Array(); // missing, play, pass, yes, no, ability, skirmish win
	
	this.mLogBack = new Sprite(); // back image of the log
	this.mLogFront = new Sprite(); // front image of the log
	this.mLogScrollMarker = new Shape(); // scrollbar used to scroll through the log
	
	this.mLogSize = 0; // the size (height) of the play log (i.e., the size of all entries, not the size shown on screen)
	
	this.mLogHighlight = false; // is the log highlighted
	this.mLogTabHighlight = false; // is the tab being highlighted
	this.mLogScrollMarkerHighlight = false; // is the scrollbar highlighted
	this.mLogTabGrab = false; // has the tab been grabbed
	this.mLogTabMouseX = 0; // the stored x value used when moving the play log via the tab
	this.mLogScrollMarkerGrab = false; // has the scroll bar been grabbed
	this.mLogScrollMarkerMouseY = 0; // the stored y value used when scrolling the log via the scrollbar
	
	this.mLoggedActions = new Array(); // array of bools that decide if a certain log action should be shown
	for (var i = 0; i < this.mIconCount; ++i) { // missing, play, pass, yes, no, ability, skirmish win, 1st, 2nd, 3rd, 4th
		this.mLoggedActions.push(true);
	}
};

// initiate the log
OogaahPlayLog.prototype.SetUp = function() {
	var texIcon = nmgrs.resMan.mTexStore.GetResource("logIcons"); // the texture containing the icons for the play log
	
	for (var i = 0; i < this.mIconCount; ++i) { // for all icons
		this.mIcons[i] = new Sprite(); // create a new sprite
		this.mIcons[i].SetTexture(texIcon, this.mIconCount + (3 - (this.mIconCount % 3)), 3, -1, -1); // set texture
		this.mIcons[i].SetCurrentFrame(i); // set the frame the corresponds with the current icon
	}
	
	this.mPos.Set(480, 110); // set the base position
	
	// set up the render canvas
	this.mLogCanvas.SetPosition(this.mPos);
	this.mLogCanvas.SetSize(new Vec2(160, 250));
	this.mLogCanvas.mAbsolute = true;
	this.mLogCanvas.mDepth = -50;
	
	{ // set up the log mask
		var mask = new Polygon();
		mask.mPos.Set(-20, -10);
		mask.AddPoint(new Vec2(180,   0));
		mask.AddPoint(new Vec2(180, 270));
		mask.AddPoint(new Vec2(  0, 270));
		
		this.mLogCanvas.SetMask(mask);
		
		// set up the log tab
		this.mLogTab.mPos.Set(this.mPos.mX - 42, this.mPos.mY + 84);
		this.mLogTab.AddPoint(new Vec2(28,  0));
		this.mLogTab.AddPoint(new Vec2(28, 84));
		this.mLogTab.AddPoint(new Vec2( 0, 84));
		this.mLogTab.mDepth = -50;
	}
	
	// set up the log back graphic
	var texBack = nmgrs.resMan.mTexStore.GetResource("logBack");
	this.mLogBack.SetTexture(texBack);
	this.mLogBack.SetPosition(new Vec2(this.mPos.mX - 42, this.mPos.mY - 10));
	this.mLogBack.mDepth = -45;
	
	// set up the log front graphics
	var texFront = nmgrs.resMan.mTexStore.GetResource("logFront");
	this.mLogFront.SetTexture(texFront);
	this.mLogFront.SetPosition(new Vec2(this.mPos.mX - 42, this.mPos.mY - 10));
	this.mLogFront.mDepth = -55;
	
	// set up the log scrollbar
	this.mLogScrollMarker.mPos.Set(this.mPos.mX - 10, this.mPos.mY);
	this.mLogScrollMarker.AddPoint(new Vec2(6, 0));
	this.mLogScrollMarker.AddPoint(new Vec2(6, 250));
	this.mLogScrollMarker.AddPoint(new Vec2(0, 250));
	this.mLogScrollMarker.SetMask();
	this.mLogScrollMarker.mDepth = -50;
	this.mLogScrollMarker.mColour = "#FBF9E8";
}

// handle user interaction with the log
OogaahPlayLog.prototype.Input = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	if (currScene.mPaused == false) { // if the scene isn't paused
		// if the log is being highlighted and log is scrollable
		if (this.mLogHighlight == true && this.mLogSize > this.mLogCanvas.mSize.mY) {
			var wheelDelta = nmgrs.inputMan.GetMouseWheel(); // the amount the wheel has been scrolled
			var amount = Math.abs(wheelDelta); // the absolute value of wheel scroll
			
			if (wheelDelta > 0) { // if mouse wheel was scrolled down
				// if the camera translation is less than the max value
				if (this.mCamera.mPos.mY < (this.mLogSize - this.mLogCanvas.mSize.mY - (26 * amount))) {
					this.mCamera.mPos.mY += 26 * amount; // translate the camera
					this.UpdateCanvas(); // redraw the log canvas
				}
				else if (this.mCamera.mPos.mY != (this.mLogSize - this.mLogCanvas.mSize.mY)) { // otherwise if it's not already max
					this.mCamera.mPos.mY = (this.mLogSize - this.mLogCanvas.mSize.mY); // set it to max value
					this.UpdateCanvas(); // redraw the log canvas
				}
			}
			else if (wheelDelta < 0) { // otherise if mouse wheel was scrolled up
				if (this.mCamera.mPos.mY > 26 * amount) {
					this.mCamera.mPos.mY -= 26 * amount;
					this.UpdateCanvas();
				}
				else if (this.mCamera.mPos.mY != 0) {
					this.mCamera.mPos.mY = 0;
					this.UpdateCanvas();
				}
			}
		}
		
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if LMB is pressed
			if (this.mLogTabHighlight == true && this.mLogTabGrab == false) { // if log tab is highlighted and isn't grabbed
				this.mLogTabGrab = true; // indicate log tab was grabbed
				this.mLogTabMouseX = nmgrs.inputMan.GetLocalMouseCoords().mX; // store current mouse x coord
			}
			
			if (this.mLogScrollMarkerHighlight == true && this.mLogScrollMarkerGrab == false) { // if scrollbar is highlighted and isn't grabbed
				this.mLogScrollMarkerGrab = true; // indicate scrollbar was grabbed
				this.mLogScrollMarkerMouseY = nmgrs.inputMan.GetLocalMouseCoords().mY; // store current mouse y coord
				this.mLogScrollMarker.mColour = "#A79C63"
			}
		}
		else if (nmgrs.inputMan.GetMouseReleased(nmouse.button.code.left) == true) { // if LMB is released
			// reset grab status
			this.mLogTabGrab = false;
			this.mLogScrollMarkerGrab = false;
			this.mLogScrollMarker.mColour = "#F7F2AE"
		}
	}
	else { // otherwise if scene paused
		// reset grab status
		this.mLogTabGrab = false;
		this.mLogScrollMarkerGrab = false;
		this.mLogScrollMarker.mColour = "#F7F2AE"
	}
}

// process the log
OogaahPlayLog.prototype.Process = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to current scene
	
	if (currScene.mPaused == false) { // if the current scene isn't paused
		{ // highlighting logic
			// assume nothing is highlighted initially
			this.mLogHighlight = false;
			this.mLogTabHighlight = false;
			this.mLogScrollMarkerHighlight = false;
			
			var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get the cursor position
			
			{ // handle log highlighting
				// get top left and bottom right coordinates of the bounding box
				var bounds = this.mLogCanvas.mGlobalMask.GetBounds();
				var tl = bounds[0];
				var br = bounds[1];
				
				if (util.PointInRectangle(p, tl, br) == true) { // if mouse is inside log bounding box
					this.mLogHighlight = true; // log is highlighted
				}
			}
			
			{ // handle log tab highlighting
				var bounds = this.mLogTab.GetBounds();
				var tl = bounds[0];
				var br = bounds[1];
				
				if (util.PointInRectangle(p, tl, br) == true) { // if mouse is inside log tab bounding box
					this.mLogTabHighlight = true; // log tab is highlighted
				}
			}
			
			{ // handle scrollbar highlighting
				var bounds = this.mLogScrollMarker.mGlobalMask.GetBounds();
				var tl = bounds[0];
				var br = bounds[1];
				
				if (util.PointInRectangle(p, tl, br) == true) { // if mouse is inside log tab bounding box
					this.mLogScrollMarkerHighlight = true; // scrollbar is highlighted
					
					if (this.mLogScrollMarkerGrab == false) {
						this.mLogScrollMarker.mColour = "#F7F2AE"
					}
				}
				else {
					if (this.mLogScrollMarkerGrab == false) {
						this.mLogScrollMarker.mColour = "#FBF9E8"
					}
					else {
						this.mLogScrollMarker.mColour = "#A79C63"
					}
				}
			}
		}
		
		{
			if (this.mLogTabGrab == true) { // if log tab has been grabbed
				// get the difference in current and stored mouse value
				var diff = nmgrs.inputMan.GetLocalMouseCoords().mX - this.mLogTabMouseX;
				
				if (diff != 0) { // if there is a difference
					if (this.mPos.mX + diff < 480) { // if the new position is less than the min
						diff -= (this.mPos.mX + diff) - 480; // adjust difference value
						this.mPos.mX = 480; // set to the min
					}
					else if (this.mPos.mX + diff > 660) { // otherwise if new position is greater than the max
						diff -= (this.mPos.mX + diff) - 660;
						this.mPos.mX = 660; // set to the max
					}
					else {
						this.mPos.mX += diff; // apply the difference to the position
					}
					
					this.mLogTabMouseX += diff; // adjust the stored mouse value by the adjusted difference value
					
					// update the positons of all of the elements that make up the play log
					this.mLogCanvas.SetPosition(new Vec2(this.mPos.mX, this.mLogCanvas.mPos.mY));
					this.mLogBack.SetPosition(new Vec2(this.mPos.mX - 42, this.mLogBack.mPos.mY));
					this.mLogFront.SetPosition(new Vec2(this.mPos.mX - 42, this.mLogFront.mPos.mY));
					this.mLogScrollMarker.SetPosition(new Vec2(this.mPos.mX - 10, this.mLogScrollMarker.mPos.mY));
					this.mLogTab.mPos.mX = this.mPos.mX - 42;
				}
			}
			
			if (this.mLogScrollMarkerGrab == true) {
				var diff = nmgrs.inputMan.GetLocalMouseCoords().mY - this.mLogScrollMarkerMouseY;
				
				if (diff != 0) {
					// the max value (y position) of the scrollbar
					var max = (this.mPos.mY + this.mLogCanvas.mSize.mY) -
							(this.mLogScrollMarker.mSize.mY * this.mLogScrollMarker.mScale.mY);
					
					if (this.mLogScrollMarker.mPos.mY + diff < this.mPos.mY) {
						diff -= (this.mLogScrollMarker.mPos.mY + diff) - this.mPos.mY;
						this.mLogScrollMarker.SetPosition(new Vec2(this.mLogScrollMarker.mPos.mX, this.mPos.mY));
					}
					else if ((this.mLogScrollMarker.mPos.mY + 0) + diff > max) {
						diff -= (this.mLogScrollMarker.mPos.mY + diff) - max;
						this.mLogScrollMarker.SetPosition(new Vec2(this.mLogScrollMarker.mPos.mX, max));
					}
					else {
						this.mLogScrollMarker.SetPosition(new Vec2(this.mLogScrollMarker.mPos.mX, this.mLogScrollMarker.mPos.mY + diff));
					}
					
					this.mLogScrollMarkerMouseY += diff;
					
					this.mCamera.mPos.mY += diff * (this.mLogSize / this.mLogCanvas.mSize.mY); // update the camera y translation
					this.UpdateCanvas(); // redraw the log canvas
				}
			}
		}
	}
}

// returns all renderables required to draw the log to the canvas
OogaahPlayLog.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	arr.push(this.mLogBack); // add the log back graphic
	arr.push(this.mLogCanvas); // add the log render canvas
	
	if (this.mLogSize > this.mLogCanvas.mSize.mY) { // if the lig size is greater than the render canvas size
		arr.push(this.mLogScrollMarker); // add the scrollbar
	}
	
	arr.push(this.mLogFront); // add the log front graphic
	
	return arr; // return the renderables array
}

// adds and entry to the log (type of entry [int], entry text [string])
OogaahPlayLog.prototype.AddEntry = function(type, string) {
	var entry = new OogaahLogEntry(); // create a new log entry
	
	if (type >= 0 && type < this.mIconCount) { // if type is valid
		entry.mType = type; // set entry type
		entry.mIcon.Copy(this.mIcons[type]); // copy appropiate icon to entry
	}
	else {
		entry.mIcon.Copy(this.mIcons[0]); // copy missing icon to entry
	}
	
	// set the entry's renderable text object
	var font = nmgrs.resMan.mFontStore.GetResource("monaco");
	entry.mString.SetFont(font);
	entry.mString.SetFontSize(16);
	entry.mString.mVSpacing = 0.9; // adjust vertical spacing
	entry.mString.EnableWrapping(155, 40) // enable text wrapping
	entry.mString.SetString("        " + string); // add offset to string (so icon fits)
	entry.mString.mColour = "#FFFFFF";
	
	this.mLogEntries.push(entry); // add the entry to the log entries array
	this.UpdateCanvas(); // redraw the canvas
}

// redraws the log to its render canvas
OogaahPlayLog.prototype.UpdateCanvas = function() {
	this.mLogCanvas.Clear(); // clear the render canvas
	this.mLogSize = 0; // reset the log size to 0
	
	var arr = new Array();
	var yPos = 0; // initial y offset is 0
	for (var i = this.mLogEntries.length - 1; i >= 0; --i) { // for all current entries in the log
		if (this.mLoggedActions[this.mLogEntries[i].mType] == true) { // if the current entry type is to be shown
			// set the y position of the current log entry using offset
			this.mLogEntries[i].mIcon.SetPosition(new Vec2(3, yPos));
			this.mLogEntries[i].mString.SetPosition(new Vec2(4, yPos - 3));
			
			// add the current entry to the array
			arr.push(this.mLogEntries[i].mIcon);
			arr.push(this.mLogEntries[i].mString);
			
			yPos += this.mLogEntries[i].mString.mSize.mY + 8; // increment y offset for next entry
			this.mLogSize += this.mLogEntries[i].mString.mSize.mY + 8; // increase the log size
		}
	}
	
	this.mLogCanvas.RenderTo(arr, this.mCamera); // render
	
	{
		if (this.mLogSize > this.mLogCanvas.mSize.mY) { // if the log size is bigger than the render canvas height
			var scale = this.mLogCanvas.mSize.mY / this.mLogSize; // get the current scale of canvas size to log size
			if (scale < 0.025) { // if scale is lower the the min
				scale = 0.025; // set it to the min
			}
			
			this.mLogScrollMarker.SetScale(new Vec2(1.0, scale)); // scale the scrollbar by the scale value
		}
		
		// the max position the scrollbar can move to
		var maxPos = this.mLogCanvas.mSize.mY - (this.mLogScrollMarker.mSize.mY * scale);
		
		// the percent value that the scrollbar has moved (towards max)
		var percent = this.mCamera.mPos.mY / (this.mLogSize - this.mLogCanvas.mSize.mY);
		
		this.mLogScrollMarker.SetPosition(new Vec2(this.mLogScrollMarker.mPos.mX, this.mPos.mY + (maxPos * percent))); // move the scrollbar to appropiate position
	}
}

// sets the which actions are to be shown in the log (from array)
OogaahPlayLog.prototype.SetLoggedActions = function(actions) {
	for (var i = 0; i < actions.length; ++i) { // for all items in the array
		this.mLoggedActions[i] = actions[i]; // set corresponding log action visibility
	}
	
	this.UpdateCanvas(); // redraw the canvas
}
// ...End


// OogaahBehaviourStore Class...
//
function OogaahBehaviourStore() {
	this.mBehaviours = new Array();
};

OogaahBehaviourStore.prototype.Decide = function(cMap) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	var arr = new Array(); // an array of indices with the highest count
	var max = 0; // the current highest count
	
	for (var i = 0; i < cMap.mStore.length; ++i) { // for all items in the map
		if (cMap.mStore[i].mCount > max) { // if the current item's count is larger than the stored
			max = cMap.mStore[i].mCount; // update the stored count
			
			arr.splice(0, arr.length); // clear all stored indices
			arr.push(i); // add the current index
		}
		else if (cMap.mStore[i].mCount == max) { // otherwise if they match
			arr.push(i); // add the current index
		}
	}
	
	if (arr.length > 0) {
		var rand = arr[currScene.mRand.GetRandInt(0, arr.length - 1)]; // get a random popular result index
		return cMap.mStore[rand].mItem; // return the associated item
	}
	else {
		return null;
	}
}

// 
OogaahBehaviourStore.prototype.DecideMode0 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode0(); // decide which cards we wanna play
		
		if (res != null) {
			for (var j = 0; j < res.length; ++j) {
				cMap.Add(res[j]); // add the result to the map
			}
		}
	}
	
	return this.Decide(cMap);
}

// 
OogaahBehaviourStore.prototype.DecideMode2 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode2(); // decide if we wanna play goblin hordes alongside goblin overseer
		
		if (res != null) {
			cMap.Add(res); // add the result to the map
		}
	}
	
	return this.Decide(cMap);
}

// 
OogaahBehaviourStore.prototype.DecideMode5 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode5(); // decide if we wanna swap the card
		
		if (res != null) {
			cMap.Add(res); // add the result to the map
		}
	}
	
	return this.Decide(cMap);
}

// 
OogaahBehaviourStore.prototype.DecideMode6 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode6(); // decide if we wanna reverse the attack values
		
		if (res != null) {
			cMap.Add(res); // add the result to the map
		}
	}
	
	return this.Decide(cMap);
}

// 
OogaahBehaviourStore.prototype.DecideMode8 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode8(); // 
		
		if (res != null) {
			cMap.Add(res); // add the result to the map
		}
	}
	
	return this.Decide(cMap);
}

// 
OogaahBehaviourStore.prototype.DecideMode12 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode12(); // 
		
		if (res != null) {
			cMap.Add(res); // add the result to the map
		}
	}
	
	return this.Decide(cMap);
}
// ...End


// OogaahBehaviourBase Class...
//
function OogaahBehaviourBase() {
	this.mAI = null; // reference to the AI that this behaviour belongs to
};

//
OogaahBehaviourBase.prototype.SetUp = function(owner) {
	this.mAI = owner; // store the reference to the AI that this behaviour belongs to
}

// 
OogaahBehaviourBase.prototype.DecideMode0 = function() {
	return null;
}

//
OogaahBehaviourBase.prototype.DecideMode2 = function() {
	return null;
}

//
OogaahBehaviourBase.prototype.DecideMode5 = function() {
	return null;
}

//
OogaahBehaviourBase.prototype.DecideMode6 = function() {
	return null;
}

//
OogaahBehaviourBase.prototype.DecideMode8 = function() {
	return null;
}

//
OogaahBehaviourBase.prototype.DecideMode12 = function() {
	return null;
}
// ...End

// OogaahBehaviourSimple Class...
//
function OogaahBehaviourSimple() {
	OogaahBehaviourBase.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahBehaviourSimple.prototype = Object.create(OogaahBehaviourBase.prototype);

// 
OogaahBehaviourSimple.prototype.DecideMode0 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	
	/*
	 * decide which cards to play by:
	 * lowest possible value
	 * as many as possible
	 */
	
	// var arr = new Array();
	var plays = this.mAI.GetValidPlays();
	
	if (plays.length > 0) {
		var choice = new Array();
		
		var lowestValue = cards[plays[0][0]].mCardValue;
		if (currScene.mReverse == true) {
			lowestValue = cards[plays[plays.length - 1][0]].mCardValue;
		}
		
		var maxLength = 0;
		for (var i = 0; i < plays.length; ++i) {
			if (cards[plays[i][0]].mCardValue == lowestValue && plays[i].length > maxLength) {
				var arr = new Array();
				for (var j = 0; j < plays[i].length; ++j) {
					arr.push(plays[i][j]);
				}
				
				choice.splice(0, choice.length);
				choice.push(arr);
				maxLength = plays[i].length;
			}
		}
		
		return choice;
	}
	
	return null;
}

// 
OogaahBehaviourSimple.prototype.DecideMode2 = function() {
	var cards = this.mAI.mHand.mCards;
	
	{
		/*
		 * play goblin hordes if:
		 * we only have 1 or 2
		 * OR
		 * we only have goblin hordes left
		 */
		
		var hordes = new Array(); // the ids of all goblin hordes in the hand
		for (var i = 0; i < cards.length; ++i) { // for all cards in the hand
			var c = cards[i]; // reference to card
			
			if (c.mCardAttack == "1") { // if the card is a goblin horde
				hordes.push(i); // add the id
			}
			else if (noogaah.AVToIndex(c.mCardAttack) > 0) { // otherwise if we are past goblin hordes
				break; // stop searching
			}
		}
		
		if (hordes.length > 0) { // if we have any goblin hordes
			if (hordes.length == cards.length || hordes.length < 3) {
				return hordes;
			}
		}
	}
	
	return null;
}

// 
OogaahBehaviourSimple.prototype.DecideMode5 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	
	// if we are in submode a then we are only looking to decided if we should swap at all
	if (this.mAI.mSubMode == "a") {
		/*
		 * decided to swap if:
		 * we have at least 1 card type for which we only have 1 card
		 * and it is a 6 or lower
		 * and we have more than 6 cards in our hand
		 */
		
		var swap = false; // should we swap or not
		
		if (cards.length > 6) { // if we have more than 6 cards in our hand
			var v = this.mAI.mHand.GetCardsByAVSingles();
			for (var i = 0; i < 6; ++i) {
				if (v[i].length == 1) {
					swap = true; // we want to swap
					break;
				}
			}
		}
		
		return swap;
	}
	else if (this.mAI.mSubMode == "b") { // otherwise we are in submode b deciding which player to choose if any
		/* 
		 * continue the swap if:
		 * the graveyard has cards that match one of ours or an A or an S
		 * and the percent of eligible cards is is 40 or greater
		 * OR
		 * there is a player with less than 6 cards still in the game
		 */
		
		var targets = new Array(); // all eligible swap target id's (graveyard -1)
		var graveyard = currScene.mGraveyard.mCards; // reference to the graveyard
		
		if (graveyard.length > 0) { // if the graveyard isn't empty
			var count = 0; // the count of eligible cards
			
			for (var i = 0; i < graveyard.length; ++i) { // for all cards in the graveyard
				// if the graveyard card is and S or an A
				if (graveyard[i].mCardAttack == "S" || graveyard[i].mCardAttack == "A") {
					++count; // increment the eligible count
				}
				else { // otherwise
					for (var j = 0; j < cards.length; ++j) { // for all cards in the hand
						var card = cards[j]; // reference to current card
						if (graveyard[i].mCardValue == card.mCardValue) { // if the card values match
							++count; // increment the eligible count
						}
					}
				}
			}
			
			if ((count / graveyard.length * 100) >= 40) { // if the eligible percentage is greater than 40
				targets.push(-1); // add the graveyard
			}
		}
		
		if (targets.length == 0) { // if we didn't add the graveyard (graveyard hs priority)
			for (var i = 0; i < currScene.mPlayers.length; ++i) { // for all players
				var player = currScene.mPlayers[i]; // reference to player
				
				// if the player has at least 1 card and less than 7, and isn't this player
				if ((player.mHand.mCards.length > 0 && player.mHand.mCards.length < 7) && player.mPlayerID != this.mAI.mPlayerID) {
					targets.push(i); // add player's id
				}
			}
		}
		
		if (targets.length > 0) { // if we have at least 1 swap target
			var rand = currScene.mRand.GetRandInt(0, targets.length - 1); // get a random swap id
			return targets[rand]; // return swap id
		}
	}
	else if (this.mAI.mSubMode == "c") { // otherwise in submode c we decide if we want to perform a swap
		/*
		 * only perform the swap if:
		 * the card we're recieving matches 1 we already have
		 * OR
		 * is an A or an S
		 */
		
		var swapCards = new Array();
		var cardValid = false;
		
		{
			var chosen = this.mAI.mChosenPlayer.mCards[this.mAI.mChosenCard];
			var ind = noogaah.AVToIndex(chosen.mCardAttack);
			
			var singles = this.mAI.mHand.GetCardsByAVSingles();
			for (var i = 0; i < 6; ++i) {
				if (singles[i].length > 0 && i != ind) {
					swapCards.push(singles[i][0]);
					cardValid = true;
				}
			}
			
			if (chosen.mCardAttack == "A" || chosen.mCardAttack == "S") {
				cardValid = true;
			}
		}
		
		if (cardValid == true && swapCards.length > 0) {
			var rand = currScene.mRand.GetRandInt(0, swapCards.length - 1); // get a random
			return swapCards[rand]; // return
		}
	}
	
	return null;
}

// 
OogaahBehaviourSimple.prototype.DecideMode6 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	
	/*
	 * reverse attack values if:
	 * 4, 3, 2 or 1 (at least 2) that can match squadsize
	 * in the case of 1, if only 1 then squadsize must match
	 * in the case of 3, value must be 4 or less
	 */
	
	var count = new Array();
	for (var i = 0; i < 4; ++i) {
		count.push(0);
	}
	
	for (var i = 0; i < cards.length; ++i) {
		var index = noogaah.AVToIndex(cards[i].mCardAttack);
		if (index < 4 && cards[i].mCardValue < 5) {
			++count[index];
		}
		else {
			break;
		}
	}
	
	var valid = 0;
	for (var i = 0; i < count.length; ++i) {
		// if count at least matches the current squadsize
		// or index is 0 (goblin horde) and count is greater than 1 (ability activates)
		if (count[i] >= currScene.mCurrSS || (i == 0 && count[i] > 1)) {
			++valid; // add a valid count
		}
	}
	
	if (valid > 1) {
		return true;
	}
	
	return null;
}

// 
OogaahBehaviourSimple.prototype.DecideMode8 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	
	/*
	 * play a card alongside human mage if:
	 * we have a card type for which we have only 1 (not an S)
	 * play lowest of those
	 */
	
	var singles = -1;
	
	{ // 
		var v = this.mAI.mHand.GetCardsByAVSingles();
		for (var i = 0; i < v.length - 1; ++i) {
			if (v[i].length == 1) {
				singles = v[i][0];
			}
		}
	}
	
	return singles;
}

// 
OogaahBehaviourSimple.prototype.DecideMode12 = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var cards = this.mAI.mHand.mCards;
	var graveyard = currScene.mGraveyard.mCards;
	
	/*
	 * take cards from the graveyard if:
	 * there is an S in the graveyard (priority)
	 * we have a single horde (take other hordes if any, otherwise look for a mage or overseer)
	 * we have a lower card (6 and lower) in single only and there are others in the graveyard
	 */
	
	var choice = new Array();
	var graveyardIDs = new Array(); // valid card ids in the graveyard
	
	for (var i = 0; i < currScene.mCardList.length; ++i) { // for all available card types
		graveyardIDs.push(new Array()); // add a blank array
	}
	
	for (var i = 0; i < graveyard.length; ++i) { // for all cards in the graveyard
		var index = noogaah.AVToIndex(graveyard[i].mCardAttack); // get the card type index
		if (index == 12 || index == 7 || index < 6) { // if the index is S, 8, or 6 or less
			graveyardIDs[index].push(i); // add the id as a valid choice
		}
	}
	
	var singles = this.mAI.mHand.GetCardsByAVSingles();
	
	if (graveyardIDs[12].length > 0) { // if there was an S in there
		choice.push(graveyardIDs[12][0]); // add the card id to the choice array
	}
	else {
		var done = false;
		if (singles[0].length > 0) { // if we have a single goblin horde
			if (graveyardIDs[0].length > 0) { // if there are hordes in the graveyard
				for (var i = 0; i < graveyardIDs[0].length; ++i) {
					choice.push(graveyardIDs[0][i]);
				}
				
				done = true
			}
			else if (graveyardIDs[7].length > 0) { // otherwise if there are mages in the graveyard
				for (var i = 0; i < graveyardIDs[7].length; ++i) {
					choice.push(graveyardIDs[7][i]);
				}
				
				done = true
			}
			else if (graveyardIDs[1].length > 0) { // otherwise if there are overseers in the graveyard
				for (var i = 0; i < graveyardIDs[1].length; ++i) {
					choice.push(graveyardIDs[1][i]);
				}
				
				done = true
			}
		}
		
		if (done == false) {
			var matchingSingles = new Array();
			
			for (var i = 0; i < graveyardIDs.length; ++i) { // for all card ids
				if (graveyardIDs[i].length > 0) { // if the card type exists in the graveyard
					if (singles[i].length > 0) { // and it matches a single in the hand
						var arr = new Array();
						
						for (var j = 0; j < graveyardIDs[i].length; ++j) {
							arr.push(graveyardIDs[i][j]);
						}
						
						matchingSingles.push(arr);
					}
				}
			}
			
			if (matchingSingles.length > 0) {
				var rand = currScene.mRand.GetRandInt(0, matchingSingles.length - 1);
				
				for (var i = 0; i < matchingSingles[rand].length; ++i) {
					choice.push(matchingSingles[rand][i]);
				}
			}
		}
	}
	
	if (choice.length > 0) { // if we have a choice
		return choice; // return it
	}
	
	return null; // return null
}
// ...End


// OogaahOptionsHeader Class...
function OogaahOptionsHeader() {
	this.mBarTop = new Shape();
	this.mText = new Text();
	this.mBarBottom = new Shape();
};

OogaahOptionsHeader.prototype.SetUp = function(pos) {
	this.mBarTop.SetPosition(pos);
	this.mBarTop.AddPoint(new Vec2(285, 0));
	this.mBarTop.AddPoint(new Vec2(285, 2));
	this.mBarTop.AddPoint(new Vec2(  0, 2));
	this.mBarTop.mColour = "#D6D5C6";
	
	var fnt = nmgrs.resMan.mFontStore.GetResource("oldmansans");
	this.mText.SetFont(fnt);
	this.mText.SetFontSize(24);
	this.mText.SetPosition(new Vec2(pos.mX + 30, pos.mY));
	this.mText.mDepth = 0;
	this.mText.mColour = "#D6D5C6";
	this.mText.mAlign = "left";
	this.mText.SetString("Play Logging");
	
	this.mBarBottom.Copy(this.mBarTop);
	this.mBarBottom.SetPosition(new Vec2(this.mBarBottom.mPos.mX, this.mBarBottom.mPos.mY + 32));
}

OogaahOptionsHeader.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr.push(this.mBarTop);
	arr.push(this.mText);
	arr.push(this.mBarBottom);
	
	return arr;
}
// ...End


// OogaahOptionsScene Class...
// 
function OogaahOptionsScene() {
	this.mPersist = false;
	
	this.mBatch = new RenderBatch();
	
	this.mBackColour = new Shape();
	
	this.mBackButton = new GUIButton();
	this.mBackButtonText = new Text();
	this.mBackButtonCover = new GUIButton();
	
	{
		this.mLogHeader = new OogaahOptionsHeader();
		
		this.mLogChecks = new Array();
		this.mLogChecks[0] = new GUICheckBox();
		this.mLogChecks[1] = new GUICheckBox();
		this.mLogChecks[2] = new GUICheckBox();
		this.mLogChecks[3] = new GUICheckBox();
		this.mLogChecks[4] = new GUICheckBox();
		
		this.mLogText = new Array();
		this.mLogText[0] = new Text();
		this.mLogText[1] = new Text();
		this.mLogText[2] = new Text();
		this.mLogText[3] = new Text();
		this.mLogText[4] = new Text();
		
		this.mLogValues = new Array();
		this.mLogValues[0] = 6;
		this.mLogValues[1] = 1;
		this.mLogValues[2] = 2;
		this.mLogValues[3] = 5;
		this.mLogValues[4] = 3; // or 4
	}
	
	// this.mButtonHoverID = -1;
	// this.mTooltip = new GUITooltip();
};

// returns the type of this object for validity checking
OogaahOptionsScene.prototype.Type = function() {
	return "OogaahOptionsScene";
}

// initialises the scene object
OogaahOptionsScene.prototype.SetUp = function() {
	nmain.game.mClearColour = "#FFFFFF";
	
	{
		this.mBackColour.SetPosition(new Vec2(2, 2));
		this.mBackColour.AddPoint(new Vec2(636,   0));
		this.mBackColour.AddPoint(new Vec2(636, 476));
		this.mBackColour.AddPoint(new Vec2(  0, 476));
		this.mBackColour.mAbsolute = true;
		this.mBackColour.mDepth = 99999;
		this.mBackColour.mColour = "#35251C";
	}
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("buttonLarge");
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		
		this.mBackButton.SetUp(new Vec2(265, 424), new Vec2(109, 29), 0);
		this.mBackButton.mSpriteIdle.SetTexture(tex, 8, 2, -1, -1); this.mBackButton.mSpriteIdle.SetCurrentFrame(0);
		this.mBackButton.mSpriteHover.SetTexture(tex, 8, 2, -1, -1); this.mBackButton.mSpriteHover.SetCurrentFrame(2);
		this.mBackButton.mSpriteDown.SetTexture(tex, 8, 2, -1, -1); this.mBackButton.mSpriteDown.SetCurrentFrame(4);
		this.mBackButton.mSpriteInactive.SetTexture(tex, 8, 2, -1, -1); this.mBackButton.mSpriteInactive.SetCurrentFrame(6);
		
		this.mBackButtonText.SetFont(fnt);
		this.mBackButtonText.SetFontSize(14);
		this.mBackButtonText.SetPosition(new Vec2(319, 429));
		this.mBackButtonText.mAbsolute = true;
		this.mBackButtonText.mDepth = 0;
		this.mBackButtonText.mColour = "#FFFFFF";
		this.mBackButtonText.mAlign = "centre";
		this.mBackButtonText.SetString("Return");
		
		this.mBackButtonCover.SetUp(new Vec2(265, 424), new Vec2(109, 29), 0);
		this.mBackButtonCover.mSpriteIdle.SetTexture(tex, 8, 2, -1, -1); this.mBackButtonCover.mSpriteIdle.SetCurrentFrame(1);
		this.mBackButtonCover.mSpriteHover.SetTexture(tex, 8, 2, -1, -1); this.mBackButtonCover.mSpriteHover.SetCurrentFrame(3);
		this.mBackButtonCover.mSpriteDown.SetTexture(tex, 8, 2, -1, -1); this.mBackButtonCover.mSpriteDown.SetCurrentFrame(5);
		this.mBackButtonCover.mSpriteInactive.SetTexture(tex, 8, 2, -1, -1); this.mBackButtonCover.mSpriteInactive.SetCurrentFrame(7);
	}
	
	{
		this.mLogHeader.SetUp(new Vec2(65, 60));
		
		{
			var texCB = nmgrs.resMan.mTexStore.GetResource("optionsCheck");
			var fnt = nmgrs.resMan.mFontStore.GetResource("oldmansans");
			var pos = new Vec2(100, 140);
			
			for (var i = 0; i < this.mLogChecks.length; ++i) {
				this.mLogChecks[i].SetUp(pos, new Vec2(32, 31), 0);
				
				this.mLogChecks[i].mButton.mSpriteIdle.SetTexture(texCB, 4, 4, -1, -1); this.mLogChecks[i].mButton.mSpriteIdle.SetCurrentFrame(0);
				this.mLogChecks[i].mButton.mSpriteHover.SetTexture(texCB, 4, 4, -1, -1); this.mLogChecks[i].mButton.mSpriteHover.SetCurrentFrame(1);
				this.mLogChecks[i].mButton.mSpriteDown.SetTexture(texCB, 4, 4, -1, -1); this.mLogChecks[i].mButton.mSpriteDown.SetCurrentFrame(2);
				this.mLogChecks[i].mButton.mSpriteInactive.SetTexture(texCB, 4, 4, -1, -1); this.mLogChecks[i].mButton.mSpriteInactive.SetCurrentFrame(0);
				
				this.mLogChecks[i].mSpriteSelected.SetTexture(texCB, 4, 4, -1, -1); this.mLogChecks[i].mSpriteSelected.SetCurrentFrame(3);
				
				this.mLogChecks[i].mButton.mPos.mX += 16; this.mLogChecks[i].mButton.mPos.mY += 3;
				
				this.mLogText[i].SetFont(fnt);
				this.mLogText[i].SetFontSize(13);
				this.mLogText[i].SetPosition(new Vec2(pos.mX + 31, 110));
				this.mLogText[i].mAbsolute = true;
				this.mLogText[i].mDepth = 0;
				this.mLogText[i].mColour = "#D6D5C6";
				this.mLogText[i].mAlign = "centre";
				
				pos.mX += 65;
			}
			
			this.mLogText[0].SetString("Skirmish\nWins");
			this.mLogText[1].SetString("Card\nPlays");
			this.mLogText[2].SetString("Passing");
			this.mLogText[2].SetPosition(new Vec2(this.mLogText[2].mPos.mX, this.mLogText[2].mPos.mY + 15));
			this.mLogText[3].SetString("Ability\nActivation");
			this.mLogText[4].SetString("Confirm and\nCancel");
		}
		
		for (var i = 0; i < this.mLogChecks.length; ++i) {
			if (noogaah.options.mLogOptions[this.mLogValues[i]] == true) {
				this.mLogChecks[i].mSelected = true;
			}
		}
	}
	
	// var fntTT = nmgrs.resMan.mFontStore.GetResource("monaco");
	// this.mTooltip.SetUp(new Vec2(), -10);
	// this.mTooltip.SetText(fntTT, 16, "");
	// this.mTooltip.mTooltipText.mVSpacing = 0.8;
}

// cleans up the scene object
OogaahOptionsScene.prototype.TearDown = function() {
	
}

// handles user input
OogaahOptionsScene.prototype.Input = function() {
	// this.mTooltip.Input();
	
	this.mBackButton.Input();
	this.mBackButtonCover.Input();
	
	for (var i = 0; i < this.mLogChecks.length; ++i) {
		this.mLogChecks[i].Input();
	}
	
	if (nmgrs.inputMan.GetKeyboardPressed(nkeyboard.key.code.P) == true) { // if the p key is pressed
		/* for (var i = 0; i < this.mLogChecks.length; ++i) {
			var value = false;
			if (this.mLogChecks[i].mSelected == true) {
				value = true;
			}
			
			noogaah.options.mLogOptions[this.mLogValues[i]] = value;
			if (i == 4) {
				noogaah.options.mLogOptions[4] = value;
			}
		}
		
		noogaah.options.SaveOptions();
		
		nmgrs.sceneMan.RequestSceneChange(new OogaahGameScene());
		nmgrs.sceneMan.mReadyScene.mPersist = false;
		nmgrs.sceneMan.mReadyScene.mLog.SetLoggedActions(noogaah.options.mLogOptions); */
	}
}

// handles game logic
OogaahOptionsScene.prototype.Process = function() {
	// this.mTooltip.Process();
	// var ttHover = -1;
	
	{
		this.mBackButton.Process(null);
		this.mBackButtonCover.Process(null);
		
		// update button text colour depending on button state
		if (this.mBackButton.mActive == false) {
			this.mBackButtonText.mColour = "#888888";
		}
		else {
			if (this.mBackButton.mStatus == "idle") {
				this.mBackButtonText.mColour = "#DDDDDD";
			}
			else if (this.mBackButton.mStatus == "hover") {
				this.mBackButtonText.mColour = "#FFFFFF";
			}
			else if (this.mBackButton.mStatus == "down") {
				this.mBackButtonText.mColour = "#AAAAAA";
			}
		}
		
		// if (this.mBackButton.mHover == true && ttHover == -1) {
		// 	ttHover = 0;
		// }
	}
	
	if (this.mBackButton.OnClick() == true) { // if play button clicked
		for (var i = 0; i < this.mLogChecks.length; ++i) {
			var value = false;
			if (this.mLogChecks[i].mSelected == true) {
				value = true;
			}
			
			noogaah.options.mLogOptions[this.mLogValues[i]] = value;
			if (i == 4) {
				noogaah.options.mLogOptions[4] = value;
			}
		}
		
		noogaah.options.SaveOptions();
		
		nmgrs.sceneMan.RequestSceneChange(new OogaahGameScene());
		nmgrs.sceneMan.mReadyScene.mPersist = false;
		nmgrs.sceneMan.mReadyScene.mLog.SetLoggedActions(noogaah.options.mLogOptions);
	}
	
	for (var i = 0; i < this.mLogChecks.length; ++i) {
		this.mLogChecks[i].Process(null);
		
		// if (this.mLogChecks[i].mButton.mHover == true && ttHover == -1) {
		// 	ttHover = i + 1;
		// }
	}
	
	/* if (ttHover >= 0) {
		if (this.mButtonHoverID != ttHover) {
			this.mButtonHoverID = ttHover;
			this.mTooltip.StartTimeout(1500);
			
			if (ttHover == 0) {
				this.mTooltip.SetText(null, null, "Accept changes and return to the game.");
			}
			else if (ttHover == 1) {
				this.mTooltip.SetText(null, null, "Enable/Disable logging when a player wins a skirmish.");
			}
			else if (ttHover == 2) {
				this.mTooltip.SetText(null, null, "Enable/Disable logging when a player plays a card.");
			}
			else if (ttHover == 3) {
				this.mTooltip.SetText(null, null, "Enable/Disable logging when a player passes.");
			}
			else if (ttHover == 4) {
				this.mTooltip.SetText(null, null, "Enable/Disable logging when a player activates a cards ability.");
			}
			else if (ttHover == 5) {
				this.mTooltip.SetText(null, null, "Enable/Disable logging when a player makes a choice.");
			}
		}
		
		this.mTooltip.SetPosition(new Vec2(nmgrs.inputMan.GetLocalMouseCoords().mX + 10,
				(nmgrs.inputMan.GetLocalMouseCoords().mY - this.mTooltip.mTooltipText.GetHeight()) + 3));
		this.mTooltip.FixPosition(new Vec2(0, 0), nmain.game.mCanvasSize);
	}
	else {
		this.mButtonHoverID = ttHover;
	} */
}

// handles all drawing tasks
OogaahOptionsScene.prototype.Render = function() {
	nmain.game.SetIdentity();
	this.mBatch.Clear();
	
	var arr = new Array();
	
	arr.push(this.mBackColour);
	
	arr = util.ConcatArray(arr, this.mBackButton.GetRenderData());
	arr.push(this.mBackButtonText);
	arr = util.ConcatArray(arr, this.mBackButtonCover.GetRenderData());
	
	{
		arr = util.ConcatArray(arr, this.mLogHeader.GetRenderData());
		
		for (var i = 0; i < this.mLogChecks.length; ++i) {
			arr = util.ConcatArray(arr, this.mLogChecks[i].GetRenderData());
			arr.push(this.mLogText[i]);
		}
	}
	
	if (this.mButtonHoverID >= 0) {
		arr = util.ConcatArray(arr, this.mTooltip.GetRenderData());
	}
	
	for (var i = 0; i < arr.length; ++i) {
		this.mBatch.Add(arr[i]);
	}
	
	this.mBatch.Render(null, null);
}
// ...End


// OogaahOptions class...
// holds the various option setting values
function OogaahOptions() {
	this.mStorage = new LocalStorage();
	
	this.mLogOptions = new Array();
	
	{
		var playLog = new OogaahPlayLog();
		for (var i = 0; i < playLog.mIconCount; ++i) { // missing, play, pass, yes, no, ability, skirmish win, 1st, 2nd, 3rd, 4th
			this.mLogOptions.push(true);
		}
	}
};

OogaahOptions.prototype.LoadOptions = function() {
	if (this.mStorage.IsSupported() == true) {
		for (var i = 0; i < this.mLogOptions.length; ++i) {
			if (this.mStorage.Exists("optionsLog" + i) == true) {
				var str = this.mStorage.Load("optionsLog" + i);
				
				if (str == "0") {
					this.mLogOptions[i] = false;
				}
			}
		}
	}
}

OogaahOptions.prototype.SaveOptions = function() {
	if (this.mStorage.IsSupported() == true) {
		for (var i = 0; i < this.mLogOptions.length; ++i) {
			var str = "0";
			if (this.mLogOptions[i] == true) {
				str = "1";
			}
			
			this.mStorage.Save("optionsLog" + i, str, true);
		}
	}
}

OogaahOptions.prototype.ResetOptions = function() {
	if (this.mStorage.IsSupported() == true) {
		for (var i = 0; i < this.mLogOptions.length; ++i) {
			if (this.mStorage.Exists("optionsLog" + i) == true) {
				this.mStorage.Delete("optionsLog" + i);
			}
		}
	}
}
// ...End



// OogaahExampleMessage Class...
// 
function OogaahExampleMessage() {
	this.mPos = new Vec2();
	this.mSize = new Vec2();
	
	this.mCanContinue = true;
	this.mArrowDirection = -1;
	
	this.mShape = new Shape();
	this.mShapeInnerOutline = new Shape();
	this.mShapeOuterOutline = new Shape();
	this.mShapeBack = new Shape();
	this.mShapeArrow = new Shape();
	
	this.mText = new Text();
	this.mTextContinue = new Text();
	
	{
		this.mShape.mColour = "#111111";
		this.mShape.mAlpha = 0.95;
		this.mShape.mDepth = -1000;
		
		this.mShapeInnerOutline.mColour = "#111111";
		this.mShapeInnerOutline.mRenderStyle = "LineLoop";
		this.mShapeInnerOutline.mLineWidth = 3;
		this.mShapeInnerOutline.mDepth = -1000;
		
		this.mShapeOuterOutline.mColour = "#CD4242";
		this.mShapeOuterOutline.mRenderStyle = "LineLoop";
		this.mShapeOuterOutline.mLineWidth = 8;
		this.mShapeOuterOutline.mDepth = -1000;
		
		this.mShapeBack.mColour = "#000000";
		this.mShapeBack.mAlpha = 0.4;
		this.mShapeBack.mDepth = -1000;
		
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		this.mText.SetOrigin(new Vec2(-5, 0));
		this.mText.SetFont(fnt);
		this.mText.SetFontSize(16);
		this.mText.mAlign = "justify";
		this.mText.mDepth = -1000;
		this.mText.mVSpacing = 0.9;
		
		this.mTextContinue.SetFont(fnt);
		this.mTextContinue.SetFontSize(16);
		this.mTextContinue.mAlign = "right";
		this.mTextContinue.mDepth = -1000;
		this.mTextContinue.SetString("Left click to continue...");
	}
};

OogaahExampleMessage.prototype.CreateMessage = function() {
	var arr = new Array();
	arr.push(new Vec2(this.mSize.mX, 0));
	arr.push(new Vec2(this.mSize.mX, this.mSize.mY + 20));
	arr.push(new Vec2(0, this.mSize.mY + 20));
	
	if (this.mArrowDirection >= 0) {
		for (var i = 0; i < this.mShapeArrow.mPoints.length; ++i) {
			var v = this.mShapeArrow.mPoints[i].GetCopy();
			arr.splice(this.mArrowDirection, 0, v);
		}
	}
	
	this.mShape.Clear();
	this.mShape.SetPosition(this.mPos);
	this.mShape.AddPoints(arr);
	
	this.mShapeInnerOutline.Clear();
	this.mShapeInnerOutline.SetPosition(this.mPos);
	this.mShapeInnerOutline.AddPoints(arr);
	
	this.mShapeOuterOutline.Clear();
	this.mShapeOuterOutline.SetPosition(this.mPos);
	this.mShapeOuterOutline.AddPoints(arr);
	
	{
		var thickness = 14;
		
		this.mShapeBack.Clear();
		this.mShapeBack.SetPosition(new Vec2(this.mPos.mX, this.mPos.mY - thickness));
		this.mShapeBack.AddPoint(new Vec2(this.mSize.mX, 0));
		this.mShapeBack.AddPoint(new Vec2(this.mSize.mX + thickness, thickness));
		this.mShapeBack.AddPoint(new Vec2(this.mSize.mX + thickness, this.mSize.mY + 20 + thickness));
		this.mShapeBack.AddPoint(new Vec2(this.mSize.mX, this.mSize.mY + 20 + (thickness * 2)));
		this.mShapeBack.AddPoint(new Vec2(0, this.mSize.mY + 20 + (thickness * 2)));
		this.mShapeBack.AddPoint(new Vec2(-thickness, this.mSize.mY + 20 + thickness));
		this.mShapeBack.AddPoint(new Vec2(-thickness, thickness));
	}
}

OogaahExampleMessage.prototype.SetArrow = function(direction, offset) {
	this.mShapeArrow.Clear();
	var offs = offset;
	
	switch (direction) {
		case "up" :
			if (offs > this.mSize.mX - 36) {
				offs = this.mSize.mX - 36;
			}
			
			this.mShapeArrow.AddPoint(new Vec2(offs, 0));
			this.mShapeArrow.AddPoint(new Vec2(offs + 18, -16));
			this.mShapeArrow.AddPoint(new Vec2(offs + 36, 0));
			this.mArrowDirection = 0;
			break;
		case "right" :
			if (offs > this.mSize.mY - 16) {
				offs = this.mSize.mY - 16;
			}
			
			this.mShapeArrow.AddPoint(new Vec2(this.mSize.mX, offs));
			this.mShapeArrow.AddPoint(new Vec2(this.mSize.mX + 16, offs + 18));
			this.mShapeArrow.AddPoint(new Vec2(this.mSize.mX, offs + 36));
			this.mArrowDirection = 1;
			break;
		case "down" :
			if (offs > this.mSize.mX - 36) {
				offs = this.mSize.mX - 36;
			}
			
			this.mShapeArrow.AddPoint(new Vec2(0 + offs, this.mSize.mY + 20));
			this.mShapeArrow.AddPoint(new Vec2(0 + offs + 18, this.mSize.mY + 36));
			this.mShapeArrow.AddPoint(new Vec2(0 + offs + 36, this.mSize.mY + 20));
			this.mArrowDirection = 2;
			break;
		case "left" :
			if (offs > this.mSize.mY - 16) {
				offs = this.mSize.mY - 16;
			}
			
			this.mShapeArrow.AddPoint(new Vec2(0, offs));
			this.mShapeArrow.AddPoint(new Vec2(0 - 16, offs + 18));
			this.mShapeArrow.AddPoint(new Vec2(0, offs + 36));
			this.mArrowDirection = 3;
			break;
	}
}
// ...End


// OogaahExampleMessageQueue Class...
// 
function OogaahExampleMessageQueue() {
	this.mQueue = new Array();
};

OogaahExampleMessageQueue.prototype.PushMessage = function(pos, string, size, direction, offset) {
	var msg = new OogaahExampleMessage();
	
	msg.mPos.Copy(pos);
	msg.mSize.Copy(size);
	msg.SetArrow(direction, offset);
	
	msg.mText.SetPosition(pos);
	msg.mText.SetString(string);
	msg.mText.EnableWrapping(size.mX - 10);
	
	msg.mTextContinue.SetPosition(pos);
	msg.mTextContinue.SetOrigin(new Vec2(-size.mX + 5, -size.mY + 2));
	
	msg.CreateMessage();
	
	this.mQueue.push(msg);
}

OogaahExampleMessageQueue.prototype.PopMessage = function() {
	if (this.mQueue.length > 0) {
		this.mQueue.splice(0, 1);
	}
}

OogaahExampleMessageQueue.prototype.Input = function() {
	if (this.mQueue.length > 0) {
		if (this.mQueue[0].mCanContinue == true) {
			if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true &&
					nmgrs.inputMan.GetMouseInCanvas() == true) {
				
				this.PopMessage();
			}
		}
	}
}

OogaahExampleMessageQueue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mQueue.length > 0) {
		arr.push(this.mQueue[0].mShapeBack);
		
		arr.push(this.mQueue[0].mShapeOuterOutline);
		arr.push(this.mQueue[0].mShape);
		arr.push(this.mQueue[0].mShapeInnerOutline);
		
		arr.push(this.mQueue[0].mText);
		
		if (this.mQueue[0].mCanContinue == true) {
			arr.push(this.mQueue[0].mTextContinue);
		}
	}
	
	return arr;
}
// ...End


// OogaahTutorialHuman class
// 
function OogaahTutorialHuman() {
	OogaahHuman.apply(this, null); // construct the base class
};

// inherit the base class's prototype
OogaahTutorialHuman.prototype = Object.create(OogaahHuman.prototype);

// logic called when the play button is clicked in the player gui
OogaahTutorialHuman.prototype.OnPlay = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	var match = true; // assume a match initially
	var desired = new Array();
	desired.push(currScene.mCardList[0]);
	
	{
		var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
		
		if (arr.length == desired.length) { // if the lengths match then we potentially have a match
			for (var i = 0; i < arr.length; ++i) { // for all cards in both arrays
				// if the cards don't match
				if (arr[i].mCardAttack != desired[i].mCardAttack && arr[i].mCardValue != desired[i].mCardValue) {
					match = false; // indicated no match
					break; // stop
				}
			}
		}
		else { // otherwise, mismatched lengths indicate no match
			match = false;
		}
	}
	
	if (match == false) { // if we didn't get a match
		// no dice, dummy!
		alert("Invalid!");
	}
	else {
	
	}
	
	/* if (this.mMode == 5 && this.mSubMode == "b") { // if we are in goblin technician mode (submode b)
		for (var i = 0; i < this.mHand.mCards.length; ++i) { // for all cards
			this.mSelectedCards[i] = 3; // set cards to single-selectable (3)
			this.mHand.mCards[i].mDarken = false;
		}
		
		this.mGUI.mDisplayCard = null;
		
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Swap Card");
		this.mGUI.ShowMessage(true, "Choose which card to swap or pass.");
		
		this.mSubMode = "c"; // change to submode c
	}
	else if (this.mMode == 6) { // otherwise if we are in orc shaman mode
		currScene.mReversed = !currScene.mReversed; // reverse the current game values
		
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(3, this.mName + " reversed card values for this skirmish."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else { // otherwise we are in normal play
		var arr = new Array(); arr = util.ConcatArray(arr, this.GetSelected()); // get the currently selected cards
		if (arr.length > 0) { // if we have selected at least 1 card
			arr[0].Play(arr); // play that/those cards
			currScene.mDelay = 1000;
		}
	}
	
	if (this.mHand.mCards.length == 0 && this.mMode == 0 && this.mFinished == false) {
		if (currScene.mFinishedCount == 0) {
			currScene.mLog.AddEntry(7, this.mName + " achieved a flawless victory (1st)!"); // add entry to the play log
		}
		else if (currScene.mFinishedCount == 1) {
			currScene.mLog.AddEntry(8, this.mName + " won a costly battle (2nd)!"); // add entry to the play log
		}
		else if (currScene.mFinishedCount == 2) {
			currScene.mLog.AddEntry(9, this.mName + " yielded and limped home (3rd)!"); // add entry to the play log
		}
		
		++currScene.mFinishedCount;
		this.mFinished = true;
	} */
}

// logic called when the pass button is clicked in the player gui
OogaahTutorialHuman.prototype.OnPass = function() {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	// check we want a pass
	// if so do ur thang
	
	/* if (this.mMode == 2) { // if we are in goblin overseer mode
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(4, this.mName + " chose not to play any Goblin Hordes."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 5) { // otherwise if we are in goblin technician mode
		if (this.mSubMode == "a") { // if we are in submode a
			for (var i = 0; i < 4; ++i) { // for all other players
				if (i != this.mPlayerID) {
					currScene.mPlayers[i].mSelectable = false; // set hand selection to false
				}
			}
			
			currScene.mGraveyard.mSelectable = false; // set graveyard selection to false
			
			this.mGUI.mButtons[0].mActive = true;
			this.mGUI.mButtonCovers[0].mActive = true;
			this.mGUI.ShowMessage(false);
			
			currScene.mLog.AddEntry(4, this.mName + " chose not to swap a card."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
			currScene.mDelay = 1000;
		}
		else if (this.mSubMode == "b") { // otherwise if we are in submode b
			// update player gui text
			this.mGUI.mButtonText[0].SetString("Play");
			this.mGUI.ShowMessage(false);
			
			// add entry to the play log
			currScene.mLog.AddEntry(4, this.mName + " chose not to swap for a " +
					this.mChosenPlayer.mCards[this.mChosenCard].mCardType + " " +
					this.mChosenPlayer.mCards[this.mChosenCard].mCardName  + ".");
			
			this.mMode = 0; // reset to mode 0
			this.mSubMode = "a"; // reset to submode a
			
			// reset goblin technician selection choices
			this.mGUI.mDisplayCard = null;
			this.mChosenPlayer = null;
			this.mChosenID = -1;
			this.mChosenCard = -1;
			
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
			currScene.mDelay = 1000;
		}
		else if (this.mSubMode == "c") { // otherwise if we are in submode c
			this.mGUI.mButtonText[0].SetString("Play");
			this.mGUI.ShowMessage(false);
			
			currScene.mLog.AddEntry(4, this.mName + " cancelled the card swap."); // add entry to the play log
			
			this.mMode = 0; // reset to mode 0
			this.mSubMode = "a"; // reset to submode a
			
			// reset goblin technician selection choices
			this.mChosenPlayer = null;
			this.mChosenID = -1;
			this.mChosenCard = -1;
			
			this.ResetSelected(); // reset selected states
			currScene.ChangePlayer(); // change to the next player
			currScene.mDelay = 1000;
		}
	}
	else if (this.mMode == 6) { // otherwise if we are in orc shaman mode
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(4, this.mName + " chose not to reverse card values for this skirmish."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 8) { // otherwise if we are in human mage mode
		// update player gui text
		this.mGUI.mButtonText[0].SetString("Play");
		this.mGUI.ShowMessage(false);
		
		currScene.mLog.AddEntry(4, this.mName + " chose not to play a card alongside Human Mage."); // add entry to the play log
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else if (this.mMode == 12) { // otherwise if we are in human paladin mode
		if (this.mRecievedCount == 0) {
			currScene.mLog.AddEntry(4, this.mName + " chose not to take any cards from the graveyard."); // add entry to the play log
		}
		else {
			currScene.mLog.AddEntry(3, this.mName + " took " + this.mRecievedCount + "x " +
					this.mRecievedCard.mCardType + " " + this.mRecievedCard.mCardName + " from the graveyard.");
			
			currScene.mGraveyard.mViewLeftButton.mActive = true;
			currScene.mGraveyard.mViewRightButton.mActive = true;
		}
		
		currScene.mGraveyard.SetView(false);
		
		this.mGUI.mButtons[0].mActive = true;
		this.mGUI.mButtonCovers[0].mActive = true;
		this.mGUI.ShowMessage(false);
		
		this.mRecievedCount = 0;
		this.mRecievedCard = null;
		
		this.mMode = 0; // reset to mode 0
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	}
	else { // otherwise we are in normal play
		currScene.mLog.AddEntry(2, this.mName + " passed."); // add entry to the play log
		
		this.ResetSelected(); // reset selected states
		currScene.ChangePlayer(); // change to the next player
		currScene.mDelay = 1000;
	} */
}
// ...End


// OogaahCardGoblinHorde class
function OogaahCardGoblinHorde() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "1"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Goblin"; // the type of the card (e.g., Goblin)
	this.mCardName = "Horde"; // the name of the card (e.g., Horde)
	this.mCardAbility = "A Mob Mentality"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 1; // the current value of the card
};

// inherit the base class's prototype
OogaahCardGoblinHorde.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardGoblinHorde.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
}

OogaahCardGoblinHorde.prototype.GetCopy = function() {
	var c = new OogaahCardGoblinHorde(); c.Copy(this);
	
	return c;
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardGoblinHorde.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		var value = cards.length; // the value of this card is the squad size, due to ability
		
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed (if number played > 1 then ability activates and
		// squadsize is ignored)
		if (((value > currScene.mCurrAV && currScene.mReversed == false) ||
				(value < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0 || cards.length > 1)) {
			
			// whilst the orc warrior's ability won't affect this card it's still important to handle it as it will
			// reset the status of the warrior's ability for future plays
			this.HandleOrcWarrior();
			
			// update current attackvalue and squadsize
			currScene.SetAV(value);
			currScene.SetSS(cards.length);
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			
			if (value > 1) {
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
			}
			
			currScene.ChangePlayer(); // change to the next player
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 2) { // otherwise if the current player is in "goblin overseer" mode
		// set the current attackvalue and squadsize
		currScene.SetAV(1);
		currScene.SetSS(1);
		
		currPlayer.mMode = 0; // reset the current player's mode
		currPlayer.RemoveSelected(); // remove cards from current player's hands
		currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
		currScene.mLog.AddEntry(3, currPlayer.mName + " played " + cards.length + "x Goblin Horde alongside Goblin Overseer.");
		
		if (currPlayer.mType == "Human") {
			currPlayer.mGUI.mButtonText[0].SetString("Play");
			currPlayer.mGUI.ShowMessage(false);
		}
		
		currScene.ChangePlayer(); // change to the next player
		
		return true; // valid
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}
// ...End


// OogaahCardGoblinOverseer class
function OogaahCardGoblinOverseer() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "2"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Goblin"; // the type of the card (e.g., Goblin)
	this.mCardName = "Overseer"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Overseerial"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 2; // the current value of the card
};

// inherit the base class's prototype
OogaahCardGoblinOverseer.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardGoblinOverseer.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
}

OogaahCardGoblinOverseer.prototype.GetCopy = function() {
	var c = new OogaahCardGoblinOverseer(); c.Copy(this);
	
	return c;
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardGoblinOverseer.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			// whilst the orc warrior's ability won't affect this card it's still important to handle it as it will
			// reset the status of the warrior's ability for future plays
			this.HandleOrcWarrior();
			
			// update current attackvalue and squadsize
			currScene.SetAV(this.mCardValue);
			currScene.SetSS(cards.length);
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			
			{ // ability
				if (currPlayer.mHand.mCards.length > 0) { // if player still has cards left in hand
					if (currPlayer.mHand.mCards[0].mCardAttack == "1") { // and if player has any hordes in hand
						for (var i = 0; i < currPlayer.mHand.mCards.length; ++i) { // for all cards in the player's hand
							var c = currPlayer.mHand.mCards[i]; // get a reference to the card
							if (c.mCardAttack != "1") { // if its attack value is not 1 (not a goblin horde)
								currPlayer.mSelectedCards[i] = -1; // set its status to locked
								
								if (currPlayer.mType == "Human") {
									c.mDarken = true;
								}
							}
						}
						
						currPlayer.mMode = 2; // set current player's mode to 2 (goblin overseer ability)
						currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
						
						if (currPlayer.mType == "Human") {
							currPlayer.mGUI.mButtonText[0].SetString("Play Hordes");
							currPlayer.mGUI.ShowMessage(true, "Choose to play Goblin Hordes or pass.");
						}
					}
					else {
						currScene.ChangePlayer(); // change to the next player
					}
				}
				else {
					currScene.ChangePlayer(); // change to the next player
				}
			}
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}
// ...End


// OogaahCardHumanPeasant class
function OogaahCardHumanPeasant() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "3"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Human"; // the type of the card (e.g., Goblin)
	this.mCardName = "Peasant"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Unplanned Uprising"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 3; // the current value of the card
	
	this.mValueText = new Array();
	this.mValueText[0] = new Text();
	this.mValueText[1] = new Text();
	this.mValueText[2] = new Text();
	
	var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
	for (var i = 0; i < this.mValueText.length; ++i) {
		this.mValueText[i].SetFont(fnt);
		
		this.mValueText[i].mAlign = "centre";
		this.mValueText[i].mAbsolute = true;
		this.mValueText[i].mColour = "#81BD1C";
		
		this.mValueText[i].mShadow = true;
		this.mValueText[i].mShadowColour = "#498E1F";
	}
	
	this.mValueText[0].SetFontSize(82);
	this.mValueText[1].SetFontSize(38);
	this.mValueText[1].mShadowAlpha = 0.5;
	this.mValueText[2].SetFontSize(22);
	this.mValueText[2].mShadowAlpha = 0.3;
	
	this.mSplitShape = new Array();
	
	{
		this.mSplitShape[0] = new Shape();
		this.mSplitShape[0].MakeCircle(new Vec2(), 33, 24);
		this.mSplitShape[0].mColour = "#501616";
		
		this.mSplitShape[1] = new Shape();
		this.mSplitShape[1].MakeCircle(new Vec2(), 15, 24);
		this.mSplitShape[1].mColour = "#501616";
		
		this.mSplitShape[2] = new Shape();
		this.mSplitShape[2].MakeCircle(new Vec2(), 9, 24);
		this.mSplitShape[2].mColour = "#501616";
	}
	
	this.ModifyValue(0);
	this.PositionValueText();
};

// inherit the base class's prototype
OogaahCardHumanPeasant.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardHumanPeasant.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
	
	this.mValueText[0].Copy(other.mValueText[0]);
	this.mValueText[1].Copy(other.mValueText[1]);
	this.mValueText[2].Copy(other.mValueText[2]);
	
	this.mSplitShape[0].Copy(other.mSplitShape[0]);
	this.mSplitShape[1].Copy(other.mSplitShape[1]);
	this.mSplitShape[2].Copy(other.mSplitShape[2]);
}

OogaahCardHumanPeasant.prototype.GetCopy = function() {
	var c = new OogaahCardHumanPeasant(); c.Copy(this);
	
	return c;
}

OogaahCardHumanPeasant.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mHidden == false) {
		arr.push(this.mCardSprites[this.mSize]);
		
		if (this.mCardValue - 3 > 0) { // if the card attack has been modified due to ability
			arr.push(this.mSplitShape[this.mSize]);
			arr.push(this.mValueText[this.mSize]); // display the appropiate modification
		}
	}
	else {
		arr.push(this.mCardBacks[this.mSize]);
	}
	
	if (this.mDarken == true) { // 
		arr.push(this.mCardShapes[this.mSize]);
	}
	
	return arr;
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardHumanPeasant.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		// or if human knight's ability is active
		if ((((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) ||
				currScene.mOnlyPeasants == true) {
			
			var orcWarrior = this.HandleOrcWarrior(); // the id of the player who owns the orc warrior, if any (-1 is none)
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			if (orcWarrior == -1) { // if there is no orc warrior whose ability is active
				// update current attackvalue and squadsize
				currScene.SetAV(this.mCardValue);
				currScene.SetSS(cards.length);
				
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
				currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
				currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
				
				if (currScene.mOnlyPeasants == true) {
					currScene.mOnlyPeasants = false;
				}
				
				currScene.ChangePlayer(); // change to the next player
			}
			else {
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mGraveyard.AddCards(cards); // add the cards straight into the graveyard
				currScene.mLog.AddEntry(4, cards.length + "x " + this.mCardType + " " + this.mCardName + " was discarded due to Mmmm, Fresh Meat ability.");
				
				currScene.ChangePlayer(orcWarrior); // revert play to the player who owns the orc warrior
				currScene.mLastPlayer = orcWarrior; // set last player to the player who owns the orc warrior
			}
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}

// modifies this cards value due to its ability
OogaahCardHumanPeasant.prototype.ModifyValue = function(amount) {
	this.mCardValue += amount; // change the card value by the amount
	
	for (var i = 0; i < this.mValueText.length; ++i) { // for all texts
		this.mValueText[i].SetString(noogaah.IndexToAV(this.mCardValue - 1)); // set the string to the new amount
	}
}

// 
OogaahCardHumanPeasant.prototype.PositionValueText = function() {
	var lrgSpr = this.mCardSprites[0];
	this.mValueText[0].SetPosition(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 3) + Math.round(lrgSpr.mSize.mX / 2) - 59,
			Math.round(nmain.game.mCanvasSize.mY / 2) + Math.round(lrgSpr.mSize.mY / 2) - 93));
	this.mValueText[0].mDepth = lrgSpr.mDepth;
	
	var medSpr = this.mCardSprites[1];
	var medPos = new Vec2(); medPos.Copy(medSpr.mPos);
	medPos.mX -= medSpr.mOrigin.mX; medPos.mY -= medSpr.mOrigin.mY;
	this.mValueText[1].SetPosition(new Vec2(medPos.mX + medSpr.mSize.mX - 26, medPos.mY + medSpr.mSize.mY - 42));
	this.mValueText[1].mDepth = medSpr.mDepth;
	
	var smlSpr = this.mCardSprites[2];
	var smlPos = new Vec2(); smlPos.Copy(smlSpr.mPos);
	smlPos.mX -= smlSpr.mOrigin.mX; smlPos.mY -= smlSpr.mOrigin.mY;
	this.mValueText[2].SetPosition(new Vec2(smlPos.mX + smlSpr.mSize.mX - 15, smlPos.mY + smlSpr.mSize.mY - 25));
	this.mValueText[2].mDepth = smlSpr.mDepth;
	
	for (var i = 0; i < this.mCardSprites.length; ++i) {
		this.mSplitShape[i].SetPosition(new Vec2(this.mCardSprites[i].mPos.mX + this.mCardSprites[i].mSize.mX,
				this.mCardSprites[i].mPos.mY + this.mCardSprites[i].mSize.mY));
		this.mSplitShape[i].SetOrigin(this.mCardSprites[i].mOrigin);
	}
	
	{
		var ss0 = this.mSplitShape[0];
		ss0.SetPosition(new Vec2(ss0.mPos.mX - 56, ss0.mPos.mY - 40));
		ss0.mDepth = lrgSpr.mDepth;
		
		var ss1 = this.mSplitShape[1];
		ss1.SetPosition(new Vec2(ss1.mPos.mX - 26, ss1.mPos.mY - 18));
		ss1.mDepth = medSpr.mDepth;
		
		var ss2 = this.mSplitShape[2];
		ss2.SetPosition(new Vec2(ss2.mPos.mX - 15, ss2.mPos.mY - 10));
		ss2.mDepth = smlSpr.mDepth;
	}
}
// ...End


// OogaahCardOrcWarrior class
function OogaahCardOrcWarrior() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "4"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Orc"; // the type of the card (e.g., Goblin)
	this.mCardName = "Warrior"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Mmmm, Fresh Meat"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 4; // the current value of the card
};

// inherit the base class's prototype
OogaahCardOrcWarrior.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardOrcWarrior.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
}

OogaahCardOrcWarrior.prototype.GetCopy = function() {
	var c = new OogaahCardOrcWarrior(); c.Copy(this);
	
	return c;
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardOrcWarrior.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			// whilst the orc warrior's ability won't affect this card it's still important to handle it as it will
			// reset the status of the warrior's ability for future plays
			this.HandleOrcWarrior();
			
			// update current attackvalue and squadsize
			currScene.SetAV(this.mCardValue);
			currScene.SetSS(cards.length);
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			if (currPlayer.mHand.mCards.length > 0) { // if player still has cards left in hand
				currScene.mWarriorOwner = currScene.mCurrPlayer; // set the owner of the last card for the orc warrior's ability
			}
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
			
			currScene.ChangePlayer(); // change to the next player
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}
// ...End


// OogaahCardGoblinTechnician class
function OogaahCardGoblinTechnician() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "5"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Goblin"; // the type of the card (e.g., Goblin)
	this.mCardName = "Technician"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Knowing and Doing"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 5; // the current value of the card
};

// inherit the base class's prototype
OogaahCardGoblinTechnician.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardGoblinTechnician.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
}

OogaahCardGoblinTechnician.prototype.GetCopy = function() {
	var c = new OogaahCardGoblinTechnician(); c.Copy(this);
	
	return c;
}

OogaahCardGoblinTechnician.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			// whilst the orc warrior's ability won't affect this card it's still important to handle it as it will
			// reset the status of the warrior's ability for future plays
			this.HandleOrcWarrior();
			
			// update current attackvalue and squadsize
			currScene.SetAV(this.mCardValue);
			currScene.SetSS(cards.length);
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			
			{ // ability
				if (currPlayer.mHand.mCards.length > 0) { // if player still has cards left in hand
					for (var i = 0; i < currPlayer.mHand.mCards.length; ++i) { // for all cards in the player's hand
						currPlayer.mSelectedCards[i] = -1; // set status to locked
						
						if (currPlayer.mType == "Human") {
							currPlayer.mHand.mCards[i].mDarken = true;
						}
					}
					
					currPlayer.mMode = 5; // set current player's mode to 5 (goblin technician ability)
					currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
					
					if (currPlayer.mType == "Human") {
						for (var i = 0; i < 4; ++i) {
							if (currScene.mPlayers[i].mType == "AI") {
								currScene.mPlayers[i].mSelectable = true;
							}
						}
						
						currScene.mGraveyard.mSelectable = true;
						
						currPlayer.mGUI.mButtons[0].mActive = false;
						currPlayer.mGUI.mButtonCovers[0].mActive = false;
						currPlayer.mGUI.ShowMessage(true, "Choose another player or the graveyard, or pass.");
					}
				}
				else {
					currScene.ChangePlayer(); // change to the next player
				}
			}
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}
// ...End


// OogaahCardOrcShaman class
function OogaahCardOrcShaman() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "6"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Orc"; // the type of the card (e.g., Goblin)
	this.mCardName = "Shaman"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Extreme Magicks"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 6; // the current value of the card
};

// inherit the base class's prototype
OogaahCardOrcShaman.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardOrcShaman.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
}

OogaahCardOrcShaman.prototype.GetCopy = function() {
	var c = new OogaahCardOrcShaman(); c.Copy(this);
	
	return c;
}

OogaahCardOrcShaman.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			// whilst the orc warrior's ability won't affect this card it's still important to handle it as it will
			// reset the status of the warrior's ability for future plays
			this.HandleOrcWarrior();
			
			// update current attackvalue and squadsize
			currScene.SetAV(this.mCardValue);
			currScene.SetSS(cards.length);
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			
			{ // ability
				for (var i = 0; i < currPlayer.mHand.mCards.length; ++i) { // for all cards in the player's hand
					currPlayer.mSelectedCards[i] = -1; // set status to locked
				}
				
				currPlayer.mMode = 6; // set current player's mode to 6 (orc shaman ability)
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
				
				if (currPlayer.mType == "Human") {
					currPlayer.mGUI.mButtonText[0].SetString("Reverse");
					currPlayer.mGUI.ShowMessage(true, "Choose to reverse card values or pass.");
				}
			}
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}
// ...End


// OogaahCardHumanCleric class
function OogaahCardHumanCleric() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "7"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Human"; // the type of the card (e.g., Goblin)
	this.mCardName = "Cleric"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Doctored Results"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 7; // the current value of the card
};

// inherit the base class's prototype
OogaahCardHumanCleric.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardHumanCleric.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
}

OogaahCardHumanCleric.prototype.GetCopy = function() {
	var c = new OogaahCardHumanCleric(); c.Copy(this);
	
	return c;
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardHumanCleric.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			var orcWarrior = this.HandleOrcWarrior(); // the id of the player who owns the orc warrior, if any (-1 is none)
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			if (orcWarrior == -1) { // if there is no orc warrior whose ability is active
				// update current attackvalue and squadsize
				currScene.SetAV(this.mCardValue);
				currScene.SetSS(cards.length);
				
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
				currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
				currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
				
				var knight = false;
				
				{ // ability
					currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
					
					for (var i = 0; i < currScene.mPlayers.length; ++i) {
						// if not this player and the player is still in the game
						if (i != currScene.mCurrPlayer && currScene.mPlayers[i].mFinished == false) {
							if (currScene.mGraveyard.mCards.length == 0) { // if the graveyard is empty
								break; // stop
							}
							
							// get a random card from the graveyard
							var id = currScene.mRand.GetRandInt(0, currScene.mGraveyard.mCards.length - 1);
							var card = currScene.mGraveyard.GetCard(id);
							
							// handle human peasant's ability
							if (card.mCardAttack == "9") {
								knight = true;
							}
							else if (card.mCardAttack == "S") {
								if (card.mMimic != null) { // if being of light was played using its ability
									if (card.mMimic.mCardAttack == "9") { // if the card was played as a knight
										knight = true;
									}
									
									card.mMimic = null;
								}
							}
							
							currScene.mGraveyard.RemoveCard(id); // remove card from the graveyard
							currScene.mPlayers[i].mHand.AddCard(card); // add it to the player's hand
							currScene.mPlayers[i].PositionHand(); // reposition the player's hand
							currScene.mPlayers[i].ResetSelected();
						}
					}
				}
				
				if (knight == true) {
					currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activated.");
				}

				currScene.ChangePlayer(); // change to the next player
			}
			else {
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mGraveyard.AddCards(cards); // add the cards straight into the graveyard
				currScene.mLog.AddEntry(4, cards.length + "x " + this.mCardType + " " + this.mCardName + " was discarded due to Mmmm, Fresh Meat ability.");
				
				currScene.ChangePlayer(orcWarrior); // revert play to the player who owns the orc warrior
				currScene.mLastPlayer = orcWarrior; // set last player to the player who owns the orc warrior
			}
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}
// ...End


// OogaahCardHumanMage class
function OogaahCardHumanMage() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "8"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Human"; // the type of the card (e.g., Goblin)
	this.mCardName = "Mage"; // the name of the card (e.g., Horde)
	this.mCardAbility = "My Wizard's Hat"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 8; // the current value of the card
};

// inherit the base class's prototype
OogaahCardHumanMage.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardHumanMage.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
}

OogaahCardHumanMage.prototype.GetCopy = function() {
	var c = new OogaahCardHumanMage(); c.Copy(this);
	
	return c;
}

OogaahCardHumanMage.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			var orcWarrior = this.HandleOrcWarrior(); // the id of the player who owns the orc warrior, if any (-1 is none)
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			if (orcWarrior == -1) { // if there is no orc warrior whose ability is active
				// update current attackvalue and squadsize
				currScene.SetAV(this.mCardValue);
				currScene.SetSS(cards.length);
				
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
				currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
				currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
				
				{ // ability
					if (currPlayer.mHand.mCards.length > 0) { // if player still has cards left in hand
						for (var i = 0; i < currPlayer.mHand.mCards.length; ++i) { // for all cards in the player's hand
							currPlayer.mSelectedCards[i] = 3; // set status to single-selectable
						}
						
						currPlayer.mMode = 8; // set current player's mode to 8 (human mage ability)
						currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
						
						if (currPlayer.mType == "Human") {
							currPlayer.mGUI.mButtonText[0].SetString("Play Card");
							currPlayer.mGUI.ShowMessage(true, "Choose to play another card or pass.");
						}
					}
					else {
						currScene.ChangePlayer(); // change to the next player
					}
				}
			}
			else {
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mGraveyard.AddCards(cards); // add the cards straight into the graveyard
				currScene.mLog.AddEntry(4, cards.length + "x " + this.mCardType + " " + this.mCardName + " was discarded due to Mmmm, Fresh Meat ability.");
				
				currScene.ChangePlayer(orcWarrior); // revert play to the player who owns the orc warrior
				currScene.mLastPlayer = orcWarrior; // set last player to the player who owns the orc warrior
			}
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}
// ...End


// OogaahCardHumanKnight class
function OogaahCardHumanKnight() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "9"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Human"; // the type of the card (e.g., Goblin)
	this.mCardName = "Knight"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Oppressing Your Buttons"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 9; // the current value of the card
};

// inherit the base class's prototype
OogaahCardHumanKnight.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardHumanKnight.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
}

OogaahCardHumanKnight.prototype.GetCopy = function() {
	var c = new OogaahCardHumanKnight(); c.Copy(this);
	
	return c;
}

// validates if the current card can be played and perform any actions neccesary when playing this card
OogaahCardHumanKnight.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			var orcWarrior = this.HandleOrcWarrior(); // the id of the player who owns the orc warrior, if any (-1 is none)
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			if (orcWarrior == -1) { // if there is no orc warrior whose ability is active
				// update current attackvalue and squadsize
				currScene.SetAV(this.mCardValue);
				currScene.SetSS(cards.length);
				
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
				currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
				currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
				
				{ // ability
					currScene.mOnlyPeasants = true;
					
					currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
				}
				
				currScene.ChangePlayer(); // change to the next player
			}
			else {
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mGraveyard.AddCards(cards); // add the cards straight into the graveyard
				currScene.mLog.AddEntry(4, cards.length + "x " + this.mCardType + " " + this.mCardName + " was discarded due to Mmmm, Fresh Meat ability.");
				
				currScene.mLog.AddEntry(5, "Human Peasant's " + currScene.mCardList[2].mCardAbility + " ability activated.");
				
				currScene.ChangePlayer(orcWarrior); // revert play to the player who owns the orc warrior
				currScene.mLastPlayer = orcWarrior; // set last player to the player who owns the orc warrior
			}
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}
// ...End


// OogaahCardOrcBerserker class
function OogaahCardOrcBerserker() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "C"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Orc"; // the type of the card (e.g., Goblin)
	this.mCardName = "Berserker"; // the name of the card (e.g., Horde)
	this.mCardAbility = "A Calmed Mind"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 10; // the current value of the card
	
	this.mValueText = new Array();
	this.mValueText[0] = new Text();
	this.mValueText[1] = new Text();
	this.mValueText[2] = new Text();
	
	var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
	for (var i = 0; i < this.mValueText.length; ++i) {
		this.mValueText[i].SetFont(fnt);
		
		this.mValueText[i].mAlign = "centre";
		this.mValueText[i].mAbsolute = true;
		this.mValueText[i].mColour = "#81BD1C";
		
		this.mValueText[i].mShadow = true;
		this.mValueText[i].mShadowColour = "#498E1F";
	}
	
	this.mValueText[0].SetFontSize(82);
	this.mValueText[1].SetFontSize(38);
	this.mValueText[1].mShadowAlpha = 0.5;
	this.mValueText[2].SetFontSize(22);
	this.mValueText[2].mShadowAlpha = 0.3;
	
	this.mSplitShape = new Array();
	
	{
		this.mSplitShape[0] = new Shape();
		this.mSplitShape[0].MakeCircle(new Vec2(), 33, 24);
		this.mSplitShape[0].mColour = "#501616";
		
		this.mSplitShape[1] = new Shape();
		this.mSplitShape[1].MakeCircle(new Vec2(), 15, 24);
		this.mSplitShape[1].mColour = "#501616";
		
		this.mSplitShape[2] = new Shape();
		this.mSplitShape[2].MakeCircle(new Vec2(), 9, 24);
		this.mSplitShape[2].mColour = "#501616";
	}
	
	this.ModifyValue(0);
	this.PositionValueText();
};

// inherit the base class's prototype
OogaahCardOrcBerserker.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardOrcBerserker.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
	
	this.mValueText[0].Copy(other.mValueText[0]);
	this.mValueText[1].Copy(other.mValueText[1]);
	this.mValueText[2].Copy(other.mValueText[2]);
	
	this.mSplitShape[0].Copy(other.mSplitShape[0]);
	this.mSplitShape[1].Copy(other.mSplitShape[1]);
	this.mSplitShape[2].Copy(other.mSplitShape[2]);
}

OogaahCardOrcBerserker.prototype.GetCopy = function() {
	var c = new OogaahCardOrcBerserker(); c.Copy(this);
	
	return c;
}

OogaahCardOrcBerserker.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mHidden == false) {
		arr.push(this.mCardSprites[this.mSize]);
		
		if (this.mCardValue - 10 < 0) { // if the card attack has been modified due to ability
			arr.push(this.mSplitShape[this.mSize]);
			arr.push(this.mValueText[this.mSize]); // display the appropiate modification
		}
	}
	else {
		arr.push(this.mCardBacks[this.mSize]);
	}
	
	if (this.mDarken == true) { // 
		arr.push(this.mCardShapes[this.mSize]);
	}
	
	return arr;
}

OogaahCardOrcBerserker.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			// whilst the orc warrior's ability won't affect this card it's still important to handle it as it will
			// reset the status of the warrior's ability for future plays
			this.HandleOrcWarrior();
			
			// update current attackvalue and squadsize
			currScene.SetAV(this.mCardValue);
			currScene.SetSS(cards.length);
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			
			{ // ability
				for (var i = 0; i < currScene.mPlayers.length; ++i) { // for all players
					var player = currScene.mPlayers[i]; // reference to the player
					
					for (var j = 0; j < player.mHand.mCards.length; ++j) { // for all cards in the player's hand
						var card =  player.mHand.mCards[j]; // reference to the card
						
						// if the card is an orc berserker and it's value is greater than 6 (6 is the minimum card value)
						if (card.mCardAttack == "C" && card.mCardValue > 6) {
							var value = card.mCardValue - 6; // set the deduction to the minimum we can decrease by
							if (cards.length < value) { // if we are decreasing less than the minimum
								value = cards.length; // set the deduction to the decrease amount
							}
							
							card.ModifyValue(-value); // modify the card's value
						}
					}
					
					player.PositionHand();
				}
				
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
			}
			
			currScene.ChangePlayer(); // change to the next player
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}

// modifies this cards value due to its ability
OogaahCardOrcBerserker.prototype.ModifyValue = function(amount) {
	this.mCardValue += amount; // change the card value by the amount
	
	for (var i = 0; i < this.mValueText.length; ++i) { // for all texts
		this.mValueText[i].SetString(noogaah.IndexToAV(this.mCardValue - 1)); // set the string to the new amount
	}
}

// 
OogaahCardOrcBerserker.prototype.PositionValueText = function() {
	var lrgSpr = this.mCardSprites[0];
	this.mValueText[0].SetPosition(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 3) + Math.round(lrgSpr.mSize.mX / 2) - 59,
			Math.round(nmain.game.mCanvasSize.mY / 2) + Math.round(lrgSpr.mSize.mY / 2) - 93));
	this.mValueText[0].mDepth = lrgSpr.mDepth;
	
	var medSpr = this.mCardSprites[1];
	var medPos = new Vec2(); medPos.Copy(medSpr.mPos);
	medPos.mX -= medSpr.mOrigin.mX; medPos.mY -= medSpr.mOrigin.mY;
	this.mValueText[1].SetPosition(new Vec2(medPos.mX + medSpr.mSize.mX - 26, medPos.mY + medSpr.mSize.mY - 42));
	this.mValueText[1].mDepth = medSpr.mDepth;
	
	var smlSpr = this.mCardSprites[2];
	var smlPos = new Vec2(); smlPos.Copy(smlSpr.mPos);
	smlPos.mX -= smlSpr.mOrigin.mX; smlPos.mY -= smlSpr.mOrigin.mY;
	this.mValueText[2].SetPosition(new Vec2(smlPos.mX + smlSpr.mSize.mX - 15, smlPos.mY + smlSpr.mSize.mY - 25));
	this.mValueText[2].mDepth = smlSpr.mDepth;
	
	for (var i = 0; i < this.mCardSprites.length; ++i) {
		this.mSplitShape[i].SetPosition(new Vec2(this.mCardSprites[i].mPos.mX + this.mCardSprites[i].mSize.mX,
				this.mCardSprites[i].mPos.mY + this.mCardSprites[i].mSize.mY));
		this.mSplitShape[i].SetOrigin(this.mCardSprites[i].mOrigin);
	}
	
	{
		var ss0 = this.mSplitShape[0];
		ss0.SetPosition(new Vec2(ss0.mPos.mX - 56, ss0.mPos.mY - 40));
		ss0.mDepth = lrgSpr.mDepth;
		
		var ss1 = this.mSplitShape[1];
		ss1.SetPosition(new Vec2(ss1.mPos.mX - 26, ss1.mPos.mY - 18));
		ss1.mDepth = medSpr.mDepth;
		
		var ss2 = this.mSplitShape[2];
		ss2.SetPosition(new Vec2(ss2.mPos.mX - 15, ss2.mPos.mY - 10));
		ss2.mDepth = smlSpr.mDepth;
	}
}
// ...End


// OogaahCardOrcWarchief class
function OogaahCardOrcWarchief() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "B"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Orc"; // the type of the card (e.g., Goblin)
	this.mCardName = "Warchief"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Leading from the Back"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 11; // the current value of the card
};

// inherit the base class's prototype
OogaahCardOrcWarchief.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardOrcWarchief.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
}

OogaahCardOrcWarchief.prototype.GetCopy = function() {
	var c = new OogaahCardOrcWarchief(); c.Copy(this);
	
	return c;
}

OogaahCardOrcWarchief.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			// whilst the orc warrior's ability won't affect this card it's still important to handle it as it will
			// reset the status of the warrior's ability for future plays
			this.HandleOrcWarrior();
			
			// update current attackvalue and squadsize
			currScene.SetAV(this.mCardValue);
			currScene.SetSS(cards.length);
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			var foundOrc = null; // the last played orc card this skirmish
			
			{ // ability
				var storedValue = -1;
				var index = -1;
				
				for (var i = currScene.mBattlefield.mCards.length - 1; i >= 0; --i) { // for all cards on the battlefield
					var card = currScene.mBattlefield.mCards[i]; // reference to card
					
					// if the card is an orc and has a higher attack value than the one stored
					if (card.mCardType == "Orc" && card.mCardValue > storedValue) {
						foundOrc = card; // store the card
						storedValue = card.mCardValue; // store the card value
						index = i; // store the card's index
					}
				}
				
				if (index >= 0) { // if the stored index is not negative
					currScene.mBattlefield.RemoveCard(index); // remove the corresponding card from the battlefield
				}
			}
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			
			if (foundOrc != null) {
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
				currScene.mLog.AddEntry(3, foundOrc.mCardType + " " + foundOrc.mCardName + " was moved to the top."); // add entry to the play log
				
				// reset the current attack value and squad size
				currScene.SetAV(foundOrc.mCardValue);
				currScene.SetSS(1);
				
				currScene.mBattlefield.AddCard(foundOrc);
			}
			
			currScene.ChangePlayer(); // change to the next player
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}
// ...End


// OogaahCardHumanPaladin class
function OogaahCardHumanPaladin() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "A"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Human"; // the type of the card (e.g., Goblin)
	this.mCardName = "Paladin"; // the name of the card (e.g., Horde)
	this.mCardAbility = "Only Cold Justice"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 12; // the current value of the card
};

// inherit the base class's prototype
OogaahCardHumanPaladin.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardHumanPaladin.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
}

OogaahCardHumanPaladin.prototype.GetCopy = function() {
	var c = new OogaahCardHumanPaladin(); c.Copy(this);
	
	return c;
}

OogaahCardHumanPaladin.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			var orcWarrior = this.HandleOrcWarrior(); // the id of the player who owns the orc warrior, if any (-1 is none)
			
			if (cards[cards.length - 1].mCardAttack == "S") { // if the last card in the array is an S
				cards[cards.length - 1].mMimic = this.GetCopy(); // set its mimic value
				currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + cards[cards.length - 1].mCardAbility + ".");
			}
			
			if (orcWarrior == -1) { // if there is no orc warrior whose ability is active
				// update current attackvalue and squadsize
				currScene.SetAV(this.mCardValue);
				currScene.SetSS(cards.length);
				
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
				currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
				currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
				
				{ // ability
					if (currPlayer.mHand.mCards.length > 0) { // if player still has cards left in hand
						if (currScene.mGraveyard.mCards.length > 0) { // if there are cards in the graveyard
							for (var i = 0; i < currPlayer.mHand.mCards.length; ++i) { // for all cards in the player's hand
								currPlayer.mSelectedCards[i] = -1; // set status to locked
								
								if (currPlayer.mType == "Human") {
									currPlayer.mHand.mCards[i].mDarken = true;
								}
							}
							
							currPlayer.mMode = 12; // set current player's mode to A (human paladin ability)
							currScene.mLog.AddEntry(5, currPlayer.mName + " activated ability " + this.mCardAbility + ".");
							
							if (currPlayer.mType == "Human") {
								currScene.mGraveyard.SetView(true);
								
								currPlayer.mGUI.mButtons[0].mActive = false;
								currPlayer.mGUI.mButtonCovers[0].mActive = false;
								
								currPlayer.mGUI.ShowMessage(true, "Choose cards to take from the graveyard or pass.");
							}
						}
						else {
							currScene.ChangePlayer(); // change to the next player
						}
					}
					else {
						currScene.ChangePlayer(); // change to the next player
					}
				}
			}
			else {
				currPlayer.RemoveSelected(); // remove cards from current player's hands
				currScene.mGraveyard.AddCards(cards); // add the cards straight into the graveyard
				currScene.mLog.AddEntry(4, cards.length + "x " + this.mCardType + " " + this.mCardName + " was discarded due to Mmmm, Fresh Meat ability.");
				
				currScene.ChangePlayer(orcWarrior); // revert play to the player who owns the orc warrior
			}
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}
// ...End


// OogaahCardBeingOfEnergy class
function OogaahCardBeingOfEnergy() {
	OogaahCardBase.apply(this, null); // construct the base class
	
	this.mCardAttack = "S"; // the base attack value of the card (e.g., 1)
	this.mCardType = "Being"; // the type of the card (e.g., Goblin)
	this.mCardName = "of Energy"; // the name of the card (e.g., Horde)
	this.mCardAbility = "In Duplicate"; // the ability of the card (e.g., A Mob Mentality)
	
	this.mCardValue = 13; // the current value of the card
	
	this.mSplitRect = new Array();
	this.mSplitCircle = new Array();
	
	{
		this.mSplitRect[0] = new Shape();
		this.mSplitCircle[0] = new Shape();
		
		this.mSplitRect[1] = new Shape();
		this.mSplitRect[1].MakeRectangle(new Vec2(), new Vec2(90, 136));
		this.mSplitCircle[1] = new Shape();
		this.mSplitCircle[1].MakeCircle(new Vec2(), 15, 32);
		
		this.mSplitRect[2] = new Shape();
		this.mSplitRect[2].MakeRectangle(new Vec2(), new Vec2(54, 83));
		this.mSplitCircle[2] = new Shape();
		this.mSplitCircle[2].MakeCircle(new Vec2(), 9, 32);
	}
	
	this.mMimic = null; // a copy of the target card that this transformed into (retains when on battlefield or in graveyard)
};

// inherit the base class's prototype
OogaahCardBeingOfEnergy.prototype = Object.create(OogaahCardBase.prototype);

OogaahCardBeingOfEnergy.prototype.Copy = function(other) {
	this.mCardAttack = other.mCardAttack;
	this.mCardType = other.mCardType;
	this.mCardName = other.mCardName;
	this.mCardAbility = other.mCardAbility;
	
	this.mCardValue = other.mCardValue;
	
	this.mCardSprites[0].Copy(other.mCardSprites[0]);
	this.mCardSprites[1].Copy(other.mCardSprites[1]);
	this.mCardSprites[2].Copy(other.mCardSprites[2]);
	
	this.mCardBacks[0].Copy(other.mCardBacks[0]);
	this.mCardBacks[1].Copy(other.mCardBacks[1]);
	this.mCardBacks[2].Copy(other.mCardBacks[2]);
	
	this.mCardShapes[0].Copy(other.mCardShapes[0]);
	this.mCardShapes[1].Copy(other.mCardShapes[1]);
	this.mCardShapes[2].Copy(other.mCardShapes[2]);
	
	this.mHidden = other.mHidden;
	this.mSize = other.mSize;
	this.mDarken = other.mDarken;
	
	this.mSplitRect.splice(0, this.mSplitRect.length);
	this.mSplitRect = util.ConcatArray(this.mSplitRect, other.mSplitRect);
	
	this.mSplitCircle.splice(0, this.mSplitCircle.length);
	this.mSplitCircle = util.ConcatArray(this.mSplitCircle, other.mSplitCircle);
	
	if (other.mMimic != null) {
		this.mMimic = other.mMimic.GetCopy();
	}
	else {
		this.mMimic = null;
	}
}

OogaahCardBeingOfEnergy.prototype.GetCopy = function() {
	var c = new OogaahCardBeingOfEnergy(); c.Copy(this);
	
	return c;
}

// returns the data required to render this card base
OogaahCardBeingOfEnergy.prototype.GetRenderData = function() {
	var arr = new Array(); // returned array holding the renderables
	
	if (this.mHidden == false) { // if the card isn't hidden
		arr.push(this.mCardSprites[this.mSize]); // add the appropiately size face sprite
		
		if (this.mMimic != null) {
			arr.push(this.mSplitRect[this.mSize]);
			
			if (this.mMimic.mCardAttack == "3") {
				if (this.mMimic.mCardValue - 3 > 0) { // if the card attack has been modified due to ability
					arr.push(this.mMimic.mSplitShape[this.mSize]);
					arr.push(this.mMimic.mValueText[this.mSize]); // display the appropiate modification
				}
			}
			else if (this.mMimic.mCardAttack == "C") {
				if (this.mMimic.mCardValue - 10 < 0) { // if the card attack has been modified due to ability
					arr.push(this.mMimic.mSplitShape[this.mSize]);
					arr.push(this.mMimic.mValueText[this.mSize]); // display the appropiate modification
				}
			}
			else {
				arr.push(this.mSplitCircle[this.mSize]);
			}
		}
	}
	else { // otherwise the card is hidden
		arr.push(this.mCardBacks[this.mSize]); // add the appropiately size back sprite
	}
	
	if (this.mDarken == true) { // 
		arr.push(this.mCardShapes[this.mSize]);
	}
	
	return arr; // return the renderables array
}

OogaahCardBeingOfEnergy.prototype.Play = function(cards) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	var currPlayer = currScene.mPlayers[currScene.mCurrPlayer]; // reference to the current player
	
	if (currPlayer.mMode == 0) { // if the current player is in "regular play" mode
		// if the value is greater than the current attackvalue and the size of the squad is greater than the current squadsize
		// and values aren't reversed or if it is less but values are reversed
		if (((this.mCardValue > currScene.mCurrAV && currScene.mReversed == false) ||
				(this.mCardValue < currScene.mCurrAV && currScene.mReversed == true)) &&
				(cards.length == currScene.mCurrSS || currScene.mCurrSS == 0)) {
			
			// whilst the orc warrior's ability won't affect this card it's still important to handle it as it will
			// reset the status of the warrior's ability for future plays
			this.HandleOrcWarrior();
			
			// update current attackvalue and squadsize
			currScene.SetAV(this.mCardValue);
			currScene.SetSS(cards.length);
			
			currPlayer.RemoveSelected(); // remove cards from current player's hands
			currScene.mBattlefield.AddCards(cards); // add the cards to the battlefield
			currScene.mLastPlayer = currScene.mCurrPlayer; // set last player to current player
			currScene.mLog.AddEntry(1, currPlayer.mName + " played " + cards.length + "x " + this.mCardType + " " + this.mCardName + ".");
			
			currScene.ChangePlayer(); // change to the next player
			
			return true; // valid
		}
	}
	else if (currPlayer.mMode == 5) { // if the current player is in "goblin technician" mode
		this.HandleCardSwap(cards);
		
		return true; // valid
	}
	else if (currPlayer.mMode == 8) { // if the current player is in "human mage" mode
		this.HandleHumanMage(cards);
		
		return true; // valid
	}
	
	return false; // invalid
}

// 
OogaahCardBeingOfEnergy.prototype.PositionClip = function() {
	{
		var medSpr = this.mCardSprites[1];
		
		this.mSplitRect[1].SetOrigin(medSpr.mOrigin);
		this.mSplitRect[1].SetPosition(medSpr.mPos);
		this.mSplitRect[1].mPos.mX += 15; this.mSplitRect[1].mPos.mY += 15;
		this.mSplitRect[1].SetPosition(this.mSplitRect[1].mPos);
		this.mSplitRect[1].mDepth = medSpr.mDepth;
		
		this.mSplitCircle[1].SetOrigin(medSpr.mOrigin);
		this.mSplitCircle[1].SetPosition(medSpr.mPos);
		this.mSplitCircle[1].mPos.mX += medSpr.mSize.mX - 26; this.mSplitCircle[1].mPos.mY += medSpr.mSize.mY - 18;
		this.mSplitCircle[1].SetPosition(this.mSplitCircle[1].mPos);
		this.mSplitCircle[1].mDepth = medSpr.mDepth;
		
		var mimicMedSpr = this.mMimic.mCardSprites[1];
		mimicMedSpr.SetRotation(0);
		mimicMedSpr.SetOrigin(new Vec2());
		mimicMedSpr.mDepth = medSpr.mDepth; 
		
		mimicMedSpr.SetPosition(new Vec2(-15, -15));
		this.mSplitRect[1].mSprite = mimicMedSpr.GetCopy();
		
		mimicMedSpr.SetPosition(new Vec2(-(medSpr.mSize.mX - 26), -(medSpr.mSize.mY - 18)));
		this.mSplitCircle[1].mSprite = mimicMedSpr.GetCopy();
	}
	
	{
		var smlSpr = this.mCardSprites[2];
		
		this.mSplitRect[2].SetOrigin(smlSpr.mOrigin);
		this.mSplitRect[2].SetPosition(smlSpr.mPos);
		this.mSplitRect[2].mPos.mX += 9; this.mSplitRect[2].mPos.mY += 9;
		this.mSplitRect[2].SetPosition(this.mSplitRect[2].mPos);
		this.mSplitRect[2].mDepth = smlSpr.mDepth;
		
		this.mSplitCircle[2].SetOrigin(smlSpr.mOrigin);
		this.mSplitCircle[2].SetPosition(smlSpr.mPos);
		this.mSplitCircle[2].mPos.mX += smlSpr.mSize.mX - 15; this.mSplitCircle[2].mPos.mY += smlSpr.mSize.mY - 10;
		this.mSplitCircle[2].SetPosition(this.mSplitCircle[2].mPos);
		this.mSplitCircle[2].mDepth = smlSpr.mDepth;
		
		var mimicSmlSpr = this.mMimic.mCardSprites[2];
		mimicSmlSpr.SetRotation(0);
		mimicSmlSpr.SetOrigin(new Vec2());
		mimicSmlSpr.mDepth = smlSpr.mDepth; 
		
		mimicSmlSpr.SetPosition(new Vec2(-9, -9));
		this.mSplitRect[2].mSprite = mimicSmlSpr.GetCopy();
		
		mimicSmlSpr.SetPosition(new Vec2(-(smlSpr.mSize.mX - 15), -(smlSpr.mSize.mY - 10)));
		this.mSplitCircle[2].mSprite = mimicSmlSpr.GetCopy();
	}
	
	if (this.mMimic.mCardAttack == "3" || this.mMimic.mCardAttack == "C") {
		this.PositionValueText();
	}
}

OogaahCardBeingOfEnergy.prototype.PositionValueText = function() {
	if (this.mMimic != null) {
		if (this.mMimic.mCardAttack == "3" || this.mMimic.mCardAttack == "C") {
			var lrgSpr = this.mCardSprites[0];
			this.mMimic.mValueText[0].SetPosition(new Vec2(Math.round(nmain.game.mCanvasSize.mX / 3) + Math.round(lrgSpr.mSize.mX / 2) - 59,
					Math.round(nmain.game.mCanvasSize.mY / 2) + Math.round(lrgSpr.mSize.mY / 2) - 93));
			this.mMimic.mValueText[0].mDepth = lrgSpr.mDepth;
			
			var medSpr = this.mCardSprites[1];
			var medPos = new Vec2(); medPos.Copy(medSpr.mPos);
			medPos.mX -= medSpr.mOrigin.mX; medPos.mY -= medSpr.mOrigin.mY;
			this.mMimic.mValueText[1].SetPosition(new Vec2(medPos.mX + medSpr.mSize.mX - 26, medPos.mY + medSpr.mSize.mY - 42));
			this.mMimic.mValueText[1].mDepth = medSpr.mDepth;
			
			var smlSpr = this.mCardSprites[2];
			var smlPos = new Vec2(); smlPos.Copy(smlSpr.mPos);
			smlPos.mX -= smlSpr.mOrigin.mX; smlPos.mY -= smlSpr.mOrigin.mY;
			this.mMimic.mValueText[2].SetPosition(new Vec2(smlPos.mX + smlSpr.mSize.mX - 15, smlPos.mY + smlSpr.mSize.mY - 25));
			this.mMimic.mValueText[2].mDepth = smlSpr.mDepth;
			
			for (var i = 0; i < this.mCardSprites.length; ++i) {
				this.mMimic.mSplitShape[i].SetPosition(new Vec2(this.mCardSprites[i].mPos.mX + this.mCardSprites[i].mSize.mX,
						this.mCardSprites[i].mPos.mY + this.mCardSprites[i].mSize.mY));
				this.mMimic.mSplitShape[i].SetOrigin(this.mCardSprites[i].mOrigin);
			}
			
			{
				var ss0 = this.mMimic.mSplitShape[0];
				ss0.SetPosition(new Vec2(ss0.mPos.mX - 56, ss0.mPos.mY - 40));
				ss0.mDepth = lrgSpr.mDepth;
				
				var ss1 = this.mMimic.mSplitShape[1];
				ss1.SetPosition(new Vec2(ss1.mPos.mX - 26, ss1.mPos.mY - 18));
				ss1.mDepth = medSpr.mDepth;
				
				var ss2 = this.mMimic.mSplitShape[2];
				ss2.SetPosition(new Vec2(ss2.mPos.mX - 15, ss2.mPos.mY - 10));
				ss2.mDepth = smlSpr.mDepth;
			}
		}
	}
}
// ...End


