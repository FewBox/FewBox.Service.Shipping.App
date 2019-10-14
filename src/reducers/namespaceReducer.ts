import ActionTypes from '../actions/ActionTypes';
import { NamespacePage } from './State';

const namespaceState = {
    namespaces: [],
    isListLoading: false
};
export default (state: NamespacePage = namespaceState, action: any): NamespacePage => {
    switch (action.type) {
        case ActionTypes.INIT_NAMESPACE_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_NAMESPACE:
            return { ...state, namespaces: action.payload, isListLoading: false };
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