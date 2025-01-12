import React, { useEffect, useState } from 'react';

import Loading from './page/Loading';
import Login from './page/Login';
import Main from './page/Main';

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  
  const [authorized, setAuthorized] = useState(0);  // 0:loading, 1:authorized, 2:unauthorized  
  const [userData, setUserData] = useState({});

  const refreshAccessToken = async () => {console.log("refreshAccessToken")
    try {
      const response = await fetch(`${apiUrl}/reissue`, {
        method: 'POST',
        credentials: "include",
      });
      return response.ok;
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const onUserAPI = async () => {console.log("onUserAPI")
    try {
      fetch(`${apiUrl}/user`, {
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

  useEffect(() => {
    const init = async () => {
      try {
        const isOk = await refreshAccessToken();
        if(isOk) {
          setAuthorized(1);
          onUserAPI();
        } else {
          setAuthorized(2);
        } 
      } catch (error) {
        console.error('Error:', error);
      } finally {
      }
    };
    init();
  }, []);

  if(authorized === 1) {
    return (<Main setAuthorized={setAuthorized} refreshAccessToken={refreshAccessToken} userData={userData} />);
  } else if(authorized === 2) {
    return (<Login/>);
  } else {    
    return (<Loading/>);
  }

}

export default Home;
