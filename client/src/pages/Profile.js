import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import TierList from '../components/TierList';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';

import { QUERY_ME, QUERY_GET_USER } from '../utils/queries';
import auth from '../utils/auth';

function Profile() {
    const { username: userParam } = useParams();
    
    const { loading, error, data } = useQuery(userParam ? QUERY_GET_USER : QUERY_ME, {
        variables: { username: userParam }
    })

    const user = data?.user || data?.me || {};

    if(auth.loggedIn() && auth.getProfile().data.username === userParam) {
        return <Navigate to='/profile' />;
    };

    if(loading) {
        return <h1>Loading...</h1>
    };

    if(!user?.username) {
        console.log(error)
        return (
            <h4>
                You need to be logged in to see this page.
            </h4>
        )
    };

    return (
        <>
            <Nav />
            <div className='mt-3'>
                <div className='profile-header container justify-content-center'>
                    <div className='row flex profile-content'>
                        <div>
                            <h1 className='profile-name'>{user.username}</h1>
                            <h5 className='ml-3'>The Esteemed</h5>    
                        </div>
                        <div>
                            <h3>Followers: #</h3>
                            <h3 className='ml-3'>Following: #</h3>    
                        </div>
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