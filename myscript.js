
if(window.location.host.indexOf("somemanga") != -1){
	jQuery("#select_div_holder").ready(function(){
		var manga = jQuery("#manga_select_div select").val();
		var issue = jQuery("#issue_select_div select").val();
		send(manga,issue);
	})
}
	
if(window.location.host.indexOf("mangareader") != -1){
	jQuery("#mangainfo h1").ready(function(){
		var matches = jQuery("#mangainfo h1").html().match(/^(.*)\s+([0-9]+)$/);
		if(matches.length == 3){
			var manga = matches[1];
			var issue = matches[2];
			send(manga,issue);
		}
	})
}

if(window.location.host.indexOf("mangafox") != -1){
	jQuery("#chnav h2").ready(function(){
		var matches = jQuery("#chnav h2").html().match(/(.*)\s(\d+)/);
		if(matches.length == 3){
			var manga = matches[1];
			var issue = matches[2];
			send(manga,issue);
		}
	})
}



if(window.location.host.indexOf("mangahere") != -1){
	jQuery(".readpage_top").ready(function(){
		var matches = jQuery(".readpage_top h1 a").html().match(/(.*)\s(\d+)/);
		if(matches.length == 3){
			var manga = matches[1];
			var issue = matches[2];
			send(manga,issue);
		}
	})
}

if(window.location.host.indexOf("mangastream") != -1){
	jQuery("#top h3").ready(function(){
		var matches = jQuery("#top h3").text().match(/»\s(.+)\s(\d+)/);
		if(matches.length == 3){
			var manga = matches[1];
			var issue = matches[2];
			send(manga,issue);
		}
	})
}



if(window.location.host.indexOf("mangable") != -1){
	jQuery("#select_page").ready(function(){
		var matches = jQuery("#breadcrumbs li:last-child").text().match(/(.+)\sChapter\s(\d+)/);
		if(matches.length == 3){
			var manga = matches[1];
			var issue = matches[2];
			send(manga,issue);
		}
	})
}



function send(manga,issue){
	if(typeof manga  == "string" && typeof parseInt(issue) == "number"){
		chrome.extension.sendRequest({
			action: "add_manga",
			data : {
				"manga_name": manga,
				"chapter.issue": issue + "",
				"chapter.url":window.location.href,
				"chapter.host":window.location.host
			}
		}, function(response) {
			console.log("complete",response.complete);
		});
	}
}

