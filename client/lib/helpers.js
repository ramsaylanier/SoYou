UI.registerHelper('awardType', function(){
	return Router.current().params.type;
});

getAwardType = function(){
	return Router.current().params.type;
}