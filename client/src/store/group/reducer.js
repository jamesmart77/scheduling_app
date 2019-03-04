import * as types from './actionTypes';
import initialState from './initialState';

export function ownedGroups(state = initialState.ownedGroups, action = {}) {
    switch (action.type) {
        case types.GROUPS:
            return action.ownedGroups;
        default:
            return state;
    }
}