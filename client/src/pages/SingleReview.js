import React, { useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Nav from '../components/Navbar';
import Review from '../components/Review';
import Reply from '../components/Reply';


import { GET_REVIEW } from '../utils/queries';
import { ADD_REPLY } from '../utils/mutations';

function SingleReview() {

    const { id: reviewId, replyId } = useParams();
    console.log(reviewId, replyId)
    const [reviewContent, setReviewContent] = useState('')

    const [addReply] = useMutation(ADD_REPLY);

    const {loading, data} = useQuery(GET_REVIEW, {
        variables: { reviewId }
    });


    const reviewChange = (e) => {
        const {value} = e.target;

        setReviewContent(value);
    };

    const submitReview = async (e) => {
        e.preventDefault();
        try {
            await addReply({
                variables: { reviewId, body: reviewContent }
            })

        } catch(e) {
            console.error(e);
        }

        setReviewContent('');
    }

    


    if(loading){
        return (<h1>Loading</h1>)
    }

    return (
        <>
            <Nav></Nav>
            <div className='container mt-5'>
                <section className='row border-bottom'>
                    <div className='row three columns mb-3'>
                        <Link className='no-decorate' to={'/past/'.concat(data.review.day._id)}>
                            <img className='review' src={data.review.day.image} alt='review'></img>
                        </Link>
                        <h1 className='text-center review-title no-select' >{data.review.day.item}</h1>
                    </div>
                    <div className='row nine columns ml-5'>
                        <Review review={data.review}></Review>
                        <form onSubmit={submitReview}>
                            <textarea className='reply' name='body' placeholder='give em a piece of your mind' value={reviewContent} onChange={reviewChange}></textarea>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>    
                </section>
                
                <section className='offset-by-three nine columns'>
                    <div className=''>
                        {data.review.replies.length > 0 && data.review.replies.map(reply => (
                            <div className='border-bottom' key={reply._id}>
                                <Reply reply={reply} reviewId={data.review._id}></Reply>
                            </div>
                        ))}
                    </div>    
                </section>
                
            </div>
        </>
    )
}

export default SingleReview;