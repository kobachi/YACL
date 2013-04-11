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
				preventDefault: function(){}
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
