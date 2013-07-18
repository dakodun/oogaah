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
		nmgrs.resLoad.QueueFont("poetsen", "./res/sys/PoetsenOne-Regular");
		nmgrs.resLoad.QueueFont("sansRegular", "./res/sys/Sansation_Regular");
		nmgrs.resLoad.QueueFont("sansBold", "./res/sys/Sansation_Bold");
		nmgrs.resLoad.QueueFont("monaco", "./res/sys/monaco");
		nmgrs.resLoad.QueueFont("oldmansans", "./res/sys/OldSansBlack");
		
		// card textures
		nmgrs.resLoad.QueueTexture("cardsLarge", "./res/vis/cardsLarge.png");
		nmgrs.resLoad.QueueTexture("cardsMedium", "./res/vis/cardsMedium.png");
		nmgrs.resLoad.QueueTexture("cardsSmall", "./res/vis/cardsSmall.png");
		nmgrs.resLoad.QueueTexture("cardBackLarge", "./res/vis/cardBackLarge.png");
		nmgrs.resLoad.QueueTexture("cardBackMedium", "./res/vis/cardBackMedium.png");
		nmgrs.resLoad.QueueTexture("cardBackSmall", "./res/vis/cardBackSmall.png");
		nmgrs.resLoad.QueueTexture("cardBundleMedium", "./res/vis/cardBundleMedium.png");
		nmgrs.resLoad.QueueTexture("cardBundleSmall", "./res/vis/cardBundleSmall.png");
		
		nmgrs.resLoad.QueueTexture("buttonLarge", "./res/vis/buttonLarge.png");
		nmgrs.resLoad.QueueTexture("buttonSmall", "./res/vis/buttonSmall.png");
		nmgrs.resLoad.QueueTexture("buttonGraveyardArrow", "./res/vis/buttonGraveyardArrow.png");
		
		nmgrs.resLoad.QueueTexture("logIcons", "./res/vis/logIcons.png");
		nmgrs.resLoad.QueueTexture("logBack", "./res/vis/logBack.png");
		nmgrs.resLoad.QueueTexture("logFront", "./res/vis/logFront.png");
		
		nmgrs.resLoad.QueueTexture("optionsCheck", "./res/vis/optionsCheck.png");
		
		nmgrs.resLoad.QueueTexture("statusAVBack", "./res/vis/statusAVBack.png");
		nmgrs.resLoad.QueueTexture("statusSSBack", "./res/vis/statusSSBack.png");
		nmgrs.resLoad.QueueTexture("statusIcons", "./res/vis/statusIcons.png");
		
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

