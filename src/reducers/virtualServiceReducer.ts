import ActionTypes from '../actions/ActionTypes';
import { VirtualServicePage } from './State';

const virtualServiceState = {
    virtualServices: [],
    gateways: [],
    services: [],
    deployments: []
};
export default (state: VirtualServicePage = virtualServiceState, action: any): VirtualServicePage => {
    switch (action.type) {
        case ActionTypes.LOAD_VIRTUALSERVICE:
            return { ...state, virtualServices: action.payload };
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