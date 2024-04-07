//const { Socket } = require("dgram");
require('./config.js');
require('./db.js');

const express = require("express");
const cors = require('cors'); // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const session = require('express-session')
const mongoose = require('mongoose');
const fs = require("fs");
const path = require("path");
const compat = require("./Compatibility")

const User = mongoose.model('User');
//const Message = mongoose.model('Message')

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

app.use(cors()); // allow cross-origin resource sharing

app.use(express.json()); // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })); // decode url-encoded incoming POST data

//sessions middleware
const sessionOptions = {
  secret: 'secret for signing session id',
  saveUninitialized: false,
  resave: false
};
app.use(session(sessionOptions));

app.use(function (req, res, next) {
  req.session.user = req.session.user || "";
  req.session.matches = req.session.matches || {};
  next();
});

console.log("created backend server!!!!!!!!!!!!!!!!");
let surveyDataArray = []; //This will store new incoming survey data. Its purpose is to simuate the new survey data being sent to the backend
let edit_profile_array = [];

let user = '';
let userList = [];
let unsortedMatches = []
let sortedMatches = [];

// Function to load the current database state
function loadDatabase() {
  const data = fs.readFileSync(dbPath, 'utf8');
  return JSON.parse(data);
}

// Function to save the updated database state
function saveDatabase(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}


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

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login attempt:', username, password); // Debug

  let foundUser = false;
  for (const key in userData) {
    if (userData[key].login.username === username && userData[key].login.password === password) {
      foundUser = true;
      break; // Stop the loop once the user is found
    }
  }

  if (foundUser) {
    console.log('Login successful for:', username); // Debug
    req.session.user = username;
    user = username;
    console.log('setting req.session.user to be', req.session.user); //debug
    res.json({ message: "Login successful" });
  } else {
    console.log('Login failed for:', username); // Debug
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Signup route
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Password validation criteria
  const passwordCriteria = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  if (!passwordCriteria.test(password)) {
    return res.status(400).json({ message: "Password does not meet criteria." });
  }

  const usersDb = loadDatabase();

  // Check if username already exists
  if (usersDb[username]) {
    return res.status(400).json({ message: "Username already exists." });
  }

  // Add user to database
  usersDb[username] = {
    login: { username, password },
    profile: {}, // Add additional signup information as needed
    answers: {},
    preferences: {}
  };

  // Save the updated database state
  saveDatabase(usersDb);

  res.json({ message: "Signup successful." });
});

//expecting json object with handle sumbit attruputes -- in Survey.js
//should push to surveyData arr
app.post('/survey', (req, res) => {
  const surveyData = req.body;
  surveyDataArray.push(surveyData);
  console.log('Backend has received new survey data:', surveyData);//We should see a message on the backend console with the data that was sent
  res.sendStatus(200); //Now tell the frontend that it is safe to proceed (the frontend survey.js will navigate to matches after this)
});

app.get('/matches', async (req, res) => {
  console.log(req.session.user)
  try {
    //FIRST, DATA IS RETREIVED FROM THE DATABASE AND COMPILED INTO AN ARRAY
    const BobbyImpasto = {
      login: {
        username: "BobbyImpasto",
        password: "bobby123"
      },

      profile: {
        name: "Bobby Impasto",
        year: "Senior",
        bio: "Yolo!"
      },

      answers: {
        //info
        gender: "male", //male, female, other
        year: "freshman", //freshman, sophomore, junoir, senior, other
        pets: "no", //yes, no
        //living style
        guests: "often", //often, sometimes, never
        smoke: "never",
        drink: "sometimes",
        //rent range
        rent_max: 4000,
        rent_min: 1000,
        //living habits
        bedtime: 2, //1(before 10), 2(10pm-12am), 3(12am-2am), 4(2am-4am), 5(after 4am), 0(depends)
        quietness: 2, //rank out of 1-5
        cleanliness: 4 //rank out of 1-5
      },

      preferences: {
        //info
        gender: "okay", //same, okay(with anything)
        year: "okay", //same, okay
        pets: "yes", //yes, no
        //living style
        guests: "yes", //yes, no
        smoke: "no", //yes, no
        drink: "yes", //yes, no
        //living habits
        bedtime: "similar", //similar, okay
        quietness: "okay", //similar, okay
        cleanliness: "clean" //similar, okay
      }
    };

    const BarackObama = {
      login: {
        username: "BarackObama",
        password: "barack123"
      },

      profile: {
        name: "Barack Obama",
        year: "Freshman",
        bio: "Yes we can!"
      },

      answers: {
        //info
        gender: "male", //male, female, other
        year: "freshman", //freshman, sophomore, junoir, senior, other
        pets: "no", //yes, no
        //living style
        guests: "often", //often, sometimes, never
        smoke: "never",
        drink: "sometimes",
        //rent range
        rent_max: 4000,
        rent_min: 1000,
        //living habits
        bedtime: 2, //1(before 10), 2(10pm-12am), 3(12am-2am), 4(2am-4am), 5(after 4am), 0(depends)
        quietness: 2, //rank out of 1-5
        cleanliness: 4 //rank out of 1-5
      },

      preferences: {
        //info
        gender: "okay", //same, okay(with anything)
        year: "okay", //same, okay
        pets: "yes", //yes, no
        //living style
        guests: "yes", //yes, no
        smoke: "no", //yes, no
        drink: "yes", //yes, no
        //living habits
        bedtime: "similar", //similar, okay
        quietness: "okay", //similar, okay
        cleanliness: "clean" //similar, okay
      }
    };

    const TaylorSwift = {
      login: {
        username: "TaylorSwift",
        password: "taylor123"
      },

      profile: {
        name: "Taylor Swift",
        year: "Junior",
        bio: "We're happy, free, confused, and lonely at the same time"
      },

      answers: {
        //info
        gender: "female", //male, female, other
        year: "junior", //freshman, sophomore, junoir, senior, other
        pets: "no", //yes, no
        //living style
        guests: "often", //often, sometimes, never
        smoke: "never",
        drink: "sometimes",
        //rent range
        rent_max: 4000,
        rent_min: 1000,
        //living habits
        bedtime: 2, //1(before 10), 2(10pm-12am), 3(12am-2am), 4(2am-4am), 5(after 4am), 0(depends)
        quietness: 2, //rank out of 1-5
        cleanliness: 4 //rank out of 1-5
      },

      preferences: {
        //info
        gender: "okay", //same, okay(with anything)
        year: "okay", //same, okay
        pets: "yes", //yes, no
        //living style
        guests: "yes", //yes, no
        smoke: "no", //yes, no
        drink: "yes", //yes, no
        //living habits
        bedtime: "similar", //similar, okay
        quietness: "okay", //similar, okay
        cleanliness: "clean" //similar, okay
      }
    };
    //jsonArray will be a list of all the user jsons retrieved from the database 
    //WE WOULD NOW SORT THIS ARRAY BASED ON THE SCORE

    let keys = []
    let jsonArray = [];
    const dict = { 'BobbyImpasto': BobbyImpasto, 'BarackObama': BarackObama, 'TaylorSwift': TaylorSwift }

    // if (user === 'BobbyImpasto') {
    //   userList = [BarackObama, TaylorSwift]
    //   keys = compat.createMatches(BobbyImpasto, userList);
    //   jsonArray = keys.map((key) => dict[key])
    // }
    // else if (user === 'BarackObama') {
    //   userList = [BobbyImpasto, TaylorSwift]
    //   keys = compat.createMatches(BarackObama, userList);
    //   jsonArray = keys.map((key) => dict[key])
    // }
    // else if (user === 'TaylorSwift') {
    //   userList = [BobbyImpasto, BarackObama]
    //   keys = compat.createMatches(TaylorSwift, userList);
    //   jsonArray = keys.map((key) => dict[key])
    // }

    User.find()
      .then(foundUser => {
        //jsonArray.push(foundUser);
        console.log("HERE!")
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
app.get('/chatlist', async (req, res) => {
  try {
    //Here, we will send a request to the database, searching for users that the user currently has an active chat with (not sure that determiend at the moment)
    const jsonArray = await User.find();

    //jsonArray will be a list of all the user jsons retrieved from the database
    //We could maybe sort this based on the most recent message first


    res.json(jsonArray)//Now, send the array to the front end
    //NOTE: THERE IS CURRENTLY NO "MOST RECENT MESSAGE FIELD"
    //...So the frontend just displays the bio for now under the username insted




  } catch (err) {
    console.log(err);
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



app.get('/profile', (req, res) => {
  const body1 = {
    bio: "Hello, here is some information about me. Please note, that this bio came from a mock profile hard coded into the backend. ",
    imagePath: "/static/images/donkey.jpg",
    user_id: "rkTV8JXlO1",
    name: "Bobby Impatato",
    pets: "no",
    guests: "yes",
    rent_max: 10000,
    rent_min: 300,
    bedtime: "irregular"
  }

  const body2 = {
    bio: "I'm an avid book reader and love to discuss literature. My ideal weekend involves a good book and a cup of coffee.",
    imagePath: "/static/images/cat.png",
    user_id: "u2LZxG3kA2",
    name: "Samantha Doe",
    pets: "yes",
    guests: "no",
    rent_max: 800,
    rent_min: 400,
    bedtime: "early"
  };

  const body3 = {
    bio: "Outdoor enthusiast and tech startup founder. I enjoy hiking and discussing new technology trends.",
    imagePath: "/static/images/dog.png",
    user_id: "b3Jk9F4mA3",
    name: "Alex Smith",
    pets: "no",
    guests: "sometimes",
    rent_max: 1200,
    rent_min: 600,
    bedtime: "late"
  };

  const body4 = {
    bio: "Music producer and DJ. Love to host small gatherings and share new music. Looking for someone who appreciates music.",
    imagePath: "/static/images/parrot.png",
    user_id: "d4PkS7ZnB4",
    name: "Jordan Miles",
    pets: "yes",
    guests: "often",
    rent_max: 1500,
    rent_min: 700,
    bedtime: "very late"
  };

  const body5 = {
    bio: "Professional chef and food blogger. I spend most of my time experimenting with recipes. Prefer a clean and quiet living space.",
    imagePath: "/static/images/rabbit.png",
    user_id: "e5QtV8FoC5",
    name: "Casey Rivera",
    pets: "no",
    guests: "rarely",
    rent_max: 1000,
    rent_min: 500,
    bedtime: "irregular"
  };
  //send mock data to frontend
  res.json(body1);

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

app.post('/editprofile', (req, res) => {
  const body4 = {
    database_old_password: "password7", //This is for test purpose, however
    //you MUST use this password for now to properly update the password
    //When connecting the database, we will search for the current users JSON file which stores their password
  };

  const surveyData2 = req.body;
  console.log("Trying to edit profile, we will check if password matches our database")

  if (body4.database_old_password == surveyData2.old_password) {
    //Old password matches, proceed with updating profile!!!
    console.log("Old password matches our record! Pushing new data")
    edit_profile_array.push(surveyData2);

    console.log('Backend has received updated profile data:', surveyData2);
    res.sendStatus(200);
    //that will allow frontend to proceed with navigating us back to profile
  } else {
    //Old password doesn't match, send an error :(
    //and this will trigger error message to be shown on frontend
    console.log('Error: Old password does not match.');
    res.status(400).send('Old password does not match.');
  }
});


module.exports = app;