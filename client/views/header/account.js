Template.account.events({
	'click .logout-link': function(e){
		e.preventDefault();
		Meteor.logout();
		closeMenuState();
	},
	'click .nav-link': function(e){
		e.preventDefault();
		var url = $(e.currentTarget).attr('href');

		if (url !== window.location.pathname){
			awardListOut(url);
		}
	}
})