// This module logs all the video srcs from the given websites.
// Module used: request, cheerio
(function () {
    'use strict';
    var request = require('request');
    var cheerio = require('cheerio');
    var fs = require('fs');
    var DOWNLOAD_DIR = '/Users/wenlucheng/Downloads/html_database/mp4/';
    var URL = "http://allison.ee.washington.edu/thomas/mast/";
    var REG_START = /^(http(s)?:\/\/)|(www\.)/g;
    var REG_END = /.(edu|com|me).*$/;


    // create and return the local directory
    function createDirectory() {
        var fileDirectory = URL.replace(REG_START, '');
        fileDirectory = fileDirectory.replace(REG_END, '');
        if (!fs.existsSync(DOWNLOAD_DIR + fileDirectory)) {
            fs.mkdirSync(DOWNLOAD_DIR + fileDirectory);
        }
        return DOWNLOAD_DIR + fileDirectory + "/";
    }

    // download the video
    function videoDownload(videoURL) {
        request.get(videoURL).on('response', function (res) {
            var localPath = createDirectory();
            var fileName = videoURL.replace(URL, '');
            var fws = fs.createWriteStream(localPath + fileName.split('/').join('_'));
            res.pipe(fws);
            res.on('end', function () {
                console.log("done!");
            });
        });
    }

    // detects all the video links in a given website
    function getVideos(url, timeoutInMillisec) {
        var opts = {
            url: url,
            timeout: timeoutInMillisec
        };

        request(opts, function (err, res, body) {
            if (err) {
                console.log(err);
            }
            // if connection is good, search for all the video tags.
            if (res.statusCode === 200) {
                var video_sets = []; // video sets array
                var $ = cheerio.load(body);
                var i;
                // remove the same source
                for (i = 0; i < $('video').length; i += 1) {
                    if (video_sets.indexOf($('video')[i].attribs.src) === -1) {
                        video_sets.push(URL + $('video')[i].attribs.src);
                    }
                }
                if (video_sets) {
                    video_sets.forEach(function (video) {
                        videoDownload(video);
                    });
                    var fileName = 'videoSets.txt';
                    fs.writeFile(fileName, video_sets, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                    });
                }
            }
        });
    }

    getVideos(URL, 10 * 1000);
}());