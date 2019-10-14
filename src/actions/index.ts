import { IPayloadAction, IEmptyAction, IAction } from './Action';
import ActionTypes from './ActionTypes';
import { MessageType } from '@fewbox/react-components';
import { SelectedDestinationRule } from '../reducers/State';

// Common
export const empty = (): IEmptyAction => ({
    type: ActionTypes.EMPTY
});
export const redirect = (path: string): IAction<string> => ({
    type: ActionTypes.REDIRECT,
    value: path
});
export const clearPath = (): IEmptyAction => ({
    type: ActionTypes.CLEAR_PATH
});
export const setValidStatus = (isValid: boolean): IAction<boolean> => ({
    type: ActionTypes.SET_VALIDSTATUS,
    value: isValid
});
// Auth
export const signIn = (username, password): IAction<any> => ({
    type: ActionTypes.SIGNIN,
    value: { username: username, password: password }
});
export const reSignIn = (username, password): IAction<any> => ({
    type: ActionTypes.RESIGNIN,
    value: { username: username, password: password }
});
export const signOut = (): IEmptyAction => ({
    type: ActionTypes.SIGNOUT
});
// Setting
export const changeLanguage = (lang): IAction<string> => ({
    type: ActionTypes.CHANGE_LANGUAGE,
    value: lang
});
export const initLandingPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_LANDING_PAGE
});

export const loadLanding = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_LANDING,
    payload: payload
});

export const initNamespacePage = (): IEmptyAction => ({
    type: ActionTypes.INIT_NAMESPACE_PAGE
});

export const loadNamespace = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_NAMESPACE,
    payload: payload
});

export const createNamespace = (namespace): IAction<any> => ({
    type: ActionTypes.CREATE_NAMESPACE,
    value: namespace
});

export const deleteNamespace = (namespaceName): IAction<string> => ({
    type: ActionTypes.DELETE_NAMESPACE,
    value: namespaceName
});

export const enableIstio = (namespaceName): IAction<string> => ({
    type: ActionTypes.ENABLE_ISTIO,
    value: namespaceName
});

export const disableIstio = (namespaceName): IAction<string> => ({
    type: ActionTypes.DISABLE_ISTIO,
    value: namespaceName
});

export const enableIstioStatus = (namespaceName): IAction<string> => ({
    type: ActionTypes.ENABLE_ISTIOSTATUS,
    value: namespaceName
});

export const disableIstioStatus = (namespaceName): IAction<string> => ({
    type: ActionTypes.DISABLE_ISTIOSTATUS,
    value: namespaceName
});

export const initPodPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_POD_PAGE
});

export const loadPod = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_POD,
    payload: payload
});

export const initDeploymentPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_DEPLOYMENT_PAGE
});

export const loadDeployment = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_DEPLOYMENT,
    payload: payload
});

export const switchFewBoxDelivery = (isFewBox): IAction<boolean> => ({
    type: ActionTypes.SWITCH_FEWBOXDELIVERY,
    value: isFewBox
});

export const switchHelp = (isHelp): IAction<boolean> => ({
    type: ActionTypes.SWITCH_HELP,
    value: isHelp
});

export const createDeployment = (deployment): IAction<any> => ({
    type: ActionTypes.CREATE_DEPLOYMENT,
    value: deployment
});

export const createPod = (pod): IAction<any> => ({
    type: ActionTypes.CREATE_POD,
    value: pod
});

export const deleteDeployment = (deployment): IAction<any> => ({
    type: ActionTypes.DELETE_DEPLOYMENT,
    value: deployment
});

export const deletePod = (pod): IAction<any> => ({
    type: ActionTypes.DELETE_POD,
    value: pod
});

export const changePodVersion = (pod): IAction<any> => ({
    type: ActionTypes.CHANGE_DEPLOYMENT_VERSION,
    value: pod
});

export const scalePodReplicas = (pod): IAction<any> => ({
    type: ActionTypes.SCALE_DEPLOYMENT_REPLICAS,
    value: pod
});

export const initServicePage = (): IEmptyAction => ({
    type: ActionTypes.INIT_SERVICE_PAGE
});

export const loadService = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_SERVICE,
    payload: payload
});

export const createService = (service): IAction<any> => ({
    type: ActionTypes.CREATE_SERVICE,
    value: service
});

export const deleteService = (service): IAction<string> => ({
    type: ActionTypes.DELETE_SERVICE,
    value: service
});

export const initVirtualServicePage = (): IEmptyAction => ({
    type: ActionTypes.INIT_VIRTUALSERVICE_PAGE
});

export const loadVirtualService = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_VIRTUALSERVICE,
    payload: payload
});

export const createVirtualService = (virtualService): IAction<any> => ({
    type: ActionTypes.CREATE_VIRTUALSERVICE,
    value: virtualService
});

export const deleteVirtualService = (virtualService): IAction<string> => ({
    type: ActionTypes.DELETE_VIRTUALSERVICE,
    value: virtualService
});

export const initGatewayPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_GATEWAY_PAGE
});

export const loadGateway = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_GATEWAY,
    payload: payload
});

export const createGateway = (gateway): IAction<any> => ({
    type: ActionTypes.CREATE_GATEWAY,
    value: gateway
});

export const deleteGateway = (gateway): IAction<any> => ({
    type: ActionTypes.DELETE_GATEWAY,
    value: gateway
});

export const initLogBook = (identification): IAction<any> => ({
    type: ActionTypes.INIT_LOGBOOK,
    value: identification
});

export const loadLogBook = (logBook): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_LOGBOOK,
    payload: logBook
});

export const initNodePage = (): IEmptyAction => ({
    type: ActionTypes.INIT_NODE_PAGE
});

export const loadNode = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_NODE,
    payload: payload
});

export const initServiceAccountPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_SERVICEACCOUNT_PAGE
});

export const loadServiceAccount = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_SERVICEACCOUNT,
    payload: payload
});

export const createServiceAccount = (serviceAccount): IAction<any> => ({
    type: ActionTypes.CREATE_SERVICEACCOUNT,
    value: serviceAccount
});

export const deleteServiceAccount = (serviceAccount): IAction<any> => ({
    type: ActionTypes.DELETE_SERVICEACCOUNT,
    value: serviceAccount
});

export const initSecretPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_SECRET_PAGE
});

export const loadSecret = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_SECRET,
    payload: payload
});

export const createSecret = (secret): IAction<any> => ({
    type: ActionTypes.CREATE_SECRET,
    value: secret
});

export const deleteSecret = (dismission): IAction<any> => ({
    type: ActionTypes.DELETE_SECRET,
    value: dismission
});

export const initDestinationRulePage = (): IEmptyAction => ({
    type: ActionTypes.INIT_DESTINATIONRULE_PAGE
});

export const loadDestinationRule = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_DESTINATIONRULE,
    payload: payload
});

export const createDestinationRule = (destinationRule): IAction<any> => ({
    type: ActionTypes.CREATE_DESTINATIONRULE,
    value: destinationRule
});

export const deleteDestinationRule = (destinationRule): IAction<any> => ({
    type: ActionTypes.DELETE_DESTINATIONRULE,
    value: destinationRule
});

export const changeDestinationRuleSubset = (subsets): IAction<any> => ({
    type: ActionTypes.CHANGE_DESTINATIONRULE_SUBSET,
    value: subsets
});

export const initServiceEntryPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_SERVICEENTRY_PAGE
});

export const loadServiceEntry = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_SERVICEENTRY,
    payload: payload
});

export const createServiceEntry = (serviceEntry): IAction<any> => ({
    type: ActionTypes.CREATE_SERVICEENTRY,
    value: serviceEntry
});

export const deleteServiceEntry = (serviceEntry): IAction<string> => ({
    type: ActionTypes.DELETE_SERVICEENTRY,
    value: serviceEntry
});

export const initJobPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_JOB_PAGE
});

export const loadJob = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_JOB,
    payload: payload
});

export const createJob = (job): IAction<any> => ({
    type: ActionTypes.CREATE_JOB,
    value: job
});

export const deleteJob = (job): IAction<string> => ({
    type: ActionTypes.DELETE_JOB,
    value: job
});

/* UI */
export const beginLoading = (): IEmptyAction => ({
    type: ActionTypes.BEGIN_LOADING
});
export const endLoading = (): IEmptyAction => ({
    type: ActionTypes.END_LOADING
});
export const showMessage = (messageType: MessageType, messageIntlId: string, messageValues?: any): IAction<any> => ({
    type: ActionTypes.SHOW_MESSAGE,
    value: { type: messageType, intlId: messageIntlId, values: messageValues }
});
export const hideMessage = (): IEmptyAction => ({
    type: ActionTypes.HIDE_MESSAGE
});
export const showLockWindow = ()=>({
    type: ActionTypes.SHOW_LOCKWINDOW
});
export const hideLockWindow = ()=>({
    type: ActionTypes.HIDE_LOCKWINDOW
});
export const showDrawer = (drawer: any): IAction<any> => ({
    type: ActionTypes.SHOW_DRAWER,
    value: drawer
});
export const hideDrawer = (): IEmptyAction => ({
    type: ActionTypes.HIDE_DRAWER
});
export const initNamespaceDropdownList = (): IEmptyAction => ({
    type: ActionTypes.INIT_NAMESPACE_DROPDOWNLIST
});
export const fillNamespaceDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_NAMESPACE_DROPDOWNLIST,
    payload: payload
});
export const initPodServiceAccountDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_POD_SERVICEACCOUNT_DROPDOWNLIST,
    value: namespaceName
});
export const fillPodServiceAccountDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_POD_SERVICEACCOUNT_DROPDOWNLIST,
    payload: payload
});
export const initDeploymentServiceAccountDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST,
    value: namespaceName
});
export const fillDeploymentServiceAccountDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_DEPLOYMENT_SERVICEACCOUNT_DROPDOWNLIST,
    payload: payload
});
export const initDeploymentSecretDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_DEPLOYMENT_SECRET_DROPDOWNLIST,
    value: namespaceName
});
export const fillDeploymentSecretDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_DEPLOYMENT_SECRET_DROPDOWNLIST,
    payload: payload
});
export const initVirtualServiceGatewayDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST,
    value: namespaceName
});
export const fillVirtualServiceGatewayDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_VIRTUALSERVICE_GATEWAY_DROPDOWNLIST,
    payload: payload
});
export const initDestinationRuleServiceDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_DESTINATIONRULE_SERVICE_DROPDOWNLIST,
    value: namespaceName
});
export const fillDestinationRuleServiceDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_DESTINATIONRULE_SERVICE_DROPDOWNLIST,
    payload: payload
});
export const initVirtualServiceServiceDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_VIRTUALSERVICE_SERVICE_DROPDOWNLIST,
    value: namespaceName
});
export const fillVirtualServiceServiceDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_VIRTUALSERVICE_SERVICE_DROPDOWNLIST,
    payload: payload
});
export const initDestinationRuleDeploymentDropdownList = (app: string): IAction<string> => ({
    type: ActionTypes.INIT_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST,
    value: app
});
export const fillDestinationRuleDeploymentDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST,
    payload: payload
});
export const selectDestinationRule = (namespace: string, name: string): IAction<any> => ({
    type: ActionTypes.SELECT_DESTINATIONRULE,
    value: { namespace: namespace, name: name }
});
export const fillSelectedDestinationRuleDeploymentDropdownList = (payload: SelectedDestinationRule): IPayloadAction<any> => ({
    type: ActionTypes.FILL_SELECTED_DESTINATIONRULE,
    payload: payload
});
export const initVirtualServiceDeploymentDropdownList = (app: string): IAction<string> => ({
    type: ActionTypes.INIT_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST,
    value: app
});
export const fillVirtualServiceDeploymentDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST,
    payload: payload
});