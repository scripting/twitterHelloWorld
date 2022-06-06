# Twitter Hello World

Suppose I want to write an app that runs in the browser that just says Hello World from my Twitter account. 

This is the canonical example, to illustrate the overhead of a development platform. 

This shows where're starting, and how big an improvement is possible.

But first, the current state of the art in Twitter hello worlds circa the summer of 2022.

#### You can see what the app does by..

Go to <a href="http://scripting.com/code/twitterhelloworld/index.html">this page</a> and follow the instructions.

#### How the pieces fit together

First, this is not a tutorial for setting up a Twitter app. I'm just listing the steps here so you can see how much work is involved in setting up the Hello World app. 

1. You'll need to set up an app on apps.twitter.com. 

1. Then set the callback URI to http://yourdomain/callbackFromTwitter.

1. Get the API Key and secret, and edit the config.json file to include these values. 

2. There's a Node.js app in this folder. Run npm install to get all the packages it needs. 

3. Edit the config struct in the app so it's pointing to the correct server and port. 

3. Run the server app.

4. There's also a browser-based app in the folder, in three files, styles.css, code.js and index.html. 

5. Edit code.js file so <i>urlTwitterServer</i> points to the Node app. 

6. Then run the client app. Log in to the app on Twitter. Click the button and enter a string for the Hello World message. If all goes well your message will appear on Twitter. 

7. When you're done be sure to click the link to log out.

#### With a simpler Twitter API

If the Twitter API did what the server app here does, posting a Hello World tweet would look something like this.

<code>twitter.newPost ("Hello World")</code>

That's assuming it's running within an app that uses Twitter for identity, like <a href="http://drummer.scripting.com/">Drummer</a>. 

In fact that bit of code actually <a href="http://scripting.com/images/2022/06/06/drummerTwitterHello.png">works</a> in Drummer. :smile:

Here's the <a href="http://docserver.scripting.com/?verb=twitter.newPost">man page</a> for the verb.

