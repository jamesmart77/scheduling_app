import { combineReducers } from 'redux';
import { currentUser, initialLoad } from './user/reducer';
import { groups } from './group/reducer';
import { loginUnauthorized, isAuthenticated, isEmailAvailable, isServerError } from './responseHandler/reducer';
//import other reducers here

const rootReducer = combineReducers({
    currentUser,
    initialLoad,
    loginUnauthorized,
    isAuthenticated,
    isEmailAvailable,
    isServerError,
    groups
});

export default rootReducer;