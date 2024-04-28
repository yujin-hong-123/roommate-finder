const { create } = require("domain");
const server = require("./App");
const connectDB = require('./db');
connectDB();

const {createServer} = require('http')
const { Server } = require('socket.io');
const { error } = require("console");
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

/*
io.use((socket, next) => {
    const sockUsername = socket.handshake.auth.username;
    if(!sockUsername) {
        console.log("No username received");
        next();
    }
    socket.username = sockUsername;
    console.log(`Socket username: ${socket.username}`);
    next();
});
*/

io.on('connection', (socket) => {
    console.log(`a user has connected, user id = ${socket.id}`);
    /*
    const users = [];
    for(let [id, sock] of io.of('/').sockets) {
        users.push({
            userID: id,
            username: sock.username,
        });
    }
    socket.emit('users', users);
    //console.log(users);

    socket.broadcast.emit('user_connected', {
        userID: socket.id,
        username: socket.username,
        self: false,
    });
    */
    socket.on('chat_message', (msg) => {
        socket.broadcast.emit('chat_message', msg); 
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