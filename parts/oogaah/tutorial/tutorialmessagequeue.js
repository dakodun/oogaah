// OogaahTutorialMessage Class...
// 
function OogaahTutorialMessage() {
	this.mPos = new Vec2();
	this.mSize = new Vec2();
	
	this.mCanContinue = true;
	this.mContinueTimer = 0;
	this.mArrowDirection = -1;
	
	this.mShape = new Shape();
	this.mShapeInnerOutline = new Shape();
	this.mShapeOuterOutline = new Shape();
	this.mShapeBack = new Shape();
	this.mShapeArrow = new Shape();
	
	this.mText = new Text();
	this.mTextContinue = new Text();
	
	{
		this.mShape.mColour = "#111111";
		this.mShape.mAlpha = 0.95;
		this.mShape.mDepth = -1000;
		
		this.mShapeInnerOutline.mColour = "#111111";
		this.mShapeInnerOutline.mRenderStyle = "LineLoop";
		this.mShapeInnerOutline.mLineWidth = 3;
		this.mShapeInnerOutline.mDepth = -1000;
		
		this.mShapeOuterOutline.mColour = "#CD4242";
		this.mShapeOuterOutline.mRenderStyle = "LineLoop";
		this.mShapeOuterOutline.mLineWidth = 8;
		this.mShapeOuterOutline.mDepth = -1000;
		
		this.mShapeBack.mColour = "#000000";
		this.mShapeBack.mAlpha = 0.4;
		this.mShapeBack.mDepth = -1000;
		
		var fnt = nmgrs.resMan.mFontStore.GetResource("kingthings");
		this.mText.SetOrigin(new Vec2(-5, 0));
		this.mText.SetFont(fnt);
		this.mText.SetFontSize(16);
		this.mText.mAlign = "justify";
		this.mText.mDepth = -1000;
		this.mText.mVSpacing = 0.9;
		
		this.mTextContinue.SetFont(fnt);
		this.mTextContinue.SetFontSize(16);
		this.mTextContinue.mAlign = "right";
		this.mTextContinue.mDepth = -1000;
		this.mTextContinue.SetString("Left click to continue...");
	}
	
	this.mFade = new OogaahMessageFade();
	this.mFade.CreateFade();
};

OogaahTutorialMessage.prototype.CreateMessage = function() {
	var arr = new Array();
	arr.push(new Vec2(this.mSize.mX, 0));
	arr.push(new Vec2(this.mSize.mX, this.mSize.mY + 20));
	arr.push(new Vec2(0, this.mSize.mY + 20));
	
	if (this.mArrowDirection >= 0) {
		for (var i = 0; i < this.mShapeArrow.mPoints.length; ++i) {
			var v = this.mShapeArrow.mPoints[i].GetCopy();
			arr.splice(this.mArrowDirection, 0, v);
		}
	}
	
	this.mShape.Clear();
	this.mShape.SetPosition(this.mPos);
	this.mShape.AddPoints(arr);
	
	this.mShapeInnerOutline.Clear();
	this.mShapeInnerOutline.SetPosition(this.mPos);
	this.mShapeInnerOutline.AddPoints(arr);
	
	this.mShapeOuterOutline.Clear();
	this.mShapeOuterOutline.SetPosition(this.mPos);
	this.mShapeOuterOutline.AddPoints(arr);
	
	{
		var thickness = 14;
		
		this.mShapeBack.Clear();
		this.mShapeBack.SetPosition(new Vec2(this.mPos.mX, this.mPos.mY - thickness));
		this.mShapeBack.AddPoint(new Vec2(this.mSize.mX, 0));
		this.mShapeBack.AddPoint(new Vec2(this.mSize.mX + thickness, thickness));
		this.mShapeBack.AddPoint(new Vec2(this.mSize.mX + thickness, this.mSize.mY + 20 + thickness));
		this.mShapeBack.AddPoint(new Vec2(this.mSize.mX, this.mSize.mY + 20 + (thickness * 2)));
		this.mShapeBack.AddPoint(new Vec2(0, this.mSize.mY + 20 + (thickness * 2)));
		this.mShapeBack.AddPoint(new Vec2(-thickness, this.mSize.mY + 20 + thickness));
		this.mShapeBack.AddPoint(new Vec2(-thickness, thickness));
	}
}

OogaahTutorialMessage.prototype.SetArrow = function(direction, offset) {
	this.mShapeArrow.Clear();
	var offs = offset;
	
	switch (direction) {
		case "up" :
			if (offs > this.mSize.mX - 36) {
				offs = this.mSize.mX - 36;
			}
			
			this.mShapeArrow.AddPoint(new Vec2(offs, 0));
			this.mShapeArrow.AddPoint(new Vec2(offs + 18, -16));
			this.mShapeArrow.AddPoint(new Vec2(offs + 36, 0));
			this.mArrowDirection = 0;
			break;
		case "right" :
			if (offs > this.mSize.mY - 16) {
				offs = this.mSize.mY - 16;
			}
			
			this.mShapeArrow.AddPoint(new Vec2(this.mSize.mX, offs));
			this.mShapeArrow.AddPoint(new Vec2(this.mSize.mX + 16, offs + 18));
			this.mShapeArrow.AddPoint(new Vec2(this.mSize.mX, offs + 36));
			this.mArrowDirection = 1;
			break;
		case "down" :
			if (offs > this.mSize.mX - 36) {
				offs = this.mSize.mX - 36;
			}
			
			this.mShapeArrow.AddPoint(new Vec2(0 + offs, this.mSize.mY + 20));
			this.mShapeArrow.AddPoint(new Vec2(0 + offs + 18, this.mSize.mY + 36));
			this.mShapeArrow.AddPoint(new Vec2(0 + offs + 36, this.mSize.mY + 20));
			this.mArrowDirection = 2;
			break;
		case "left" :
			if (offs > this.mSize.mY - 16) {
				offs = this.mSize.mY - 16;
			}
			
			this.mShapeArrow.AddPoint(new Vec2(0, offs));
			this.mShapeArrow.AddPoint(new Vec2(0 - 16, offs + 18));
			this.mShapeArrow.AddPoint(new Vec2(0, offs + 36));
			this.mArrowDirection = 3;
			break;
	}
}

OogaahTutorialMessage.prototype.SetTimeout = function(time) {
	this.mCanContinue = false;
	this.mContinueTimer = time;
}
// ...End


// OogaahTutorialMessageQueue Class...
// 
function OogaahTutorialMessageQueue() {
	this.mQueue = new Array();
};

OogaahTutorialMessageQueue.prototype.PushMessage = function(pos, string, size, direction, offset, fadePos, fadeSize) {
	var msg = new OogaahTutorialMessage();
	
	msg.mPos.Copy(pos);
	msg.mSize.Copy(size);
	msg.SetArrow(direction, offset);
	
	msg.mText.SetPosition(pos);
	msg.mText.SetString(string);
	msg.mText.EnableWrapping(size.mX - 10, 10);
	
	msg.mTextContinue.SetPosition(pos);
	msg.mTextContinue.SetOrigin(new Vec2(-size.mX + 5, -size.mY + 2));
	
	msg.CreateMessage();
	
	if (fadePos != null) {
		msg.mFade.CreateFade(fadePos, fadeSize);
	}
	
	this.mQueue.push(msg);
}

OogaahTutorialMessageQueue.prototype.InsertMessage = function(pos, string, size, direction, offset, fadePos, fadeSize, id) {
	var msg = new OogaahTutorialMessage();
	
	msg.mPos.Copy(pos);
	msg.mSize.Copy(size);
	msg.SetArrow(direction, offset);
	
	msg.mText.SetPosition(pos);
	msg.mText.SetString(string);
	msg.mText.EnableWrapping(size.mX - 10, 10);
	
	msg.mTextContinue.SetPosition(pos);
	msg.mTextContinue.SetOrigin(new Vec2(-size.mX + 5, -size.mY + 2));
	
	msg.CreateMessage();
	
	if (fadePos != null) {
		msg.mFade.CreateFade(fadePos, fadeSize);
	}
	
	var insertPos = id;
	if (insertPos > this.mQueue.length) {
		insertPos = this.mQueue.length;
	}
	else if (insertPos < 0) {
		insertPos = 0;
	}
	
	this.mQueue.splice(insertPos, 0, msg);
}

OogaahTutorialMessageQueue.prototype.PopMessage = function() {
	if (this.mQueue.length > 0) {
		this.mQueue.splice(0, 1);
	}
}

OogaahTutorialMessageQueue.prototype.Input = function() {
	if (this.mQueue.length > 0) {
		if (this.mQueue[0].mCanContinue == true) {
			if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true &&
					nmgrs.inputMan.GetMouseInCanvas() == true) {
				
				this.PopMessage();
				return true;
			}
		}
	}
	
	return false;
}

OogaahTutorialMessageQueue.prototype.Process = function() {
	if (this.mQueue.length > 0) {
		if (this.mQueue[0].mCanContinue == false) {
			this.mQueue[0].mContinueTimer -= 1 / nmain.game.mFrameLimit;
			if (this.mQueue[0].mContinueTimer <= 0) {
				this.mQueue[0].mCanContinue = true;
			}
		}
	}
}

OogaahTutorialMessageQueue.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mQueue.length > 0) {
		arr = util.ConcatArray(arr, this.mQueue[0].mFade.GetRenderData());
		arr.push(this.mQueue[0].mShapeBack);
		
		arr.push(this.mQueue[0].mShapeOuterOutline);
		arr.push(this.mQueue[0].mShape);
		arr.push(this.mQueue[0].mShapeInnerOutline);
		
		arr.push(this.mQueue[0].mText);
		
		if (this.mQueue[0].mCanContinue == true) {
			arr.push(this.mQueue[0].mTextContinue);
		}
	}
	
	return arr;
}
// ...End


// OogaahMessageFade Class...
//
function OogaahMessageFade() {
	this.mShapes = new Array();
	this.mShapes[0] = new Shape();
	this.mShapes[1] = new Shape();
	this.mShapes[2] = new Shape();
	this.mShapes[3] = new Shape();
	
	for (var i = 0; i < this.mShapes.length; ++i) {
		this.mShapes[i].mDepth = -1000;
		this.mShapes[i].mColour = "#000000";
		this.mShapes[i].mAlpha = 0.7;
	}
};

OogaahMessageFade.prototype.CreateFade = function(pos, size) {
	for (var i = 0; i < this.mShapes.length; ++i) {
		this.mShapes[i].Clear();
	}
	
	if (pos == null) {
		this.mShapes[0].MakeRectangle(new Vec2(0, 0), new Vec2(nmain.game.mCanvasSize.mX, nmain.game.mCanvasSize.mY));
	}
	else {
		this.mShapes[0].MakeRectangle(new Vec2(0, 0), new Vec2(nmain.game.mCanvasSize.mX, pos.mY));
		this.mShapes[1].MakeRectangle(new Vec2(0, pos.mY), new Vec2(pos.mX, size.mY));
		this.mShapes[2].MakeRectangle(new Vec2(pos.mX + size.mX, pos.mY), new Vec2(nmain.game.mCanvasSize.mX, size.mY));
		this.mShapes[3].MakeRectangle(new Vec2(0, pos.mY + size.mY), new Vec2(nmain.game.mCanvasSize.mX, nmain.game.mCanvasSize.mY));
	}
}

OogaahMessageFade.prototype.GetRenderData = function() {
	var arr = new Array();
	
	for (var i = 0; i < this.mShapes.length; ++i) {
		arr.push(this.mShapes[i]);
	}
	
	return arr;
}
// ...End

