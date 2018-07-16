const keys = require('./config');
const express = require('express');
const app = express();
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

var Twit = require('twit');

var T = new Twit({
  consumer_key:         keys.consumer_key,
  consumer_secret:      keys.consumer_secret,
  access_token:         keys.access_token,
  access_token_secret:  keys.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
});

function buildTweet(result){
  var tweet = {};
	tweet.user = {};
	tweet.user.profilePic = result.user.profile_image_url;
	tweet.user.name = result.user.name;
	tweet.user.username = result.user.screen_name;
	tweet.text = result.text;
	tweet.retweets = result.retweet_count;
	tweet.likes = result.favorite_count;
	var milliseconds = (new Date()) - (new Date(result.created_at));
	tweet.timestamp = Math.round(milliseconds/60000);
	tweets.push(tweet);
}

var tweets = [];
T.get('statuses/home_timeline', {screen_name: 'holaworld4', count: 5}, function(err, data, response){
	var results = data;
	results.forEach(buildTweet);
});

function buildFollower(result){
  var follower = {};
	follower.profilePic = result.profile_image_url;
	follower.name = result.name;
	follower.username = result.screen_name;
	follower.following = result.following;
	followers.push(follower);
}

var followers = [];
T.get('friends/list', {screen_name: 'holaworld4', count: 5}, function(err, data, response){
	var results = data.users;
	results.forEach(buildFollower);
});

var dms = [];
T.get('direct_messages/events/list', {count: 5}, function(err, data, response){
	var results = data.events;
	results.forEach(function(result){
		dms.push(result.message_create);
	});
});

// if id!= mine display text with class (?) else use class (&_?).

app.get('/', (req, res) => {
	res.render('index', {tweets: tweets, followers: followers, messages: dms.reverse(), userId: '438081126'});
});

app.listen(3000, () => {
	console.log('The application is running in localhost:3000.');
});

