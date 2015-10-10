var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    
var Comments = new Schema({
        description : String,
        restaurant_id : String,
        username : String,
        date : String
});    
    
module.exports = mongoose.model('comments', Comments);