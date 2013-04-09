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
