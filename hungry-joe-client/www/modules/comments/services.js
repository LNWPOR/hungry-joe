angular.module('Comments',[]).factory('CommentsServices', ['$resource', function ($resource) {
    var CommentsServices = {};

    var base = "https://hungry-joe-lnwpor-1.c9.io:8080"
	var Comments = $resource(base+'/api/comments');
   
    CommentsServices.getComments = function(){
        return Comments.query();
    }

    return CommentsServices;
}]);