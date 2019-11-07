import ActionTypes from '../actions/ActionTypes';
import { VirtualServicePage } from './State';

const virtualServiceState = {
    items: [],
    selectedVirtualService: { allServices: [], allGateways: [], serviceDeploymentses: [], hosts: [], gateways: [], https: [] },
    gateways: [],
    services: [],
    serviceDeploymentses: [],
    isListLoading: false
};
export default (state: VirtualServicePage = virtualServiceState, action: any): VirtualServicePage => {
    switch (action.type) {
        case ActionTypes.INIT_VIRTUALSERVICE_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_VIRTUALSERVICE:
            return { ...state, items: action.payload, isListLoading: false };
        case ActionTypes.FILL_SELECTED_VIRTUALSERVICE:
            return { ...state, selectedVirtualService: { allServices: action.payload.allServices, allGateways: action.payload.allGateways, serviceDeploymentses: action.payload.serviceDeploymentses, hosts: action.payload.hosts, gateways: action.payload.gateways, https: action.payload.https } };
        case ActionTypes.FILL_SELECTEDVIRTUALSERVICE_DEPLOYMENT:
            return { ...state, selectedVirtualService: { ...(state.selectedVirtualService), serviceDeploymentses: action.payload } };
        case ActionTypes.FILL_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST:
            return { ...state, gateways: action.payload };
        case ActionTypes.FILL_VIRTUALSERVICE_SERVICE_DROPDOWNLIST:
            return { ...state, services: action.payload };
        case ActionTypes.FILL_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST:
            let serviceDeployments = [...state.serviceDeploymentses, action.payload];
            return { ...state, serviceDeploymentses: serviceDeployments };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isListLoading: false };
        default:
            return state;
    }
}