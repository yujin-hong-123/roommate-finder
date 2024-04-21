import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ensure this is imported
import Header from './Header';
import Button from './Button';
import profilePicture from './ProfilePic.png';
import "./Profile.css";

function Profile() {
    const [profileData, setProfileData] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For programmatic navigation

    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Fetching profile data');
            setProfileData(response.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            setError('Error fetching profile data: ' + error.message);
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            console.log("No token found, redirecting to login...");
            navigate('/login'); // Redirect to login if no token
        } else {
            fetchProfileData();
        }
    }, []); // Added check for token existence

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem('token'); // Clear the token
        navigate('/login', { replace: true }); // Redirect to login
    };

    if (Object.keys(profileData).length === 0) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <Header />
            <div className="Heading">
                <Button text="Edit Profile" location="/editprofile" />
            </div>
            <div className="Profile">
                <img src={profileData.imagePath || profilePicture} alt="Profile" />
                <h2>{profileData.username || 'Username'}</h2>
            </div>
            <div className="About">
                <p className="AboutText">{profileData.bio || 'No bio available.'}</p>
            </div>
            <div className="Footer">
                <Button text="Edit Profile" location="/editprofile" />
                <button onClick={handleLogout} className="logout-button">Logout</button> {/* Use button for logout */}
            </div>
        </>
    );
}

export default Profile;
