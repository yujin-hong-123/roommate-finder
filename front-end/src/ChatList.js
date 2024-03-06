import { Link } from 'react-router-dom'
import "./ChatList.css"
import Button from "./Button"
import Header from "./Header"

function ChatList() {
    return (
      <div className="ChatList">
        <Header />
        <Button text="Enter Chat"></Button>
        <Button text="Enter Chat"></Button>
      </div>
    );
  }

export default ChatList