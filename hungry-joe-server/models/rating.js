var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    
var Rating = new Schema({
        rate : Number,
        restaurant_id : String,
        username : String,
});    
    
module.exports = mongoose.model('rating', Rating);