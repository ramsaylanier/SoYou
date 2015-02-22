Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});

Router.onBeforeAction(function(){	
	checkModalState();
	this.next();
}, {except: ['awardsList']});

Router.onBeforeAction(function(){	
	this.next();
});

AwardsListController = RouteController.extend({
  template: 'awardsList',
  increment: 10, 
  awardLimit: function() {
  	var currentLimit = Session.get('limit');
    return currentLimit || this.increment; 
  },
  findOptions: function() {
	var sortBy = Session.get('sortBy') || 'date';
  	if (sortBy == 'date')
	    return {sort: {date: -1}, limit: this.awardLimit()};
	else 
		return {sort: {score: -1}, limit: this.awardLimit()};
  },
  subscriptions: function() {
    this.awardSub = Meteor.subscribe('awardsList', this.params.type, this.findOptions());
  },
  awards: function() {
    return Awards.find({type: this.params.type}, this.findOptions());
  },
  data: function() {
    var hasMore = this.awards().count() === this.awardLimit();
    var nextPath = this.route.path({awardLimit: this.awardLimit() + this.increment});
    return {
      awards: this.awards(),
      isReady: this.awardSub.ready,
      hasMore: hasMore ? true : false
    };
  },
  action: function(){
    if (this.awardSub.ready())
    	this.render();
    else{
      this.render('loading');
    }
  }
});

Router.route('awardsLanding', {
	path: '/'
});

Router.route('/:type', {
	name: 'awardsList'
})

Router.route('awardPage', {
	path: '/:type/:_id',
	waitOn: function(){
		return Meteor.subscribe('awardSingle', this.params._id);
	},
	data: function(){
		return Awards.findOne(this.params._id);
	}
})