import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';

import Nav from '../components/Navbar';
import Review from '../components/Review';
import Reply from '../components/Reply';

import { GET_REVIEW } from '../utils/queries';
import { ADD_REPLY } from '../utils/mutations';

function SingleReview() {

    const { id: reviewId } = useParams();
    const [reviewContent, setReviewContent] = useState('')
    const [addReply] = useMutation(ADD_REPLY);

    const {loading, data} = useQuery(GET_REVIEW, {
        variables: { reviewId }
    });

    const reviewChange = (e) => {
        const {value} = e.target;

        setReviewContent(value);
    };
    console.log(data);
    const submitReview = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addReply({
                variables: { reviewId, body: reviewContent }
            })

            console.log(data);
        } catch(e) {
            console.error(e);
        }
    }

    if(loading){
        return (<h1>Loading</h1>)
    }

    return (
        <>
            <Nav></Nav>
            <div className='container'>
                <div>
                    <Review data={data.review}></Review>
                </div>
                <form onSubmit={submitReview}>
                    <textarea className='twelve columns reply' name='body' placeholder='give em a piece of your mind' value={reviewContent.body} onChange={reviewChange}></textarea>
                    <button type='submit'>Submit</button>
                </form>
                <div className='container'>
                    {data.review.replies.length > 0 && data.review.replies.map(reply => (
                        <div className='border-top' key={reply._id}>
                            <Reply reply={reply} reviewId={data.review._id}></Reply>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default SingleReview;