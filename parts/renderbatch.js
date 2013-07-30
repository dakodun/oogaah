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

