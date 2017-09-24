let keys = require("./keys.js");
let arr = process.argv.splice(2);
let request = require("ajax-request");
let fs = require("fs");

let getTweets = function() {
	let params = {screen_name: "UCB_TT"};
	keys.twitter.get("statuses/user_timeline", params, function(error, tweets, response) {
		if(error) throw error;
		let dataString = ""; 
		for (let i = 0; i < tweets.length; i++) {
			dataString += `Tweeted: '${tweets[i].text}' on ${tweets[i].created_at}\n`;
		}

  	logFile("my-tweets", dataString);
	});
}

let getSong = function(song) {
	if (song === undefined) song = "\"The Sign\"";
	keys.spotify.search({ type: "track", query: song, limit: 3 }, function(err, data) {
	  if (err) throw err;
  	let dataString = "Artist(s): ";
		for (let j = 0; j < data.tracks.items[0].artists.length; j++) {
			dataString += data.tracks.items[0].artists[j].name;
			dataString += j !== data.tracks.items[0].artists.length-1 ? ", " : "\n";
		}
		dataString += `Song: ${data.tracks.items[0].name}\n`;
  	dataString += `Album: ${data.tracks.items[0].album.name}\n`;
		dataString += `Link: ${data.tracks.items[0].external_urls.spotify}\n`;

  	logFile(`spotify-this-song ${song}`, dataString);
	});
}

let getMovie = function(movie) {
	if (movie === undefined) movie = "Mr. Nobody";
  request({
  	url: "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece",
  	method: 'GET',
	}, function(err, res, body) {
  	if (err) throw err;
  	let data = JSON.parse(body);
  	dataString = `Title: ${data.Title}\n`;
  	dataString += `Year: ${data.Year}\n`;
  	if (data.Ratings.length > 0) dataString += `IMDB Rating: ${data.Ratings[0].Value}\n`;
  	if (data.Ratings.length > 1) dataString += `Rotten Tomatoes Rating: ${data.Ratings[1].Value}\n`;
  	dataString += `Country Produced: ${data.Country}\n`;
  	dataString += `Language: ${data.Language}\n`;
  	dataString += `Plot: ${data.Plot}\n`;
  	dataString += `Actors: ${data.Actors}\n`;

  	logFile(`movie-this ${movie}`, dataString);
	});
}

let readFile = function(file) {
	if (file === undefined) file = "random.txt";
	let lines = fs.readFileSync(file, 'utf8').split("\n");
	for (let i = 0; i < lines.length; i++) {
		let data = lines[i].split(",");
		liri(data[0], data[1]);
	}
}

let logFile = function(command, data) {
	dataString = `RAN ---> ${command}\n${data}\n`;
	fs.appendFile('log.txt', dataString, function (err) {
  	if (err) throw err;
		console.log(dataString);
	});
}

let liri = function(command, param) {
	switch (command) {
		case ("my-tweets"): getTweets(param); break;
		case ("spotify-this-song"): getSong(param); break;
		case ("movie-this"): getMovie(param); break;
		case ("do-what-it-says"): readFile(param); break;
		default: console.log("Function does not exist."); break;
	}
}

liri(arr[0], arr[1]);