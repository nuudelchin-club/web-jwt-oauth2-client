import React from 'react';
import { useContext } from 'react';
import './Header.css';
import { ReceiverContext } from '../../util/Context';

function Header({}) {

    const receiverUserData = useContext(ReceiverContext);

    return (
        <div className='message-header'>
            <div className="user-picture">
            {
                receiverUserData.picture ?
                <img src={receiverUserData.picture} alt="" />
                :
                <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" />
            } 
            </div>            
            <div className="user-details">
                <span className="fullname">{receiverUserData.fullname}</span>
                <span className="nickname">{receiverUserData.role}</span>
            </div>
        </div>
    );
}

export default Header;
