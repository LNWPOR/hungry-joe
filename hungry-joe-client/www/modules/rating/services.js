angular.module('Rating',[]).factory('RatingServices', ['$resource', function ($resource) {
    var RatingServices = {};
    var base = "https://hungry-joe-lnwpor-5.c9.io:8080";
    // var base = "http://hungry-joe-server.mybluemix.net";
    var Rating = $resource(base+'/api/rating');
    var RestaurantRating = $resource(base+'/api/rating/:restaurant_id',{restaurant_id : '@restaurant_id'});
    
    RatingServices.getRestaurantRating = function(restaurant_id){
        return RestaurantRating.query({},{'restaurant_id':restaurant_id});
    }
  	
    RatingServices.addRating = function(rate,restaurant_id,username){
        var rating = new Rating();
        rating.rate = rate;
        rating.restaurant_id = restaurant_id;
        rating.username = username;
        Rating.save(rating);
    }
    
    return RatingServices;
}]);