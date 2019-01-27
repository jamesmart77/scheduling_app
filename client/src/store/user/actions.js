import * as types from './actionTypes';
import * as api from '../../api/service';

export function loginCurrentUser(email, password) {
    return async(dispatch) => {
        try {
            console.log("made it to the action")
            const currentUser = api.loginCurrentUser(email, password);
            dispatch({ type: types.CURRENT_USER_LOGIN, currentUser});
        } catch (error) {
            console.error("Error logging in current user: ", error);
            // TODO: add response handler error message dispatch here
        }
    }
}