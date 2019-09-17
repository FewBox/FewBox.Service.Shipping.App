import ActionTypes from '../actions/ActionTypes';
import { StackPolicyPage } from './State';

const stackPolicyState = {
    stackPolicies: []
};
export default (state: StackPolicyPage = stackPolicyState, action: any): StackPolicyPage => {
    switch (action.type) {
        case ActionTypes.LOAD_STACKPOLICY:
            return { ...state, stackPolicies: action.payload };
        default:
            return state;
    }
}