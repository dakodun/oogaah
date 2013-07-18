// LocalStorage Class...
// 
function LocalStorage() {
	this.mLength = 0;
	
	if (this.IsSupported == true) {
		this.mLength = localStorage.length; // the current length of the local store
	}
};

// checks if local storage is supported in the browser
LocalStorage.prototype.IsSupported = function() {
	// if local storage is supported and is allowed
	if (typeof(Storage) !== "undefined" && window["localStorage"] != null) {
		return true; // supported
	}
	
	return false; // not supported
}

// saves something to local storage
LocalStorage.prototype.Save = function(key, data, overwrite) {
	try {
		if (localStorage.getItem(key) == null || overwrite == true) { // if the current key doesn't exist or we're allowed to overwrite
			localStorage.setItem(key, data); // add the key and the data to the local store
		}
		else {
			return false; // key exists and we can't overwrite, unsuccessful
		}
	} catch (e) {
		return false; // esception occured, unsuccessful
	}
	
	this.mLength = localStorage.length; // update the length
	return true; // success
}

// loads something from the local storage
LocalStorage.prototype.Load = function(key) {
	return localStorage.getItem(key); // return the data corresponding to key
}

// checks if an item exists in the local storage
LocalStorage.prototype.Exists = function(key) {
	if (localStorage.getItem(key) != null) { // if the item exists
		return true; // return success
	}
	
	return false; // item doesn't exist
}

// removes a key-data pair from the local storage
LocalStorage.prototype.Delete = function(key) {
	localStorage.removeItem(key); // remove the item corresponding to the key
	this.mLength = localStorage.length; // update the length of the local storage
}

// clears all items from teh local storage
LocalStorage.prototype.Clear = function() {
	localStorage.clear(); // clear the local storage
	this.mLength = localStorage.length; // update the length
}

// returns the key in position id
LocalStorage.prototype.Key = function(id) {
	return localStorage.key(id); // return the associated key
}
// ...End

