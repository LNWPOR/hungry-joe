angular.module('Comments',[]).factory('CommentsServices', ['$resource', function ($resource) {
    var CommentsServices = {};
    var base = "https://hungry-joe-lnwpor-5.c9.io:8080";
    // var base = "http://hungry-joe-server.mybluemix.net";
	var Comments = $resource(base+'/api/comments');
    var RestaurantComments = $resource(base+'/api/comments/:restaurant_id',{restaurant_id : '@restaurant_id'});
    
    CommentsServices.getRestaurantComments = function(restaurant_id){
        return RestaurantComments.query({},{'restaurant_id':restaurant_id});
    }
  	
    CommentsServices.addComments = function(description,restaurant_id,username){
        var comment = new Comments();
        comment.description = description;
        comment.restaurant_id = restaurant_id;
        comment.username = username;
        comment.date = new Date();
        Comments.save(comment);
    }
    
    return CommentsServices;
}]);