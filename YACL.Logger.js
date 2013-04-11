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
