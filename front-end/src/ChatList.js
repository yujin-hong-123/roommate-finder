import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import "./ChatList.css"
import Button from "./Button"
import Header from "./Header"

function ChatList() {
  const navigate = useNavigate();

    return (
      <div className="ChatList">
        <Header />
        <button onClick={() => navigate('/matches')} className="button">
          Enter Chat
        </button>
      </div>
    );
  }

export default ChatList