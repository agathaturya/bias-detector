var currentURL=document.URL;
var  MICROSOFT_API_KEY="";
var GOOGLE_API="";

console.log(currentURL);

if (currentURL.indexOf("twitter")>-1){

var http = function (method, url, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) { return; }
    if (xhr.status >= 400) {
      notify('API request failed');
      console.log('XHR failed', xhr.responseText);
      return;
    }
  cb(JSON.parse(xhr.responseText));
  };
  xhr.send(body);
};

http('GET', chrome.runtime.getURL('config.json'), '', function (obj) {
    MICROSOFT_API_KEY=obj.microsoft_key;
    GOOGLE_API=obj.google_key;
    document.addEventListener('DOMContentLoaded', checkTweets(), false);

});
function checkTweets(){

  //gets all images on the page
  var images=document.getElementsByTagName('img');

  }
}
