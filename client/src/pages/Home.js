import React, { useState, useEffect } from 'react';
import Nav from '../components/Navbar';
import blackstar from '../assets/black-star.png';
import whitestar from '../assets/white-star.png';
import { checkDay } from '../utils/handleDays';

function Home() {
    const [info, setInfo] = useState({ word: '', image: '' });

    const [initialStars, setInitialStars] = useState({ star1: whitestar, star2: whitestar, star3: whitestar, star4: whitestar, star5: whitestar })
    const [stars, setStars] = useState(initialStars);

    const [reviewContent, setReviewContent] = useState({ body: '', starRating: null, user: '', day: '' });

    useEffect(() => {

        const data = async () => {
            await checkDay().then(response => {
                if(response !== undefined){
                    setInfo({ word: response.item, image: response.image });
                    setReviewContent({ day: response._id })
                }
            });
        }
        data();
    }, []);

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
    }

    const starClickHandler = (e) => {
        e.preventDefault();

        starLogic(e.target.id);
        setInitialStars(stars);
    };

    const starMouseEnter = (e) => {
        starLogic(e.target.id);
    }

    const starMouseLeave = (e) => {
        setStars({ ...initialStars });
    }


    if(!info.word || !info.image){
        return (
            <h1>Loading...</h1>
        )
    } 

    return (
        <>
            <Nav></Nav>
            <div className='container mt-4'>
                <div className='row text-center daily-image'>
                    <h1 className='image-text-center'>{info.word}</h1>
                    <img className='w-100 mb-2' src={info.image} alt='currentDayImage'></img>
                </div>
                <div className='row justify-content-end'>
                    <form className='row'>
                        <div className='row col-12'>
                            <textarea className='w-100' name='review' placeholder='What are you thinkin pal?'></textarea>    
                        </div>
                        <div className='row col-12 mt-2'>
                            <div className='col-6 stars'>
                                <img onClick={starClickHandler} onMouseEnter={starMouseEnter} onMouseLeave={starMouseLeave} id='star1' src={stars.star1} alt='star'></img>
                                <img onClick={starClickHandler} onMouseEnter={starMouseEnter} onMouseLeave={starMouseLeave} id='star2' src={stars.star2} alt='star'></img>
                                <img onClick={starClickHandler} onMouseEnter={starMouseEnter} onMouseLeave={starMouseLeave} id='star3' src={stars.star3} alt='star'></img>
                                <img onClick={starClickHandler} onMouseEnter={starMouseEnter} onMouseLeave={starMouseLeave} id='star4' src={stars.star4} alt='star'></img>
                                <img onClick={starClickHandler} onMouseEnter={starMouseEnter} onMouseLeave={starMouseLeave} id='star5' src={stars.star5} alt='star'></img>
                            </div>
                            <div className='col-6 text-end'>
                                <button type='submit'>Submit</button>  
                            </div>
                        </div>
                    </form>
                </div>    
            </div>
            
        </>
        
    )    


    
}

export default Home;