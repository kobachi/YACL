/*
 * YACL.js
 * Copyright(C) by kobachi
 */
(function(){
var YACL = {};
/* Utility Methods */
function _each(a, f){
	for(var i = 0; i < a.length; i++){
		f(a[i], i);
	}
}

function _filter(a, f){
	var n = [];
	for(var i = 0; i < a.length; i++){
		if(f(a[i], i)){
			n.push(a[i]);
		}
	}
	return n;
}
/* Event Handlers */
YACL.Event = function(names){
	var events = {};

	if(names != null){
		_each(names, function(n){
			this["on" + n] = null;
			events[n] = [];
		});
	}

	this.fire = function(name, data){
		if(typeof events[name] == "undefined"){
			return;
		}
		_each(events[name], function(f){
			f({
				stopPropagation: function(){
				},
				preventDefault: function(){
				},
				data: data
			});
		});
	}

	this.add = function(){
		if(arguments.length < 2 || 3 < arguments.length){
			throw new Error("Invalid Arguments");
		}
		var name = arguments[0];
		var func = arguments[1];
		if(typeof events[name] != "undefined"){
			events[name].push(f);
		}
	};

	this.remove = function(){
		if(arguments.length < 2 || 3 < arguments.length){
			throw new Error("Invalid Arguments");
		}
		var name = arguments[0];
		var func = arguments[1];
		if(typeof events[name] != "undefined"){
			events[name] = _filter(events[name], function(e){
				return e != func;
			});
		}
	}
}
/* YACL Core */
window.YACL = function(debug){
	/* Event */
	var event = new YACL.Event(["log", "info", "warn", "error"]);
	this.addEventListener = event.add;
	this.removeEventListener = event.remove;
};
})();
