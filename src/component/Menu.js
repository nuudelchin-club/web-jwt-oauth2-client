import React, { useEffect, useState } from 'react';
import './Menu.css';

const apiUrl = process.env.REACT_APP_API_URL;

function Menu({setAuthorized, setCurrView}) {

    const onLogout = () => {
        fetch(`${apiUrl}/logout`, {
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
    <div className='main-content'>
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
