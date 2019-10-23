import ActionTypes from '../actions/ActionTypes';
import { ServicePage } from './State';

const serviceState = {
    items: [],
    isListLoading: false
};
export default (state: ServicePage = serviceState, action: any): ServicePage => {
    switch (action.type) {
        case ActionTypes.INIT_SERVICE_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_SERVICE:
            return { ...state, items: action.payload, isListLoading: false };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isListLoading: false };
        default:
            return state;
    }
}