Template.awardsList.created = function(){

  var instance = this;
  instance.loaded = new ReactiveVar(0);
  instance.ready = new ReactiveVar(false);
  instance.sortBy = new ReactiveVar('date');

  Session.set('awardLimit', 15);
  Session.set('sortBy', 'date');

  instance.autorun(function () {
  	var sortBy = Session.get('sortBy');
    var limit = Session.get('awardLimit');
    var awardType = getAwardType();
    var options;

	if (sortBy == 'date')
	    options = {sort: {date: -1}, limit: limit};
	else 
		options = {sort: {score: -1}, limit: limit};

    var subscription = Meteor.subscribe('awardsList', awardType, options);

    if (subscription.ready()) {
      instance.loaded.set(limit);
      instance.sortBy.set(sortBy);
      instance.ready.set(true);
    } else {
      instance.ready.set(false);
    }
  });

  instance.awards = function() { 
  	var sortBy = instance.sortBy.get();

  	if (sortBy == 'date')
	    return Awards.find({type: getAwardType()}, {sort: {date: -1}, limit: instance.loaded.get()});
	else
		return Awards.find({type: getAwardType()}, {sort: {score: -1}, limit: instance.loaded.get()});
  }
}

Template.awardsList.rendered = function(){
	Session.set('itemCount', 0);
	this.find('.awards-wrapper')._uihooks = {
	    insertElement: function(node, next){
	    	var itemCount = Session.get('itemCount');
	    	itemCount ++;
	    	Session.set('itemCount', itemCount);
	    	$(node).insertBefore(next);
	    	
	    	Meteor.setTimeout(function(){
	    		awardItemIn($(node));
	    	}, 50 * itemCount)
	    }
	}

	$(window).on('scroll', function(){
		var threshold, target = $(".show-more-awards");
		if (!target.length) return;

		threshold = $(window).scrollTop() + $(window).height() - target.height();

		if (target.offset().top < threshold) {
		    if (!target.data("visible")) {
		        console.log("target became visible (inside viewable area)");
		        target.data("visible", true);

		        Session.set('itemCount', 0);
			    var limit = Session.get('awardLimit')
			    limit += 15;
			    Session.set('awardLimit', limit);
		    }
		} else {
		    if (target.data("visible")) {
		        // console.log("target became invisible (below viewable arae)");
		        target.data("visible", false);
		    }
		}     
	})
}

Template.awardsList.helpers({
	isReady: function() {
		var isReady = Template.instance().ready.get();
		if (isReady){
			awardListIn();
			return true
		}
	},
	awards: function(){
		return Template.instance().awards(); 
	},
	hasMore: function(){
		return Template.instance().awards().count() >= Session.get('awardLimit')
	},
	checkSort: function(){
		var sort = Session.get('sortBy');
		$('.sort-btn').removeClass('active');

		if (sort == 'date'){
			$('.date-sort-btn').addClass('active');
		} else 
			$('.score-sort-btn').addClass('active');
	}
})

Template.awardsList.events({
	'click .cta-btn': function(){
		Blaze.render(Template.createAward, $('.application').get(0));
		closeMenuState();
		switchModalState();

	},
	'click .load-more-btn': function (event, instance) {
		event.preventDefault();

		//reset itemCount
		Session.set('itemCount', 0);

	    var limit = Session.get('awardLimit')

	    limit += 15;
	    Session.set('awardLimit', limit);
	},
	'click .sort-btn': function(e){
		var button = $(e.currentTarget);
		if (button.hasClass('date-sort-btn')){
			Session.set('sortBy', 'date');
		} else {
			Session.set('sortBy', 'score');
		}

		Session.set('limit', 15);
	}
})