import React from 'react';
import './Login.css';

const onGoogleLogin = () => {
    window.location.href = "https://localhost/oauth2/authorization/google";
};
const onFacebookLogin = () => {
    window.location.href = "https://localhost/oauth2/authorization/facebook";
};
const onNaverLogin = () => {
    window.location.href = "https://localhost/oauth2/authorization/naver";
};

function Login() {
    return (
        <div className='login_page'>
            <div className='login_panel'>
                <div className='login_box'>
                    <div className='wrap'>
                        <h2>Нэвтрэх</h2>
                        <button
                            onClick={onGoogleLogin}
                            className='google'>
                            Google Login
                        </button>
                        <button
                            onClick={onFacebookLogin}
                            className='facebook'>
                            Facebook Login
                        </button>
                        <button
                            onClick={onNaverLogin}
                            className='naver'>
                            Naver Login
                        </button>
                    </div>                
                </div>
            </div>            
        </div>
    );
}

export default Login;
