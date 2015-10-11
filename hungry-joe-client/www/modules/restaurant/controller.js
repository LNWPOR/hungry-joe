angular.module('Restaurant',[])
.controller('RestaurantController', [ 'RestaurantListsServices' ,'MapvalueServices', 'CommentsServices', 'UsersServices', 'SocketServices', 'RatingServices', function(RestaurantListsServices,MapvalueServices,CommentsServices,UsersServices,SocketServices,RatingServices){
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
		});
		
		var ratingPromise = RatingServices.getRestaurantRating(vm.res._id);
		ratingPromise.$promise.then(function(ratingData){
			vm.rating = 0;
			for(var i = 0;i<ratingData.length;i++)
			{	
				vm.rating += ratingData[i].rate;
			}
		});
	});
	
	vm.addNewComment = function(){
		CommentsServices.addComments(vm.description,vm.res._id,UsersServices.getCurrentUsername());
		var tmpComment = {"description":vm.description,"username":UsersServices.getCurrentUsername()};
		SocketServices.emit('sendComment',tmpComment);
		vm.description = '';
	}
	SocketServices.on('getComment',function(data){
		vm.comments.push(data);
	});

	vm.upRate = function(){
		RatingServices.addRating(vm.rate,vm.res._id,UsersServices.getCurrentUsername());
		SocketServices.emit('sendRate',vm.rate);
		vm.rate = '';
	}
	SocketServices.on('getRate',function(data){
		vm.rating += parseInt(data);
	});



}]);