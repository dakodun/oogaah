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

