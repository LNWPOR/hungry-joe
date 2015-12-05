angular.module('Km',[])
.controller('KmController', ['KmradiusServices',function(KmradiusServices){
	var vm = this;
	var testval;

	 vm.clickeiei = function(){
	 	console.log(vm.kmsearch);
	 }

	 vm.Set = function(){
	 	console.log("sent complete");
	 	KmradiusServices.setRad(vm.kmsearch);
	 }


}]);
