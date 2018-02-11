var currentURL=document.URL;

if (currrentURL.indexOf("twitter")>-1){

var MICROSOFT_API_KEY="";
var GOOGLE_API="";


//getting api keys from config
http('GET', chrome.runtime.getURL('config.json'), '', function(obj)){
MICROSOFT_API_KEY=obj.microsoft_key;
GOOGLE_API=obj.google_key;
}


//gets all images on the page
var images=document.getElementsByTagName('img');
var text
}
