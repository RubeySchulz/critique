import React from 'react';
import blackstar from '../../assets/white-star.png';

function TierList({ reviews }) {
    
    const fiveStarReviews = reviews.filter(review => {
        if(review.starRating === 5){return review}
    });
    const fourStarReviews = reviews.filter(review => {
        if(review.starRating === 4){return review}
    });
    const threeStarReviews = reviews.filter(review => {
        if(review.starRating === 3){return review}
    });
    const twoStarReviews = reviews.filter(review => {
        if(review.starRating === 2){return review}
    });
    const oneStarReviews = reviews.filter(review => {
        if(review.starRating === 1){return review}
    });
    
    return (
        <div>
            <section className='container-full tier-list'>
                <div id='tierFive' className='row flex'>
                    <div className='tier-label row two columns flex'>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                    </div>
                    <div className='tier-content row ten columns flex'>
                        {fiveStarReviews && 
                            fiveStarReviews.map(review => (
                                <div key={review._id} className='tier-item'>
                                    <div className='border'></div>
                                    <img src={review.day.image} className='item-image' alt='item image'></img>
                                    
                                    <h6>{review.day.item}</h6>
                                </div>
                            ))
                        }    
                    </div>
                </div>
                <div id='tierFour' className='row twelve columns flex'>
                    <div className='tier-label row two columns flex'>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                    </div>
                    <div className='tier-content row ten columns flex'>
                        {fourStarReviews && 
                            fourStarReviews.map(review => (
                                <div key={review._id} className='tier-item'>
                                    <div className='border'></div>
                                    <img src={review.day.image} className='item-image' alt='item image'></img>
                                    
                                    <h6>{review.day.item}</h6>
                                </div>
                            ))
                        }    
                    </div>
                </div>
                <div id='tierThree' className='row twelve columns flex'>
                    <div className='tier-label row two columns flex'>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                    </div>
                    <div className='tier-content row ten columns flex'>
                        {threeStarReviews && 
                            threeStarReviews.map(review => (
                                <div key={review._id} className='tier-item'>
                                    <div className='border'></div>
                                    <img src={review.day.image} className='item-image' alt='item image'></img>
                                    
                                    <h6>{review.day.item}</h6>
                                </div>
                            ))
                        }    
                    </div>
                </div>
                <div id='tierTwo' className='row twelve columns flex'>
                    <div className='tier-label row two columns flex'>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                    </div>
                    <div className='tier-content row ten columns flex'>
                        {twoStarReviews && 
                            twoStarReviews.map(review => (
                                <div key={review._id} className='tier-item'>
                                    <div className='border'></div>
                                    <img src={review.day.image} className='item-image' alt='item image'></img>
                                    
                                    <h6>{review.day.item}</h6>
                                </div>
                            ))
                        }    
                    </div>
                </div>
                <div id='tierOne' className='row twelve columns flex'>
                    <div className='tier-label row two columns flex'>
                        <img src={blackstar} alt='star'></img>
                    </div>
                    <div className='tier-content row ten columns flex'>
                        {oneStarReviews && 
                            oneStarReviews.map(review => (
                                <div key={review._id} className='tier-item'>
                                    <div className='border'></div>
                                    <img src={review.day.image} className='item-image' alt='item image'></img>
                                    
                                    <h6>{review.day.item}</h6>
                                </div>
                            ))
                        }    
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TierList;