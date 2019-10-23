import ActionTypes from '../actions/ActionTypes';
import { ServiceAccountPage } from './State';

const serviceAccountState = {
    items: [],
    isListLoading: false
};
export default (state: ServiceAccountPage = serviceAccountState, action: any): ServiceAccountPage => {
    switch (action.type) {
        case ActionTypes.INIT_SERVICEACCOUNT_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_SERVICEACCOUNT:
            return { ...state, items: action.payload, isListLoading: false };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isListLoading: false };
        default:
            return state;
    }
}