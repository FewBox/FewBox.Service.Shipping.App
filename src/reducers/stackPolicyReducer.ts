import ActionTypes from '../actions/ActionTypes';
import { StackPolicyPage } from './State';

const stackPolicyState = {
    selectedStackPolicy: { subsets: [], shipyards: [] },
    stackPolicies: [],
    quayAreas: [],
    shipyards: []
};
export default (state: StackPolicyPage = stackPolicyState, action: any): StackPolicyPage => {
    switch (action.type) {
        case ActionTypes.LOAD_STACKPOLICY:
            return { ...state, stackPolicies: action.payload };
        case ActionTypes.FILL_STACKPOLICYQUAYAREADROPDOWNLIST:
            return { ...state, quayAreas: action.payload };
        case ActionTypes.FILL_STACKPOLICYSHIPYARDDROPDOWNLIST:
            return { ...state, shipyards: action.payload };
        default:
            return state;
    }
}