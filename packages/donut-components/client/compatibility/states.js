donutStates = {
	toggleShelfState:function(toggle, shelf){

		if (shelf.hasClass('active')){
			Session.set('shelfState', 'notActive');
			$('.shelf').removeClass('active');
			$('.donut-toggle').removeClass('active');
			donutAnimation.shelfClose(shelf);
		} else {
			if (shelf.hasClass('left-shelf')){
				Session.set('shelfState', 'leftShelfActive');
			} else {
				Session.set('shelfState', 'rightShelfActive');
			}
			$('.shelf').removeClass('active');
			shelf.addClass('active');
			toggle.addClass('active');
			donutAnimation.shelfOpen(shelf);
		}
	},
	closeShelfState: function(){
		Session.set('shelfState', 'notActive');
		var shelfs = $('.shelf');

		_.each(shelfs, function(shelf){
			if ($(shelf).hasClass('active')){
				donutAnimation.shelfClose($(shelf), noPage=true);
			}
		});
	},
	checkModalState:function(){
		var modalState = Session.get('modalState');

		if (modalState == 'active' && $('.modal').length){
			this.switchModalState();
		}
	},
	switchModalState:function(){
		var modalState = Session.get('modalState');

		if (modalState == 'active'){
			Session.set('modalState', 'notActive');
			//from globaljs
			// modalZoomOut();
			// pageZoomIn();
		} else {
			Session.set('modalState', 'active');
			//from globaljs
			// modalZoomIn();
			// pageZoomOut();
		}
	}
}

