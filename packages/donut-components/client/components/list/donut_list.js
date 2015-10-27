Template.list.created = function(){
	var instance = this;
	var data = instance.data || 0;

	if (data.waitForReady){
		instance.ready = new ReactiveVar(instance.parentTemplate(1).ready.get());

		instance.autorun(function () {
			Session.set('itemCount', 0);
			instance.ready.set(instance.parentTemplate(1).ready.get());
		});
	} else {
		instance.ready = new ReactiveVar(true);
	}
}

Template.list.rendered = function(){

	var instance = this;
	var data = instance.data || 0;

	var options = {
		duration: data.duration || 500,
		delay: data.delay || 0,
		style: data.animationStyle || 'slideInFromRight',
		easing: data.easing || 'easeOut'
	}

	var items = instance.findAll('.item');

	if (data.animateItems){
		animateItemsIn(options, items);

		instance.$('.transition-wrapper')._uihooks = {
		    insertElement: function(node, next){
		    	console.log('node');
		    	var itemCount = Session.get('itemCount');
		    	itemCount ++;
		    	Session.set('itemCount', itemCount);
		    	$(node).insertBefore(next);
		    	
		    	Meteor.setTimeout(function(){
		    		animateItemIn($(node));
		    	}, 50 * itemCount)
		    },
		    removeElement: function(node, next){
		    	var itemCount = Session.get('itemCount');
		   		console.log(itemCount)
		    	itemCount ++;
		    	Session.set('itemCount', itemCount);

		    	Meteor.setTimeout(function(){
		    		animateItemOut($(node));
		    	}, 25 * itemCount);
		    }
		}
	}
}

Template.list.helpers({
	// pageReady: function(){
	// 	var isReady = Template.instance().ready.get();
	// 	var itemDelay = Template.instance().data.itemDelay || 0;

	// 	if (Template.instance().ready.get()){
	// 		pageLoad(itemDelay);
	// 		return true;
	// 	}	
	// }
})