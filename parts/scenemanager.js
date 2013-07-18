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

