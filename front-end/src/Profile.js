import LoginForm from "./LoginForm";
import "./Profile.css"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Button from './Button';
import profilePicture from './ProfilePic.png';

function Profile() {
    const [profileData, setProfileData] = useState([]);
    const [error, setError] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/profile');
                setProfileData(response.data);
            } catch (error) {
                setError('Error fetching profile data: ' + error.message);
            } finally {
                setLoaded(true);
            }
        };

        fetchProfileData();

        return () => {
        };
    }, []);

    return (
        <>
            <Header />
            <div className="Heading">
                <Button text="Edit Profile" location="/editprofile" />
                <Button text="Retake Survey" location="/survey" />
            </div>
            <div className="Profile">
                <img src={profilePicture} alt="Profile" />
                <h2>{profileData.name}</h2>
            </div>
            <div className="About">
                <p className="AboutText">{profileData.bio}</p>
            </div>
            <div className="Footer">
                <Button text="Preferences" location="/mypreferences" />
                <Button text="Logout" location="/login" />
            </div>
        </>
    );
}

export default Profile;