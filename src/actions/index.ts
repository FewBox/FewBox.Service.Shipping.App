import { IPayloadAction, IEmptyAction, IAction } from './Action';
import ActionTypes from './ActionTypes';
import { MessageType } from '@fewbox/react-components';
import { SelectedDestinationRule } from '../reducers/State';
import { Action } from 'rxjs/internal/scheduler/Action';

// Common
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
export const signOut = (): IEmptyAction => ({
    type: ActionTypes.SIGNOUT
});
// Setting
export const changeLanguage = (lang): IAction<string> => ({
    type: ActionTypes.CHANGE_LANGUAGE,
    value: lang
});
export const initLandingPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_LANDINGPAGE
});

export const loadLanding = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_LANDING,
    payload: payload
});

export const initNamespacePage = (): IEmptyAction => ({
    type: ActionTypes.INIT_NAMESPACEPAGE
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

export const initContainerShipPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_CONTAINERSHIPPAGE
});

export const loadContainerShip = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_CONTAINERSHIP,
    payload: payload
});

export const initDeploymentPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_DEPLOYMENTPAGE
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

export const constructContainerShip = (designBill): IAction<any> => ({
    type: ActionTypes.CONSTRUCT_CONTAINERSHIP,
    value: designBill
});

export const constructTemporaryContainerShip = (designBill): IAction<any> => ({
    type: ActionTypes.BUILD_TEMPORARYCONTAINERSHIP,
    value: designBill
});

export const scrapContainerShip = (demolitionBill): IAction<any> => ({
    type: ActionTypes.SCRAP_CONTAINERSHIP,
    value: demolitionBill
});

export const sinkContainerShip = (artificialReefBill): IAction<any> => ({
    type: ActionTypes.SINK_CONTAINERSHIP,
    value: artificialReefBill
});

export const changeContainerShipNumbering = (renewBill): IAction<any> => ({
    type: ActionTypes.CHANGE_CONTAINERSHIPNUMBERING,
    value: renewBill
});

export const scaleContainerShipQuantity = (renewBill): IAction<any> => ({
    type: ActionTypes.SCALE_CONTAINERSHIPQUANTITY,
    value: renewBill
});

export const initServicePage = (): IEmptyAction => ({
    type: ActionTypes.INIT_SERVICEPAGE
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

export const initYardAreaPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_YARDAREAPAGE
});

export const loadYardArea = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_YARDAREA,
    payload: payload
});

export const constructYardArea = (constructBill): IAction<any> => ({
    type: ActionTypes.CONSTRUCT_YARDAREA,
    value: constructBill
});

export const demolishYardArea = (demolishBill): IAction<string> => ({
    type: ActionTypes.DEMOLISH_YARDAREA,
    value: demolishBill
});

export const initGateAreaPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_GATEAREAPAGE
});

export const loadGateArea = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_GATEAREA,
    payload: payload
});

export const constructGateArea = (bluePrint): IAction<any> => ({
    type: ActionTypes.CONSTRUCT_GATEAREA,
    value: bluePrint
});

export const demolishGateArea = (bluePrint): IAction<any> => ({
    type: ActionTypes.DEMOLISH_GATEAREA,
    value: bluePrint
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
    type: ActionTypes.INIT_NODEPAGE
});

export const loadNode = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_NODE,
    payload: payload
});

export const initServiceAccountPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_SERVICEACCOUNTPAGE
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
    type: ActionTypes.INIT_SECRETPAGE
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
    type: ActionTypes.INIT_DESTINATIONRULEPAGE
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

export const changeStackPolicySubset = (subsets): IAction<any> => ({
    type: ActionTypes.CHANGE_DESTINATIONRULESUBSET,
    value: subsets
});

export const initFreeTradeAreaPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_FREETRADEAREAPAGE
});

export const loadFreeTradeArea = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_FREETRADEAREA,
    payload: payload
});

export const constructFreeTradeArea = (constructBill): IAction<any> => ({
    type: ActionTypes.CONSTRUCT_FREETRADEAREA,
    value: constructBill
});

export const demolishFreeTradeArea = (demolishBill): IAction<string> => ({
    type: ActionTypes.DEMOLISH_FREETRADEAREA,
    value: demolishBill
});

/* UI */
export const beginLoading = (): IEmptyAction => ({
    type: ActionTypes.BEGIN_LOADING
});
export const endLoading = (): IEmptyAction => ({
    type: ActionTypes.END_LOADING
});
export const showMessage = (messageType: MessageType, messageIntlId: string, messageValues: any): IAction<any> => ({
    type: ActionTypes.SHOW_MESSAGE,
    value: { type: messageType, intlId: messageIntlId, values: messageValues }
});
export const hideMessage = (): IEmptyAction => ({
    type: ActionTypes.HIDE_MESSAGE
});
export const showDrawer = (drawer: any): IAction<any> => ({
    type: ActionTypes.SHOW_DRAWER,
    value: drawer
});
export const hideDrawer = (): IEmptyAction => ({
    type: ActionTypes.HIDE_DRAWER
});
export const initNamespaceDropdownList = (): IEmptyAction => ({
    type: ActionTypes.INIT_NAMESPACEDROPDOWNLIST
});
export const fillNamespaceDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_NAMESPACEDROPDOWNLIST,
    payload: payload
});
export const initContainerShipServiceAccountDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_CONTAINERSHIPSERVICEACCOUNTDROPDOWNLIST,
    value: namespaceName
});
export const fillContainerShipServiceAccountDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_CONTAINERSHIPSERVICEACCOUNTDROPDOWNLIST,
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
export const initYardAreaGateAreaDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_YARDAREAGATEAREADROPDOWNLIST,
    value: namespaceName
});
export const fillYardAreaGateAreaDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_YARDAREAGATEAREADROPDOWNLIST,
    payload: payload
});
export const initStackPolicyServiceDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_DESTINATIONRULE_SERVICE_DROPDOWNLIST,
    value: namespaceName
});
export const fillStackPolicyServiceDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_DESTINATIONRULE_SERVICE_DROPDOWNLIST,
    payload: payload
});
export const initVirtualServiceServiceDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_YARDAREASERVICEDROPDOWNLIST,
    value: namespaceName
});
export const fillYardAreaServiceDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_YARDAREASERVICEDROPDOWNLIST,
    payload: payload
});
export const initDestinationRuleDeploymentDropdownList = (identificationCode: string): IAction<string> => ({
    type: ActionTypes.INIT_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST,
    value: identificationCode
});
export const fillDestinationRuleDeploymentDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_DESTINATIONRULE_DEPLOYMENT_DROPDOWNLIST,
    payload: payload
});
export const selectDestinationRule = (namespaceName: string, name: string): IAction<any> => ({
    type: ActionTypes.SELECT_DESTINATIONRULE,
    value: { namespaceName: namespaceName, name: name }
});
export const fillSelectedDestinationRuleDeploymentDropdownList = (payload: SelectedDestinationRule): IPayloadAction<any> => ({
    type: ActionTypes.FILL_SELECTEDDESTINATIONRULE,
    payload: payload
});
export const initVirtualServiceDeploymentDropdownList = (identificationCode: string): IAction<string> => ({
    type: ActionTypes.INIT_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST,
    value: identificationCode
});
export const fillVirtualServiceDeploymentDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_VIRTUALSERVICE_DEPLOYMENT_DROPDOWNLIST,
    payload: payload
});