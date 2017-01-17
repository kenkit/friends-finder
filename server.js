var express = require("express");
var bodyParser = require("body-parser");
var mbtiModel = require("./app/model/model");

var app = express();
var PORT = process.env.PORT || 8080;

// Make public files available to the client.
//app.use(express.static(__dirname + "/app/public"));

// Populate opening page with survey for now.
app.get("/", function(req, res) {
	var html = mbtiModel.survey.buildSurveyHtml("/survey", "post");
	res.end(html);
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json 
app.use(bodyParser.json())

// Process survey once user presses 'submit' button.
app.post("/survey", function(req, res) {
	var mbtiType = mbtiModel.survey.scoreSurvey(req.body);
	if (mbtiType) {
		res.end("You are an " + mbtiType);
	} else {
		res.end("Unable to determine your Myers-Briggs personality type.");
	}
});

/*
// Respond to survey submit button.
app.get("/survey", function(req, res) {
	var mbtiType = mbtiModel.survey.scoreSurvey(req.query);
	if (mbtiType) {
		res.end("You are an " + mbtiType);
	} else {
		res.end("Unable to determine your Myers-Briggs personality type.");
	}
});
*/

// Listen for incoming requests from the client.
app.listen(PORT, function() {
	console.log("App listening on PORT:", PORT);
});
