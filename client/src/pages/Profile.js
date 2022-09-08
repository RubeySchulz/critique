import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import TierList from '../components/TierList';
import Nav from '../components/Navbar';

import { QUERY_ME, GET_USER } from '../utils/queries';
import auth from '../utils/auth';

function Profile() {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? GET_USER : QUERY_ME, {
        variables: { username: userParam }
    });

    const user = data?.user || data?.me || {};

    if(auth.loggedIn() && auth.getProfile().data.username === userParam) {
        return <Navigate to='/profile' />;
    };

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

    return (
        <>
            <Nav />
            <div>
                
            </div>
        </>
    )
}

export default Profile;