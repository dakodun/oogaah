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
	var noShow = 0; // assume tab is visible
	// if the page visibility spec is available
	if (document.hidden !== 'undefined' || document.msHidden !== 'undefined' || document.webkitHidden !== 'undefined') {
		// if the document is hidden
		if (document.hidden == true || document.msHidden == true || document.webkitHidden == true) {
			noShow = 1;
		}
	}
	else { // otherwise spec isn't available
		noShow = -1; // use naive workaround
	}
	
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
		
		// if we are integrating and the tab is visible
		if (this.mIntergrate == true && noShow == 0) {
			this.mAccum -= (1 / this.mFrameLimit); // decrease the accumulator
		}
		else if (this.mIntergrate == false || noShow == 1 || noShow == -1) {
			
			// otherwise we are not integrating or the tab is hidden
			// or we are using workaround
			
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

