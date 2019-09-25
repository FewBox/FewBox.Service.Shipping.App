import ActionTypes from '../actions/ActionTypes';
import { NodePage } from './State';

const nodeState = {
    nodes: []
};
export default (state: NodePage = nodeState, action: any): NodePage => {
    switch (action.type) {
        case ActionTypes.LOAD_COUNTRY:
            return { ...state, nodes: action.payload };
        default:
            return state;
    }
}