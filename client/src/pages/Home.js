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

import { getMeta } from '../utils/imgValidation';

function Home() {
    // grabs parameters
    const { id: dayId } = useParams();
    // the main pages information state
    const [info, setInfo] = useState({ word: '', image: '', length: 0 });
    // static star position (initialStars), and the current stars position while hovering (stars)
    const [initialStars, setInitialStars] = useState({ star1: whitestar, star2: whitestar, star3: whitestar, star4: whitestar, star5: whitestar })
    const [stars, setStars] = useState(initialStars);
    // states for current review content for the mutation, the addReview mutation, and the state of whether to show the review list (reviewSubmitted)
    const [reviewContent, setReviewContent] = useState({ body: '', starRating: null, user: '', day: '' });
    const [addReview] = useMutation(ADD_REVIEW);
    const [reviewSubmitted, setReviewSubmitted] = useState();
    // state for current reviews, and popular reviews. same list different sorting
    const [currentReviews, setReviewState] = useState([]);
    const [popularReviews, setPopularReviews] = useState([]);

    // loads all of the Day data
    const { loading, data } = useQuery(GET_DAY, {
        variables: { dayId: reviewContent.day },
        skip: !reviewContent.day
    })


    // useEffect for true home page
    // sets which number day we are on, and sets the days ID in reviewContent as well as current user
    useEffect(() => {
        const getDayData = async () => {
            let response;
            // if on home screen
            if(!dayId){
                response =  await checkDay();
                const number = await getDayNumber(response._id);
                setInfo({ word: response.item, image: response.image, length: number });
                setReviewContent({ ...reviewContent, day: response._id, user: auth.getProfile().data._id })
            }
            // if on past day screen
            if(dayId){
                const number = await getDayNumber(dayId);
                setInfo({ ...info, length: number });
                setReviewContent({ ...reviewContent, day: dayId, user: auth.getProfile().data._id })
            }
            
        }

        getDayData();
    }, [dayId]); // eslint-disable-line react-hooks/exhaustive-deps

    // useEffect for past days
    useEffect(() => {
        if(data){
            setInfo({...info, word: data.day.item, image: data.day.image});
            const check = data.day.reviews.filter(review => {
                if(review.user._id === reviewContent.user){
                    return review
                }
                return null;
            });
            try {
                if(check[0].body) {
                    setReviewSubmitted(true);
                }    
            } catch(e) {
                setReviewSubmitted(false);
            }
            console.log(data.day.reviews)
            setCurrentReviews(data.day.reviews);     
        }
    }, [data, reviewSubmitted]); // eslint-disable-line react-hooks/exhaustive-deps

    // Sorts reviews whenever the reviews list is updated
    const setCurrentReviews = (reviews) => {
        const arrayForSort = [...reviews];
        const sorted = arrayForSort.sort(
            (A, B) => Number(B.createdAt) - Number(A.createdAt)
        );
        setReviewState(sorted);

        const popularSorted = arrayForSort.sort(
            (A, B) => Number(B.likes) - Number(A.likes)
        )
        setPopularReviews(popularSorted);
    };

    // sets review stars based on id of the star hovered, which has the rating info in it.
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

    // changes initial position of stars to the current rating so it stays static.
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

    // handles when you hover over the stars (temporarily changes the stars while mouse is hovering)
    const starMouseEnter = (e) => {
        starLogic(e.target.id);
    };

    // changes stars back to their initial position.
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

    // sends mutation to server with form information, and changes review submitted to true to show the reviews list.
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

    // shows loading screen when there is no data loaded yet
    if(loading && !data){
        return (<h1>loading</h1>)
    }

    return (
        <>
            <Nav length={'#' + info.length}></Nav>
            <div className='container'>
                <div className='row text-center daily-image mt-3 mb-3'>
                    <img className='main-image twelve columns' src={info.image} alt='currentDayImage'></img>
                    <h1 className='image-text-center'>{info.word}</h1>
                </div>
                {!reviewSubmitted ?
                <div className='row'>
                    <form className='twelve columns' onSubmit={submitReview}>
                        <div>
                            <textarea className='twelve columns home' name='body' placeholder='What are you thinkin pal?' value={reviewContent.body} onChange={reviewChange}></textarea>    
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
                <div>
                    <div className='row six columns justify-content-center'>
                        <h1>Recent Reviews</h1>
                        <ReviewList reviews={currentReviews} item={info.word} />
                    </div>
                    <div className='row six columns justify-content-center'>
                        <h1>Popular Reviews</h1>
                        <ReviewList reviews={popularReviews} item={info.word} />
                    </div>    
                </div>
                
                }
            </div>
            <Footer />
        </>
    )    
};

export default Home;