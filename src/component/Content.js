import React, { useEffect, useState } from 'react';
import './Content.css';

const apiUrl = process.env.REACT_APP_API_URL;

function Content({postDataList, onMessage, userData}) {

    const postHtml = postDataList.map((post, index) => (
      <div key={index} className="post" data-author-id={post.username}>
        <div className="post-header">
          <div className="author-icon">
            {
              post.picture ?
              <img src={post.picture} alt="" />
              :
              <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" />
            }            
          </div>            
          <div className="author-details">
            <span className="author-name">{post.fullname}</span>
            <span className="post-time">{post.updatedAt}</span>
          </div>
        </div>
        <div className="post-content">
          {post.content}
        </div>
        <div className="post-footer">
          <button>Like</button>
          {userData.username !== post.username && (
            <button onClick={() => onMessage(post.username)}>Chat</button>
          )}         
        </div>
      </div>
    ));

    return (
      <div className='main-content'>
        {postHtml}                                               
      </div>
  );
}

export default Content;
