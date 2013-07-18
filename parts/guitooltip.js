// GUITooltip Class...
function GUITooltip() {
	this.mPos = new Vec2();
	this.mDepth = 0;
	
	this.mTooltipText = new Text();
	this.mTooltipOuter = new Shape();
	this.mTooltipInner = new Shape();
	
	this.mTimer = new Timer();
	this.mTimeout = 0;
	this.mShowTooltip = false;
	
	this.mStoredMouse = new Vec2();
	this.mStoredMouse.Copy(nmgrs.inputMan.GetLocalMouseCoords());
};

// copy constructor
GUITooltip.prototype.Copy = function(other) {
	this.mPos.Copy(other.mPos);
	this.mDepth = other.mDepth;
	
	this.mTooltipText.Copy(other.mTooltipText);
	this.mTooltipOuter.Copy(other.mTooltipOuter);
	this.mTooltipInner.Copy(other.mTooltipInner);
	
	this.mTimer.Copy(other.mTimer);
	this.mTimeout = other.mTimeout;
	this.mShowTooltip = other.mShowTooltip;
	
	this.mStoredMouse.Copy(other.mStoredMouse);
}

GUITooltip.prototype.SetUp = function(pos, depth) {
	this.mPos.Copy(pos);
	this.mDepth = depth;
	
	this.mTooltipText.mPos.Copy(pos);
	this.mTooltipOuter.mPos.Set(pos.mX - 4, pos.mY - 4);
	this.mTooltipInner.mPos.Set(pos.mX - 2, pos.mY - 2);
	
	this.mTooltipText.mDepth = depth;
	this.mTooltipOuter.mDepth = depth;
	this.mTooltipInner.mDepth = depth;
	
	this.mTooltipText.mColour = "#333333";
	this.mTooltipOuter.mColour = "#222222";
	this.mTooltipInner.mColour = "#DDDDDD";
}

GUITooltip.prototype.Input = function() {
	if (this.mShowTooltip == true) {
		if (nmgrs.inputMan.GetMousePressed(nmouse.button.code.left) == true) { // if LMB is pressed
			this.mTimer.Reset();
			this.mShowTooltip = false;
		}
	}
}

GUITooltip.prototype.Process = function() {
	if (nmgrs.inputMan.GetMouseDown(nmouse.button.code.left) == false) {
		if (this.mTimer.GetElapsedTime() > this.mTimeout && this.mShowTooltip == false) {
			this.mShowTooltip = true;
			this.mStoredMouse.Copy(nmgrs.inputMan.GetLocalMouseCoords());
		}
		else if (this.mShowTooltip == true) {
			if (Math.abs(nmgrs.inputMan.GetLocalMouseCoords().mX - this.mStoredMouse.mX) > 4 ||
					Math.abs(nmgrs.inputMan.GetLocalMouseCoords().mY - this.mStoredMouse.mY) > 4) {
				
				this.mTimer.Reset();
				this.mShowTooltip = false;
			}
		}
	}
	else {
		this.mTimer.Reset();
	}

}

GUITooltip.prototype.GetRenderData = function() {
	var arr = new Array();
	
	if (this.mShowTooltip == true) {
		arr.push(this.mTooltipOuter);
		arr.push(this.mTooltipInner);
		arr.push(this.mTooltipText);
	}
	
	return arr;
}

GUITooltip.prototype.SetText = function(font, fontSize, string) {
	if (font != null) {
		this.mTooltipText.SetFont(font);
	}
	
	if (fontSize != null) {
		this.mTooltipText.SetFontSize(fontSize);
	}
	
	if (string != null) {
		this.mTooltipText.SetString(string);
	}
	
	{
		var w = this.mTooltipText.GetWidth();
		var h = this.mTooltipText.GetHeight();
		
		this.mTooltipOuter.Clear();
		this.mTooltipOuter.mPos.Set(this.mPos.mX - 4, this.mPos.mY - 4);
		this.mTooltipOuter.AddPoint(new Vec2(w + 8, 0));
		this.mTooltipOuter.AddPoint(new Vec2(w + 8, h + 8));
		this.mTooltipOuter.AddPoint(new Vec2(0, h + 8));
		
		this.mTooltipInner.Clear();
		this.mTooltipInner.mPos.Set(this.mPos.mX - 2, this.mPos.mY - 2);
		this.mTooltipInner.AddPoint(new Vec2(w + 4, 0));
		this.mTooltipInner.AddPoint(new Vec2(w + 4, h + 4));
		this.mTooltipInner.AddPoint(new Vec2(0, h + 4));
	}
}

GUITooltip.prototype.SetPosition = function(pos) {
	this.mPos.Copy(pos);
	
	this.mTooltipText.mPos.Copy(pos);
	this.mTooltipOuter.mPos.Set(pos.mX - 4, pos.mY - 4);
	this.mTooltipInner.mPos.Set(pos.mX - 2, pos.mY - 2);
}

GUITooltip.prototype.FixPosition = function(bbPos, bbSize) {
	var fix = new Vec2();
	
	if (this.mTooltipOuter.mPos.mX < bbPos.mX) {
		fix.mX += bbPos.mX - this.mTooltipOuter.mPos.mX;
	}
	
	if (this.mTooltipOuter.mPos.mX + this.mTooltipOuter.GetWidth() > bbPos.mX + bbSize.mX) {
		fix.mX += (bbPos.mX + bbSize.mX) - (this.mTooltipOuter.mPos.mX + this.mTooltipOuter.GetWidth());
	}
	
	if (this.mTooltipOuter.mPos.mY < bbPos.mY) {
		fix.mY += bbPos.mY - this.mTooltipOuter.mPos.mY;
	}
	
	if (this.mTooltipOuter.mPos.mY + this.mTooltipOuter.GetHeight() > bbPos.mY + bbSize.mY) {
		fix.mY += (bbPos.mY + bbSize.mY) - (this.mTooltipOuter.mPos.mY + this.mTooltipOuter.GetHeight());
	}
	
	
	this.SetPosition(new Vec2(this.mTooltipOuter.mPos.mX += fix.mX, this.mTooltipOuter.mPos.mY += fix.mY));
}

GUITooltip.prototype.SetDepth = function(depth) {
	this.mDepth = depth;
	
	this.mTooltipText.mDepth = depth;
	this.mTooltipOuter.mDepth = depth;
	this.mTooltipInner.mDepth = depth;
}

GUITooltip.prototype.SetColour = function(textColour, outerColour, innerColour) {
	if (textColour != null) {
		this.mTooltipText.mColour = textColour;
	}
	
	if (outerColour != null) {
		this.mTooltipOuter.mColour = outerColour;
	}
	
	if (innerColour != null) {
		this.mTooltipInner.mColour = innerColour;
	}
}

GUITooltip.prototype.StartTimeout = function(timeout) {
	this.mTimeout = timeout;
	this.mTimer.Reset();
	this.mShowTooltip = false;
}
// ...End

