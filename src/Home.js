import React from 'react';
import Loading from './page/Loading';
import Login from './page/Login';
import Main from './page/Main';
import { useEffect, useState } from 'react';
import { authenticate, getCurrUserInfo } from './util/Token';
import { UserContext } from './util/Context';

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  
    const [authorized, setAuthorized] = useState(0);  // 0:loading, 1:authorized, 2:unauthorized  
    const [userData, setUserData] = useState({});

    useEffect(() => {
        (async () => {
            const isAuthenticated = await authenticate();
            if(isAuthenticated) {           
                const userData = await getCurrUserInfo();
                setUserData(userData);
                setAuthorized(1);
            } else {
                setAuthorized(2);
            }
        })();
    }, []);

    if(authorized === 1) {
        return (
            <UserContext.Provider value={userData}>
                <Main setAuthorized={setAuthorized} />
            </UserContext.Provider>
        );
    } else if(authorized === 2) {
        return (<Login/>);
    } else {    
        return (<Loading/>);
    }
}

export default Home;
