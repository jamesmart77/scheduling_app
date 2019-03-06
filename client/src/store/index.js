import { combineReducers } from 'redux';
import { currentUser, initialLoad, allUsers } from './user/reducer';
import { ownedGroups } from './group/reducer';
import { loginUnauthorized, isAuthenticated, isEmailAvailable, isServerError, unauthorized } from './responseHandler/reducer';
//import other reducers here

const rootReducer = combineReducers({
    currentUser,
    initialLoad,
    allUsers,
    loginUnauthorized,
    isAuthenticated,
    isEmailAvailable,
    isServerError,
    unauthorized,
    ownedGroups
});

export default rootReducer;