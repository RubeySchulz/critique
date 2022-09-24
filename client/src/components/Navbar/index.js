import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from'../../assets/logo.gif';
import auth from '../../utils/auth';
import { useQuery, useLazyQuery } from '@apollo/client';

import { QUERY_ME, ALL_USERS } from '../../utils/queries';
import menu from '../../assets/menu-30.svg'
import aw from '../../assets/aw.mp4';

function Nav({ length }) {
    const [modalState, setModal] = useState(false);
    const [search, setSearch] = useState('');
    const [video, setVideo] = useState(false);

    const {data, refetch} = useQuery(QUERY_ME);
    
    const [loadSearch, {loading, data: searchData}] = useLazyQuery(ALL_USERS, {
        variables: { username: search },
        skip: !search
    });

    let following = data?.me.following || [];

    useEffect(() => {
        refetch();
        const modal = document.getElementById('side-modal')
        modal.className = 'side-modal ' + modalState;
    }, [modalState, refetch])

    const logout = () => {
        auth.logout();
    }

    const searchChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value)
        if(search.length > 1){
            loadSearch();
        }
    }

    const playVideo = () => {
        setVideo(true);
    }

    return (
    <>
        {video && (
            <video id='vid' className='video' controls loop autoplay><source src={aw} type='video/mp4' /></video>
        )}
        <header className='flex flex-wrap justify-content-between'>
            <button onClick={() => setModal(!modalState)}><img src={menu} alt='hamburger' /></button>
            <div>
                <Link to='/'>
                    <img className='logo' src={logo} alt='logo'/>
                </Link>   
                <h4 className='inline no-select length'> {length}</h4>    
            </div>
            <button onClick={playVideo} className='ooo-whats-this no-decorate'></button>
        </header>

        <div id='side-modal' className='side-modal' onMouseLeave={() => setModal(!modalState)}>
            <div className='modal-content'>
                <div className='top-content'>
                    <Link to='/profile'><h1>Profile</h1></Link>   
                    <Link to='/'><h1>Settings</h1></Link>     
                </div>
                <div className='search'>
                    <input type='text' placeholder='Find Critics' value={search} onChange={searchChange}></input>
                    <div className='following-list'>
                        {loading && (<h3>loading...</h3>)}
                        {searchData && searchData.users.map(user => (
                            <div key={user.username}>
                                <Link to={'/profile/'.concat(user.username)} >
                                    <h4>{user.username}</h4>
                                    {user.title && (
                                        <h6 className='inline'>{user.title}</h6>
                                    )}
                                </Link>   
                            </div>
                        ))}
                    </div>
                </div>
                <div className='following-list'>
                    
                    <h1>Following:</h1>
                    {following && following.map(follower => (
                        <div className='follower' key={follower._id}>
                            <Link to={'/profile/'.concat(follower.username)} >
                                <h4>{follower.username}</h4>
                                {follower.title && (
                                    <h6 className='inline'>{follower.title}</h6>
                                )}
                            </Link>
                            
                        </div>
                    ))}
                </div>
                <Link className='logout' to='/' onClick={logout} >
                    <h1>Logout</h1>
                </Link>
            </div>
        </div>
    </>
        

    )
};

export default Nav;