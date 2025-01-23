import React, { useEffect, useState } from 'react';
import './Header.css';

function Header({}) {
  
    return (
        <div className='main-header'>
            <div className='wrap logo'>
                <img src={process.env.PUBLIC_URL + '/image/logo512.png'} alt="" width={40} height={40} onClick={() => window.location.reload() }/>
            </div>
            <div className='wrap logo'>
                
            </div>
            <div className='wrap logo'>
                
            </div>
            <div className='wrap logo'>
                
            </div>
            <div className='wrap logo'>
                
            </div>
            <div className='wrap logo'>
                
            </div>
        </div>
    );
}

export default Header;
