var express = require("express");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 8080;

// Make public files available to the client.
app.use(express.static(__dirname + "/app/public"));

// Respond to survey submit button.
app.get("/survey", function(req, res) {
	var mbtiType = scoreSurvey(req.query);
	res.end("You are a " + mbtiType);
});

// Listen for incoming requests from the client.
app.listen(PORT, function() {
	console.log("App listening on PORT:", PORT);
});

function scoreSurvey(survey) {
	var results = {};
	for (question in survey) {
		var answer = survey[question];
		var letter = answer.split(":")[0];
		var weight = answer.split(":")[1];
		results[letter] = weight;
	}
	var mbtiType = "";
	mbtiType += (results.e >= results.i) ? 'e' : 'i';
	mbtiType += (results.s >= results.n) ? 's' : 'n';
	mbtiType += (results.f >= results.t) ? 'f' : 't';
	mbtiType += (results.p >= results.j) ? 'p' : 'j';
	console.log(mbtiType);
	return mbtiType;
}