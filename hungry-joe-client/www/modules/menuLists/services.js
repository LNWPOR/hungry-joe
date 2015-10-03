angular.module('MenuLists',[]).factory('MenuListsServices', ['$resource', function ($resource) {
    var MenuListsServices = {};

    var base = "https://hungry-joe-lnwpor-1.c9.io:8080"
	var MenuLists = $resource(base+'/api/menulists');
   
    MenuListsServices.getMenuLists = function(){
        return MenuLists.query();
    }

    return MenuListsServices;
}]);