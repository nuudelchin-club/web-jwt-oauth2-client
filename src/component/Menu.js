import React from 'react';
import './Menu.css';
import { useContext } from 'react';
import { PageContext } from '../util/Context';
import { ViewContext } from '../util/Context';
import { View } from '../util/Const';

const apiUrl = process.env.REACT_APP_API_URL;

function Menu({}) {

    const setPage = useContext(PageContext);
    const setView = useContext(ViewContext);

    const onLogout = () => {
        fetch(`${apiUrl}/logout`, {
            method: "POST",
            credentials: "include",
        })
        .then((response) => { 
        if (response.ok) {
            setPage(2);
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
                    <button onClick={() => { setView(View.ABOUT); } }>
                        Бидний тухай
                    </button>                
                </li>
                <li>
                    <button onClick={() => { setView(View.CONTACT) } }>
                        Холбоо барих
                    </button>
                </li>
                <li>
                    <button onClick={() => { setView(View.EXAMPLE) } }>
                        Example
                    </button>
                </li>
                <li>
                    <button onClick={() => { setView(View.ACCOUNT) } }>
                        Account
                    </button>
                </li>
            </ul>                                                
        </div>
    );
}

export default Menu;
