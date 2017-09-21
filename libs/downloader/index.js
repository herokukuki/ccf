var fs = require('fs');
var path = require('path');

var torrentStream = require('torrent-stream');

var downloadMovie = (magnet) => {
    return new Promise(resolve => {
        var engine = torrentStream(magnet, {
            path: 'tmp/videos/',
        });

        var count = 0;
        var filesNum = 0;

        engine.on('ready', function () {
            engine.files.forEach(function (file) {
                var format = file.name.split('.').pop();
                filesNum = filesNum + 1;
                console.log('filename:', file.name);
                var stream = file.createReadStream(file);
                console.log('Torrent file download started');
                if (format === 'mp4' || format === 'webm' || format === 'ogg' || format === 'mkv') {
                    console.log('matching movie format');
                    console.log('Save this name: ' + file.name);
                    console.log('path is the following: ' + 'public/videos/' + file.name)
	                resolve(fs.createReadStream('public/videos/' + file.name).pipe(fs.createWriteStream('public/videos/' + file.name)));
                }
                else {
                    console.log('non-supported video format or other type of file');
                }
            })
        })

        engine.on('idle', function () {
            console.log('Torrent stream is being idle now');
            count = count + 1;
            if (count === filesNum) {
                console.log('Movie has been downloaded successfully!');
                return 1;
            }
        })
    })
}

module.exports = function (magnet) {
	downloadMovie(magnet)
};
