import React from 'react';
import Loading from './page/Loading';
import Login from './page/Login';
import Main from './page/Main';
import { useEffect, useState } from 'react';
import { authenticate, getUserData } from './util/Token';
import { UserContext } from './util/Context';
import { PageContext } from './util/Context';

function Home() {

    // 0 : loading page
    // 1 : main page
    // 2 : login page
    const [page, setPage] = useState(0);  
    const [userData, setUserData] = useState({});

    useEffect(() => {
        (async () => {
            const isAuthenticated = await authenticate();
            if(isAuthenticated) {           
                const userData = await getUserData();
                setUserData(userData);
                setPage(1);
            } else {
                setPage(2);
            }
        })();
    }, []);

    if(page === 1) {
        
        return (
            <UserContext.Provider value={userData}>
                <PageContext.Provider value={{setPage}}>
                    <Main />
                </PageContext.Provider>
            </UserContext.Provider>
        );

    } else if(page === 2) {

        return (<Login/>);

    } else {    
        
        return (<Loading/>);

    }
}

export default Home;
