jQuery("#top h3").ready(function(){
	var matches = jQuery("#top h3").text().match(/Å‚\s(.+)\s(\d+)/);
	if(matches.length == 3){
		var manga = matches[1];
		var issue = matches[2];
		send(manga,issue);
	}
});