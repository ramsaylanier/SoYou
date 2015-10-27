Template.awardSingle.helpers({
	awardItemClasses: function(){
		return "award-item " + this.type;
	},
	createdOnDate: function(){
		return moment(this.date).format('MMM D');
	},
	createdOnYear: function(){
		return moment(this.date).format('YYYY');
	},
	upvoted: function(){
		var voted = _.contains(this.voters, Meteor.userId());

		if (voted)
			return 'upvoted'
	}
})

Template.awardSingle.events({
	'click .up-vote-btn': function(e, template){
		e.preventDefault();

		var currentUser = Meteor.userId();
		var awardId = template.data._id;

		if (!currentUser){
			new Errors.throw('You must login to upvote.', 'error');
		} else {
			Meteor.call('upvoteAward', awardId, function(error){
				if (error)
					new Errors.throw(error.reason, 'error');
			});
		}
	},
	'click .award-path': function(e){
		if (!$(e.target).hasClass('award-username')){
			e.preventDefault();
			var url = $(e.currentTarget).attr('href');
			pageZoomOut(url);
		}
	}
})