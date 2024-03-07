import "./Button.css"
import {useNavigate} from "react-router-dom";

function Button({text, location}){

    const navigate = useNavigate();

    return (
    <div>
        <button className="profileButton" onClick={() => navigate(location)}>
            <h3 className="ButtonText">{text}</h3>
        </button>
    </div>);
}

export default Button