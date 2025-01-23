import React from 'react';
import './Footer.css';
import { useContext } from 'react';
import { UserContext } from '../../util/Context';
import { ViewContext } from '../../util/Context';
import { View } from '../../util/Const';

function Footer({}) {

    const userData = useContext(UserContext);
    const setView = useContext(ViewContext);

    return (
        <div className='main-footer'>
            <div className='wrap logo'>
                <img src={process.env.PUBLIC_URL + '/image/logo512.png'} alt="" width={40} height={40} onClick={() => window.location.reload() }/>
            </div>
            <div className='wrap home'>
                <img src={process.env.PUBLIC_URL + '/image/heart512.png'} alt="" width={40} height={40} onClick={() => { setView(View.POST); } }/>
            </div>
            <div className='wrap add'>
                <img src={process.env.PUBLIC_URL + '/image/club512.png'} alt="" width={40} height={40} onClick={() => { setView(View.WRITE); } }/>
            </div>
            <div className='wrap'>
                <img src={process.env.PUBLIC_URL + '/image/spade512.png'} alt="" width={40} height={40} onClick={() => { setView(View.CHAT); } }/>
            </div>
            <div className='wrap'>
                <img src={process.env.PUBLIC_URL + '/image/diamond512.png'} alt="" width={40} height={40} onClick={() => { setView(View.MESSAGE); } }/>
            </div>
            <div className='wrap profile'>
                {
                    userData.picture ? 
                    <img src={userData.picture} alt="" width={40} height={40} onClick={() => { setView(View.MENU); } }/>
                    :
                    <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" width={40} height={40} onClick={() => { setView(View.MENU); } }/>
                }        
            </div>
        </div>
    );
}

export default Footer;
