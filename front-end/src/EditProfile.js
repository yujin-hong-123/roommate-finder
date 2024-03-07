import Button from "./Button";
import "./EditProfile.css"

function EditProfile(){
    return (
    <>
    <div className="EditHeader">
        <h1>Edit Profile</h1>
    </div>
    <div className="UpdateFields">
       <h2>Update Username</h2>
       <h2>Update Profile Picture</h2>
       <h2>Update Bio</h2>
       <h2>Update Password</h2>
       <h3>Old Password</h3>
       <h3>New Password</h3>
    </div>
    <div className="UpdateProfile">
        <Button text="Update" location="/profile"></Button>
    </div>
    </>);
}

export default EditProfile