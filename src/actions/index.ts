import { IPayloadAction, IEmptyAction, IAction } from './Action';
import ActionTypes from './ActionTypes';
import { MessageType } from '@fewbox/react-components';
import { SelectedStackPolicy } from '../reducers/State';
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

export const initShipyardPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_SHIPYARDPAGE
});

export const loadShipyard = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_SHIPYARD,
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

export const initQuayAreaPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_QUAYAREAPAGE
});

export const loadQuayArea = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_QUAYAREA,
    payload: payload
});

export const constructQuayArea = (constructBill): IAction<any> => ({
    type: ActionTypes.CONSTRUCT_QUAYAREA,
    value: constructBill
});

export const demolishQuayArea = (demolishBill): IAction<string> => ({
    type: ActionTypes.DEMOLISH_QUAYAREA,
    value: demolishBill
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

export const initCountryPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_COUNTRYPAGE
});

export const loadCountry = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_COUNTRY,
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

export const initCredentialPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_CREDENTIALPAGE
});

export const loadCredential = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_CREDENTIAL,
    payload: payload
});

export const issueCredential = (secret): IAction<any> => ({
    type: ActionTypes.ISSUE_CREDENTIAL,
    value: secret
});

export const revokeCredential = (dismission): IAction<any> => ({
    type: ActionTypes.REVOKE_CREDENTIAL,
    value: dismission
});

export const initStackPolicyPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_STACKPOLICYPAGE
});

export const loadStackPolicy = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_STACKPOLICY,
    payload: payload
});

export const draftStackPolicy = (stackPolicy): IAction<any> => ({
    type: ActionTypes.DRAFT_STACKPOLICY,
    value: stackPolicy
});

export const abolishStackPolicy = (dismission): IAction<any> => ({
    type: ActionTypes.ABOLISH_STACKPOLICY,
    value: dismission
});

export const changeStackPolicySubset = (subsets): IAction<any> => ({
    type: ActionTypes.CHANGE_STACKPOLICYSUBSET,
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
export const initShipyardServiceAccountDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_SHIPYARDSERVICEACCOUNTDROPDOWNLIST,
    value: namespaceName
});
export const fillShipyardServiceAccountDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_SHIPYARDSERVICEACCOUNTDROPDOWNLIST,
    payload: payload
});
export const initShipyardCredentialDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_SHIPYARDCREDENTIALDROPDOWNLIST,
    value: namespaceName
});
export const fillShipyardCredentialDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_SHIPYARDCREDENTIALDROPDOWNLIST,
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
export const initStackPolicyQuayAreaDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_STACKPOLICYQUAYAREADROPDOWNLIST,
    value: namespaceName
});
export const fillStackPolicyQuayAreaDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_STACKPOLICYQUAYAREADROPDOWNLIST,
    payload: payload
});
export const initYardAreaQuayAreaDropdownList = (namespaceName: string): IAction<string> => ({
    type: ActionTypes.INIT_YARDAREAQUAYAREADROPDOWNLIST,
    value: namespaceName
});
export const fillYardAreaQuayAreaDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_YARDAREAQUAYAREADROPDOWNLIST,
    payload: payload
});
export const initStackPolicyShipyardDropdownList = (identificationCode: string): IAction<string> => ({
    type: ActionTypes.INIT_STACKPOLICYSHIPYARDDROPDOWNLIST,
    value: identificationCode
});
export const fillStackPolicyShipyardDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_STACKPOLICYSHIPYARDDROPDOWNLIST,
    payload: payload
});
export const selectStackPolicy = (namespaceName: string, name: string): IAction<any> => ({
    type: ActionTypes.SELECT_STACKPOLICY,
    value: { namespaceName: namespaceName, name: name }
});
export const fillSelectedStackPolicyShipyardDropdownList = (payload: SelectedStackPolicy): IPayloadAction<any> => ({
    type: ActionTypes.FILL_SELECTEDSTACKPOLICY,
    payload: payload
});
export const initYardAreaShipyardDropdownList = (identificationCode: string): IAction<string> => ({
    type: ActionTypes.INIT_YARDAREASHIPYARDDROPDOWNLIST,
    value: identificationCode
});
export const fillYardAreaShipyardDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_YARDAREASHIPYARDDROPDOWNLIST,
    payload: payload
});