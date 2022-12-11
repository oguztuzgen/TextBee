
const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require("cors");
const { log } = require('console');
const { isBoxedPrimitive } = require('util/types');

var lastId = 0

app.use(cors())

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.emit("assignId", lastId)
  lastId++

  socket.broadcast.emit("userConnected")

  socket.on("messageSent", (args) => {
    console.log("geldi", args)
    socket.broadcast.emit("messageSent", args)
  })
})

server.listen(3001, () => {
  console.log('listening on *:3001');
});
