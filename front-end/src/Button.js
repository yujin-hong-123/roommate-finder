import "./Button.css"
import { Link} from "react-router-dom";

function Button({text, location}){
    return (
    <div>
        <button className="profileButton">
            <Link to={location} className="profileLinks">
                <h3 className="ButtonText">{text}</h3>
            </Link>
        </button>
    </div>);
}

export default Button