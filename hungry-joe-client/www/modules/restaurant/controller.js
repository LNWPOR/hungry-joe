angular.module('Restaurant',[])
.controller('RestaurantController', [ 'RestaurantListsServices' ,'MapvalueServices', 'CommentsServices', 'UsersServices', 'SocketServices', 'RatingServices', function(RestaurantListsServices,MapvalueServices,CommentsServices,UsersServices,SocketServices,RatingServices){
	var vm = this;

	// vm.showeiei = function(){
	// 	console.log(vm.rateVal);
	// }

	SocketServices.connect();
	var currnetUsername = UsersServices.getCurrentUsername();
	vm.showComment = false;
	vm.showRatingButton = true;

	//get Restaurant
	var resPromise = RestaurantListsServices.getRestaurantByGresID(MapvalueServices.getgresID());
	resPromise.$promise.then(function(restaurantData){
		vm.res = restaurantData;
		//get Comment
		var commentsPromise = CommentsServices.getRestaurantComments(vm.res._id);
		commentsPromise.$promise.then(function(commentData){
			vm.comments = commentData;
			vm.showComment = true;
		});
		//get Rating
		var ratingPromise = RatingServices.getRestaurantRating(vm.res._id);
		ratingPromise.$promise.then(function(ratingData){
			vm.rating = 0;
			for(var i = 0;i<ratingData.length;i++)
			{	
				vm.rating += ratingData[i].rate;
				if (ratingData[i].username == currnetUsername) {
					vm.showRatingButton = false;
				}
			}
		});
	});
	
	//add new Comment Realtime
	vm.addNewComment = function(){
		CommentsServices.addComments(vm.description,vm.res._id,currnetUsername);
		var tmpComment = {"description":vm.description,"username":currnetUsername};
		SocketServices.emit('sendComment',tmpComment);
		vm.description = '';
	}
	SocketServices.on('getComment',function(data){
		vm.comments.push(data);
	});

	//add new rating Realtime
	vm.upRate = function(){
		RatingServices.addRating(vm.rate,vm.res._id,currnetUsername);
		SocketServices.emit('sendRate',vm.rate);
		vm.rate = '';
	}
	SocketServices.on('getRate',function(data){
		vm.rating += parseInt(data);
		vm.showRatingButton = false;
	});


}]);