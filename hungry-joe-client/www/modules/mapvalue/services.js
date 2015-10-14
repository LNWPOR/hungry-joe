angular.module('Mapvalue',[]).factory('MapvalueServices', [function () {
    var MapvalueServices = {};
    var gresTmp;

    MapvalueServices.setGresID = function(x){
    	gresTmp = x;
 
    }
    
    MapvalueServices.getgresID = function(){
    	return gresTmp;
    }


    return MapvalueServices;
}]);