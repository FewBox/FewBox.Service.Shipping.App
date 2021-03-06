import ActionTypes from '../actions/ActionTypes';
import { DestinationRulePage } from './State';
import { IPayloadAction } from '../actions/Action';

const destinationRuleState = {
    items: [],
    selectedDestinationRule: { subsets: [], deployments: [] },
    services: [],
    deployments: [],
    isListLoading: false
};
export default (state: DestinationRulePage = destinationRuleState, action: IPayloadAction<any>): DestinationRulePage => {
    switch (action.type) {
        case ActionTypes.INIT_DESTINATIONRULE_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_DESTINATIONRULE:
            return { ...state, items: action.payload, isListLoading: false };
        case ActionTypes.FILL_DESTINATIONRULE_SERVICE_DROPDOWNLIST:
            return { ...state, services: action.payload };
        case ActionTypes.FILL_SELECTED_DESTINATIONRULE:
            return { ...state, selectedDestinationRule: action.payload };
        case ActionTypes.HIDE_DRAWER:
            return { ...state, selectedDestinationRule: { subsets: [], deployments: [] } };
        case ActionTypes.FILL_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST:
            return { ...state, deployments: action.payload };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isListLoading: false };
        default:
            return state;
    }
}