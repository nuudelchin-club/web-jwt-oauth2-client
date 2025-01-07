import React, { useEffect, useState, useRef } from 'react';
import './Write.css';

function Write({userData, refreshAccessToken, setCurrView}) {

  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current.focus();
  }, []);

  const onUploadAPI = async (input) => {console.log("onUploadAPI", input)
    try {
      const response = await fetch('https://localhost/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: input,
        credentials: "include",
      });
      
      if (response.ok) {
        const responseData = await response.text();
        alert(responseData);
        setCurrView(0);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
  };

  const onUpload = async (input) => {
    const isOk = await refreshAccessToken();
    if(isOk) {
      onUploadAPI(input);
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
              userData.pictureSrc ?
              <img src={userData.pictureSrc} alt="" />
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
