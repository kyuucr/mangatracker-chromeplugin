

function get_placement(){
	var index_highest = 0;
	$("div").each(function() {
	    var index_current = parseInt($(this).css("zIndex"), 10);
	    if(index_current > index_highest) {
	        index_highest = index_current;
	    }
	});
	return Math.min(index_highest,2147483646) + 1;
}



	model = {};
	model.views = {};
	model.config = {};
	model.rules = {};
	
(function(Public,Private){ 
	
	Public.init = function(){
		
		
		
		
		
		this.menu = $("<div id='trakk3r-l8n11-menu'></div>");
		this.menu.css({"z-index": get_placement()});
		
		
		
		this.rules = $("<div id='trakk3r-l8n11-rule-option'> R </div>");
		this.rules.click(function(){
			Public.menu.append(model.rules.rule_view);
		})	
		model.rules.rule_view = $("<div id='trakk3r-l8n11-rule_view'></div>");
		
		var select_chapter = $("<div>select</div>");
		
		
		this.config = $("<div id='trakk3r-l8n11-config-option'> C </div>");
		
		this.menu.append(this.rules).append(this.config);
		$("body").append(this.menu);
	}
		
	
	
	Public.init();	
})(model.views, {});



