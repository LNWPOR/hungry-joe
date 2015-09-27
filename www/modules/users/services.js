angular.module('Users',[]).factory('UsersServices', ['$resource', function ($resource) {
    var UsersServices = {};

    // var base = "https://hungry-joe-server.herokuapp.com"
    var base = "http://hungry-joe-server.mybluemix.net:3000"
	var Users = $resource(base+'/api/users');
   
    UsersServices.getUsers = function(){
        return Users.query();
    }

    return UsersServices;
}]);