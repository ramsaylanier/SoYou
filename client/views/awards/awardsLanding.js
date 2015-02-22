Template.awardsLanding.rendered = function(){
	var awards = $('.award-type');
	landingPageLoad();
}


Template.awardsLanding.helpers({
	'awardTypes': function(){
		var awardTypes = Meteor.awardTypes();
		return awardTypes;
	}
})

Template.awardsLanding.events({
	'click .award-link': function(e){
		e.preventDefault();

		if (Session.get('menuState') == 'active')
			switchMenuState();

		var url = $(e.currentTarget).attr('href');

		landingPageOut(url);
	},
	'mouseenter .award-link': function(e){
		$(e.currentTarget).velocity("stop");
		$(e.currentTarget).velocity({
			"translateX": "50px"
		}, 300, 'easeOutQuant');
	},
	'mouseout .award-link': function(e){
		$(e.currentTarget).velocity("stop");
		$(e.currentTarget).velocity({
			"translateX": "0px"
		}, 600, 'easeOutQuant');
	}
})