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
        case ActionTypes.LOAD_YARDAREA:
            return { ...state, virtualServices: action.payload };
        case ActionTypes.FILL_YARDAREAGATEAREADROPDOWNLIST:
            return { ...state, gateways: action.payload };
        case ActionTypes.FILL_YARDAREASERVICEDROPDOWNLIST:
            return { ...state, services: action.payload };
            case ActionTypes.FILL_YARDAREASHIPYARDDROPDOWNLIST:
                    return { ...state, deployments: action.payload };
        default:
            return state;
    }
}