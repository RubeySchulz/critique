import React from 'react';


function TierList({ reviews }) {
    return (
        <div>
            {reviews && 
                reviews.map(review => (
                    <div key={review._id}>
                        <h2>item: {review.day.item}</h2>
                        <h2>stars: {review.starRating}</h2>
                        <h2>body: {review.body}</h2>
                        <p>------------------------</p>
                    </div>
                ))
            }    
        </div>
    )
}

export default TierList;