var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    
var Comments = new Schema({
        name : String,
        description : String,
        restaurantOwner : String,
        UserOwner : String
});    
    
module.exports = mongoose.model('comments', Comments);

