import React, { useEffect, useState } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

function Account() {

  const [userData, setUserData] = useState({});

  useEffect(() => {
    getUser();
  }, []);

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
