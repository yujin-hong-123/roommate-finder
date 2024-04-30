import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Survey.css";
import Header from "./Header";
import Button from './Button';
import axios from 'axios';
import { set } from 'mongoose';

function UserAnswers() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [errorMessage, setErrorMessage] = useState("");

    const [name, setName] = useState(null);
    const [year, setYear] = useState(null);
    const [genderAns, setGenderAns] = useState(null);
    const [petsAns, setPetsAns] = useState(null);
    const [guestsAns, setGuestsAns] = useState(null);
    const [smokeAns, setSmokeAns] = useState(null);
    const [drinkAns, setDrinkAns] = useState(null);
    const [maxRent, setMaxRent] = useState(null);
    const [minRent, setMinRent] = useState(null);
    const [bedAns, setBedAns] = useState(null);
    const [quietAns, setQuietAns] = useState(null);
    const [cleanAns, setCleanAns] = useState(null);

    const fetchSurveyData = async () => {
        try {
            const response = await axios.get('http://{$process.env.host}:3001/useranswers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Fetching profile data', response.data);
            if (response.data) {
                setName(response.data.profile.name)
                setYear(response.data.answers.year)
                setGenderAns(response.data.answers.gender)
                setPetsAns(response.data.answers.pets)
                setGuestsAns(response.data.answers.guests)
                setSmokeAns(response.data.answers.smoke)
                setDrinkAns(response.data.answers.drink)
                setMaxRent(response.data.answers.rent_max)
                setMinRent(response.data.answers.rent_min)
                setBedAns(response.data.answers.bedtime)
                setQuietAns(response.data.answers.quietness)
                setCleanAns(response.data.answers.cleanliness)
            } else {
                throw new Error('Profile data is missing');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            setError('Error fetching profile data: ' + error.message);
        }
    };

    useEffect(() => {
        fetchSurveyData();
    }, []);


    return (
        <div>
            <Header />
            <div className="Survey">
                <div className='section'>
                    <h3>Status</h3>
                </div>
                <div className="survey-question">
                    <p>Name: {name} </p>
                    <p>Year: {year}</p>
                    <p>Gender: {genderAns} </p>
                    <p>Do you have pets? {petsAns} </p>
                </div>

                <div className='section'>
                    <h3>Rent Range</h3>
                </div>
                <div className="survey-question">
                    <p>Max Rent: {maxRent} </p>
                    <p>Min Rent: {minRent} </p>
                </div>

                <div className='section'>
                    <h3>Living Habits</h3>
                </div>
                <div className="survey-question">
                    <p>How often do you bring over guests? {guestsAns} </p>
                    <p>How often do you smoke? {smokeAns} </p>
                    <p>How often do you drink? {drinkAns} </p>
                    <p>When is your usual bedtime(1: Before 10, 2: Between 10 pm and 12 am, 3: Between 12 am and 2 am,
                        4: Between 2 am and 4 am, 5:After 4 am, 6: Irregular)?  {bedAns} </p>
                    <p>How would you rate your loudness from 1 to 5(1 being quiet and 5 being loud)?  {quietAns} </p>
                    <p>How would you rate your cleanliness from 1 to 5(1 being messy and 5 being clean)?  {cleanAns} </p>
                </div>
                <Button text="Back" location="/otheruser" />
            </div>
        </div>
    );
}

export default UserAnswers;