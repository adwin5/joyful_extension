# joyful_extension
It aims to build an extension which let the users browse without the limitation of Internet and bandwidth by facilitating pre-downloading technique ,file system and chrome extension API.

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
######TODO: Algorith to parse the url and determine which foler (/nba, /espn ...) and the file name. 
######Code should be in parseUrl().

