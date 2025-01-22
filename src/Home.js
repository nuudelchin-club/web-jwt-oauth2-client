import React, { useEffect, useState, useRef } from 'react';
import Loading from './page/Loading';
import Login from './page/Login';
import Main from './page/Main';
import { authenticate } from './util/Token';

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  
  const [authorized, setAuthorized] = useState(0);  // 0:loading, 1:authorized, 2:unauthorized  
  const [userData, setUserData] = useState({});

  const getUser = async () => {console.log("getUser")
    fetch(`${apiUrl}/user/getLoggedIn`, {
      method: "GET",
      credentials: "include",
    })
    .then((response) => { 
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json(); 
    })
    .then((data) => { 
      setUserData(data);
    })
    .catch((error) => { console.error('Error:', error); })
  };

    useEffect(() => {
        (async () => {
            const isAuthenticated = await authenticate();
            if(isAuthenticated) {
                setAuthorized(1);
                getUser();
            } else {
                setAuthorized(2);
            }
        })();
    }, []);

  if(authorized === 1) {
    return (<Main setAuthorized={setAuthorized} userData={userData} />);
  } else if(authorized === 2) {
    return (<Login/>);
  } else {    
    return (<Loading/>);
  }

}

export default Home;
