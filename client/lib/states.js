switchMenuState = function(){
	var menuState = Session.get('menuState');

	if (menuState == 'active'){
		closeMenuState();

	} else {
		openMenuState();
	}
}

closeMenuState = function(){
	Session.set('menuState', 'notActive');
	$('.menu-toggle').removeClass('active');
	//from globaljs
	pageIn();
	modalIn();
	accountOut();
	menuToggleOpen();
}

openMenuState = function(){
	Session.set('menuState', 'active');
	$('.menu-toggle').addClass('active');
	//from globaljs
	pageOut();
	modalOut();
	accountIn();
	menuToggleClose();
}

checkModalState = function(){
	var modalState = Session.get('modalState');

	if (modalState == 'active' && $('.modal').length){
		switchModalState();
	}
}

switchModalState = function(){
	var modalState = Session.get('modalState');

	if (modalState == 'active'){
		Session.set('modalState', 'notActive');
		//from globaljs
		modalZoomOut();
		pageZoomIn();
	} else {
		Session.set('modalState', 'active');
		//from globaljs
		modalZoomIn();
		pageZoomOut();
	}
}