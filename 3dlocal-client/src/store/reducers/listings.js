import { SHOW_LISTINGS, DELETE_LISTING } from '../action-types';

const listings = (state = [], action) => {
    switch (action.type) {
        case SHOW_LISTINGS:
            return [...action.listings];
            default: 
            return state;
    }
};

export default listings;