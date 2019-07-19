import { IPayloadAction, IEmptyAction, IAction } from './Action';
import ActionTypes from './ActionTypes';
import { MessageType } from 'fewbox-react-components';

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

export const loadLandingPage = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_LANDINGPAGE,
    payload: payload
});

export const initShippingLanePage = (): IEmptyAction => ({
    type: ActionTypes.INIT_SHIPPINGLANEPAGE
});

export const loadShippingLanePage = (payload): IPayloadAction<any> => ({
    type: ActionTypes.LOAD_SHIPPINGLANEPAGE,
    payload: payload
});

export const startShippingLane = (shippingLaneName): IAction<string> => ({
    type: ActionTypes.START_SHIPPINGLANE,
    value: shippingLaneName
});

export const closeShippingLane = (shippingLaneName): IAction<string> => ({
    type: ActionTypes.CLOSE_SHIPPINGLANE,
    value: shippingLaneName
});

export const addShippingLane = (shippingLaneName): IAction<string> => ({
    type: ActionTypes.ADD_SHIPPINGLANE,
    value: shippingLaneName
});

export const removeShippingLane = (shippingLaneName): IAction<string> => ({
    type: ActionTypes.REMOVE_SHIPPINGLANE,
    value: shippingLaneName
});

export const enableIstio = (shippingLaneName): IAction<string> => ({
    type: ActionTypes.ENABLE_ISTIO,
    value: shippingLaneName
});

export const disableIstio = (shippingLaneName): IAction<string> => ({
    type: ActionTypes.DISABLE_ISTIO,
    value: shippingLaneName
});

export const enableIstioStatus = (shippingLaneName): IAction<string> => ({
    type: ActionTypes.ENABLE_ISTIOSTATUS,
    value: shippingLaneName
});

export const disableIstioStatus = (shippingLaneName): IAction<string> => ({
    type: ActionTypes.DISABLE_ISTIOSTATUS,
    value: shippingLaneName
});