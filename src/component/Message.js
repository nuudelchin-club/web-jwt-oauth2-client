import React, { useEffect, useState, useRef } from 'react';
import './Message.css';

const apiUrl = process.env.REACT_APP_API_URL;

function Message({messagers}) {

  return (
    <div className='content'>
      <div>{messagers.senderId}</div>
      <div>{messagers.recipientId}</div>
    </div>
  );
}

export default Message;
