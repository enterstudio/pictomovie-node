(function() {
  var io;
  //var port = process.env.PORT || 4000;
  io = require('socket.io').listen(4000);

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
