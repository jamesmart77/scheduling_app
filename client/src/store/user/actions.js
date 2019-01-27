import * as types from './actionTypes';
import * as api from '../../api/service';

export function loginCurrentUser(email, password) {
    return async(dispatch) => {
        try {
            let credentials = {
                'email': email,
                'password': password
            };
            const currentUser = await api.loginCurrentUser(credentials);
            dispatch({ type: types.CURRENT_USER_LOGIN, currentUser});
        } catch (error) {
            console.error("Error logging in current user: ", error);
            // TODO: add response handler error message dispatch here
        }
    }
}