import React from 'react';
import './Chat.css';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../util/Context';
import { ViewContext } from '../util/Context';
import { postData } from '../util/Fetch';
import { View } from '../util/Const';

const apiUrl = process.env.REACT_APP_API_URL;

function Chat({setReceiverUserName}) {
    
    const userData = useContext(UserContext);
    const setView = useContext(ViewContext);

    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await postData('/chat/get', userData.username);
            setChatList(data);
        })();
    }, []);

    const chatTo = (e, receiverUserName) => {
        e.preventDefault();
        setReceiverUserName(receiverUserName);
        setView(View.MESSAGE);
    };

    const html = chatList.map((chat, index) => (
        <div key={index} className="">
            <div className='chat-wrap' onClick={(e) => chatTo(e, chat.recipientId) }>
                <div className="user-picture">
                    {
                    chat.picture ?
                    <img src={chat.picture} alt="" />
                    :
                    <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" />
                    } 
                </div>            
                <div className="user-details">
                    <span className="fullname">{chat.fullname}</span>
                    <span className="nickname">{chat.recipientId}</span>
                </div>
            </div>
        </div>
    ));

    return (
        <div className='main-content'>
            {html}
        </div>
    );
}

export default Chat;
