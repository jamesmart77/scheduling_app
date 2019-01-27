import * as types from './actionTypes';
import initialState from './initialState';

export function loginUnauthorized(state = initialState.loginUnauthorized, action = {}) {
    switch (action.type) {
        case types.LOGIN_UNAUTHROIZED:
            return true;
        case types.RESET:
            return false;
        default:
            return state;
    }
}