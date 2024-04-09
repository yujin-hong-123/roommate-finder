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

  const [chats, setChats] = useState([]);

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

  //listen for chat_message event from the socket
  useEffect( () => {
    socket.on('chat_message', (senderMsg) => {
      setChats(senderMsg);
    })
  });

  //sends the message to the backend
  function sendToSocket(msg) {
    socket.emit('chat_message', msg);
  }

  //called everytime message is sent/received
  function sendMessage(msg) {
    const newMsg = {...msg};
    setChats([...chats, newMsg]);
    sendToSocket([...chats, newMsg]);
  }

  //displays the chat messages to the user
  //this will ultimately need to be updated when we get login working
  function ChatExchange() {
    return chats.map((chat, index) => {
      return <ChatBoxSender message={chat.message}/>
    });
  }

  useEffect(() => {
    axios.get('http://localhost:3001/chatpage')
      .then(response => {
        setMessages2(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);
  
  return (
    <div>
      <Header />
      <ChatExchange />
      <InputTxt sendMessage={sendMessage}/>
    </div>
  );

  /*
  return (
    <div>
      <ConnectionState isConnected={socketConnected}/>
      <Header />
      {messagesarray.map((msg, index) => (
        <div key={index}>
          <p><strong>{msg.sender} [{msg.timestamp}]:</strong> {msg.messagetext}</p>
        </div>
      ))}
      <form onSubmit={onSubmit}>
            <input onChange={ e => setValue(e.target.value)} />
            <button type='submit' disabled={isLoading}> Submit </button>
        </form>
    </div>
  );
  */
}

export default ChatPage;