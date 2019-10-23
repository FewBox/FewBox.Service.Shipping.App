import ActionTypes from '../actions/ActionTypes';
import { NodePage } from './State';

const nodeState = {
    items: [],
    isListLoading: false
};
export default (state: NodePage = nodeState, action: any): NodePage => {
    switch (action.type) {
        case ActionTypes.INIT_NODE_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_NODE:
            return { ...state, items: action.payload, isListLoading: false };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isListLoading: false };
        default:
            return state;
    }
}