angular.module('Restaurant',[])
.controller('RestaurantController', [ 'RestaurantListsServices' ,'MapvalueServices', 'CommentsServices', 'UsersServices', 'SocketServices', 'RatingServices', function(RestaurantListsServices,MapvalueServices,CommentsServices,UsersServices,SocketServices,RatingServices){
	var vm = this;

	// vm.showeiei = function(){
	// 	console.log(vm.rateVal);
	// }
	SocketServices.connect();
	var currentUsername = UsersServices.getCurrentUsername();
	vm.showComment = false;
	vm.showRatingButton = true;

	//get restaurant

	var restaurant = MapvalueServices.getRestaurant();
	if(restaurant == 'KFC'){
		vm.restmp = "KFC-logo.jpg";
		vm.restlink = "https://www.kfc.co.th/#!/home";
		vm.restTeltag = 'tel://1150';
		vm.restTel = "1150";
	}
	else if(restaurant == 'McDonald'){
		vm.restmp = "MC-logo.png";
		vm.restlink = "http://mcdelivery.mcthai.co.th/#!/home";
		vm.restTeltag = 'tel://1711';
		vm.restTel = "1711";
	}
	else if(restaurant == 'PizzaHut'){
		vm.restmp = "pizzahut-logo.jpg";
		vm.restlink = "https://www.pizzahut.co.th/#!/home";
		vm.restTeltag = 'tel://1150';
		vm.restTel = "1150";
	}
	else if(restaurant == 'PizzaCompany'){
		vm.restmp = "pizzacompany-logo.jpeg";
		vm.restlink = "https://www.1112.com/#!/home";
		vm.restTeltag = 'tel://1122';
		vm.restTel = "1122";
	}

	vm.url_restaurant ="./img/" + vm.restmp;



	//get Restaurant
	var resPromise = RestaurantListsServices.getRestaurantByGresID(MapvalueServices.getgresID());
	vm.distance = MapvalueServices.getDistance();
	vm.duration = MapvalueServices.getDuration();
	resPromise.$promise.then(function(restaurantData){
		vm.res = restaurantData;
		//get Comment
		var commentsPromise = CommentsServices.getRestaurantComments(vm.res._id);
		commentsPromise.$promise.then(function(commentData){
			vm.comments = commentData;
			vm.showComment = true;
			// console.log(commentData);
		});
		//get Rating
		var ratingPromise = RatingServices.getRestaurantRating(vm.res._id);
		ratingPromise.$promise.then(function(ratingData){
			vm.rating = 0;
			for(var i = 0;i<ratingData.length;i++)
			{	
				vm.rating += ratingData[i].rate;
				if (ratingData[i].username == currentUsername) {
					vm.showRatingButton = false;
				}
			}
		});
	});

	// console.log(vm.showRatingButton);

	//add new Comment Realtime
	vm.addNewComment = function(){
		CommentsServices.addComments(vm.description,vm.res._id,currentUsername);
		SocketServices.emit('sendComment',vm.description,vm.res._id,currentUsername);
		vm.description = '';
		var element = document.getElementById("commentDisplay");
		// element.scrollTop = element.scrollHeight;
	}
	SocketServices.on('getComment',function(description,res_id,username){
		var tmpComment = {"description":description,"res_id":res_id,"username":username};
		if (vm.res._id == res_id) {
			vm.comments.push(tmpComment);
		}
	});

	//add new rating Realtime
	vm.upRate = function(){
		RatingServices.addRating(vm.rate,vm.res._id,currentUsername);
		SocketServices.emit('sendRate',vm.rate,vm.res._id,currentUsername);
		vm.rate = '';
	}
	SocketServices.on('getRate',function(rate,res_id,username){
		if (vm.res._id == res_id) {
			vm.rating += parseFloat(rate);
			if (currentUsername == username) {
				vm.showRatingButton = false;
			}
		}
	});

}]);