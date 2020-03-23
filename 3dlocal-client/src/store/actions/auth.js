import { apiCall } from '../../services/api';
import { SET_CURRENT_USER } from '../action-types';

export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
}
