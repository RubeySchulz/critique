import React, { useEffect, useState } from 'react';
import blackstar from '../../assets/black-star.png';
import whitestar from '../../assets/white-star.png';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { QUERY_ME_LIKED } from '../../utils/queries';
import { LIKE_REVIEW, UNLIKE_REVIEW } from '../../utils/mutations';
import liked from '../../assets/like-black.png';
import notliked from '../../assets/like-white.png';

function Review({ review, item }) {
    const [star, setStar] = useState({ one: blackstar, two: whitestar, three: whitestar, four: whitestar, five: whitestar });
    const [data, setData] = useState(review);
    const word = item || data.day.item
    const [likeState, setLiked] = useState(notliked);
    const [copied, setCopied] = useState('Share');

    useEffect(() => {
        starHandler();
        setData(review);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const {data: meData, refetch} = useQuery(QUERY_ME_LIKED);
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
                const { data:newData } = await likeReview({
                    variables: { reviewId: data._id }
                });
                setLiked(liked);
                setData({...data, likes: newData.likeReview.likes})
                refetch();
            } catch(e){
                console.error(e);
            }
        } else {
            try{
                const { data:newData } = await unlikeReview({
                    variables: { reviewId: data._id }
                });
                setLiked(notliked);
                setData({...data, likes: newData.unlikeReview.likes})
                refetch();
            } catch(e){
                console.error(e);
            }
        }
    }

    return (
        
        <div className="d-flex flex-wrap">
            <div>
                <Link className='no-decorate' to={'/profile/'.concat(data.user.username)} >
                    <h1 className='inline'>{data.user.username}</h1><h6 className='inline ml-3 mr-3'>{data.user.title}</h6>  
                </Link>
                
            </div>
            
            <div className='stars-review p-0'>
                <img src={star.one} alt='star'></img>
                <img src={star.two} alt='star'></img>
                <img src={star.three} alt='star'></img>
                <img src={star.four} alt='star'></img>
                <img src={star.five} alt='star'></img>
                
            </div>
            {window.location.href.includes('review') ? (
            <h4 className='row twelve columns'>{data.body}</h4>
            ) : (
            <Link className='no-decorate' to={'/review/'.concat(data._id)}>
                <h4 className='row twelve columns'>{data.body}</h4>
            </Link>    
            )}
            <section className='inline'>
                {data.likes !== undefined && (
                    <h5 className='inline mr-3'>{data.likes}</h5>
                )}
                <button className='like' onClick={likeHandler}><img src={likeState} alt='like'></img></button>
                <button className='like ml-5' onClick={() => {
                    navigator.clipboard.writeText('"' + data.body + '" - ' + data.user.username + ' ' + new Date().getFullYear() + ', critique of ' + word + `. \n https://critiquedaily.herokuapp.com/review/` + data._id)
                    setCopied('Copied!');
                }
                }>{copied}</button>
            </section>
        </div>
    )
}

export default Review;