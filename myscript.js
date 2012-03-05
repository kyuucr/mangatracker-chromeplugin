display_domain = "mt.ecstaticblob.com";
//display_domain = "localhost:9000";
domain = "http://" + display_domain + "/";
check_apikey_url = domain + "checkapikey";
addManga_url = domain + "addmanga";
myManga_url = domain + "mymanga";
domian_login = domain + "login";

var host = window.location.host;

/*if(host.match("somemanga")){
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
	jQuery("head script").ready(function(){			 
		var buffer = $(jQuery("head script")[4]).text();
		var manga = $("#mangainfo .c2 a").text().replace(/(\s)*Manga$/, '');
		var chapter = buffer.match(/document\['chapterno'\]\s*=\s*([^;]*)/)[1];
		send(manga,chapter);
	})
}

if(host.match("mangafox")){
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
	})
}

//The location of the <Script> tag changed and there are spaces between the equals file
if(host.match("mangahere")){
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
		var matches = jQuery("#breadcrumbs li:last-child").text().match(/(.+)\sChapter\s([^:]+)/);
		if(matches.length == 3){
			var manga = matches[1];
			var issue = matches[2];
			send(manga,issue);
		}
	})
}*/

var href = window.location.href;
if(href.match(new RegExp(domain +"[#]*$"))){
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
			$(".sync_api_key").hide();
			$("#response .insync").show();
		}
		//dosent match
		if(!response.insync){
			$(".sync_api_key").hide();domian_login
			wrapper = $("#response .nosync").show();
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

chrome.extension.sendRequest({action : "get_script", data: host}, function (response) {
	eval(response.data);
});