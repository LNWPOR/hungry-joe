angular.module('Kmradius',[]).factory('KmradiusServices', ['$resource', function ($resource) {
    var KmradiusServices = {};
    var Rad ;
   KmradiusServices.setRad = function(x){

   		Rad = x;
   		// console.log(Rad);
   }

   // KmradiusServices.tryclick = function(x){
   // 		console.log(x);
   // }

   KmradiusServices.getRad = function(){
     return Rad;
   }


   return KmradiusServices;
    
}]);