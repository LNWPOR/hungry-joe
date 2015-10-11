var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    
var RestaurantLists = new Schema({
        name : String,
        gres_id : String
});    
    
module.exports = mongoose.model('restaurantLists', RestaurantLists);