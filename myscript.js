display_domain = "mt.ecstaticblob.com";
//display_domain = "localhost:9000";
domain = "http://" + display_domain + "/";
check_apikey_url = domain + "checkapikey";
addManga_url = domain + "addmanga";
myManga_url = domain + "mymanga";

var host = window.location.host;

if(host.match("somemanga")){
	$("body").ready(function(){
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

if(host.match("mangareader")){
	jQuery("#mangainfo h1").ready(function(){
		var matches = jQuery("#mangainfo h1").html().match(/^(.*)\s+([0-9]+)$/);
		if(matches.length == 3){
			var manga = matches[1];
			var issue = matches[2];
			send(manga,issue);
		}
	})
}

if(host.match("mangafox")){
	jQuery("#chnav h2").ready(function(){
		var matches = jQuery("#chnav h2").html().match(/(.*)\s(\d+)/);
		if(matches.length == 3){
			var manga = matches[1];
			var issue = matches[2];
			send(manga,issue);
		}
	})
}

if(host.match("mangahere")){
	jQuery(".readpage_top").ready(function(){
		var matches = jQuery(".readpage_top h1 a").html().match(/(.*)\s(\d+)/);
		if(matches.length == 3){
			var manga = matches[1];
			var issue = matches[2];
			send(manga,issue);
		}
	})
}

if(host.match("mangastream")){
	jQuery("#top h3").ready(function(){
		var matches = jQuery("#top h3").text().match(/»\s(.+)\s(\d+)/);
		if(matches.length == 3){
			var manga = matches[1];
			var issue = matches[2];
			send(manga,issue);
		}
	})
}

if(host.match("mangable")){
	jQuery("#select_page").ready(function(){
		var matches = jQuery("#breadcrumbs li:last-child").text().match(/(.+)\sChapter\s(\d+)/);
		if(matches.length == 3){
			var manga = matches[1];
			var issue = matches[2];
			send(manga,issue);
		}
	})
}

var href = window.location.href;
if(href.match(new RegExp(domain +"$"))){
	$("#api_key").ready(function(){
		sendKey($("#api_key").val(), false);
	});		
}

function sendKey(key, force){
	chrome.extension.sendRequest({
		action : "add_apikey",
		data : {
			"key": key,
			"force": force
		}
	}, function(response) {
		//key matches user account
		if(response.insync){
			$(".status_api_key").remove();
			$("<div class='status_api_key container_shape'><div class='c-ap'><h2>Your user account and chrome plugin are in sync</h2><p> you can start reading and tracking manga now</p></div></div>").insertAfter($(".quick_bar"));
		}
		//dosent match
		if(!response.insync){
			$(".status_api_key").remove();
			var wrapper = $("<div class='status_api_key container_shape'><div class='c-ap'><h2>Your user account and chrome plugin are NOT in sync</h2><p> Left as is, manga cannot be tracked on this account.<button class='change'>Add Apikey</button></p></div></div>").insertAfter($(".quick_bar"));
		
			wrapper.find(".change").click(function(){
				sendKey($("#api_key").val(), true);
			});
		}
	});
}

function send(manga,issue){
	if(manga && issue){
		chrome.extension.sendRequest({
			action: "add_manga",
			data : {
				"manga_name": manga,
				"chapter.issue": issue,
				"chapter.url":window.location.href,
				"chapter.host":window.location.host
			}
		}, function(response) {
			
		});
	}
}
