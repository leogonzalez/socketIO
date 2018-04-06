const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const express = require('express');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join( __dirname,'/../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connect');
  socket.on('disconnect', () => {
    console.log('Disconnection');
  })
  // console.log(io);
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
