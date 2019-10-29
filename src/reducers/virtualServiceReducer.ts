import ActionTypes from '../actions/ActionTypes';
import { VirtualServicePage } from './State';

const virtualServiceState = {
    items: [],
    selectedVirtualService: { hosts: [], gateways: [], https: [], serviceAllDeployments: [], allGateways: [], allServices: [] },
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
            return { ...state, items: action.payload, isListLoading: false };
        case ActionTypes.FILL_SELECTED_VIRTUALSERVICE:
            return { ...state, selectedVirtualService: { hosts: action.payload.hosts, gateways: action.payload.gateways, allServices: action.payload.services, https: action.payload.https, serviceAllDeployments: [], allGateways: action.payload.allGateways } };
        case ActionTypes.FILL_SELECTEDVIRTUALSERVICE_DEPLOYMENT:
            return { ...state, selectedVirtualService: { ...(state.selectedVirtualService), serviceAllDeployments: action.payload } };
        case ActionTypes.FILL_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST:
            return { ...state, gateways: action.payload };
        case ActionTypes.FILL_VIRTUALSERVICE_SERVICE_DROPDOWNLIST:
            return { ...state, services: action.payload };
        case ActionTypes.FILL_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST:
            return { ...state, deployments: action.payload };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isListLoading: false };
        default:
            return state;
    }
}