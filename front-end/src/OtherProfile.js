import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Button from './Button';
import profilePicture from './ProfilePic.png';
import bear from './assets/bear.png';
import cat from './assets/cat.png';
import dog from './assets/dog.png';
import duck from './assets/duck.png';
import panda from './assets/panda.png';
import rabbit from './assets/rabbit.png'
import "./Profile.css";
import { socket } from './sockets/ReactSocket';

function OtherProfile() {
    const [profileData, setProfileData] = useState({});
    const [username, setUsername] = useState(''); // Separate state for username
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchProfileData = async () => {
        try {
            const response = await axios.get('http://{$process.env.HOST}:3001/otheruser', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Fetching profile data', response.data);
            if (response.data && response.data.profile) {
                setProfileData(response.data.profile); // Set the profile-specific data
                setUsername(response.data.username); // Set username separately
                setYear(response.data.answers.year);
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

    if (!profileData || Object.keys(profileData).length === 0) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>
    }

    const handleProfileClick = async (username) => {
        console.log("right before navigate")
        navigate(`/chatpage/${username}`);
    };

    const handleClick = async () => {
        navigate('/profile');
    }

    var avatar;
    if (profileData.picture === 'bear') {
        avatar = bear;
    }
    else if (profileData.picture === 'cat') {
        avatar = cat
    }
    else if (profileData.picture === 'dog') {
        avatar = dog
    }
    else if (profileData.picture === 'duck') {
        avatar = duck
    }
    else if (profileData.picture === 'panda') {
        avatar = panda
    }
    else if (profileData.picture === 'rabbit') {
        avatar = rabbit
    }
    else {
        avatar = profilePicture;
    }

    return (
        <>
            <Header />
            <div className="Profile">
                <img className='profilepic' src={avatar} alt="Profile" />
                <h2>{username || 'Username not set'}</h2>
                <h4>{year || 'Year not set'}</h4>
                <p className="AboutText">{profileData.bio || 'No bio available.'}</p>
            </div>
            <div className="Footer">
                <Button text="Survey Answers" location="/useranswers" />
                <button className='message-button' onClick={() => handleProfileClick(username)}>Message</button>
            </div>
        </>
    );
}

export default OtherProfile;