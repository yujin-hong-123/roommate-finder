import React, { useState } from 'react';
import axios from "axios";
import Button from "./Button";
import { useNavigate } from 'react-router-dom';
import "./EditProfile.css"
import Header from './Header';

function EditProfile() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleUpdate = () => {
        console.log("Sending update to database")
        const profileData = {
            new_password: newPassword,
            new_username: userName,
            old_password: oldPassword,
            new_bio: bio,
        };

        axios
            .post('http://localhost:3001/editprofile', profileData)
            .then(response => {
                navigate('/profile');
            })
            .catch(error => {

                if (error.response && error.response.data && error.response.data.error) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage("ERROR: The old password you provided may be incorrect.");
                }
            });
    };

    return (
        <>
            <Header />
            <div className="EditHeader">
                <h1>Edit Profile</h1>
            </div>
            <div className="UpdateFields">
                {errorMessage && <div className="error" style={{ fontSize: '1.5rem', color: 'red', fontWeight: 'bold' }}>{errorMessage}</div>}
                <h3 className="UpdateHeader">Update Profile Picture</h3>
                <label>
                    <input type="image"></input>
                </label>
                <h3 className="UpdateHeader">Update Username</h3>
                <label>
                    <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                </label>
                <h3 className="UpdateHeader">Update Bio</h3>
                <label>
                    <textarea rows={7} cols={45} value={bio} onChange={e => setBio(e.target.value)} />
                </label>
                <h3 className="UpdateHeader">Old Password (for now assume the current users old password is "password7" to get a valid response)</h3>

                <label>
                    <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                </label>
                <h3 className="UpdateHeader">New Password</h3>
                <label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </label>
                <div>

                </div>
                <button onClick={handleUpdate}>Update</button>
            </div>

        </>
    );
}

export default EditProfile;