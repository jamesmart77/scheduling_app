import { combineReducers } from 'redux';
import { currentUser } from './user/reducer';
//import other reducers here

const rootReducer = combineReducers({
    currentUser,
});

export default rootReducer;