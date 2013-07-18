// RNG Class...
// a pseudo-random number generator
function RNG(seed) {
	this.mMers = new MersenneTwister(); // a reference to a mersenne twister (see mersenne-twister.js)
	this.SetSeed(seed);
};

// set the seed and seed the rng with it
RNG.prototype.SetSeed = function(seed) {
	var s = seed;
	if (s == null) {
		var d = new Date();
		this.SetSeed(d.getTime());
		var s = this.GetRandInt(0, 99999999);
		this.SetSeed(s);
	}
	
	this.mSeed = s;
	this.mMers.init_genrand(s);
};

// return the current seed
RNG.prototype.GetSeed = function() {
	return this.mSeed;
};

// get a random integer between lower and higher (inclusive)
RNG.prototype.GetRandInt = function(lower, higher) {
	return (this.mMers.genrand_int32() % ((higher + 1) - lower)) + lower;
};

// get a random float between lower and higher (inclusive) with precision (number of decimal places)
RNG.prototype.GetRandFloat = function(lower, higher, precision) {
	var l = lower * Math.pow(10, precision);
	var h = higher * Math.pow(10, precision);
	
	var f = this.GetRandInt(l, h);
	f /=  Math.pow(10.0, precision);
	return f;
};
// ...End

