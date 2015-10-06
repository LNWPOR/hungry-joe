angular.module('Kmradius',[]).factory('KmradiusServices', ['$resource', function ($resource) {
    var KmradiusServices = {};
    var Rad;
    var Radtmp = 20000;

   KmradiusServices.setRad = function(x){
      if(x==null){
        Rad = Radtmp;
      }
      else{
   		Rad = x;
    }
   }

   //get kmRad from here !!
   KmradiusServices.getRad = function(){
     return Rad;
   }


   return KmradiusServices;
    
}]);