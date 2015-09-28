var express           = require('express');
var bodyParser 		  = require('body-parser');
var mongoose          = require('mongoose');
var cfenv             = require('cfenv');

var app               = express();
var appEnv            = cfenv.getAppEnv();
var host = (process.env.VCAP_APP_HOST || 'localhost');
var port = (process.env.VCAP_APP_PORT || 3000);
mongoose.connect('mongodb://LNWPOR:lnwpor@ds051553.mongolab.com:51553/hungry-joe');




app.use(bodyParser());
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

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
    
    res.writeHead(200, {"Context-Type": "text/plain"});
    res.write("Here is some data");
    res.end();
});

// app.set('port', (process.env.PORT || 5000));
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

app.listen(port, host);
console.log('App started on port ' + port);

// app.listen(appEnv.port, function() {

//     // print a message when the server starts listening
//   console.log("server starting on " + appEnv.url);
// });
