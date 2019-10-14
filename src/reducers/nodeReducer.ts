import ActionTypes from '../actions/ActionTypes';
import { NodePage } from './State';

const nodeState = {
    nodes: [],
    isListLoading: false
};
export default (state: NodePage = nodeState, action: any): NodePage => {
    switch (action.type) {
        case ActionTypes.INIT_JOB_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_NODE:
            return { ...state, nodes: action.payload, isListLoading: false };
        default:
            return state;
    }
}