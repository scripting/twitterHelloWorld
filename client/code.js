const urlTwitterServer = "http://twitterhello.scripting.com/";

function buildParamList (paramtable) { 
	var s = "";
	for (var x in paramtable) {
		if (s.length > 0) {
			s += "&";
			}
		s += x + "=" + encodeURIComponent (paramtable [x]);
		}
	return (s);
	}
function servercall (verb, params, flAuthenticated, callback, method, postbody) {
	if (flAuthenticated === undefined) {
		flAuthenticated = true;
		}
	if (params === undefined) {
		params = new Object ();
		}
	if (method === undefined) {
		method = "GET";
		}
	if (flAuthenticated) {
		params.oauth_token = localStorage.twOauthToken;
		params.oauth_token_secret = localStorage.twOauthTokenSecret;
		}
	
	var apiUrl = urlTwitterServer + verb;
	var paramString = buildParamList (params);
	if (paramString.length > 0) {
		apiUrl += "?" + paramString;
		}
	
	console.log ("serverCall: verb == " + verb + ", apiUrl == " + apiUrl);
	
	$.ajax ({
		type: method,
		url: apiUrl,
		data: postbody, 
		success: function (data) {
			if (callback !== undefined) {
				callback (undefined, data);
				}
			},
		error: function (status, something, otherthing) { 
			console.log ("serverCall: error == " + JSON.stringify (status, undefined, 4));
			if (callback !== undefined) {
				var err = {
					code: status.status,
					message: JSON.parse (status.responseText).message
					};
				if (callback !== undefined) {
					callback (err);
					}
				}
			},
		dataType: "json"
		});
	}

function signOnTwitter () {
	$(".btn").blur ();
	twConnectToTwitter ();
	}
function signOffTwitter () {
	twDisconnectFromTwitter ();
	location.reload ();
	}
function sendHelloWorldTweet () {
	$(".btn").blur ();
	var lastMessage = "Hello world.";
	if (localStorage.lastMessage !== undefined) {
		lastMessage = localStorage.lastMessage;
		}
	askDialog ("Enter your Hello World message:", lastMessage, "Hello world.", function (helloWorldMessage, flcancel) {
		if (!flcancel) {
			servercall ("sendtweet", {message: helloWorldMessage}, true, function (err, result) {
				if (err) {
					alertDialog ("Can't send the tweet because: " + err.message);
					}
				else {
					alertDialog ("It worked!");
					console.log (jsonStringify (result));
					}
				});
			localStorage.lastMessage = helloWorldMessage;
			}
		});
	}

function startup () {
	console.log ("startup");
	twStorageData.urlTwitterServer = urlTwitterServer;
	twGetOauthParams ();
	if (twIsTwitterConnected ()) {
		$("#idTwitterScreenname").text (twGetScreenName ());
		$("#idSignedOn").css ("display", "block");
		$("#idNotSignedOn").css ("display", "none");
		}
	else {
		$("#idNotSignedOn").css ("display", "block");
		$("#idSignedOn").css ("display", "none");
		}
	}
