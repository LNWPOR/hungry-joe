angular.module('Km',[])
.controller('KmController', ['KmradiusServices',function(KmradiusServices){
	var vm = this;
	var testval;

	 vm.clickeiei = function(){
	 	testval = KmradiusServices.getRad();
	 	console.log(testval);
	 }

	 vm.Set = function(){
	 	KmradiusServices.setRad(vm.kmsearch);
	 }


}]);