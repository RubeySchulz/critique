import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <header className='container'>
            <Link to='/' className='row'>
                <h1 className='text-center'>Critique</h1>
            </Link>
        </header>
    )
};

export default Nav;