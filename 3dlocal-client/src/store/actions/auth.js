import { apiCall } from '../../services/api';
import { SET_CURRENT_USER } from '../action-types';
import { addErr, removeErr } from '../actions/errors';

//set current user from api call in authUser
//dispatch and send to redux reducer
export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
}

//to sign up or sign in - takes signin or signup and user data
//api call needs to finish before dispatching anything - promise inside thunk
export function authUser(type, userData){
    console.log('Auth type:', type, 'Data:', userData)
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `/api/auth/${type}`, userData)
            .then( ({token, ...user}) => {
                console.log('Token:', token, 'User:', user)
                localStorage.setItem('jwtToken', token);
                dispatch(setCurrentUser(user));
                //remove any previous errrrrr's
                dispatch(removeErr());
                resolve(); // API call 👍
                })
                .catch( err => {
                    //oopsie dispatch an errrrr
                    dispatch(addErr(err.message));
                    reject(); //API call 👎
                })
        });
    };
}