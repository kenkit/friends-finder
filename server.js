var express = require("express");
var fs = require("fs");
var mbtiModel = require("./app/model/model");

var app = express();
var PORT = process.env.PORT || 8080;

// Make public files available to the client.
//app.use(express.static(__dirname + "/app/public"));

// Respond to survey submit button.
app.get("/", function(req, res) {
	var html = mbtiModel.survey.buildSurveyHtml("/survey", "get");
	console.log(html);
	res.end(html);
});

// Respond to survey submit button.
app.get("/survey", function(req, res) {
	var mbtiType = mbtiModel.survey.scoreSurvey(req.query);
	res.end("You are a " + mbtiType);
});

// Listen for incoming requests from the client.
app.listen(PORT, function() {
	console.log("App listening on PORT:", PORT);
});
