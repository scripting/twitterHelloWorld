const fs = require ("fs"); 
const utils = require ("daveutils");
const davetwitter = require ("davetwitter");

var config = {
	httpPort: 1491,
	myDomain: "localhost:1491",
	flLogToConsole: true,
	flAllowAccessFromAnywhere: true,
	flPostEnabled: true,
	twitterConsumerKey: undefined, //provided in config file
	twitterConsumerSecret: undefined
	};

function readConfig (f, theConfig, callback) { 
	fs.readFile (f, function (err, jsontext) {
		if (err) {
			console.log ("readConfig: err.message == " + err.message);
			}
		else {
			try {
				var jstruct = JSON.parse (jsontext);
				for (var x in jstruct) {
					theConfig [x] = jstruct [x];
					}
				}
			catch (err) {
				console.log ("readConfig: err.message == " + err.message);
				}
			}
		callback ();
		});
	}
function handleHttpRequest (theRequest) {
	var params = theRequest.params;
	const token = params.oauth_token;
	const secret = params.oauth_token_secret;
	function returnError (jstruct) {
		theRequest.httpReturn (500, "application/json", utils.jsonStringify (jstruct));
		}
	function returnData (jstruct) {
		if (jstruct === undefined) {
			jstruct = {};
			}
		theRequest.httpReturn (200, "application/json", utils.jsonStringify (jstruct));
		}
	function httpReturn (err, jstruct) {
		if (err) {
			returnError (err);
			}
		else {
			returnData (jstruct);
			}
		}
	switch (theRequest.lowermethod) {
		case "post":
			break;
		case "get":
			switch (theRequest.lowerpath) {
				case "/sendtweet": 
					davetwitter.sendTweet (token, secret, params.message, undefined, httpReturn);
					return (true);
				}
			break;
		}
	return (false);
	}
readConfig ("config.json", config, function (err) {
	config.httpRequestCallback = handleHttpRequest;
	davetwitter.start (config);
	});


