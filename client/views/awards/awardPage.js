Template.awardPage.rendered = function(){
	console.log('awardPage rendered');
	modalZoomIn();
}

Template.awardPage.events({
	'click .close-btn': function(e){
		modalZoomOut();

		Meteor.setTimeout(function(){
			Router.go("/the/" + Router.current().params.type);
		}, 500);
	},
	'click .delete-award-btn': function(e, template){
		if (Meteor.user().username == template.data.creator){
			var awardId = template.data._id;
			var type = template.data.type;
			Meteor.call('deleteAward', awardId, Meteor.userId(), function(error){
				if (error)
					Errors.throw(error.reason, 'error')
				else{
					Errors.throw('Award deleted.', 'success')
					Router.go('/the/' + type)
				}
			})
		}
	}
})

Template.awardPage.helpers({
	tweetText: function(){
		var text = "So, you're the " + this.type + ", @" + this.name + ". Here's why: ";
		// this.message.replace(/&nbsp;/gi,'').substr(0, 83) + '..."';
		return text;
	},
	tweetURL: function(){
		return encodeURI(window.location.href);
	},
	canDelete: function(){
		console.log(this);
		if (Meteor.user().username == this.creator)
			return true
	}
})