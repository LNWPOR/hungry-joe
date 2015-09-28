angular.module('RestaurantLists',[]).factory('RestaurantListsServices', ['$resource', function ($resource) {
    var RestaurantListsServices = {};

    var base = "https://hungry-joe-lnwpor.c9.io:8080"
	var RestaurantLists = $resource(base+'/api/restaurantlists');
   
    UsersServices.getUsers = function(){
        return RestaurantLists.query();
    }

    return RestaurantListsServices;
}]);