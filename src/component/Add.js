import React, { useEffect, useState } from 'react';
import './Add.css';

function Add({refreshAccessToken}) {

  const [timeData, setTimeData] = useState({});

  useEffect(() => {
    const init = async () => {
      try {
        const isOk = await refreshAccessToken();
        if(isOk) {
          onTimeAPI();
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
      }
    };
    init();
  }, []);

  const onTimeAPI = async () => {console.log("onTimeAPI")
    try {
      const isOk = await refreshAccessToken();
      if(isOk) {
        fetch("https://localhost/time", {
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
                Зар оруулах
                </p>                
            </li>
            <li>
                <button onClick={() => { onTimeAPI(); } }>
                    Цаг
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

export default Add;
