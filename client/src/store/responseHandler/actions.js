import * as types from './actionTypes';

export function errorHandler(error) {
    return async(dispatch) => {
        const errorMessage = error.message;

        if(error.toString().includes("loginCurrentUser") && error.toString().includes("HTTP status 401")){
            dispatch({ type: types.LOGIN_UNAUTHROIZED});
        } else {
            if(errorMessage.includes("emailAddressValidation") && errorMessage.includes("HTTP status 401")){
                console.log("INSIDE EMAIL ACTION")
                dispatch({ type: types.EMAIL_ADDRESS_AVAILABLE});
            } else {
                if(errorMessage.includes("HTTP status 500")){
                    dispatch({ type: types.SERVER_ERROR});
                }
            }
        }
    }
}

export function reset() {
    return async(dispatch) => {
        dispatch({ type: types.RESET});
    }
}