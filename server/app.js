const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: ['http://localhost:5173'] } });

io.on("connection", (socket) => {
  console.log("Socket ID ===> ", socket.id)

  socket.on('disconnect', () => {
    console.log('A user has disconnected', socket.id)
  })

  socket.on('connect', () => {
    console.log('connected')
  })

  socket.on('user', () => console.log('user joined'))
});

httpServer.listen(3000, () => { console.log(`APP is listening to port 3000`) });