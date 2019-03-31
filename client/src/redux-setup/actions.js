import {
    ACTION_SIGN_IN,
    ACTION_SIGN_OUT,
    ACTION_CREATE_STREAM,
    ACTION_FETCH_STREAMS,
    ACTION_FETCH_STREAM,
    ACTION_DELETE_STREAM,
    ACTION_EDIT_STREAM}
from "../constants/constants";

import history from '../history';

export const actionSignIn = (currentUserId) => {
    return {
        type: ACTION_SIGN_IN,
        payload: currentUserId
    };
};

export const actionSignOut = () => {
    return {
        type: ACTION_SIGN_OUT
    };
};

export const actionCreateStream = (formValues) => async (dispatch, getState) => {
    // add current user id to formValues object
    // so that it gets saved with the newly created stream
    formValues.userId = getState().reducerAuth.currentUserId;

    formValues.title = formValues.title.replace(/\s+/, '-');

    const url = 'http://localhost:3001/streams';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();
    dispatch({type: ACTION_CREATE_STREAM, payload: data});

    // take user to stream list component page
    history.push('/');
};

export const actionFetchStreams = () => async (dispatch) => {
    const url = 'http://localhost:3001/streams';
    const response = await fetch(url);
    const data = await response.json();

    dispatch({type: ACTION_FETCH_STREAMS, payload: data});
};

export const actionFetchStream = (id) => async (dispatch) => {
    const url = `http://localhost:3001/streams/${id}`;
    const response = await fetch(url);
    const data = await response.json();

    dispatch({type: ACTION_FETCH_STREAM, payload: data});
};

export const actionUpdateStream = (id, formValues) => async (dispatch, getState) => {
    const url = `http://localhost:3001/streams/${id}`;
    const requestOptions = {
        method: 'PATCH',       // usee PATCH instead of PUT to only update some fields
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
    };

    const response = await fetch(url, requestOptions);
    const data = await response.json();

    dispatch({type: ACTION_EDIT_STREAM, payload: data});

    // take user to stream list component page
    history.push('/');
};

export const actionDeleteStream = (id) => async (dispatch) => {
    const url = `http://localhost:3001/streams/${id}`;
    const requestOptions = {
        method: 'DELETE',
    };

    await fetch(url, requestOptions);
    dispatch({type: ACTION_DELETE_STREAM, payload: id});

    // take user to stream list component page
    history.push('/');
};