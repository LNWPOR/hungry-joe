angular.module('Km',[])
.controller('KmController', ['KmradiusServices','$scope',function(KmradiusServices,$scope){
	var vm = this;
	var testval;

	 vm.clickeiei = function(){
	 	console.log(vm.kmsearch);
	 }

	 vm.Set = function(km){
	 	// console.log("sent complete"+km);
	 	KmradiusServices.setRad(km);
	 	$scope.showMapView();
	 }

}]);
