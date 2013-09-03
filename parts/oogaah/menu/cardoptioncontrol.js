// OogaahCardOptionControl Class...
// ui for selecting a specific card tutorial
function OogaahCardOptionControl() {
	this.mCardSprites = new Array(); // array of visible card sprites
	
	this.mCurrentOption = -1; // the current highlighted sprite
	this.mCurrentCard = 0; // the current card id (left-most)
	
	// arrow buttons to control the current card id
	this.mLeftArrow = new GUIButton();
	this.mRightArrow = new GUIButton();
	
	this.mContent = null; // the tutorial content that we'll run when a card is clicked
};

// sets up the ui
OogaahCardOptionControl.prototype.SetUp = function() {
	var texCards = nmgrs.resMan.mTextureStore.GetResource("cardsMedium"); // card texture
	var xPos = 110; // initial card sprite x-position
	
	for (var i = 0; i < 3; ++i) {
		// set up a card sprite and add it to the array
		var sprCard = new Sprite();
		sprCard.SetTexture(texCards, 13, 5, -1, -1);
		sprCard.SetCurrentFrame(i);
		sprCard.SetPosition(new Vec2(xPos, 212));
		sprCard.SetMask();
		sprCard.mAlpha = 0.5;
		this.mCardSprites.push(sprCard);
		
		xPos += 150; // increment the x-position
	}
	
	{ // set up the arrow buttons
		var arrowTex = nmgrs.resMan.mTextureStore.GetResource("buttonGraveyardArrow");
		this.mLeftArrow.SetUp(new Vec2(34, 320), new Vec2(25, 50), -51);
		this.mLeftArrow.mSpriteIdle.SetTexture(arrowTex, 8, 2, -1, -1); this.mLeftArrow.mSpriteIdle.SetCurrentFrame(0);
		this.mLeftArrow.mSpriteHover.SetTexture(arrowTex, 8, 2, -1, -1); this.mLeftArrow.mSpriteHover.SetCurrentFrame(2);
		this.mLeftArrow.mSpriteDown.SetTexture(arrowTex, 8, 2, -1, -1); this.mLeftArrow.mSpriteDown.SetCurrentFrame(4);
		this.mLeftArrow.mSpriteInactive.SetTexture(arrowTex, 8, 2, -1, -1); this.mLeftArrow.mSpriteInactive.SetCurrentFrame(6);
		
		this.mRightArrow.SetUp(new Vec2(nmain.game.mCanvasSize.mX - 60, 320), new Vec2(25, 50), -51);
		this.mRightArrow.mSpriteIdle.SetTexture(arrowTex, 8, 2, -1, -1); this.mRightArrow.mSpriteIdle.SetCurrentFrame(1);
		this.mRightArrow.mSpriteHover.SetTexture(arrowTex, 8, 2, -1, -1); this.mRightArrow.mSpriteHover.SetCurrentFrame(3);
		this.mRightArrow.mSpriteDown.SetTexture(arrowTex, 8, 2, -1, -1); this.mRightArrow.mSpriteDown.SetCurrentFrame(5);
		this.mRightArrow.mSpriteInactive.SetTexture(arrowTex, 8, 2, -1, -1); this.mRightArrow.mSpriteInactive.SetCurrentFrame(7);
	}
}

// user ui input
OogaahCardOptionControl.prototype.Input = function() {
	// handle arrow button input
	this.mLeftArrow.Input();
	this.mRightArrow.Input();
	
	if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if the left mouse button is clicked
		if (this.mCurrentOption > -1) { // if a card sprite is highlighted
			this.SetContent(); // set the related tutorial content
			return 0; // return 0 (clicked)
		}
	}
	
	return -1; // return -1 (not clicked)
}

// process ui
OogaahCardOptionControl.prototype.Process = function() {
	this.mCurrentOption = -1; // reset the current highlighted card sprite
	
	// process arrow buttons
	this.mLeftArrow.Process(null);
	this.mRightArrow.Process(null);
	
	if (this.mCurrentCard > 0) { // if the current card id is greater than 0
		if (this.mLeftArrow.OnClick()) { // if the left arrow is clicked
			this.mCurrentCard--; // decrement the current card id
			this.Update(); // update the displayed card sprites
		}
	}
	
	if (this.mCurrentCard < 13 - 3) { // if the current card id is less than number of cards minus 3
		if (this.mRightArrow.OnClick()) { // if the right arrow is clicked
			this.mCurrentCard++; // increment the current card id
			this.Update(); // update the displayed card sprites
		}
	}
	
	for (var i = 0; i < this.mCardSprites.length; ++i) { // for all card sprites
		this.mCardSprites[i].mAlpha = 0.5; // set the alpha
		
		if (this.mCurrentOption == -1) { // if we're not highlighting anything else
			var p = new Vec2(); p.Copy(nmgrs.inputMan.GetLocalMouseCoords()); // get mouse position
			var polygon = this.mCardSprites[i].mGlobalMask.GetAbsolute(); // get mask of card sprite
			
			if (util.PointInConvex(p, polygon) == true ) { // if the mouse is inside the mask
				this.mCurrentOption = i; // set the current option
				this.mCardSprites[i].mAlpha = 1.0; // set the alpha
			}
		}
	}
}

// returns the ui's renderables
OogaahCardOptionControl.prototype.GetRenderData = function() {
	var arr = new Array(); // an array of renderables relating to the card options
	
	if (this.mCurrentCard > 0) { // if the current card is 1 or more
		arr = util.ConcatArray(arr, this.mLeftArrow.GetRenderData()); // add left arrow
	}
	
	if (this.mCurrentCard < 13 - 3) { // if the current card is less than max cards minus 3
		arr = util.ConcatArray(arr, this.mRightArrow.GetRenderData()); // add right arrow
	}
	
	for (var i = 0; i < this.mCardSprites.length; ++i) { // for all card sprites
		arr.push(this.mCardSprites[i]); // add to the array
	}
	
	return arr; // return the card option renderables
}

// updates the displayed card sprites
OogaahCardOptionControl.prototype.Update = function() {
	for (var i = 0; i < this.mCardSprites.length; ++i) { // for all card sprites
		// update the current frame depending on the current card id
		this.mCardSprites[i].SetCurrentFrame(this.mCurrentCard + i);
	}
}

// set's the tutorial content depending on the selected card
OogaahCardOptionControl.prototype.SetContent = function() {
	// depending on the card sprite selected and the current card id
	switch (this.mCurrentOption + this.mCurrentCard) {
		case 0 : // if the card was a goblin horde
			this.mContent = new OogaahTutorialContent31(); // set to the goblin horde tutorial
			break;
		case 1 :
			this.mContent = new OogaahTutorialContent32();
			break;
		case 2 :
			this.mContent = new OogaahTutorialContent33();
			break;
		case 3 :
			this.mContent = new OogaahTutorialContent34();
			break;
		case 4 :
			this.mContent = new OogaahTutorialContent35();
			break;
		case 5 :
			this.mContent = new OogaahTutorialContent36();
			break;
		case 6 :
			this.mContent = new OogaahTutorialContent37();
			break;
		case 7 :
			this.mContent = new OogaahTutorialContent38();
			break;
		case 8 :
			this.mContent = new OogaahTutorialContent39();
			break;
		case 9 :
			this.mContent = new OogaahTutorialContent3C();
			break;
		case 10 :
			this.mContent = new OogaahTutorialContent3B();
			break;
		case 11 :
			this.mContent = new OogaahTutorialContent3A();
			break;
		case 12 :
			this.mContent = new OogaahTutorialContent3S();
			break;
	}
}
// ...End