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
		return f.apply(o, arguments);
	};
}

/**
 * Create unmodifiable property "n" to object "o", property returns value "v".
 */
function _readonly(o, n, v){
	o[n] = null;
	try{
		Object.defineProperty(o, n, {
			value: v,
			writable: false
		});
	}
	catch(e){
		o[n] = v;
	}
}

/**
 * Define property "n" to object "o" using getter "g" and setter "s"
 */
function _prop(o, n, g, s){
	o[n] = null;
	try{
		var a = {};
		if(g != null) a.get = function(){ return g.call(o) };
		if(s != null) s.get = function(v){ s.call(o, v) };
		Object.defineProperty(o, n, a);
	}
	catch(e){
		o[n] = g;
	}
}
/* Event Handlers */
YACL.Event = function(names){
	var self = this;
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
	function fire(name, argmap){
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
	_public(self, "fire", fire);

	/**
	 * Add event handler
	 */
	function add(){
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
	_public(self, "add", add);

	/**
	 * Remove event handler
	 */
	function remove(){
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
	_public(self, "remove", remove);
};

/* Log Data Object */
YACL.Log = function(type, data, created){
	//Setup readonly properties
	_readonly(this, "type", type);
	_readonly(this, "data", data);
	_readonly(this, "created", (created) ? created : new Date());
};

/* Logger */
YACL.Logger = function(levels){
	var self = this;
	var logs = [];

	//create logging functions from specified levels
	_each(levels, function(l){
		_public(self, l, function(o){
			var n = new YACL.Log(l, o);
			logs.push(n);
			return n;
		});
	});
	
	//"logs" property
	_prop(self, "logs", function(){
		var n = [];
		_each(logs, function(l){
			n.push(l);
		});
		_each(["push", "pop", "reverse", "shift", "sort", "splice", "unshift"], function(f){
			n[f] = function(){};
			delete n[f];
		});
		return n;
	});
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
			return m;
		});
	});
	_prop(self, "logs", function(){ return logger.logs });
};

})();
