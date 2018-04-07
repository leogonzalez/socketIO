const path = require("path");
const http = require("http");
const socketIO = require("socket.io");

const express = require("express");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "/../public");

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connect");

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User Joined',
    createdAt: new Date().getTime()
  });

  socket.on("createMessage", message => {
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
