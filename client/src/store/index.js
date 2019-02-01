import { combineReducers } from 'redux';
import { currentUser } from './user/reducer';
import { loginUnauthorized, isAuthenticated, isEmailAvailable, isServerError } from './responseHandler/reducer';
//import other reducers here

const rootReducer = combineReducers({
    currentUser,
    loginUnauthorized,
    isAuthenticated,
    isEmailAvailable,
    isServerError
});

export default rootReducer;