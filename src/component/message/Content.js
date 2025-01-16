import React, { useEffect, useState , useRef } from 'react';
import './Content.css';

function Content({userData, messageList}) {

  const messageContentRef = useRef(null);

  useEffect(() => {
    if (messageContentRef.current) {
      messageContentRef.current.scrollTop = messageContentRef.current.scrollHeight;
    }
  }, [messageList]);

  const html = messageList.map((message, index) => (
    <div key={index} className="">
      {
        message.senderId == userData.username   // them
        ?
        <div className="message-wrap message-them">
          <div className="user-picture">
          {
            userData.picture ?
            <img src={userData.picture} alt="" />
            :
            <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" />
          } 
          </div>            
          <div className="message-box">
            <span className="">{message.content}</span>
          </div>        
        </div>
        :
        <div className="message-wrap message-you">
          <div className="message-box">
            <span className="">{message.content}</span>
          </div>
        </div>
      }      
    </div>
  ));

  return (
    <div className='message-content' ref={messageContentRef} >
      {html}
    </div>
  );
}

export default Content;
