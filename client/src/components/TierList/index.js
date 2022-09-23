import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blackstar from '../../assets/white-star.png';

function TierList({ reviews }) {
    
    let fiveStarReviews = [];
    let fourStarReviews = [];
    let threeStarReviews = [];
    let twoStarReviews = [];
    let oneStarReviews = [];

    reviews.forEach(review => {
        if(review.starRating === 5){fiveStarReviews.push(review)}
        if(review.starRating === 4){fourStarReviews.push(review)}
        if(review.starRating === 3){threeStarReviews.push(review)}
        if(review.starRating === 2){twoStarReviews.push(review)}
        if(review.starRating === 1){oneStarReviews.push(review)}
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
                                    
                                    <img src={review.day.image} className='item-image inline' alt='item'></img>
                                    <Link to={'/past/'.concat(review.day._id)}><h6>{review.day.item}</h6></Link>  
                                    
                                    <div className='extra-info'>
                                        <Link className='no-decorate' to={'/review/'.concat(review._id)}>
                                            <p>“{review.body}„</p>
                                        </Link>
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
                                    <img src={review.day.image} className='item-image' alt='item'></img>
                                    <Link to={'/past/'.concat(review.day._id)}><h6>{review.day.item}</h6></Link>

                                    <div className='extra-info'>
                                        <Link className='no-decorate' to={'/review/'.concat(review._id)}>
                                            <p>“{review.body}„</p>
                                        </Link>
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
                                    <img src={review.day.image} className='item-image' alt='item'></img>
                                    <Link to={'/past/'.concat(review.day._id)}><h6>{review.day.item}</h6></Link>

                                    <div className='extra-info'>
                                        <Link className='no-decorate' to={'/review/'.concat(review._id)}>
                                            <p>“{review.body}„</p>
                                        </Link>
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
                                    <img src={review.day.image} className='item-image' alt='item'></img>
                                    <Link to={'/past/'.concat(review.day._id)}><h6>{review.day.item}</h6></Link>

                                    <div className='extra-info'>
                                        <Link className='no-decorate' to={'/review/'.concat(review._id)}>
                                            <p>“{review.body}„</p>
                                        </Link>
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
                                    <img src={review.day.image} className='item-image' alt='item'></img>
                                    <Link to={'/past/'.concat(review.day._id)}><h6>{review.day.item}</h6></Link>
                                    

                                    <div className='extra-info'>
                                        <Link className='no-decorate' to={'/review/'.concat(review._id)}>
                                            <p>“{review.body}„</p>
                                        </Link>
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