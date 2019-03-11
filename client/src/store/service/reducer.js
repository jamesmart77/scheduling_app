import * as types from './actionTypes';
import initialState from './initialState';

export function groupServices(state = initialState.groupServices, action = {}) {
    switch (action.type) {
        case types.SERVICES:
            return action.groupServices;
        default:
            return state;
    }
}