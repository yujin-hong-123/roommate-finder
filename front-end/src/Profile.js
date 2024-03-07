import "./Profile.css"
import Button from "./Button"
import Header from "./Header"
import LoginForm from "./LoginForm";
import profilePicture from "./ProfilePic.png"

function Profile() {
    return (
        <>
            <Header />
            <div className="Heading">
                <Button text="Edit Profile" location='/editprofile'></Button>
                <Button text="Retake Survey" location="/survey"></Button>
            </div>
            <div className="Profile">
                <img src={profilePicture}></img>
                <h2>Username</h2>
            </div>
            <div className="About">
                <p className="AboutText">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Etiam consequat ante vel vehicula vulputate. Aliquam maximus turpis ut
                    porttitor imperdiet. Cras elementum orci id neque tincidunt finibus.
                    Proin accumsan suscipit elit, at varius eros scelerisque id.
                    Suspendisse maximus ultricies orci, ac convallis mauris accumsan non.
                    Nullam vel lectus eget urna pulvinar sodales vitae nec neque.
                    Maecenas ut erat eget turpis ultricies suscipit.
                </p>
            </div>
            <div className="Footer">
                <Button text="Preferences" location="/mypreferences"></Button>
                <Button text="Logout" location="/login"></Button>
            </div>
        </>
    );
}

export default Profile