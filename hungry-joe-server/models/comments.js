var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    
var Comments = new Schema({
        description : String,
        restaurant_id : String,
        user_id : String
});    
    
module.exports = mongoose.model('comments', Comments);