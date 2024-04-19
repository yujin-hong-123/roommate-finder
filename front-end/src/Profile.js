import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'; // Import useLocation
import Header from './Header';
import Button from './Button';
import profilePicture from './ProfilePic.png';
import "./Profile.css";

function Profile() {
    const [profileData, setProfileData] = useState({});
    const [error, setError] = useState('');
    const location = useLocation(); // Get the location object

    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            // Fetching logic
            console.log('Fetching profile data');
            setProfileData(response.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
            setError('Error fetching profile data: ' + error.message);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [location.state]); // Depend on location.state to refetch when it indicates an update

    if (Object.keys(profileData).length === 0) {
        return (
            <>
                <Header />
                <p>Loading...</p>
            </>
        )
    }


    if (error) {
        return <p>{error}</p>
    }

    // Render user information or placeholders
    return (
        <>
            <Header />
            <div className="Heading">
                {/* <Button text="Edit Profile" location="/editprofile" /> */}
                {/* <Button text="Retake Survey" location="/survey" /> */}
            </div>
            <div className="Profile">
                <img src={profileData.imagePath || profilePicture} alt="Profile" />
                <h2>{profileData.username || 'Username'}</h2>
            </div>
            <div className="About">
                <p className="AboutText">{profileData.bio || 'No bio available.'}</p>
            </div>
            <div className="Footer">
                {/* <Button text="Preferences" location="/mypreferences" /> */}
                <Button text="Edit Profile" location="/editprofile" />
                <Button text="Logout" location="/login" onClick={() => localStorage.clear()} />
            </div>
        </>
    );
}

export default Profile;

