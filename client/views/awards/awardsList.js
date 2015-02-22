Template.awardsList.rendered = function(){
	awardListIn();
}

Template.awardsList.helpers({
	loadPage: function(){
		console.log('loadPage');
		// awardListIn();
	},
	isReady: function() {
		if (this.isReady){
			awardListIn();
		}
	},
	nextPath: function() {
		return this.nextPath;
	}
})

Template.awardsList.events({
	'click .cta-btn': function(){
		Blaze.render(Template.createAward, $('.application').get(0));
		switchModalState();
	},
	'click .load-more-btn': function (event, instance) {
		event.preventDefault();
		var currentLimit = Session.get('limit') || 10;
		Session.set('limit', currentLimit + 10);
	}
})