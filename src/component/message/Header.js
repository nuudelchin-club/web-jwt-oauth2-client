import React, { useEffect, useState } from 'react';
import './Header.css';

function Header({userData}) {

  return (
    <div className='message-header'>
      <div className="user-picture">
      {
        userData.picture ?
        <img src={userData.picture} alt="" />
        :
        <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" />
      } 
      </div>            
      <div className="user-details">
        <span className="fullname">{userData.fullname}</span>
        <span className="nickname">{userData.role}</span>
      </div>
    </div>
  );
}

export default Header;
