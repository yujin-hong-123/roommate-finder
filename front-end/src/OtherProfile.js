import "./OtherProfile.css"
import Header from "./Header"
import Button from "./Button"
import profilePicture from "./ProfilePic.png"

function OtherProfile() {
    return (
        <>
        <Header />
        <div className="OtherBack"> 
            <Button text="Back to Top Matches" location="/matches"></Button>
        </div>
        <div className="OtherProfile">
            <img src={profilePicture}></img>
            <h2>Other User</h2>
        </div>
        <div className="OtherAbout">
            <p className="OtherAbtTxt">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Etiam consequat ante vel vehicula vulputate. Aliquam maximus turpis ut
                porttitor imperdiet. Cras elementum orci id neque tincidunt finibus.
                Proin accumsan suscipit elit, at varius eros scelerisque id.
                Suspendisse maximus ultricies orci, ac convallis mauris accumsan non.
                Nullam vel lectus eget urna pulvinar sodales vitae nec neque.
                Maecenas ut erat eget turpis ultricies suscipit.
            </p>
        </div>
        <div className="OtherFooter">
            <Button text="Preferences" locaion="/"></Button>
            <Button text="Message" location="/chatpage"></Button>
        </div>
        </>
    );
}

export default OtherProfile