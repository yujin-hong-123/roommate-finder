const express = require("express");
const app = express();
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

app.get("/route1", (req, res) => {
    const hardcodedString = "This is some hardcoded data from the backend to be displayed in Matches";
    res.json({ data: hardcodedString });
});

app.get("/route2", (req, res) => {
    res.json({ data: hardcodedJSONData });
});

module.exports = app;