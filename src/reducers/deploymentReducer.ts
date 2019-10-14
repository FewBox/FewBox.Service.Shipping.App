import ActionTypes from '../actions/ActionTypes';
import { DeploymentPage } from './State';

const deploymentState = {
    deployments: [],
    serviceAccounts: [],
    secrets: [],
    isListLoading: false
};
export default (state: DeploymentPage = deploymentState, action: any): DeploymentPage => {
    switch (action.type) {
        case ActionTypes.INIT_DEPLOYMENT_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_DEPLOYMENT:
            return { ...state, deployments: action.payload, isListLoading: false };
        case ActionTypes.FILL_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST:
            return { ...state, serviceAccounts: action.payload };
        case ActionTypes.FILL_DEPLOYMENT_SECRET_DROPDOWNLIST:
            return { ...state, secrets: action.payload };
        default:
            return state;
    }
}