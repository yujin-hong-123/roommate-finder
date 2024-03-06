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

  const handleSubmit = () => {
    // Handle submission logic here later...
    navigate('/matches');
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
            />
          </label>
        </div>


      </div>

      <button onClick={handleSubmit}>Submit the Survey!</button>
    </div>
  );
}

export default Survey;
