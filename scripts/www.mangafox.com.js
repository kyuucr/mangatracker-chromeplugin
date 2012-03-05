jQuery("body script").ready(function(){
	var manga = $("#header .widepage .cl>a").text().replace(/\s*Manga$/, '');
	var scripts = $("body script");
	for(var i = 0;i < scripts.length;i++){
		var chapter = $(scripts[i]).text().match(/current_chapter\s*=\s*".*c[0]{0,2}(.*)"/)[1];
		if(chapter){
			break;
		}
	}
	send(manga,chapter);
});