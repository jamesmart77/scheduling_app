import * as groupActionTypes from './actionTypes';
import * as responseHandlerActionTypes from '../responseHandler/actionTypes';
import * as responseHandlerActions from '../responseHandler/actions';
import * as api from '../../api/service';

export function createGroup(newGroup) {
    return async(dispatch) => {
        try {
            const groups = await api.createGroup(newGroup);
            dispatch({ type: groupActionTypes.GROUPS, groups});
        } catch (error) {
            console.error("Error creating group: ", error);
            dispatch(responseHandlerActions.errorHandler(error));

            //additional error needed for managing local state loading spinner
            throw new Error(error);
        }
    }
}