require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var thing = require('axios');

var query='';
        for(var i =3; i<process.argv.length; i++){
            query+=process.argv[i]+' ';
        }

switch (process.argv[2]){
    case 'spotify-this-song':
        
            spotify.search({ type: 'track', query: query }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               
              console.log(data.tracks.items[0].name); 
              console.log(data.tracks.items[0].artists[0].name); 
              console.log(data.tracks.items[0].album.name); 
              console.log(data.tracks.items[0].external_urls.spotify); 
              });
              break;
    case 'concert-this':

    case 'movie-this':
            var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
            thing.get(queryUrl).then(function(response){
                console.log("Title: "+response.data.Title);
                console.log("Year: "+response.data.Year);
                console.log("IMDB Rating: " +response.data.Ratings[0].Value);
                console.log("Rotten Tomatoes Rating: " +response.data.Ratings[1].Value);
                console.log("Country of Origin: " +response.data.Country)
                console.log("Language: " +response.data.Language)
                console.log("Plot: " +response.data.Plot)
                console.log("Actors: " +response.data.Actors)
            })
    case 'do-what-it-says':

}