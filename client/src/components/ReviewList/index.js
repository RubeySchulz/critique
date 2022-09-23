import React from 'react';
import Review from '../Review';


function ReviewList({ reviews, item }) {
    if(!reviews.length){
        return <h3>No reviews yet</h3>
    }
    return (
        <div>
            {reviews.map(review => (
                <div key={review._id} className={!window.location.href.includes('review') && 'border-bottom'}>
                    <Review review={review} item={item} />
                </div>
            ))}
        </div>
    )
}

export default ReviewList;