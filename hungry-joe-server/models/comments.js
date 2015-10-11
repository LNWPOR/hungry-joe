var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    
var Comments = new Schema({
        description : String,
        restaurant_id : String,
        username : String,
        date : {type: Date, default: Date.now()}
});    
    
module.exports = mongoose.model('comments', Comments);