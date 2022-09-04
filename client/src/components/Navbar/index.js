import React from 'react';
import { Link } from 'react-router-dom';
import auth from '../../utils/auth';

function Nav() {
    const logout = () => {
        auth.logout();
    }

    return (
        <header className='d-flex justify-content-between'>
            <Link to='/' className=''>
                <h1>Left Thing</h1>
            </Link>
            <Link to='/' className=''>
                <h1>Critique</h1>
            </Link>
            <Link to='/' onClick={logout} className=''>
                <h1>Logout</h1>
            </Link>

        </header>
    )
};

export default Nav;