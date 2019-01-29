import * as types from './actionTypes';
import initialState from './initialState';

const resetUser = {
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false
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