Template.awardPage.rendered = function(){
	modalZoomIn();
}

Template.awardPage.events({
	'click .close-btn': function(e){
		modalZoomOut();

		console.log(Router.current().params);
		Meteor.setTimeout(function(){
			Router.go("/the/" + Router.current().params.type);
		}, 500);
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
	}
})