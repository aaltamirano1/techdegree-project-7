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

var me = {};
T.get('account/verify_credentials', {}, function(err, data, response){
	me.id = data.id;
	me.name = data.name;
	me.username = data.screen_name;
	me.following = data.friends_count;
	me.profilePic = data.profile_image_url;
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
	let date = new Date(result.created_at);
	tweet.timestamp = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
	tweets.push(tweet);
}

var tweets = [];
T.get('statuses/user_timeline', { count: 5}, function(err, data, response){
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
T.get('friends/list', { count: 5}, function(err, data, response){
	var results = data.users;
	results.forEach(buildFollower);
});

function buildMessage(result){
  var message = {};
	message.text = result.message_create.message_data.text;
	let date = new Date(parseInt(result.created_timestamp));
	message.date = date.getMonth()+'/'+date.getDate()+'/'+date.getFullYear();
	if(date.getHours()<=12){
		message.time = date.getHours()+':'+date.getMinutes()+"am";
	}else{
		message.time = (date.getHours()-12)+':'+date.getMinutes()+"pm";
	}
	message.sender_id = result.message_create.sender_id;
	messages.push(message);
}

var messages = [];
T.get('direct_messages/events/list', {count: 5}, function(err, data, response){
	var results = data.events;
	results.forEach(buildMessage);
});

app.get('/', (req, res) => {
	res.render('index', {me: me, tweets: tweets, followers: followers, messages: messages.reverse(), userId: me.id});
});

app.listen(3000, () => {
	console.log('The application is running in localhost:3000.');
});

