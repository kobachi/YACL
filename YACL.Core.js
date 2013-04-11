/* YACL Core */
window.YACL = function(debug){
	var self = this;
	var level = ["log", "info", "warn", "error"];
	// initialize event
	var event = new YACL.Event(level);
	_public(self, (window.addEventListener) ? "addEventListener" : "attachEvent", event.add);
	_public(self, (window.removeEventListener) ? "removeEventListener" : "detachEvent", event.remove);
	//initalize Logger
	var logger = new YACL.Logger(level);
	_each(level, function(l){
		_public(self, l, function(o){
			var m = logger[l](o).clone();
			event.fire(l, m);
			return m;
		});
	});
	_prop(self, "logs", function(){ return logger.logs });
};
