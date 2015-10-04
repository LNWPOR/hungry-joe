angular.module('Km',[])
.controller('KmController', ['KmradiusServices',function(KmradiusServices){
	var vm = this;
	var INW;

	 vm.clickeiei = function(){
	 	// console.log(vm.kmsearch);	
	 	KmradiusServices.setRad(vm.kmsearch);
	 	vm.eiei = KmradiusServices.getRad();
	 	console.log(vm.eiei);
	 }



	// KmradiusServices.getrad(vm.kmsearch);

}]);