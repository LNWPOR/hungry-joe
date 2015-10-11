#!/usr/bin/env node

var debug = require('debug')('passport-mongo'),
    app = require('./app'),
    http = require('http').Server(app),
    io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('disconnect',function(){
    console.log('user disconnected');
  });
  
  socket.on('sendComment',function(data) {
    io.sockets.emit('getComment',data);
  });
  
  socket.on('sendRate',function(data) {
    io.sockets.emit('getRate',data);
  });
});

http.listen(process.env.PORT,process.env.IP, function() {
  console.log('I\'m Listening...');
  console.log(process.env.IP);
  console.log(process.env.PORT);
})