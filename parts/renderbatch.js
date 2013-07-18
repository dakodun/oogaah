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
	// use the supplied target (canvas) if valid, otherwise use the main 
	var targ = nmain.game.mCurrCanvas;
	if (target != null) {
		targ = target;
	}
	
	var targContext = targ.getContext("2d"); // get the conext associated with the canvas
	
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
	
	var context = targContext;
	var cullRect = new Polygon();
	cullRect.MakeRectangle(new Vec2(0, 0), new Vec2(targ.width, targ.height));
	
	if (camera != null) { // if a camera was supplied
		cullRect.mPos.Copy(camera.mPos);
		
		if (camera.Type() == "Camera") {
			camera.Clear(); // clear the camera's context
			context = camera.mContext;
			
			cullRect.MakeRectangle(camera.mPos, camera.mSize);
		}
		
		for (var i = 0; i < this.mRenderData.length; ++i) {
			if (this.mRenderData[i].mAbsolute == false) { // if the renderable is not absolute
				context.save(); // save the current transformation
				context.translate(-camera.mPos.mX, -camera.mPos.mY); // apply translation
			}
			
			this.mRenderData[i].Render(context, this.mFrustrumCull, cullRect); // render the renderable to the camera's context
			
			if (this.mRenderData[i].mAbsolute == false) {
				context.restore(); // restore the previous transformation
			}
		}
		
		if (camera.Type() == "Camera") {
			camera.Render(targContext); // render the camera to the target context
		}
	}
	else { // otherwise no camera supplied
		for (var i = 0; i < this.mRenderData.length; ++i) {
			this.mRenderData[i].Render(targContext, this.mFrustrumCull, cullRect); // render straight to the target context
		}
	}
}
// ...End

