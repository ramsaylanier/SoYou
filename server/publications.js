Meteor.publish('awardsList', function(awardType, options){
	// Meteor._sleepForMs(2000);
	return Awards.find({type: awardType}, options);
})

Meteor.publish('awardSingle', function(awardId){
	return Awards.find(awardId);
})