angular.module('Search',[])
.controller('SearchController', ['$scope', '$filter', 'KmradiusServices', 'MenuListsServices',  function($scope, $filter, KmradiusServices, MenuListsServices){
	var vm = this;
	vm.result = [];
	vm.send = [];
	vm.check = false;
	vm.searchKeyword = function(keyword) {
		vm.result = $filter('filter')(vm.restaurantDB, {food : keyword});
	}
	var dbPromise =  MenuListsServices.getMenuLists();
	dbPromise.$promise.then(function(db){
		vm.restaurantDB = [
		{
			"name": db[0].name,
			"food": db[0].menu,
			"checked" : false
		},
		{	
			"name": db[1].name,
			"food": db[1].menu,
			"checked" : false
		},
		{
			"name": db[2].name,
			"food": db[2].menu,
			"checked" : false
		},
		{	
			"name": db[3].name,
			"food": db[3].menu,
			"checked" : false
		},
		{	
			"name": db[4].name,
			"food": db[4].menu,
			"checked" : false
		},
		{	
			"name": db[5].name,
			"food": db[5].menu,
			"checked" : false
		},
		{	
			"name": db[6].name,
			"food": db[6].menu,
			"checked" : false
		}
		]
	});
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
		$scope.showMapView();
	}
}]);