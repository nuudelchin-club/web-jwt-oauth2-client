import React, { useEffect, useState } from 'react';
import './Header.css';

function Header({menu, setMenu, userData}) {
  
  return (
    <div className='header'>
      <div className='wrap logo'>
        <img src={process.env.PUBLIC_URL + '/image/logo512.png'} alt="" width={40} height={40} onClick={() => window.location.reload() }/>
      </div>
    </div>
  );
}

export default Header;
