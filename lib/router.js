Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

Router.onBeforeAction(function(){	
	checkModalState();
	this.next();
}, {except: ['awardsList']});

Router.onBeforeAction(function(){	
	this.next();
});

Router.route('/', {
  path: '/',
  action: function(){
    this.redirect('/the');
  }
})

Router.route('awardsLanding', {
	path: '/the'
});

Router.route('/the/person-who-wants-to-know-about-this-amaizing-app', {
  name: 'about'
});

Router.route('/the/:type', {
	name: 'awardsList'
});


Router.route('awardPage', {
	path: '/the/:type/:_id',
	waitOn: function(){
		return Meteor.subscribe('awardSingle', this.params._id);
	},
	data: function(){
		return Awards.findOne(this.params._id);
	}
})