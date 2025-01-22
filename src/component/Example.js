import React, { useEffect, useState } from 'react';
import { authenticate } from '../util/Token';

const apiUrl = process.env.REACT_APP_API_URL;

function Example({setAuthorized}) {

  const [timeData, setTimeData] = useState({});

  useEffect(() => {
    onTimeAPI();
  }, []);

  const onTimeAPI = async () => {console.log("onTimeAPI")
    try {
      fetch(`${apiUrl}/time`, {
        method: "GET",
        credentials: "include",
      })
      .then((response) => { 
        if (response.ok) { 
          return response.json(); 
        }
      })
      .then((data) => {
        setTimeData(data);
      })
      .catch((error) => { console.error('Error:', error); })
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
  };

    const onTime = async () => {
        const isAuthenticated = await authenticate();
        if(isAuthenticated) {
            onTimeAPI();
        } else {
            setAuthorized(2);
        }
    }

  return (
    <div className='main-content'>
        <ul>
          <li>
              <button onClick={() => { onTime(); } }>
                  Time
              </button>
          </li>
          <li>
              <p>
                  {timeData.time}
              </p>
          </li>                                               
        </ul>        
    </div>
  );
}

export default Example;
