import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

    const [clickedItem, setClicked] = useState(null)

    const clickHandler = (e) => {
        if(clickedItem != null){
            const old = document.getElementById(clickedItem);
            old.className ='tier-item'
        }

        if(e.target.id === clickedItem){
            setClicked(null);
            return;
        }
        setClicked(e.target.id)
        e.target.className = 'tier-item clicked';
    }
    
    return (
        <div>
            <section className='container-full tier-list'>
                <div id='tierFive' className='row flex tier-row'>
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
                                <div key={review._id} className='tier-item' id={review._id} onClick={clickHandler}>
                                    
                                    <img src={review.day.image} className='item-image inline' alt='item image'></img>
                                    <Link to={'/past/'.concat(review.day._id)}><h6>{review.day.item}</h6></Link>  
                                    
                                    <div className='extra-info no-pointer'>
                                        <p className='no-pointer'>“{review.body}„</p>
                                    </div>
                                </div>
                            ))
                        }    
                    </div>
                </div>
                <div id='tierFour' className='row flex tier-row'>
                    <div className='tier-label row two columns flex'>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                    </div>
                    <div className='tier-content row ten columns flex'>
                        {fourStarReviews && 
                            fourStarReviews.map(review => (
                                <div key={review._id} className='tier-item' id={review._id} onClick={clickHandler}>
                                    <img src={review.day.image} className='item-image' alt='item image'></img>
                                    <Link to={'/past/'.concat(review.day._id)}><h6>{review.day.item}</h6></Link>

                                    <div className='extra-info no-pointer'>
                                        <p className='no-pointer'>“{review.body}„</p>
                                    </div>
                                </div>
                            ))
                        }    
                    </div>
                </div>
                <div id='tierThree' className='row flex tier-row'>
                    <div className='tier-label row two columns flex'>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                    </div>
                    <div className='tier-content row ten columns flex'>
                        {threeStarReviews && 
                            threeStarReviews.map(review => (
                                <div key={review._id} className='tier-item' id={review._id} onClick={clickHandler}>
                                    <img src={review.day.image} className='item-image' alt='item image'></img>
                                    <Link to={'/past/'.concat(review.day._id)}><h6>{review.day.item}</h6></Link>

                                    <div className='extra-info no-pointer'>
                                        <p className='no-pointer'>“{review.body}„</p>
                                    </div>
                                </div>
                            ))
                        }    
                    </div>
                </div>
                <div id='tierTwo' className='row flex tier-row'>
                    <div className='tier-label row two columns flex'>
                        <img src={blackstar} alt='star'></img>
                        <img src={blackstar} alt='star'></img>
                    </div>
                    <div className='tier-content row ten columns flex'>
                        {twoStarReviews && 
                            twoStarReviews.map(review => (
                                <div key={review._id} className='tier-item' id={review._id} onClick={clickHandler}>
                                    <img src={review.day.image} className='item-image' alt='item image'></img>
                                    <Link to={'/past/'.concat(review.day._id)}><h6>{review.day.item}</h6></Link>

                                    <div className='extra-info no-pointer'>
                                        <p className='no-pointer'>“{review.body}„</p>
                                    </div>
                                </div>
                            ))
                        }    
                    </div>
                </div>
                <div id='tierOne' className='row flex tier-row'>
                    <div className='tier-label row two columns flex'>
                        <img src={blackstar} alt='star'></img>
                    </div>
                    <div className='tier-content row ten columns flex'>
                        {oneStarReviews && 
                            oneStarReviews.map(review => (
                                
                                <div key={review._id} className='tier-item' id={review._id} onClick={clickHandler}>
                                    <img src={review.day.image} className='item-image' alt='item image'></img>
                                    <Link to={'/past/'.concat(review.day._id)}><h6>{review.day.item}</h6></Link>
                                    

                                    <div className='extra-info no-pointer'>
                                        <p className='no-pointer'>“{review.body}„</p>
                                    </div>
                                </div>
                            ))
                        }    
                    </div>
                </div>
            </section>
            <section className='item-info'>
                <div>
                    
                </div>
            </section>
        </div>
    )
}

export default TierList;