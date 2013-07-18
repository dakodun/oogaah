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
// ...End

