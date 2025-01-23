import React from 'react';
import { useEffect, useState, useRef, useContext } from 'react';
import './Message.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { UserContext } from '../../util/Context';
import { ReceiverContext } from '../../util/Context';
import { postData } from '../../util/Fetch';

const apiUrl = process.env.REACT_APP_API_URL;

function Message({receiverUserName}) {
    
    const senderUserData = useContext(UserContext);
    const [receiverUserData, setReceiverUserData] = useState({});  
    const stompClient = useRef(null);    
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        (async () => {
            const userData = await postData('/user/findByUsername', receiverUserName);
            setReceiverUserData(userData);
            
            const payload = {
                senderId: senderUserData.username,
                recipientId: receiverUserName,
            };
            const messageData = await postData('/message/get', JSON.stringify(payload));
            setMessageList([...messageList, ...messageData]);

        })();
        
        connectWS();

        return () => {
            if (stompClient.current) {
                console.log("Deactivating stompClient...");
                try {
                    stompClient.current.deactivate();
                } catch (error) {
                    console.error("Error deactivating stompClient:", error);
                }
            }
        };    
    }, []);

    const connectWS = async () => {console.log("connectWS")
        const socket = new SockJS(`${apiUrl}/ws`);
        stompClient.current = Stomp.over(socket);
        stompClient.current.debug = (message) => {
            //console.log(message);
        };
        stompClient.current.connect({}, () => {
            console.log('Connected to WebSocket');  
            stompClient.current.subscribe(`/user/${senderUserData.username}/queue/messages`, (message) => {
                setMessageList((messageList) => [...messageList, JSON.parse(message.body)]);
            });
        });
        stompClient.current.activate();
    };

    const sendMessage = (content) => {
        if (stompClient) {
            const payload = {
                senderId: senderUserData.username,
                recipientId: receiverUserName,
                content: content,
            };
            stompClient.current.send("/app/send", {}, JSON.stringify(payload));
            setMessageList([...messageList, { senderId: "you", content: content }]);
        }  
    };

    return (
        <div className='main-content'>
            <div className='message-panel'>
                <ReceiverContext.Provider value={receiverUserData}>
                    <Header />
                    <Content messageList={messageList} />       
                    <Footer sendMessage={sendMessage} />
                </ReceiverContext.Provider>
            </div>
        </div>
    );
}

export default Message;
