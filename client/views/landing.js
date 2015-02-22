Template.landing.events({
	'click .twitter-login-btn': function(){
		var loginStyle = 'popup';
		var device = Session.get('device');

		// if (device == 'phone' || device == 'tablet'){
		// 	loginStyle = 'redirect'
		// }

		Meteor.loginWithTwitter({loginStyle: loginStyle}, function(error){
			if (error){
				Errors.throw(error, 'error');
				console.log(error);
			}
			else
				Router.go('/');
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
					Router.go('/');
			}	
		)
	}
})