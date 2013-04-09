/*
 * YACL.js
 * Copyright(C) by kobachi
 */
(function(){
var YACL = {};
/* Utility Methods */
/**
 * Call function "f" for each items in array "a"
 */
function _each(a, f){
	for(var i = 0; i < a.length; i++){
		f(a[i], i);
	}
}

/**
 * Returns filtered items in array "a" using dividing function "f"
 */
function _filter(a, f){
	var n = [];
	for(var i = 0; i < a.length; i++){
		if(f(a[i], i)){
			n.push(a[i]);
		}
	}
	return n;
}

/**
 * Bind private function "f" as public function(name) "n" of object "o" safely.
 */
function _public(o, n, f){
	o[n] = function(){
		f.apply(o, arguments);
	};
}

/**
 * Create unmodifiable property "n" to object "o", property returns value "v".
 */
function _readonly(o, n, v){
	Object.defineProperty(o, n, function(){
		return v;
	});
}

/* Event Handlers */
YACL.Event = function(names){
	var events = {};

	//initialize event name hash-table
	if(names != null){
		_each(names, function(n){
			events[n] = [];
		});
	}

	/**
	 * Fire event handler of event-name "name" with argument map "argmap"
	 */
	this.fire = function(name, argmap){
		if(name.indexOf("on") == 0){
			name = name.subString(2);
		}
		if(typeof events[name] == "undefined"){
			return;
		}
		_each(events[name], function(f){
			var o = {
				stopPropagation: function(){},
				preventDefault: function(){},
			};
			if(argmap != null){
				for(var p in argmap){
					o[p] = argmap[p];
				}
			}
			f(o);
		});
	};

	/**
	 * Add event handler
	 */
	this.add = function(){
		if(arguments.length < 2 || 3 < arguments.length){
			throw new Error("Invalid Arguments");
		}
		var name = arguments[0];
		if(name.indexOf("on") == 0){
			name = name.subString(2);
		}
		var func = arguments[1];
		if(typeof events[name] != "undefined"){
			events[name].push(f);
		}
	};

	/**
	 * Remove event handler
	 */
	this.remove = function(){
		if(arguments.length < 2 || 3 < arguments.length){
			throw new Error("Invalid Arguments");
		}
		var name = arguments[0];
		if(name.indexOf("on") == 0){
			name = name.subString(2);
		}
		var func = arguments[1];
		if(typeof events[name] != "undefined"){
			events[name] = _filter(events[name], function(e){
				return e != func;
			});
		}
	};
};

/* Log Data Object */
YACL.Log = function(type, data){
	//Setup readonly properties
	_readonly(this, "type", type);
	_readonly(this, "data", data);
	_readonly(this, "created", new Date());
};

/* Logger */
YACL.Logger = function(levels){
	var self = this;
	var logs = [];
	
	//create logging functions from specified levels
	_each(levels, function(l){
		self[l] = function(o){
			var n = new YACL.Log(l, o);
			logs.push(n);
			return n;
		};
	});
	
	//define logs property
	_readonly(self, "logs", logs);
};

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
			var m = logger[l](o);
			event.fire(l, m);
		});
	});
	this.test = function(){
		return logger.logs;
	};
};

})();
