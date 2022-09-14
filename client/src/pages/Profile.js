import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import TierList from '../components/TierList';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';

import { QUERY_ME, QUERY_GET_USER } from '../utils/queries';
import { FOLLOW_USER, UNFOLLOW_USER } from '../utils/mutations';
import { get_follow_info } from '../utils/userInfo';
import auth from '../utils/auth';

function Profile() {
    // get URL params
    const { username: userParam } = useParams();

    // button states and mutations
    const [ follow ] = useMutation(FOLLOW_USER);
    const [ unfollow ] = useMutation(UNFOLLOW_USER);
    const [buttonState, setButtonState] = useState('Follow')

    // check if user is following this profile
    useEffect(() => {
        const getInfo = async () => {
            const info = await get_follow_info(auth.getProfile().data.username);

            info.following.map(following => {
                if(following.username === userParam){
                    setButtonState('Unfollow');
                }
            })
            
        };
        getInfo();
    })

    // get user information and assing it to 'user'
    const { loading, error, data } = useQuery(userParam ? QUERY_GET_USER : QUERY_ME, {
        variables: { username: userParam }
    })
    let user = data?.user || data?.me || {};

    // renavigate to user profile page if trying to access your own profile
    if(auth.loggedIn() && auth.getProfile().data.username === userParam) {
        return <Navigate to='/profile' />;
    }

    

    // placeholder and error messages
    if(loading) {
        return <h1>Loading...</h1>
    };
    if(!user?.username) {
        return (
            <h4>
                You need to be logged in to see this page.
            </h4>
        )
    };

    // function for follow button
    const followHandler = async () => {
        if(buttonState === 'Follow'){
            try {
                const { data } = await follow({
                    variables: { followId: user._id }
                });

                user.followers = data.followUser.followers
            } catch(e) {
                
            }
            
            setButtonState('Unfollow');
        } else {
            try {
                const { data } = await unfollow({
                    variables: { unfollowId: user._id }
                });

                user.followers = data.unfollowUser.followers
            } catch(e) {
                
            }

            setButtonState('Follow');
        }
    }
    return (
        <>
            <Nav />
            <div className='mt-3'>
                <div className='profile-header container'>
                    <div className='row six columns'>
                        <h1 className='profile-name'>{user.username}</h1>
                        <h5 className='ml-3'>The Esteemed</h5>    
                    </div>
                    <div className='row six columns text-end'>
                        <h3>Followers: {user.followers.length}</h3>
                        <h3 className='ml-5'>Following: {user.following.length}</h3>  
                        {userParam && (
                            <button type='button' className={`ml-5 ${buttonState}`} onClick={followHandler}>{buttonState}</button>
                        )}      
                    </div>
                </div>
            </div>
            <div className='container'>
                <h2>Reviews: {user.reviews.length}</h2>
                <TierList reviews={user.reviews}/>
            </div>
            <Footer />
        </>
    )
}

export default Profile;