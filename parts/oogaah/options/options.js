// OogaahOptions class...
// holds the various option setting values
function OogaahOptions() {
	this.mStorage = new LocalStorage();
	
	this.mLogOptions = new Array();
	
	{
		var playLog = new OogaahPlayLog();
		for (var i = 0; i < playLog.mIconCount; ++i) { // missing, play, pass, yes, no, ability, skirmish win, 1st, 2nd, 3rd, 4th
			this.mLogOptions.push(true);
		}
	}
};

OogaahOptions.prototype.LoadOptions = function() {
	if (this.mStorage.IsSupported() == true) {
		for (var i = 0; i < this.mLogOptions.length; ++i) {
			if (this.mStorage.Exists("optionsLog" + i) == true) {
				var str = this.mStorage.Load("optionsLog" + i);
				
				if (str == "0") {
					this.mLogOptions[i] = false;
				}
			}
		}
	}
}

OogaahOptions.prototype.SaveOptions = function() {
	if (this.mStorage.IsSupported() == true) {
		for (var i = 0; i < this.mLogOptions.length; ++i) {
			var str = "0";
			if (this.mLogOptions[i] == true) {
				str = "1";
			}
			
			this.mStorage.Save("optionsLog" + i, str, true);
		}
	}
}

OogaahOptions.prototype.ResetOptions = function() {
	if (this.mStorage.IsSupported() == true) {
		for (var i = 0; i < this.mLogOptions.length; ++i) {
			if (this.mStorage.Exists("optionsLog" + i) == true) {
				this.mStorage.Delete("optionsLog" + i);
			}
		}
	}
}
// ...End

