var express = require('express');
var router = express.Router();
var config = require('../config/config');
var request = require('request');



const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = apiBaseUrl + '/movie/now_playing?api_key='+config.apiKey
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';


/* GET home page. */
router.get('/', function(req, res, next) {
	request.get(nowPlayingUrl,(error, response, movieData)=>{
		var parsedData = JSON.parse(movieData);
		// var movieInfo = JSON.parse(movieData.title)
		console.log(parsedData);		
		res.render('index',{ 
			parsedData: parsedData.results,
			imageBaseUrl: imageBaseUrl
			
		})
	});

  // res.render('index', { title: 'Express' });
});

router.post('/search', (req,res)=>{
	// ANYTHING IN A FORM THAT HAS A NAME SENT THROUGH post
	// IS AVAILABLE INSIDE THE REQ.BODY OBJECT
	/////SENDS DATA THROUGH THE BODY
	// res.json(req.body)
	var userSearch = req.body.movieSearch
	var searchUrl = `${apiBaseUrl}/search/movie?query=${userSearch}&api_key=${config.apiKey}`;
	request.post(searchUrl,(error,response,movieData)=>{
		var parsedData = JSON.parse(movieData)
		res.json(parsedData)
})

////if you have /: that part of the path is WILD
///in this case, /movie/:movieId will trigger on /movie/ANYTHING
// to access anything, you go to req.params.ANYTHING
router.get('/movie/:movieId',(req,res)=>{
	// res.json(req.params)
	var movieId = req.params.moveId;
	var thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_Key=${config.apiKey}`;
	request.get(thisMovieUrl),(error,response,movieData)=>{
		var parsedData = JSON.parse(movieData);
		res.json(parsedData)
		// res.render('single-movie',{
		// 	movieData: parsedData,
		// 	imageBaseUrl: imageBaseUrl
		// })
	}
})

router.get('/search', (req,res)=>{
	// ANYTHING IN A FORM THAT HAS A NAME SENT THROUGH GET
	// IS AVAILABLE INSIDE THE REQ.QUERY OBJECT
	/////SEND DATA THROUGHT THE URL (NOT GOOD FOR SEQUIRY REASONS)
	// res.json(req.query)

	})
})

module.exports = router;
