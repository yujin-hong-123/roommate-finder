import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import "./EditProfile.css";

function EditProfile() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleUpdate = async () => {
        const profileData = {
            new_password: newPassword,
            old_password: oldPassword,
            bio: bio,
            username: userName,
        };

        console.log("Updating profile with data:", profileData);

        try {
            const response = await axios.post('http://152.42.152.196:3001/editprofile', profileData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` // Include the JWT token in the request
                }
            });
            console.log("Update response:", response.data);
            if (response.status === 200) {
                console.log("Profile updated successfully");
                navigate('/profile', { state: { updated: true } }); // Pass state to trigger re-fetch
            }
        } catch (error) {
            console.error("Update error:", error);
            const message = error.response?.data?.message || "An error occurred while updating the profile.";
            setErrorMessage(message);
        }
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
                <h3 className="UpdateHeader">Old Password (if changing password)</h3>
                <label>
                    <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                </label>
                <h3 className="UpdateHeader">New Password</h3>
                <label>
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </label>
                <button onClick={handleUpdate}>Update</button>
            </div>
        </>
    );
}

export default EditProfile;
