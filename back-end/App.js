const express = require("express");
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.

const app = express();
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

app.get("/", (req, res) => {
  res.json("hello");
});

app.get('/matches', async (req, res) => {
  try {
    //FIRST, DATA IS RETREIVED FROM THE DATABASE AND COMPILED INTO AN ARRAY
    const body1 = {
      message: "Hello, I am the first user.",
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
      message: "Hello, I am the second user.",
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
      message: "Hello, I am the third user.",
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
      message: "Hello, I am the fourth user.",
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
      message: "Hello, I am the fifth user.",
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
    //WE WOULD NOW SORT THIS ARRAY BASED ON THE SCORE

    res.json(jsonArray)//Now, send the array to the front end


  } catch (err) {
    console.log(err);
  }
});

app.get("/route2", (req, res) => {
  res.json({ data: hardcodedJSONData });
});

module.exports = app;