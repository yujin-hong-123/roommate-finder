import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Button from './Button';
import profilePicture from './ProfilePic.png';
import "./Profile.css";
import { socket } from './sockets/ReactSocket';

function Profile() {
    const [profileData, setProfileData] = useState({});
    const [year, setYear] = useState('');
    const [username, setUsername] = useState(''); // Separate state for username
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/profile', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Fetching profile data', response.data);
            if (response.data && response.data.profile) {
                setProfileData(response.data.profile); // Set the profile-specific data
                setUsername(response.data.username); // Set username separately
                setYear(response.data.answers.year)
            } else {
                throw new Error('Profile data is missing');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            setError('Error fetching profile data: ' + error.message);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleLogout = () => {
        console.log("Logging out...");
        localStorage.removeItem('token');
        //socket.disconnect(); //disconnect the socket that was in use
        navigate('/login', { replace: true });
    };

    if (!profileData || Object.keys(profileData).length === 0) {
        return <p>Loading...</p>;
    }


    if (error) {
        return <p>{error}</p>
    }

    return (
        <>
            <Header />
            <div className="Profile">
                <img src={profileData.imagePath || profilePicture} alt="Profile" />
                <h2>{username || 'Username not set'}</h2>
                <h4>{year || 'Year not set'}</h4>
                <p className="AboutText">{profileData.bio || 'No bio available.'}</p>
            </div>
            <div className="Footer">
                <Button text="Edit Profile" location="/editprofile" />
                <Button text="Retake Survey" location="/retake" />
            </div>
            <br></br>
            <div className='BottomFooter'>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </>
    );
}

export default Profile;
