import { apiCall } from '../../services/api';
import { SET_CURRENT_USER } from '../action-types';

//dispatch and send to redux reducer
export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
}

//to sign up or sign in - takes signin or signup and user data
//api call needs to finish before dispatching anything
export function authUser(type, userData){
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `/api/auth/${type}`, userData)
            .then( ({token, ...user}) => {
                localStorage.setItem('jwtToken', token);
                dispatch(setCurrentUser(user));
                resolve();
                }
            );
        });
    };
}
