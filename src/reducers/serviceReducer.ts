import ActionTypes from '../actions/ActionTypes';
import { ServicePage } from './State';

const serviceState = {
    services: [],
    isListLoading: false
};
export default (state: ServicePage = serviceState, action: any): ServicePage => {
    switch (action.type) {
        case ActionTypes.INIT_SERVICE_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_SERVICE:
            return { ...state, services: action.payload, isListLoading: false };
        default:
            return state;
    }
}