import React from 'react';
import Nav from '../components/Navbar';

import { useParams } from 'react-router-dom';


import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { GET_REPLY, GET_REVIEW_INFO } from '../utils/queries';

function SingleReply() {
    const { replyId, id: reviewId } = useParams();

    const {data: replyData} = useQuery(GET_REPLY, {
        variables: { replyId }
    })

    const {data: reviewData} = useQuery(GET_REVIEW_INFO, {
        variables: { reviewId }
    })

    console.log(replyData);
    console.log(reviewData)
    return (
        <>
            <Nav></Nav>
            <h1>hiii</h1>
        </>
        
    )
}

export default SingleReply;