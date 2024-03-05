import "./Profile.css"
import Button from "./Button"

function Profile() {
    return (
        <>
        <div className="Heading">
            <Button text="Edit Profile" location="/EditProfile"></Button>
            <Button text="Retake Survey" location="/Survey"></Button>
        </div>
        <div className="Profile">
            
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
            <Button text="Preferences" location="/Preferences"></Button>
            <Button text="Logout" location="/Login"></Button>
        </div>
        </>
    );
  }

export default Profile