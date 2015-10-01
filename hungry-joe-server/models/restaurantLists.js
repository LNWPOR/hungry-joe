var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    
var RestaurantLists = new Schema({
        name : String,
        location :[Number],
        rating : Number,
        tel : String,
        link : String
});    
    
module.exports = mongoose.model('restaurantLists', RestaurantLists);