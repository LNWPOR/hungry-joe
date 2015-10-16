angular.module('Mapvalue',[]).factory('MapvalueServices', [function () {
    var MapvalueServices = {};
    var gresTmp;
    var distance;
    var duration;

    MapvalueServices.setGresID = function(x){
    	gresTmp = x;
    }

    MapvalueServices.setDistance = function(x){
    	distance = x;
        console.log(x);
    }

    MapvalueServices.setDuration = function(x){
    	duration = x
        console.log(x);
    }
    
    MapvalueServices.getgresID = function(){
    	return gresTmp;
    }

    MapvalueServices.getDistance = function(){
    	return distance;
    }

    MapvalueServices.getDuration = function(){
    	return duration;
    }


    return MapvalueServices;
}]);