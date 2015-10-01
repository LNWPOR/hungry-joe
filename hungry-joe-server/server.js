#!/usr/bin/env node

var debug = require('debug')('passport-mongo'),
    app = require('./app');


app.listen(process.env.PORT,process.env.IP, function() {
  console.log('I\'m Listening...');
  console.log(process.env.IP);
  console.log(process.env.PORT);
})