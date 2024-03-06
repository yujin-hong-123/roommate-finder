import { Link } from 'react-router-dom'
import Button from "./Button"
import Header from "./Header"

function Matches() {
    return (
      <div className="Matches">
        <Header />
        <Button text="Someone else's profile"></Button>
        <Button text="Someone else's profile"></Button>
      </div>
    );
  }

export default Matches