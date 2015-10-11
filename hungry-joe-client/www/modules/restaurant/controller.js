angular.module('Restaurant',[])
.controller('RestaurantController', [ 'RestaurantListsServices' ,'MapvalueServices', 'CommentsServices', 'UsersServices', 'SocketServices', function(RestaurantListsServices,MapvalueServices,CommentsServices,UsersServices,SocketServices){
	var vm = this;
	SocketServices.connect();


	vm.showComment = false;
	var resPromise = RestaurantListsServices.getRestaurantByGresID(MapvalueServices.getgresID());
	resPromise.$promise.then(function(restaurantData){
		vm.res = restaurantData;
		var commentsPromise = CommentsServices.getRestaurantComments(vm.res._id);
		commentsPromise.$promise.then(function(commentData){
			vm.comments = commentData;
			vm.showComment = true;
		})
	});
	
	vm.tokens = [];
	vm.addNewComment = function(){
		CommentsServices.addComments(vm.description,vm.res._id,UsersServices.getCurrentUsername());
		console.log('You just comment :' + vm.description);
		// vm.tokens.push({"description":vm.description,"username":UsersServices.getCurrentUsername()});
		var tmpToken = {"description":vm.description,"username":UsersServices.getCurrentUsername()};
		SocketServices.emit('sendComment',tmpToken);
		vm.description = '';
	}

	SocketServices.on('getComment',function(data){
		// console.log(data);
		vm.tokens.push(data);
	});

}]);