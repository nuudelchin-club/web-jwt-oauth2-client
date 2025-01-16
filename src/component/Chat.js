import React, { useEffect, useState, useRef } from 'react';
import './Chat.css';

const apiUrl = process.env.REACT_APP_API_URL;

function Chat({onMessage, userData}) {

  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    getChatList(userData.username);  
  }, []);

  const getChatList = async (senderId) => {console.log("getChatList();")
    fetch(`${apiUrl}/chat/get`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: senderId,
      credentials: "include",
    })
    .then((response) => { 
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json(); 
    })
    .then((data) => {
      setChatList(data);
    })
    .catch((error) => { console.error('Error:', error); })
  };

  const html = chatList.map((chat, index) => (
    <div key={index} className="">
      <div className='chat-wrap' onClick={() => onMessage(chat.recipientId) }>
        <div className="user-picture">
        {
          chat.picture ?
          <img src={chat.picture} alt="" />
          :
          <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" />
        } 
        </div>            
        <div className="user-details">
          <span className="fullname">{chat.fullname}</span>
          <span className="nickname">{chat.recipientId}</span>
        </div>
      </div>
    </div>
  ));

  return (
    <div className='main-content'>
      {html}
    </div>
  );
}

export default Chat;
