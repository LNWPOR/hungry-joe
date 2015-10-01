angular.module('Users',[]).factory('UsersServices', ['$resource', function ($resource) {
    var UsersServices = {};

    var base = "https://hungry-joe-lnwpor.c9.io:8080"
	// var Users = $resource(base+'/api/users');
   
    UsersServices.getUsers = function(){
        // return Users.query();
    }

    return UsersServices;
}]);