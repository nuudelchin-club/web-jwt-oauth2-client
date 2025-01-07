import React, { useEffect, useState } from 'react';
import './Main.css';
import Content from '../component/Content';
import Menu from '../component/Menu';
import Header from '../component/Header';
import Footer from '../component/Footer';
import Post from '../component/Post';
import About from '../component/About';
import Contact from '../component/Contact';
import Example from '../component/Example';
import Account from '../component/Account';

function Main({setAuthorized, refreshAccessToken}) {

  const [userData, setUserData] = useState({});
  const [currView, setCurrView] = useState(0);

  useEffect(() => {
    onUserAPI();
  }, []);

  useEffect(() => {console.log("refreshAccessToken")
    const init = async () => {
      try {
        const isOk = await refreshAccessToken();
        if(isOk) {
          
        } else {
          setAuthorized(2);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
      }
    };
    init();
  }, [currView]);

  const onUserAPI = async () => {console.log("onUserAPI")
    try {
      fetch("https://localhost/user", {
        method: "GET",
        credentials: "include",
      })
      .then((response) => { 
        if (response.ok) { 
          return response.json(); 
        }
      })
      .then((data) => { 
        setUserData(data);
      })
      .catch((error) => { console.error('Error:', error); })
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
  };

  return (
    <div className='main_page'>
      <div className='main_panel'>
        {/* <Header /> */}

        {currView === 0 && <Content userData={userData}/>}
        {currView === 1 && <Menu setAuthorized={setAuthorized} setCurrView={setCurrView} />}
        {currView === 11 && <About />}
        {currView === 12 && <Contact />}
        {currView === 13 && <Example refreshAccessToken={refreshAccessToken} setAuthorized={setAuthorized} />}
        {currView === 14 && <Account />}
        {currView === 2 && <Post refreshAccessToken={refreshAccessToken} setCurrView={setCurrView} />}
        
        <Footer userData={userData} setCurrView={setCurrView} />
      </div>
    </div>
  );
}

export default Main;
