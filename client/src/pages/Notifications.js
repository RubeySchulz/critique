import React, { useEffect, useState } from 'react';
import Nav from '../components/Navbar';

import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME_NOTIFS } from '../utils/queries';
import { UPDATE_NOTIFS } from '../utils/mutations';

function Notification() {
    const {data: notifData} = useQuery(QUERY_ME_NOTIFS);
    const [updateNotifs] = useMutation(UPDATE_NOTIFS);
    const [clearIcon, setNotifIcon] = useState(false)

    const [notifs, setNotifs] = useState({replies: [], follows: [], likes: []});
    
    // seperate notifications into the new followers and replies
    useEffect(() => {
        let replies = [];
        let follows = [];
        let likes = []
        if(notifData){
            notifData.me.notifications.forEach(notif => {
            if(notif.type === 'reply'){
                replies.push(notif);
            }
            if(notif.type === 'follower'){
                follows.push(notif);
            }
            if(notif.type === 'like'){
                likes.push(notif);
            }
        });
        setNotifs({ replies, follows, likes });
        }
    }, [notifData])

    const clearNotifs = (e) => {
        e.preventDefault();

        updateNotifs({
            variables: { notifId: null }
        });
        setNotifs({ replies: [], follows: [], likes: [] });
        setNotifIcon(true);
    }

    const handleNotif = (id) => {
        updateNotifs({
            variables: { notifId: id}
        });
    }

    return (
        <>
            <Nav clearNotification={clearIcon}></Nav>
            
            <div className='container'>
                <div className='row ten columns'>
                    <h1 className='inline'>Notifications</h1>
                </div>
                <div className='row two columns m-2'>
                    <button onClick={clearNotifs}>Clear Notifications</button>
                </div>    
                
                <div className='row twelve columns mt-5'>
                    {notifs.replies.length > 0 && (
                        <div className='row four columns border-right'>
                            <h2>new replies:</h2>
                            <div className='container'>
                                {notifs.replies.map(notif => (
                                    <div key={notif._id + Math.floor(Math.random())}>
                                        {console.log(notif)}
                                        <Link className='no-decorate' to={'/profile/'.concat(notif.username)}>
                                            <h4><span className='bold'>{notif.username}</span> replied - </h4>
                                        </Link>
                                        <br></br>
                                        <Link className='no-decorate' onClick={() => handleNotif(notif._id)} to={'/review/'.concat(notif.replyParent + '/').concat(notif._id)}>
                                            <h3>"{notif.body}"</h3>
                                        </Link>
                                    </div>
                                ))}    
                            </div>
                            
                        </div>
                    )}

                    {notifs.follows.length > 0 && (
                        <div className='row four columns border-right'>
                            <h2>new followers:</h2>
                            <div className='container'>
                                {notifs.follows.map(notif => (
                                    <div key={notif._id + Math.floor(Math.random())}>
                                        <Link className='no-decorate' onClick={() => handleNotif(notif._id)} to={'/profile/'.concat(notif.username)}>
                                            <h4><span className='bold'>{notif.username}</span> followed you</h4>
                                        </Link>
                                    </div>
                                ))}    
                            </div>
                            
                        </div>
                    )}

                    {notifs.likes.length > 0 && (
                        <div className='row four columns border-right'>
                            <h2>new likes:</h2>
                            <div className='container'>
                                {notifs.likes.map(notif => (
                                    <div key={notif._id + Math.floor(Math.random())}>
                                        <Link className='no-decorate' to={'/profile/'.concat(notif.username)}>
                                            <h4><span className='bold'>{notif.username}</span> liked your review</h4>
                                        </Link>
                                        <br></br>
                                        <Link className='no-decorate' onClick={() => handleNotif(notif._id)} to={'/review/'.concat(notif._id)}>
                                            <h3>"{notif.body}"</h3>
                                        </Link>
                                    </div>
                                ))}    
                            </div>
                            
                        </div>
                    )}    
                </div>
                
            </div>
            
        </>
        
    )
}

export default Notification;