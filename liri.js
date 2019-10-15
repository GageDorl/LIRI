require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var thing = require('axios');
var moment = require('moment');


var query='';
        for(var i =3; i<process.argv.length; i++){
            query+=process.argv[i];
            if(i<process.argv.length-1){
                query+=' ';
            }
        }

switch (process.argv[2]){
    case 'spotify-this-song':
        var found=false;
        var finished = false;
            if(query==''){
                query="The Sign"
            }
            
            spotify.search({ type: 'track', query: query }, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
               
              for(i in data.tracks.items){
                  if((query.toLowerCase())==data.tracks.items[i].name.toLowerCase()){
                  console.log(data.tracks.items[i].name)
                  console.log(data.tracks.items[i].artists[0].name); 
                  console.log(data.tracks.items[i].album.name); 
                  console.log(data.tracks.items[i].external_urls.spotify); 
                    break;
                    found=true;
                  }
                  if(i==data.tracks.items.length-1){
                      finished=true;
                  }
                  
                //   console.log(data.tracks.items[i].name) 
              }
              
              });
              if(!found&&finished){
                console.log("No song found");
                }
              break;
    case 'concert-this':
            var queryUrl = "https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp";
            thing.get(queryUrl).then(function(response){
                for(i in response.data){
                console.log();
                console.log('Venue Name: '+ response.data[i].venue.name)
                console.log('Location: '+response.data[i].venue.city+', '+response.data[i].venue.region+' '+response.data[i].venue.country)
                console.log('Date: '+moment(response.data[i].datetime).format('ddd MMM D, YYYY'))
                console.log()
                }
                
            })
            break;
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