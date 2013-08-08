// OogaahTutorialScene Class...
// 
function OogaahTutorialScene() {
	OogaahGameScene.apply(this, null); // construct the base class
	
	this.mPlayers[0] = new OogaahTutorialHuman();
};

// inherit the base class's prototype
OogaahTutorialScene.prototype = Object.create(OogaahGameScene.prototype);

// initialises the scene object
OogaahTutorialScene.prototype.SetUp = function() {
	this.mBatch.mFrustrumCull = false;
	
	{
		var tex = nmgrs.resMan.mTexStore.GetResource("gameBack");
		this.mGameBack.SetTexture(tex);
		this.mGameBack.SetPosition(new Vec2(2, 2));
		this.mGameBack.mDepth = 99999;
	}
	
	this.CreateCardList();
	this.DealCards(0);
	
	this.mGraveyard.SetUp();
	
	for (var i = 0; i < this.mPlayers.length; ++i) {
		this.mPlayers[i].SetUp(i);
		this.mPlayers[i].PositionHand();
	}
	
	this.mPlayers[0].mDesired.push(new Array(this.mCardList[1], this.mCardList[1]));
	this.mPlayers[0].mDesiredMessages.push("No, play 2x Goblin Overseers!");
	this.mPlayers[0].mDesired.push(new Array(this.mCardList[0]));
	this.mPlayers[0].mDesiredMessages.push("No, play your Goblin Horde!");
	this.mPlayers[0].mDesired.push(new Array());
	this.mPlayers[0].mDesiredMessages.push("No, pass your turn!");
	this.mPlayers[0].mDesired.push(new Array(this.mCardList[2]));
	this.mPlayers[0].mDesiredMessages.push("No, play your Human Peasant!");
	this.mPlayers[0].mDesired.push(new Array(this.mCardList[12]));
	this.mPlayers[0].mDesiredMessages.push("No, play your Being of Energy!");
	this.mPlayers[0].mDesired.push(new Array(this.mCardList[9]));
	this.mPlayers[0].mDesiredMessages.push("No, play your Orc Berserker!");
	this.mPlayers[0].mDesired[this.mPlayers[0].mDesired.length - 1][0].ModifyValue(-3);
	
	this.mLog.SetUp();
	this.mLog.SetLoggedActions(noogaah.options.mLogOptions);
	
	for (var i = 0; i < this.mPlayers.length; ++i) {
		if (this.mPlayers[i].mType == "AI") {
			var behaviour = new OogaahBehaviourTutorial();
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
}

OogaahTutorialScene.prototype.DealCards = function(first) {
	this.mCurrPlayer = first; // set the current player
	
	{
		this.mPlayers[0].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[0].mHand.AddCard(this.mCardList[1]);
		this.mPlayers[0].mHand.AddCard(this.mCardList[1]);
		
		this.mPlayers[0].mHand.AddCard(this.mCardList[2]);
		
		this.mPlayers[0].mHand.AddCard(this.mCardList[9]);
		
		this.mPlayers[0].mHand.AddCard(this.mCardList[12]);
	}
	
	{
		this.mPlayers[1].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[1].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[1].mHand.AddCard(this.mCardList[0]);
		this.mPlayers[1].mHand.AddCard(this.mCardList[1]);
	}
	
	{
		this.mPlayers[2].mHand.AddCard(this.mCardList[8]);
		
		this.mPlayers[2].mHand.AddCard(this.mCardList[9]);
		this.mPlayers[2].mHand.AddCard(this.mCardList[9]);
		this.mPlayers[2].mHand.AddCard(this.mCardList[9]);
	}
}
// ...End

