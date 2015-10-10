angular.module('Mapvalue',[]).factory('MapvalueServices', ['$resource', function ($resource) {
    var MapvalueServices = {};
    var ResTmp;

    MapvalueServices.setResID = function(x){
    	ResTmp = x;
    }
    
    MapvalueServices.getResID = function(){
    	return ResTmp;
    }


    return MapvalueServices;
    
}]);