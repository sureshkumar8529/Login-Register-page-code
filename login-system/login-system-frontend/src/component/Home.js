import React from 'react';
import './Register.css'
import Logout from './Logout';
const Home = () => {
    return (
        <div>
            <h2 className='home'>Home Page</h2>
            <p className='h1'>Welcome! You are successfully logged in.</p>
            <Logout />
        </div>
    );
};

export default Home;
