// OogaahBehaviourStore Class...
//
function OogaahBehaviourStore() {
	this.mBehaviours = new Array();
};

OogaahBehaviourStore.prototype.Decide = function(cMap) {
	var currScene = nmgrs.sceneMan.mCurrScene; // reference to the current scene
	
	var arr = new Array(); // an array of indices with the highest count
	var max = 0; // the current highest count
	
	for (var i = 0; i < cMap.mStore.length; ++i) { // for all items in the map
		if (cMap.mStore[i].mCount > max) { // if the current item's count is larger than the stored
			max = cMap.mStore[i].mCount; // update the stored count
			
			arr.splice(0, arr.length); // clear all stored indices
			arr.push(i); // add the current index
		}
		else if (cMap.mStore[i].mCount == max) { // otherwise if they match
			arr.push(i); // add the current index
		}
	}
	
	if (arr.length > 0) {
		var rand = arr[currScene.mRand.GetRandInt(0, arr.length - 1)]; // get a random popular result index
		return cMap.mStore[rand].mItem; // return the associated item
	}
	else {
		return null;
	}
}

// 
OogaahBehaviourStore.prototype.DecideMode0 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode0(); // decide which cards we wanna play
		
		if (res != null) {
			for (var j = 0; j < res.length; ++j) {
				cMap.Add(res[j]); // add the result to the map
			}
		}
	}
	
	return this.Decide(cMap);
}

// 
OogaahBehaviourStore.prototype.DecideMode2 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode2(); // decide if we wanna play goblin hordes alongside goblin overseer
		
		if (res != null) {
			cMap.Add(res); // add the result to the map
		}
	}
	
	return this.Decide(cMap);
}

// 
OogaahBehaviourStore.prototype.DecideMode5 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode5(); // decide if we wanna swap the card
		
		if (res != null) {
			cMap.Add(res); // add the result to the map
		}
	}
	
	return this.Decide(cMap);
}

// 
OogaahBehaviourStore.prototype.DecideMode6 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode6(); // decide if we wanna reverse the attack values
		
		if (res != null) {
			cMap.Add(res); // add the result to the map
		}
	}
	
	return this.Decide(cMap);
}

// 
OogaahBehaviourStore.prototype.DecideMode8 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode8(); // 
		
		if (res != null) {
			cMap.Add(res); // add the result to the map
		}
	}
	
	return this.Decide(cMap);
}

// 
OogaahBehaviourStore.prototype.DecideMode12 = function() {
	var cMap = new CountMap(); // the count map holding all of our results
	
	for (var i = 0; i < this.mBehaviours.length; ++i) { // for all behaviours
		var res = this.mBehaviours[i].DecideMode12(); // 
		
		if (res != null) {
			cMap.Add(res); // add the result to the map
		}
	}
	
	return this.Decide(cMap);
}
// ...End


// OogaahBehaviourBase Class...
//
function OogaahBehaviourBase() {
	this.mAI = null; // reference to the AI that this behaviour belongs to
};

//
OogaahBehaviourBase.prototype.SetUp = function(owner) {
	this.mAI = owner; // store the reference to the AI that this behaviour belongs to
}

// 
OogaahBehaviourBase.prototype.DecideMode0 = function() {
	return null;
}

//
OogaahBehaviourBase.prototype.DecideMode2 = function() {
	return null;
}

//
OogaahBehaviourBase.prototype.DecideMode5 = function() {
	return null;
}

//
OogaahBehaviourBase.prototype.DecideMode6 = function() {
	return null;
}

//
OogaahBehaviourBase.prototype.DecideMode8 = function() {
	return null;
}

//
OogaahBehaviourBase.prototype.DecideMode12 = function() {
	return null;
}
// ...End