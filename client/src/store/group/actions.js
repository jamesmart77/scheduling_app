import * as groupActionTypes from './actionTypes';
import * as responseHandlerActionTypes from '../responseHandler/actionTypes';
import * as responseHandlerActions from '../responseHandler/actions';
import * as api from '../../api/service';

export function createGroup(newGroup) {
    return async(dispatch) => {
        try {
            const ownedGroups = await api.createGroup(newGroup);
            console.log("New Owned Groups: ", ownedGroups);
            dispatch({ type: groupActionTypes.GROUPS, ownedGroups});
        } catch (error) {
            console.error("Error creating group: ", error);
            dispatch(responseHandlerActions.errorHandler(error));

            //additional error needed for managing local state loading spinner
            throw new Error(error);
        }
    }
}