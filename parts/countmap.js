// CountMapItem Class...
// 
function CountMapItem() {
	this.mItem = null;
	this.mCount = 0;
};
// ...End


// CountMap Class...
// 
function CountMap() {
	this.mStore = new Array();
};

CountMap.prototype.Add = function(item) {
	var found = false;
	for (var i = 0; i < this.mStore.length; ++i) {
		if (JSON.stringify(this.mStore[i].mItem) === JSON.stringify(item)) {
			++this.mStore[i].mCount;
			found = true;
			break;
		}
	}
	
	if (found == false) {
		var cmi = new CountMapItem();
		cmi.mItem = item; cmi.mCount = 1;
		this.mStore.push(cmi);
	}
}
// ...End

