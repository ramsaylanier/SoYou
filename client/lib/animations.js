easingFunc = [ .3, 0.8, 0.1, 1 ];

animateMenuToggle = function(toggle, state){
	var bar1 = toggle.children('.bar-1');
	var bar2 = toggle.children('.bar-2');
	var bar3 = toggle.children('.bar-3');

	if (state == 'close'){
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
	} else if (state == 'open'){
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
}