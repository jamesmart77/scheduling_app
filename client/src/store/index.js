import { combineReducers } from 'redux';
import { currentUser } from './user/reducer';
import { groups } from './group/reducer';
import { loginUnauthorized, isAuthenticated, isEmailAvailable, isServerError } from './responseHandler/reducer';
//import other reducers here

const rootReducer = combineReducers({
    currentUser,
    loginUnauthorized,
    isAuthenticated,
    isEmailAvailable,
    isServerError,
    groups
});

export default rootReducer;