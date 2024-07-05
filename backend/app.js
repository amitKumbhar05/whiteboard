import express from 'express'
import { createServer } from 'http'
import { Server } from "socket.io"
import cors from 'cors'

const app = express()
app.use(cors({
  origin: '*'
}))
const server = createServer(app)
const port = 5000
const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  // console.log('New client connected');
  socket.on('draw', (data) => {
    socket.broadcast.emit('draw', data);
  });

  socket.on('clear', () => {
    socket.broadcast.emit('clear');
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.get('/', (req, res) => {
  res.send("hello")
})

server.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
})
