
// ServiceConfiguration.configurations.upsert(
// 	{ service: "facebook" },
// 		{
// 		$set: {
// 		  appId: Meteor.settings.facebook.appId,
// 		  loginStyle: "popup",
// 		  secret: Meteor.settings.facebook.secret
// 		}
// 	}
// );

Meteor.methods({
	serviceConfig: function(loginStyle){
		ServiceConfiguration.configurations.upsert(
		{ service: "twitter" },
		{
			$set: {
			  consumerKey: Meteor.settings.twitter.public,
			  loginStyle: loginStyle,
			  secret: Meteor.settings.twitter.private
			}
		});
	}
	// ServiceConfiguration.configurations.upsert(
	// 	{ service: "facebook" },
	// 		{
	// 		$set: {
	// 		  appId: Meteor.settings.facebook.appId,
	// 		  loginStyle: "popup",
	// 		  secret: Meteor.settings.facebook.secret
	// 		}
	// 	}
	// );
})

Meteor.startup(function(){
	ServiceConfiguration.configurations.remove();
	// if (Awards.find().count() < 300){
	// 	var counter = 0;

	// 	while(counter < 300){
	// 		console.log(counter);
	// 		Factory.create('award', {
	// 			username: Fake.user({fields: ['name']}),
	// 			type: Fake.fromArray(['worst', 'best', 'funniest', 'coolest', 'weirdest']),
	// 			message: Fake.paragraph(4),
	// 			date: randomDate(new Date(2012, 0, 1), new Date()),
	// 			score: function() { return _.random(0, 50); }
	// 		});
	// 		counter++;
	// 	}
	// }
})

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}