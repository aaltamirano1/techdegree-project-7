<?php
require_once('TwitterAPIExchange.php');
 
/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
	    'oauth_access_token' => "993944753124278273-IYoc7njTBDex6jRv9U7oXAzWCPcPjEp",
	    'oauth_access_token_secret' => "mBC6nrMuITK4sFMLuBTmaPiKNbq1bIcwZGDPyeTOtV1CG",
	    'consumer_key' => "BTmuBT8uY0ACFfOO9CKsSjBvt",
	    'consumer_secret' => "ghFwrURUt2oC8n6ZQCNigJaR9KxNj6mxfS0q1PHfClBFC02AVs"
	);
 
$url = "https://api.twitter.com/1.1/statuses/user_timeline.json";
 
$requestMethod = "GET";
 
$getfield = '?screen_name=iagdotme&count=20';
 
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
?>