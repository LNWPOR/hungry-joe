angular.module('Kmradius',[]).factory('KmradiusServices', ['$resource', function ($resource) {
    var KmradiusServices = {};
    var Rad ;

   KmradiusServices.setRad = function(x){
   		Rad = x;
   }

   //get kmRad from here !!
   KmradiusServices.getRad = function(){
     return Rad;
   }


   return KmradiusServices;
    
}]);