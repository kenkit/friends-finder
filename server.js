var express = require("express");
var bodyParser = require("body-parser");
var mbtiModel = require("./app/model/model.js");

var app = express();
var PORT = process.env.PORT || 8080;

// TODO: Um, should really be stateless.  Maybe its time to bust
//       out some ajax and push form validation to the client-side.
var gResponses = {};
var gPartialSurvey = {};
var gFlagMissingResponses = false;

// Make public files available to the client.
app.use(express.static(__dirname + "/app/public"));

// Display the survey for the user to complete.
app.get("/survey", function(req, res) {
	var html;
	if (gFlagMissingResponses) {
		// Remediation path.  Fix partially completed survey.
		html = mbtiModel.survey.buildSurveyHtml(
						"/survey", 
						"post", 
						gFlagMissingResponses,
						gPartialSurvey);

		gFlagMissingResponses = false;
		gPartialSurvey = {};
	} else {
		// Pristine path.  Present empty survey to user.
		html = mbtiModel.survey.buildSurveyHtml(
						"/survey", 
						"post");
	}
	res.end(html);
});

// Display survey responses posted so far.
app.get("/api/surveys", function(req, res) {
	res.json(gResponses);
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json 
app.use(bodyParser.json())

// Process survey once user presses 'submit' button.
//
// Incoming parsed survey json looks like this:
//
// req.body = { 
//		name: 'bill',
//		q0: 'naturally',
//		q1: 'abstract concepts',
//		q2: 'the feelings of others',
//		..
//		q24: 'garage sales' 
// }

app.post("/survey", function(req, res) {
	var mbtiType = mbtiModel.survey.scoreSurvey(req.body);
	if (mbtiType) {
		var name = req.body.name.toLowerCase();
		gResponses[name] = req.body;
		gResponses[name].mbti = mbtiType;
		var html = mbtiModel.getResultsHtml(mbtiType);
		res.end(html);
	} else {
		// Assume user failed to answer at least one question
		// or failed to enter a name.  Redisplay the survey page,
		// but this time, flag user to complete all items.
		
		gFlagMissingResponses = true;
		gPartialSurvey = req.body;
		res.redirect("/survey");
	}
});

// Listen for incoming requests from the client.
app.listen(PORT, function() {
	console.log("App listening on PORT:", PORT);
});
