import React from 'react';
import { Link } from 'react-router-dom';
import logo from'../../assets/logo.gif';
import auth from '../../utils/auth';

function Nav({ length }) {
    const logout = () => {
        auth.logout();
    }

    return (
        <header className='flex flex-wrap justify-content-between'>
            <Link to='/profile' className=''>
                <h1>Profile</h1>
            </Link>
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
    )
};

export default Nav;