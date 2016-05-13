// This module logs all the video srcs from the given websites.
// Module used: request, cheerio

(function () {
    'use strict';
    var request = require('request');
    var cheerio = require('cheerio');

    var url_1 = "http://allison.ee.washington.edu/thomas/mast/";
    var timeoutInMillisec = 100 * 1000;

    // options for requesting the webpages
    var opts = {
        url: url_1,
        timeout: timeoutInMillisec
    };

    // request the page content
    var exports = {
        requestVideo: function () {
            request(opts, function (err, res, body) {
                if (err) {
                    console.log(err);
                    return;
                }
                // if connection is good, search for all the video tags.
                if (res.statusCode === 200) {
                    var video_sets = [];
                    var $ = cheerio.load(body);
                    var i;
                    // remove the same source
                    for (i = 0; i < $('video').length; i += 1) {
                        if (video_sets.indexOf($('video')[i].attribs.src) === -1) {
                            video_sets.push(url_1 + $('video')[i].attribs.src);
                        }
                    }
                    console.log(video_sets);
                }
            });
        }
    };
    module.exports = exports;
}());