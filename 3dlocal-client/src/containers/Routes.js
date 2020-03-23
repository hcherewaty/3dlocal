import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../components/Home';
import Auth from '../components/Auth';
import { authUser } from '../store/actions/auth';

//rendering a function that renders the component at that path; pass along props from react router
const Routes = (props) => {
    return (
        <div className='container'>
            <Switch>
                <Route exact path='/' render={props => <Home {...props} />} />
                <Route exact path='/signin' render={props => {
                    return (
                        <Auth auth={authUser} button='Log in' heading='Welcome back!' {...props}/>
                    )
                }} />
                <Route exact path='/signup' render={props => {
                    return (
                        <Auth auth={authUser} SignUp button='Sign up' heading='Join the 3DLocal.' {...props}/>
                    )
                }} />
            </Switch>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}
//export a default withRouter to get props from router to component and export connection to redux store
export default withRouter(connect(mapStateToProps, null)(Routes));