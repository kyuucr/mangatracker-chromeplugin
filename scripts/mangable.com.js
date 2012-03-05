jQuery("#select_page").ready(function(){
	var matches = jQuery("#breadcrumbs li:last-child").text().match(/(.+)\sChapter\s([^:]+)/);
	if(matches.length == 3){
		var manga = matches[1];
		var issue = matches[2];
		send(manga,issue);
	}
});