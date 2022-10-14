import React, { useState } from 'react';
import Nav from '../components/Navbar';
import Review from '../components/Review';
import Reply from '../components/Reply';

import line from '../assets/line.png';

import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { GET_REPLY, GET_REVIEW_INFO } from '../utils/queries';
import { ADD_NESTED_REPLY } from '../utils/mutations';

function SingleReply() {
    const { replyId, id: reviewId } = useParams();
    const [reviewContent, setReviewContent] = useState('')
    const [addNestedReply] = useMutation(ADD_NESTED_REPLY);

    const {loading: loadingReply, data: replyData} = useQuery(GET_REPLY, {
        variables: { replyId }
    })

    const {loading: loadingReview, data: reviewData} = useQuery(GET_REVIEW_INFO, {
        variables: { reviewId }
    })

    console.log(replyData);
    const reviewChange = (e) => {
        const {value} = e.target;

        setReviewContent(value);
    };

    const submitReply = async (e) => {
        e.preventDefault();
        
        try{
            const {data} = await addNestedReply({
                variables: { reviewId, body: reviewContent, replyId }
            })

            console.log(data);
        } catch(e){
            console.error(e);
        }
        
        setReviewContent('');
    }

    if(loadingReply || loadingReview) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <>
            <Nav></Nav>
            <div className='container'>
                <div className='row'>
                    <Review review={reviewData.review}></Review>
                </div>
                <img className='ml-5 line' src={line} alt='line'></img>
                <div className='row'>
                    <h1 className='inline'>{replyData.reply.user.username}</h1> <p className='inline'>{replyData.reply.user.title}</p>
                    <br/>
                    <h2>{replyData.reply.body}</h2>
                    <form onSubmit={submitReply}>
                        <textarea className='reply' name='body' placeholder='give em a piece of your mind' value={reviewContent} onChange={reviewChange}></textarea>
                        <button type='submit'>Submit</button>
                    </form>
                    <div className='container'>
                        {replyData.reply.replies.length > 0 && replyData.reply.replies.map(reply => (
                            <div key={reply._id}>
                                <Reply reply={reply} reviewId={reviewData._id}></Reply>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
        </>
        
    )
}

export default SingleReply;