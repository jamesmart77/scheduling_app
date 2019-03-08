import * as types from './actionTypes';
import * as userActionTypes from '../user/actionTypes';

export function errorHandler(error) {
    return async(dispatch) => {
        const errorMessage = error.message;

        if((errorMessage.includes("loginCurrentUser") && errorMessage.includes("HTTP status 401")) ||
            (errorMessage.includes("createUser"))){
                dispatch({ type: types.LOGIN_UNAUTHROIZED});
        } else {
            if(errorMessage.includes("userAuthentication") && errorMessage.includes("HTTP status 401")){
                dispatch({ type: types.RESET});
            } else {
                if(errorMessage.includes("HTTP status 403")){
                    dispatch({ type: types.UNAUTHORIZED});
                } else {
                    if (errorMessage.includes("addUserToGroup") && errorMessage.includes("HTTP status 500")){
                        dispatch({ type: types.ADD_USER_TO_GROUP_ERROR})
                    } else {
                        if(errorMessage.includes("emailAddressValidation") && errorMessage.includes("HTTP status 401")){
                            dispatch({ type: types.EMAIL_ADDRESS_AVAILABLE});
                        } else {
                            if(errorMessage.includes("loadUser")) {
                                dispatch({ type: userActionTypes.LOAD_COMPLETE});
                            } else {
                                if(errorMessage.includes("HTTP status 500")){
                                    dispatch({ type: types.SERVER_ERROR});
                                } 
                            }
                        }
                    }
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