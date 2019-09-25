import ActionTypes from '../actions/ActionTypes';
import { ServiceAccountPage } from './State';

const serviceAccountState = {
    serviceAccounts: []
};
export default (state: ServiceAccountPage = serviceAccountState, action: any): ServiceAccountPage => {
    switch (action.type) {
        case ActionTypes.LOAD_SERVICEACCOUNT:
            return { ...state, serviceAccounts: action.payload };
        default:
            return state;
    }
}