import React, { useEffect, useState } from 'react';
import './Footer.css';

function Footer({userData, setCurrView}) {
  console.log(userData)
  return (
    <div className='main-footer'>
      <div className='wrap logo'>
        <img src={process.env.PUBLIC_URL + '/image/logo512.png'} alt="" width={40} height={40} onClick={() => window.location.reload() }/>
      </div>
      <div className='wrap home'>
        <img src={process.env.PUBLIC_URL + '/image/heart512.png'} alt="" width={40} height={40} onClick={() => { setCurrView(0); } }/>
      </div>
      <div className='wrap add'>
        <img src={process.env.PUBLIC_URL + '/image/club512.png'} alt="" width={40} height={40} onClick={() => { setCurrView(2); } }/>
      </div>
      <div className='wrap'>
        <img src={process.env.PUBLIC_URL + '/image/spade512.png'} alt="" width={40} height={40} onClick={() => { setCurrView(3); } }/>
      </div>
      <div className='wrap'>
        <img src={process.env.PUBLIC_URL + '/image/diamond512.png'} alt="" width={40} height={40} onClick={() => { setCurrView(4); } }/>
      </div>
      <div className='wrap profile'>
        {
          userData.picture ? 
          <img src={userData.picture} alt="" width={40} height={40} onClick={() => { setCurrView(1); } }/>
          :
          <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" width={40} height={40} onClick={() => { setCurrView(1); } }/>
        }        
      </div>
    </div>
  );
}

export default Footer;
