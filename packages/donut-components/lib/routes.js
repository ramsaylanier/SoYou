Router.onBeforeAction(function(){	
	donutStates.checkModalState();
	donutStates.closeShelfState();
	this.next();
});