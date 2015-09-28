var express           = require('express');
var app               = express();
var bodyParser 		  = require('body-parser');
var mongoose          = require('mongoose');


mongoose.connect('mongodb://LNWPOR:lnwpor@ds051553.mongolab.com:51553/hungry-joe');




app.use(bodyParser());


//Cross Origin Request Sharing
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var Users = mongoose.model('Users', {
        Name : String
});

app.get('/api/users', function(req, res) {
    Users.find(function(err, Users) {
        if (err)
            res.send(err)
        res.json(Users);
    });
});


app.listen(process.env.PORT,process.env.IP, function() {
  console.log('I\'m Listening...');
  console.log(process.env.IP);
  console.log(process.env.PORT);
})