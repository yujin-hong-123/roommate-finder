import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import "./ChatList.css"
import Header from "./Header"
import profilepic from './ProfilePic.png';

function ChatList() {
  const navigate = useNavigate();

    return (
      <div className="ChatList">
        <Header />
        <button onClick={() => navigate('/chatpage')} className="wowbutton">
          <img src={profilepic} className="profilepic" alt="logo" />
          <p>Their Name</p>
          Enter Chat
        </button>
      </div>
    );
  }

export default ChatList