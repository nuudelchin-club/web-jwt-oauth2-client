import React, { useEffect, useState } from 'react';
import './Post.css';

function Post({refreshAccessToken, setCurrView}) {

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

  const onUpload = async () => {
    const isOk = await refreshAccessToken();
    if(isOk) {
      onUploadAPI();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const input = formData.get('input'); 
    if (input.trim()) {
      onUpload(input);
      e.target.reset();  
    }    
  };

  return (
    <div className='content'>
      <form onSubmit={handleSubmit}>
        <h2>Нийтлэл үүсгэх</h2>
        <textarea
          name="input"
          placeholder="What's on your mind?"
          rows="20"
          required>
        </textarea>
        <br></br>
        <button type="submit">Нийтлэх</button>
      </form>
    </div>
  );
}

export default Post;
