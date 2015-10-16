angular.module('MenuLists',[]).factory('MenuListsServices', ['$resource', function ($resource) {
    var MenuListsServices = {};
	var base = "https://hungry-joe-lnwpor-5.c9.io:8080";
    // var base = "http://hungry-joe-server.mybluemix.net";
	var MenuLists = $resource(base+'/api/menulists');
   
    MenuListsServices.getMenuLists = function(){
        return MenuLists.query();
    }

    return MenuListsServices;
}]);