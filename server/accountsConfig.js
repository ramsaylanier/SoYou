Accounts.config(function(){
	
})

Accounts.onCreateUser(function(options, user){
	if (options.profile)
		user.username = user.services.twitter.screenName;

	return user;
})