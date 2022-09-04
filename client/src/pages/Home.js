import React, { useState, useEffect } from 'react';
import Nav from '../components/Navbar';
import blackstar from '../assets/black-star.png';
import whitestar from '../assets/white-star.png';
import { checkDay } from '../utils/handleDays';

function Home() {
    const [info, setInfo] = useState({ word: '', image: '' });

    useEffect(() => {

        const data = async () => {
            await checkDay().then(response => {
                if(response !== undefined){
                    setInfo({ word: response.item, image: response.image });
                    
                }
            });
        }
        data();
        
    }, []);

    if(!info.word || !info.image){
        return (
            <h1>loading</h1>
        )
    } else {
        return (
            <>
                <Nav></Nav>
                <div className='container text-center daily-image'>
                    <h1 className='image-text-center'>{info.word}</h1>
                    <img className='w-100 mb-2' src={info.image} alt='currentDayImage'></img>
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


    
}

export default Home;