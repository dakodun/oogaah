// GUIListBox Class...
function GUIListBox() {
	this.mPos = new Vec2(0, 0);
	this.mDepth = 0;
	
	this.mTopArrow = new GUIButton();
	this.mBottomArrow = new GUIButton();
	
	this.mItemTop = 0;
	this.mItemsMax = 1;
	this.mItems = new Array();
	this.mItemsText = new Array();
	
	this.mSelected = -1;
	this.mSelectedShape = new Shape();
	
	this.mHover = false;
};

GUIListBox.prototype.SetUp = function(pos, depth, arrowTex) {
	this.mPos.Copy(pos);
	this.mDepth = depth;
	
	{
		var tex = nmgrs.resMan.mTextureStore.GetResource(arrowTex);
		
		{
			this.mTopArrow.SetUp(pos, new Vec2(0, 0), this.mDepth);
			
			this.mTopArrow.mSpriteIdle.SetTexture(tex, 6, 2, -1, -1);
			this.mTopArrow.mSpriteIdle.SetCurrentFrame(0);
			
			this.mTopArrow.mSpriteHover.SetTexture(tex, 6, 2, -1, -1);
			this.mTopArrow.mSpriteHover.SetCurrentFrame(2);
			
			this.mTopArrow.mSpriteDown.SetTexture(tex, 6, 2, -1, -1);
			this.mTopArrow.mSpriteDown.SetCurrentFrame(4);
			
			this.mTopArrow.mSpriteInactive.SetTexture(tex, 6, 2, -1, -1);
			this.mTopArrow.mSpriteInactive.SetCurrentFrame(0);
			
			this.mTopArrow.mSize.Set(this.mTopArrow.mSpriteIdle.GetWidth(),
					this.mTopArrow.mSpriteIdle.GetHeight());
		}
		
		{
			this.mBottomArrow.SetUp(pos, new Vec2(0, 0), this.mDepth);
			
			this.mBottomArrow.mSpriteIdle.SetTexture(tex, 6, 2, -1, -1);
			this.mBottomArrow.mSpriteIdle.SetCurrentFrame(1);
			
			this.mBottomArrow.mSpriteHover.SetTexture(tex, 6, 2, -1, -1);
			this.mBottomArrow.mSpriteHover.SetCurrentFrame(3);
			
			this.mBottomArrow.mSpriteDown.SetTexture(tex, 6, 2, -1, -1);
			this.mBottomArrow.mSpriteDown.SetCurrentFrame(5);
			
			this.mBottomArrow.mSpriteInactive.SetTexture(tex, 6, 2, -1, -1);
			this.mBottomArrow.mSpriteInactive.SetCurrentFrame(1);
			
			this.mBottomArrow.mSize.Set(this.mBottomArrow.mSpriteIdle.GetWidth(),
					this.mBottomArrow.mSpriteIdle.GetHeight());
		}
	}
	
	this.mSelectedShape.mPos.Copy(pos);
	this.mSelectedShape.mDepth = this.mDepth - 2;
	this.mSelectedShape.mColour = "#FFFFFF";
	this.mSelectedShape.mLineWidth = 2;
	this.mSelectedShape.mAbsolute = true;
	this.mSelectedShape.mOutline = true;
}

GUIListBox.prototype.Input = function() {
	this.mTopArrow.Input();
	this.mBottomArrow.Input();
	
	for (var i = 0; i < this.mItems.length; ++i) {
		this.mItems[i].Input();
	}
}

GUIListBox.prototype.Process = function(point) {
	{
		if (this.mItemTop > 0) {
			this.mTopArrow.mActive = true;
		}
		else {
			this.mTopArrow.mActive = false;
		}
		
		if (this.mItemTop < this.mItems.length - this.mItemsMax) {
			this.mBottomArrow.mActive = true;
		}
		else {
			this.mBottomArrow.mActive = false;
		}
		
		this.mTopArrow.Process(point);
		this.mBottomArrow.Process(point);
		
		if (this.mTopArrow.OnClick()) {
			this.AdjustItems(-1);
		}
		else if (this.mBottomArrow.OnClick()) {
			this.AdjustItems(1);
		}
	}
	
	{
		for (var i = 0; i < this.mItems.length; ++i) {
			if (i >= this.mItemTop && i <= this.mItemTop + (this.mItemsMax - 1)) {
				this.mItems[i].mActive = true;
			}
			else {
				this.mItems[i].mActive = false;
			}
			
			this.mItems[i].Process(point);
		}
		
		for (var i = 0; i < this.mItems.length; ++i) {
			if (this.mItems[i].OnClick()) {
				this.mSelectedShape.mPos.mY -= (this.mSelected - i) * this.mItems[0].mSpriteIdle.GetHeight();
				this.mSelected = i;
				break;
			}
		}
	}
}

GUIListBox.prototype.GetRenderData = function() {
	var arr = new Array();
	
	{
		if (this.mItemTop > 0) {
			arr = util.ConcatArray(arr, this.mTopArrow.GetRenderData());
		}
		
		if (this.mItemTop < this.mItems.length - this.mItemsMax) {
			arr = util.ConcatArray(arr, this.mBottomArrow.GetRenderData());
		}
	}
	
	{
		var max = this.mItemTop + this.mItemsMax;
		if (max > this.mItems.length) {
			max = this.mItems.length;
		}
		
		for (var i = this.mItemTop; i < max; ++i) {
			arr = util.ConcatArray(arr, this.mItems[i].GetRenderData());
		}
		
		for (var i = this.mItemTop; i < max; ++i) {
			arr.push(this.mItemsText[i]);
		}
	}
	
	{
		if (this.mSelected >= this.mItemTop && this.mSelected <= this.mItemTop + (this.mItemsMax - 1)) {
			arr.push(this.mSelectedShape);
		}
	}
	
	return arr;
}

GUIListBox.prototype.AddItem = function(itemButton, text) {
	if (this.mItems.length == 0) {
		this.mTopArrow.mPos.Copy(this.mPos);
		this.mTopArrow.mPos.mX += itemButton.mSpriteIdle.GetWidth() + 2;
		this.mTopArrow.SetSpritePositions(this.mTopArrow.mPos);
		
		this.mBottomArrow.mPos.Copy(this.mPos);
		this.mBottomArrow.mPos.mX += itemButton.mSpriteIdle.GetWidth() + 2;
		this.mBottomArrow.mPos.mY += itemButton.mSpriteIdle.GetHeight() * (this.mItemsMax - 1);
		this.mBottomArrow.SetSpritePositions(this.mBottomArrow.mPos);
		
		this.mSelected = 0;
		this.mSelectedShape.mPos.Copy(this.mPos);
		this.mSelectedShape.AddPoint(new Vec2(itemButton.mSpriteIdle.GetWidth(), 0));
		this.mSelectedShape.AddPoint(new Vec2(itemButton.mSpriteIdle.GetWidth(), itemButton.mSpriteIdle.GetHeight()));
		this.mSelectedShape.AddPoint(new Vec2(0, itemButton.mSpriteIdle.GetHeight()));
	}
	
	var but = new GUIButton();
	but.Copy(itemButton);
	
	var txt = new Text();
	txt.Copy(text);
	txt.mAbsolute = true;
	
	var newPos = new Vec2(0, 0);
	
	if (this.mItems.length == 0) {
		newPos.Copy(this.mPos);
	}
	else {
		var id = this.mItems.length - 1;
		newPos.Copy(this.mItems[id].mPos);
		newPos.mY += this.mItems[id].mSize.mY;
	}
	
	but.mPos.mX += newPos.mX; but.mPos.mY += newPos.mY;
	but.SetSpritePositions(but.mPos);
	
	txt.mPos.mX += newPos.mX; txt.mPos.mY += newPos.mY;
	
	this.mItems.push(but);
	this.mItemsText.push(txt);
}

GUIListBox.prototype.RemoveItem = function(id) {
	if (id >= 0 && id < this.mItems.length) {
		this.mItems.splice(id, 1);
		this.mItemsText.splice(id, 1);
		
		if (this.mItems.length == 0) {
			this.Clear();
		}
		else {
			for (var i = id; i < this.mItems.length; ++i) {
				this.mItems[i].mPos.mY -= this.mItems[i].mSpriteIdle.GetHeight();
				this.mItems[i].SetSpritePositions(this.mItems[i].mPos);
				
				this.mItemsText[i].mPos.mY -= this.mItems[i].mSpriteIdle.GetHeight();
			}
			
			if (this.mItemTop > 0) {
				this.AdjustItems(-1);
			}
			
			if (id >= this.mItems.length) {
				if (this.mSelected == id) {
					this.mSelected--;
					this.mSelectedShape.mPos.mY -= this.mItems[0].mSpriteIdle.GetHeight();
				}
				
				id--;
			}
		}
	}
}

GUIListBox.prototype.Clear = function() {
	this.mItemTop = 0;
	this.mItems.splice(0, this.mItems.length);
	this.mItemsText.splice(0, this.mItemsText.length);
	
	this.mSelected = -1;
	this.mSelectedShape.Clear();
}

GUIListBox.prototype.AdjustItems = function(amount) {
	this.mItemTop += amount;
	
	for (var i = 0; i < this.mItems.length; ++i) {
		this.mItems[i].mPos.mY -= amount * this.mItems[i].mSpriteIdle.GetHeight();
		this.mItems[i].SetSpritePositions(this.mItems[i].mPos);
		
		this.mItemsText[i].mPos.mY -= amount * this.mItems[i].mSpriteIdle.GetHeight();
	}
	
	this.mSelectedShape.mPos.mY -= amount * this.mItems[0].mSpriteIdle.GetHeight();
}

// returns the
GUIListBox.prototype.GetActive = function() {
	if (this.mSelected >= 0) {
		return this.mItemsText[this.mSelected].mString;
	}
	
	return "";
}
// ...End

