// This module logs all the video srcs from the given websites.
// Module used: request, cheerio
(function () {
    'use strict';
    var request = require('request');
    var cheerio = require('cheerio');
    var fs = require('fs');
    var DOWNLOAD_DIR = '/Users/wenlucheng/Downloads/html_database/mp4/';
    var URL = "http://allison.ee.washington.edu/thomas/mast/";


    function videoDownload(URL) {
        request.get(URL).on('response', function (res) {
            var filename = 'test.mp4';
            var fws = fs.createWriteStream(DOWNLOAD_DIR + filename);
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
                    videoDownload(video_sets[0]);
                }
            }
        });
    }

    getVideos(URL, 10 * 1000);
}());