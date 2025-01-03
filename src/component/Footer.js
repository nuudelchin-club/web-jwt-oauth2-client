import React, { useEffect, useState } from 'react';
import './Footer.css';

function Footer({userData, setCurrView}) {
  console.log(userData)
  return (
    <div className='footer'>
      <div className='wrap logo'>
        <img src={process.env.PUBLIC_URL + '/image/home512.png'} alt="" width={40} height={40} onClick={() => { setCurrView(0); } }/>
      </div>
      <div className='wrap add'>
        <img src={process.env.PUBLIC_URL + '/image/add512.png'} alt="" width={40} height={40} onClick={() => { setCurrView(2); } }/>
      </div>
      <div className='wrap profile'>
        <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" width={40} height={40} onClick={() => { setCurrView(1); } }/>
      </div>
    </div>
  );
}

export default Footer;
