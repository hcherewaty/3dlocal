import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../components/Home';
//rendering a function that renders the component at that path; pass along props from react router
const Routes = (props) => {
    return (
        <div className='container'>
            <Switch>
                <Route exact path='/' render={props => <Home {...props} />} />
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