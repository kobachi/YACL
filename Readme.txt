//in development (thru messages to console): 
window.console = new YACL(true);

//in product (block messages):
window.console = new YACL(false);
//or
window.console = new YACL();

== console.mask();

//avilable methods
console.log("hoge");
console.info("page");
console.warn("foo");
console.error("bar");
console.logif(true, "hoge");
console.infoif(false, "page");
console.warnif(true, "foo");
console.errorif(false, "bar");
console.isYACL();
console.mask();//mask all log
console.mask(["log", "info", "warn"]);//output only console.error()

//YACL supports event handler
console.addEventListener("log", function(o){
});
