# joyful_extension
It aims to build an extension which let the users browse without the limitation of Internet and bandwidth by facilitating pre-downloading technique ,file system and chrome extension API.

###Requirement
* chrome <br>
* OSX 10.9 or later

###How to run
type "chrome://extensions/" in your chrome
```
chrome://extensions/
```
then upload the package
###How to debug
type "chrome://extensions/" in your chrome
```
chrome://extensions/
```
then go to the "joyful_extension", choose "enable" and click "background page".
You should be able to see chrome console.
###Reference
Google Chrome Extension API
###Version 1.0
Version 1.0 aims to download fixed websites and focus on rename and set path for downloaded file.<br>
EX: websites relating to NBA should stored in to nba folders.<br>
User should have /html_database under his chrome default download path.<br>
Then user needs to create /espn , /nba, /nytimes, /unknwon under /html_database
```
/html_database ---/espn
                |
                --/nba
                |
                --/nytimes
                |
                --/unknwon
```              
######TODO: Algorithm to parse the url and determine which folder (/nba, /espn ...) and the file name. 
######Code should be in parseUrl().

###Schedule
week5
- automatically update and store the website to the local (fixed websites) 

week6
- classify the download webpage (nab, espy, or nwtimes…)
- popup pages when user needed

week7
- try other websites
- dolownload material of video format

week8
- run parser on browser (download dynamic websites) (using Browserify)

week9
- applying RSS to do update for minizing download bandwidth
