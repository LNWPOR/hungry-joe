angular.module('Mapvalue',[]).factory('MapvalueServices', ['$resource', function ($resource) {
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