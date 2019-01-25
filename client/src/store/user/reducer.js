import * as types from './actionTypes';
import initialState from './initialState';

export function currentUser(state = initialState.currentUser, action = {}) {
    switch (action.type) {
        case types.CURRENT_USER_LOGIN:
            return state.merge(action.currentUser);
        default:
            return state;
    }
}