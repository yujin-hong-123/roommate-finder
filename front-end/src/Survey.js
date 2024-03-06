import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Survey.css";
import Header from "./Header";

function Survey() {
    const navigate = useNavigate();
    const [petsPreference, setPetsPreference] = useState(null);
    const [guestPreference, setGuestPreference] = useState(null);
    const [minRent, setMinRent] = useState(300);
    const [maxRent, setMaxRent] = useState(10000);
    const [desiredRoommates, setDesiredRoommates] = useState(1);
    const [bedtime, setBedtime] = useState('11pm');

    const handlePetsChange = (value) => {
        setPetsPreference(value);
    };

    const handleGuestChange = (value) => {
        setGuestPreference(value);
    };

    const handleMinRentChange = (event) => {
        setMinRent(parseInt(event.target.value, 10));
    };

    const handleMaxRentChange = (event) => {
        setMaxRent(parseInt(event.target.value, 10));
    };

    const handleDesiredRoommatesChange = (event) => {
        setDesiredRoommates(parseInt(event.target.value, 10));
    };

    const handleSubmit = () => {
        // Handle submission logic here later...
        navigate('/matches');
    };

    const handleBedtimeChange = (event) => {
        setBedtime(event.target.value);
    };


    return (
        <div className="Survey">
            <Header />
            <div className="survey-question">
                <p>Are you okay with pets?</p>
                <label>
                    <input
                        type="radio"
                        name="petsPreference"
                        value="yes"
                        checked={petsPreference === 'yes'}
                        onChange={() => handlePetsChange('yes')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="petsPreference"
                        value="no"
                        checked={petsPreference === 'no'}
                        onChange={() => handlePetsChange('no')}
                    />
                    No
                </label>
            </div>
            <div className="survey-question">
                <p>Are you open to guests?</p>
                <label>
                    <input
                        type="radio"
                        name="guestPreference"
                        value="yes"
                        checked={guestPreference === 'yes'}
                        onChange={() => handleGuestChange('yes')}
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="guestPreference"
                        value="no"
                        checked={guestPreference === 'no'}
                        onChange={() => handleGuestChange('no')}
                    />
                    No
                </label>
            </div>
            <div className="survey-question">
                <p>Specify your desired rent per roommate:</p>
                <div className="rent-inputs">
                    <label>
                        Minimum Rent Share:
                        <input
                            type="number"
                            min="300"
                            max="10000"
                            step="100"
                            value={minRent}
                            onChange={handleMinRentChange}
                            inputMode="numeric"
                        />
                    </label><br />
                    <label>
                        Maximum Rent Share:
                        <input
                            type="number"
                            min="300"
                            max="10000"
                            step="100"
                            value={maxRent}
                            onChange={handleMaxRentChange}
                            inputMode="numeric"
                        />
                    </label>
                </div>
            </div>
            <div className="survey-question">
                <p>Desired number of roommates (excluding yourself):</p>
                <select value={desiredRoommates} onChange={handleDesiredRoommatesChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4 or more</option>
                </select>
            </div>
            <div className="survey-question">
                <p>When is your usual bedtime?</p>
                <select value={bedtime} onChange={handleBedtimeChange}>
                    <option value="8pm">8pm</option>
                    <option value="9pm">9pm</option>
                    <option value="10pm">10pm</option>
                    <option value="11pm">11pm</option>
                    <option value="12am">12am</option>
                    <option value="1am">1am</option>
                    <option value="2am">2am</option>
                    <option value="3am">3am</option>
                </select>
            </div>

            <button onClick={handleSubmit}>Submit the Survey!</button>
        </div>
    );
}

export default Survey;
