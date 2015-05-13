var http = require("http"),
	app = require("./server/app");

http.createServer(app).listen("8888", function() {
	console.log("server is listen on port 8888.");
});