import { IPayloadAction, IEmptyAction, IAction } from './Action';
import ActionTypes from './ActionTypes';
import { MessageType } from '@fewbox/react-components';

// Common
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
export const empty = (comment: string): IAction<string> => ({
    type: ActionTypes.EMPTY,
    value: comment
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

export const initShippingLinePage = (): IEmptyAction => ({
    type: ActionTypes.INIT_SHIPPINGLINEPAGE
});

export const loadShippingLine = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_SHIPPINGLINE,
    payload: payload
});

export const startShippingLine = (shippingLineName): IAction<string> => ({
    type: ActionTypes.START_SHIPPINGLINE,
    value: shippingLineName
});

export const closeShippingLine = (shippingLineName): IAction<string> => ({
    type: ActionTypes.CLOSE_SHIPPINGLINE,
    value: shippingLineName
});

export const enableIstio = (shippingLineName): IAction<string> => ({
    type: ActionTypes.ENABLE_ISTIO,
    value: shippingLineName
});

export const disableIstio = (shippingLineName): IAction<string> => ({
    type: ActionTypes.DISABLE_ISTIO,
    value: shippingLineName
});

export const enableIstioStatus = (shippingLineName): IAction<string> => ({
    type: ActionTypes.ENABLE_ISTIOSTATUS,
    value: shippingLineName
});

export const disableIstioStatus = (shippingLineName): IAction<string> => ({
    type: ActionTypes.DISABLE_ISTIOSTATUS,
    value: shippingLineName
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

export const constructContainerShip = (designBill): IAction<any> => ({
    type: ActionTypes.CONSTRUCT_CONTAINERSHIP,
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

export const initFleetPage = (): IEmptyAction => ({
    type: ActionTypes.INIT_FLEETPAGE
});

export const loadFleet = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_FLEET,
    payload: payload
});

export const setupFleet = (setupBill): IAction<any> => ({
    type: ActionTypes.SETUP_FLEET,
    value: setupBill
});

export const dissolveFleet = (dissolveBill): IAction<string> => ({
    type: ActionTypes.DISSOLVE_FLEET,
    value: dissolveBill
});

/* UI */
export const addOwnershipItemComponent = (index): IAction<number> => ({
    type: ActionTypes.ADD_OWNERSHIPITEMCOMPONENT,
    value: index
});

export const removeOwnershipItemComponent = (index): IAction<number> => ({
    type: ActionTypes.REMOVE_OWNERSHIPITEMCOMPONENT,
    value: index
});

export const initShippingLineDropdownList = (): IEmptyAction => ({
    type: ActionTypes.INIT_SHIPPINGLINEDROPDOWNLIST
});

export const fillShippingLineDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_SHIPPINGLINEDROPDOWNLIST,
    payload: payload
});