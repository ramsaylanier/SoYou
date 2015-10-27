Template.awardsLanding.rendered = function(){
	var awards = $('.award-type');
	// landingPageLoad();
}


Template.awardsLanding.helpers({
	'awardClasses': function(){
		return 'award-type ' + this.name;
	},
	'awardTypes': function(){
		var awardTypes = Meteor.awardTypes();
		return awardTypes;
	}
})

Template.awardsLanding.events({
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