angular.module('Comments',[]).factory('CommentsServices', ['$resource', function ($resource) {
    var CommentsServices = {};

    var base = "https://hungry-joe-lnwpor-5.c9.io:8080"
	var Comments = $resource(base+'/api/comments/:restaurant_id',{restaurant_id : '@restaurant_id'});
   
    CommentsServices.getComments = function(){
        return Comments.query();
    }

    CommentsServices.getRestaurantComments = function(restaurant_id){
        return Comments.get({restaurant_id:restaurant_id});
    }
  	
    CommentsServices.addComments = function(description,restaurant_id,user_id){
        var comment = new Comments();
        comment.description = description;
        comment.restaurant_id = restaurant_id;
        comment.user_id = user_id;
        comment.date = new Date();
        Comments.save(comment);
    }
    
    return CommentsServices;
}]);