import React, { useEffect, useState } from 'react';

function Account({refreshAccessToken}) {

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        const isOk = await refreshAccessToken();
        if(isOk) {
          onUserAPI();
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
      }
    };
    init();
  }, []);

  const onUserAPI = async () => {console.log("onUserAPI")
    try {
      const isOk = await refreshAccessToken();
      if(isOk) {
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
      } 
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
  };

  return (
    <div className='content'>
        <ul>
          <li>
              <p>
                  {userData.fullname}
              </p>
          </li>
          <li>
              <p>
                  {userData.email}
              </p>
          </li>                                               
          <li>
              <p>
                  {userData.role}
              </p>
          </li>                                               
          <li>
              <img src={userData.picture} alt="" width={40} height={40} />
          </li>                                               
        </ul>        
    </div>
  );
}

export default Account;
