import React, { useState, useEffect } from 'react';
import Nav from '../components/Navbar';
import blackstar from '../assets/black-star.png';
import whitestar from '../assets/white-star.png';
import { checkDay } from '../utils/handleDays';

function Home() {
    useEffect(() => {
        const data = async () => {
            await checkDay().then(response => {console.log(response)});
        }
        data();
    }, []);

    return (
        <>
            <Nav></Nav>
            <div className='container text-center daily-image'>
                <h1 className='image-text-center'>TEACHER</h1>
                <img className='w-100 mb-2' src='https://marvel-b1-cdn.bc0a.com/f00000000026007/resilienteducator.com/wp-content/uploads/2014/11/math-teacher.jpg' alt='currentDayImage'></img>
            </div>
            <div className='container text-center'>
                <form>
                    <div className='row col-12'>
                        <textarea className='w-100' name='review' placeholder='What are you thinkin pal?'></textarea>    
                    </div>
                    <div className='row col-12 justify-content-between'>
                        <div className='col-6'>
                            <button><img src={blackstar} alt='black star'></img></button>
                            
                            <img src={blackstar} alt='black star'></img>
                            <img src={blackstar} alt='black star'></img>
                            <img src={blackstar} alt='black star'></img>
                            <img src={blackstar} alt='black star'></img>
                        </div>
                        <div className='col-6'>
                            <button className='justify-content-end' type='submit'>Submit</button>  
                        </div>
                    </div>
                </form>
            </div>
        </>
        
    )
}

export default Home;