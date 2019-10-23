import ActionTypes from '../actions/ActionTypes';
import { PodPage } from './State';

const podState = {
    items: [],
    serviceAccounts: [],
    isListLoading: false
};
export default (state: PodPage = podState, action: any): PodPage => {
    switch (action.type) {
        case ActionTypes.INIT_POD_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_POD:
            return { ...state, items: action.payload, isListLoading: false };
        case ActionTypes.FILL_POD_SERVICEACCOUNT_DROPDOWNLIST:
            return { ...state, serviceAccounts: action.payload };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isListLoading: false };
        default:
            return state;
    }
}