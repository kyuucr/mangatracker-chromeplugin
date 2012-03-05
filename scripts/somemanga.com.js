jQuery("body").ready(function(){
	$("script").each(function(index,element){
		if($(this).text().indexOf("manga_name=") > -1){
			var buffer = $(this).text();
			var manga = buffer.match(/manga_name='(.*)'/)[1];
			var issue = buffer.match(/issue='(.*)'/)[1];
			send(manga,issue);
		}
	});
});	