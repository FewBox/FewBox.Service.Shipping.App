import { IPayloadAction, IEmptyAction, IAction } from './Action';
import ActionTypes from './ActionTypes';
import { MessageType } from '@fewbox/react-components';

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
    type: ActionTypes.CONSTRUCT_QUAYAREA,
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
export const showDrawer = (): IEmptyAction => ({
    type: ActionTypes.SHOW_DRAWER
});
export const hideDrawer = (): IEmptyAction => ({
    type: ActionTypes.HIDE_DRAWER
});
export const addBerthComponent = (index): IAction<number> => ({
    type: ActionTypes.ADD_BERTHCOMPONENT,
    value: index
});

export const removeBerthComponent = (index): IAction<number> => ({
    type: ActionTypes.REMOVE_BERTHCOMPONENT,
    value: index
});
export const addChannelComponent = (index): IAction<number> => ({
    type: ActionTypes.ADD_CHANNELCOMPONENT,
    value: index
});

export const removeChannelComponent = (index): IAction<number> => ({
    type: ActionTypes.REMOVE_CHANNELCOMPONENT,
    value: index
});

export const initShippingLineDropdownList = (): IEmptyAction => ({
    type: ActionTypes.INIT_SHIPPINGLINEDROPDOWNLIST
});

export const fillShippingLineDropdownList = (payload): IPayloadAction<any> => ({
    type: ActionTypes.FILL_SHIPPINGLINEDROPDOWNLIST,
    payload: payload
});