import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {io} from 'socket.io-client'
import './ChatPage.css';

function ChatPage() {
  useEffect(() => {
    const socket = io('http://localhost:3000')

    socket.on('connnect', ()=>console.log(socket.id));
    socket.on('connect_error', () => {
      console.log("Failed to connect, trying again...");
      setTimeout(()=>socket.connect(), 50000);
    });

    socket.on('disconnect', ()=>console.log("disconnected"));
  }, [])

  const [message, setMessage] = useState('');
  
  // This will handle the sending of the message
  const sendMessage = (e) => {
    e.preventDefault();
    console.log('Message sent:', message);
    setMessage('');
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <Link to="/chatlist" className="back-button">Back</Link>
        <h1 className="chat-name">Name1</h1>
      </header>
      <ul className="chat-messages">
        {/* Mock messages */}
        <li className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</li>
        <li className="message">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</li>
        {/* Add more messages as needed */}
      </ul>
      <form className="message-form" onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Input message here"
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;