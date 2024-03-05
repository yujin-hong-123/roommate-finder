import "./Button.css"
import { Link } from "react-router-dom";

function Button({text, location}){
    return (
    <div>
        <Link to={location}>
            <h3 className="button">{text}</h3>
        </Link>
    </div>);
}

export default Button