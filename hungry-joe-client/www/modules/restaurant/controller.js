angular.module('Restaurant',[])
.controller('RestaurantController', [ 'RestaurantListsServices' ,'MapvalueServices',function(RestaurantListsServices,MapvalueServices){
	var vm = this;
	vm.showeiei = function(){
		// vm.showDB = MapvalueServices.getResID();
		console.log(vm.rateVal);
	}


}]);