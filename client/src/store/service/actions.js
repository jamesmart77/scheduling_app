import * as groupActionTypes from '../group/actionTypes';
import * as responseHandlerActionTypes from '../responseHandler/actionTypes';
import * as responseHandlerActions from '../responseHandler/actions';
import * as api from '../../api/service';

export function createService(newService, groupId, userId) {
    return async(dispatch) => {
        try {
            let serviceObj = {
                title: newService,
                ownerId: userId
            }
            const ownedGroups = await api.createService(serviceObj, groupId);
            dispatch({ type: groupActionTypes.GROUPS, ownedGroups});
        } catch (error) {
            console.error("Error creating service: ", error);
            dispatch(responseHandlerActions.errorHandler(error));
            
            //additional error needed for managing local state loading spinner
            throw new Error(error);
        }
    }
}