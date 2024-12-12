import React, { useEffect, useState } from 'react';
import Header from './Header';
import Nav from './Nav';
import Body from './Body';
import Side from './Side';
import Footer from './Footer';

const onGoogleLogin = () => {
  window.location.href = "https://localhost/oauth2/authorization/google";
};
const onFacebookLogin = () => {
  window.location.href = "https://localhost/oauth2/authorization/facebook";
};
const onNaverLogin = () => {
  window.location.href = "https://localhost/oauth2/authorization/naver";
};

async function refreshAccessToken() {
  try {
    const response = await fetch('https://localhost/reissue', {
      method: 'POST',
      credentials: "include",
    });
    if(response.ok) {
      return "ok";
    } else {
      return null;
    }
  } catch (error) {
      console.error('Error:', error);
  }
};

function Home() {
  
  const [authorized, setAuthorized] = useState(0);  // 0:loading, 1:authorized, 2:unauthorized
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = await refreshAccessToken();
        if(accessToken) {
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

  if(logout) {
    fetch("https://localhost/logout", {
      method: "POST",
      credentials: "include",
    })
    .then((response) => { 
      if (response.ok) {
        setAuthorized(2);
        setUserData({});
      }
    })
    .then((data) => {  })
    .catch((error) => { console.error('Error:', error); })
  }

  const onUserAPI = async () => {
    try {
      const accessToken = await refreshAccessToken();
      if(accessToken) {
        fetch("https://localhost/my", {
          method: "GET",
          credentials: "include",
          headers: { 
            'Content-Type': 'application/json', 
            'access' : accessToken
          },
        })
        .then((response) => { 
          if (response.ok) { 
            return response.json(); 
          }
        })
        .then((data) => { console.log('data', data)
          setUserData(data);
        })
        .catch((error) => { console.error('Error:', error); })
      } 
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
  };

  if(authorized === 1) {

    return (
      <div className="flex flex-col min-h-screen">
        <Header setLogout={setLogout}/>
        <div className="flex flex-1">
          <Nav />
          <Body prop={userData}/>
          <Side />
        </div>
        <Footer />
      </div>
    );

  } else if(authorized === 2) {

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Нэвтрэх</h2>
          <div className="space-y-4">
            <button
              onClick={onGoogleLogin}
              className="w-full bg-red-500 text-white font-medium py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
            >
              Google Login
            </button>
            <button
              onClick={onFacebookLogin}
              className="w-full bg-blue-700 text-white font-medium py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
            >
              Facebook Login
            </button>
            <button
              onClick={onNaverLogin}
              className="w-full bg-green-500 text-white font-medium py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
            >
              Naver Login
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            Бүртгэл байхгүй юу?{" "}
            <a href="#" className="text-blue-500 hover:text-blue-600 hover:underline">
              Бүртгүүлэх
            </a>
          </p>
        </div>
      </div>
    );

  } else {
    
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  }   

}

export default Home;
