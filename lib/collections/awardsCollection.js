Awards = new Mongo.Collection('awards');

var awardTypes = ['Worst', 'Best', 'Funniest', 'Coolest', 'Weirdest'];

Factory.define('award', Awards, {
	username: 'username',
	type: 'Worst',
	message: Fake.paragraph(3),
	score: function() { return _.random(0, 50); }
})

Meteor.methods({
	'createAward': function(award){
		if (!this.userId){
			throw new Meteor.error(422, 'You must login to create awards');
		}

		if (!award.name){
			throw new Meteor.error(422, 'Please enter the username of the awardee.');
		}

		if (!award.message){
			throw new Meteor.error(422, 'Please enter in a reason for giving the award.');	
		}

		var creator = Meteor.users.findOne(this.userId).username;

		var award = _.extend(_.pick(award, 'name', 'message', 'type', 'score', 'gif'), {
			creator: creator,
			date: new Date()
		});

		var awardId = Awards.insert(award);

		return awardId;
	},
	upvoteAward: function(awardId){
		console.log(awardId);
		if (!this.userId){
			throw new Meteor.Error(422, 'You must login to upvote.');
		}

		var award = Awards.findOne(awardId);
		if (award.voters){
			var existingVoter = _.contains(award.voters, this.userId);
		}
		//check if already voted
		if (award.voters && existingVoter){
			Awards.update({_id: awardId}, {$inc: {score: -1}, $pull: { voters: this.userId}});
		} else {
			Awards.update({_id: awardId}, {$inc: {score: 1}, $push: { voters: this.userId}});
		}
	}
});