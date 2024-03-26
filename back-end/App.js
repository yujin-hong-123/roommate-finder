const express = require("express");
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.

const app = express();
app.use(cors()) // allow cross-origin resource sharing


app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
console.log("created backend server!!!!!!!!!!!!!!!!")
let surveyDataArray = []; //This will store new incoming survey data. Its purpose is to simuate the new survey data being sent to the backend

//This is basically just the survey responses, for now we have just 1
//Once we are able to ge this to send properly
//we will make this a list of several JSON objects
//and the JSON Objects will be sorted according to
//how much they match with the current user
//Then we just send the whole SORTED list of JSON objects to the frontend 

app.get("/", (req, res) => {
  res.json("hello");
});

app.get('/matches', async (req, res) => {
  try {
    //FIRST, DATA IS RETREIVED FROM THE DATABASE AND COMPILED INTO AN ARRAY
    const body1 = {
      bio: "Hello, I am the first user.",
      imagePath: "/static/images/donkey.jpg",
      user_id: "rkTV8JXlO1",
      name: "Bobby Impastato",
      pets: "no",
      guests: "yes",
      rent_max: 10000,
      rent_min: 300,
      bedtime: "irregular"
    }

    const body2 = {
      bio: "Hello, I am the second user.",
      imagePath: "/static/images/donkey.jpg",
      user_id: "rkTV8JXlO1",
      name: "Barack Obama",
      pets: "no",
      guests: "yes",
      rent_max: 10000,
      rent_min: 300,
      bedtime: "irregular"
    }

    const body3 = {
      bio: "Hello, I am the third user.",
      imagePath: "/static/images/donkey.jpg",
      user_id: "rkTV8JXlO1",
      name: "Taylor Swift",
      pets: "no",
      guests: "yes",
      rent_max: 10000,
      rent_min: 300,
      bedtime: "irregular"
    }

    const body4 = {
      bio: "Hello, I am the fourth user.",
      imagePath: "/static/images/donkey.jpg",
      user_id: "rkTV8JXlO1",
      name: "Steve Jobs",
      pets: "no",
      guests: "yes",
      rent_max: 10000,
      rent_min: 300,
      bedtime: "irregular"
    }

    const body5 = {
      bio: "Hello, I am the fifth user.",
      imagePath: "/static/images/donkey.jpg",
      user_id: "rkTV8JXlO1",
      name: "Michael Jordan",
      pets: "no",
      guests: "yes",
      rent_max: 10000,
      rent_min: 300,
      bedtime: "irregular"
    }

    const jsonArray = [body1, body2, body3, body4, body5];
    //jsonArray will be a list of all the user jsons retrieved from the database 
    //WE WOULD NOW SORT THIS ARRAY BASED ON THE SCORE

    res.json(jsonArray)//Now, send the array to the front end


  } catch (err) {
    console.log(err);
  }
});

app.get('/chatlist', async (req, res) => {
  try {
    //Here, we will send a request to the database, searching for users that the user currently has an active chat with (not sure that determiend at the moment)
    const body1 = {
      bio: "Eventually this will display the most recent message with Bobby",
      imagePath: "/static/images/donkey.jpg",
      user_id: "rkTV8JXlO1",
      name: "Bobby Impastato",
      pets: "no",
      guests: "yes",
      rent_max: 10000,
      rent_min: 300,
      bedtime: "irregular"
    }

    const body2 = {
      bio: "Eventually this will display the most recent message with Barack",
      imagePath: "/static/images/donkey.jpg",
      user_id: "rkTV8JXlO1",
      name: "Barack Obama",
      pets: "no",
      guests: "yes",
      rent_max: 10000,
      rent_min: 300,
      bedtime: "irregular"
    }

    const body3 = {
      bio: "Eventually this will display the most recent message with Taylor",
      imagePath: "/static/images/donkey.jpg",
      user_id: "rkTV8JXlO1",
      name: "Taylor Swift",
      pets: "no",
      guests: "yes",
      rent_max: 10000,
      rent_min: 300,
      bedtime: "irregular"
    }

    const body4 = {
      bio: "Hello, I am the fourth user.",
      imagePath: "/static/images/donkey.jpg",
      user_id: "rkTV8JXlO1",
      name: "Michael Bossi",
      pets: "no",
      guests: "yes",
      rent_max: 10000,
      rent_min: 300,
      bedtime: "irregular"
    }

    const body5 = {
      bio: "Hello, I am the fifth user.",
      imagePath: "/static/images/donkey.jpg",
      user_id: "rkTV8JXlO1",
      name: "Bill Clinton",
      pets: "no",
      guests: "yes",
      rent_max: 10000,
      rent_min: 300,
      bedtime: "irregular"
    }

    const body6 = {
      bio: "Hello, I am the sixth user.",
      imagePath: "/static/images/donkey.jpg",
      user_id: "rkTV8JXlO1",
      name: "Lady Gaga",
      pets: "no",
      guests: "yes",
      rent_max: 10000,
      rent_min: 300,
      bedtime: "irregular"
    }


    const jsonArray = [body1, body2, body3, body4, body5, body6];
    //jsonArray will be a list of all the user jsons retrieved from the database
    //We could maybe sort this based on the most recent message first

    res.json(jsonArray)//Now, send the array to the front end


  } catch (err) {
    console.log(err);
  }
});

app.post('/survey', (req, res) => {
  const surveyData = req.body;
  surveyDataArray.push(surveyData);
  console.log('Backend has received new survey data:', surveyData);//We should see a message on the backend console with the data that was sent
  res.sendStatus(200); //Now tell the frontend that it is safe to proceed (the frontend survey.js will navigate to matches after this)
});

module.exports = app;