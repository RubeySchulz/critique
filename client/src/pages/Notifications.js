import React, { useEffect, useState } from 'react';
import Nav from '../components/Navbar';

import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME_NOTIFS } from '../utils/queries';
import { UPDATE_NOTIFS } from '../utils/mutations';

function Notification() {
    const {data: notifData} = useQuery(QUERY_ME_NOTIFS);
    const [updateNotifs] = useMutation(UPDATE_NOTIFS);

    const [notifs, setNotifs] = useState({replies: [], follows: []});
    
    // seperate notifications into the new followers and replies
    useEffect(() => {
        let replies = [];
        let follows = [];
        if(notifData){
            notifData.me.notifications.forEach(notif => {
            if(notif.type === 'reply'){
                replies.push(notif);
            }
            if(notif.type === 'follower'){
                follows.push(notif);
            }
        });
        setNotifs({ replies, follows });
        }
    }, [notifData])
    console.log(notifs);

    return (
        <>
            <Nav></Nav>
            <div className='container'>
                <h1>Notifications</h1>
                {notifs.replies.length > 0 && (
                    <div className='row six columns'>
                        <h2>new replies:</h2>
                        <div className='container'>
                            {notifs.replies.map(notif => (
                                <div key={notif._id}>
                                    <Link className='no-decorate' to={'/profile/'.concat(notif.username)}>
                                        <h4>{notif.username}</h4>
                                    </Link>
                                    <h6>{notif.body}</h6>
                                </div>
                            ))}    
                        </div>
                        
                    </div>
                )}

                {notifs.follows.length > 0 && (
                    <div className='row six columns'>
                        <h2>new followers:</h2>
                        <div className='container'>
                            {notifs.replies.map(notif => (
                                <div key={notif._id}>
                                    <Link className='no-decorate' to={'/profile/'.concat(notif.username)}>
                                        <h4>{notif.username}</h4>
                                    </Link>
                                </div>
                            ))}    
                        </div>
                        
                    </div>
                )}
            </div>
            
        </>
        
    )
}

export default Notification;