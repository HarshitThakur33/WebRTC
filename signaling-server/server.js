const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Update with your frontend URL in production
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('offer', (data) => {
    io.to(data.target).emit('offer', { sender: socket.id, offer: data.offer });
  });

  socket.on('answer', (data) => {
    io.to(data.target).emit('answer', { sender: socket.id, answer: data.answer });
  });

  socket.on('candidate', (data) => {
    io.to(data.target).emit('candidate', { sender: socket.id, candidate: data.candidate });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Signaling server is running on http://localhost:3000');
});
