import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './ChatPage.css';
import axios from 'axios'
import Header from "./Header";
import { socket } from './sockets/ReactSocket';
import { ChatBoxSender, ChatBoxReceiver } from './sockets/ChatBox';
import InputTxt from './sockets/InputTxt';
import { useLocation } from 'react-router-dom';

function ChatPage() {
  const location = useLocation(); //for extracting receiver username
  const otherperson_username = location.pathname.split('/').pop(); //for extracting receiver username

  const [user, setUser] = useState(''); //stores the sending user
  const [chats, setChats] = useState([]); //stores ongoing messages
  const [old_messages, setOldMessages] = useState([]); // New state for storing old messages

  //const [userList, setUserList] = useState([]);
  //let selectedUser = { otherperson_username, chats: []};

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
  /*
  socket.on('users', (users) => {
    console.log(`User list: ${users}`);
  });

  socket.on('user_connected', (newUser) => {
    setUserList([...userList, newUser]);
  });
  */
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
    console.log('Listening for chat messages...');
    socket.on('chat_message', (senderMsg) => {
      console.log("Message received");
      setChats(senderMsg);
    });
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
    const otherUser = otherperson_username;
    const newMsg = { ...msg, user, msgTime, otherUser};
    //console.log(`Sending message as ${user}`);
    setChats([...chats, newMsg]);
    sendToSocket([...chats, newMsg]);

    console.log(`Other user = ${newMsg.otherUser}`);
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
      console.log(`Other user in chat: ${chat.otherUser}`);
      if (chat.user === user && chat.otherUser === otherperson_username) {
        return <ChatBoxSender key={index} message={chat.message} user={chat.user} time={chat.msgTime} />
      }
      else if(chat.otherUser === user && chat.user === otherperson_username) {
        return <ChatBoxReceiver key={index} message={chat.message} user={chat.user} time={chat.msgTime} />
      }
      else {
        return
      }
    });
  }

  return (
    <div>
      <Header />
      <h3>Your conversation with {otherperson_username}</h3>
      <div className="MessageList">
        {old_messages.map((message, index) => {
          //for parsing the timestamp
          const timestamp = new Date(message.timestamp);
          //format timestamp for month, day, hour, and minute
          const formattedTimestamp = `${(timestamp.getMonth() + 1)}/${timestamp.getDate()} ${timestamp.getHours()}:${(timestamp.getMinutes() < 10 ? '0' : '') + timestamp.getMinutes()}`;

          //displays message histroy to look like normal messages
          if (message.sender === user) {
            return <ChatBoxSender key={index} message={message.messagetext} user={message.sender} time={formattedTimestamp} />
          }else {
          return <ChatBoxReceiver key={index} message={message.messagetext} user={message.sender} time={formattedTimestamp} />
          }
        })}
        <ChatExchange />
      </div>
      <InputTxt sendMessage={sendMessage} />
    </div>
  );
}

export default ChatPage;