Template.toggle.events({
	'click .donut-toggle': function(e){
		e.preventDefault();

		toggle = $(e.currentTarget);
		$('.donut-toggle').removeClass('active');

		var state = this.state;
		var target = $(this.target);

		donutStates[state](toggle, target);
	}
})