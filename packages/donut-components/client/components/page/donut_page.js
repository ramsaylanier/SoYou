var options = {};
var data, page, animation;

Template.page.rendered = function(){
	var instance = this;
	data = instance.data || 0;
	page = instance.$('.page');

	options = {
		easing: data.easing || 'easeOut',
		duration: data.duration || 500,
		delay: data.delay || 0,
	}

	animationType = data.animateIn || 'slideInFromRight';

	donutAnimation.findAnimation(options, animationType, page);
}

Template.page.events({
	'click .transition-link': function(e, template){
		e.preventDefault();
		var url = $(e.currentTarget).attr('href');

		//close menu if it's open
		if (Session.get('shelfState') !== 'notActive'){
			donutStates.closeShelfState();
		}

		animationType = data.animateOut || 'slideOutToLeft';

		donutAnimation.findAnimation(options, animationType, page, url);
	}
})