import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../store/actions/auth';
// import Logo from '../images/Favicon.png'

class Navbar extends Component {

    signout = (e) => {
        e.preventDefault();
        this.props.signout();
    }

    render(){
        return (
            <nav className='navbar navbar-expand'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <Link to='/' className='navbar-brand'>
                            3D LOCAL
                            {/* <img src={Logo} alt='3dLocal Home' /> */}
                        </Link>
                    </div>
                    {this.props.currentUser.isAuthenticated ? (
                        <ul className='nav-navbar-nav navbar-right'>
                            <li>
                                <Link to={`/users/${this.props.currentUser.user.id}/listings/new`}>Post a Listing</Link>
                            </li>
                            <li>
                                <a onClick={this.signout}>Sign out</a>
                            </li>
                        </ul>
                    ) : (
                        <ul className='nav navbar-nav navbar-right'>
                            <li>
                                <Link to='/signup'>Sign up</Link>
                            </li>
                            <li>
                                <Link to='/signin'>Log in</Link>
                            </li>
                        </ul>
                    )}
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

export default connect(mapStateToProps, {signout})(Navbar);