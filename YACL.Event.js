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
