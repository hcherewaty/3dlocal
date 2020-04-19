import { apiCall, setHeader } from '../../services/api';
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

export function setToken(token){
    return setHeader(token);
}

//to sign up or sign in - takes signin or signup and user data
//api call needs to finish before dispatching anything - promise inside thunk
export function authUser(type, userData){
    console.log('Auth type:', type, 'Data:', userData)
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `/api/auth/${type}`, userData)
            .then( ({token, ...user}) => {
                // console.log('Token:', token, 'User:', user)
                localStorage.setItem('jwtToken', token);
                dispatch(setToken(token));
                dispatch(setCurrentUser(user));
                //remove any previous errrrrr's
                dispatch(removeErr());
                resolve(); // API call 👍
                })
                .catch( err => {
                    //oopsie dispatch an errrrr
                    dispatch(addErr(err.message));
                    console.log('Error msg: ', err.message)
                    reject(); //API call 👎
                })
        });
    };
}

export function signout() {
    return dispatch => {
        localStorage.clear();
        dispatch(setToken(false));
        dispatch(setCurrentUser({}));
    };
}