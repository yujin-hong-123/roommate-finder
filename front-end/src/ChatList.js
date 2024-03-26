import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./ChatList.css"
import Header from "./Header"
import profilepic from './ProfilePic.png';

const Chatlist = props => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [chats, setChats] = useState([]);

  const fetchChats = () => {
    axios
      .get('http://localhost:3001/chatlist')
      .then(response => {
        const chatsData = response.data; //response is an array of JSON objects
        setChats(chatsData);
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2);
        setError(errMsg);
      })
      .finally(() => {
        setLoaded(true);
      });
  };

  useEffect(() => {

    fetchChats()

    //set timer to load every n sec
    const intervalHandle = setInterval(() => {
      fetchChats()
    }, 5000)

    //
    return e => {
      //clear timer
      clearInterval(intervalHandle)
    }
  }, [])

  return (
    <div className="ChatList">
      <Header />
      {chats.map((user, index) => (
        <button key={index} onClick={() => navigate('/chatpage')} className="rowbutton">
          <img src={profilepic} className="profilepic_chat" alt="profilepic" />
          <ul className="chatentry">
            <li className="username_chat">{user.name}</li>
            <li className="lastchat">{user.bio}</li>
          </ul>
        </button>
      ))}
    </div>
  );
}

export default Chatlist;