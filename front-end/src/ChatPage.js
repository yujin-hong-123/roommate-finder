import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client'
import './ChatPage.css';
import axios from 'axios'
import Header from "./Header";

function ChatPage() {
  const [messagesarray, setMessages2] = useState([]);
  useEffect(() => {
    const socket = io('http://localhost:3002')

    socket.on('connnect', () => console.log("Connected"));

    socket.on('connect_error', () => {
      console.log("Failed to connect, trying again...");
      setTimeout(() => socket.connect(), 50000);
    });

    socket.on('disconnect', () => console.log("Disconnecting"));
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3001/chatpage')
      .then(response => {
        setMessages2(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  const [message, setMessage] = useState('');

  // This will handle the sending of the message
  const sendMessage = (e) => {
    e.preventDefault();
    console.log('Message sent:', message);
    setMessage('');
  };

  return (
    <div>
      <Header />
      {messagesarray.map((msg, index) => (
        <div key={index}>
          <p><strong>{msg.sender} [{msg.timestamp}]:</strong> {msg.messagetext}</p>
        </div>
      ))}
      <form onSubmit={sendMessage}>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;