import React, { useEffect, useState, useRef } from 'react';
import './Message.css';

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const apiUrl = process.env.REACT_APP_API_URL;

function Message({messagers}) {

  const [recipient, setRecipient] = useState({});
  const stompClient = useRef(null);
  const inputRef = useRef(null);
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
      setRecipient(data);console.log(data)
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
    .then((data) => {console.log(data)
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

  const handleSend = (e) => {
    e.preventDefault();

    const value = inputRef.current.value;
    if (value.trim()) {
      sendMessage(messagers.senderId, messagers.recipientId, value)
      inputRef.current.value = ""; 
    } 
  };

  const sendMessage = (senderId, recipientId, content) => {
    if (stompClient) {
      const payload = {
        senderId: senderId,
        recipientId: recipientId,
        content: content,
      };
      stompClient.current.send("/app/send", {}, JSON.stringify(payload));
      setMessageList([...messageList, { senderId: "you", content: content }]);
    }  
  };

  const messageHtml = messageList.map((message, index) => (
    <div key={index} className="message">
      <div className="message-header">
        {
          message.senderId == recipient.username 
          &&
          <div className="user-icon">
            {
              recipient.picture ?
              <img src={recipient.picture} alt="" />
              :
              <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" />
            }            
          </div>
        }        
        <div>
          <span className="">{message.content}</span>
        </div>        
      </div>
    </div>
  ));

  return (
    <div className='content'>
      <div className="message">
        <div className="message-header">
          <div className="user-icon">
            {
              recipient.picture ?
              <img src={recipient.picture} alt="" />
              :
              <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" />
            }            
          </div>            
          <div className="user-details">
            <span className="user-name">{recipient.fullname}</span>
          </div>
        </div>
        <div className="message-content" id="messageContainer">
          {messageHtml}
        </div>
        <div className="message-footer">
          <input type="text" ref={inputRef} placeholder="Type your message..."/>
          <button onClick={(event) => { handleSend(event); } }>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
