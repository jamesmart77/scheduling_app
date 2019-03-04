import { combineReducers } from 'redux';
import { currentUser, initialLoad } from './user/reducer';
import { ownedGroups } from './group/reducer';
import { loginUnauthorized, isAuthenticated, isEmailAvailable, isServerError } from './responseHandler/reducer';
//import other reducers here

const rootReducer = combineReducers({
    currentUser,
    initialLoad,
    loginUnauthorized,
    isAuthenticated,
    isEmailAvailable,
    isServerError,
    ownedGroups
});

export default rootReducer;