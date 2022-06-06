const urlTwitterServer = "http://twitterhello.scripting.com/";

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
	var paramString = twBuildParamList (params);
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
function serverpost (path, params, flAuthenticated, filedata, callback) {
	var whenstart = new Date ();
	if (!$.isPlainObject (filedata) && (typeof (filedata) != "string")) { //8/2/21 by DW
		filedata = filedata.toString ();
		}
	if (params === undefined) {
		params = new Object ();
		}
	if (flAuthenticated) { //1/11/21 by DW
		params.oauth_token = localStorage.twOauthToken;
		params.oauth_token_secret = localStorage.twOauthTokenSecret;
		}
	var url = urlTwitterServer + path + "?" + twBuildParamList (params, false);
	try {
		$.post (url, filedata, function (data, status) {
			if (status == "success") {
				if (callback !== undefined) {
					callback (undefined, data);
					}
				}
			else {
				var err = {
					code: status.status,
					message: JSON.parse (status.responseText).message
					};
				if (callback !== undefined) {
					callback (err);
					}
				}
			});
		}
	catch (err) {
		console.log ("yo");
		}
	}

function signOnButton () {
	$(".btn").blur ();
	twConnectToTwitter ();
	}
function signOffButton () {
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
					alertDialog (err.message);
					}
				else {
					alertDialog ("It worked!");
					console.log (jsonStringify (result));
					}
				});
			localStorage.lastMessage = lastMessage;
			}
		});
	}

function startup () {
	console.log ("startup");
	twStorageData.urlTwitterServer = urlTwitterServer;
	twGetOauthParams ();
	if (twIsTwitterConnected ()) {
		$("#idSignedOn").css ("display", "block");
		$("#idNotSignedOn").css ("display", "none");
		}
	else {
		$("#idNotSignedOn").css ("display", "block");
		$("#idSignedOn").css ("display", "none");
		}
	}
