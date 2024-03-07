import Button from "./Button";
import { useState } from "react";
import "./EditProfile.css"

function EditProfile() {
    const [oldPasword, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [userName, setUsername] = useState("");
    const [bio, setBio] = useState("");

    const handleUsername = (event) => {
        console.log({userName});
        setUsername(event.target.value);
    }

    const handleBio = (event) => {
        setBio(event.target.value);
    }

    const handleOldPassword = (event) => {
        setPassword(event.target.value);
    }

    const handlePassword = (event) => {
        if(oldPasword == event.target.value){
            console.log("Passwords are the same");
        }
        else {
            setNewPassword(event.target.value);
        }
    }

    return (
    <>
    <div className="EditHeader">
        <h1>Edit Profile</h1>
    </div>
    <div className="UpdateFields">
       <h3 className="UpdateHeader">Update Profile Picture</h3>
        <label>
            <input type ="image"></input>
        </label>
        <h3 className="UpdateHeader">Update Username</h3>
        <label>
            <input type="text" value={userName} onChange={handleUsername}>
                
            </input>
        </label>
       <h3 className="UpdateHeader">Update Bio</h3>
        <label>
            <textarea rows={7} cols={45} value={bio} onChange={handleBio}> 
            </textarea>
        </label>
       <h3 className="UpdateHeader">Old Password</h3>
       <label>
            <input type="password" value={oldPasword} onChange={handleOldPassword}></input>
        </label>
       <h3 className="UpdateHeader">New Password</h3>
        <label>
            <input type="password" value={newPassword} onChange={handlePassword}></input>
        </label>
    </div>
    <div className="UpdateProfile">
        <Button text="Update" location="/profile"></Button>
    </div>
    </>);
}

export default EditProfile