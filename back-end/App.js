//const { Socket } = require("dgram");
require('./config.js');
require('./db.js');
require('dotenv').config();

const connectDB = require('./db');
connectDB();
const express = require("express");
const cors = require('cors'); // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const session = require('express-session')
const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");
const compat = require("./Compatibility")
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const User = mongoose.model('User');
const newUser = new User({});

const messageSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  timestamp: String,
  messagetext: String
}, { collection: 'messages' });


const MessageModel = mongoose.model('MessageModel', messageSchema);

const app = express();
const dbPath = path.join(__dirname, 'mockDatabase.json');

// Import user data
const userData = require('./mockDatabase.json');
const { profile } = require('console');

app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); // allow cross-origin resource sharing

app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

//sessions middleware
const sessionOptions = {
  secret: 'secret-for-signing-session-id',
  saveUninitialized: true,
  resave: false,
  cookie: {
    httpOnly: true,
    maxAge: 3600000
  }
};
app.use(session(sessionOptions));

app.use(function (req, res, next) {
  console.log(req.session.user);
  req.session.user = req.session.user || "a";
  req.session.matches = req.session.matches || [];
  //console.log(req.session)
  next();
});

console.log("created backend server!!!!!!!!!!!!!!!!");
let edit_profile_array = [];


// Function to load the current database state
function loadDatabase() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

// Function to save the updated database state
function saveDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

function generateToken(user) {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
  console.log("signed token with username ", user.username);
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};


//This is basically just the survey responses, for now we have just 1
//Once we are able to ge this to send properly
//we will make this a list of several JSON objects
//and the JSON Objects will be sorted according to
//how much they match with the current user
//Then we just send the whole SORTED list of JSON objects to the frontend 

app.get("/", (req, res) => {
});

app.get('/login', (req, res) => {
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Received login attempt:', username);

  try {
    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      console.log(`User not found for username: ${username}`);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Password mismatch for user: ${username}`);
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken(user);
    console.log(`Login successful for user: ${username}, token: ${token}`);
    res.json({ message: "Login successful", token: token });
  } catch (err) {
    console.error("Error during login for username: " + username, err);
    res.status(500).json({ message: "Internal server error", error: err.toString() });
  }
});





app.get('/register', (req, res) => {
})

// Signup route
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(`Trying to register user: ${username}`);

    const existingUser = await User.findOne({ username: username.trim() });
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const newUser = new User({
    //     username,
    //     password: hashedPassword
    // });

    newUser.username = username;
    newUser.password = hashedPassword;

    //await newUser.save();
    console.log('User registered successfully');
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});




//expecting json object with handle sumbit attruputes -- in Survey.js
//should push to surveyData arr
app.post('/survey', (req, res) => {
  const surveyData = req.body;
  //console.log('Backend has received new survey data:', surveyData);//We should see a message on the backend console with the data that was sent

  profiledict = { name: surveyData.name, year: surveyData.year, bio: "" }
  answersdict = {
    gender: surveyData.genderAns, year: surveyData.year, pets: surveyData.petsAns,
    guests: surveyData.guestsAns, smoke: surveyData.smokeAns, drink: surveyData.drinkAns,
    rent_max: surveyData.maxRent, rent_min: surveyData.minRent,
    bedtime: surveyData.bedAns, quietness: surveyData.quietAns, cleanliness: surveyData.cleanAns
  }
  preferencesdict = {
    gender: surveyData.genderPref, year: surveyData.yearPref, pets: surveyData.petsPref,
    guests: surveyData.guestsPref, smoke: surveyData.smokePref, drink: surveyData.drinkPref,
    bedtime: surveyData.bedPref, quietness: surveyData.quietPref, cleanliness: surveyData.cleanPref
  }

  newUser.profile = profiledict;
  newUser.answers = answersdict;
  newUser.preferences = preferencesdict;

  newUser.save()
    .then(() => {
      console.log("saved user info into database");
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('server error');
    });
});

app.get('/matches', async (req, res) => {
  console.log('matches:', req.session.user)
  req.session.user = req.session.user || "randomname";
  try {
    User.find()
      .then(foundUser => {
        //jsonArray.push(foundUser);
        res.json(foundUser)
      })
      .catch(err => {
        console.log(err);
        res.status(500).send('server error');
      });

    //res.json(jsonArray)//Now, send the array to the front end


  } catch (err) {
    console.log(err);
  }
});

//returns a bunch of json objects as an array
app.get('/chatlist', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id, 'username name bio imagePath pets guests rent_max rent_min bedtime');

    if (!user) return res.status(404).json({ message: "User not found" });

    const username = req.user.username;
    console.log('Username extracted from JWT token:', username);

    //This will query the database for all messages where either sender or recipient is the current user 
    try {
      const userMessages = await MessageModel.find({
        $or: [
          { sender: username },
          { recipient: username }
        ]
      }).lean().exec();

      //console.log('Messages associated with the current user:', userMessages);

      //This SET will hold unique sender and recipients username associated with the current user
      const uniqueUsersSet = new Set();

      //populate the set with all the senders and recipeints (will be no duplicates)
      userMessages.forEach(message => {
        uniqueUsersSet.add(message.sender);
        uniqueUsersSet.add(message.recipient);
      });

      //convert to array
      let uniqueUsersArray = Array.from(uniqueUsersSet);

      //remove the current users username from that array (so we cant see a convo with ourselves)
      uniqueUsersArray = uniqueUsersArray.filter(name => name !== username);

      console.log('Unique senders and recipients associated with:', username, uniqueUsersArray);



      const jsonArray = await User.find();//this gets an array of ALL user jsons

      //Now this FILTERS that array
      //...to only include the user JSONs mataching the unique usernames array
      const filteredJsonArray = jsonArray.filter(user => uniqueUsersArray.includes(user.username));


      //Now we send the filtered JSON array to the frontend to be displayed
      //The filtered JSON array should contain users JSONs of any user who has interedacted (sender/recipient)
      //...with the current user
      console.log('Sending all user JSONs associated with these usernames to the frontend.');
      res.json(filteredJsonArray);

    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/chatpage', async (req, res) => {
  try {
    //Here, we will send a request to the database, searching for the relevant messages for this chat
    //for now it will just display all messages in the database
    const chatArray = await MessageModel.find();

    //jsonArray will be a list of all the user jsons retrieved from the database
    //We could maybe sort this based on the most recent message firs

    res.json(chatArray)//Now, send the array to the front end
    //NOTE: THERE IS CURRENTLY NO "MOST RECENT MESSAGE FIELD"
    //...So the frontend just displays the bio for now under the username insted

  } catch (err) {
    console.log(err);
  }
});

app.post('/chatpage2', async (req, res) => {
  try {
    const sender = req.body.sender;
    const recipient = req.body.recipient;
    const timestamp = req.body.timestamp;
    const messagetext = req.body.messagetext;

    //create msg object
    const newMessage = new MessageModel({
      sender: sender,
      recipient: recipient,
      timestamp: timestamp,
      messagetext: messagetext
    });

    //send to database
    await newMessage.save();

    console.log('Message saved successfully:', newMessage);

    //success
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    //ERROR
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/profile', authenticateToken, (req, res) => {
  User.findById(req.user.id, 'username name bio imagePath pets guests rent_max rent_min bedtime')
    .then(user => {
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    });
});


app.get('/mypreferences', (req, res) => {

  const body1 = {
    bio: "Hello, here is some information about me. Please note, that this bio came from a mock profile hard coded into the backend. ",
    imagePath: "/static/images/donkey.jpg",
    user_id: "rkTV8JXlO1",
    name: "Bobby Impatato",
    pets: "no",
    guests: "yes",
    rent_max: 10000,
    rent_min: 300,
    bedtime: "3AM",
    roommates: 1
  }

  //send mock data to frontend
  res.json(body1);
});

app.post('/editprofile', authenticateToken, async (req, res) => {
  console.log("Received update request for user:", req.user.id);
  console.log("Request data:", req.body);

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found.');

    // Log the current username and bio before changes
    console.log(`Current username: ${user.username}, bio: ${user.bio}`);

    // If old_password is provided, verify it
    if (req.body.old_password && !(await bcrypt.compare(req.body.old_password, user.password))) {
      return res.status(400).json({ message: "Old password does not match." });
    }

    // If new_password is provided, hash it
    if (req.body.new_password) {
      const hashedPassword = await bcrypt.hash(req.body.new_password, 10);
      user.password = hashedPassword;
    }

    // Update fields
    user.username = req.body.username || user.username;
    user.bio = req.body.bio || user.bio;

    await user.save();

    // Log the updated username and bio
    console.log(`Updated username: ${user.username}, bio: ${user.bio}`);

    res.json({ message: 'Profile updated successfully.' });
  } catch (err) {
    console.error("Error during profile update:", err);
    res.status(500).json({ message: 'Internal server error', error: err.toString() });
  }
});





module.exports = app;