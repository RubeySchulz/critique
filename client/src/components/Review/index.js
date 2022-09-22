import React, { useEffect, useState } from 'react';
import blackstar from '../../assets/black-star.png';
import whitestar from '../../assets/white-star.png';
import { Link } from 'react-router-dom';

function Review({ data }) {
    const [star, setStar] = useState({ one: blackstar, two: whitestar, three: whitestar, four: whitestar, five: whitestar });
    let link = `/profile/${data.user.username}`;

    useEffect(() => {
        starHandler();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
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
        <div className="d-flex flex-wrap">
            <div className='row col-3'>
                <Link className='no-decorate' to={link} >
                    <h1 className='inline'>{data.user.username}</h1><h6 className='inline ml-3'>{data.user.title}</h6>  
                </Link>
            </div>
            
            <div className='stars-review row col-9 p-0'>
                <img src={star.one} alt='star'></img>
                <img src={star.two} alt='star'></img>
                <img src={star.three} alt='star'></img>
                <img src={star.four} alt='star'></img>
                <img src={star.five} alt='star'></img>
            </div>
            <Link className='no-decorate' to={'/review/'.concat(data._id)}>
                <h4 className='row col-12'>{data.body}</h4>
            </Link>
        </div>
    )
}

export default Review;