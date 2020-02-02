import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import Logo from '../images/Favicon.png'

class Navbar extends Component {
    render(){
        return (
            <nav className='navbar navbar-expand'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <Link to='/' className='navbar-brand'>
                            ABACUS
                            {/* <img src={Logo} alt='3dLocal Home' /> */}
                        </Link>
                    </div>
                    <ul className='nav navbar-nav navbar-right'>
                        <li>
                            <Link to='/signup'>Sign up</Link>
                        </li>
                        <li>
                            <Link to='/signin'>Log in</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state){
    return {
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, null)(Navbar);