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

