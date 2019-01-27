import * as userActionTypes from './actionTypes';
import * as responseHandlerActionTypes from '../responseHandler/actionTypes';
import * as api from '../../api/service';

export function loginCurrentUser(email, password) {
    return async(dispatch) => {
        try {
            let credentials = {
                'email': email,
                'password': password
            };
            const currentUser = await api.loginCurrentUser(credentials);
            dispatch({ type: userActionTypes.CURRENT_USER_LOGIN, currentUser});
        } catch (error) {
            console.error("Error logging in current user: ", error);
            dispatch({ type: responseHandlerActionTypes.LOGIN_UNAUTHROIZED})
        }
    }
}