display_domain = "mt.ecstaticblob.com";
//display_domain = "localhost:9000";
domain = "http://" + display_domain + "/";
check_apikey_url = domain + "checkapikey";
addManga_url = domain + "addmanga";
myManga_url = domain + "mymanga";

if(window.location.href.search(new RegExp(domain+"$")) != -1){
	$("#api_key").ready(function(){
		chrome.extension.sendRequest({
			action : "add_apikey",
			data : {
				"key": $("#api_key").val()
			}
		}, function(response) {
			$("body").append("<div class='confirm_key'>Your Api_key was successfully added to your manga tracker Chrome plugin</div>")
			$("<''>"confirm_key
		});
	});
			
}


if(window.location.host.indexOf("somemanga") != -1){
	$("head").ready(function(){
		$("script").each(function(index,element){
			if($(this).text().indexOf("manga_name=") > -1){
				var buffer = $(this).text();
				var manga = buffer.match(/manga_name='(.*)'/)[1];
				var issue = buffer.match(/issue='(.*)'/)[1];
				send(manga,issue);
			}
		});
	});	
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

