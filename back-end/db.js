const mongoose = require('mongoose');


const User = new mongoose.Schema({
    username: String,
    password: String,
    profile: {
        name: String,
        year: String,
        bio: String
    },
    answers: {
        gender: String, 
        year: String, 
        pets: String, 
        guests: String, 
        smoke: String,
        drink: String,
        rent_max: Number,
        rent_min: Number, 
        bedtime: Number, 
        quietness : Number, 
        cleanliness: Number 
    },
    preferences: {
        gender: String, 
        year: String, 
        pets: String, 
        guests: String, 
        smoke: String, 
        drink: String, 
        bedtime: String, 
        quietness: String,
        cleanliness: String 
    }
})

const Message = new mongoose.Schema({
    message: String
})


mongoose.model('User', User);
mongoose.model('Message', Message);


mongoose.connect(process.env.DSN);