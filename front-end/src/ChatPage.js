import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ChatPage.css';
import axios from 'axios'
import Header from "./Header";
import { socket } from './sockets/ReactSocket';
import { ChatBoxSender, ChatBoxReceiver } from './sockets/ChatBox';
import InputTxt from './sockets/InputTxt';
import { useLocation } from 'react-router-dom';

function ChatPage() {
  const location = useLocation(); //for extracting username
  const otherperson_username = location.pathname.split('/').pop(); //for extracting username
  const [messagesarray, setMessages2] = useState([]);

  const [user, setUser] = useState('')
  const [chats, setChats] = useState([]);

  useEffect(() => {
    function onConnect() {
      //setIsConnected(true);
    }

    function onDisconnect() {
      //setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    }
  }, []);

  useEffect(() => {

    getUser();


    axios.get('http://localhost:3001/chatpage')
      .then(response => {
        setMessages2(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, []);

  //listen for chat_message event from the socket
  useEffect(() => {
    socket.on('chat_message', (senderMsg) => {
      setChats(senderMsg);
    })
  });

  //sends the message to the backend
  function sendToSocket(msg) {
    socket.emit('chat_message', msg);
  }

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/chatUser', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Fetching logic
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  //called everytime message is sent/received
  //the post request to the backend with the new message should probably go here
  function sendMessage(msg) {
    const msgTime = new Date().toLocaleTimeString();
    const newMsg = { ...msg, user, msgTime };
    console.log(`Sending message as ${user}`);
    setChats([...chats, newMsg]);
    sendToSocket([...chats, newMsg]);

    let messagestring = newMsg.message;
    const currentTime = new Date().toISOString(); //This should be formatted eventually (go see what it looks like in the database messages collection)
    const msg_post = {
      sender: newMsg.user, //CHNAGE THIS LATER TO ACTUAL CURRENT USERNAME!!!!
      recipient: "recipient_test", //CHANGE THIS LATER TO ACTUAL RECIPIENT!!!
      timestamp: currentTime,
      messagetext: messagestring
    };

    //Send the message to the backend
    axios.post('http://localhost:3001/chatpage2', msg_post)
      .then(response => {
        console.log('Message sent successfully:', response.data);
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });

    console.log("sent post request for the message :)");
  }

  //displays the chat messages to the user
  function ChatExchange() {
    return chats.map((chat, index) => {
      if (chat.user === user) return <ChatBoxSender key={index} message={chat.message} user={chat.user} time={chat.msgTime} />
      return <ChatBoxReceiver key={index} message={chat.message} user={chat.user} time={chat.msgTime} />
    });
  }

  return (
    <div>
      <Header />
      <h3>Your conversation with {otherperson_username}</h3>
      <ChatExchange />
      <InputTxt sendMessage={sendMessage} />
    </div>
  );
}

export default ChatPage;