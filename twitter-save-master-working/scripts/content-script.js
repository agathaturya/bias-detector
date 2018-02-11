$(document).ready(function () {

	/*------------------------------( TSAVE )-------------------------------*/
	/* chrome extension that enables you to save tweets for later reference */
	/* Built by (https://twitter.com/gwuah_)[ Griffith Asare Awuah ]        */
	/* Frontend (https://twitter.com/assempah)[ Casprine Assempah ]         */
	/* November, 2017  -----------------------------------------------------*/

	/* necessary variable declarations */


	const DATABASE = Storage("twitterSave");
	const saveText = function(text) {
		console.log(text);

		var url = 'https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';
		var data1 = {username: 'example'};

		var documents = JSON.stringify({
		  "documents": [
		    {
		      "language": "en",
		      "id": "1",
		      "text": text.text()
		    }
		  ]
		});




		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;

		xhr.addEventListener("readystatechange", function () {
		  if (this.readyState === 4) {
		    console.log(this.responseText);
		  }
		});

		xhr.open("POST", "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment");
		xhr.setRequestHeader("Ocp-Apim-Subscription-Key", "0caddf51677e44aa948d5891c54d709d");
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.setRequestHeader("Cache-Control", "no-cache");
		xhr.setRequestHeader("Postman-Token", "29f3199e-4b78-6ed0-2215-0282664d8163");

		xhr.send(documents);
		fetch(url, {
		  method: 'POST', // or 'PUT'
		  body: JSON.stringify(documents),
		  headers: new Headers({
		    'Content-Type': 'application/json',
			'Accept': 'application/json',

			'Ocp-Apim-Subscription-Key': '0caddf51677e44aa948d5891c54d709d'
		  })
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => console.log('Success:', response));

		// var myObject = new Object();
		// myObject.name = "John";
		// myObject.age = 12;
		// myObject.pets = ["cat", "dog"];
        //
		// var myString = JSON.stringify(myObject);
		// console.log(myString);
	}
	const saveTweet = function(tweet) {
		const dataset = tweet.prop("dataset");
		const keys = Object.keys(dataset);
		const payLoad = {};

		keys.forEach(key=> {
			payLoad[key] = dataset[key];
		});

		DATABASE.save(payLoad);

		return true
	}
//Change the button icon
	const createSaveComponent = function(tweet,text) {
		const div = $("<div></div>").addClass("twitterSave-component");
		div.html(`<svg xmlns="http://www.w3.org/2000/svg" height="64" width="64"> <circle cx="32" cy="32" r="32" fill="#2ecc71"/></svg>`);
		div.css({
			"position": "relative",
			"width": "17px",
			"left": "310px",
			"bottom": "17px",
			"lineHeight":"17px"
		})

		// bind click event to the svg!
		const svg = div.find("svg");
		svg.on("click", function(e) {
			e.stopPropagation();
			saveTweet(tweet);
			saveText(text);
			//console.log(tweet);
			console.log(text.text());

			alert("tweet dfsdf saved!! GFY");
		})

		return div
	}

	const twitterSave = function twitterSave() {
		const tweets = $(".tweet");
		tweets.each(function(e) {
			// if tweet has already been tagged, ignore
			if (this.classList.contains("tSave")){
				return;
			}

			const tweet = $(this);
			const footer = tweet.find(".stream-item-footer");
			const text = tweet.find(".tweet-text");
			// add save button to the footer
			footer.append(createSaveComponent(tweet,text));
			// tag the tweet element!
			this.classList.add("tSave");
		})
	}

	// run script every 2.5 seconds!
	window.setInterval(twitterSave, 2500);

	console.log("twitter save extension running");
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.command == "getStorage") {
			let database = localStorage["twitterSave"];
			sendResponse(JSON.stringify(database))
		}
	})

})
