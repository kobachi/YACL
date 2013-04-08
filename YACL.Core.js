/* YACL Core */
window.YACL = function(debug){
	/* Event */
	var event = new YACL.Event(["log", "info", "warn", "error"]);
	this.addEventListener = event.add;
	this.removeEventListener = event.remove;
};
