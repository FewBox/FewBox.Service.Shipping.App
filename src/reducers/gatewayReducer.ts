import ActionTypes from '../actions/ActionTypes';
import { GatewayPage } from './State';

const gatewayState = {
    gateways: [],
    isListLoading: false
};
export default (state: GatewayPage = gatewayState, action: any): GatewayPage => {
    switch (action.type) {
        case ActionTypes.INIT_GATEWAY_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_GATEWAY:
            return { ...state, gateways: action.payload, isListLoading: false };
        default:
            return state;
    }
}