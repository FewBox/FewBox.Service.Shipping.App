import ActionTypes from '../actions/ActionTypes';
import { VirtualServicePage } from './State';

const virtualServiceState = {
    virtualServices: [],
    gateways: [],
    services: [],
    deployments: [],
    isListLoading: false
};
export default (state: VirtualServicePage = virtualServiceState, action: any): VirtualServicePage => {
    switch (action.type) {
        case ActionTypes.INIT_VIRTUALSERVICE_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_VIRTUALSERVICE:
            return { ...state, virtualServices: action.payload, isListLoading: false };
        case ActionTypes.FILL_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST:
            return { ...state, gateways: action.payload };
        case ActionTypes.FILL_VIRTUALSERVICE_SERVICE_DROPDOWNLIST:
            return { ...state, services: action.payload };
        case ActionTypes.FILL_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST:
            return { ...state, deployments: action.payload };
        default:
            return state;
    }
}