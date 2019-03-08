import * as groupActionTypes from './actionTypes';
import * as responseHandlerActionTypes from '../responseHandler/actionTypes';
import * as responseHandlerActions from '../responseHandler/actions';
import * as api from '../../api/service';

export function createGroup(newGroup) {
    return async(dispatch) => {
        try {
            const ownedGroups = await api.createGroup(newGroup);
            dispatch({ type: groupActionTypes.GROUPS, ownedGroups});
        } catch (error) {
            console.error("Error creating group: ", error);
            dispatch(responseHandlerActions.errorHandler(error));
            
            //additional error needed for managing local state loading spinner
            throw new Error(error);
        }
    }
}


export function addUserToGroup(userEmail, groupId) {
    return async(dispatch) => {
        try {
            const ownedGroups = await api.addUserToGroup(userEmail, groupId);
            console.log("New Owned Groups: ", ownedGroups);
            dispatch({ type: groupActionTypes.GROUPS, ownedGroups});
        } catch (error) {
            console.error("Add user to group error: ", error);
            dispatch(responseHandlerActions.errorHandler(error));
            throw new Error(error);
        }
    }
}