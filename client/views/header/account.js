Template.account.events({
	'click .logout-link': function(e){
		e.preventDefault();
		Meteor.logout();
		closeMenuState();
	},
	'click .nav-link': function(e){
		e.preventDefault();
		var url = $(e.currentTarget).attr('href');

		console.log(url);
		console.log(window.location);
		if (url !== window.location.pathname){
			awardListOut(url);
		}
	}
})