var express = require("express");
var bodyParser = require("body-parser");
var mbtiModel = require("./app/model/model.js");

var app = express();
var PORT = process.env.PORT || 8080;
var responses = {}
var gFlagMissingResponses = false;

// Make public files available to the client.
app.use(express.static(__dirname + "/app/public"));

// Display the survey for the user to complete.
app.get("/survey", function(req, res) {
	var html = mbtiModel.survey.buildSurveyHtml(
					"/survey", 
					"post", 
					gFlagMissingResponses);
	gFlagMissingResponses = false;
	res.end(html);
});

// Display survey responses posted so far.
app.get("/api/surveys", function(req, res) {
	var html = mbtiModel.survey.buildSurveyHtml("/survey", "post");
	res.json(responses);
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json 
app.use(bodyParser.json())

// Process survey once user presses 'submit' button.
app.post("/survey", function(req, res) {
	var name = req.body.name.toLowerCase();
	responses[name] = req.body;
	var mbtiType = mbtiModel.survey.scoreSurvey(req.body);
	if (mbtiType) {
		responses[name].mbti = mbtiType;
		var html = mbtiModel.getResultsHtml(mbtiType);
		res.end(html);
	} else {
		
		// Assume user failed to answer at least one question
		// or failed to enter a name.  Redisplay the survey page,
		// but this time, flag user to complete all items.
		
		gFlagMissingResponses = true;
		res.redirect("/survey");
	}
});

// Listen for incoming requests from the client.
app.listen(PORT, function() {
	console.log("App listening on PORT:", PORT);
});
