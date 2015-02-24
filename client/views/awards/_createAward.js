Template.createAward.rendered = function(){
	Session.set('awardGif', null);
	Meteor.defer(function(){
		$('.award-gif-field').on('change', function(e){
			console.log('hi');
			var image = $(e.currentTarget).val();
			$('.award-gif-image').attr('src', image);
		})
	})
}

Template.createAward.helpers({
	awardGif: function(){
		return Session.get('awardGif');
	}
})


Template.createAward.events({
	'keyup': function(){
		var username = $('.award-username-field').val();
		var reason = $('.award-reason-field').val();

		$('.preview-username').text(username);
		$('.preview-reason').text(reason);

		var charactersLeft = 143 - $('.award-preview p').text().length;
		$('.award-length').text(charactersLeft);

		if (charactersLeft < 0){
			$('.submit-btn').prop('disabled', true);
		} else {
			$('.submit-btn').prop('disabled', false);
		}
	},
	'keyup .award-gif-field': function(e){
		var image = $(e.currentTarget).val();
		Session.set('awardGif', image);
	},
	'click .random-gif-btn': function(e){
		e.preventDefault();
		var awardType = getAwardType();
		var randomGif;
		HTTP.get("http://api.giphy.com/v1/gifs/random?&api_key=dc6zaTOxFJmzC&tag=" + awardType , function(error, result){
	        if (error)
	            throw new Meteor.Error(422, error.reason)
	        else {
	            if (result.data.meta.status == 200){
	               randomGif = result.data.data.image_original_url;
	               $('.award-gif-field').val(randomGif);
	               Session.set('awardGif', randomGif);
	            } else {
	                console.log(result.data.meta.msg);
	            }
	        }
	    });
	},
	'submit .create-award-form':function(e){
		e.preventDefault();

		var award = {
			name: $(e.target).find('[name=award-username-field]').val(),
			message: $(e.target).find('[name=award-reason-field]').val(),
			type: getAwardType(),
			gif: $(e.target).find('[name=award-gif-field]').val(),
			score: 0
		}

		if (!Meteor.userId()){
			new Errors.throw("You must login to create awards", 'error')
		} else if (!award.name){
			new Errors.throw("Please enter the username of the awardee.", 'error')
		} else if (!award.message){
			new Errors.throw("Please enter in a reason for giving the award.", 'error')
		} else{
			Meteor.call('createAward', award, function(error, result){
				if (error){
					new Errors.throw(error.reason, 'error')
				}
				else{
					var url = '/the/' + getAwardType() + '/' + result;
					modalZoomOut(url);
				}
			})
		}
	}
})