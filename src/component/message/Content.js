import React from 'react';
import { useEffect, useState, useRef, useContext } from 'react';
import './Content.css';
import { UserContext } from '../../util/Context';
import { ReceiverContext } from '../../util/Context';
import { postData } from '../../util/Fetch';

function Content({messageList}) {

    const senderUserData = useContext(UserContext);
    const receiverUserData = useContext(ReceiverContext);
    const messageContentRef = useRef(null);

    useEffect(() => {
        if (messageContentRef.current) {
            messageContentRef.current.scrollTop = messageContentRef.current.scrollHeight;
        }
    }, [messageList]);

    const html = messageList.map((message, index) => (
        <div key={index} className="">
        {
            message.senderId == receiverUserData.username   // them
            ?
            <div className="message-wrap message-them">
                <div className="user-picture">
                {
                    receiverUserData.picture ?
                    <img src={receiverUserData.picture} alt="" />
                    :
                    <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" />
                } 
                </div>            
                <div className="message-box">
                    <span className="">{message.content}</span>
                </div>        
            </div>
            :
            <div className="message-wrap message-you">
                <div className="message-box">
                    <span className="">{message.content}</span>
                </div>
            </div>
        }      
        </div>
    ));

    return (
        <div className='message-content' ref={messageContentRef} >
            {html}
        </div>
    );
}

export default Content;
