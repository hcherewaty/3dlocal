import React from 'react';
import { Link } from 'react-router-dom';

// import Printer from '../images/3dprintring_demo1.png';
import Printer from '../images/3dprinting_demo1.png';

const Homepage = () => {
    return (
        <div>
            <div className='centered'>
                <h1>Welcome to 3DLocal!</h1>
                <span>Find 3D printing opportunities in your community.</span>
            </div>
            <div className='home left'>
                <div className='centered'>
                    <h4>New to 3DLocal?</h4>
                    <Link to='/signup' className='btn btn-primary'>
                        Create an account
                    </Link>
                </div>
            <div className='home right'>
                <div className='centered'>
                    <img src={Printer} alt='3d printing cartoon'/>
                </div>
            </div>
        </div>
    </div>
        
    );
}

export default Homepage