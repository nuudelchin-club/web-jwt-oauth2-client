import React, { useEffect, useState } from 'react';
import './Menu.css';

function Menu({setAuthorized, setCurrView}) {

    const onLogout = () => {
        fetch("https://localhost/logout", {
            method: "POST",
            credentials: "include",
        })
        .then((response) => { 
        if (response.ok) {
            setAuthorized(2);
        }
        })
        .then((data) => {  })
        .catch((error) => { console.error('Error:', error); })
    };

  return (
    <div className='content'>
        <ul>
            <li>
                <button onClick={() => { onLogout(); } }>
                    Гарах
                </button>
            </li>
            <li>
                <button onClick={() => { setCurrView(11); } }>
                    Бидний тухай
                </button>                
            </li>
            <li>
                <button onClick={() => { setCurrView(12) } }>
                    Холбоо барих
                </button>
            </li>
            <li>
                <button onClick={() => { setCurrView(13) } }>
                    Example
                </button>
            </li>
            <li>
                <button onClick={() => { setCurrView(14) } }>
                    Account
                </button>
            </li>
        </ul>                                                
    </div>
  );
}

export default Menu;
