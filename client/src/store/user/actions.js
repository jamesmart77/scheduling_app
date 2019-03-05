import * as userActionTypes from './actionTypes';
import * as groupActionTypes from '../group/actionTypes';
import * as responseHandlerActionTypes from '../responseHandler/actionTypes';
import * as responseHandlerActions from '../responseHandler/actions';
import * as api from '../../api/service';
import cookieGetter from 'cookie-getter';

export function loadUser() {
    return async(dispatch) => {
        try {
            const cookie = cookieGetter('schedAroo_jwt');
            if(cookie){
                const currentUser = await api.loadUser();
                
                dispatch({ type: userActionTypes.CURRENT_USER_LOGIN, currentUser});
                if(currentUser.ownedGroups){
                    const ownedGroups = currentUser.ownedGroups;
                    dispatch({ type: groupActionTypes.GROUPS, ownedGroups});
                }
            }
            
            dispatch({ type: userActionTypes.LOAD_COMPLETE});
        } catch (error) {
            console.error("Loading error: ", error);
            dispatch(responseHandlerActions.errorHandler(error));
        }
    }
}

export function loginCurrentUser(email, password) {
    return async(dispatch) => {
        try {
            let credentials = {
                'email': email,
                'password': password
            };
            const currentUser = await api.loginCurrentUser(credentials);
            dispatch({ type: userActionTypes.CURRENT_USER_LOGIN, currentUser});
            if(currentUser.ownedGroups){
                const ownedGroups = currentUser.ownedGroups;
                dispatch({ type: groupActionTypes.GROUPS, ownedGroups});
            }
        } catch (error) {
            console.error("Error logging in current user: ", error);
            dispatch(responseHandlerActions.errorHandler(error));
            throw new Error(error);
        }
    }
}

export function logoutCurrentUser() {
    return async(dispatch) => {
        try {
            await api.logoutCurrentUser();
            dispatch({ type: userActionTypes.LOGOUT_USER});
        } catch (error) {
            console.error("Error logging out user: ", error);
            throw new Error(error);
        }
    }
}

export function userValidation() {
    return async(dispatch) => {
        try {
            await api.userValidation();
            dispatch({ type: responseHandlerActionTypes.USER_VALIDATION});
        } catch (error) {
            console.error("User validation: ", error);
            dispatch({ type: responseHandlerActionTypes.RESET});
        }
    }
}

export function createUser(newUser) {
    return async(dispatch) => {
        try {
            const currentUser = await api.createUser(newUser);
            dispatch({ type: userActionTypes.CURRENT_USER_LOGIN, currentUser});
        } catch (error) {
            console.error("Error creating and logging in current user: ", error);
            dispatch(responseHandlerActions.errorHandler(error));

            //additional error needed for managing local state loading spinner
            throw new Error(error);
        }
    }
}

export function emailAddressValidation(address) {
    return async(dispatch) => {
        try {
            await api.emailAddressValidation({email: address});
            await dispatch(responseHandlerActions.reset());
        } catch (error) {
            console.error("Error emailAddressValidation: ", error);
            console.log("ERROR: ", error.message)
            await dispatch(responseHandlerActions.errorHandler(error));
        }
    }
}