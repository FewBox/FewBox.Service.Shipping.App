import ActionTypes from '../actions/ActionTypes';
import { DestinationRulePage } from './State';
import { IPayloadAction } from '../actions/Action';

const destinationRuleState = {
    selectedDestinationRule: { subsets: [], deployments: [] },
    destinationRules: [],
    services: [],
    deployments: []
};
export default (state: DestinationRulePage = destinationRuleState, action: IPayloadAction<any>): DestinationRulePage => {
    switch (action.type) {
        case ActionTypes.LOAD_DESTINATIONRULE:
            return { ...state, destinationRules: action.payload };
        case ActionTypes.FILL_STACKPOLICYSERVICEDROPDOWNLIST:
            return { ...state, services: action.payload };
        case ActionTypes.FILL_SELECTEDSTACKPOLICY:
            return { ...state, selectedDestinationRule: action.payload };
        case ActionTypes.HIDE_DRAWER:
            return { ...state, selectedDestinationRule: { subsets: [], deployments: [] } };
        case ActionTypes.FILL_STACKPOLICYSHIPYARDDROPDOWNLIST:
            return { ...state, deployments: action.payload };
        default:
            return state;
    }
}