const server = require("./App")
/*, 
    http = require('http').Server(server), 
    io = require('socket.io')(http);
*/
const port = 3001;

const listener = server.listen(port, function() {
    console.log(`Server running on port: ${port}`);
})

/*
io.on('connection', (socket) => {
    console.log("a user has connected");

    socket.on('disconnect', () => {
      console.log("a user has disconnected");
    });
});
*/
const close = () => {
    console.log("Connection has been closed");
    listener.close();
}

module.exports = { close: close, }