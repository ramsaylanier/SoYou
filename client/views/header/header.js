Template.header.events({
	'click .menu-toggle': function(e){
		e.preventDefault();

		var toggles = $('.menu-toggle');
		
		_.each(toggles, function(toggle){
			console.log(toggle);
			if ($(toggle).hasClass('active')){
				animateMenuToggle($(toggle), 'close')
			} else {
				animateMenuToggle($(toggle), 'open')
			}
		})
	}
})