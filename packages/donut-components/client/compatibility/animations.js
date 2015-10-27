donutAnimation = {
	findAnimation: function(options, animationType, element, url, velocityProps){
		var transiton;

		if (animationType == 'slideInFromRight'){
			element.velocity({
				"translateX": "100vw", 
				"opacity": 0,
			}, 0);
			transition = donutTransition.slideInFromRight(element);
		}

		if (animationType == 'slideOutToLeft'){
			transition = donutTransition.slideOutToLeft(element);
		}

		if (animationType == 'zoomIn'){
			transition = donutTransition.zoomIn(element);
		}

		if (animationType == 'zoomOut'){
			transition = donutTransition.zoomOut();
		}

		if (animationType !== 'none'){
			this.animate(element, transition, options)
		}

		if (url){
			Meteor.setTimeout(function(){
				Router.go(url);
			}, (options.delay + options.duration));
		}
	},
	shelfOpen: function(shelf){

		var page = $('.page');
		var transition;
		var options = {};

		if (shelf.hasClass('right-shelf')){
			transition = donutTransition.slideLeft();
		} else if (shelf.hasClass('left-shelf')){
			transition = donutTransition.slideRight();
		}

		this.animate(page, transition, options);
		this.animate(shelf, transition, {duration: 1});
	},
	shelfClose: function(shelf, noPage){
		
		var transition;
		var options = {};

		transition = donutTransition.slideBack();
		this.animate(shelf, transition, {duration: 1, delay: 500});

		if (!noPage){
			var page = $('.page');
			this.animate(page, transition, options);
		}

	},
	animate: function(element, transition, options){
		var delay = options.delay || 0;
		var duration = options.duration || 500;
		var easing = options.easing || 'easeOut';

		element.velocity(transition, {duration: duration, easing: easing, delay: delay});
	}
}

donutTransition = {
	slideInFromRight: function(element){
		element.velocity({
			"translateX": "100vw", 
			"opacity": 0,
		}, 0);

		return {"translateX": 0, "opacity": 1};
	},
	slideOutToLeft: function(){
		return {"translateX": "-100vw", "opacity": 0};
	},
	zoomIn: function(element){
		element.velocity({
			"scale": 1.2, 
			"opacity": 0,
		}, 0);
		return {"scale": 1, "opacity": 1};
	},
	zoomOut: function(){
		return {"scale": 1.2, "opacity": 0};
	},
	slideLeft: function(){
		return {"translateX": -200}
	},
	slideRight: function(){
		return {"translateX": 200}
	},
	slideBack: function(){
		return {"translateX": 0}
	}
}