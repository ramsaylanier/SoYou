Meteor.publish('awardsList', function(awardType, options){
	return Awards.find({type: awardType}, options);
})

Meteor.publish('awardSingle', function(awardId){
	return Awards.find(awardId);
})