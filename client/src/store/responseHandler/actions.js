import * as types from './actionTypes';

export function errorHandler(error) {
    return async(dispatch) => {
        if(error.toString().includes("loginCurrentUser") && error.toString().includes("HTTP Status 401")){
            dispatch({ type: types.LOGIN_UNAUTHROIZED});
        }
    }
}

export function reset() {
    return async(dispatch) => {
        dispatch({ type: types.RESET});
    }
}