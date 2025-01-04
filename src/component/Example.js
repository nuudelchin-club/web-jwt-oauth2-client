import React, { useEffect, useState } from 'react';

function Example({refreshAccessToken}) {

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
              <button onClick={() => { onTimeAPI(); } }>
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
