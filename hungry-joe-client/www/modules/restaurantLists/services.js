angular.module('RestaurantLists',[]).factory('RestaurantListsServices', ['$resource', function ($resource) {
    var RestaurantListsServices = {};
    var base = "https://hungry-joe-lnwpor-3.c9.io:8080";
    var RestaurantLists = $resource(base+'/api/restaurantlists/:restaurant_id', {restaurant_id : '@restaurant_id'},{
        update: {
            method: 'PUT'
        }
    });
	var RestaurantListsGres = $resource(base+'/api/restaurantlists/:gres_id', {gres_id : '@gres_id'});
   
    RestaurantListsServices.getRestaurantLists = function(){
        return RestaurantLists.query();
    }

    RestaurantListsServices.getRestaurantByGresID = function(gres_id){
        return RestaurantListsGres.get({gres_id:gres_id});
    }

    RestaurantListsServices.addRestaurant = function(name,gres_id){
    	var restaurant = new RestaurantLists();
    	restaurant.name = name;
    	restaurant.gres_id = gres_id;
    	restaurant.rating = 0;
    	RestaurantLists.save(restaurant);
    }

    RestaurantListsServices.ratingUP = function(restaurant_id,rating){
        var currentRating = rating;
        var newRating = currentRating + 1;
        RestaurantLists.update({ _id : restaurant_id }, {rating : newRating});
    }

    return RestaurantListsServices;
}]);