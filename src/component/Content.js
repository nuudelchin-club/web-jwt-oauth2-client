import React, { useEffect, useState } from 'react';
import './Content.css';

const apiUrl = process.env.REACT_APP_API_URL;

function Content({postDataList, onMessage, userData}) {

    const postHtml = postDataList.map((post, index) => (
      <div key={index} className="post" data-author-id={post.author_id}>
        <div className="post-header">
          <div className="author-icon">
            {
              post.pictureSrc ?
              <img src={post.pictureSrc} alt="" />
              :
              <img src={process.env.PUBLIC_URL + '/image/profile512.png'} alt="" />
            }            
          </div>            
          <div className="author-details">
            <span className="author-name">{post.author}</span>
            <span className="post-time">{post.updated_at}</span>
          </div>
        </div>
        <div className="post-content">
          {post.content}
        </div>
        <div className="post-footer">
          <button>Like</button>
          {userData.username !== post.author_id && (
            <button onClick={() => onMessage(post.author_id)}>Chat</button>
          )}         
        </div>
      </div>
    ));

    return (
      <div className='content'>
        {postHtml}                                               
      </div>
  );
}

export default Content;
