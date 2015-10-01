var mongoose = require('mongoose'),
    Schema = mongoose.Schema
    
var MenuLists = new Schema({
        name : String,
        menu : [String]
});    
    
module.exports = mongoose.model('menuLists', MenuLists);