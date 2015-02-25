Awards = new Mongo.Collection('awards');

var awardTypes = ['Worst', 'Best', 'Funniest', 'Coolest', 'Weirdest'];

Factory.define('award', Awards, {
	username: 'username',
	type: 'Worst',
	message: Fake.paragraph(3),
	score: function() { return _.random(0, 50); }
})

generateNonce = function(length) {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
        var result = "";
        for (var i = 0; i < length; ++i) {
            var rnum = Math.floor(Math.random() * chars.length);
            result += chars.substring(rnum, rnum+1);
        }
        return result;
    }

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

		// Meteor.call('postTweet', award, awardId);

		return awardId;
	},
	deleteAward: function(awardId, currentUserId){
		var award = Awards.findOne(awardId);
		var currentUsername = Meteor.users.findOne(currentUserId).username;

		if (award.creator !== currentUsername)
			throw new Meteor.error(422, 'You are not authorized to delete this award.')

		Awards.remove(awardId);
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
	},
	postTweet: function(award, awardId){
		var oauthSignature = Meteor.npmRequire('oauth-signature');
		var consumerKey = Meteor.settings.twitterUpdateStatus.public;
		var consumerSecret = Meteor.settings.twitterUpdateStatus.private;
		var token =  Meteor.settings.twitterUpdateStatus.accessToken;
		var tokenSecret =  Meteor.settings.twitterUpdateStatus.accessTokenSecret;
		var nonce = CryptoJS.enc.Base64.parse(generateNonce(32));
		var encodedNonce = CryptoJS.enc.Base64.stringify(nonce);
		var oauthMethod = "HMAC-SHA1";
		var timestamp = Math.floor(Date.now() / 1000);

		var url = 'soyou.re/the/' + award.type + '/' + awardId;
		var status = "Hey, @" + award.name + ", someone thinks you're the " + award.type + ". Here's why: " + url;

		var encodedStatus = encodeURIComponent(status);
		var apiBase = 'https://api.twitter.com/1.1/statuses/update.json';

		var parameters = {
			oauth_consumer_key: consumerKey,
			oauth_token: token,
			oauth_nonce: encodedNonce,
			oauth_timestamp: timestamp,
			oauth_signature_method: 'HMAC-SHA1',
			oauth_version: '1.0',
			status: status
		}

		var encodedSignature = oauthSignature.generate('POST', apiBase, parameters, consumerSecret, tokenSecret );

		var authorizationHeader = 	'Oauth oauth_consumer_key="' + encodeURIComponent(consumerKey) + '", ' +
									'oauth_nonce="' + encodeURIComponent(encodedNonce) + '", ' + 
									'oauth_signature="' + encodedSignature + '", ' +
									'oauth_signature_method="HMAC-SHA1", ' +
									'oauth_timestamp="' + encodeURIComponent(timestamp) + '", ' +
									'oauth_token="' + encodeURIComponent(token) + '", ' +
									'oauth_version="1.0"'

		var result = HTTP.post("https://api.twitter.com/1.1/statuses/update.json?status=" + encodedStatus,
						{	
							headers:{
								"Authorization": authorizationHeader
							}	
						});
	}
});