'use strict';
var REG_START = /^(http(s)?:\/\/)|(www\.)/g;
var REG_END = /.(edu|com|me).*$/;
var DOWNLOAD_DIR = '/Users/wenlucheng/Downloads/html_database/mp4/';
var selectedId = -1;
var READ_DIR = 'file:///Users/wenlucheng/Desktop/Github/joyful_extension/';
var videoSets;

function refreshLanguage() {
    chrome.tabs.detectLanguage(null, function (language) {
        if (language == " invalid_language_code") {
            language = "???";
        }
        chrome.browserAction.setBadgeText({
            text: language,
            tabId: selectedId
        });
    });
}

chrome.tabs.onUpdated.addListener(function (tabId, props, updatedtab) {
    if (props.status === "complete" && tabId === selectedId) {
        refreshLanguage();
    }
});

function readText() {
    var x = new XMLHttpRequest();
    x.onload = function(){
        videoSets = x.responseText;
    };
    x.open("GET", READ_DIR + 'videoSets.txt', true);
    x.send();
}

// open corresponding local file
function openLocalFile(url) {
    // var target = 'http://allison.ee.washington.edu/thomas/mast/video/video1_mast.mp4';
    var topUrl = 'http://allison.ee.washington.edu/thomas/mast/';
    var localPath = url.replace(REG_START, '');
    localPath = localPath.replace(REG_END, '') + '/';
    var videoFileName = url.replace(topUrl, '');
    videoFileName = videoFileName.split('/').join('_');
    var localUrl = "file://" + DOWNLOAD_DIR + localPath + videoFileName;
    readText();
    if (videoSets.includes(url)) {
        chrome.tabs.update({
            //selected: true,
            url: localUrl
        });
    }
}

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        openLocalFile(tab.url);
    });
});

chrome.tabs.onSelectionChanged.addListener(function (tabId, props) {
    selectedId = tabId;
    refreshLanguage();
});

chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    selectedId = tabs[0].id;
    refreshLanguage();
});
