import ActionTypes from '../actions/ActionTypes';
import { DeploymentPage } from './State';
import { RegistryType } from './RegistryType';

const deploymentState = {
    selectedDeployment: { images: [] },
    items: [],
    serviceAccounts: [],
    secrets: [],
    registryType: RegistryType.None,
    isListLoading: false
};
export default (state: DeploymentPage = deploymentState, action: any): DeploymentPage => {
    switch (action.type) {
        case ActionTypes.INIT_DEPLOYMENT_PAGE:
            return { ...state, isListLoading: true };
        case ActionTypes.LOAD_DEPLOYMENT:
            return { ...state, items: action.payload, isListLoading: false };
        case ActionTypes.FILL_SELECTED_DEPLOYMENT:
            return { ...state, selectedDeployment: action.payload };
        case ActionTypes.FILL_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST:
            return { ...state, serviceAccounts: action.payload };
        case ActionTypes.FILL_DEPLOYMENT_SECRET_DROPDOWNLIST:
            return { ...state, secrets: action.payload };
        case ActionTypes.SHOW_MESSAGE:
            return { ...state, isListLoading: false };
        case ActionTypes.FILL_SELFIMAGE_DROPDOWNLIST:
            return { ...state, images: action.payload };
        case ActionTypes.FILL_HUBIMAGE_DROPDOWNLIST:
            var images = action.payload.results.map((result, index) => {
                return `${result.namespace}/${result.name}`;
            });
            return { ...state, images: images };
        case ActionTypes.FILL_DEPLOYMENT_SELFREGISTRY_IMAGEVERSION_DROPDOWNLIST:
            return { ...state, versions: action.payload };
        case ActionTypes.FILL_DEPLOYMENT_HUBREGISTRY_IMAGEVERSION_DROPDOWNLIST:
            let versions = action.payload.results.map((result, index) => {
                return result.name;
            });
            return { ...state, versions: versions };
        case ActionTypes.SWITCH_DOCKERREGISTRY:
            return { ...state, registryType: action.value };
        default:
            return state;
    }
}