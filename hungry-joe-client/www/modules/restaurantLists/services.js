angular.module('RestaurantLists',[]).factory('RestaurantListsServices', ['$resource', function ($resource) {
    var RestaurantListsServices = {};

    var base = "https://hungry-joe-lnwpor-3.c9.io:8080"
	var RestaurantLists = $resource(base+'/api/restaurantlists');
   
    RestaurantListsServices.getRestaurantLists = function(){
        return RestaurantLists.query();
    }

    RestaurantListsServices.addRestaurant = function(name,gres_id){
    	var restaurant = new RestaurantLists();
    	restaurant.name = name;
    	restaurant.gres_id = gres_id;
    	restaurant.rating = 0;

    	RestaurantLists.save(restaurant)
    }

    return RestaurantListsServices;
}]);