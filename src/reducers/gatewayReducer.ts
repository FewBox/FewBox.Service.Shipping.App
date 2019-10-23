import ActionTypes from '../actions/ActionTypes';
import { GatewayPage } from './State';

const gatewayState = {
    items: [],
    isListLoading: false
};
export default (state: GatewayPage = gatewayState, action: any): GatewayPage => {
    switch (action.type) {
        case ActionTypes.INIT_GATEWAY_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_GATEWAY:
            return { ...state, items: action.payload, isListLoading: false };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isListLoading: false };
        default:
            return state;
    }
}