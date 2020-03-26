import { ADD_ERROR, REMOVE_ERROR } from '../action-types';

//err functions that return actions

export const addErr = error => ({
    type: ADD_ERROR,
    error
})

export const removeErr = () => ({
    type: REMOVE_ERROR
})