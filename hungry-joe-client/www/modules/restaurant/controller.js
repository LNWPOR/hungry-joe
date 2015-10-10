angular.module('Restaurant',[])
.controller('RestaurantController', [ 'RestaurantListsServices' ,'MapvalueServices',function(RestaurantListsServices,MapvalueServices){
	var vm = this;
	console.log(MapvalueServices.getgresID()+'eiei');
	vm.res = MapvalueServices.getgresID();
}]);