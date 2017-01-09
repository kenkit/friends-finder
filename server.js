var express = require("express");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 8080;

// Make public files available to the client.
app.use(express.static(__dirname + "/app/public"));

// Respond to survey submit button.
app.get("/survey", function(req, res){
	// stubbed out for now
	console.log(req.query);
	res.end("got form");
});

// Listen for incoming requests from the client.
app.listen(PORT, function() {
	console.log("App listening on PORT:", PORT);
});
