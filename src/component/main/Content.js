import React from 'react';
import './Content.css';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../util/Context';
import { getData } from '../../util/Fetch';
import { ViewContext } from '../../util/Context';
import { View } from '../../util/Const';

const apiUrl = process.env.REACT_APP_API_URL;

function Content({setReceiverUserName}) {
    
    const userData = useContext(UserContext);
    const setView = useContext(ViewContext);

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getData('/post/get');
            setPostList(data);
        })();
    }, []);

    const chatTo = (e, receiverUserName) => {
        e.preventDefault();
        setReceiverUserName(receiverUserName);
        setView(View.MESSAGE);
    };

    const postHtml = postList.map((post, index) => (
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
                    <button onClick={(e) => chatTo(e, post.username)}>Chat</button>
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
