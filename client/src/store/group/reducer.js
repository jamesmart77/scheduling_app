import * as types from './actionTypes';
import initialState from './initialState';

export function groups(state = initialState.groups, action = {}) {
    switch (action.type) {
        case types.GROUPS:
            return action.groups;
        default:
            return state;
    }
}