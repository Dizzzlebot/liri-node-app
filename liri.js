require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");



var action = process.argv[2];
var value = process[3];


switch (action) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;

    default:
        break;

        console.log("this is not recognized");

}

function concertThis() {
    var artist = process.argv[3];
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"


    //axios
    axios.get(queryURL).then(
            function (response) {
                // console.log(response.data);
                for (let i = 0; i < response.data.length; i++) {
                    console.log("**********CONCERT INFO*********");
                    console.log(response.data[i].venue.name);
                    console.log(response.data[i].venue.city);
                    console.log(response.data[i].venue.region);
                    console.log(moment(response.data[i].datetime).format("L"));
                }
            })

        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}

//Funtion for Music Info: Spotify
function spotifyThisSong() {
    if (process.argv[3] === undefined) {
        process.argv[3] = "I want it that way"; //default Song
    }
    spotify.search({
            type: "track",
            query: process.argv[3]
        },
        function (err, data) {
            if (err) {
                console.log("Error occurred: " + err);
                return;
            }
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                console.log("**********SONG INFO*********");
                fs.appendFileSync("log.txt", "**********SONG INFO*********\n");
                console.log(i);
                fs.appendFileSync("log.txt", i + "\n");
                console.log("Song name: " + songs[i].name);
                fs.appendFileSync("log.txt", "song name: " + songs[i].name + "\n");
                console.log("Preview song: " + songs[i].preview_url);
                fs.appendFileSync("log.txt", "preview song: " + songs[i].preview_url + "\n");
                console.log("Album: " + songs[i].album.name);
                fs.appendFileSync("log.txt", "album: " + songs[i].album.name + "\n");
                console.log("Artist(s): " + songs[i].artists[0].name);
                fs.appendFileSync("log.txt", "artist(s): " + songs[i].artists[0].name + "\n");
                console.log("*****************************");
                fs.appendFileSync("log.txt", "*****************************\n");
            }
        }
    );
};














function showSomeInfo() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var dataArr = data.split(',');
        UserInputs(dataArr[0], dataArr[1]);
    });
}