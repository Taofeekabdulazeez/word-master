const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: ['http://localhost:5173'] } });

const list = []

io.on("connection", (socket) => {
  socket.on('message', (data) => {
    list.push(data)
    console.log(list)
    io.emit('list-update', list)
  })
});

httpServer.listen(3000, () => { console.log(`Server is listening on port 3000`) });