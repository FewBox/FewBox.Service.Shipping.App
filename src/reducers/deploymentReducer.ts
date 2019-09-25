import ActionTypes from '../actions/ActionTypes';
import { DeploymentPage } from './State';

const deploymentState = {
    deployments: [],
    serviceAccounts: [],
    secrets: []
};
export default (state: DeploymentPage = deploymentState, action: any): DeploymentPage => {
    switch (action.type) {
        case ActionTypes.LOAD_SHIPYARD:
            return { ...state, deployments: action.payload };
        case ActionTypes.FILL_SHIPYARDSERVICEACCOUNTDROPDOWNLIST:
            return { ...state, serviceAccounts: action.payload };
        case ActionTypes.FILL_SHIPYARDSECRETDROPDOWNLIST:
            return { ...state, secrets: action.payload };
        default:
            return state;
    }
}