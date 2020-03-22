import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className='home left'>
                <h1>Welcome to 3DLocal! <span role='img' aria-label='wave emoji'>👋</span></h1>
                <span>Post or find 3D printing opportunities in your community.</span>
                <h4>New around here?</h4>
                <Link to='/signup' className='btn btn-primary'>
                    Create an account
                </Link>
            </div>
            <div className='home right'></div>
        </div>
    );
}

export default Home