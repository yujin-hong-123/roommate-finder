const { create } = require("domain");
const server = require("./App");
const connectDB = require('./db');
connectDB();

const {createServer} = require('http')
const { Server } = require('socket.io');
const httpServer = createServer();
const io = new Server(httpServer, {cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,}});

const port = 3001;

io.on('connection_error', (err) => {
    console.log(err);
});

io.on('connection', (socket) => {
    console.log(`a user has connected, user id = ${socket.id}`);

    socket.on('chat_message', (msg) => {
        console.log(msg)
        io.emit('chat_message', msg);
    });

    socket.on('disconnect', () => {
      console.log("a user has disconnected");
    });
});

httpServer.listen(3002, () => {
    console.log("Socket server running on port 3002");
});

const listener = server.listen(port, function() {
    console.log(`Server running on port: ${port}`);
})

const close = () => {
    console.log("Connection has been closed");
    listener.close();
}

module.exports = { close: close, }