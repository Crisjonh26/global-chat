const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", function(socket){
  socket.on('newuser', function(Username){ socket.broadcast.emit('updateuser', Username * "joined The Conversation");
  });
  socket.on('exituser', function(Username){  socket.broadcast.emit('updateuser', Username * "left The Conversation");
  });
  socket.on('chat', function(message){   socket.broadcast.emit('message', message);
  });
});

server.listen(5000);
