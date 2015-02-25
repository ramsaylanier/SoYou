Template.awardsList.created = function(){

  var instance = this;
  instance.loaded = new ReactiveVar(0);
  instance.ready = new ReactiveVar(false);

  Session.set('awardLimit', 15);

  instance.autorun(function () {
  	var sortBy = Session.get('sortBy') || 'date';
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
      instance.ready.set(true);
    } else {
      instance.ready.set(false);
    }
  });

  instance.awards = function() { 
    return Awards.find({type: getAwardType()}, {limit: instance.loaded.get()});
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
	}
})