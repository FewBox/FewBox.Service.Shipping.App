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
        case ActionTypes.FILL_DESTINATIONRULE_SERVICE_DROPDOWNLIST:
            return { ...state, services: action.payload };
        case ActionTypes.FILL_SELECTEDDESTINATIONRULE:
            return { ...state, selectedDestinationRule: action.payload };
        case ActionTypes.HIDE_DRAWER:
            return { ...state, selectedDestinationRule: { subsets: [], deployments: [] } };
        case ActionTypes.FILL_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST:
            return { ...state, deployments: action.payload };
        default:
            return state;
    }
}