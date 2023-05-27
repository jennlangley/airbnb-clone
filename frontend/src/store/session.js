import { csrfFetch } from "./csrf";

const SET_SESSION = 'session/setSession';
const REMOVE_SESSION = 'session/removeSession';

export const setSessionAction = (user) => {
    return {
        type: SET_SESSION,
        user
    };
};

export const removeSessionAction = () => {
    return {
        type: REMOVE_SESSION,
    };
};

export const setSession = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    if (response.ok) {
        const session = await response.json();
        dispatch(setSessionAction(user));
        return session;
    };
};

export const restoreSession = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');
    if (response.ok) {
        const session = await response.json();
        dispatch(setSessionAction(session.user));
        return response;
    };
}

export const signupUser = (user) => async (dispatch) => {
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    if (response.ok) {
        const session = await response.json();
        dispatch(setSessionAction(session.user));
        return session.user;
    };
};

export const logoutUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(removeSessionAction());
        return response;
    };
};

const sessionReducer = (state = {user: null}, action) => {
    let newState = { ...state }
    switch (action.type) {
        case SET_SESSION:
            newState.user = action.user;
            return newState;
        case REMOVE_SESSION:
            newState.user = null;
            return newState;
        default:
            return newState;
    }
};

export default sessionReducer;