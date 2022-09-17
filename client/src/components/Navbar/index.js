import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from'../../assets/logo.gif';
import auth from '../../utils/auth';
import { useQuery } from '@apollo/client';

import { QUERY_ME } from '../../utils/queries';
import menu from '../../assets/menu-30.svg'

function Nav({ length }) {
    const [modalState, setModal] = useState(false);

    const {data} = useQuery(QUERY_ME);
    
    let following = [];
    useEffect(() => {
        following = data?.me.following
    }, [data])
    console.log(following)
    useEffect(() => {
        const modal = document.getElementById('side-modal')
        modal.className = 'side-modal ' + modalState;
    }, [modalState])

    const logout = () => {
        auth.logout();
    }

    return (
    <>
        <header className='flex flex-wrap justify-content-between'>
            <button onClick={() => setModal(!modalState)}><img src={menu} /></button>
            
            <div>
                <Link to='/'>
                    <img className='logo' src={logo} alt='logo'/>
                    
                </Link>   
                <h4 className='inline'> {length}</h4>
            </div>
            <Link to='/' onClick={logout} >
                <h1>Logout</h1>
            </Link>
        </header>

        <div id='side-modal' className='side-modal' onMouseLeave={() => setModal(!modalState)}>
            <div className='modal-content'>
                <Link to='/profile'><h1>Profile</h1></Link>   
                <Link to='/'><h1>Settings</h1></Link> 
                <input type='text' placeholder='Find Critics'></input>
                <div className='following-list'>
                    <h3>Mayvis</h3>
                    <h3>Ruben</h3>
                </div>
            </div>
        </div>
    </>
        

    )
};

export default Nav;