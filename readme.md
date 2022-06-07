# Twitter Hello World

Suppose I want to write an app that runs in the browser that just says Hello World from my Twitter account. 

This is the canonical example, to illustrate the overhead of a development platform. 

This shows where're starting, and how big an improvement is possible.

But first, the current state of the art in Twitter hello worlds circa the summer of 2022.

#### You can see what the app does by..

Go to <a href="http://twitterhello.scripting.com/">this page</a> and follow the instructions.

#### How the pieces fit together

First, this is not a tutorial for setting up a Twitter server app. I'm just listing the steps here so you can see how much work is involved in setting up the Hello World app. 

1. You'll need to set up an app on Twitter's <a href="https://developer.twitter.com/en/portal/projects-and-apps">developer portal</a>. 

1. Set the callback URI for the app to http://yourdomain/callbackFromTwitter.

1. Get the API Key and secret, and edit the config.json file in the server folder to include these values. 

2. There's a Node.js app in the server folder. Open the folder in your terminal app and run `npm install` to get all the packages it needs. 

3. Edit the config struct <a href="twitterhello.js">in the app</a> so it's pointing to the correct port and server in config.httpPort and config.myDomain. 

3. Run the server app.

4. There's also a browser-based app in the folder, in three files, styles.css, code.js and index.html. 

5. Edit code.js file so <i>urlTwitterServer</i> points to the Node app. 

6. Then run the client app. Log in to the app on Twitter. Click the button and enter a string for the Hello World message. If all goes well your message will appear on Twitter. 

7. When you're done be sure to click the link to log out.

#### With a simpler Twitter API

Here's the big idea. 

Everything that's in the server app should be running on Twitter's server. This would be a new higher-level API. 

Then look at the source code, here, for the Hello World client. That's what the developer would have to write. Twitter should still have an app registration process, except it wouldn't be concerned with how to get the user logged in, just that the user knows who they're giving access to their account to. 

Obviously the user's app would have to be given access to more than just the functionality to send a tweet. If you want an idea of what that might look like, here's the interface file for the API I've defined for my own apps. 

There's nothing very innovative about this, it's just following the natural process of factoring code.

#### It's even simpler in Drummer

If the Twitter API did what the server app here does, posting a Hello World tweet would look something like this.

<code>twitter.newPost ("Hello World")</code>

That's assuming it's running within an app that uses Twitter for identity, like <a href="http://drummer.scripting.com/">Drummer</a>. 

In fact that bit of code actually <a href="http://scripting.com/images/2022/06/06/drummerTwitterHello.png">works</a> in Drummer. :smile:

Here's the <a href="http://docserver.scripting.com/?verb=twitter.newPost">man page</a> for the verb.

