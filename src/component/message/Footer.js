import React, { useEffect, useState, useRef } from 'react';
import './Footer.css';

function Footer({}) {
  
  const inputRef = useRef(null);

  const handleSend = (e) => {
    e.preventDefault();

    const value = inputRef.current.value;
    if (value.trim()) {
      
    } 
  };

  return (
    <div className='message-footer'>
      <input type="text" ref={inputRef} placeholder="Type your message..."/>
      <button onClick={(event) => { handleSend(event); } }>
        Send
      </button>
    </div>
  );
}

export default Footer;
