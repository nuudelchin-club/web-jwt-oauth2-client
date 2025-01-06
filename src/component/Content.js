import React, { useEffect, useState } from 'react';
import './Content.css';

function Content() {

    const [listData, setListData] = useState([]);

    useEffect(() => {
        const init = async () => {
          onGetAllList();
        };
        init();
    }, []);

    const onGetAllList = async () => {console.log("onGetAllList")
        try {
          fetch("https://localhost/getAllList", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
          })
          .then((response) => { 
            if (response.ok) { 
              return response.json(); 
            }
          })
          .then((data) => {
              setListData(data);
          })
          .catch((error) => { console.error('Error:', error); })
        } catch (error) {
          console.error('Error:', error);
        } finally {
        }
    };

    const list = listData.map((item, index) => <li key={index}>{item.content}</li>);

    return (
        <div className='content'>
            <ol>
                {list}
            </ol>                                                
        </div>
  );
}

export default Content;
