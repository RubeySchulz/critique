import React from 'react';
import Review from '../Review';


function ReviewList({ reviews }) {
    if(!reviews.length){
        return <h3>No reviews yet</h3>
    }
    return (
        <div>
            <h1>Reviews</h1>
            {reviews.map(review => (
                <div key={review._id}>
                    <Review data={review} />
                </div>
            ))}
        </div>
    )
}

export default ReviewList;