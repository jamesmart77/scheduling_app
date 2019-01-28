import * as types from './actionTypes';
import initialState from './initialState';

const userReset = {
    firstName: '',
    lastName: '',
    email: '',
    isAdmin: false
}
export function currentUser(state = initialState.currentUser, action = {}) {
    switch (action.type) {
        case types.CURRENT_USER_LOGIN:
            return state.merge(action.currentUser);
        case types.RESET_USER:
            return state.merge(userReset);
        default:
            return state;
    }
}