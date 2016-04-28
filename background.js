
//set interval of update
setInterval(function(){updateDownload();}
  , 10000);

function updateDownload(){
	var url_1 = "http://www.nba.com/";
	var url_2 = "http://espn.go.com/";
	chrome.downloads.download({url: url_2}, function(id) {});
}

//rename and overwiate setting
chrome.downloads.onDeterminingFilename.addListener(function(item, suggest) {
  
  //alert(item.url);
  suggest({filename: generateFilename(item),
           conflict_action: 'overwrite',
           conflictAction: 'overwrite'});
});

function generateFilename(item){
  var d = new Date();
  var filename;
  //if no file folder???
  var prefixFilename;
  var parseResult = parseURL(item);
  switch(parseResult.folder){
  	case 0:
  		prefixFilename = "/nba/";
  		break; 
  	case 1:
  		prefixFilename = "/espn/";
  		break;
  	case 2:
  		prefixFilename = "/nytimes/";
  		break;			
  	default:
  		prefixFilename = "/unknown/";	
  }
  // Because of overwrite, the file donwloaded this Monday will overwrite the file downloaded on last Monday
  // For example, on Wednesday, d.getDay() === 3
  // html_database is the root foler
  filename = "html_database"+prefixFilename+parseResult.filename+d.getDay()+".html"; 
  return filename;
}

//This funciton determines which folder the downloaded websites belond to
//-1 - unknown
// 0 - nba
// 1 - espn
// 2 - nwtimes
// .
// .
// .
// example :
// Below are NBA
// "http://www.nba.com/" 
// "http://www.nba.com/tntovertime/?ls=iref:nbahpt6a"
// "http://global.nba.com/articles/gamestream_second_screen.html#!/20160427?ds=single&gameDate=2016-04-27&showFooter=false&cid=nbacom:secondscreen%3Fls%3Diref:nbahpts"
// "http://allball.blogs.nba.com/2016/04/26/messi-has-a-present-for-curry/?ls=iref:nbahppt"
// Below are espn
// "http://espn.go.com/nba/game?gameId=400874421"
// "http://espn.go.com/nfl/story/_/id/15414505/nfl-sees-no-need-reopen-settlement-talks-tom-brady-nflpa"
// Below are New York Times
// "http://www.nytimes.com/"
// "http://nyti.ms/26uSvTZ"
// "http://www.nytimes.com/2016/04/28/world/americas/colombia-farc-child-soldiers.html?_r=0"
// "http://www.nytimes.com/2016/04/28/us/politics/donald-trump-foreign-policy-speech.html"
function parseURL(item){
	var parseResult = {
		"folder" : -1,
		"filename" : ""
	};
	var url = item.url;
	//overate the parseResult.folder & parseResult.filename
	//write code here
    
	return parseResult;
}
