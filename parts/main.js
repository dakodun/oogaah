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
