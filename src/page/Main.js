import React from 'react';
import './Main.css';
import { useEffect, useState, useContext } from 'react';
import Content from '../component/Content';
import Menu from '../component/Menu';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Write from '../component/Write';
import About from '../component/About';
import Contact from '../component/Contact';
import Example from '../component/Example';
import Account from '../component/Account';
import Chat from '../component/Chat';
import Message from '../component/message/Message';
import { authenticate } from '../util/Token';
import { UserContext } from '../util/Context';

const apiUrl = process.env.REACT_APP_API_URL;

function Main({setAuthorized}) {

    const userData = useContext(UserContext);
    const [currView, setCurrView] = useState(0);
    const [postDataList, setPostDataList] = useState([]);
    const [messagers, setMessagers] = useState({senderId: null, recipientId: null});

  const onGetPostDataList = async () => {console.log("onGetPostDataList();")
    fetch(`${apiUrl}/post/get`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
    })
    .then((response) => { 
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json(); 
    })
    .then((data) => {
      setPostDataList(data);
    })
    .catch((error) => { console.error('Error:', error); })
  };

  const onMessage = (recipientId) => {
    const senderId = userData.username;
    if(senderId && recipientId) {
      setMessagers((prev) => ({ 
        ...prev,
        senderId: senderId,
        recipientId: recipientId
      }));
      setCurrView(4);
    }
  };

  useEffect(() => {
    onGetPostDataList();
  }, []);

    useEffect(() => {
        (async () => {
            const isAuthenticated = await authenticate();
            if(isAuthenticated) {
            } else {
                setAuthorized(2);
            }
        })();
    }, [currView]);

  return (
    <div className='main-page'>
      <div className='main-panel'>
        <Header />

        {currView === 0 && <Content postDataList={postDataList} onMessage={onMessage} />}
        {currView === 1 && <Menu setAuthorized={setAuthorized} setCurrView={setCurrView} />}
        {currView === 11 && <About />}
        {currView === 12 && <Contact />}
        {currView === 13 && <Example setAuthorized={setAuthorized} />}
        {currView === 14 && <Account />}
        {currView === 2 && <Write setCurrView={setCurrView} />}
        {currView === 3 && <Chat onMessage={onMessage} />}
        {currView === 4 && <Message messagers={messagers} />}
        
        <Footer setCurrView={setCurrView} />
      </div>
    </div>
  );
}

export default Main;
