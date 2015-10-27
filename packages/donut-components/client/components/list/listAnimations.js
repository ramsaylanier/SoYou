animateItemsIn = function(options, items){

	var style = options.style;
	var duration = options.duration;
	var easing = options.easing;
	var delay = options.delay;

	_.each(items, function(item, index){
		if (style == 'slideInFromRight'){
			$(item).velocity({
				"left":"0vw",
				"opacity": 1
			}, {duration: duration, easing: easing, delay: index * delay});
		}
	});
}