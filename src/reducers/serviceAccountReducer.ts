import ActionTypes from '../actions/ActionTypes';
import { ServiceAccountPage } from './State';

const serviceAccountState = {
    serviceAccounts: [],
    isListLoading: false
};
export default (state: ServiceAccountPage = serviceAccountState, action: any): ServiceAccountPage => {
    switch (action.type) {
        case ActionTypes.INIT_SERVICEACCOUNT_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_SERVICEACCOUNT:
            return { ...state, serviceAccounts: action.payload, isListLoading: false };
        default:
            return state;
    }
}