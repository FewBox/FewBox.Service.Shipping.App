import ActionTypes from '../actions/ActionTypes';
import { PodPage } from './State';

const podState = {
    pods: [],
    serviceAccounts: []
};
export default (state: PodPage = podState, action: any): PodPage => {
    switch (action.type) {
        case ActionTypes.LOAD_CONTAINERSHIP:
            return { ...state, pods: action.payload };
        case ActionTypes.FILL_CONTAINERSHIPSERVICEACCOUNTDROPDOWNLIST:
            return { ...state, serviceAccounts: action.payload };
        default:
            return state;
    }
}