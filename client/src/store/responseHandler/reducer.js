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

export function isAuthenticated(state = initialState.isAuthenticated, action = {}) {
    switch (action.type) {
        case types.USER_VALIDATION:
            return true;
        case types.RESET:
            return false;
        default:
            return state;
    }
}

export function unauthorized(state = initialState.unauthorized, action = {}) {
    switch (action.type) {
        case types.UNAUTHORIZED:
            return true;
        case types.RESET:
            return false;
        default:
            return state;
    }
}
export function isEmailAvailable(state = initialState.isEmailAvailable, action = {}) {
    switch (action.type) {
        case types.EMAIL_ADDRESS_AVAILABLE:
            return false;
        case types.RESET:
            return true;
        default:
            return state;
    }
}

export function isServerError(state = initialState.isServerError, action = {}) {
    switch (action.type) {
        case types.SERVER_ERROR:
            return true;
        case types.RESET:
            return false;
        default:
            return state;
    }
}

export function addUserToGroupErrpr(state = initialState.addUserToGroupError, action = {}) {
    switch (action.type) {
        case types.ADD_USER_TO_GROUP_ERROR:
            return true;
        case types.RESET:
            return false;
        default:
            return state;
    }
}