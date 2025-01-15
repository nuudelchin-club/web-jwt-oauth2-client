import React, { useEffect, useState, useRef } from 'react';
import './Write.css';

const apiUrl = process.env.REACT_APP_API_URL;

function Write({userData, refreshAccessToken, setCurrView}) {

  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const save = async (input) => {console.log("save")
    fetch(`${apiUrl}/post/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: input,
      credentials: "include",
    })
    .then((response) => { 
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.text(); 
    })
    .then((data) => { 
      if(data === "OK") {
        alert("Нийтлэл хадгалагдлаа.")
        setCurrView(0);
      }
    })
    .catch((error) => { console.error('Error:', error); })
  };

  const onUpload = async (input) => {
    const isOk = await refreshAccessToken();
    if(isOk) {
      save(input);
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();

    const input = textareaRef.current.value;  
    if (input.trim()) {
      onUpload(input);
      textareaRef.current.value = ""; 
    }    
  };

  return (
    <div className='content'>
      <div className="write">
        <div className="write-header">
          <div className="author-icon">
            {
              userData.picture ?
              <img src={userData.picture} alt="" />
              :
              <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" />
            }            
          </div>            
          <div className="author-details">
            <span className="author-name">{userData.fullname}</span>
          </div>
        </div>
        <div className="write-content">
          <textarea
            ref={textareaRef}
            placeholder="What's on your mind?"
            onInput={e => e.target.style.height = `${e.target.scrollHeight}px`}
            required>
          </textarea>
        </div>
        <div className="write-footer">
          <button onClick={(event) => { handleUpload(event); } }>
            Нийтлэх
          </button>
        </div>
      </div>
    </div>
  );
}

export default Write;
