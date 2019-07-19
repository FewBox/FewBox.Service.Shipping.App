import ActionTypes from '../actions/ActionTypes';
import { ShippingLanePage } from './State';

const shippingLaneState = {
    shippingLanes: []
};
export default (state: ShippingLanePage = shippingLaneState, action: any): ShippingLanePage => {
    switch (action.type) {
        case ActionTypes.LOAD_SHIPPINGLANEPAGE:
            return { ...state, shippingLanes: action.payload };
        case ActionTypes.ADD_SHIPPINGLANE:
            return { ...state, shippingLanes: [{ name: action.value, isIstioInjected: true }, ...state.shippingLanes] };
        case ActionTypes.REMOVE_SHIPPINGLANE:
            var shippingLanes = state.shippingLanes.filter((item, index) => {
                if (item.name == action.value) {
                }
                else {
                    return item;
                }
            });
            return { ...state, shippingLanes: shippingLanes };
        case ActionTypes.ENABLE_ISTIOSTATUS:
            var shippingLanes = state.shippingLanes.map((item, index) => {
                if (item.name == action.value) {
                    return { ...item, isIstioInjected: true };
                }
                else {
                    return item;
                }
            });
            return { ...state, shippingLanes: shippingLanes };
        case ActionTypes.DISABLE_ISTIO:
            var shippingLanes = state.shippingLanes.map((item, index) => {
                if (item.name == action.value) {
                    return { ...item, isIstioInjected: false };
                }
                else {
                    return item;
                }
            });
            return { ...state, shippingLanes: shippingLanes };
        default:
            return state;
    }
}