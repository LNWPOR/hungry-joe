angular.module('Restaurant',[])
.controller('RestaurantController', [ 'RestaurantListsServices' ,'MapvalueServices',function(RestaurantListsServices,MapvalueServices){
	var vm = this;
	vm.res = RestaurantListsServices.getRestaurantByGresID(MapvalueServices.getgresID());
}]);