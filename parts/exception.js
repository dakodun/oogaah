// Exception Class...
// a custom exception
function Exception(what) {
	this.mWhat = ""; // information about this exception
	if (what != null) { // if a string was passed
		this.mWhat = what;
	}
};

// returns information about this exception
Exception.prototype.What = function() {
	return this.mWhat;
}
// ...End

