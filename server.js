(function() {

  var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server)
  , port = process.env.PORT || 4000;

  app.use(express.static(__dirname + '/'));

  server.listen(port);

  console.log('http server listening on %d', port);

  io.disable('strict ip policy');
  io.set('heartbeat interval', 55);

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

    socket.on('timer', function(data) {
      socket.broadcast.emit('timer',{
        count_timer: data.count_timer,
        movie_name: data.movie_name
      });
    });

  });
}).call(this);
