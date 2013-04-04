(function(){
	//install Firebug Lite. For OLD browsers.
	if(!window.console) (function(D){
		var s = D.getElementsByTagName("script");
		var f = false;
		for(var i = 0; i < s.length && !fb; i++){
			var a = s[i].getAttribute("src");
			if(a == null) continue;
			if(0 <= a.indexOf("firebug-lite.js")){
				f = true;
				break;
			}
		}
		if(f) return;
		var h = D.getElementsByTagName("head");
		if(h.length == 0) return;
		var f = D.createElement("script");
		f.setAttribute("src", "https://getfirebug.com/firebug-lite.js");
		h[0].appendChild(f);
	})(document);
})();