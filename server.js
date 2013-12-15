(function() {
  var express = require('express'),
    app = module.exports = express.createServer(express.logger()),
    io = require('socket.io').listen(app);

  app.use(express.static(__dirname + '/'));

  io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
  });

  // Use the port that Heroku provides or default to 5000
  var port = process.env.PORT || 4000;
  app.listen(port, function() {
    console.log("Started express server");
  });

  io.sockets.on('connection', function(socket) {
    socket.on('drawClick', function(data) {
      socket.broadcast.emit('draw', {
        x: data.x,
        y: data.y,
        type: data.type
      });
    });

    socket.on('turnEnded', function(data) {
      socket.broadcast.emit('turnChanged');
    });

    socket.on('winner', function(data) {
      socket.broadcast.emit('winner',{
        winner_name: data.winner_name,
        movie_name: data.movie_name
      });
    });

    socket.on('gameStarted', function(data) {
      socket.broadcast.emit('gameStarted');
    });

    socket.on('all_losers', function(data) {
      socket.broadcast.emit('all_losers');
    });

    socket.on('timer', function(data) {
      socket.broadcast.emit('timer',{
        count_timer: data.count_timer
      });
    });

  });
}).call(this);
