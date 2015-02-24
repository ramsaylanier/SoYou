var easingFunc = [ .3, 0.8, 0.1, 1 ];

startLoading = function(){
	var counter = -1;
	var blocks = $('.block');

	var interval = Meteor.setInterval(function () {
		counter++;
		if ($('.blocks').length){

			$(blocks[counter]).velocity({
				"opacity": 1,
				"scale": 1.1
			}, 200, easingFunc);

			if (counter === blocks.length) {
				$('.block').velocity({
					"opacity": 0,
					"scale": .8
				}, 200, easingFunc);
				counter = -1;
			} 
		}
		else {
			Meteor.clearInterval(interval);
		}
	}, 200);
}

landingPageLoad = function(){
	var awards = $('.award-type');
	_.each(awards, function(award, index){
		Meteor.setTimeout(function(){
			awardTypeIn($(award));
		}, 50 * index);
	});

	pageIn();
}

landingPageOut = function(url){
	var awards = $('.award-type');

	_.each(awards, function(award, index){
		Meteor.setTimeout(function(){
			awardTypeOut($(award));
		}, 50 * index);
	})

	if (url){
		Meteor.setTimeout(function(){
			Router.go('awardsList', {type: url});
		}, (50 * awards.length) + 600);
	}
}

awardListOut = function(url){
	closeMenuState();
	awardTypeOut($('.award-type'));

	//reset awardLimit
	Session.set('awardLimit', 15);

	Meteor.setTimeout(function(){
		awardItemsOut(url);
	}, 300);
}

awardListIn = function(){
	pageIn();
	awardItemsIn();

	if (!$('.award-type').hasClass('animated-in')){
		awardTypeIn($('.award-type'));
	}
}

awardItemsIn = function(){
	var awardItems = $('.award-item').not('.animated-in');

	_.each(awardItems, function(award, index){
		Meteor.setTimeout(function(){
			awardItemIn($(award));
		}, 50 * index);
	});
}

awardItemsOut = function(url){
	var awardItems = $('.award-item');

	_.each(awardItems, function(award, index){
		Meteor.setTimeout(function(){
			awardItemOut($(award));
		}, 50 * index);
	});

	if (url){
		Meteor.setTimeout(function(){
			Router.go(url);
		}, 500);
	}
}

menuToggleClose = function(){
	var bar1 = $('.bar-1');
	var bar2 = $('.bar-2');
	var bar3 = $('.bar-3');

	bar1.velocity({
		"top": "7px"
	}, 300, easingFunc)
	.velocity({
		"rotateZ":"45deg"
	}, 300, easingFunc);

	bar2.velocity({
		"opacity": 0
	}, {duration: 300, delay: 300, easing: easingFunc})

	bar3.velocity({
		"top": "-7px"
	}, 300, easingFunc)
	.velocity({
		"rotateZ":"-45deg",
		"top": "-9px"
	}, 300, easingFunc);
}

menuToggleOpen = function(){
	var bar1 = $('.bar-1');
	var bar2 = $('.bar-2');
	var bar3 = $('.bar-3');

	bar1
	.velocity({
		"rotateZ":"0deg"
	}, 300, easingFunc)
	.velocity({
		"top": "0px"
	}, 300, easingFunc)

	bar2.velocity({
		"opacity": 1
	}, {duration: 300, delay: 300, easing: easingFunc})

	bar3.velocity({
		"rotateZ":"0deg"
	}, 300, easingFunc)
	.velocity({
		"top": "0px"
	}, 300, easingFunc)

}

accountOut = function(){
	var account = $('.account');
	account.velocity({
		"right": "-300px"
	}, {
		duration: 1,
		easing: easingFunc,
		delay: 300
	});
}

accountIn = function(){
	var account = $('.account');
	account.velocity({
		"right": "0px"
	}, 1);
}

pageZoomIn = function(){
	var page = $('.page');
	page.velocity({
		"opacity":"1.0",
		"scale":"1"
	}, {duration: 1000, easing: easingFunc, delay: 100});
}

pageZoomOut = function(url){
	var page = $('.page');
	page.velocity({
		"opacity":"0.0",
		"scale":".9"
	}, 1000, easingFunc);

	if (url){
		Meteor.setTimeout(function(){
			Router.go(url);
		}, 500);
	}
}

pageOut = function(){
	var page = $('.page');
	page.velocity({
		"left": "-200px"
	}, 300, easingFunc);
}

pageIn = function(){
	var page = $('.page');
	page.velocity({
		"left": "0px"
	}, 300, easingFunc);
}

awardTypeIn = function(item){
	item
	.velocity({
		"left":"100vw"
	}, {duration: 0})
	.velocity({
		"left":"0vw"
	}, {duration: 500, easing: "easeOutQuint", delay: 100});

	item.addClass('animated-in');
}

awardTypeOut = function(item){
	item.velocity({
		"left": "-110vw"
	}, 500, "easeInQuint");

	item.removeClass('animated-in');
}

awardItemIn = function(item){
	item.velocity({
		"left": "0vw",
		"opacity": 1
	}, 300, "easeOutQuad").addClass('animated-in');
}

awardItemOut = function(item){
	item.velocity({
		"left": "-50vw",
		"opacity": 0
	}, 300, "easeOutQuad");
}

modalOut = function(){
	var modal = $('.modal');
	modal.velocity({
		"left": "-200px"
	}, 300, easingFunc);
}

modalIn = function(){
	var modal = $('.modal');
	modal.velocity({
		"left": "0px"
	}, 300, easingFunc);
}

modalZoomIn = function(){
	var modal = $('.modal');
	modal
	.velocity({
		"scale":"1.2"
	}, 1)
	.velocity({
		"opacity":"1.0",
		"scale":"1.0"
	}, {duration: 1000, easing: easingFunc, delay: 100});
}

modalZoomOut = function(url){
	var modal = $('.modal');
	modal.velocity({
		"opacity":"0",
		"scale":"1.2"
	}, 1000, easingFunc);

	Meteor.setTimeout(function(){
		modal.remove();
		if (url){
			Router.go(url);
		}
	}, 1000);
}
