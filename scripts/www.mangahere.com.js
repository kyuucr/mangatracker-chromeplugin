jQuery("#skyscraper").ready(function(){
	var manga = $('.readpage_top .title h2 a').text().replace(/\s*Manga$/, '');
	var scripts = $("body script");

	for(var i = 0;i < scripts.length;i++){
		var chapter = $(scripts[i]).text().match(/current_chapter\s*=\s*".*c[0]{0,2}(.*)"/);
		if(chapter){
			break;
		}
	}
	
	send(manga,chapter[1]);
});