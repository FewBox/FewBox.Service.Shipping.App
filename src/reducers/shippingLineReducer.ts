import ActionTypes from '../actions/ActionTypes';
import { ShippingLinePage } from './State';

const shippingLineState = {
    shippingLines: []
};
export default (state: ShippingLinePage = shippingLineState, action: any): ShippingLinePage => {
    switch (action.type) {
        case ActionTypes.LOAD_SHIPPINGLINE:
            return { ...state, shippingLines: action.payload };
        case ActionTypes.ENABLE_ISTIOSTATUS:
            var shippingLines = state.shippingLines.map((item, index) => {
                if (item.name == action.value) {
                    return { ...item, isIstioInjected: true };
                }
                else {
                    return item;
                }
            });
            return { ...state, shippingLines: shippingLines };
        case ActionTypes.DISABLE_ISTIO:
            var shippingLines = state.shippingLines.map((item, index) => {
                if (item.name == action.value) {
                    return { ...item, isIstioInjected: false };
                }
                else {
                    return item;
                }
            });
            return { ...state, shippingLines: shippingLines };
        default:
            return state;
    }
}