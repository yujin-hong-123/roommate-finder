import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import "./EditProfile.css";
import bear from './assets/bear.png';
import cat from './assets/cat.png';
import dog from './assets/dog.png';
import duck from './assets/duck.png';
import panda from './assets/panda.png';
import rabbit from './assets/rabbit.png'

function EditProfile() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [picture, setPicture] = useState("");
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
            picture: picture
        };

        console.log("Updating profile with data:", profileData);

        try {
            const response = await axios.post('http://localhost:3001/editprofile', profileData, {
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
                <div className="ProfilePictures">
                    <label>
                        <input type='radio' name='picture' value='bear' checked={picture==='bear'} onChange={(e) => setPicture(e.target.value)}></input>
                        <img className='avatar' src={bear}/>
                    </label>
                    <label>
                        <input type='radio' name='picture' value='cat' checked={picture==='cat'} onChange={(e) => setPicture(e.target.value)}></input>
                        <img className='avatar' src={cat}/>
                    </label>
                    <label>
                        <input type='radio' name='picture' value='dog' checked={picture==='dog'} onChange={(e) => setPicture(e.target.value)}></input>
                        <img className='avatar' src={dog}/>
                    </label>
                    <label>
                        <input type='radio' name='picture' value='duck' checked={picture==='duck'} onChange={(e) => setPicture(e.target.value)}></input>
                        <img className='avatar' src={duck}/>
                    </label>
                    <label>
                        <input type='radio' name='picture' value='panda' checked={picture==='panda'} onChange={(e) => setPicture(e.target.value)}></input>
                        <img className='avatar' src={panda}/>
                    </label>
                    <label>
                        <input type='radio' name='picture' value='rabbit' checked={picture==='rabbit'} onChange={(e) => setPicture(e.target.value)}></input>
                        <img className='avatar' src={rabbit}/>
                    </label>
                </div>

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
