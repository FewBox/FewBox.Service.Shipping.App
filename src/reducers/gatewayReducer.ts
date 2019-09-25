import ActionTypes from '../actions/ActionTypes';
import { GatewayPage } from './State';

const gatewayState = {
    gateways: []
};
export default (state: GatewayPage = gatewayState, action: any): GatewayPage => {
    switch (action.type) {
        case ActionTypes.LOAD_GATEAREA:
            return { ...state, gateways: action.payload };
        default:
            return state;
    }
}