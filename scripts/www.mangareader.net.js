jQuery("head script").ready(function(){			 
	var buffer = $(jQuery("head script")[4]).text();
	var manga = $("#mangainfo .c2 a").text().replace(/(\s)*Manga$/, '');
	var chapter = buffer.match(/document\['chapterno'\]\s*=\s*([^;]*)/)[1];
	send(manga,chapter);
});