// GUICheckBox Class...
function GUICheckBox() {
	this.mPos = new Vec2();
	this.mSize = new Vec2();
	
	this.mButton = new GUIButton();
	this.mSpriteSelected = new Sprite();
	
	this.mSelected = false;
};

GUICheckBox.prototype.Copy = function(other) {
	this.mButton.Copy(other.mButton);
}

GUICheckBox.prototype.SetUp = function(pos, size, depth) {
	this.mPos.Copy(pos); // set position
	this.mSize.Copy(size); // set size
	
	this.mButton.SetUp(pos, size, depth);
	
	this.mSpriteSelected.SetPosition(pos);
	this.mSpriteSelected.mDepth = depth;
	this.mSpriteSelected.mAbsolute = true;
}

GUICheckBox.prototype.Input = function() {
	this.mButton.Input();
}

GUICheckBox.prototype.Process = function(point) {
	this.mButton.Process(point);
	
	if (this.mButton.OnClick() == true) {
		this.mSelected = !this.mSelected;
	}
}

GUICheckBox.prototype.GetRenderData = function() {
	var arr = new Array();
	
	arr = util.ConcatArray(arr, this.mButton.GetRenderData());
	
	if (this.mSelected == true) {
		arr.push(this.mSpriteSelected);
	}
	
	return arr;
}
// ...End

