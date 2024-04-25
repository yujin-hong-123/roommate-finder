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

  const [user, setUser] = useState('')
  const [chats, setChats] = useState([]);
  const [old_messages, setOldMessages] = useState([]); // New state for storing old messages

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

    console.log("Fetching chat history...")
    //request chat history between yourself and target user (otherperson_username) that you just clicked on
    axios.get(`http://localhost:3001/chatpage/${otherperson_username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => {
        //console.log('response is ...', response);
        //console.log('Received chat data with other user ...', response.data);

        //save old messages to the state variable old_messages
        setOldMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      })
  }, []);

  //listen for chat_message event from the socket
  useEffect(() => {
    socket.on('chat_message', (senderMsg) => {
      setChats(senderMsg);
    })
  });

  //This hook is so you can view the old_messages array once it is populated
  useEffect(() => {
    console.log("Old messages array updated:", old_messages);
  }, [old_messages]);

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
      recipient: otherperson_username, //CHANGE THIS LATER TO ACTUAL RECIPIENT!!!
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
      {/* Render old messages (LEENA YOU CAN MODIFY/DELETE THIS, ONLY FOR TESTING PURPOSES)*/}
      {old_messages.map((message, index) => {
        //for parsing the timestamp
        const timestamp = new Date(message.timestamp);
        //format timestamp for month, day, hour, and minute
        const formattedTimestamp = `${(timestamp.getMonth() + 1)}/${timestamp.getDate()} ${timestamp.getHours()}:${(timestamp.getMinutes() < 10 ? '0' : '') + timestamp.getMinutes()}`;

        //combine everything
        const displayMessage = `[<strong>${message.sender}</strong>] [${formattedTimestamp}] ${message.messagetext}`;

        return (
          <div key={index}>
            <p dangerouslySetInnerHTML={{ __html: displayMessage }}></p>
          </div>
        );
      })}
      <ChatExchange />

      <InputTxt sendMessage={sendMessage} />
    </div>
  );
}

export default ChatPage;