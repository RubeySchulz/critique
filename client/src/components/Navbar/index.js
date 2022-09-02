import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <header>
            <Link to='/'>
                <h1>Critique</h1>
            </Link>
        </header>
    )
};

export default Nav;