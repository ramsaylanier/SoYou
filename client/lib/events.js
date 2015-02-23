Template.layout.events({
	'click .twitter-login-btn': function(){
		// var loginStyle = 'popup';
		// var device = Session.get('device');

		// if (device == 'phone' || device == 'tablet'){
		// 	loginStyle = 'redirect'
		// }

		Meteor.loginWithTwitter(function(error){
			if (error){
				Errors.throw(error, 'error');
				console.log(error);
			}
			else
				closeMenuState();
		})
	},
	'click .facebook-login-btn': function(){
		Meteor.loginWithFacebook(
			{requestPermissions: ['email']},
			function(error){
				if (error){
					alert(error);
					Errors.throw(error.reason, 'error');
				}
				else
					switchMenuState();
			}	
		)
	},
	'click .close-btn': function(){
		checkModalState();
	},
})

Meteor.startup(function(){
	var loginStyle = "popup";

	if (Meteor.Device.isPhone()){
		loginStyle = "redirect";
	}

	Meteor.call('serviceConfig', loginStyle, function(error){
		if (error)
			Errors.throw(error.reason, 'error')
	})
})