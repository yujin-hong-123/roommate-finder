import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom'
import "./ChatList.css"
import Header from "./Header"
import profilepic from './ProfilePic.png';
import bear from './assets/bear.png';
import cat from './assets/cat.png';
import dog from './assets/dog.png';
import duck from './assets/duck.png';
import panda from './assets/panda.png';
import rabbit from './assets/rabbit.png'
import { socket } from './sockets/ReactSocket';

const Chatlist = props => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      const response = await axios.get('http://64.23.166.166:3001/chatlist', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const chatsData = response.data; //response is an array of JSON objects
      console.log('Fetching chats data...');
      console.log('response is ...', response);
      console.log('chatsData is ...', chatsData);
      setChats(chatsData);
    } catch (error) {
      console.error('Error fetching profile data :(:', error);
      setError('Error fetching profile data: ' + error.message);
    }
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

  const handleProfileClick = async (username) => {
    console.log("right before navigate")
    navigate(`/chatpage/${username}`);
  };

  const avatarMap = {
    'bear': bear,
    'cat': cat,
    'dog': dog,
    'duck': duck,
    'panda': panda,
    'rabbit': rabbit,
    '': profilepic
  };

  return (
    <div className="ChatList">
      <Header />
      {Array.isArray(chats) && chats.map((user, index) => (
        <button key={index} onClick={() => handleProfileClick(user.username)} className="rowbutton">
          <img src={avatarMap[user.profile.picture]} className="profilepic_chat" alt="profilepic" />
          <ul className="chatentry">
            <li className="username_chat">{user.profile.name}</li>

          </ul>
        </button>
      ))}
    </div>
  );
}

export default Chatlist;