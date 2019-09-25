import ActionTypes from '../actions/ActionTypes';
import { NamespacePage } from './State';

const namespaceState = {
    namespaces: []
};
export default (state: NamespacePage = namespaceState, action: any): NamespacePage => {
    switch (action.type) {
        case ActionTypes.LOAD_NAMESPACE:
            return { ...state, namespaces: action.payload };
        case ActionTypes.ENABLE_ISTIOSTATUS:
            var namespaces = state.namespaces.map((item, index) => {
                if (item.name == action.value) {
                    return { ...item, isIstioInjected: true };
                }
                else {
                    return item;
                }
            });
            return { ...state, namespaces: namespaces };
        case ActionTypes.DISABLE_ISTIO:
            var namespaces = state.namespaces.map((item, index) => {
                if (item.name == action.value) {
                    return { ...item, isIstioInjected: false };
                }
                else {
                    return item;
                }
            });
            return { ...state, namespaces: namespaces };
        default:
            return state;
    }
}