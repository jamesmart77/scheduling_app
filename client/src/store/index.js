import { combineReducers } from 'redux';
import { currentUser, initialLoad, allUsers } from './user/reducer';
import { ownedGroups } from './group/reducer';
import { loginUnauthorized, 
        isAuthenticated, 
        isEmailAvailable, 
        isServerError, 
        unauthorized,
        addUserToGroupErrpr } from './responseHandler/reducer';

const rootReducer = combineReducers({
    currentUser,
    initialLoad,
    allUsers,
    loginUnauthorized,
    isAuthenticated,
    isEmailAvailable,
    isServerError,
    unauthorized,
    ownedGroups,
    addUserToGroupErrpr
});

export default rootReducer;