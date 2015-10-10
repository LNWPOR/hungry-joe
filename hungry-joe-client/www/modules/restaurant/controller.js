angular.module('Restaurant',[])
.controller('RestaurantController', [ 'RestaurantListsServices' ,'MapvalueServices', 'CommentsServices', 'UsersServices', function(RestaurantListsServices,MapvalueServices,CommentsServices,UsersServices){
	var vm = this;
	






	vm.showComment = false;
	var resPromise = RestaurantListsServices.getRestaurantByGresID(MapvalueServices.getgresID());
	resPromise.$promise.then(function(restaurantData){
		vm.res = restaurantData;
		var commentsPromise = CommentsServices.getRestaurantComments(vm.res._id);
		commentsPromise.$promise.then(function(commentData){
			vm.comments = commentData;
			// vm.comments = [{"description":"test1"},{"description":"test2"}];
			vm.showComment = true;
		})
	});
	
	vm.addNewComment = function(){
		
		CommentsServices.addComments(vm.description,vm.res._id,UsersServices.getCurrentUsername());
		console.log('You just comment :' + vm.description);
		vm.description = '';

	}

}]);