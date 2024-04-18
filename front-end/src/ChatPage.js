import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ChatPage.css';
import axios from 'axios'
import Header from "./Header";
import { socket } from './sockets/ReactSocket';
import { ConnectionState } from './sockets/ConnectionState';
import { ChatBoxSender, ChatBoxReceiver } from './sockets/ChatBox';
import InputTxt from './sockets/InputTxt';

function ChatPage() {
  const [messagesarray, setMessages2] = useState([]);
  const [socketConnected, setIsConnected] = useState(socket.connected);

  const [user, setUser] = useState('')
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
  useEffect(() => {
    socket.on('chat_message', (senderMsg) => {
      setChats(senderMsg);
    })
  });

  //sends the message to the backend
  function sendToSocket(msg) {
    socket.emit('chat_message', msg);
  }

  const getUser = async() => {
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
    //get the current time here
    const newMsg = { ...msg, user}; //this will eventually also have info about the user that send the message
    console.log(`Sending message as ${user}`); //this is how you extract the message out of newMsg
    setChats([...chats, newMsg]);
    sendToSocket([...chats, newMsg]);

    let messagestring = newMsg.message;
    const currentTime = new Date().toISOString(); //This should be formatted eventually (go see what it looks like in the database messages collection)
    const msg_post = {
      sender: "current_user_test", //CHNAGE THIS LATER TO ACTUAL CURRENT USERNAME!!!!
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
  //this will ultimately need to be updated when we get login working
  function ChatExchange() {
    return chats.map((chat, index) => {
      if(chat.user === user) return <ChatBoxSender key={index} message={chat.message} user={chat.user} />
      return <ChatBoxReceiver key={index} message={chat.message} user={chat.user} />
    });
  }

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

  return (
    <div>
      <Header />
      <ChatExchange />
      <InputTxt sendMessage={sendMessage} />
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