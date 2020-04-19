import { apiCall } from '../../services/api';
import { addErr } from './errors';
import { SHOW_LISTINGS, DELETE_LISTING } from '../action-types';

export const showListings = (listings) => ({
    type: SHOW_LISTINGS,
    listings
});

export const deleteListing = (listing) => ({
    type: DELETE_LISTING
});

export const fetchListings = () => {
    return dispatch => {
        return apiCall('GET', '/api/listings')
        .then( res => {
            dispatch(showListings(res))
        })
        .catch( err => {
            addErr(err.message)
        });
    };
};

