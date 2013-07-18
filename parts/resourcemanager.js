// ResourceManager Class...
// holds the resource stores for each individual resource type
function ResourceManager() {
	this.mTexStore = new ResourceStore(); // storage for our textures
	this.mFontStore = new ResourceStore(); // storage for our fonts
	this.mSndStore = new ResourceStore(); // storage for our audio
};
// ...End

