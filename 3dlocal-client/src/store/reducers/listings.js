import { SHOW_LISTINGS, DELETE_LISTING } from '../action-types';

export const listings (state = [], action) => {
    switch (action.type) {
        case SHOW_LISTINGS:
            return [...action.listings];
            default: 
            return state;
    }
};