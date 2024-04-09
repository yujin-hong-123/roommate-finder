import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ChatPage.css';
import axios from 'axios'
import Header from "./Header";
import { socket } from './sockets/ReactSocket';
import { ConnectionState } from './sockets/ConnectionState';
import {ChatBoxSender, ChatBoxReceiver} from './sockets/ChatBox';
import InputTxt from './sockets/InputTxt';

function ChatPage() {
  const [messagesarray, setMessages2] = useState([]);
  const [socketConnected, setIsConnected] = useState(socket.connected);
  
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    }
  }, [])

  useEffect( () => {
    socket.on('receive-message', (data) =>{
      console.log(data.message);
    })
  }, [socket])

  useEffect(() => {
    axios.get('http://localhost:3001/chatpage')
      .then(response => {
        setMessages2(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(5000).emit('chat_message', value, () => {
      setIsLoading(false);
    });
  }
  
  return (
    <div>
      <ConnectionState isConnected={socketConnected}/>
      <Header />
      {messagesarray.map((msg, index) => (
        <div key={index}>
          <p><strong>{msg.sender} [{msg.timestamp}]:</strong> {msg.messagetext}</p>
        </div>
      ))}
      <ChatBoxSender/>
      <ChatBoxReceiver/>
      <InputTxt sendMessage={(message)=> {console.log(message)}}/>
      <form onSubmit={onSubmit}>
            <input onChange={ e => setValue(e.target.value)} />
            <button type='submit' disabled={isLoading}> Submit </button>
        </form>
    </div>
  );
}

export default ChatPage;