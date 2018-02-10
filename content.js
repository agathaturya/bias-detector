var MICROSOFT_API_KEY="";
var GOOGLE_API="";
var TWITTER_API=["","","",""];


//getting api keys from config
http('GET', chrome.runtime.getURL('config.json'), '', function(obj)){
MICROSOFT_API_KEY=obj.microsoft_key;
GOOGLE_API=obj.google_key;
TWITTER_API[0]=obj.twitter_oauth_access_token
TWITTER_API[1]=obj.twitter_oauth_access_token_secret
TWITTER_API[2]=obj.twitter_consumer_key
TWITTER_API[3]=obj.twitter_consumer_secret
}


//gets all images on the page
var images=document.getElementsByTagName('img');
