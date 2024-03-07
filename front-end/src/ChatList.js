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
        <button onClick={() => navigate('/chatpage')} className="rowbutton">
          <img src={profilepic} className="profilepic_chat" alt="profilepic" />
          <ul className="chatentry">
            <li className="username_chat">Name1</li>
            <li className="lastchat">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
        <button onClick={() => navigate('/chatpage')} className="rowbutton">
          <img src={profilepic} className="profilepic_chat" alt="profilepic" />
          <ul className="chatentry">
            <li className="username_chat">Name2</li>
            <li className="lastchat">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
        <button onClick={() => navigate('/chatpage')} className="rowbutton">
          <img src={profilepic} className="profilepic_chat" alt="profilepic" />
          <ul className="chatentry">
            <li className="username_chat">Name3</li>
            <li className="lastchat">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
        <button onClick={() => navigate('/chatpage')} className="rowbutton">
          <img src={profilepic} className="profilepic_chat" alt="profilepic" />
          <ul className="chatentry">
            <li className="username_chat">Name4</li>
            <li className="lastchat">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
        <button onClick={() => navigate('/chatpage')} className="rowbutton">
          <img src={profilepic} className="profilepic_chat" alt="profilepic" />
          <ul className="chatentry">
            <li className="username_chat">Name5</li>
            <li className="lastchat">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
        <button onClick={() => navigate('/chatpage')} className="rowbutton">
          <img src={profilepic} className="profilepic_chat" alt="profilepic" />
          <ul className="chatentry">
            <li className="username_chat">Name6</li>
            <li className="lastchat">Lorem ipsum dolor sit amet, consectetur adipiscing elit..</li>
          </ul>
        </button>
      </div>
    );
  }

export default ChatList