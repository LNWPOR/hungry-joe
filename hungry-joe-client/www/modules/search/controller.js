angular.module('Search',[])
.controller('SearchController', function($scope, $filter){
	var vm = this;
	vm.result = [];
	vm.searchKeyword = function(keyword) {
		vm.result = $filter('filter')(vm.restaurantDB, keyword);
	}
	vm.restaurantDB = [
	{
		"name":"KFC",
		"food":["ไก่ทอด","เบอร์เกอร์"]
	},
	{	
		"name":"Mc",
		"food":["burger","ผัก", "ไก่ทอด"]
	},
	{
		"name":"Pizza",
		"food":["ทอด","หมู"]
	}
	]
	vm.sendData = function(){
		console.log(vm.result.length);
		console.log(vm.result);
	}
});