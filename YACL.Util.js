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
