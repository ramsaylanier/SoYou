Template.awardPage.rendered = function(){
	modalZoomIn();
}

Template.awardPage.events({
	'click .close-btn': function(e){
		modalZoomOut();

		console.log(Router.current().params);
		Meteor.setTimeout(function(){
			Router.go("/" + Router.current().params.type);
		}, 500);
	}
})