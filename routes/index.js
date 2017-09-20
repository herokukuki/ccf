var express = require('express');
var router = express.Router();
var parser = require('./../libs/parser');
var downloader = require('./../libs/downloader');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
	res.render('test', { title: 'Download movie demo' });
});

router.post('/find', function(req, res, next) {
	let start = req.body.start ? req.body.start : 0;

	parser(start, req.body.film, (data) => {
		res.end(JSON.stringify({err:null, res: data}));
	});
});

router.post('/download', function(req, res, next) {
	var magnet = req.body.magnet;

	console.log(magnet);
	downloader(magnet);
});

module.exports = router;
