// donutAnimation = {
// 	animate: function(options, animation, element, url){
// 		var anim = {};
// 		var delay = options.delay;
// 		var duration = options.duration;
// 		var easing = options.easing;


// 		if (animation == 'slideInFromRight'){
// 			element.velocity({
// 				"left": "100vw", 
// 				"opacity": 0,
// 			}, 0);
// 			anim = {"left": 0, "opacity": 1}
// 		}

// 		if (animation == 'slideOutToLeft'){
// 			anim = {"left": "-100vw", "opacity": 0}
// 		}

// 		if (animation == 'zoomIn'){
// 			element.velocity({
// 				"scale": 1.2, 
// 				"opacity": 0,
// 			}, 0);
// 			anim = {"scale": 1, "opacity": 1}
// 		}

// 		if (animation !== 'none'){
// 			element.velocity(anim, {duration: duration, easing: easing, delay: delay});
// 		}

// 		if (url){
// 			Meteor.setTimeout(function(){
// 				Router.go(url);
// 			}, (delay + duration));
// 		}
// 	}
	
// }


// animatePageIn = function(options){


// 	var page = $('.page');
// 	page.velocity({
// 		"left": "0px",
// 		"opacity": 1
// 	}, 1, donutEasingFunc);
// }

// pageOut = function(options){
// 	console.log(options);
	
// 	var $page = $('.page');
// 	var animation = options.animation;
// 	var url = options.url || null;
// 	var delay = options.delay;
// 	var duration = options.duration;
// 	var anim = {"left": "0vw", "opacity": 0};

// 	if (animation === 'slideOutLeft'){
// 		anim = {"left": "-100vw", "opacity": 0};
// 	}

// 	$page.velocity(anim,{duartion: duration, delay: delay});


// 	if (url){
// 		Meteor.setTimeout(function(){
// 			Router.go(url);
// 		}, (delay + duration));
// 	}
// }

// pageLoad = function(delay){
// 	var items = $('.item');
// 	_.each(items, function(item, index){
// 		Meteor.setTimeout(function(){
// 			animateItemIn($(item));
// 		}, delay * index);
// 	});

// 	pageIn();
// }


// pageZoomIn = function(){
// 	var page = $('.page');
// 	page.velocity({
// 		"opacity":"1.0",
// 		"scale":"1"
// 	}, {duration: 500, easing: easingFunc, delay: 100});
// }

// pageZoomOut = function(url){
// 	var page = $('.page');
// 	page.velocity({
// 		"opacity":"0.0",
// 		"scale":".9"
// 	}, 500, easingFunc);

// 	if (url){
// 		Meteor.setTimeout(function(){
// 			Router.go(url);
// 		}, 500);
// 	}
// }

// pageOut = function(){
// 	var page = $('.page');
// 	page.velocity({
// 		"left": "-200px"
// 	}, 300, donutEasingFunc);
// }