import * as types from './actionTypes';
import api from '../../api/service';

export function loginCurrentUser() {
    return async(dispatch) => {
        try {
            const currentUser = api.loginCurrentUser();
            dispatch({ type: types.CURRENT_USER_LOGIN, currentUser});
        } catch (error) {
            console.error("Error logging in current user: ", error);
            // TODO: add response handler error message dispatch here
        }
    }
}