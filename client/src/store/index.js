import { combineReducers } from 'redux';
import { currentUser } from './user/reducer';
import { loginUnauthorized, isAuthenticated } from './responseHandler/reducer';
//import other reducers here

const rootReducer = combineReducers({
    currentUser,
    loginUnauthorized,
    isAuthenticated
});

export default rootReducer;