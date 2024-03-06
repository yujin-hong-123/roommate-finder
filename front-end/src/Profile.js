import "./Profile.css"
import Button from "./Button"
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    // Handle submission logic here later...
    navigate('/mypreferences');
  };
  return (
    <div className="Profile">
      <Button text="Edit Profile"></Button>
      <Button text="Retake Survey"></Button>
      <button onClick={handleSubmit}>Go to My Preferences (Temporary)</button>
    </div>
  );
}

export default Profile