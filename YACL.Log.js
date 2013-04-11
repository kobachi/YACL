/* Log Data Object */
YACL.Log = function(type, data, created){
	//Setup readonly properties
	_readonly(this, "type", type);
	_readonly(this, "data", data);
	_readonly(this, "created", (created) ? created : new Date());
};
