angular.module('Km',[])
.controller('KmController', [function(){
	var vm = this;
	var INW;

	 vm.clickeiei = function(){
	 	// console.log(vm.kmsearch);	
	 	KmradiusServices.setRad(vm.kmsearch);
	 }



	// KmradiusServices.getrad(vm.kmsearch);

}]);