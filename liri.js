require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


switch (process.argv[2]){
    case 'spotify-this-song':
        var query='';
        for(var i =3; i<process.argv.length; i++){
            query+=process.argv[i]+' ';
        }
            spotify.search({ type: 'track', query: query }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               
              console.log(data.tracks.items[0].name); 
              console.log(data.tracks.items[0].artists[0].name); 
              console.log(data.tracks.items[0].album.name); 
              console.log(data.tracks.items[0].external_urls.spotify); 
              });
    case 'concert-this':

    case 'movie-this':

    case 'do-what-it-says':

}