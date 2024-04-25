import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Survey.css";
import Header from "./Header";
import axios from 'axios';
import { set } from 'mongoose';

function Survey() {
    const navigate = useNavigate();

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

    const [genderPref, setGenderPref] = useState(null);
    const [yearPref, setYearPref] = useState(null);
    const [petsPref, setPetsPref] = useState(null);
    const [guestsPref, setGuestsPref] = useState(null);
    const [smokePref, setSmokePref] = useState(null);
    const [drinkPref, setDrinkPref] = useState(null);
    const [bedPref, setBedPref] = useState(null);
    const [quietPref, setQuietPref] = useState(null);
    const [cleanPref, setCleanPref] = useState(null);

    //Profile
    const handleNameChange = (value) => {
        setName(value);
    };
    const handleYearChange = (value) => {
        setYear(value);
    };

    //Answers
    const handleGenderAnsChange = (value) => {
        setGenderAns(value);
    };
    const handlePetsAnsChange = (value) => {
        setPetsAns(value);
    };

    const handleGuestsAnsChange = (value) => {
        setGuestsAns(value);
    }
    const handleSmokeAnsChange = (value) => {
        setSmokeAns(value);
    }
    const handleDrinkAnsChange = (value) => {
        setDrinkAns(value);
    }

    const handleMaxRentChange = (value) => {
        setMaxRent(value);
    };
    const handleMinRentChange = (value) => {
        setMinRent(value);
    };

    const handleBedAnsChange = (value) => {
        setBedAns(value)
    }
    const handleQuietAnsChange = (value) => {
        setQuietAns(value)
    }
    const handleCleanAnsChange = (value) => {
        setCleanAns(value)
    }

    //Preferences
    const handleGenderPrefChange = (value) => {
        setGenderPref(value);
    };
    const handleYearPrefChange = (value) => {
        setYearPref(value);
    };
    const handlePetsPrefChange = (value) => {
        setPetsPref(value);
    };

    const handleGuestsPrefChange = (value) => {
        setGuestsPref(value);
    }
    const handleSmokePrefChange = (value) => {
        setSmokePref(value);
    }
    const handleDrinkPrefChange = (value) => {
        setDrinkPref(value);
    }

    const handleBedPrefChange = (value) => {
        setBedPref(value)
    }
    const handleQuietPrefChange = (value) => {
        setQuietPref(value)
    }
    const handleCleanPrefChange = (value) => {
        setCleanPref(value)
    }

    const handleSubmit = () => {
        // Check if any required questions are unanswered
        if (
            !name ||
            !year ||
            !genderAns ||
            !petsAns ||
            !guestsAns ||
            !smokeAns ||
            !drinkAns ||
            !maxRent ||
            !minRent ||
            !bedAns ||
            !quietAns ||
            !cleanAns ||
            !genderPref ||
            !yearPref ||
            !petsPref ||
            !guestsPref ||
            !smokePref ||
            !drinkPref ||
            !bedPref ||
            !quietPref ||
            !cleanPref
        ) {
            // If any required questions are unanswered, display an alert
            alert("Please answer all questions before submitting the survey.");
        } else {
            // If all questions are answered, proceed with submitting the survey
            const surveyData = {
                name,
                year,
                genderAns,
                petsAns,
                guestsAns,
                smokeAns,
                drinkAns,
                maxRent,
                minRent,
                bedAns,
                quietAns,
                cleanAns,
                genderPref,
                yearPref,
                petsPref,
                guestsPref,
                smokePref,
                drinkPref,
                bedPref,
                quietPref,
                cleanPref
            };
    
            axios
                .post('http://localhost:3001/survey', surveyData)
                .then(response => {
                    navigate('/login');
                })
                .catch(error => {
                    console.error('Error submitting survey:', error);
                });
        }
    };


    return (
        <div className="Survey">
            <Header />
            <div className='section'>
                <h3>Let's set up your profile!</h3>
            </div>
            
            <div className="survey-question">
                <p>What is your first and last name? (i.e. Barack Obama)</p>
                <input
                    id='name'
                    type='text'
                    name='name'
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                />
            </div>

            <div className='survey-question'>
                <p>What is your year?</p>
                <label for='year'>
                    <input 
                        id='year'
                        type='radio'
                        name='year'
                        value='freshman'
                        checked={year === 'freshman'}
                        onChange={() => handleYearChange('freshman')}
                    />
                    Freshman
                </label>
                <label for='year'>
                    <input 
                        id='year'
                        type='radio'
                        name='year'
                        value='sophomore'
                        checked={year === 'sophomore'}
                        onChange={() => handleYearChange('sophomore')}
                        />
                    Sophomore
                </label>
                <label for='year'>
                    <input 
                        id='year'
                        type='radio'
                        name='year'
                        value='junior'
                        checked={year === 'junior'}
                        onChange={() => handleYearChange('junior')}
                        />
                    Junior
                </label>
                <label for='year'>
                    <input 
                        id='year'
                        type='radio'
                        name='year'
                        value='senior'
                        checked={year === 'senior'}
                        onChange={() => handleYearChange('senior')}
                        />
                    Senior
                </label>
            </div>

            <br></br>
            <div className='section'>
                <h3>Tell us about yourself.</h3>
            </div>

            <div className='survey-question'>
                <p>What is your gender?</p>
                <label for='genderAns'>
                    <input 
                        id='genderAns'
                        type='radio'
                        name='genderAns'
                        value='male'
                        checked={genderAns === 'male'}
                        onChange={() => handleGenderAnsChange('male')}
                        />
                    Male
                </label>
                <label for='genderAns'>
                    <input 
                        id='genderAns'
                        type='radio'
                        name='genderAns'
                        value='female'
                        checked={genderAns === 'female'}
                        onChange={() => handleGenderAnsChange('female')}
                        />
                    Female
                </label>
                <label for='genderAns'>
                    <input 
                        id='genderAns'
                        type='radio'
                        name='genderAns'
                        value='other'
                        checked={genderAns === 'other'}
                        onChange={() => handleGenderAnsChange('other')}
                        />
                    Other
                </label>
            </div>

            <div className='survey-question'>
                <p>Do you have pets?</p>
                <label>
                    <input
                        type='radio'
                        name='petsAns'
                        value='yes'
                        checked={petsAns === 'yes'}
                        onChange={() => handlePetsAnsChange('yes')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type='radio'
                        name='petsAns'
                        value='no'
                        checked={petsAns === 'no'}
                        onChange={() => handlePetsAnsChange('no')}
                    />
                    No
                </label>
            </div>

            <div className="survey-question">
            <p>Specify your desired rent per person in dollars:</p>
            <div className="rent-inputs">
                <p></p>
                <label>
                    Minimum Rent Share:
                    <input
                        type='number'
                        name='minRent'
                        value={minRent}
                        onChange={(e) => handleMinRentChange(parseInt(e.target.value))}
                    />
                </label><br />
                <label>
                    Maximum Rent Share:
                    <input
                        type='number'
                        name='maxRent'
                        value={maxRent}
                        onChange={(e) => handleMaxRentChange(parseInt(e.target.value))}
                    />
                </label>
            </div>
            </div>

            <div className='survey-question'>
                <p>How often do you bring guests into your home?</p>
                <label>
                    <input
                        type='radio'
                        name='guestsAns'
                        value='often'
                        checked={guestsAns === 'often'}
                        onChange={() => handleGuestsAnsChange('often')}
                    />
                    Often
                </label>
                <label>
                    <input
                        type='radio'
                        name='guestsAns'
                        value='sometimes'
                        checked={guestsAns === 'sometimes'}
                        onChange={() => handleGuestsAnsChange('sometimes')}
                    />
                    Sometimes
                </label>
                <label>
                    <input
                        type='radio'
                        name='guestsAns'
                        value='never'
                        checked={guestsAns === 'never'}
                        onChange={() => handleGuestsAnsChange('never')}
                    />
                    Never
                </label>
            </div>

            <div className='survey-question'>
                <p>How often do you smoke?</p>
                <label>
                    <input
                        type='radio'
                        name='smokeAns'
                        value='often'
                        checked={smokeAns === 'often'}
                        onChange={() => handleSmokeAnsChange('often')}
                    />
                    Often
                </label>
                <label>
                    <input
                        type='radio'
                        name='smokeAns'
                        value='sometimes'
                        checked={smokeAns === 'sometimes'}
                        onChange={() => handleSmokeAnsChange('sometimes')}
                    />
                    Sometimes
                </label>
                <label>
                    <input
                        type='radio'
                        name='smokeAns'
                        value='never'
                        checked={smokeAns === 'never'}
                        onChange={() => handleSmokeAnsChange('never')}
                    />
                    Never
                </label>
            </div>

            <div className='survey-question'>
                <p>How often do you drink?</p>
                <label>
                    <input
                        type='radio'
                        name='drinkAns'
                        value='often'
                        checked={drinkAns === 'often'}
                        onChange={() => handleDrinkAnsChange('often')}
                    />
                    Often
                </label>
                <label>
                    <input
                        type='radio'
                        name='drinkAns'
                        value='sometimes'
                        checked={drinkAns === 'sometimes'}
                        onChange={() => handleDrinkAnsChange('sometimes')}
                    />
                    Sometimes
                </label>
                <label>
                    <input
                        type='radio'
                        name='drinkAns'
                        value='never'
                        checked={drinkAns === 'never'}
                        onChange={() => handleDrinkAnsChange('never')}
                    />
                    Never
                </label>
            </div>

            <div className='survey-question'>
                <p>When is your usual bedtime?</p>
                <label>
                    <input
                        type='radio'
                        name='bedAns'
                        value={1}
                        checked={bedAns === 1}
                        onChange={() => handleBedAnsChange(1)}
                    />
                    Before 10
                </label>
                <label>
                <input
                        type='radio'
                        name='bedAns'
                        value={2}
                        checked={bedAns === 2}
                        onChange={() => handleBedAnsChange(2)}
                    />
                    Between 10 pm and 12 am
                </label>
                <label>
                <input
                        type='radio'
                        name='bedAns'
                        value={3}
                        checked={bedAns === 3}
                        onChange={() => handleBedAnsChange(3)}
                    />
                    Between 12 am and 2 am
                </label>
                <label>
                    <input
                        type='radio'
                        name='bedAns'
                        value={4}
                        checked={bedAns === 4}
                        onChange={() => handleBedAnsChange(4)}
                    />
                    Between 2 am and 4 am
                </label>
                <label>
                    <input
                        type='radio'
                        name='bedAns'
                        value={5}
                        checked={bedAns === 5}
                        onChange={() => handleBedAnsChange(5)}
                    />
                    After 4 am
                </label>
                <label>
                    <input
                        type='radio'
                        name='bedAns'
                        value={6}
                        checked={bedAns === 6}
                        onChange={() => handleBedAnsChange(6)}
                    />
                    Irregular
                </label>
            </div>

            <div className='survey-question'>
                <p>How would you rate your loudness from 1 to 5? (1 being quiet and 5 being loud)</p>
                <label>
                    <input
                        type='radio'
                        name='quietAns'
                        value={1}
                        checked={quietAns === 1}
                        onChange={() => handleQuietAnsChange(1)}
                    />
                    1
                </label>
                <label>
                    <input
                        type='radio'
                        name='quietAns'
                        value={2}
                        checked={quietAns === 2}
                        onChange={() => handleQuietAnsChange(2)}
                    />
                    2
                </label>
                <label>
                    <input
                        type='radio'
                        name='quietAns'
                        value={3}
                        checked={quietAns === 3}
                        onChange={() => handleQuietAnsChange(3)}
                    />
                    3
                </label>
                <label>
                    <input
                        type='radio'
                        name='quietAns'
                        value={4}
                        checked={quietAns === 4}
                        onChange={() => handleQuietAnsChange(4)}
                    />
                    4
                </label>
                <label>
                    <input
                        type='radio'
                        name='quietAns'
                        value={5}
                        checked={quietAns === 5}
                        onChange={() => handleQuietAnsChange(5)}
                    />
                    5
                </label>
            </div>

            <div className='survey-question'>
                <p>How would you rate your cleanliness from 1 to 5? (1 being messy and 5 being clean)</p>
                <label>
                    <input
                        type='radio'
                        name='cleanAns'
                        value={1}
                        checked={cleanAns === 1}
                        onChange={() => handleCleanAnsChange(1)}
                    />
                    1
                </label>
                <label>
                    <input
                        type='radio'
                        name='cleanAns'
                        value={2}
                        checked={cleanAns === 2}
                        onChange={() => handleCleanAnsChange(2)}
                    />
                    2
                </label>
                <label>
                    <input
                        type='radio'
                        name='cleanAns'
                        value={3}
                        checked={cleanAns === 3}
                        onChange={() => handleCleanAnsChange(3)}
                    />
                    3
                </label>
                <label>
                    <input
                        type='radio'
                        name='cleanAns'
                        value={4}
                        checked={cleanAns === 4}
                        onChange={() => handleCleanAnsChange(4)}
                    />
                    4
                </label>
                <label>
                    <input
                        type='radio'
                        name='cleanAns'
                        value={5}
                        checked={cleanAns === 5}
                        onChange={() => handleCleanAnsChange(5)}
                    />
                    5
                </label>
            </div>

            <br></br>
            <div className='section'>
                <h3>Now tell us what you are looking for in a roommate.</h3>
            </div>

            <div className='survey-question'>
                <p>Are you open to having a roommate with another gender?</p>
                <label>
                    <input
                        type='radio'
                        name='genderPref'
                        value='okay'
                        checked={genderPref === 'okay'}
                        onChange={() => handleGenderPrefChange('okay')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type='radio'
                        name='genderPref'
                        value='same'
                        checked={genderPref === 'same'}
                        onChange={() => handleGenderPrefChange('same')}
                    />
                    No
                </label>
            </div>

            <div className='survey-question'>
                <p>Are you open to having a roommate in another year of school?</p>
                <label>
                    <input
                        type='radio'
                        name='yearPref'
                        value='okay'
                        checked={yearPref === 'okay'}
                        onChange={() => handleYearPrefChange('okay')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type='radio'
                        name='yearPref'
                        value='same'
                        checked={yearPref === 'same'}
                        onChange={() => handleYearPrefChange('same')}
                    />
                    No
                </label>
            </div>

            <div className='survey-question'>
                <p>Are you okay with your roommate having pets?</p>
                <label>
                    <input
                        type='radio'
                        name='petsPref'
                        value='yes'
                        checked={petsPref === 'yes'}
                        onChange={() => handlePetsPrefChange('yes')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type='radio'
                        name='petsPref'
                        value='no'
                        checked={petsPref === 'no'}
                        onChange={() => handlePetsPrefChange('no')}
                    />
                    No
                </label>
            </div>

            <div className="survey-question">
                <p>Are you okay with your roommate bringing guests?</p>
                <label>
                    <input
                        type='radio'
                        name='guestsPref'
                        value='yes'
                        checked={guestsPref === 'yes'}
                        onChange={() => handleGuestsPrefChange('yes')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type='radio'
                        name='guestsPref'
                        value='no'
                        checked={guestsPref === 'no'}
                        onChange={() => handleGuestsPrefChange('no')}
                    />
                    No
                </label>
            </div>

            <div className="survey-question">
                <p>Are you okay with your roommate smoking?</p>
                <label>
                    <input
                        type='radio'
                        name='smokePref'
                        value='yes'
                        checked={smokePref === 'yes'}
                        onChange={() => handleSmokePrefChange('yes')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type='radio'
                        name='smokePref'
                        value='no'
                        checked={smokePref === 'no'}
                        onChange={() => handleSmokePrefChange('no')}
                    />
                    No
                </label>
            </div>

            <div className="survey-question">
                <p>Are you okay with your roommate drinking?</p>
                <label>
                    <input
                        type='radio'
                        name='drinkPref'
                        value='yes'
                        checked={drinkPref === 'yes'}
                        onChange={() => handleDrinkPrefChange('yes')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type='radio'
                        name='drinkPref'
                        value='no'
                        checked={drinkPref === 'no'}
                        onChange={() => handleDrinkPrefChange('no')}
                    />
                    No
                </label>
            </div>

            <div className="survey-question">
                <p>Would you prefer your roommate to have a similar bedtime as you?</p>
                <label>
                    <input
                        type='radio'
                        name='bedPref'
                        value='similar'
                        checked={bedPref === 'similar'}
                        onChange={() => handleBedPrefChange('similar')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type='radio'
                        name='bedPref'
                        value='okay'
                        checked={bedPref === 'okay'}
                        onChange={() => handleBedPrefChange('okay')}
                    />
                    Not particularly
                </label>
            </div>

            <div className="survey-question">
                <p>Would you prefer your roommate to have a similar level of loudness as you?</p>
                <label>
                    <input
                        type='radio'
                        name='quietPref'
                        value='similar'
                        checked={quietPref === 'similar'}
                        onChange={() => handleQuietPrefChange('similar')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type='radio'
                        name='quietPref'
                        value='okay'
                        checked={quietPref === 'okay'}
                        onChange={() => handleQuietPrefChange('okay')}
                    />
                    Not particularly
                </label>
            </div>

            <div className="survey-question">
                <p>Would you prefer your roommate to have a similar level of cleanliness as you?</p>
                <label>
                    <input
                        type='radio'
                        name='cleanPref'
                        value='similar'
                        checked={cleanPref === 'similar'}
                        onChange={() => handleCleanPrefChange('similar')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type='radio'
                        name='cleanPref'
                        value='okay'
                        checked={cleanPref === 'okay'}
                        onChange={() => handleCleanPrefChange('okay')}
                    />
                    Not particularly
                </label>
            </div>

            <button onClick={handleSubmit}>Submit the Survey!</button>
        </div>
    );
}

export default Survey;
