//const { Socket } = require("dgram");
const express = require("express");
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {cors : {}} );

app.use(cors()) // allow cross-origin resource sharing

app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
console.log("created backend server!!!!!!!!!!!!!!!!")

//This is basically just the survey responses, for now we have just 1
//Once we are able to ge this to send properly
//we will make this a list of several JSON objects
//and the JSON Objects will be sorted according to
//how much they match with the current user
//Then we just send the whole SORTED list of JSON objects to the frontend 
const hardcodedJSONData = {
    "user_id": "rkTV8JXlO1",
    "pets": "no",
    "guests": "yes",
    "rent_max": 10000,
    "rent_min": 300,
    "bedtime": "irregular"
};

app.get("/", (req, res) => {
    res.json("hello");
});

app.get('/matches', async (req, res) => {
    try {
      res.json({
        message: "Hi this is the matches page",
        status: 'all good',
      })
    } catch(err) {
      console.log(err);
    }
  });

app.get("/route2", (req, res) => {
    res.json({ data: hardcodedJSONData });
});

app.get("/socketTest", (req, res) => {
  res.send("<h1> Hello world </h1>");
});

io.on('connection', (socket) => {
    console.log("a user has connected");

    socket.on('disconnect', (reason) => {
      console.log(reason);
    });
});

module.exports = app;