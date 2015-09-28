angular.module('Comments',[]).factory('CommentsServices', ['$resource', function ($resource) {
    var CommentsServices = {};

    var base = "https://hungry-joe-lnwpor.c9.io:8080"
	var Comments = $resource(base+'/api/comments');
   
    UsersServices.getUsers = function(){
        return Comments.query();
    }

    return CommentsServices;
}]);