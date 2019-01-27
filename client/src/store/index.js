import { combineReducers } from 'redux';
import { currentUser } from './user/reducer';
import { loginUnauthorized } from './responseHandler/reducer';
//import other reducers here

const rootReducer = combineReducers({
    currentUser,
    loginUnauthorized
});

export default rootReducer;