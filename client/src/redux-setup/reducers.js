import {
    ACTION_SIGN_IN,
    ACTION_SIGN_OUT,
    ACTION_FETCH_STREAM,
    ACTION_CREATE_STREAM,
    ACTION_EDIT_STREAM,
    ACTION_DELETE_STREAM,
    ACTION_FETCH_STREAMS}
from "../constants/constants";
import { removeStreamById, mapKeys } from "../utils/utils";

const initialStateAuth = {
    isSignedIn: null,
    currentUserId: null
};

export const reducerAuth = (state=initialStateAuth, action={}) => {
    switch (action.type) {
        case ACTION_SIGN_IN:
            return Object.assign({}, state, {isSignedIn: true, currentUserId: action.payload});

        case ACTION_SIGN_OUT:
            return Object.assign({}, state, {isSignedIn: false, currentUserId: null});

        default:
            return state;
    }
};

// stream objects are stored in an object instead of an array
// example
/*
    {
        stream1-id: stream1Object,
        stream2-id: stream2Object
    }
*/
export const reducerStreams = (state = {}, action = {}) => {
    switch (action.type) {
        case ACTION_FETCH_STREAM:
        case ACTION_CREATE_STREAM:
        case ACTION_EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};

        case ACTION_DELETE_STREAM:
            return removeStreamById(action.payload, {...state});

        case ACTION_FETCH_STREAMS:
            const obj = mapKeys(action.payload, 'id');
            return {...state, ...obj};
        default:
            return state;
    }
};