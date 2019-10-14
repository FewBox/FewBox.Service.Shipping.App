import ActionTypes from '../actions/ActionTypes';
import { PodPage } from './State';

const podState = {
    pods: [],
    serviceAccounts: [],
    isListLoading: false
};
export default (state: PodPage = podState, action: any): PodPage => {
    switch (action.type) {
        case ActionTypes.INIT_POD_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_POD:
            return { ...state, pods: action.payload, isListLoading: false };
        case ActionTypes.FILL_POD_SERVICEACCOUNT_DROPDOWNLIST:
            return { ...state, serviceAccounts: action.payload };
        default:
            return state;
    }
}