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
