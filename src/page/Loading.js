import React from 'react';
import './Loading.css';

function Loading() {
    // return (
    //     <div>     
    //     </div>
    // );
    return (
        <div className='loading_page'>
            <div className='loading_panel'>
                <div className='loading_box'>
                    <div className='wrap'>
                        <p>Loading...</p>
                    </div>                
                </div>
            </div>            
        </div>
    );
}

export default Loading;
