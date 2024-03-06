import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import "./Survey.css";
import Header from "./Header";

function MyPreferences() {
    const navigate = useNavigate();

    // IMPORTANT: THIS IS JUST A PLACEHOLDER FOR STUFF WE WILL HANDLE IN BACKEND
    const [preferences] = useState({
        petsPreference: 'No',
        guestPreference: 'Yes',
        minRent: 500,
        maxRent: 1500,
        desiredRoommates: 2,
        bedtime: '3am',
    });


    const handleSubmit = () => {
        // Handle submission logic here later...
        navigate('/profile');
    };


    return (
        <div>
            <Header />
            <h2>My Preferences</h2>

            {/* Displaying preferences */}
            <p>Are you okay with pets? {preferences.petsPreference}</p>
            <p>Open to guests? {preferences.guestPreference}</p>
            <p>Minimum Rent Share: ${preferences.minRent}</p>
            <p>Maximum Rent Share: ${preferences.maxRent}</p>
            <p>Desired number of roommates (excluding yourself): {preferences.desiredRoommates}</p>
            <p>Usual bedtime: {preferences.bedtime}</p>

            <button onClick={handleSubmit}>Back to My Profile</button>
        </div>

    );
}

export default MyPreferences;
