import React, { useEffect, useState } from 'react';
import blackstar from '../../assets/black-star.png';
import whitestar from '../../assets/white-star.png';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_ME_LIKED } from '../../utils/queries';
import { LIKE_REVIEW, UNLIKE_REVIEW } from '../../utils/mutations';
import liked from '../../assets/like-black.png';
import notliked from '../../assets/like-white.png';

function Review({ data, item }) {
    const [star, setStar] = useState({ one: blackstar, two: whitestar, three: whitestar, four: whitestar, five: whitestar });
    let link = `/profile/${data.user.username}`;
    const word = item || data.day.item
    const [likeState, setLiked] = useState(notliked);
    const [copied, setCopied] = useState('Share');

    useEffect(() => {
        starHandler();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let {data: meData} = useQuery(QUERY_ME_LIKED);
    const [likeReview] = useMutation(LIKE_REVIEW);
    const [unlikeReview] = useMutation(UNLIKE_REVIEW);
    
    useEffect(() => {
        if(meData){
            setLiked(notliked)
            meData.me.liked.forEach(like => {
                if(like._id === data._id){
                    setLiked(liked);
                    
                }
            })
            console.log(meData)
        }
        
    }, [meData]); // eslint-disable-line react-hooks/exhaustive-deps

    
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
    };

    const likeHandler = async (e) => {
        e.preventDefault();
        if(likeState === notliked){
            try{
                await likeReview({
                    variables: { reviewId: data._id }
                });
                setLiked(liked);
                meData.me.liked.push([data._id])
                console.log(meData)
            } catch(e){
                console.error(e);
            }
        } else {
            try{
                await unlikeReview({
                    variables: { reviewId: data._id }
                });
                setLiked(notliked);
                meData.me.liked.pop();
                console.log(meData)
            } catch(e){
                console.error(e);
            }
        }
    }

    return (
        <div className="d-flex flex-wrap">
            <div className='row col-3'>
                <Link className='no-decorate' to={link} >
                    <h1 className='inline'>{data.user.username}</h1><h6 className='inline ml-3 mr-3'>{data.user.title}</h6>  
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
                <h4 className='row twelve columns'>{data.body}</h4>
            </Link>
            <section className='inline'>
                <h5 className='inline mr-3'>{data.likes}</h5>
                <button className='like' onClick={likeHandler}><img src={likeState} alt='like'></img></button>
                <button className='like ml-5' onClick={() => {
                    navigator.clipboard.writeText('"' + data.body + '" - ' + data.user.username + ' ' + new Date().getFullYear() + ', critique of ' + word + '. \n www.critique.daily')
                    setCopied('Copied!');
                }
                }>{copied}</button>
            </section>
        </div>
    )
}

export default Review;