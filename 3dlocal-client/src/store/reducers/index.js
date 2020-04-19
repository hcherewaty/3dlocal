import {combineReducers} from 'redux';
import currentUser from './current-user';
import listings from './listings';
import errors from './errors';

const rootReducer = combineReducers ({
    currentUser,
    listings,
    errors
});

export default rootReducer;