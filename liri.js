require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var thing = require('axios');
var moment = require('moment');
var fs = require('fs');


var query='';
        for(var i =3; i<process.argv.length; i++){
            query+=process.argv[i];
            if(i<process.argv.length-1){
                query+=' ';
            }
        }
if(process.argv[2]=='do-what-it-says'){
    fs.readFile('random.txt','utf8', function(error,data){
        if(error){
            return console.log(error)
        }
        dataArr=data.split(',');
        process.argv[2]=dataArr[0];
        if(dataArr[1].substring(0,1)=='"'&&dataArr[1].substring(dataArr[1].length-1,dataArr[1].length)=='"'){
            query=dataArr[1].substring(1,dataArr[1].length-1)
        }
        else{
            query=dataArr[1];
        }
        
        Switch();
    });
    
}
else{
    Switch();
}
function Switch(){
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
                  var thisThing=data.tracks.items[i].name+'\n'+data.tracks.items[i].artists[0].name+'\n'+data.tracks.items[i].album.name+'\n'+data.tracks.items[i].external_urls.spotify;
                  console.log(thisThing)
                  fs.appendFile('log.txt','spotify-this-song '+query+'\n\n'+thisThing+'\n\n', function(err){
                    if(err){
    
                    }
                }) 
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
                fs.appendFile('log.txt','concert-this '+query, function(err){
                    if(err){
    
                    }
                })
                for(i in response.data){
                var thisThing = ('\n\nVenue Name: '+ response.data[i].venue.name+'\nLocation: '+response.data[i].venue.city+', '+response.data[i].venue.region+' '+response.data[i].venue.country+'\nDate: '+moment(response.data[i].datetime).format('ddd MMM D, YYYY'))
                console.log(thisThing);
                fs.appendFile('log.txt',thisThing, function(err){
                    if(err){
    
                    }
                })
                }
                
            })
            break;
    case 'movie-this':
            var thisThing='';
            if(query==''){
                query='Mr. Nobody'
            }
            var queryUrl = "http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy";
            thing.get(queryUrl).then(function(response){
            thisThing=("\nTitle: "+response.data.Title+"\nYear: "+response.data.Year+"\nIMDB Rating: " +response.data.imdbRating+'/10'+"\nRotten Tomatoes Rating: " +response.data.Ratings[1].Value+("\nCountry of Origin: " +response.data.Country+"\nLanguage: " +response.data.Language+"\nPlot: " +response.data.Plot+"\nActors: " +response.data.Actors))
                // console.log(response.data)
                console.log(thisThing)
                fs.appendFile('log.txt','movie-this '+query+'\n'+thisThing+'\n\n', function(err){
                    if(err){
    
                    }
                })
            })
            
            break;
        case 'do-what-it-says':
           
}
}