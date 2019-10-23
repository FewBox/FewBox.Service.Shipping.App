import ActionTypes from '../actions/ActionTypes';
import { NamespacePage } from './State';

const namespaceState = {
    items: [],
    isListLoading: false
};
export default (state: NamespacePage = namespaceState, action: any): NamespacePage => {
    switch (action.type) {
        case ActionTypes.INIT_NAMESPACE_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_NAMESPACE:
            return { ...state, items: action.payload, isListLoading: false };
        case ActionTypes.ENABLE_ISTIOSTATUS:
            var namespaces = state.items.map((item, index) => {
                if (item.name == action.value) {
                    return { ...item, isIstioInjected: true };
                }
                else {
                    return item;
                }
            });
            return { ...state, items: namespaces };
        case ActionTypes.DISABLE_ISTIO:
            var namespaces = state.items.map((item, index) => {
                if (item.name == action.value) {
                    return { ...item, isIstioInjected: false };
                }
                else {
                    return item;
                }
            });
            return { ...state, items: namespaces };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isListLoading: false };
        default:
            return state;
    }
}