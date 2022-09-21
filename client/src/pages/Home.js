import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import ReviewList from '../components/ReviewList';

import blackstar from '../assets/black-star.png';
import whitestar from '../assets/white-star.png';

import { checkDay, getDayNumber, fixImg } from '../utils/handleDays';
import auth from '../utils/auth';
import { GET_DAY } from '../utils/queries';
import { ADD_REVIEW } from '../utils/mutations';

function Home() {
    const { id: dayId } = useParams();

    const { loading, data } = useQuery(GET_DAY, {
        variables: { dayId },
        skip: !dayId
    })

    const [info, setInfo] = useState({ word: '', image: '', length: 0 });

    const [initialStars, setInitialStars] = useState({ star1: whitestar, star2: whitestar, star3: whitestar, star4: whitestar, star5: whitestar })
    const [stars, setStars] = useState(initialStars);

    const [reviewContent, setReviewContent] = useState({ body: '', starRating: null, user: '', day: '' });
    const [addReview] = useMutation(ADD_REVIEW);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    const [currentReviews, setReviewState] = useState([]);

    useEffect(() => {
        const currentData = async () => {
            let response;
            if(!dayId){
                response =  await checkDay()
            }
            if(data){
                response = data.day
            }
            if(response !== undefined){
                const number = await getDayNumber(response._id);      
                const user = auth.getProfile().data._id
                setInfo({ word: response.item, image: response.image, length: number });
                setReviewContent({ ...reviewContent, day: response._id, user: user })
                const check = response.reviews.filter(review => {
                    if(review.user._id === user){
                        return review
                    }
                    return null;
                });
                if(check[0].body) {
                    setReviewSubmitted(true);
                }
                setCurrentReviews(response.reviews);
                
            }
        }

        currentData();
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    const setCurrentReviews = (reviews) => {
        const arrayForSort = [...reviews];
        const sorted = arrayForSort.sort(
            (A, B) => Number(B.createdAt) - Number(A.createdAt)
        );
        setReviewState(sorted);
    };

    const starLogic = (id) => {
        let starNumber = id
        starNumber = parseInt(starNumber.split('star')[1]);

        if(starNumber === 1){
            setStars({ star1: blackstar, star2: whitestar, star3: whitestar, star4: whitestar, star5: whitestar });
        }
        if(starNumber === 2){
            setStars({ star1: blackstar, star2: blackstar, star3: whitestar, star4: whitestar, star5: whitestar });
        }
        if(starNumber === 3){
            setStars({ star1: blackstar, star2: blackstar, star3: blackstar, star4: whitestar, star5: whitestar });
        }
        if(starNumber === 4){
            setStars({ star1: blackstar, star2: blackstar, star3: blackstar, star4: blackstar, star5: whitestar });
        }
        if(starNumber === 5){
            setStars({ star1: blackstar, star2: blackstar, star3: blackstar, star4: blackstar, star5: blackstar });
        }
    };

    const starClickHandler = (e) => {
        e.preventDefault();
        let starRating = e.target.id
        starRating = parseInt(starRating.split('star')[1]);

        setReviewContent({
            ...reviewContent,
            starRating
        });

        starLogic(e.target.id);
        setInitialStars(stars);
    };

    const starMouseEnter = (e) => {
        starLogic(e.target.id);
    };

    const starMouseLeave = (e) => {
        setStars({ ...initialStars });
    };

    const reviewChange = (e) => {
        const {name, value } = e.target;

        setReviewContent({
            ...reviewContent,
            [name]: value
        });
    };

    const submitReview = async (e) => {
        e.preventDefault();

        try {
            const { data } = await addReview({
                variables: { ...reviewContent }
            })
            setCurrentReviews(data.addReview.reviews);
        } catch(e) {
            console.error(e);
        }

        setReviewSubmitted(true);
    };

    const brokenImg = async () => {
        const fixedImg = await fixImg(info.word, reviewContent.day);
        setInfo({ ...info, image: fixedImg });
    }

    if(!info.word || !info.image){
        return (
            <h1>Loading...</h1>
        )
    };

    if(loading){
        return (<h1>loading</h1>)
    }
    
    return (
        <>
            <Nav length={'#' + info.length}></Nav>
            <div className='container'>
                <div className='row text-center daily-image mt-3 mb-3'>
                    <img onError={brokenImg} className='main-image twelve columns' src={info.image} alt='currentDayImage'></img>
                    <h1 className='image-text-center'>{info.word}</h1>
                </div>
                {!reviewSubmitted ?
                <div className='row'>
                    <form className='twelve columns' onSubmit={submitReview}>
                        <div>
                            <textarea className='twelve columns' name='body' placeholder='What are you thinkin pal?' value={reviewContent.body} onChange={reviewChange}></textarea>    
                        </div>
                        <div className='row'>
                            <div className=' six columns stars'>
                                <img onClick={starClickHandler} onMouseEnter={starMouseEnter} onMouseLeave={starMouseLeave} id='star1' src={stars.star1} alt='star'></img>
                                <img onClick={starClickHandler} onMouseEnter={starMouseEnter} onMouseLeave={starMouseLeave} id='star2' src={stars.star2} alt='star'></img>
                                <img onClick={starClickHandler} onMouseEnter={starMouseEnter} onMouseLeave={starMouseLeave} id='star3' src={stars.star3} alt='star'></img>
                                <img onClick={starClickHandler} onMouseEnter={starMouseEnter} onMouseLeave={starMouseLeave} id='star4' src={stars.star4} alt='star'></img>
                                <img onClick={starClickHandler} onMouseEnter={starMouseEnter} onMouseLeave={starMouseLeave} id='star5' src={stars.star5} alt='star'></img>
                            </div>
                            <div className='six columns end'>
                                <button type='submit'>Submit</button>  
                            </div>
                        </div>
                    </form>
                </div>  
                : 
                <div className='row justify-content-center'>
                    <ReviewList reviews={currentReviews} />
                </div>
                }
            </div>
            <Footer />
        </>
    )    
};

export default Home;