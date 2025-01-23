import React from 'react';
import './Main.css';
import { useEffect, useState, useContext } from 'react';
import Content from '../component/main/Content';
import Menu from '../component/Menu';
import Header from '../component/main/Header';
import Footer from '../component/main/Footer';
import Write from '../component/Write';
import About from '../component/About';
import Contact from '../component/Contact';
import Example from '../component/Example';
import Account from '../component/Account';
import Chat from '../component/Chat';
import Message from '../component/message/Message';
import { authenticate } from '../util/Token';
import { UserContext } from '../util/Context';
import { PageContext } from '../util/Context';
import { ViewContext } from '../util/Context';
import { View } from '../util/Const';

function Main({}) {

    const userData = useContext(UserContext);
    const setPage = useContext(PageContext);

    // 0 : content post view
    // 1 : menu view
    // 11 : menu about view
    // 12 : menu contact view
    // 13 : menu example view
    // 14 : menu account view
    // 2 : write view
    // 3 : chat view
    // 4 : message view
    const [view, setView] = useState(0);

    // chat receiver
    const [receiverUserName, setReceiverUserName] = useState(null);

    useEffect(() => {
        (async () => {
            const isAuthenticated = await authenticate();
            if(isAuthenticated) {
            } else {
                setPage(2);
            }
        })();
    }, [view]);

    return (
        <div className='main-page'>
            <div className='main-panel'>

                <ViewContext.Provider value={setView}>
                    
                    <Header />

                    {view === View.POST && <Content setReceiverUserName={setReceiverUserName} />}
                    {view === View.MENU && <Menu />}
                    {view === View.ABOUT && <About />}
                    {view === View.CONTACT && <Contact />}
                    {view === View.EXAMPLE && <Example />}
                    {view === View.ACCOUNT && <Account />}
                    {view === View.WRITE && <Write />}
                    {view === View.CHAT && <Chat setReceiverUserName={setReceiverUserName} />}
                    {view === View.MESSAGE && <Message receiverUserName={receiverUserName} />}

                    <Footer />

                </ViewContext.Provider>                

            </div>
        </div>
    );
}

export default Main;
