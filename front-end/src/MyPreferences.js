import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import "./Survey.css";
import Header from "./Header";

function MyPreferences() {
    const navigate = useNavigate();


    const handleSubmit = () => {
        // Handle submission logic here later...
        navigate('/profile');
    };


    return (




        <button onClick={handleSubmit}>Back to my Profile</button>

    );
}

export default MyPreferences;
