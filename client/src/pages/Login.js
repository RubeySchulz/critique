import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN } from '../utils/mutations';
import auth from '../utils/auth';


function Login() {
    const [loginState, setLoginState] = useState({ email: '', password: ''});
    const [signupState, setSignupState] = useState({ username: '', email: '', password: '' });
    const [addUser] = useMutation(ADD_USER);
    const [login] = useMutation(LOGIN);

    const loginChange = (e) => {
        const { name, value } = e.target;
        setLoginState({
            ...loginState,
            [name]: value
        });
    }

    const signupChange = (e) => {
        const { name, value } = e.target;
        setSignupState({
            ...signupState,
            [name]: value
        });
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({
                variables: { ...loginState }
            });

            auth.login(data.login.token);
        } catch(e) {
            console.error(e);
        }
    }

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addUser({
                variables: { ...signupState }
            });

            auth.login(data.addUser.token);
        } catch(e) {
            console.error(e);
        }
    }

    return (
        <div>
            <div className='container text-center'>
                <h1>Login</h1>
                <form onSubmit={handleLoginSubmit}>
                    <input type="email" name="email" placeholder="Email" value={loginState.email} onChange={loginChange} required />

                    <input type="password" name="password" placeholder="Password" value={loginState.password} onChange={loginChange} required />

                    <button type="submit">Login</button>
                </form>    
            </div>
            
            <div className='container text-center'>
                <h1>Signup</h1>
                <form onSubmit={handleSignupSubmit}>
                    <input type="text" name="username" placeholder="Username" value={signupState.username} onChange={signupChange} required />

                    <input type="email" name="email" placeholder="Email" value={signupState.email} onChange={signupChange} required />

                    <input type="password" name="password" placeholder="Password" value={signupState.password} onChange={signupChange} required />

                    <button type="submit">Signup</button>
                </form>    
            </div>
        </div>
    )
}

export default Login;