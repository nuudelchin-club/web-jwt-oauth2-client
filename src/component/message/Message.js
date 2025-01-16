import React, { useEffect, useState, useRef } from 'react';
import './Message.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const apiUrl = process.env.REACT_APP_API_URL;

function Message({messagers}) {

  const stompClient = useRef(null);
  const [userData, setUserData] = useState({});  
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const senderId = messagers.senderId;
    const recipientId = messagers.recipientId;
    if(senderId && recipientId) {
      findUserByUsername(recipientId);
      getMessageList(senderId, recipientId)
      connectWS();
    }
    return () => {
      if (stompClient.current) {
        console.log("Deactivating stompClient...");
        try {
          stompClient.current.deactivate();
        } catch (error) {
          console.error("Error deactivating stompClient:", error);
        }
      }
    };    
  }, []);

  const findUserByUsername = (username) => {console.log("findUserByUsername")
    fetch(`${apiUrl}/user/findByUsername`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: username,
      credentials: "include",
    })
    .then((response) => { 
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json(); 
    })
    .then((data) => { 
      setUserData(data);
    })
    .catch((error) => { console.error('Error:', error); })
  };

  const getMessageList = async (senderId, recipientId) => {console.log("getMessageList();")
    const payload = {
      senderId: senderId,
      recipientId: recipientId
    };
    fetch(`${apiUrl}/message/get`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: "include",
    })
    .then((response) => { 
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json(); 
    })
    .then((data) => {
      setMessageList([...messageList, ...data]);
    })
    .catch((error) => { console.error('Error:', error); })
  };

  const connectWS = async () => {console.log("connectWS")
    const socket = new SockJS(`${apiUrl}/ws`);
    stompClient.current = Stomp.over(socket);
    stompClient.current.debug = (message) => {
      //console.log(message);
    };
    stompClient.current.connect({}, () => {
      console.log('Connected to WebSocket');  
      stompClient.current.subscribe(`/user/${messagers.senderId}/queue/messages`, (message) => {
        setMessageList((messageList) => [...messageList, JSON.parse(message.body)]);
      });
    });
    stompClient.current.activate();
  };

  const sendMessage = (content) => {
    if (stompClient) {
      const payload = {
        senderId: messagers.senderId,
        recipientId: messagers.recipientId,
        content: content,
      };
      stompClient.current.send("/app/send", {}, JSON.stringify(payload));
      setMessageList([...messageList, { senderId: "you", content: content }]);
    }  
  };

  return (
    <div className='main-content'>
      <div className='message-panel'>
        <Header userData={userData} />
        <Content userData={userData} messageList={messageList} />       
        <Footer sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Message;
