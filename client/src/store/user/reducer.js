import * as types from './actionTypes';
import initialState from './initialState';

const resetUser = {
    id: 0,
    firstName: '',
    lastName: '',
    email: ''
};

export function currentUser(state = initialState.currentUser, action = {}) {
    switch (action.type) {
        case types.CURRENT_USER_LOGIN:
            return state.merge(action.currentUser);
        case types.LOGOUT_USER:
            return state.merge(resetUser);
        default:
            return state;
    }
}

export function initialLoad(state = initialState.initialLoad, action = {}) {
    switch (action.type) {
        case types.LOAD_COMPLETE:
            return false;
        default:
            return state;
    }
}

export function allUsers(state = initialState.allUsers, action = {}) {
    switch (action.type) {
        case types.ALL_USERS:
            return action.allUsers;
        default:
            return state;
    }
}