// ResourceManager Class...
// holds the resource stores for each individual resource type
function ResourceManager() {
	this.mTextureStore = new ResourceStore(); // storage for our textures
	this.mFontStore = new ResourceStore(); // storage for our fonts
	this.mSoundBufferStore = new ResourceStore(); // storage for our sound buffers
};
// ...End

