angular.module('Kmradius',[]).factory('KmradiusServices', [ function () {
    var KmradiusServices = {};
    var Rad;
    var Radtmp = 2000;

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