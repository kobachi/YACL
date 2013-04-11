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