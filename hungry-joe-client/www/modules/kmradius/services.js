angular.module('Kmradius',[]).factory('KmradiusServices', [ function () {
    var KmradiusServices = {};
    var Rad;
    var Radtmp = 2000;
    var search = [];
    var page_from = 0;

    KmradiusServices.getFrom = function(){
      return page_from;
    }

   KmradiusServices.setRad = function(x){
      page_from = 0;
      if(x==null){
        Rad = Radtmp;
      }
      else{
   		Rad = x;
    }
   }

   KmradiusServices.setSearch = function(x){
    page_from = 1;
      search = x;
   }

   //get kmRad from here !!
   KmradiusServices.getRad = function(){
     return Rad;
   }

   KmradiusServices.getSearch = function(){
      return search;
   }

   return KmradiusServices;
    
}]);