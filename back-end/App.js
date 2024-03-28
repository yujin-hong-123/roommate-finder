const express = require("express");
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.

const app = express();
app.use(cors()) // allow cross-origin resource sharing


app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data
console.log("created backend server!!!!!!!!!!!!!!!!")
let surveyDataArray = []; //This will store new incoming survey data. Its purpose is to simuate the new survey data being sent to the backend
let edit_profile_array = [];
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