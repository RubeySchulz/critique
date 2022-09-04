import React, { useEffect, useState } from 'react';
import blackstar from '../../assets/black-star.png';
import whitestar from '../../assets/white-star.png';

function Review({ data }) {
    const [star, setStar] = useState({ one: blackstar, two: whitestar, three: whitestar, four: whitestar, five: whitestar });
    
    useEffect(() => {
        starHandler();
    }, []);

    
    const starHandler = () => {
        if(data.starRating >= 2){
            setStar({
                ...star,
                two: blackstar,
            });
        }
        if(data.starRating >= 3){
            setStar({
                ...star,
                two: blackstar,
                three: blackstar
            });
        }
        if(data.starRating >= 4){
            setStar({
                ...star,
                two: blackstar,
                three: blackstar,
                four: blackstar
            });
        }
        if(data.starRating >= 5){
            setStar({
                ...star,
                two: blackstar,
                three: blackstar,
                four: blackstar,
                five: blackstar
            });
        }
    }

    return (
        <div className="container d-flex flex-wrap">
            <h1 className='row col-3'>{data.user.username}</h1>
            <div className='stars row col-9 p-0'>
                <img src={star.one} alt='star'></img>
                <img src={star.two} alt='star'></img>
                <img src={star.three} alt='star'></img>
                <img src={star.four} alt='star'></img>
                <img src={star.five} alt='star'></img>
            </div>
            <h2 className='row col-12'>{data.body}</h2>
        </div>
    )
}

export default Review;