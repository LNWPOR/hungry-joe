angular.module('Search',[])
.controller('SearchController', ['$scope', '$filter', 'KmradiusServices', function($scope, $filter, KmradiusServices){
	var vm = this;
	vm.result = [];
	vm.send = [];
	vm.check = false;
	vm.searchKeyword = function(keyword) {
		vm.result = $filter('filter')(vm.restaurantDB, {food : keyword});
	}
	vm.restaurantDB = [
	{
		"name":"KFC",
		"food":["ไก่ทอด","เบอร์เกอร์"],
		"checked" : false
	},
	{	
		"name":"McDonald",
		"food":["burger","ผัก", "ไก่ทอด"],
		"checked" : false
	},
	{
		"name":"Pizza",
		"food":["ทอด","หมู"],
		"checked" : false
	}
	]
	vm.check_status = function(){
		for(var i=0;i<vm.restaurantDB.length;i++){
			if(i == 0){
				vm.check = vm.restaurantDB[i].checked;
			}
			else{
				vm.check |= vm.restaurantDB[i].checked;
			}
		}
	}
	vm.change_status = function(search){
		var j=0;
		for(var i=0;i<vm.restaurantDB.length;i++){
			if(vm.restaurantDB[i] == vm.result[j] && search != ""){
				j++;
			}
			else{
				vm.restaurantDB[i].checked = false;
			}
		}
	}
	vm.sendData = function(){
		var j = 0;
		vm.send = [];
		for(var i=0;i<vm.result.length;i++){
			if(vm.result[i].checked){
				vm.send[j] = vm.result[i].name;
				j++;
			}
		}
		KmradiusServices.setSearch(vm.send);
	}
}]);